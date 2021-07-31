import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import SEO from '../components/seo'
import Layout from '../components/layout'
import Post from '../components/post'
import PostAbout from '../components/post-about'
import RecommendContent from '../components/recommend-content'
import Author from '../components/author'

const BlogPostTemplate = ({ data, pageContext }) => {
  const {
    frontmatter: { title, date, path, author, coverImage, excerpt, tags },
    excerpt: autoExcerpt,
    id,
    html,
    tableOfContents
  } = data.markdownRemark
  const { next, previous } = pageContext

  // パスがabou以下は広告表示させない
  if (path.match(/\/about/g)) {
    return (
      <>
        <Layout>
          <SEO title={title} description={excerpt || autoExcerpt} />
          <PostAbout
            key={id}
            title={title}
            date={date}
            path={path}
            author={author}
            coverImage={coverImage}
            html={html}
            tags={tags}
            previousPost={previous}
            nextPost={next}
            tableOfContents={tableOfContents}
          />
        </Layout>
      </>
    )
  }

  return (
    <>
      <Layout>
        <SEO title={title} description={excerpt || autoExcerpt} />
        <Post
          key={id}
          title={title}
          date={date}
          path={path}
          author={author}
          coverImage={coverImage}
          html={html}
          tags={tags}
          previousPost={previous}
          nextPost={next}
          tableOfContents={tableOfContents}
        />
        <RecommendContent postTags={tags} postPath={path} />
        <Author />
      </Layout>
    </>
  )
}

export default BlogPostTemplate

BlogPostTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.shape({
    next: PropTypes.object,
    previous: PropTypes.object,
  }),
}

export const pageQuery = graphql`
  query($path: String) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
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
      id
      html
      excerpt
      tableOfContents(absolute: false, heading: "", pathToSlugField: "xx", maxDepth: 3)
    }
  }
`
