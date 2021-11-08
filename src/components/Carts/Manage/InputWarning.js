import React from 'react'

function InputWarning(props) {
  return (
    <small
      style={{
        color: '#FB6107',
        fontFamily: 'Noto Sans TC',
        fontSize: '12px',
      }}
    >
      {props.name}
    </small>
  )
}

InputWarning.propTypes = {}

export default InputWarning
