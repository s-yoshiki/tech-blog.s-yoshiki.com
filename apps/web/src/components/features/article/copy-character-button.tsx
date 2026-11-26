'use client';

import { Button } from '@repo/ui';
import { Check, Copy, TriangleAlert } from 'lucide-react';
import { useCopyToClipboard } from 'hooks/use-copy-to-clipboard';

interface Props {
  codePoint: string;
}

const parseCodePoint = (value: string): number => {
  const normalized = value.replace(/^U\+/i, '');
  const codePoint = Number.parseInt(normalized, 16);
  if (!Number.isInteger(codePoint) || codePoint < 0 || codePoint > 0x10ffff) {
    throw new Error(`Invalid Unicode code point: ${value}`);
  }
  return codePoint;
};

export default function CopyCharacterButton({ codePoint }: Props) {
  const { status, copy } = useCopyToClipboard();
  const normalizedCodePoint = codePoint.replace(/^U\+/i, '').toUpperCase();
  const character = String.fromCodePoint(parseCodePoint(normalizedCodePoint));
  const label = `U+${normalizedCodePoint}`;

  const text = status === 'copied' ? 'コピー済み' : status === 'error' ? '失敗' : 'コピー';
  const Icon = status === 'copied' ? Check : status === 'error' ? TriangleAlert : Copy;

  return (
    <Button
      aria-label={`${label}の実体文字をコピー`}
      className="min-w-24"
      onClick={() => void copy(character)}
      size="sm"
      title={`${label}の実体文字をコピー`}
      type="button"
      variant="outline"
    >
      <Icon aria-hidden="true" className="size-3.5" />
      {text}
    </Button>
  );
}
