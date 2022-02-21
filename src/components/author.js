import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import style from '../styles/author.module.css'

const Author = () => {
  const badges = [
    {link: 'https://github.com/s-yoshiki', alt: 'github', logo: 'https://img.shields.io/badge/GitHub--lightgrey.svg?logo=github&style=social'},
    {link: 'https://zenn.dev/s_yoshiki', alt: 'zenn', logo: 'https://img.shields.io/badge/zenn--lightgrey.svg?logo=zenn&style=social'},
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
        <div style={{'fontSize': '12px'}}>
          ただの備忘録です。
          <br />
          JavaScript/TypeScript/node.js/React/Next/PHP/AWS/OpenCV
          <br />
          <span style={{'fontSize': '8px'}}>
            ※このブログの内容は個人の見解であり、所属する組織等の見解ではありません。
          </span>
        </div>
      </div>
    </div>
  )
}

export default Author
