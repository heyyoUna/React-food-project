import React, { useState } from 'react'
import { withRouter, useHistory } from 'react-router-dom'
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io'

const ProductWrap = (props) => {
  const token = localStorage.getItem('token')

  const {
    sid,
    name,
    img,
    intro,
    unit,
    cal,
    protein,
    fat,
    carbon,
    price,
    favIndicator,
    setFavIndicator
  } = props

  // 收藏新增
  const handlingInsert = (sid) => {
    fetch(`http://localhost:3002/member/favorite-product-insert`, {
      method: 'POST',
      body: JSON.stringify({
        productid: sid

      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    }).then(obj => obj.json())
      .then(obj => {
        if (obj.success) {
          setFavIndicator(true)
        }
      })
  }
  // 刪除收藏
  const handlingDelete = (sid) => {
    fetch(`http://localhost:3002/member/favorite-product-delete/${sid}`, {
      method: 'DELETE',
    }).then(obj => obj.json())
      .then(obj => {
        if (obj.success) {
          setFavIndicator(false)
        }
      })
  }
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
      </div>
      <div className="dt-intro-wrap col-sm-12 col-lg-6">
        {/* 商品名稱 */}
        <div className="dt-name fs44 mb20 d-flex">
          {name}
          {/* 收藏區 */}
          <div className="dt-love-icon">
            <IoIosHeartEmpty
              onClick={(e) => {
                if (!token) {
                  alert('請先登入')
                } else {
                  handlingInsert(sid)
                }
              }}
              style={{
                display: favIndicator ? 'none' : 'block'
              }}
            />
            <IoIosHeart
              onClick={(e) => {
                handlingDelete(sid)
              }}
              style={{
                display: favIndicator ? 'block' : 'none'
              }}
            />
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

export default withRouter(ProductWrap)
