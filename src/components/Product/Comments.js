import React from 'react'

const Comments = (props) => {
  const { name, comments,rating} = props

  //把星星數轉成陣列
  const level = []
  for (let i = 1; i <= rating; i++) {
    level.push(i)
  }
  return (
    <>
      <div className="dt-comments-wrap d-flex">
        <div className="dt-rating">
          {level.map((v,i)=>{
            return(
              <i className="fas fa-star"></i>
            )
          })}
        </div>
        <p className="dt-member-cmts">{comments}</p>
        <p className="dt-cmts-date">2021/10/16</p>
      </div>
      <div className="dt-cmts-btm"></div>
      <p className="dt-member-name">{name}</p>
    </>
  )
}

export default Comments
