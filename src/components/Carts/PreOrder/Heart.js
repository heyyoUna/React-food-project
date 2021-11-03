import { useState, useEffect } from 'react'
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io'
import { FaCartPlus } from 'react-icons/fa'
import axios from 'axios'
function Heart(props) {
  let { v, i, setData, setCount, Pos, setPos } = props

  async function AddtoCart() {
    let p = await axios.post('http://localhost:3002/cart', {
      Sid: '',
      Order_Sid: 'order2021103141501',
      Member_id: 'st880517',
      Product_id: v.product_id,
      Order_Amount: 1,
    })
    if (p.status === 200) {
      console.log('加入成功')
      DataAxios()
    }
  }

  // 讀取商品資料的 function
  async function DataAxios() {
    let Count = []
    let r = await axios.get('http://localhost:3002/cart/')
    if (r.status === 200) {
      // 設定 data
      setData(r.data)

      // 讀取裡面的商品數量
      for (let i = 0; i < r.data.length; i++) {
        Count[i] = r.data[i].Order_Amount
      }

      // // 設定商品初始數量
      setCount(Count)
      setPos(Pos + 1)
      // // // 計算訂單小計
      // productPrice()

      // // // 計算訂單總計(扣除會員點數)
      // totalPrice()
    }
  }

  return (
    <div className="storecard col-lg-4 col-10 position-relative">
      <img
        src={`http://localhost:3002/img/Product/${v.product_id}.jpg`}
        className="position-absolute"
      />
      <div className="storeproduct">
        <div className="body py-2">
          <p className="text ps-5 text-center">{v.name}</p>
          <p className="text ps-5 text-center">
            NT${v.price}
          </p>
          <div className="storeicon ps-3 text-center">
            {/* 卡關:兩個都會亮起關閉 */}
            <IoIosHeartEmpty
              // cardstate={cardstate[0]}
              style={{
                color: '#FB6107',
                fontSize: '40px',
                marginTop: '3px',
                display: 'inline',
              }}
              onClick={() => {}}
            />
            <IoIosHeart
              // cardstate={cardstate[1]}
              style={{
                color: '#d96e30',
                fontSize: '40px',
                marginTop: '3px',
                display: 'none',
              }}
              onClick={() => {}}
            />
            <FaCartPlus
              className="cartlike"
              onClick={() => {
                console.log('點擊', i)
                console.log('產品', v.product_id)
                AddtoCart()
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Heart
