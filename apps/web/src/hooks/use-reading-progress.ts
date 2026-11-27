'use client';

import { type RefObject, useEffect } from 'react';

/**
 * Writes the scroll progress (0–1) through `targetId` to a CSS custom property
 * on `barRef`. Updating the style directly keeps scroll handling off React's
 * render path entirely.
 */
export const useReadingProgress = (targetId: string, barRef: RefObject<HTMLElement | null>) => {
  useEffect(() => {
    const target = document.getElementById(targetId);
    const bar = barRef.current;
    if (!target || !bar) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = target.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const progress = scrollable <= 0 ? 1 : Math.min(1, Math.max(0, -rect.top / scrollable));
      bar.style.setProperty('--progress', progress.toFixed(4));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [targetId, barRef]);
};
