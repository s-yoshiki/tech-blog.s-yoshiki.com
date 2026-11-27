'use client';

import { useReadingProgress } from 'hooks/use-reading-progress';
import { useRef } from 'react';
import styles from './reading-progress.module.css';

/** Thin bar pinned under the sticky header showing how far through the article you are. */
export default function ReadingProgress({ targetId }: { targetId: string }) {
  const barRef = useRef<HTMLDivElement>(null);
  useReadingProgress(targetId, barRef);

  return (
    <div ref={barRef} aria-hidden="true" className={styles.track}>
      <div className={styles.bar} />
    </div>
  );
}
