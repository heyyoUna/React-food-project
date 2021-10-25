import React from 'react'

function HpSBtn(props) {
  return (
    <>
      <div class="hp_sBtn">
        {props.text} <span> > </span>
      </div>
    </>
  )
}
HpSBtn.defaultProps = {
  text: 'VIEW MORE',
}

export default HpSBtn
