import React from 'react'
import PropTypes from 'prop-types'
import {
  TwitterShareButton,
  TwitterIcon,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  PocketShareButton,
  PocketIcon,
} from "react-share"

const SnsShare = ({ title, url }) => {
  return (
    <>
      <span>
        <TwitterShareButton url={url} title={title}>
          <TwitterIcon size={40} round={true} />
        </TwitterShareButton>&nbsp;
      </span>
      <span>
        <FacebookShareButton url={url} quote={title}>
          <FacebookIcon size={40} round={true} />
        </FacebookShareButton>&nbsp;
      </span>
      <span>
        <LinkedinShareButton url={url} title={title}>
          <LinkedinIcon size={40} round={true} />
        </LinkedinShareButton>&nbsp;
      </span>
      <span>
        <PocketShareButton url={url} title={title}>
          <PocketIcon size={40} round={true} />
        </PocketShareButton>&nbsp;
      </span>
    </>
  )
}

SnsShare.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string,
}

export default SnsShare