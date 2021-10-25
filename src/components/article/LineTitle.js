import React from 'react'

function LineTitle(props) {
    
  return (
    <div className="row catTitle">
      <div className="col-5">
        <hr />
      </div>
      <div className="col title-fz">
        <p>{props.text}</p>
      </div>
      <div className="col-5">
        <hr />
      </div>
    </div>
  )
}

export default LineTitle
