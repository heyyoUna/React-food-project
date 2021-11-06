import React from 'react'

function HpSBtn(props) {
  return (
    <>
      <div class="hp_sBtn">
        {props.text} <i class="fas fa-chevron-right"></i>
      </div>
    </>
  )
}
HpSBtn.defaultProps = {
  text: 'VIEW MORE',
}

export default HpSBtn
