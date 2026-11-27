import { Button } from '@repo/ui';
import Container from 'components/container';
import Link from 'next/link';
import styles from './page.module.css';

export default function NotFound() {
  return (
    <Container size="narrow" className={styles.notFound}>
      <span className={styles.notFoundLogo}>404</span>
      <h1 className={styles.notFoundTitle}>ページが見つかりません</h1>
      <p className={styles.notFoundText}>URLが変更されたか、ページが削除された可能性があります。</p>
      <div className={styles.actions}>
        <Button render={<Link href="/" />}>トップへ戻る</Button>
        <Button variant="outline" render={<Link href="/#search" />}>
          記事を検索
        </Button>
      </div>
    </Container>
  );
}
