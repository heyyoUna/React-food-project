import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import CartItem from './CartItem'
// import CartMobile from './CartMobile'
import {
  FaTrash,
  FaPlusCircle,
  FaMinusCircle,
  FaAngleDoubleRight,
} from 'react-icons/fa'
// import CART from '../../config'
//示意圖

function OrderDetail(props) {
  let {
    data,
    Count,
    setCount,
    setPos,
    setODPos,
    setDeleteODPos,
  } = props
  let NewCount = [...Count]
  console.log('第二層資料', NewCount)
  return (
    <>
      <div className="orderlist col-lg-8 col-10 mx-lg-0 mx-auto">
        {/* 桌機版 */}
        {data.length !== 0 ? (
          <table className="table table-borderless table-responsive">
            <thead>
              <tr className="border-bottom">
                <th scope="col"></th>
                <th scope="col">商品資訊</th>
                <th scope="col">商品數量</th>
                <th scope="col">商品單價</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {data.map((v, i) => {
                return (
                  <tr>
                    <td>
                      <img
                        src={`http://localhost:3002/img/Product/${v.product_img}`}
                        alt=""
                      />
                    </td>
                    <td className="text-start">{v.name}</td>
                    <td className="text-start">
                      {/* 商品數量減少 */}
                      <FaMinusCircle
                        className="countIcon"
                        onClick={() => {
                          // 如果小於1就直接刪除
                          NewCount[i] < 2
                            ? setDeleteODPos(v.Sid)
                            : (NewCount[i] -= 1)

                          // 設定新的訂單數量
                          setCount(NewCount)

                          // 指定要改變商品數量的位置
                          setPos(i)

                          // 更新 sql 路由的訂單 ID
                          setODPos(v.Sid)
                        }}
                      />
                      {NewCount[i]}
                      {/* 商品數量增加 */}
                      <FaPlusCircle
                        className="countIcon"
                        onClick={() => {
                          NewCount[i] += 1

                          // 設定新的訂單數量
                          setCount(NewCount)

                          // 指定要改變商品數量的位置
                          setPos(i)

                          // 更新 sql 路由的訂單 ID
                          setODPos(v.Sid)
                        }}
                      />
                    </td>
                    <td className="text-start">
                      {v.price}
                    </td>
                    <td>
                      <FaTrash
                        className="trashIcon"
                        onClick={() => {
                          // 更新 sql 路由的訂單 ID
                          setDeleteODPos(v.Sid)
                        }}
                      />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        ) : (
          <h1
            style={{
              color: '#2A593E',
              fontFamily: 'Noto Sans TC',
              fontWeight: '900',
              textAlign: 'center',
            }}
          >
            購物車內無商品
          </h1>
        )}

        {/* 手機板 */}
        <table className="tablemobile table-borderless">
          <thead></thead>
          <tbody>
            {data.map((v, i) => {
              return (
                <tr>
                  <td>
                    <img
                      src={`http://localhost:3002/img/Product/${v.product_img}`}
                      alt=""
                    />
                  </td>
                  <td className="text-start">
                    {v.name} <br />
                    NT${v.price}
                  </td>
                  <td className="text-start col-4 text-center">
                    <FaMinusCircle
                      className="countIcon"
                      onClick={() => {
                        // 如果小於1就直接刪除
                        NewCount[i] < 2
                          ? setDeleteODPos(v.Sid)
                          : (NewCount[i] -= 1)

                        // 設定新的訂單數量
                        setCount(NewCount)

                        // 指定要改變商品數量的位置
                        setPos(i)

                        // 更新 sql 路由的訂單 ID
                        setODPos(v.Sid)
                      }}
                    />
                    {NewCount[i]}
                    <FaPlusCircle
                      className="countIcon"
                      onClick={() => {
                        NewCount[i] += 1

                        // 設定新的訂單數量
                        setCount(NewCount)

                        // 指定要改變商品數量的位置
                        setPos(i)

                        // 更新 sql 路由的訂單 ID
                        setODPos(v.Sid)
                      }}
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default OrderDetail
