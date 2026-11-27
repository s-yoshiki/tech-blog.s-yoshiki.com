'use client';

import { useReadingProgress } from 'hooks/use-reading-progress';

/** Thin bar pinned under the sticky header showing how far through the article you are. */
export default function ReadingProgress({ targetId }: { targetId: string }) {
  const progress = useReadingProgress(targetId);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-(--header-height) z-40 h-0.5"
    >
      <div
        className="h-full origin-left bg-primary will-change-transform"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
