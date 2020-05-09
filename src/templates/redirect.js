import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

const RedirectTemplate = ({ pageContext }) => {
  const { toPath } = pageContext
  // window.location.href = <title>Gastbyサンプル</title>
  return (
    <>
      <Helmet>
        <title>redirect to {toPath}</title>
        <link rel="canonical" href={'https://tech-blog.s-yoshiki.com' + toPath}></link>
        <html lang="ja" />
      </Helmet>
    </>
  )
}

RedirectTemplate.propTypes = {
  pageContext: PropTypes.shape({
    toPath: PropTypes.string,
  }),
}

export default RedirectTemplate