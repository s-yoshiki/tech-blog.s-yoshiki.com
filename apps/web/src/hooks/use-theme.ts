'use client';

import { THEME_STORAGE_KEY } from 'components/layout/theme-script';
import { useCallback, useSyncExternalStore } from 'react';

type Theme = 'light' | 'dark';

const listeners = new Set<() => void>();
const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

const getSnapshot = (): Theme =>
  document.documentElement.classList.contains('dark') ? 'dark' : 'light';
// The pre-paint script decides the real theme; the server can only guess.
const getServerSnapshot = (): Theme => 'light';

/**
 * The theme lives on <html class="dark"> (set before paint by ThemeScript), so
 * that element is the single source of truth and React just subscribes to it.
 */
export const useTheme = () => {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setTheme = useCallback((next: Theme) => {
    document.documentElement.classList.toggle('dark', next === 'dark');
    document.documentElement.style.colorScheme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* storage unavailable (private mode); the theme still applies for now */
    }
    for (const listener of listeners) listener();
  }, []);

  const toggleTheme = useCallback(
    () => setTheme(getSnapshot() === 'dark' ? 'light' : 'dark'),
    [setTheme],
  );

  return { theme, setTheme, toggleTheme };
};
