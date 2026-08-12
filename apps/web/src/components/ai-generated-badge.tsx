import { cn } from '@repo/ui';
import { Bot } from 'lucide-react';

interface Props {
  compact?: boolean;
  className?: string;
}

/** A consistent disclosure for posts whose front matter has aiGenerated: true. */
export default function AIGeneratedBadge({
  compact = false,
  className,
}: Props) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center rounded-md border border-ai-border bg-ai-surface font-medium text-ai-foreground',
        compact
          ? 'h-6 gap-1 px-1.5 text-[11px]'
          : 'gap-1.5 px-2.5 py-1.5 text-xs',
        className,
      )}
    >
      <Bot aria-hidden="true" className={compact ? 'size-3' : 'size-3.5'} />
      <span>{compact ? 'AI生成' : 'AIで生成された記事'}</span>
    </span>
  );
}
