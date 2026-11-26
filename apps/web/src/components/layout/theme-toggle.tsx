'use client';

import { Button } from '@repo/ui';
import { useTheme } from 'hooks/use-theme';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={isDark ? 'ライトモードに切り替え' : 'ダークモードに切り替え'}
      aria-pressed={isDark}
      suppressHydrationWarning
    >
      {/* Rendered with CSS so the icon is correct on the server too. */}
      <Sun className="size-4 dark:hidden" />
      <Moon className="hidden size-4 dark:block" />
    </Button>
  );
};

export default ThemeToggle;
