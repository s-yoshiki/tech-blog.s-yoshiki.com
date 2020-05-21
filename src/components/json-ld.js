import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

const JsonLd = ({
  title,
  date,
  path,
  coverImage,
  author,
  excerpt,
}) => {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    "datePublished": date,
    "dateModified": date,
    "headline": title,
    "name": title,
    "image": coverImage ? coverImage.childImageSharp.fluid.src : '',
    "mainEntityOfPage": "https://tech-blog.s-yoshiki.com" + path,
    "description": excerpt,
    "author": {
      "@type": "Person",
      "address": "Tokyo",
      "email": null,
      "identifier": author,
      "name": author,
    },
    "publisher": {
      "@type": "Organization",
      "name": "tech-blog.s-yoshiki.com",
      "logo": {
        "url": "/favicon-32x32.png",
      }
    }
  }
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  )
}

JsonLd.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  path: PropTypes.string,
  coverImage: PropTypes.object,
  author: PropTypes.string,
  excerpt: PropTypes.string,
}

export default JsonLd
