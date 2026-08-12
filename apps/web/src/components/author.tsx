import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

const profiles = [
  { label: 'GitHub', href: 'https://github.com/s-yoshiki' },
  { label: 'Zenn', href: 'https://zenn.dev/s_yoshiki' },
  { label: 'Qiita', href: 'https://qiita.com/s-yoshiki' },
];

const Author = () => (
  <div className="flex flex-col gap-4">
    <div className="flex items-center gap-3">
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary font-mono text-primary-foreground text-xs">
        404
      </span>
      <div>
        <p className="font-semibold text-sm">s-yoshiki</p>
        <p className="text-muted-foreground text-sm">ただの備忘録です。</p>
      </div>
    </div>

    <ul className="flex flex-wrap gap-2">
      {profiles.map((profile) => (
        <li key={profile.href}>
          <a
            href={profile.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border bg-muted px-3 text-sm transition-colors hover:border-border-strong hover:bg-accent"
          >
            {profile.label}
            <ExternalLink aria-hidden="true" className="size-3.5 opacity-60" />
          </a>
        </li>
      ))}
    </ul>

    <p className="text-muted-foreground text-xs">
      <Link
        href="/terms/external-transmission/"
        className="rounded underline underline-offset-2 hover:text-foreground"
      >
        ※外部送信に関する公表事項
      </Link>
    </p>
  </div>
);

export default Author;
