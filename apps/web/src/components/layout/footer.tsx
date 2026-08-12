import Link from 'next/link';

interface FooterProp {
  title: string;
}

const links = {
  サイト: [
    { href: '/', label: 'Articles' },
    { href: '/about', label: 'About' },
    { href: '/terms/external-transmission', label: '外部送信に関する公表事項' },
  ],
  リンク: [
    { href: 'https://github.com/s-yoshiki', label: 'GitHub', external: true },
    { href: 'https://zenn.dev/s_yoshiki', label: 'Zenn', external: true },
    { href: 'https://qiita.com/s-yoshiki', label: 'Qiita', external: true },
  ],
};

const Footer = ({ title }: FooterProp) => (
  <footer className="mt-auto border-border border-t bg-card">
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
      <div className="lg:col-span-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 rounded-lg font-semibold tracking-tight"
        >
          <span className="grid size-7 place-items-center rounded-lg bg-primary font-mono text-[11px] text-primary-foreground">
            404
          </span>
          <span className="text-sm">{title}</span>
        </Link>
      </div>

      {Object.entries(links).map(([heading, items]) => (
        <nav key={heading} aria-label={heading}>
          <h2 className="font-medium text-foreground text-xs uppercase tracking-wider">
            {heading}
          </h2>
          <ul className="mt-3 space-y-2 text-muted-foreground text-sm">
            {items.map((item) => (
              <li key={item.href}>
                {'external' in item && item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className="rounded transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      ))}
    </div>

    <div className="border-border border-t">
      <p className="mx-auto max-w-7xl px-4 py-5 text-muted-foreground text-xs sm:px-6">
        © {new Date().getFullYear()} s-yoshiki
      </p>
    </div>
  </footer>
);

export default Footer;
