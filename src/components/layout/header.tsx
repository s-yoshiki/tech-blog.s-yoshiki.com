import Link from 'next/link';
import style from 'styles/header.module.css';

interface HeaderProp {
  title: string;
}

const Header = ({ title }: HeaderProp) => {
  return (
    <div className={style.header}>
      <div className={style.headerContainer}>
        <h1 className={style.title}>
          <Link href="/">{title}</Link>
        </h1>
      </div>
    </div>
  );
};

export default Header;
