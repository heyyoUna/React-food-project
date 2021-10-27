import React from 'react'
import { useState, useEffect } from 'react'
function OrderInfo(props) {
  const {
    productPrice,
    totalPrice,
    Promotion,
    setPromotion,
  } = props
  let textvalue = ''
  return (
    <>
      <div className="orderinfolist col-lg-3 mx-lg-3 mt-3">
        <h4>訂單資訊</h4>
        <table className="table table-borderless">
          <tbody>
            <tr scope="row" className="border-top">
              <th>商品小計</th>
              <td>NT${productPrice()}</td>
            </tr>
            <tr scope="row">
              <th>運費</th>
              <td>未選擇</td>
            </tr>
            <tr scope="row" className="border-bottom">
              <th>優惠</th>
              <td>-NT${Promotion}</td>
            </tr>
            <tr scope="row">
              <th>商品總計</th>
              <td>NT${totalPrice()}</td>
            </tr>
            <tr scope="row">
              <th>使用點數</th>
              <td></td>
            </tr>
          </tbody>
        </table>

        <div className="promotion d-flex justify-content-between">
          <input
            type="text"
            placeholder="請輸入使用點數"
            onChange={(e) => {
              if (e.target.value > 50) {
                alert('超過您持有的點數')
              }
              textvalue = e.target.value
            }}
          />
          <button
            onClick={(e) => {
              setPromotion(textvalue)
            }}
          >
            使用
          </button>
        </div>

        <div className="my-3">
          <button
            className="orderconfirm col-12 my-3"
            onclick="location.href='./Cart_Manage.html'"
          >
            結帳去
          </button>
          <button className="returnstore col-12 my-3">
            返回商城
          </button>
        </div>
      </div>
    </>
  )
}

export default OrderInfo
