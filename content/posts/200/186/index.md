---
title: "GitLab API の 簡単な使い方"
path: "/entry/186"
date: "2020-02-10 19:22:15"
coverImage: "../../../images/thumbnail/gitlab-logo.png"
author: "s-yoshiki"
tags: ["git","gitlab","api"]
---

## 概要

GitLabではREST API が提供されています。これを用いて操作の自動化や情報の取得ができます。ここではAPIの利用のレギュラーパターンをまとめてみました。
また、APIの利用にはいくつかの原則ルールがあるので、簡単に触れます。
ここで紹介しているパラメータはAPI v4に基づいていますが、GitLabのバージョンで利用できる機能が異なったりします。

## 原則:アクセストークン

<!-- wp:embed {"url":"https://docs.gitlab.com/ee/api/#personal-access-tokens"} -->
<figure class="wp-block-embed"><div class="wp-block-embed__wrapper">
https://docs.gitlab.com/ee/api/#personal-access-tokens
</div></figure>
<!-- /wp:embed -->

利用には各アカウントで払い出されたアクセストークンの利用が必要となります。APIでのトークンの送信方法は2つあり
GETパラメータに付与する場合、"private_token=${アクセストークン}"、
headerに付与する場合、"Private-Token"にアクセストークンをセットします。

## 原則:ページネーション

<!-- wp:embed {"url":"https://docs.gitlab.com/ee/api/#pagination"} -->
<figure class="wp-block-embed"><div class="wp-block-embed__wrapper">
https://docs.gitlab.com/ee/api/#pagination
</div></figure>
<!-- /wp:embed -->

大量のデータを送らないようにページネーションの仕組みがあります。
ページ番号を指定するパラメータ"page"とページのアイテム数の上限を指定する"per_page"があります。per_pageの上限は100です。
(例: 50アイテムづつ区切り、2ページ目を取得する)

```
page=2&per_page=50
```

また、APIのレスポンスのヘッダの中に、ページネーションの情報が格納されます。

```shell
HTTP/1.1 200 OK
Cache-Control: no-cache
Content-Length: 1103
Content-Type: application/json
Date: Mon, 18 Jan 2016 09:43:18 GMT
Link: <https://gitlab.example.com/api/v4/projects/8/issues/8/notes?page=1&per_page=3>; rel="prev", <https://gitlab.example.com/api/v4/projects/8/issues/8/notes?page=3&per_page=3>; rel="next", <https://gitlab.example.com/api/v4/projects/8/issues/8/notes?page=1&per_page=3>; rel="first", <https://gitlab.example.com/api/v4/projects/8/issues/8/notes?page=3&per_page=3>; rel="last"
Status: 200 OK
Vary: Origin
X-Next-Page: 3
X-Page: 2
X-Per-Page: 3
X-Prev-Page: 1
X-Request-Id: 732ad4ee-9870-4866-a199-a9db0cde3c86
X-Runtime: 0.108688
X-Total: 8
X-Total-Pages: 3
```

## プロジェクトを取得する

<!-- wp:heading {"level":3} -->

### プロジェクト一覧表示

リクエスト

```shell
/api/v4/projects
(例: /api/v4/projects?pagination=keyset&per_page=100&page=1&order_by=id&sort=asc)
```

レスポンス

```js
[
    {
        "id": 143,
        "description": null,
        "name": "TearDownWalls",
        "name_with_namespace": "Leberwurscht / TearDownWalls",
        "path": "teardownwalls",
        "path_with_namespace": "leberwurscht/teardownwalls",
        "created_at": "2012-10-15T17:26:53.000Z",
        "default_branch": "master",
        "tag_list": [],
        "ssh_url_to_repo": "git@gitlab.com:leberwurscht/teardownwalls.git",
        "http_url_to_repo": "https://gitlab.com/leberwurscht/teardownwalls.git",
        "web_url": "https://gitlab.com/leberwurscht/teardownwalls",
        "readme_url": "https://gitlab.com/leberwurscht/teardownwalls/-/blob/master/README.md",
        "avatar_url": null,
        "star_count": 1,
        "forks_count": 4,
        "last_activity_at": "2013-10-03T08:08:46.000Z",
        "namespace": {
            "id": 262,
            "name": "Leberwurscht",
            "path": "leberwurscht",
            "kind": "user",
            "full_path": "leberwurscht",
            "parent_id": null,
            "avatar_url": "https://secure.gravatar.com/avatar/40e7a18eaeab7e309ae33992fef64ab4?s=80\u0026d=identicon",
            "web_url": "https://gitlab.com/leberwurscht"
        },
        "_links": {
            "self": "https://gitlab.com/api/v4/projects/143",
            "issues": "https://gitlab.com/api/v4/projects/143/issues",
            "merge_requests": "https://gitlab.com/api/v4/projects/143/merge_requests",
            "repo_branches": "https://gitlab.com/api/v4/projects/143/repository/branches",
            "labels": "https://gitlab.com/api/v4/projects/143/labels",
            "events": "https://gitlab.com/api/v4/projects/143/events",
            "members": "https://gitlab.com/api/v4/projects/143/members"
        },
        "empty_repo": false,
        "archived": false,
        "visibility": "public",
        "owner": {
            "id": 333,
            "name": "Leberwurscht",
            "username": "leberwurscht",
            "state": "active",
            "avatar_url": "https://secure.gravatar.com/avatar/40e7a18eaeab7e309ae33992fef64ab4?s=80\u0026d=identicon",
            "web_url": "https://gitlab.com/leberwurscht"
        },
        "resolve_outdated_diff_discussions": null,
        "container_registry_enabled": null,
        "issues_enabled": true,
        "merge_requests_enabled": true,
        "wiki_enabled": true,
        "jobs_enabled": true,
        "snippets_enabled": false,
        "can_create_merge_request_in": true,
        "issues_access_level": "enabled",
        "repository_access_level": "enabled",
        "merge_requests_access_level": "enabled",
        "wiki_access_level": "enabled",
        "builds_access_level": "enabled",
        "snippets_access_level": "disabled",
        "pages_access_level": "enabled",
        "emails_disabled": null,
        "shared_runners_enabled": true,
        "lfs_enabled": true,
        "creator_id": 333,
        "import_status": "none",
        "open_issues_count": 0,
        "ci_default_git_depth": null,
        "public_jobs": true,
        "build_timeout": 3600,
        "auto_cancel_pending_pipelines": "enabled",
        "build_coverage_regex": null,
        "ci_config_path": null,
        "shared_with_groups": [],
        "only_allow_merge_if_pipeline_succeeds": false,
        "request_access_enabled": true,
        "only_allow_merge_if_all_discussions_are_resolved": null,
        "remove_source_branch_after_merge": null,
        "printing_merge_request_link_enabled": true,
        "merge_method": "merge",
        "suggestion_commit_message": null,
        "auto_devops_enabled": false,
        "auto_devops_deploy_strategy": "continuous",
        "autoclose_referenced_issues": true,
        "permissions": {
            "project_access": null,
            "group_access": null
        },
        "approvals_before_merge": 0,
        "mirror": false,
        "external_authorization_classification_label": "",
        "packages_enabled": null,
        "service_desk_enabled": null,
        "service_desk_address": null,
        "marked_for_deletion_at": null
    }
]
```

<!-- wp:heading {"level":3} -->

### 指定IDのプロジェクトを表示

リクエスト

```shell
/api/v4/projects/:id
(例: /api/v4/projects/278964)
```

レスポンス

```js
{
    "id": 278964,
    "description": "GitLab is an open source end-to-end software development platform with built-in version control, issue tracking, code review, CI/CD, and more. Self-host GitLab on your own servers, in a container, or on a cloud provider.",
    "name": "GitLab",
    "name_with_namespace": "GitLab.org / GitLab",
    "path": "gitlab",
    "path_with_namespace": "gitlab-org/gitlab",
    "created_at": "2015-05-20T10:47:11.949Z",
    "default_branch": "master",
    "tag_list": [],
    "ssh_url_to_repo": "git@gitlab.com:gitlab-org/gitlab.git",
    "http_url_to_repo": "https://gitlab.com/gitlab-org/gitlab.git",
    "web_url": "https://gitlab.com/gitlab-org/gitlab",
    "readme_url": "https://gitlab.com/gitlab-org/gitlab/-/blob/master/README.md",
    "avatar_url": "https://assets.gitlab-static.net/uploads/-/system/project/avatar/278964/logo-extra-whitespace.png",
    "star_count": 1451,
    "forks_count": 1520,
    "last_activity_at": "2020-02-10T08:34:12.712Z",
    "namespace": {
        "id": 9970,
        "name": "GitLab.org",
        "path": "gitlab-org",
        "kind": "group",
        "full_path": "gitlab-org",
        "parent_id": null,
        "avatar_url": "/uploads/-/system/group/avatar/9970/logo-extra-whitespace.png",
        "web_url": "https://gitlab.com/groups/gitlab-org"
    },
    "_links": {
        "self": "https://gitlab.com/api/v4/projects/278964",
        "issues": "https://gitlab.com/api/v4/projects/278964/issues",
        "merge_requests": "https://gitlab.com/api/v4/projects/278964/merge_requests",
        "repo_branches": "https://gitlab.com/api/v4/projects/278964/repository/branches",
        "labels": "https://gitlab.com/api/v4/projects/278964/labels",
        "events": "https://gitlab.com/api/v4/projects/278964/events",
        "members": "https://gitlab.com/api/v4/projects/278964/members"
    },
    "empty_repo": false,
    "archived": false,
    "visibility": "public",
    "resolve_outdated_diff_discussions": false,
    "container_registry_enabled": true,
    "issues_enabled": true,
    "merge_requests_enabled": true,
    "wiki_enabled": false,
    "jobs_enabled": true,
    "snippets_enabled": true,
    "can_create_merge_request_in": true,
    "issues_access_level": "enabled",
    "repository_access_level": "enabled",
    "merge_requests_access_level": "enabled",
    "wiki_access_level": "disabled",
    "builds_access_level": "enabled",
    "snippets_access_level": "enabled",
    "pages_access_level": "enabled",
    "emails_disabled": false,
    "shared_runners_enabled": true,
    "lfs_enabled": true,
    "creator_id": 5497,
    "import_status": "finished",
    "open_issues_count": 25237,
    "ci_default_git_depth": null,
    "public_jobs": true,
    "build_timeout": 7680,
    "auto_cancel_pending_pipelines": "enabled",
    "build_coverage_regex": "",
    "ci_config_path": "",
    "shared_with_groups": [
        {
            "group_id": 3205033,
            "group_name": "gl-quality",
            "group_full_path": "gl-quality",
            "group_access_level": 30,
            "expires_at": null
        },
        {
            "group_id": 6150316,
            "group_name": "frontend",
            "group_full_path": "gitlab-org/maintainers/frontend",
            "group_access_level": 30,
            "expires_at": null
        },
        {
            "group_id": 1356356,
            "group_name": "GitLab docs team",
            "group_full_path": "gl-docsteam",
            "group_access_level": 30,
            "expires_at": null
        },
        {
            "group_id": 5924764,
            "group_name": "database",
            "group_full_path": "gitlab-org/maintainers/database",
            "group_access_level": 30,
            "expires_at": null
        },
        {
            "group_id": 5747833,
            "group_name": "eng-prod",
            "group_full_path": "gl-quality/eng-prod",
            "group_access_level": 30,
            "expires_at": null
        },
        {
            "group_id": 3887968,
            "group_name": "rails-backend",
            "group_full_path": "gitlab-org/maintainers/rails-backend",
            "group_access_level": 40,
            "expires_at": null
        },
        {
            "group_id": 2584649,
            "group_name": "managers",
            "group_full_path": "gitlab-org/release/managers",
            "group_access_level": 40,
            "expires_at": null
        }
    ],
    "only_allow_merge_if_pipeline_succeeds": false,
    "request_access_enabled": false,
    "only_allow_merge_if_all_discussions_are_resolved": true,
    "remove_source_branch_after_merge": true,
    "printing_merge_request_link_enabled": true,
    "merge_method": "merge",
    "suggestion_commit_message": "",
    "auto_devops_enabled": false,
    "auto_devops_deploy_strategy": "continuous",
    "autoclose_referenced_issues": true,
    "permissions": {
        "project_access": null,
        "group_access": null
    },
    "approvals_before_merge": 1,
    "mirror": false,
    "external_authorization_classification_label": "",
    "packages_enabled": false,
    "service_desk_enabled": false,
    "service_desk_address": null,
    "marked_for_deletion_at": null
}
```

<!-- wp:heading {"level":3} -->

### その他

<!-- wp:table -->
<figure class="wp-block-table"><table><thead><tr><th>Resource</th><th>Available endpoints</th></tr></thead><tbody><tr><td><a href="https://docs.gitlab.com/ee/api/access_requests.html">Access requests</a></td><td>/projects/:id/access_requests(also available for groups)</td></tr><tr><td><a href="https://docs.gitlab.com/ee/api/award_emoji.html">Award emoji</a></td><td>/projects/:id/issues/.../award_emoji,/projects/:id/merge_requests/.../award_emoji,/projects/:id/snippets/.../award_emoji</td></tr><tr><td><a href="https://docs.gitlab.com/ee/api/branches.html">Branches</a></td><td>/projects/:id/repository/branches/,/projects/:id/repository/merged_branches</td></tr><tr><td><a href="https://docs.gitlab.com/ee/api/commits.html">Commits</a></td><td>/projects/:id/repository/commits,/projects/:id/statuses</td></tr><tr><td><a href="https://docs.gitlab.com/ee/api/container_registry.html">Container Registry</a></td><td>/projects/:id/registry/repositories</td></tr><tr><td><a href="https://docs.gitlab.com/ee/api/custom_attributes.html">Custom attributes</a></td><td>/projects/:id/custom_attributes(also available for groups and users)</td></tr><tr><td><a href="https://docs.gitlab.com/ee/api/dependencies.html">Dependencies</a><a target="_blank" href="https://about.gitlab.com/pricing/" rel="noreferrer noopener"></a></td><td>/projects/:id/dependencies</td></tr><tr><td><a href="https://docs.gitlab.com/ee/api/deploy_keys.html">Deploy keys</a></td><td>/projects/:id/deploy_keys(also available standalone)</td></tr><tr><td><a href="https://docs.gitlab.com/ee/api/deployments.html">Deployments</a></td><td>/projects/:id/deployments</td></tr><tr><td><a href="https://docs.gitlab.com/ee/api/discussions.html">Discussions</a>(threaded comments)</td><td>/projects/:id/issues/.../discussions,/projects/:id/snippets/.../discussions,/projects/:id/merge_requests/.../discussions,/projects/:id/commits/.../discussions(also available for groups)</td></tr><tr><td><a href="https://docs.gitlab.com/ee/api/environments.html">Environments</a></td><td>/projects/:id/environments</td></tr><tr><td><a href="https://docs.gitlab.com/ee/api/error_tracking.html">Error Tracking</a></td><td>/projects/:id/error_tracking/settings</td></tr><tr><td><a href="https://docs.gitlab.com/ee/api/events.html">Events</a></td><td>/projects/:id/events(also available for users and standalone)</td></tr><tr><td><a href="https://docs.gitlab.com/ee/api/issues.html">Issues</a></td><td>/projects/:id/issues(also available for groups and standalone)</td></tr><tr><td><a href="https://docs.gitlab.com/ee/api/issues_statistics.html">Issues Statistics</a></td><td>/projects/:id/issues_statistics(also available for groups and standalone)</td></tr><tr><td><a href="https://docs.gitlab.com/ee/api/boards.html">Issue boards</a></td><td>/projects/:id/boards</td></tr><tr><td><a href="https://docs.gitlab.com/ee/api/issue_links.html">Issue links</a><a target="_blank" href="https://about.gitlab.com/pricing/" rel="noreferrer noopener"></a></td><td>/projects/:id/issues/.../links</td></tr><tr><td><a href="https://docs.gitlab.com/ee/api/jobs.html">Jobs</a></td><td>/projects/:id/jobs,/projects/:id/pipelines/.../jobs</td></tr><tr><td><a href="https://docs.gitlab.com/ee/api/labels.html">Labels</a></td><td>/projects/:id/labels</td></tr><tr><td><a href="https://docs.gitlab.com/ee/api/managed_licenses.html">Managed licenses</a><a target="_blank" href="https://about.gitlab.com/pricing/" rel="noreferrer noopener"></a></td><td>/projects/:id/managed_licenses</td></tr><tr><td><a href="https://docs.gitlab.com/ee/api/members.html">Members</a></td><td>/projects/:id/members(also available for groups)</td></tr><tr><td><a href="https://docs.gitlab.com/ee/api/merge_request_approvals.html">Merge request approvals</a><a target="_blank" href="https://about.gitlab.com/pricing/" rel="noreferrer noopener"></a></td><td>/projects/:id/approvals,/projects/:id/merge_requests/.../approvals</td></tr><tr><td><a href="https://docs.gitlab.com/ee/api/merge_requests.html">Merge requests</a></td><td>/projects/:id/merge_requests(also available for groups and standalone)</td></tr><tr><td><a href="https://docs.gitlab.com/ee/api/notes.html">Notes</a>(comments)</td><td>/projects/:id/issues/.../notes,/projects/:id/snippets/.../notes,/projects/:id/merge_requests/.../notes(also available for groups)</td></tr><tr><td><a href="https://docs.gitlab.com/ee/api/notification_settings.html">Notification settings</a></td><td>/projects/:id/notification_settings(also available for groups and standalone)</td></tr><tr><td><a href="https://docs.gitlab.com/ee/api/packages.html">Packages</a><a target="_blank" href="https://about.gitlab.com/pricing/" rel="noreferrer noopener"></a></td><td>/projects/:id/packages</td></tr><tr><td><a href="https://docs.gitlab.com/ee/api/pages_domains.html">Pages domains</a></td><td>/projects/:id/pages(also available standalone)</td></tr><tr><td><a href="https://docs.gitlab.com/ee/api/pipelines.html">Pipelines</a></td><td>/projects/:id/pipelines</td></tr><tr><td><a href="https://docs.gitlab.com/ee/api/pipeline_schedules.html">Pipeline schedules</a></td><td>/projects/:id/pipeline_schedules</td></tr><tr><td><a href="https://docs.gitlab.com/ee/api/pipeline_triggers.html">Pipeline triggers</a></td><td>/projects/:id/triggers</td></tr><tr><td><a href="https://docs.gitlab.com/ee/api/projects.html">Projects</a>including setting Webhooks</td><td>/projects,/projects/:id/hooks(also available for users)</td></tr><tr><td><a href="https://docs.gitlab.com/ee/api/project_badges.html">Project badges</a></td><td>/projects/:id/badges</td></tr><tr><td><a href="https://docs.gitlab.com/ee/api/project_clusters.html">Project clusters</a></td><td>/projects/:id/clusters</td></tr><tr><td><a href="https://docs.gitlab.com/ee/api/project_level_variables.html">Project-level variables</a></td><td>/projects/:id/variables</td></tr><tr><td><a href="https://docs.gitlab.com/ee/api/project_import_export.html">Project import/export</a></td><td>/projects/:id/export,/projects/import,/projects/:id/import</td></tr><tr><td><a href="https://docs.gitlab.com/ee/api/milestones.html">Project milestones</a></td><td>/projects/:id/milestones</td></tr><tr><td><a href="https://docs.gitlab.com/ee/api/project_snippets.html">Project snippets</a></td><td>/projects/:id/snippets</td></tr><tr><td><a href="https://docs.gitlab.com/ee/api/project_templates.html">Project templates</a></td><td>/projects/:id/templates</td></tr><tr><td><a href="https://docs.gitlab.com/ee/api/protected_environments.html">Protected_environments</a></td><td>/projects/:id/protected_environments</td></tr><tr><td><a href="https://docs.gitlab.com/ee/api/protected_branches.html">Protected branches</a></td><td>/projects/:id/protected_branches</td></tr><tr><td><a href="https://docs.gitlab.com/ee/api/protected_tags.html">Protected tags</a></td><td>/projects/:id/protected_tags</td></tr><tr><td><a href="https://docs.gitlab.com/ee/api/releases/index.html">Releases</a></td><td>/projects/:id/releases</td></tr><tr><td><a href="https://docs.gitlab.com/ee/api/releases/links.html">Release links</a></td><td>/projects/:id/releases/.../assets/links</td></tr><tr><td><a href="https://docs.gitlab.com/ee/api/repositories.html">Repositories</a></td><td>/projects/:id/repository</td></tr><tr><td><a href="https://docs.gitlab.com/ee/api/repository_files.html">Repository files</a></td><td>/projects/:id/repository/files</td></tr><tr><td><a href="https://docs.gitlab.com/ee/api/repository_submodules.html">Repository submodules</a></td><td>/projects/:id/repository/submodules</td></tr><tr><td><a href="https://docs.gitlab.com/ee/api/resource_label_events.html">Resource label events</a></td><td>/projects/:id/issues/.../resource_label_events,/projects/:id/merge_requests/.../resource_label_events(also available for groups)</td></tr><tr><td><a href="https://docs.gitlab.com/ee/api/runners.html">Runners</a></td><td>/projects/:id/runners(also available standalone)</td></tr><tr><td><a href="https://docs.gitlab.com/ee/api/search.html">Search</a></td><td>/projects/:id/search(also available for groups and standalone)</td></tr><tr><td><a href="https://docs.gitlab.com/ee/api/services.html">Services</a></td><td>/projects/:id/services</td></tr><tr><td><a href="https://docs.gitlab.com/ee/api/tags.html">Tags</a></td><td>/projects/:id/repository/tags</td></tr><tr><td><a href="https://docs.gitlab.com/ee/api/visual_review_discussions.html">Visual Review discussions</a>**(STARTER**)</td><td>/projects/:id/merge_requests/:merge_request_id/visual_review_discussions</td></tr><tr><td><a href="https://docs.gitlab.com/ee/api/vulnerabilities.html">Vulnerabilities</a><a target="_blank" href="https://about.gitlab.com/pricing/" rel="noreferrer noopener"></a></td><td>/projects/:id/vulnerabilities</td></tr><tr><td><a href="https://docs.gitlab.com/ee/api/vulnerability_findings.html">Vulnerability Findings</a><a target="_blank" href="https://about.gitlab.com/pricing/" rel="noreferrer noopener"></a></td><td>/projects/:id/vulnerability_findings</td></tr><tr><td><a href="https://docs.gitlab.com/ee/api/wikis.html">Wikis</a></td><td>/projects/:id/wikis</td></tr></tbody></table></figure>
<!-- /wp:table -->

## グループを取得する

指定のグループの情報を表示

リクエスト

```shell
/api/v4/groups/:id
(例: /api/v4/groups/3205033)
```

レスポンス

```json
{
    "id": 3205033,
    "web_url": "https://gitlab.com/groups/gl-quality",
    "name": "gl-quality",
    "path": "gl-quality",
    "description": "GitLab Quality user group for @ mentions (no projects)",
    "visibility": "public",
    "share_with_group_lock": false,
    "require_two_factor_authentication": false,
    "two_factor_grace_period": 48,
    "project_creation_level": "developer",
    "auto_devops_enabled": null,
    "subgroup_creation_level": "owner",
    "emails_disabled": null,
    "mentions_disabled": null,
    "lfs_enabled": false,
    "avatar_url": null,
    "request_access_enabled": false,
    "full_name": "gl-quality",
    "full_path": "gl-quality",
    "parent_id": null,
    "ldap_cn": null,
    "ldap_access": null,
    "projects": [],
    "shared_projects": [
        {
            "id": 9636672,
            "description": "Async retrospectives for the Quality department.",
            "name": "Quality retrospectives",
            "name_with_namespace": "GitLab team retrospectives / Quality retrospectives",
            "path": "quality",
            "path_with_namespace": "gl-retrospectives/quality",
            "created_at": "2018-11-27T10:22:13.077Z",
            "tag_list": [],
            "ssh_url_to_repo": "git@gitlab.com:gl-retrospectives/quality.git",
            "http_url_to_repo": "https://gitlab.com/gl-retrospectives/quality.git",
            "web_url": "https://gitlab.com/gl-retrospectives/quality",
            "readme_url": null,
            "avatar_url": null,
            "star_count": 0,
            "forks_count": 0,
            "last_activity_at": "2020-02-05T02:11:27.376Z",
            "namespace": {
                "id": 3068744,
                "name": "GitLab team retrospectives",
                "path": "gl-retrospectives",
                "kind": "group",
                "full_path": "gl-retrospectives",
                "parent_id": null,
                "avatar_url": null,
                "web_url": "https://gitlab.com/groups/gl-retrospectives"
            },
            "_links": {
                "self": "https://gitlab.com/api/v4/projects/9636672",
                "issues": "https://gitlab.com/api/v4/projects/9636672/issues",
                "repo_branches": "https://gitlab.com/api/v4/projects/9636672/repository/branches",
                "labels": "https://gitlab.com/api/v4/projects/9636672/labels",
                "events": "https://gitlab.com/api/v4/projects/9636672/events",
                "members": "https://gitlab.com/api/v4/projects/9636672/members"
            },
            "empty_repo": true,
            "archived": false,
            "visibility": "public",
            "resolve_outdated_diff_discussions": false,
            "container_registry_enabled": false,
            "issues_enabled": true,
            "merge_requests_enabled": false,
            "wiki_enabled": false,
            "jobs_enabled": false,
            "snippets_enabled": false,
            "can_create_merge_request_in": false,
            "issues_access_level": "enabled",
            "repository_access_level": "disabled",
            "merge_requests_access_level": "disabled",
            "wiki_access_level": "disabled",
            "builds_access_level": "disabled",
            "snippets_access_level": "disabled",
            "pages_access_level": "enabled",
            "emails_disabled": null,
            "shared_runners_enabled": true,
            "lfs_enabled": false,
            "creator_id": 443319,
            "import_status": "none",
            "open_issues_count": 0,
            "ci_default_git_depth": null,
            "public_jobs": true,
            "build_timeout": 3600,
            "auto_cancel_pending_pipelines": "enabled",
            "build_coverage_regex": null,
            "shared_with_groups": [
                {
                    "group_id": 3205033,
                    "group_name": "gl-quality",
                    "group_full_path": "gl-quality",
                    "group_access_level": 30,
                    "expires_at": null
                }
            ],
            "only_allow_merge_if_pipeline_succeeds": false,
            "request_access_enabled": false,
            "only_allow_merge_if_all_discussions_are_resolved": false,
            "remove_source_branch_after_merge": null,
            "printing_merge_request_link_enabled": true,
            "merge_method": "merge",
            "suggestion_commit_message": null,
            "auto_devops_enabled": false,
            "auto_devops_deploy_strategy": "continuous",
            "autoclose_referenced_issues": true,
            "approvals_before_merge": 0,
            "mirror": false,
            "external_authorization_classification_label": "",
            "packages_enabled": false,
            "service_desk_enabled": true,
            "service_desk_address": "incoming+gl-retrospectives-quality-9636672-issue-@incoming.gitlab.com",
            "marked_for_deletion_at": null
        },
        {
            "id": 3430480,
            "description": "GitLab's issues and merge requests triage, automated!",
            "name": "GitLab Triage",
            "name_with_namespace": "GitLab.org / GitLab Triage",
            "path": "gitlab-triage",
            "path_with_namespace": "gitlab-org/gitlab-triage",
            "created_at": "2017-06-03T04:10:44.539Z",
            "default_branch": "master",
            "tag_list": [],
            "ssh_url_to_repo": "git@gitlab.com:gitlab-org/gitlab-triage.git",
            "http_url_to_repo": "https://gitlab.com/gitlab-org/gitlab-triage.git",
            "web_url": "https://gitlab.com/gitlab-org/gitlab-triage",
            "readme_url": "https://gitlab.com/gitlab-org/gitlab-triage/-/blob/master/README.md",
            "avatar_url": null,
            "star_count": 76,
            "forks_count": 27,
            "last_activity_at": "2020-02-04T18:09:48.090Z",
            "namespace": {
                "id": 9970,
                "name": "GitLab.org",
                "path": "gitlab-org",
                "kind": "group",
                "full_path": "gitlab-org",
                "parent_id": null,
                "avatar_url": "/uploads/-/system/group/avatar/9970/logo-extra-whitespace.png",
                "web_url": "https://gitlab.com/groups/gitlab-org"
            },
            "_links": {
                "self": "https://gitlab.com/api/v4/projects/3430480",
                "issues": "https://gitlab.com/api/v4/projects/3430480/issues",
                "merge_requests": "https://gitlab.com/api/v4/projects/3430480/merge_requests",
                "repo_branches": "https://gitlab.com/api/v4/projects/3430480/repository/branches",
                "labels": "https://gitlab.com/api/v4/projects/3430480/labels",
                "events": "https://gitlab.com/api/v4/projects/3430480/events",
                "members": "https://gitlab.com/api/v4/projects/3430480/members"
            },
            "empty_repo": false,
            "archived": false,
            "visibility": "public",
            "resolve_outdated_diff_discussions": false,
            "container_registry_enabled": false,
            "issues_enabled": true,
            "merge_requests_enabled": true,
            "wiki_enabled": false,
            "jobs_enabled": true,
            "snippets_enabled": false,
            "can_create_merge_request_in": true,
            "issues_access_level": "enabled",
            "repository_access_level": "enabled",
            "merge_requests_access_level": "enabled",
            "wiki_access_level": "disabled",
            "builds_access_level": "enabled",
            "snippets_access_level": "disabled",
            "pages_access_level": "enabled",
            "emails_disabled": null,
            "shared_runners_enabled": true,
            "lfs_enabled": true,
            "creator_id": 419655,
            "import_status": "none",
            "open_issues_count": 72,
            "ci_default_git_depth": null,
            "public_jobs": true,
            "build_timeout": 36000,
            "auto_cancel_pending_pipelines": "enabled",
            "build_coverage_regex": "",
            "ci_config_path": null,
            "shared_with_groups": [
                {
                    "group_id": 3205033,
                    "group_name": "gl-quality",
                    "group_full_path": "gl-quality",
                    "group_access_level": 40,
                    "expires_at": null
                }
            ],
            "only_allow_merge_if_pipeline_succeeds": true,
            "request_access_enabled": false,
            "only_allow_merge_if_all_discussions_are_resolved": true,
            "remove_source_branch_after_merge": null,
            "printing_merge_request_link_enabled": true,
            "merge_method": "merge",
            "suggestion_commit_message": null,
            "auto_devops_enabled": false,
            "auto_devops_deploy_strategy": "continuous",
            "autoclose_referenced_issues": true,
            "approvals_before_merge": 1,
            "mirror": false,
            "external_authorization_classification_label": "",
            "packages_enabled": null,
            "service_desk_enabled": null,
            "service_desk_address": null,
            "marked_for_deletion_at": null
        },
        {
            "id": 1441932,
            "description": "An orchestration tool that enables running various end-to-end scenarios against any GitLab instance.",
            "name": "GitLab QA",
            "name_with_namespace": "GitLab.org / GitLab QA",
            "path": "gitlab-qa",
            "path_with_namespace": "gitlab-org/gitlab-qa",
            "created_at": "2016-07-25T10:35:44.335Z",
            "default_branch": "master",
            "tag_list": [],
            "ssh_url_to_repo": "git@gitlab.com:gitlab-org/gitlab-qa.git",
            "http_url_to_repo": "https://gitlab.com/gitlab-org/gitlab-qa.git",
            "web_url": "https://gitlab.com/gitlab-org/gitlab-qa",
            "readme_url": "https://gitlab.com/gitlab-org/gitlab-qa/-/blob/master/README.md",
            "avatar_url": null,
            "star_count": 34,
            "forks_count": 25,
            "last_activity_at": "2020-02-10T07:08:31.497Z",
            "namespace": {
                "id": 9970,
                "name": "GitLab.org",
                "path": "gitlab-org",
                "kind": "group",
                "full_path": "gitlab-org",
                "parent_id": null,
                "avatar_url": "/uploads/-/system/group/avatar/9970/logo-extra-whitespace.png",
                "web_url": "https://gitlab.com/groups/gitlab-org"
            },
            "_links": {
                "self": "https://gitlab.com/api/v4/projects/1441932",
                "issues": "https://gitlab.com/api/v4/projects/1441932/issues",
                "merge_requests": "https://gitlab.com/api/v4/projects/1441932/merge_requests",
                "repo_branches": "https://gitlab.com/api/v4/projects/1441932/repository/branches",
                "labels": "https://gitlab.com/api/v4/projects/1441932/labels",
                "events": "https://gitlab.com/api/v4/projects/1441932/events",
                "members": "https://gitlab.com/api/v4/projects/1441932/members"
            },
            "empty_repo": false,
            "archived": false,
            "visibility": "public",
            "resolve_outdated_diff_discussions": false,
            "container_registry_enabled": true,
            "issues_enabled": true,
            "merge_requests_enabled": true,
            "wiki_enabled": true,
            "jobs_enabled": true,
            "snippets_enabled": true,
            "can_create_merge_request_in": true,
            "issues_access_level": "enabled",
            "repository_access_level": "enabled",
            "merge_requests_access_level": "enabled",
            "wiki_access_level": "enabled",
            "builds_access_level": "enabled",
            "snippets_access_level": "enabled",
            "pages_access_level": "enabled",
            "emails_disabled": null,
            "shared_runners_enabled": false,
            "lfs_enabled": true,
            "creator_id": 263716,
            "import_status": "none",
            "open_issues_count": 66,
            "ci_default_git_depth": null,
            "public_jobs": false,
            "build_timeout": 7200,
            "auto_cancel_pending_pipelines": "enabled",
            "build_coverage_regex": "",
            "ci_config_path": "",
            "shared_with_groups": [
                {
                    "group_id": 3205033,
                    "group_name": "gl-quality",
                    "group_full_path": "gl-quality",
                    "group_access_level": 40,
                    "expires_at": null
                }
            ],
            "only_allow_merge_if_pipeline_succeeds": false,
            "request_access_enabled": false,
            "only_allow_merge_if_all_discussions_are_resolved": true,
            "remove_source_branch_after_merge": true,
            "printing_merge_request_link_enabled": true,
            "merge_method": "merge",
            "suggestion_commit_message": null,
            "auto_devops_enabled": false,
            "auto_devops_deploy_strategy": "continuous",
            "autoclose_referenced_issues": true,
            "approvals_before_merge": 1,
            "mirror": false,
            "external_authorization_classification_label": "",
            "packages_enabled": null,
            "service_desk_enabled": null,
            "service_desk_address": null,
            "marked_for_deletion_at": null
        },
        {
            "id": 278964,
            "description": "GitLab is an open source end-to-end software development platform with built-in version control, issue tracking, code review, CI/CD, and more. Self-host GitLab on your own servers, in a container, or on a cloud provider.",
            "name": "GitLab",
            "name_with_namespace": "GitLab.org / GitLab",
            "path": "gitlab",
            "path_with_namespace": "gitlab-org/gitlab",
            "created_at": "2015-05-20T10:47:11.949Z",
            "default_branch": "master",
            "tag_list": [],
            "ssh_url_to_repo": "git@gitlab.com:gitlab-org/gitlab.git",
            "http_url_to_repo": "https://gitlab.com/gitlab-org/gitlab.git",
            "web_url": "https://gitlab.com/gitlab-org/gitlab",
            "readme_url": "https://gitlab.com/gitlab-org/gitlab/-/blob/master/README.md",
            "avatar_url": "https://assets.gitlab-static.net/uploads/-/system/project/avatar/278964/logo-extra-whitespace.png",
            "star_count": 1451,
            "forks_count": 1520,
            "last_activity_at": "2020-02-10T09:34:25.026Z",
            "namespace": {
                "id": 9970,
                "name": "GitLab.org",
                "path": "gitlab-org",
                "kind": "group",
                "full_path": "gitlab-org",
                "parent_id": null,
                "avatar_url": "/uploads/-/system/group/avatar/9970/logo-extra-whitespace.png",
                "web_url": "https://gitlab.com/groups/gitlab-org"
            },
            "_links": {
                "self": "https://gitlab.com/api/v4/projects/278964",
                "issues": "https://gitlab.com/api/v4/projects/278964/issues",
                "merge_requests": "https://gitlab.com/api/v4/projects/278964/merge_requests",
                "repo_branches": "https://gitlab.com/api/v4/projects/278964/repository/branches",
                "labels": "https://gitlab.com/api/v4/projects/278964/labels",
                "events": "https://gitlab.com/api/v4/projects/278964/events",
                "members": "https://gitlab.com/api/v4/projects/278964/members"
            },
            "empty_repo": false,
            "archived": false,
            "visibility": "public",
            "resolve_outdated_diff_discussions": false,
            "container_registry_enabled": true,
            "issues_enabled": true,
            "merge_requests_enabled": true,
            "wiki_enabled": false,
            "jobs_enabled": true,
            "snippets_enabled": true,
            "can_create_merge_request_in": true,
            "issues_access_level": "enabled",
            "repository_access_level": "enabled",
            "merge_requests_access_level": "enabled",
            "wiki_access_level": "disabled",
            "builds_access_level": "enabled",
            "snippets_access_level": "enabled",
            "pages_access_level": "enabled",
            "emails_disabled": false,
            "shared_runners_enabled": true,
            "lfs_enabled": true,
            "creator_id": 5497,
            "import_status": "finished",
            "open_issues_count": 25238,
            "ci_default_git_depth": null,
            "public_jobs": true,
            "build_timeout": 7680,
            "auto_cancel_pending_pipelines": "enabled",
            "build_coverage_regex": "",
            "ci_config_path": "",
            "shared_with_groups": [
                {
                    "group_id": 3205033,
                    "group_name": "gl-quality",
                    "group_full_path": "gl-quality",
                    "group_access_level": 30,
                    "expires_at": null
                },
                {
                    "group_id": 6150316,
                    "group_name": "frontend",
                    "group_full_path": "gitlab-org/maintainers/frontend",
                    "group_access_level": 30,
                    "expires_at": null
                },
                {
                    "group_id": 1356356,
                    "group_name": "GitLab docs team",
                    "group_full_path": "gl-docsteam",
                    "group_access_level": 30,
                    "expires_at": null
                },
                {
                    "group_id": 5924764,
                    "group_name": "database",
                    "group_full_path": "gitlab-org/maintainers/database",
                    "group_access_level": 30,
                    "expires_at": null
                },
                {
                    "group_id": 5747833,
                    "group_name": "eng-prod",
                    "group_full_path": "gl-quality/eng-prod",
                    "group_access_level": 30,
                    "expires_at": null
                },
                {
                    "group_id": 3887968,
                    "group_name": "rails-backend",
                    "group_full_path": "gitlab-org/maintainers/rails-backend",
                    "group_access_level": 40,
                    "expires_at": null
                },
                {
                    "group_id": 2584649,
                    "group_name": "managers",
                    "group_full_path": "gitlab-org/release/managers",
                    "group_access_level": 40,
                    "expires_at": null
                }
            ],
            "only_allow_merge_if_pipeline_succeeds": false,
            "request_access_enabled": false,
            "only_allow_merge_if_all_discussions_are_resolved": true,
            "remove_source_branch_after_merge": true,
            "printing_merge_request_link_enabled": true,
            "merge_method": "merge",
            "suggestion_commit_message": "",
            "auto_devops_enabled": false,
            "auto_devops_deploy_strategy": "continuous",
            "autoclose_referenced_issues": true,
            "approvals_before_merge": 1,
            "mirror": false,
            "external_authorization_classification_label": "",
            "packages_enabled": false,
            "service_desk_enabled": false,
            "service_desk_address": null,
            "marked_for_deletion_at": null
        }
    ],
    "shared_runners_minutes_limit": null,
    "extra_shared_runners_minutes_limit": null
}
```

<!-- wp:heading {"level":3} -->

### その他

<table>
    <thead>
        <tr>
            <th>Resource</th>
            <th>Available endpoints</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><a href="https://docs.gitlab.com/ee/api/access_requests.html">Access requests</a></td>
            <td>/groups/:id/access_requests/(also available for projects)</td>
        </tr>
        <tr>
            <td><a href="https://docs.gitlab.com/ee/api/custom_attributes.html">Custom attributes</a></td>
            <td>/groups/:id/custom_attributes(also available for projects and users)</td>
        </tr>
        <tr>
            <td><a href="https://docs.gitlab.com/ee/api/discussions.html">Discussions</a>(threaded comments)<a
                    target="_blank" href="https://about.gitlab.com/pricing/" rel="noreferrer noopener"></a></td>
            <td>/groups/:id/epics/.../discussions(also available for projects)</td>
        </tr>
        <tr>
            <td><a href="https://docs.gitlab.com/ee/api/epic_issues.html">Epic issues</a><a target="_blank"
                    href="https://about.gitlab.com/pricing/" rel="noreferrer noopener"></a></td>
            <td>/groups/:id/epics/.../issues</td>
        </tr>
        <tr>
            <td><a href="https://docs.gitlab.com/ee/api/epic_links.html">Epic links</a><a target="_blank"
                    href="https://about.gitlab.com/pricing/" rel="noreferrer noopener"></a></td>
            <td>/groups/:id/epics/.../epics</td>
        </tr>
        <tr>
            <td><a href="https://docs.gitlab.com/ee/api/epics.html">Epics</a><a target="_blank"
                    href="https://about.gitlab.com/pricing/" rel="noreferrer noopener"></a></td>
            <td>/groups/:id/epics</td>
        </tr>
        <tr>
            <td><a href="https://docs.gitlab.com/ee/api/groups.html">Groups</a></td>
            <td>/groups,/groups/.../subgroups</td>
        </tr>
        <tr>
            <td><a href="https://docs.gitlab.com/ee/api/group_badges.html">Group badges</a></td>
            <td>/groups/:id/badges</td>
        </tr>
        <tr>
            <td><a href="https://docs.gitlab.com/ee/api/group_boards.html">Group issue boards</a></td>
            <td>/groups/:id/boards</td>
        </tr>
        <tr>
            <td><a href="https://docs.gitlab.com/ee/api/group_labels.html">Group labels</a></td>
            <td>/groups/:id/labels</td>
        </tr>
        <tr>
            <td><a href="https://docs.gitlab.com/ee/api/group_level_variables.html">Group-level variables</a></td>
            <td>/groups/:id/variables</td>
        </tr>
        <tr>
            <td><a href="https://docs.gitlab.com/ee/api/group_milestones.html">Group milestones</a></td>
            <td>/groups/:id/milestones</td>
        </tr>
        <tr>
            <td><a href="https://docs.gitlab.com/ee/api/issues.html">Issues</a></td>
            <td>/groups/:id/issues(also available for projects and standalone)</td>
        </tr>
        <tr>
            <td><a href="https://docs.gitlab.com/ee/api/issues_statistics.html">Issues Statistics</a></td>
            <td>/groups/:id/issues_statistics(also available for projects and standalone)</td>
        </tr>
        <tr>
            <td><a href="https://docs.gitlab.com/ee/api/members.html">Members</a></td>
            <td>/groups/:id/members(also available for projects)</td>
        </tr>
        <tr>
            <td><a href="https://docs.gitlab.com/ee/api/merge_requests.html">Merge requests</a></td>
            <td>/groups/:id/merge_requests(also available for projects and standalone)</td>
        </tr>
        <tr>
            <td><a href="https://docs.gitlab.com/ee/api/notes.html">Notes</a>(comments)</td>
            <td>/groups/:id/epics/.../notes(also available for projects)</td>
        </tr>
        <tr>
            <td><a href="https://docs.gitlab.com/ee/api/notification_settings.html">Notification settings</a></td>
            <td>/groups/:id/notification_settings(also available for projects and standalone)</td>
        </tr>
        <tr>
            <td><a href="https://docs.gitlab.com/ee/api/resource_label_events.html">Resource label events</a></td>
            <td>/groups/:id/epics/.../resource_label_events(also available for projects)</td>
        </tr>
        <tr>
            <td><a href="https://docs.gitlab.com/ee/api/search.html">Search</a></td>
            <td>/groups/:id/search(also available for projects and standalone)</td>
        </tr>
    </tbody>
</table>

## ユーザの取得

<!-- wp:heading {"level":3} -->

### ユーザ一覧

リクエスト

```shell
/api/v4/users?per_page=3&page=1
```

レスポンス

```json
[
    {
        "id": 5409901,
        "name": "Jayaprakash Bhimineni",
        "username": "jpbeemineni",
        "state": "active",
        "avatar_url": "https://secure.gravatar.com/avatar/a76089e1fbbaf0976f1e3586059647d6?s=80\u0026d=identicon",
        "web_url": "https://gitlab.com/jpbeemineni"
    },
    {
        "id": 5409900,
        "name": "Riccardo De Cristofaris",
        "username": "r.decristofaris",
        "state": "active",
        "avatar_url": "https://secure.gravatar.com/avatar/1738cf9ef394d21e0c529b21508b7525?s=80\u0026d=identicon",
        "web_url": "https://gitlab.com/r.decristofaris"
    },
    {
        "id": 5409899,
        "name": "Lars van den Hazel",
        "username": "Larshazel",
        "state": "active",
        "avatar_url": "https://secure.gravatar.com/avatar/2bcc5d9bea0164bcc464c36ca7d8b525?s=80\u0026d=identicon",
        "web_url": "https://gitlab.com/Larshazel"
    }
]
```

<!-- wp:heading {"level":3} -->

### ユーザ詳細

リクエスト

```shell
/api/v4/users/:id
(例: /api/v4/users/4206326)
```

レスポンス

```json
{
    "id": 4206326,
    "name": "Yoshiki Shinagawa",
    "username": "s-yoshiki",
    "state": "active",
    "avatar_url": "https://secure.gravatar.com/avatar/9e9fac1555b78c6c94e46bf99741f5f1?s=80\u0026d=identicon",
    "web_url": "https://gitlab.com/s-yoshiki",
    "created_at": "2019-06-27T02:22:35.354Z",
    "bio": null,
    "location": null,
    "public_email": "",
    "skype": "",
    "linkedin": "",
    "twitter": "",
    "website_url": "",
    "organization": null
}
```


### その他、独立したAPI

<table>
    <thead>
        <tr>
            <th>Resource</th>
            <th>Available endpoints</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><a href="https://docs.gitlab.com/ee/api/appearance.html">Appearance</a><a target="_blank"
                    href="https://about.gitlab.com/pricing/" rel="noreferrer noopener"></a></td>
            <td>/application/appearance</td>
        </tr>
        <tr>
            <td><a href="https://docs.gitlab.com/ee/api/applications.html">Applications</a></td>
            <td>/applications</td>
        </tr>
        <tr>
            <td><a href="https://docs.gitlab.com/ee/api/audit_events.html">Audit Events</a><a target="_blank"
                    href="https://about.gitlab.com/pricing/" rel="noreferrer noopener"></a></td>
            <td>/audit_events</td>
        </tr>
        <tr>
            <td><a href="https://docs.gitlab.com/ee/api/avatar.html">Avatar</a></td>
            <td>/avatar</td>
        </tr>
        <tr>
            <td><a href="https://docs.gitlab.com/ee/api/broadcast_messages.html">Broadcast messages</a></td>
            <td>/broadcast_messages</td>
        </tr>
        <tr>
            <td><a href="https://docs.gitlab.com/ee/api/snippets.html">Code snippets</a></td>
            <td>/snippets</td>
        </tr>
        <tr>
            <td><a href="https://docs.gitlab.com/ee/api/custom_attributes.html">Custom attributes</a></td>
            <td>/users/:id/custom_attributes(also available for groups and projects)</td>
        </tr>
        <tr>
            <td><a href="https://docs.gitlab.com/ee/api/deploy_keys.html">Deploy keys</a></td>
            <td>/deploy_keys(also available for projects)</td>
        </tr>
        <tr>
            <td><a href="https://docs.gitlab.com/ee/api/events.html">Events</a></td>
            <td>/events,/users/:id/events(also available for projects)</td>
        </tr>
        <tr>
            <td><a href="https://docs.gitlab.com/ee/api/features.html">Feature flags</a></td>
            <td>/features</td>
        </tr>
        <tr>
            <td><a href="https://docs.gitlab.com/ee/api/geo_nodes.html">Geo Nodes</a><a target="_blank"
                    href="https://about.gitlab.com/pricing/" rel="noreferrer noopener"></a></td>
            <td>/geo_nodes</td>
        </tr>
        <tr>
            <td><a href="https://docs.gitlab.com/ee/api/import.html">Import repository from GitHub</a></td>
            <td>/import/github</td>
        </tr>
        <tr>
            <td><a href="https://docs.gitlab.com/ee/api/issues.html">Issues</a></td>
            <td>/issues(also available for groups and projects)</td>
        </tr>
        <tr>
            <td><a href="https://docs.gitlab.com/ee/api/issues_statistics.html">Issues Statistics</a></td>
            <td>/issues_statistics(also available for groups and projects)</td>
        </tr>
        <tr>
            <td><a href="https://docs.gitlab.com/ee/api/keys.html">Keys</a></td>
            <td>/keys</td>
        </tr>
        <tr>
            <td><a href="https://docs.gitlab.com/ee/api/license.html">License</a><a target="_blank"
                    href="https://about.gitlab.com/pricing/" rel="noreferrer noopener"></a></td>
            <td>/license</td>
        </tr>
        <tr>
            <td><a href="https://docs.gitlab.com/ee/api/markdown.html">Markdown</a></td>
            <td>/markdown</td>
        </tr>
        <tr>
            <td><a href="https://docs.gitlab.com/ee/api/merge_requests.html">Merge requests</a></td>
            <td>/merge_requests(also available for groups and projects)</td>
        </tr>
        <tr>
            <td><a href="https://docs.gitlab.com/ee/api/namespaces.html">Namespaces</a></td>
            <td>/namespaces</td>
        </tr>
        <tr>
            <td><a href="https://docs.gitlab.com/ee/api/notification_settings.html">Notification settings</a></td>
            <td>/notification_settings(also available for groups and projects)</td>
        </tr>
        <tr>
            <td><a href="https://docs.gitlab.com/ee/api/pages_domains.html">Pages domains</a></td>
            <td>/pages/domains(also available for projects)</td>
        </tr>
        <tr>
            <td><a href="https://docs.gitlab.com/ee/api/projects.html">Projects</a></td>
            <td>/users/:id/projects(also available for projects)</td>
        </tr>
        <tr>
            <td><a href="https://docs.gitlab.com/ee/api/runners.html">Runners</a></td>
            <td>/runners(also available for projects)</td>
        </tr>
        <tr>
            <td><a href="https://docs.gitlab.com/ee/api/search.html">Search</a></td>
            <td>/search(also available for groups and projects)</td>
        </tr>
        <tr>
            <td><a href="https://docs.gitlab.com/ee/api/settings.html">Settings</a></td>
            <td>/application/settings</td>
        </tr>
        <tr>
            <td><a href="https://docs.gitlab.com/ee/api/statistics.html">Statistics</a></td>
            <td>/application/statistics</td>
        </tr>
        <tr>
            <td><a href="https://docs.gitlab.com/ee/api/sidekiq_metrics.html">Sidekiq metrics</a></td>
            <td>/sidekiq</td>
        </tr>
        <tr>
            <td><a href="https://docs.gitlab.com/ee/api/suggestions.html">Suggestions</a></td>
            <td>/suggestions</td>
        </tr>
        <tr>
            <td><a href="https://docs.gitlab.com/ee/api/system_hooks.html">System hooks</a></td>
            <td>/hooks</td>
        </tr>
        <tr>
            <td><a href="https://docs.gitlab.com/ee/api/todos.html">Todos</a></td>
            <td>/todos</td>
        </tr>
        <tr>
            <td><a href="https://docs.gitlab.com/ee/api/users.html">Users</a></td>
            <td>/users</td>
        </tr>
        <tr>
            <td><a href="https://docs.gitlab.com/ee/api/lint.html">Validate.gitlab-ci.ymlfile</a></td>
            <td>/lint</td>
        </tr>
        <tr>
            <td><a href="https://docs.gitlab.com/ee/api/version.html">Version</a></td>
            <td>/version</td>
        </tr>
    </tbody>
</table>

