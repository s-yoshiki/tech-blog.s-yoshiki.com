import type { IGroupByItems, IGroupByYearMonthItems } from '@repo/blog-content';
import SectionHeading from 'components/section-heading';
import Tag from 'components/tag';
import YearMonthPosts from 'components/year-month-posts';
import { CalendarDays, Hash } from 'lucide-react';

interface BrowseSectionProps {
  tags: IGroupByItems[];
  dates: IGroupByYearMonthItems[];
}

/** Tag cloud + date archive, shown at the foot of the home and article pages. */
const BrowseSection = ({ tags, dates }: BrowseSectionProps) => (
  <section className="border-border border-t">
    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div>
        <SectionHeading icon={Hash}>タグから探す</SectionHeading>
        <ul className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li key={tag.name}>
              <Tag keyword={tag.name} count={tag.counts} size="md" />
            </li>
          ))}
        </ul>
      </div>
      <div>
        <SectionHeading icon={CalendarDays}>アーカイブ</SectionHeading>
        <div className="rounded-xl border border-border bg-card p-2">
          <YearMonthPosts items={dates} />
        </div>
      </div>
    </div>
  </section>
);

export default BrowseSection;
