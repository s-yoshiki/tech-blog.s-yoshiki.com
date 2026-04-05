import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import style from 'styles/Footer.module.css';

interface HeaderProp {
  title: string;
}

const Footer = ({ title }: HeaderProp) => {
  const [year, setYear] = useState<number | string>('');

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <div className={style.footer}>
      <div className={style.footerContainer}>
        <span className={style.title}>
          <Link href="/">{title}</Link>
        </span>
        <div className={style.copyright}>
          © {year} s-yoshiki. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
