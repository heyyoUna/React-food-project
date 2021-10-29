import React from 'react'

const Comments = () => {
  return (
    <>
      <div className="dt-comments-wrap d-flex">
        <div className="dt-rating">
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
          <i className="fas fa-star"></i>
        </div>
        <p className="dt-member-cmts">好吃</p>
        <p className="dt-cmts-date">2021/10/16</p>
      </div>
      <div className="dt-cmts-btm"></div>
      <div className="dt-member-img">
        <img src="./../img/專題/person1.jpg" alt="" />
      </div>
      <p className="dt-member-name">Peter</p>
    </>
  )
}

export default Comments
