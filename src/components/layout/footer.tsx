import Link from 'next/link';
import style from 'styles/Footer.module.css';

interface HeaderProp {
  title: string;
}

const Footer = ({ title }: HeaderProp) => {
  return (
    <div className={style.header}>
      <div className={style.headerContainer}>
        <span className={style.title}>
          <Link href="/">
            <a>{`> ${title}`}</a>
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Footer;
