import React from 'react'
import { withRouter } from 'react-router-dom'

function ProductCard(props) {
  const { sid, img, name, cal, price, setProductId } = props
  return (
    <>
      <div
        className="pd-card d-flex "
        onClick={(e) => {
          console.log('key', sid)
          setProductId(sid)
          props.history.push('/product/' + sid)
        }}
      >
        <div className="pd-img">
          <img
            src={'http://localhost:3002/img/Product/' + img}
            alt=""
          />
        </div>
        <div className="pd-card-intro d-flex">
          <div className="pd-name">{name}</div>
          <p className="pd-cal">{cal} Calories</p>
          <p className="pd-price">NT$ {price}</p>
          <div className="pd-btn-wrap d-flex">
            <button className="pd-order-btn">
              ORDER NOW
            </button>
            <div className="pd-love-icon">
              <i className="far fa-heart"></i>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default withRouter(ProductCard)
