import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import Navigation from './navigation'
import { toKebabCase } from '../helpers'
import Badge from './badge'
import style from '../styles/post.module.css'
import SnsShare from './sns-share'
import DisplayAds from './ads/display-ads'
import RelationAds from './ads/relation-ads'
import JsonLd from './json-ld'

const Post = ({
  title,
  date,
  path,
  coverImage,
  author,
  excerpt,
  tags,
  html,
  previousPost,
  nextPost,
}) => {
  const previousPath = previousPost && previousPost.frontmatter.path
  const previousLabel = previousPost && previousPost.frontmatter.title
  const nextPath = nextPost && nextPost.frontmatter.path
  const nextLabel = nextPost && nextPost.frontmatter.title
  const pageUrl = 'https://tech-blog.s-yoshiki.com' + path
  return (
    <>
      <JsonLd title={title} date={date} coverImage={coverImage} author={author} path={path}/>
      <div className={style.childContainer}>
        
        {/* サイドバー */}
        <div className={style.sidebar}>
          <div className={style.sidebarFollowLeft}>
            <SnsShare url={pageUrl} title={title}></SnsShare>
          </div>
        </div>

        {/* メインコンテンツ */}
        <div className={style.post}>
          <DisplayAds />
          <br />
          <div className={style.postContent}>
            <h1 className={style.title}>
              {excerpt ? <Link to={path}>{title}</Link> : title}
            </h1>
            <div className={style.meta}>
              {date}
              {/* {author && <>— Written by {author}</>} */}
              {tags ? (
                <div className={style.tags}>
                  {tags.map(tag => (
                    <Link to={`/tag/${toKebabCase(tag)}/`} key={toKebabCase(tag)}>
                      <Badge keyword={tag} className={style.badge}></Badge>
                    </Link>
                  ))}
                </div>
              ) : null}
              <div className={style.snsShare}>
                <SnsShare url={pageUrl} title={title}></SnsShare>
              </div>
            </div>
            {coverImage && (
              <Img
                fluid={coverImage.childImageSharp.fluid}
                className={style.coverImage}
              />
            )}
          </div>
          
          <DisplayAds />
          <br />
          <div dangerouslySetInnerHTML={{ __html: html }} />
          <div className={style.snsShare}>
            <SnsShare url={pageUrl} title={title}></SnsShare>
          </div>
          <RelationAds />
          <DisplayAds />
          <Navigation
            previousPath={previousPath}
            previousLabel={previousLabel}
            nextPath={nextPath}
            nextLabel={nextLabel}
          />
        </div>

        {/* サイドバー */}
        <div className={style.sidebar}>
          <div className={style.sidebarFollowRight}>
            <div style={{'background-color':'#f0f0'}}></div>
            {/* <RelationAds /> */}
          </div>
        </div>
      </div>
    </>
  )
}

Post.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  path: PropTypes.string,
  coverImage: PropTypes.object,
  author: PropTypes.string,
  excerpt: PropTypes.string,
  html: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  previousPost: PropTypes.object,
  nextPost: PropTypes.object,
}

export default Post
