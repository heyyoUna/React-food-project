import React from 'react'

// 註：修改為可以對應多重表單元件輸入
function ArQARadioButton(props) {
  const { value } = props

  return (
    <div>
      <input type="radio" {...props} />
      <label>{value}</label>
    </div>
  )
}

export default ArQARadioButton
