import type { IGroupByItems, IGroupByYearMonthItems } from '@repo/blog-content';
import Container from 'components/container';
import SectionHeading from 'components/section-heading';
import Tag from 'components/tag';
import YearMonthPosts from 'components/year-month-posts';
import { CalendarDays, Hash } from 'lucide-react';
import styles from './section.module.css';

interface BrowseSectionProps {
  tags: IGroupByItems[];
  dates: IGroupByYearMonthItems[];
}

/** Tag cloud + date archive, shown at the foot of the home and article pages. */
const BrowseSection = ({ tags, dates }: BrowseSectionProps) => (
  <section className={styles.section} data-deferred="">
    <Container className={styles.split}>
      <div>
        <SectionHeading icon={Hash}>タグから探す</SectionHeading>
        <ul className={styles.tagList}>
          {tags.map((tag) => (
            <li key={tag.name}>
              <Tag keyword={tag.name} count={tag.counts} size="md" />
            </li>
          ))}
        </ul>
      </div>
      <div>
        <SectionHeading icon={CalendarDays}>アーカイブ</SectionHeading>
        <div className={styles.panel}>
          <YearMonthPosts items={dates} />
        </div>
      </div>
    </Container>
  </section>
);

export default BrowseSection;
