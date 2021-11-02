import React, { useState, useEffect } from 'react'
import StoreCard from './StoreCard'
import StoreCardMobile from './StoreCardMobile'
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
  // 愛心收藏 icon
  const [Likeicon, setLikeicon] = useState('full')

  // 收回愛心收藏 icon
  const [unLikeicon, setunLikeicon] = useState('heart')
  let {
    data,
    Count,
    setCount,
    setPos,
    setODPos,
    setDeleteODPos,
    addProductPos,
    setaddProductPos,
  } = props
  let NewCount = [...Count]

  return (
    <>
      <div className="orderlist col-lg-8 col-12">
        {/* 桌機版 */}
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
            {data.map
              ? data.map((v, i) => {
                  return (
                    <tr>
                      <td>
                        <img
                          src={`http://localhost:3002/img/Product/${v.Product_id}.jpg`}
                          alt=""
                        />
                      </td>
                      <td className="text-start">
                        {v.name}
                      </td>
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
                })
              : ' '}
          </tbody>
        </table>

        {/* 手機板 */}
        <table className="tablemobile table-borderless">
          <thead></thead>
          <tbody>
            {data.map
              ? data.map((v, i) => {
                  return (
                    <tr>
                      <td>
                        <img
                          src={`http://localhost:3000/image/${v.cate_sid}/${v.Product_id}.jpg`}
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
                })
              : ''}
          </tbody>
        </table>

        <div className="bottomline col-lg-9"></div>

        {/* 你可能會喜歡，的 component */}
        <h4 className="col-lg-10 text-lg-start">
          你可能也會喜歡
        </h4>
        {/* 喜歡的卡片 */}
        <StoreCard
          Likeicon={Likeicon}
          setLikeicon={setLikeicon}
          unLikeicon={unLikeicon}
          setunLikeicon={setunLikeicon}
          addProductPos={addProductPos}
          setaddProductPos={setaddProductPos}
        />

        <StoreCardMobile />
      </div>
    </>
  )
}

export default OrderDetail
