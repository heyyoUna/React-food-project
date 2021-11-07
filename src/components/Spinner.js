import React, { useRef, useState } from 'react'
import { css } from '@emotion/react'
import PacmanLoader from 'react-spinners/PacmanLoader'

function Spinner(props) {
  const { loading, color, customCss } = props
  const override = css`
    position: abosolute;
    top: 50%;
    left: 47%;
    transform: translate(-50%, -50%);
    z-index: 100;
  `

  return (
    <>
      <PacmanLoader
        loading={loading}
        color={color ? color : '#ffb606'}
        css={customCss ? customCss : override}
        size={30}
      />
    </>
  )
}

export default Spinner
