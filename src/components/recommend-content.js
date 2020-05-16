import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql, Link } from 'gatsby'
import DisplayAds from './ads/display-ads'
import Img from 'gatsby-image'
import RelationAds from './ads/relation-ads'
import { toKebabCase } from '../helpers'
import style from '../styles/recommend-content.module.css'
// import Badge from './badge'

const RecommendContent = ({ postTags, postPath }) => {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}, limit: 2000) {
        edges {
          node {
            frontmatter {
              title
              tags
              path
              date(formatString: "YYYY-MM-DD")
              coverImage {
                childImageSharp {
                  fluid(maxWidth: 100) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
      }
    }
  `)
  const defaultContentLength = 5
  let tags = {}
  let dates = {}
  let newPosts = []
  let relationPosts = []
  if (!Array.isArray(postTags)) {
    postTags = []
  }
  data.allMarkdownRemark.edges.map(e => e.node.frontmatter).forEach(row => {
    // new posts
    if (newPosts.length < defaultContentLength) {
      newPosts.push(row)
    }
    // relation posts
    for (let i = 0; i < postTags.length; i++) {
      if (row.path === postPath) {
        break
      }
      if (Array.isArray(row.tags) && row.tags.includes(postTags[i])) {
        relationPosts.push(row)
        break
      }
    }

    // tags
    if (Array.isArray(row.tags)) {
      row.tags.forEach(e => {
        if (tags.hasOwnProperty(e) && tags.hasOwnProperty(e) >= 0) {
          tags[e] += 1;
        } else {
          tags[e] = 1;
        }
      })
    }
    // dates
    const date = row.date.split("-").slice(0, 2).join("/")
    if (dates.hasOwnProperty(date) && dates.hasOwnProperty(date) >= 0) {
      dates[date] += 1
    } else {
      dates[date] = 1
    }
  })
  tags = Object.keys(tags).map((key) => {
    return { name: key, counts: tags[key] }
  }).sort((a, b) => b.counts - a.counts).slice(0, 50)
  dates = Object.keys(dates).map((key) => {
    return { name: key, counts: dates[key] }
  })
  relationPosts = relationPosts.sort((a, b) => {
    let tmp = [a.date, b.date].map(e => new Date(e))
    return tmp[1] - tmp[0]
  }).slice(0, defaultContentLength)

  const postRows = (posts) => (
    <div className={style.postRow}>
      {
        posts.map(post => (
          <>
            <div className={style.postImg} >
              {
                post.coverImage && (
                  <Img
                    fluid={post.coverImage.childImageSharp.fluid}
                  />
                )
              }
            </div>
            <div className={style.postContent}>
              <Link to={post.path} >
                <span className={style.postTitle}>{post.title}</span>
              </Link>
            </div>
            <hr />
          </>
        ))
      }
    </div>
  )

  return (
    <div className={style.content}>
      {
        relationPosts.length > 0 && (
          <>
            <h3>関連記事</h3>
            {postRows(relationPosts)}
          </>
        )
      }
      <DisplayAds />
      <h3>最新の投稿</h3>
      {postRows(newPosts)}
      <h3>Tags</h3>
      <div>
        {tags.map(tag => (
          <Link to={`/tag/${toKebabCase(tag.name)}/`} key={toKebabCase(tag.name)}>
            {/* <Badge keyword={tag.name} className={style.badge}>({tag.counts})</Badge> */}
            <div className={style.tag}>{tag.name} <span className={style.tagCount}>{tag.counts}</span></div>
          </Link>
        ))}
      </div>
      <RelationAds />
      <h3>Dates</h3>
      <div>
        <ul className={style.dates}>
          {dates.map(date => {
            const label = `${date.name.split('/')[0]}年 ${date.name.split('/')[1]}月 `
            return (
              <li key={date.name}>
                <Link to={`/date/${date.name}/`} key={date.name}>
                  {label} ({date.counts})
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

RecommendContent.propTypes = {
  postTags: PropTypes.arrayOf(PropTypes.string),
  postPath: PropTypes.string
}

export default RecommendContent
