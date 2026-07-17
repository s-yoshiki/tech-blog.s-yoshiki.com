import Link from 'next/link';
import Badge from 'components/badge';
import PostsBand from 'components/posts-band';
import { Button } from 'components/ui/button';
import type { Posts } from 'types/entry.interface';

interface Props { title: string; posts: Posts[]; badge?: string; pagination?: { current: number; total: number; basePath: string } }

const Pagination = ({ current, total, basePath }: NonNullable<Props['pagination']>) => <nav className="flex items-center justify-center gap-4" aria-label="ページネーション">
  {current > 1 ? <Button variant="outline" asChild><Link href={`${basePath}/${current - 1}`}>前へ</Link></Button> : <span className="w-20" />}
  <span className="text-sm text-muted-foreground">{current} / {total}</span>
  {current < total ? <Button variant="outline" asChild><Link href={`${basePath}/${current + 1}`}>次へ</Link></Button> : <span className="w-20" />}
</nav>;

export default function PostsIndexPage({ title, posts, badge, pagination }: Props) {
  return <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6"><header className="mb-10 flex items-center gap-3"><h1 className="text-3xl font-bold tracking-tight">{title}</h1>{badge && <Badge keyword={badge} />}</header>{pagination && <Pagination {...pagination} />}<div className="my-8"><PostsBand posts={posts} /></div>{pagination && <Pagination {...pagination} />}</div>;
}
