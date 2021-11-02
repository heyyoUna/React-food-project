import React from 'react'
import { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
function OrderInfo(props) {
  const { productPrice, totalPrice, Promotion, setPromotion } = props

  // 清空 localstorage 裡的優惠資訊
  localStorage.clear()

  // 記錄會員優惠點數
  let textvalue = ''

  // 記錄訂單小計、優惠總額與訂單總計
  let orderdetailPriceInfo = [totalPrice(), Promotion, productPrice()]

  // 記錄到 LocalStorage 裡，使用 JSON 包進去
  localStorage.setItem('訂單價格資訊', JSON.stringify(orderdetailPriceInfo))
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

        {/* 會員優惠點數使用區 */}
        <div className="promotion d-flex justify-content-between">
          <input
            type="text"
            placeholder="請輸入使用點數"
            onChange={(e) => {
              if (e.target.value > 50) {
                alert('超過您持有的點數')
              }
              // 記錄會員優惠點數
              textvalue = e.target.value
            }}
          />
          <button
            onClick={(e) => {
              // 更新會員優惠點數的狀態
              setPromotion(textvalue)
            }}
          >
            使用
          </button>
        </div>

        {/* 確認到下一步或返回商城 */}
        <div className="my-3">
          <button
            className="orderconfirm col-12 my-3"
            onClick={() => {
              // 到填寫資料頁面
              props.history.push('/carts/Manage')
            }}
          >
            結帳去
          </button>
          <button
            className="returnstore col-12 my-3"
            onClick={() => {
              // 到商城頁面
              props.history.push('')
            }}
          >
            返回商城
          </button>
        </div>
      </div>
    </>
  )
}

export default withRouter(OrderInfo)
