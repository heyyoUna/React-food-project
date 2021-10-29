import React from 'react'

const Detail = (props) => {
  const { detailImg, title, content } = props
  return (
    <>
      <div className="dt-product-img col-md-12 col-lg-6">
        <img
          src={'http://localhost:3002/img/Product/' + detailImg}
          alt=""
        />
      </div>
      <div className="dt-product-context col-sm-12 col-lg-6 fs24">
        <ul>
          <li>
            <i class="fas fa-quote-left"></i>
          </li>
          <li>{title}</li>
          <br />
          <li>{content}</li>
        </ul>
      </div>
    </>
  )
}

export default Detail
