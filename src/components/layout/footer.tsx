import Link from 'next/link';

interface FooterProp {
  title: string;
}

const Footer = ({ title }: FooterProp) => (
  <footer className="mt-auto border-t border-border bg-card">
    <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
      <div>
        <Link href="/" className="font-semibold text-foreground">
          {title}
        </Link>
        <p className="mt-1">技術を試し、記録し、共有する。</p>
      </div>
      <div className="flex gap-5">
        <Link href="/about">Profile</Link>
        <Link href="/terms/external-transmission">Policy</Link>
        <span>© {new Date().getFullYear()} s-yoshiki</span>
      </div>
    </div>
  </footer>
);

export default Footer;
