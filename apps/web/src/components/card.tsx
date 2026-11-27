import AIGeneratedBadge from 'components/ai-generated-badge';
import Tag from 'components/tag';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import styles from './card.module.css';

interface CardProps {
  src: string;
  title: string;
  date: string;
  href: string;
  tags: string[];
  aiGenerated: boolean;
}

const getYMD = (arg: string) => arg.split(' ')[0];

/**
 * Cover images here are technology logos, not photographs, so they are shown
 * contained in a small tile rather than cropped into a banner.
 */
const Card = ({ src, title, date, href, tags, aiGenerated }: CardProps) => (
  <article className={styles.card}>
    <span className={styles.cover}>
      <img
        alt=""
        aria-hidden="true"
        src={src}
        width={44}
        height={44}
        loading="lazy"
        decoding="async"
      />
    </span>

    <div className={styles.body}>
      <div className={styles.meta}>
        <div className={styles.metaMain}>
          <time dateTime={getYMD(date)} className={styles.date}>
            {getYMD(date)}
          </time>
          {aiGenerated && <AIGeneratedBadge compact />}
        </div>
        <ArrowUpRight aria-hidden="true" className={styles.arrow} />
      </div>

      <h3 className={styles.title}>
        {/* Stretched so the whole card is the click target; the tag links below
            sit on a higher stacking context to stay independently clickable. */}
        <Link href={href} className={styles.link}>
          {title}
        </Link>
      </h3>

      {tags.length > 0 && (
        <ul className={styles.tags}>
          {tags.slice(0, 3).map((tag) => (
            <li key={tag}>
              <Tag keyword={tag} />
            </li>
          ))}
        </ul>
      )}
    </div>
  </article>
);

export default Card;
