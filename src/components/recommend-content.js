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
              excerpt
              date(formatString: "YYYY-MM-DD")
              coverImage {
                childImageSharp {
                  fluid(maxWidth: 100) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
            html
            excerpt
          }
        }
      }
    }
  `)
  const defaultContentLength = 10
  let tags = {}
  let dates = {}
  let newPosts = []
  let relationPosts = []
  if (!Array.isArray(postTags)) {
    postTags = []
  }
  data.allMarkdownRemark.edges.map(e => e.node).forEach(e => {
    const row = e.frontmatter
    row.excerpt = e.excerpt
    row.excerpt = row.excerpt.split("目次").join("").split("概要").join("")
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
    const [year, month] = row.date.split("-").slice(0, 2)
    if (!dates[year]) {
      dates[year] = {}
    }
    if (dates[year][month]) {
      dates[year][month] += 1
    } else {
      dates[year][month] = 1
    }
  })
  tags = Object.keys(tags).map((key) => {
    return { name: key, counts: tags[key] }
  }).sort((a, b) => b.counts - a.counts).slice(0, 50)
  dates = Object.keys(dates).map(year => {
    const row = dates[year]
    const child = Object.keys(row).map(month => {
      return { name: month, count: row[month] }
    }).sort((a, b) => Number(a.name) - Number(b.name))
    return { year, month: child }
  }).sort((a, b) => Number(b.year) - Number(a.year))
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
                  <Link to={post.path} >
                    <Img
                      fluid={post.coverImage.childImageSharp.fluid}
                    />
                  </Link>
                )
              }
            </div>
            <div className={style.postContent}>
              <Link to={post.path} >
                <span className={style.postTitle}>{post.title}</span>
              </Link>
              <div className={style.muted} dangerouslySetInnerHTML={{ __html: post.excerpt }} />
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
            <div className={style.tag}>{tag.name} <span className={style.tagCount}>{tag.counts}</span></div>
          </Link>
        ))}
      </div>
      <RelationAds />
      <h3>Dates</h3>
      <div>
        {dates.map(date => (
          <>
            <h4>{date.year}年</h4>
            <div className={style.dates}>
              {date.month.map(month => (
                <span>
                  <Link to={`date/${date.year}/${month.name}/`}>{Number(month.name)}月({month.count})</Link> /
                </span>
              ))}
            </div>
          </>
        ))}
      </div>
    </div>
  )
}

RecommendContent.propTypes = {
  postTags: PropTypes.arrayOf(PropTypes.string),
  postPath: PropTypes.string
}

export default RecommendContent
