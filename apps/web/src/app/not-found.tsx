import { Button, Heading, Stack, Text } from '@repo/ui';
import Container from 'components/container';
import Link from 'next/link';
import styles from './page.module.css';

export default function NotFound() {
  return (
    <Container size="narrow" className={styles.notFound}>
      <span className={styles.notFoundLogo}>404</span>
      <Heading level={1} className={styles.notFoundTitle}>
        ページが見つかりません
      </Heading>
      <Text tone="muted" className={styles.notFoundText}>
        URLが変更されたか、ページが削除された可能性があります。
      </Text>
      <Stack direction="row" gap={2} className={styles.actions}>
        <Button render={<Link href="/" />}>トップへ戻る</Button>
        <Button variant="outline" render={<Link href="/#search" />}>
          記事を検索
        </Button>
      </Stack>
    </Container>
  );
}
