import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import style from '../styles/post.module.css'
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
  tableOfContents
}) => {
  return (
    <>
      <JsonLd title={title} date={date} coverImage={coverImage} author={author} path={path} />
      <div className={style.childContainer}>
        {/* メインコンテンツ */}
        <div className={style.post}>
          {coverImage && (
            <Img
              fluid={coverImage.childImageSharp.fluid}
              className={style.coverImage}
            />
          )}
          <div className={style.postContent}>
            <h1 className={style.title}>
              {excerpt ? <Link to={path}>{title}</Link> : title}
            </h1>
          </div>
          <div dangerouslySetInnerHTML={{ __html: html }} />
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
