import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import AdsImportScript from '../components/ads-import-script'
import SEO from '../components/seo'
import Layout from '../components/layout'
import Post from '../components/list-content'
import Navigation from '../components/navigation'

import '../styles/layout.css'

const Dates = ({
  data,
  pageContext: { nextPagePath, previousPagePath, year, month},
}) => {
  const {
    allMarkdownRemark: { edges: posts },
  } = data

  return (
    <>
      <AdsImportScript />
      <SEO />
      <Layout>
        <div className="infoBanner">
          Posts with date: <span>#{year}-{month}</span>
        </div>

        {posts.map(({ node }) => {
          const {
            id,
            excerpt: autoExcerpt,
            frontmatter: {
              title,
              date,
              path,
              author,
              coverImage,
              excerpt,
              tags,
            },
          } = node

          return (
            <Post
              key={id}
              title={title}
              date={date}
              path={path}
              author={author}
              tags={tags}
              coverImage={coverImage}
              excerpt={excerpt || autoExcerpt}
            />
          )
        })}

        <Navigation
          previousPath={previousPagePath}
          previousLabel="Newer posts"
          nextPath={nextPagePath}
          nextLabel="Older posts"
        />
      </Layout>
    </>
  )
}

Dates.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.shape({
    nextPagePath: PropTypes.string,
    previousPagePath: PropTypes.string,
    year: PropTypes.string,
    month: PropTypes.string,
  }),
}

export const postsQuery = graphql`
  query($limit: Int!, $skip: Int!, $fromDate: Date, $toDate: Date) {
    allMarkdownRemark(
      filter: { frontmatter: { date: { gte: $fromDate, lt: $toDate }  } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          excerpt
          frontmatter {
            title
            date(formatString: "YYYY-MM-DD")
            path
            author
            excerpt
            tags
            coverImage {
              childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`

export default Dates
