import Link from 'next/link'
import style from 'styles/author.module.css'

const AwsCertificate = () => {
  const data = [
    {
      link: `https://www.credly.com/badges/f51acc63-04aa-44a4-b4ef-89109ea4e433/public_url`,
      image: `https://images.credly.com/images/2d84e428-9078-49b6-a804-13c15383d0de/image.png`
    },
    {
      link: `https://www.credly.com/badges/d5d74113-1038-4622-ad48-79af359af2bb/public_url`,
      image: `https://images.credly.com/size/680x680/images/bd31ef42-d460-493e-8503-39592aaf0458/image.png`
    },
    {
      link: `https://www.credly.com/badges/9ac240e0-3789-45ac-b743-4847bc15e509/public_url`,
      image: `https://images.credly.com/size/680x680/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png`
    },
    {
      link: `https://www.credly.com/badges/720815a7-6ead-40e5-b248-2c628417a124/public_url`,
      image: `https://images.credly.com/size/680x680/images/b9feab85-1a43-4f6c-99a5-631b88d5461b/image.png`
    },
  ]
  return (
    <div className='flex flex-wrap flex-row'>
      {data.map((e, idx)=> (
        <a href={e.link} key={idx}>
          <img src={e.image} width="60" />
        </a>
      ))}
    </div>
  )
}

const Author = () => {
  const badges = [
    {link: 'https://github.com/s-yoshiki', alt: 'github', logo: 'https://img.shields.io/badge/GitHub--lightgrey.svg?logo=github&style=social'},
    {link: 'https://zenn.dev/s_yoshiki', alt: 'zenn', logo: 'https://img.shields.io/badge/zenn--lightgrey.svg?logo=zenn&style=social'},
    // {link: 'https://twitter.com/s_yoshiki_dev', alt: 'twitter', logo: 'https://img.shields.io/badge/Twitter--lightgrey.svg?logo=twitter&style=social'},
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
          {badges.map((e, idx) => (
            <Link href={e.link} passHref key={idx}><img className={style.badge} src={e.logo} alt={e.alt} /></Link>
          ))}
        </div>
        <AwsCertificate />
        <div style={{'fontSize': '12px'}}>
          ただの備忘録です。
          <br />
          JavaScript/TypeScript/node.js/React/AWS/OpenCV
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