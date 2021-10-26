import React from 'react'

function TitleBorder(props) {
  return (

      <>
        <div className="container ">
          <div class="titleBorder ">
            <h4 className=" res-title title-fz fw-700">{props.name}</h4>
          </div>
        </div>
      </>
  
  )
}

export default TitleBorder
