import React from 'react'

function ArCardTxt(props) {
  return (
    <div className="px-1 py-1 arCardTxt">
      <p className="pt-1">聰明飲食</p>
      <p>{props.text}</p>
      <p className="pb-1">2020/10/10</p>
    </div>
  )
}
ArCardTxt.defaultProps = {
  text: '藝FUN券抽籤第二批幸運兒出爐 快對身分證號碼',
}

export default ArCardTxt
