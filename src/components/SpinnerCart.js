import React, { useRef, useState } from 'react'
import { css } from '@emotion/react'
import PacmanLoader from 'react-spinners/PacmanLoader'

function SpinnerCart(props) {
  const { loading, color, customCss } = props
  // const override = css`
  //   position: 'absolute',
  //   top: 50%;
  //   left: 47%;
  //   transform: translate(-50%, -50%);
  //   z-index: 100;
  const override = {
    position: 'absolute',
    top: '50%',
    left: '47%',
    // transform: translate('-50%', '-50%'),
    zIndex: '100',
  }

  return (
    <>
      <PacmanLoader
        loading={loading}
        color={color ? color : '#ffb606'}
        css={customCss ? customCss : override}
        size={30}
      />
      <div
        className="container-fluid"
        style={{
          display: loading ? 'block' : 'none',
          background: '#FFFFFF',
          height: '100vh',
          position: 'fixed',
          zIndex: '90',
          top: '0%',
          left: '0%',
        }}
      ></div>
    </>
  )
}

export default SpinnerCart
