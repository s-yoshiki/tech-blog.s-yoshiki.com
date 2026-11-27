'use client';

import { Toggle } from '@repo/ui';
import { useTheme } from 'hooks/use-theme';
import { Moon, Sun } from 'lucide-react';
import styles from './theme-toggle.module.css';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Toggle
      pressed={isDark}
      onPressedChange={(pressed) => setTheme(pressed ? 'dark' : 'light')}
      aria-label="ダークモード"
      suppressHydrationWarning
    >
      {/* Both icons are in the markup; CSS picks one so SSR output is already right. */}
      <Sun size={16} className={styles.sun} />
      <Moon size={16} className={styles.moon} />
    </Toggle>
  );
};

export default ThemeToggle;
