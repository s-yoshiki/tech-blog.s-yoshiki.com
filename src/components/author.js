import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import style from '../styles/author.module.css'

const Author = () => {
  const badges = [
    {link: 'https://github.com/s-yoshiki', alt: 'github', logo: 'https://img.shields.io/badge/GitHub--lightgrey.svg?logo=github&style=social'},
    {link: 'https://twitter.com/s_yoshiki_dev', alt: 'twitter', logo: 'https://img.shields.io/badge/Twitter--lightgrey.svg?logo=twitter&style=social'},
    {link: 'https://qiita.com/s-yoshiki', alt: 'qiita', logo: 'https://img.shields.io/badge/qiita--lightgrey.svg?logo=qiita&style=social'},
  ]
  return (
    <div className={style.content}>
      <div className={style.postImg}>
        <img className={style.icon} src="https://ja.gravatar.com/userimage/115503673/c65df92a8b6d270c8eeb74f643b7e114.jpeg" alt="s-yoshiki"/>
      </div>
      <div className={style.col}>
        <span className={style.authorName}>s-yoshiki</span>
        <div>
          {badges.map(e => (
            <Link to={e.link}><img className={style.badge} src={e.logo} alt={e.alt}/></Link>
          ))}
        </div>
        <div>
          Web作ってますが、インタラクティブなプログラミングも好きです。
        </div>
      </div>
    </div>
  )
}

export default Author
