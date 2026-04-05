import Link from 'next/link';
import style from 'styles/Footer.module.css';

interface HeaderProp {
  title: string;
}

const Footer = ({ title }: HeaderProp) => {
  return (
    <div className={style.footer}>
      <div className={style.footerContainer}>
        <span className={style.title}>
          <Link href="/">{title}</Link>
        </span>
        <div className={style.copyright}>
          © {new Date().getFullYear()} s-yoshiki. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
