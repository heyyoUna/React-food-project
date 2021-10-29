import React from 'react'

const ProductWrap = (props) => {
  const {
    name,
    img,
    intro,
    unit,
    cal,
    protein,
    fat,
    carbon,
    price,
  } = props
  return (
    <>
      <div className="dt-product-imgwrap col-lg-6">
        <div className="dt-bgimg">
          {/* 商品大圖 */}
          <img
            src={'http://localhost:3002/img/Product/' + img}
            alt=""
          />
        </div>
        <div className="dtmb-love-icon">
          <i className="far fa-heart"></i>
        </div>
      </div>

      <div className="dt-intro-wrap col-sm-12 col-lg-6">
        {/* 商品名稱 */}
        <div className="dt-name fs44 mb20 d-flex">
          {name}
          <div className="dt-love-icon">
            <i className="far fa-heart"></i>
          </div>
        </div>
        {/* 商品介紹 */}
        <p className="dt-intro fs24 mb20">
          {intro}({unit})
        </p>
        <div className="dt-content-wrap d-flex">
          <div className="content-wrap">
            {/* 營養成分 */}
            <p className="fs24">熱量:{cal}大卡</p>
            <p className="fs24">蛋白質:{protein}克</p>
            <p className="fs24">脂肪:{fat}克</p>
            <p className="fs24">碳水:{carbon}克</p>
          </div>
          {/* 價錢 */}
          <h1 className="dt-price">NT${price}</h1>
        </div>
        <div className="dt-btn-wrap d-flex">
          <div className="dt-qty-wrap d-flex ">
            <button className="dt-minus">
              <i className="fas fa-minus"></i>
            </button>
            <div className="dt-qty">1</div>
            <button className="dt-add">
              <i className="fas fa-plus"></i>
            </button>
          </div>
          <button className="dt-addtocart ">
            Add To Cart
          </button>
        </div>
      </div>
    </>
  )
}

export default ProductWrap
