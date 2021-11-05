import React, { useState, useEffect } from 'react'
import { FaChevronDown } from 'react-icons/fa'
function Cart_OrderDetail(props) {
  let { data } = props
  let [trans, settrans] = useState(false)
  let a = []
  let b
  console.log('這是裡面的', data)
  a = JSON.parse(localStorage.getItem('訂單價格資訊'))
  b = a[0] + parseInt(localStorage.getItem('運費'))
  return (
    <>
      <div className="container col-lg-6 col-10">
        <div class="square d-flex justify-content-center position-relative">
          <h3>訂單詳細</h3>
          <FaChevronDown
            className="ChevronDown position-absolute"
            style={{
              transition: '0.5s',
              transform: trans
                ? 'rotate(0deg)'
                : 'rotate(90deg)',
            }}
            onClick={() => {
              if (trans === false) {
                settrans(true)
              } else {
                settrans(false)
              }
            }}
          />
        </div>
        <div
          className="orderdetail"
          style={{
            display: trans ? 'block' : 'none',
          }}
        >
          <div className="detail col-lg-11 col-12 mx-auto mt-3">
            <table className="table detailinfo table-borderless">
              <thead>
                <tr className="border-bottom">
                  <th scope="col"></th>
                  <th scope="col">商品資訊</th>
                  <th scope="col">數量</th>
                  <th scope="col">單價</th>
                </tr>
              </thead>
              <tbody>
                {data.map((v) => {
                  return (
                    <tr>
                      <td>
                        <img
                          src={`http://localhost:3002/img/Product/${v.product_img}`}
                          alt=""
                        />
                      </td>
                      <td>{v.name}</td>
                      <td>{v.Order_Amount}</td>
                      <td>{v.price}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>

            <table className="table detailinfomobile table-borderless">
              <thead>
                <tr></tr>
              </thead>
              <tbody>
                {data.map((v) => {
                  return (
                    <tr>
                      <td>
                        <img
                          src={`http://localhost:3002/img/Product/${v.product_img}`}
                          alt=""
                        />
                      </td>
                      <td>
                        {v.name}
                        <br />
                        NT${v.price}
                      </td>
                      <td>{v.Order_Amount}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>

            <table className="table detailcheck table-borderless mx-auto">
              <tbody>
                <tr className="border-top"></tr>
                <tr>
                  <th>商品小計</th>
                  <td className="detailtd">{a[2]}</td>
                </tr>
                <tr>
                  <th>優惠</th>
                  <td className="detailtd">{a[1]}</td>
                </tr>
                <tr>
                  <th>運費</th>
                  <td className="detailtd">
                    {localStorage.getItem('運費')}
                  </td>
                </tr>
                <tr className="border-top">
                  <th>總計</th>
                  <td className="detailtd">{b}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart_OrderDetail
