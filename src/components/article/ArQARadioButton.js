import React from 'react'

// 註：修改為可以對應多重表單元件輸入
function ArQARadioButton(props) {
  const { value, checkedReply, setCheckReply } = props

  return (
    <div>
      <input
        type="radio"
        value={value}
        checked={checkedReply === value}
        onChange={(e) => {
          setCheckReply(e.target.value)
        }}
      />
      <label>{value}</label>
    </div>
  )
}

export default ArQARadioButton
