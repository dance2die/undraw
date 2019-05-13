import React from 'react'

/**
 * Opens an external link in a new window/tab securely (rel='noopener noreferrer').
 * @param {string} url an external link to open
 */
function ExternalLink({ url, target = '_blank', ...rest }) {
  // For rel="noreferrer", refer to
  // https://developers.google.com/web/tools/lighthouse/audits/noopener#recommendations
  return <a href={url} target={target} rel='noopener noreferrer' {...rest} />
}

export default ExternalLink
