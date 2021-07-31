import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import Navigation from './navigation'
import { toKebabCase } from '../helpers'
import Badge from './badge'
import style from '../styles/list-content.module.css'
import Ads from './ads'

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

  return (
    <div className={style.post}>
      <div className={style.postContent}>
        <div className={style.col}>
          <h1 className={style.title}>
            <Link to={path}>{title}</Link>
          </h1>
          <div className={style.meta}>
            {tags ? (
              <div className={style.meta}>
                <span>
                {date} 
                </span>
                &nbsp;&nbsp;
                {tags.map(tag => (
                  <Link to={`/tag/${toKebabCase(tag)}/`} key={toKebabCase(tag)}>
                    <Badge keyword={tag}/>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>

          {excerpt ? (
            <>
              <div style={{'font-size':'13px'}}>{excerpt}</div>
              <br />
            </>
          ) : (
            <>
              <div dangerouslySetInnerHTML={{ __html: html }} />
              <Navigation
                previousPath={previousPath}
                previousLabel={previousLabel}
                nextPath={nextPath}
                nextLabel={nextLabel}
              />
            </>
          )}
        </div>
      </div>
    </div>
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
