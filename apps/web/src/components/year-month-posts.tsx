import type { IGroupByYearMonthItems } from '@repo/blog-content';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import styles from './year-month-posts.module.css';

interface Props {
  items: IGroupByYearMonthItems[];
}

/**
 * Year groups use native <details>: keyboard and screen-reader behaviour comes
 * for free and the component needs no client JavaScript.
 */
const YearMonthPosts = ({ items }: Props) => (
  <ul className={styles.list}>
    {items.map((year, index) => (
      <li key={year.name}>
        <details open={index === 0} className={styles.year}>
          <summary className={styles.summary}>
            <ChevronRight aria-hidden="true" className={styles.chevron} />
            <span className={styles.label}>{year.name} 年</span>
            <span className={styles.count}>{year.counts}</span>
          </summary>
          <ul className={styles.months}>
            <li>
              <Link href={`/date/${year.name}/`} className={styles.month}>
                {year.name}年のすべて
                <span className={styles.count}>{year.counts}</span>
              </Link>
            </li>
            {year.months.map((month) => {
              const key = month.name.split('-')[1];
              return (
                <li key={month.name}>
                  <Link href={`/date/${year.name}/${key}/`} className={styles.month}>
                    {Number(key)}月<span className={styles.count}>{month.counts}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </details>
      </li>
    ))}
  </ul>
);

export default YearMonthPosts;
