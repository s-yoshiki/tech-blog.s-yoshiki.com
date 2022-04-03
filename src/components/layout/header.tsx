import Link from 'next/link'
import style from 'styles/header.module.css'

interface HeaderProp {
  title: string
}

const Header = ({title}: HeaderProp) => {
  return (
    <div className={style.header}>
      <div className={style.headerContainer}>
        <span className={style.title}>
          <Link href="/">
            {`> ${title}`}
          </Link>
        </span>
      </div>
    </div>
  )
}

export default Header