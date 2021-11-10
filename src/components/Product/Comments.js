import React from 'react'

const Comments = (props) => {
  const { name, comments,rating, commenttime} = props
  
  function commentsdate(commenttime) {
    let time = new Date(commenttime)
    let year = time.getFullYear()
    let month = time.getMonth()
    let date = time.getDate()

    return `${year} - ${month + 1} - ${date} `
  }

  //把星星數轉成陣列
  const level = []
  for (let i = 1; i <= rating; i++) {
    level.push(i)
  }
  return (
    <>
        <div class="dt-comments col-sm-12 col-lg-3 ">
          <div className="dt-comments-wrap d-flex">
              <div className="dt-rating">
              {level.map((v,i)=>{
                  return(
                  <i className="fas fa-star"></i>
                  )
              })}
              </div>
              <p className="dt-member-cmts">{comments}</p>
              <p className="dt-cmts-date">{commentsdate(commenttime)}</p>
          </div>
          <div className="dt-cmts-btm"></div>
          <p className="dt-member-name">{name}</p>
        </div>
    </>
  )
}

export default Comments
