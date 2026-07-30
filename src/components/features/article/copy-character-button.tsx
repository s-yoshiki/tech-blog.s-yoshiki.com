'use client';

import { Button } from 'components/ui/button';
import { Check, Copy, TriangleAlert } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type CopyStatus = 'idle' | 'copied' | 'error';

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

const copyWithTextArea = (value: string): void => {
  const textArea = document.createElement('textarea');
  textArea.value = value;
  textArea.setAttribute('readonly', '');
  textArea.style.position = 'fixed';
  textArea.style.opacity = '0';
  document.body.appendChild(textArea);
  textArea.select();

  const copied = document.execCommand('copy');
  textArea.remove();
  if (!copied) throw new Error('Copy command failed');
};

export default function CopyCharacterButton({ codePoint }: Props) {
  const [status, setStatus] = useState<CopyStatus>('idle');
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const normalizedCodePoint = codePoint.replace(/^U\+/i, '').toUpperCase();
  const character = String.fromCodePoint(parseCodePoint(normalizedCodePoint));
  const label = `U+${normalizedCodePoint}`;

  useEffect(
    () => () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    },
    [],
  );

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(character);
      } else {
        copyWithTextArea(character);
      }
      setStatus('copied');
    } catch {
      setStatus('error');
    }

    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setStatus('idle'), 1800);
  };

  const text =
    status === 'copied' ? 'コピー済み' : status === 'error' ? '失敗' : 'コピー';
  const Icon =
    status === 'copied' ? Check : status === 'error' ? TriangleAlert : Copy;

  return (
    <Button
      aria-label={`${label}の実体文字をコピー`}
      className="min-w-24"
      onClick={handleCopy}
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
