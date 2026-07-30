---
title: "[CDK]SNS＋SQS＋DynamoDBでBounceとComplaint情報を収集するスタック構築"
path: "/entry/273"
date: "2022-04-11 21:00"
coverImage: "../../../images/thumbnail/aws-logo.png"
author: "s-yoshiki"
tags: ["amazon-aws","node.js","typescript"]
---

## 概要

AWS の CDK で SNS＋SQS＋DynamoDBでBounceとComplaint情報を収集するスタック構築です。

## 構築するもの

SES → SNS → SQS → Lambda → DynamoDB といった形で情報が連携される構成です。

## CDK Stackの実装

CDK の Stack の中身は以下となります。

```ts
import {
  aws_dynamodb as dynamodb,
  aws_iam as iam,
  aws_lambda as lambda,
  aws_ses as ses,
  aws_ses_actions as sesActions,
  aws_sns as sns,
  aws_sqs as sqs,
  Duration,
  Stack,
  StackProps,
} from 'aws-cdk-lib';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
/** */
export class CdkBounceStack extends Stack {
  /**
   * DB_TABLENAME
   */
  private readonly dbTablename = `ses_notifications`;
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    const queues = this.addQueue();
    const sns = this.addSNS(queues);
    this.addLambda(queues);
    this.addDynamoDB();
    // this.addSES(sns)
  }

  /**
   * キューの構築
   *
   * @returns
   */
  private addQueue() {
    const bounceQueue = new sqs.Queue(this, 'bounceQueue');
    const complaintQueue = new sqs.Queue(this, 'complaintQueue');
    [bounceQueue, complaintQueue].forEach((queue) => {
      const policy = new iam.PolicyStatement();
      policy.addActions(
        'SQS:SendMessage',
        'SQS:DeleteMessage',
        'SQS:GetQueueAttributes',
      );
      policy.addResources(queue.queueArn);
      policy.addPrincipals(new iam.AnyPrincipal());
      queue.addToResourcePolicy(policy);
    });
    return {
      bounceQueue,
      complaintQueue,
    };
  }

  /**
   * SNSトピックの追加
   *
   * @param props
   */
  private addSNS(props: { bounceQueue: sqs.Queue; complaintQueue: sqs.Queue }) {
    const bounceTopic = new sns.Topic(this, 'BounceTopic');
    const complaintTopic = new sns.Topic(this, 'ComplaintTopic');
    const bounceSubscription = new sns.Subscription(
      this,
      'BounceSubscription',
      {
        endpoint: props.bounceQueue.queueArn,
        protocol: sns.SubscriptionProtocol.SQS,
        topic: bounceTopic,
      },
    );
    const complaintSubscription = new sns.Subscription(
      this,
      'ComplaintSubscription',
      {
        endpoint: props.complaintQueue.queueArn,
        protocol: sns.SubscriptionProtocol.SQS,
        topic: complaintTopic,
      },
    );
    return {
      bounceTopic,
      complaintTopic,
      bounceSubscription,
      complaintSubscription,
    };
  }

  /**
   * ログLambda
   *
   * @param props
   */
  private addLambda(props: {
    bounceQueue: sqs.Queue;
    complaintQueue: sqs.Queue;
  }) {
    // Lambda
    const loggerLambdaPolicy = new iam.PolicyStatement();
    loggerLambdaPolicy.addActions(
      'sqs:ReceiveMessage',
      'sqs:DeleteMessage',
      'dynamodb:PutItem',
    );
    loggerLambdaPolicy.addResources(
      `arn:aws:dynamodb:*:*:table/${this.dbTablename}`,
      props.bounceQueue.queueArn,
      props.complaintQueue.queueArn,
    );
    const loggerLambda = new NodejsFunction(this, 'LoggerLambda', {
      entry: 'src/lambda-bounce-logger/index.ts',
      timeout: Duration.seconds(10),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_14_X,
      initialPolicy: [loggerLambdaPolicy],
      environment: {
        // DynamoDBテーブル名
        DB_TABLENAME: this.dbTablename,
      },
    });
    new lambda.EventSourceMapping(this, 'BounceEventSourceMapping', {
      batchSize: 10,
      enabled: true,
      eventSourceArn: props.bounceQueue.queueArn,
      target: loggerLambda,
    });
    new lambda.EventSourceMapping(this, 'ComplaintEventSourceMapping', {
      batchSize: 10,
      enabled: true,
      eventSourceArn: props.complaintQueue.queueArn,
      target: loggerLambda,
    });
  }

  /**
   * DynamoDB
   */
  private addDynamoDB() {
    return new dynamodb.Table(this, 'SesNotificationsTable', {
      tableName: 'ses_notifications',
      partitionKey: {
        name: 'SESMessageId',
        type: dynamodb.AttributeType.STRING,
      },
      sortKey: {
        name: 'SnsPublishTime',
        type: dynamodb.AttributeType.STRING,
      },
    });
  }

  /**
   * SES のルール設定
   *
   * @see https://github.com/aws/aws-cdk/issues/2584
   * @param props
   */
  private addSES(props: {
    bounceTopic: sns.Topic;
    complaintTopic: sns.Topic;
  }) {
    // todo:
    // ap-northeast-1では利用できない
    // Template format error: Unrecognized resource types: [AWS::SES::ReceiptRule, AWS::SES::ReceiptRuleSet]
    new ses.ReceiptRuleSet(this, 'SesRuleSetBounce', {
      rules: [
        {
          recipients: ['example.com'],
          actions: [
            new sesActions.Sns({
              topic: props.bounceTopic,
            }),
            new sesActions.Sns({
              topic: props.complaintTopic,
            }),
          ],
        },
      ],
    });
  }
}
```

## バウンス情報を受け取るLambdaの実装

バウンス情報を受け取るLambdaの実装は以下となります。

```ts
import { SQSEvent, SQSHandler } from 'aws-lambda';
import { AWSError, DynamoDB } from 'aws-sdk';

/**
 * DynamoDB
 */
const DynamoDBTableName = process.env.DB_TABLENAME;
const dynamodb = new DynamoDB({
  params: { TableName: DynamoDBTableName },
});

/**
 * 通知内容からDynamoDB登録用Itemを生成する
 *
 * @param {any} body
 * @returns
 */
const parseRecordBody = (
  body: any,
): DynamoDB.Types.PutItemInputAttributeMap | undefined => {
  const SESMessage = JSON.parse(body.Message);
  const SESMessageType = SESMessage.notificationType;
  let commonItem = {
    SESMessageId: { S: SESMessage.mail.messageId },
    SnsPublishTime: { S: body.Timestamp },
    SESMessageType: { S: SESMessageType },
    SESDestinationAddress: { S: SESMessage.mail.destination.toString() },
  };
  let extendItem = {};
  if (SESMessageType === 'Bounce') {
    extendItem = {
      SESreportingMTA: { S: SESMessage.bounce.reportingMTA },
      SESbounceSummary: {
        S: JSON.stringify(SESMessage.bounce.bouncedRecipients),
      },
    };
  } else if (SESMessageType === 'Delivery') {
    extendItem = {
      SESsmtpResponse: { S: SESMessage.delivery.smtpResponse },
      SESreportingMTA: { S: SESMessage.delivery.reportingMTA },
    };
  } else if (SESMessageType === 'Complaint') {
    extendItem = {
      SESComplaintFeedbackType: {
        S: SESMessage.complaint.complaintFeedbackType,
      },
      SESFeedbackId: { S: SESMessage.complaint.feedbackId },
    };
  } else if (SESMessageType === 'AmazonSnsSubscriptionSucceeded') {
    // memo: 明示的なスコープ
    return;
  } else {
    return;
  }
  return {
    ...commonItem,
    ...extendItem,
  };
};

/**
 * handler
 *
 * @param {any} event
 * @param {any} context
 */
export const handler: SQSHandler = (event, context) => {
  for (let i = 0; i < event.Records.length; i++) {
    const body = JSON.parse(event.Records[i].body);
    console.log(body);
    const Item = parseRecordBody(body);
    if (!Item) {
      continue;
    }
    dynamodb.putItem({
      TableName: DynamoDBTableName,
      Item,
    }, (err: AWSError, data: DynamoDB.Types.PutItemOutput) => {
      if (err) {
        // context.fail(err);
        return;
      }
      console.log(data);
      // context.succeed();
    });
  }
};
```

### Event オブジェクトの中身

ここで SES → SNS → SQS と経由されてきたバウンス情報は次のような形式で Lambda の handler の event に渡されます。

```js
{
  "Records": [
    {
      "messageId": "11989527-ae32-49e0-9424-d925f12a0f92",
      "receiptHandle": "AQEB0eb...Aec0C==",
      "body": { // note: 実際にはJSONエンコードされている
        "Type": "Notification",
        "MessageId": "33e3d3b7-5dc3-562a-9891-897b2d76593e",
        "TopicArn": "arn:aws:sns:ap-northeast-1:XXXXXXXXXXXX:CdkBounceStack-ComplaintTopic5CB073F4-QTV1QXVHZN3M",
        "Message": { // note: 実際にはJSONエンコードされている
          "notificationType": "AmazonSnsSubscriptionSucceeded",
          "message": "You have successfully subscribed your Amazon SNS topic 'arn:aws:sns:ap-northeast-1:XXXXXXXXXXXX:CdkBounceStack-ComplaintTopic5CB073F4-QTV1QXVHZN3M' to receive 'Complaint' notifications from Amazon SES for identity 'noreplay@example.com'."
        },
        "Timestamp": "2022-04-10T05:43:17.368Z",
        "SignatureVersion": "1",
        "Signature": "OQP8sOoz...WQeqHCg==",
        "SigningCertURL": "https://sns.ap-northeast-1.amazonaws.com/SimpleNotificationService-XXXXXXXXXX.pem",
        "UnsubscribeURL": "https://sns.ap-northeast-1.amazonaws.com/?Action=Unsubscribe&SubscriptionArn=arn:aws:sns:ap-northeast-1:XXXXXXXXXXXX:CdkBounceStack-ComplaintTopic5CB073F4-QTV1QXVHZN3M:XXXXXXXXXXXX0"
      },
      "attributes": {
        "ApproximateReceiveCount": "11",
        "AWSTraceHeader": "Root=1-62526e75-198ddbee8XXXXXXXXXXXXXXX;Sampled=0",
        "SentTimestamp": "1649569397414",
        "SenderId": "AIDAIERWYNSXXXXXXXXXX",
        "ApproximateFirstReceiveTimestamp": "1649569397414"
      },
      "messageAttributes": {},
      "md5OfBody": "02b7770ff7d2576efea5d88edc9a2b8b",
      "eventSource": "aws:sqs",
      "eventSourceARN": "arn:aws:sqs:ap-northeast-1:XXXXXXXXXXXX:CdkBounceStack-complaintQueue1AFA60FA-JFFvaDoNfQ0g",
      "awsRegion": "ap-northeast-1"
    }
  ]
}
```

## 参考にしたサイト

[https://dev.classmethod.jp/articles/bounce-complaint-cdk/](https://dev.classmethod.jp/articles/bounce-complaint-cdk/)

[https://github.com/hilotter/ses-bounce-recorder](https://github.com/hilotter/ses-bounce-recorder)
