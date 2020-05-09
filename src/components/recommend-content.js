import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql, Link } from 'gatsby'
import Ads from './ads'
import { toKebabCase } from '../helpers'
import style from '../styles/recommend-content.module.css'
import Badge from './badge'

const RecommendContent = () => {
  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}, limit: 2000) {
        edges {
          node {
            frontmatter {
              tags
              date(formatString: "YYYY/MM")
            }
          }
        }
      }
    }
  `)
  let tags = {}
  let dates = {}
  data.allMarkdownRemark.edges.map(e => e.node.frontmatter).forEach(row => {
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
    if (dates.hasOwnProperty(row.date) && dates.hasOwnProperty(row.date) >= 0) {
      dates[row.date] += 1
    } else {
      dates[row.date] = 1
    }
  })
  tags = Object.keys(tags).map((key) => {
    return { name: key, counts: tags[key] }
  }).sort((a, b) => b.counts - a.counts).slice(0, 50)
  dates = Object.keys(dates).map((key) => {
    return { name: key, counts: dates[key] }
  })

  return (
    <div className={style.content}>
      <h2>Tags</h2>
      <div>
        {tags.map(tag => (
          <Link to={`/tag/${toKebabCase(tag.name)}/`} key={toKebabCase(tag.name)}>
            {/* <Badge keyword={tag.name} className={style.badge}>({tag.counts})</Badge> */}
            <div className={style.tag}>{tag.name} <span className={style.tagCount}>{tag.counts}</span></div>
          </Link>
        ))}
      </div>
      <Ads />
      <h2>Dates</h2>
      <div>
        <ul>
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

export default RecommendContent
