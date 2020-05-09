const { paginate } = require('gatsby-awesome-pagination')
const { forEach, uniq, filter, not, isNil, flatMap } = require('rambdax')
const path = require('path')
const { toKebabCase } = require('./src/helpers')

const pageTypeRegex = /content\/(.*?)\//
const getType = node => node.fileAbsolutePath.match(pageTypeRegex)[1]

const pageTemplate = path.resolve(`./src/templates/page.js`)
const indexTemplate = path.resolve(`./src/templates/index.js`)
const tagsTemplate = path.resolve(`./src/templates/tags.js`)
const datesTemplate = path.resolve(`./src/templates/dates.js`)
const redirectTemplate = path.resolve(`./src/templates/redirect.js`)
const redirectConf = require('./redirect-config.json')

exports.createPages = ({ actions, graphql, getNodes }) => {
  const { createPage } = actions
  const allNodes = getNodes()

  return graphql(`
    {
      allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 2000
      ) {
        edges {
          node {
            frontmatter {
              path
              title
              tags
              date(formatString: "YYYY-MM")
            }
            fileAbsolutePath
          }
        }
      }
      site {
        siteMetadata {
          postsPerPage
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    const {
      allMarkdownRemark: { edges: markdownPages },
      site: { siteMetadata },
    } = result.data

    const sortedPages = markdownPages.sort((pageA, pageB) => {
      const typeA = getType(pageA.node)
      const typeB = getType(pageB.node)

      return (typeA > typeB) - (typeA < typeB)
    })

    const posts = allNodes.filter(
      ({ internal, fileAbsolutePath }) =>
        internal.type === 'MarkdownRemark' &&
        fileAbsolutePath.indexOf('/posts/') !== -1,
    )

    // Create posts index with pagination
    paginate({
      createPage,
      items: posts,
      component: indexTemplate,
      itemsPerPage: siteMetadata.postsPerPage,
      pathPrefix: '/',
    })

    // Create each markdown page and post
    forEach(({ node }, index) => {
      const previous = index === 0 ? null : sortedPages[index - 1].node
      const next =
        index === sortedPages.length - 1 ? null : sortedPages[index + 1].node
      const isNextSameType = getType(node) === (next && getType(next))
      const isPreviousSameType =
        getType(node) === (previous && getType(previous))

      createPage({
        path: node.frontmatter.path,
        component: pageTemplate,
        context: {
          type: getType(node),
          next: isNextSameType ? next : null,
          previous: isPreviousSameType ? previous : null,
        },
      })
    }, sortedPages)

    // Create tag pages
    const tags = filter(
      tag => not(isNil(tag)),
      uniq(flatMap(post => post.frontmatter.tags, posts)),
    )

    forEach(tag => {
      const postsWithTag = posts.filter(
        post =>
          post.frontmatter.tags && post.frontmatter.tags.indexOf(tag) !== -1,
      )

      paginate({
        createPage,
        items: postsWithTag,
        component: tagsTemplate,
        itemsPerPage: siteMetadata.postsPerPage,
        pathPrefix: `/tag/${toKebabCase(tag)}`,
        context: {
          tag,
        },
      })
    }, tags)

    // Create dates page
    const dates = filter(
      date => not(isNil(date)),
      uniq(flatMap(post => post.frontmatter.date, posts)),
    )

    forEach(date => {
      const postsWithDate = posts.filter(
        post =>
          post.frontmatter.date && post.frontmatter.date.indexOf(date) !== -1,
      )
      const [year, month] = date.split('-')
      const fromDate = `${year}-${month}-01T00:00:00.000Z`
      const newStartDate = new Date(fromDate)
      const toDate = new Date(
        new Date(newStartDate.setMonth(newStartDate.getMonth() + 1)).getTime() -
        1
      ).toISOString()
      paginate({
        createPage,
        items: postsWithDate,
        component: datesTemplate,
        itemsPerPage: siteMetadata.postsPerPage,
        pathPrefix: `/date/${year}/${month}`,
        context: {
          year,
          month,
          fromDate,
          toDate,
        },
      })
    }, dates)

    // redirect
    forEach(conf => {
      createPage({
        path: conf.fromPath,
        component: redirectTemplate,
        context: {
          type: 'redirect',
          toPath: conf.toPath,
        },
      })
    }, redirectConf)

    return {
      sortedPages,
      tags,
      dates,
    }
  })
}

exports.sourceNodes = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter!
    }

    type Frontmatter {
      title: String!
      author: String
      date: Date! @dateformat
      path: String!
      tags: [String!]
      excerpt: String
      coverImage: File @fileByRelativePath
    }
  `
  createTypes(typeDefs)
}