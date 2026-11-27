import Author from 'components/author';
import Container from 'components/container';
import SectionHeading from 'components/section-heading';
import { UserRound } from 'lucide-react';
import styles from './section.module.css';

const AuthorSection = () => (
  <section className={styles.section} data-muted="" data-deferred="">
    <Container className={styles.inner}>
      <SectionHeading icon={UserRound}>著者について</SectionHeading>
      <div className={styles.authorCard}>
        <Author />
      </div>
    </Container>
  </section>
);

export default AuthorSection;
