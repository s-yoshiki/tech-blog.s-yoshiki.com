import { type PostDate, toDateString } from '@repo/blog-content';
import AIGeneratedBadge from 'components/ai-generated-badge';
import { Stack, Text } from '@repo/ui';
import Tag from 'components/tag';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import styles from './card.module.css';

interface CardProps {
  src: string;
  title: string;
  date: PostDate;
  href: string;
  tags: string[];
  aiGenerated: boolean;
}

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
      <Stack direction="row" align="start" justify="between" gap={2} className={styles.meta}>
        <Stack direction="row" align="center" gap={2}>
          <Text as="time" size="xs" tone="muted" numeric dateTime={toDateString(date)}>
            {toDateString(date)}
          </Text>
          {aiGenerated && <AIGeneratedBadge compact />}
        </Stack>
        <ArrowUpRight aria-hidden="true" className={styles.arrow} />
      </Stack>

      <h3 className={styles.title}>
        {/* Stretched so the whole card is the click target; the tag links below
            sit on a higher stacking context to stay independently clickable. */}
        <Link href={href} className={styles.link}>
          {title}
        </Link>
      </h3>

      {tags.length > 0 && (
        <Stack as="ul" direction="row" wrap gap={2} className={styles.tags}>
          {tags.slice(0, 3).map((tag) => (
            <li key={tag}>
              <Tag keyword={tag} />
            </li>
          ))}
        </Stack>
      )}
    </div>
  </article>
);

export default Card;
