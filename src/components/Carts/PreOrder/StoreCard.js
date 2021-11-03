import React, { useEffect, useState } from 'react'
import {
  FaRegHeart,
  FaCartPlus,
  FaAngleDoubleRight,
  FaHeart,
} from 'react-icons/fa'
import axios from 'axios'
import Heart from './Heart'
import { withRouter } from 'react-router-dom'

import { Card } from 'react-bootstrap'

// 購物車頁面 - 商品卡片
function StoreCard(props) {
  let [StoreCard1, setStoreCard1] = useState([])
  let [Pos, setPos] = useState()
  let { setCount, setData, Filter, setFilter } = props
  let NewFilter = [...Filter]

  useEffect(() => {
    console.log('重新整理')
    StoreCard1 = []
    GetProduct(Pos)
  }, [Pos])

  async function GetProduct(Pos) {
    let P = await axios.get(
      'http://localhost:3002/cart/getProduct'
    )
    if (P.status === 200) {
      console.log('記錄商品位置', Pos)
      NewFilter.push(Pos)
      let max = 24
      let randomresult = ['', '']
      // console.log(P.data)
      randomresult[0] = Math.floor(Math.random() * max)
      randomresult[1] = Math.floor(Math.random() * max)
      while (
        randomresult[0] === NewFilter ||
        randomresult[1] === NewFilter ||
        randomresult[0] === randomresult[1]
      ) {
        randomresult[0] = Math.floor(Math.random() * max)
        randomresult[1] = Math.floor(Math.random() * max)
        console.log('重新算過')
      }
      console.log('要pass的陣列', NewFilter)
      console.log('數字1', randomresult[0])
      console.log('數字2', randomresult[1])

      StoreCard1.push(P.data[randomresult[0]])
      StoreCard1.push(P.data[randomresult[1]])
      setStoreCard1(StoreCard1)
      setFilter(NewFilter)
      // console.log('新陣列', StoreCard1)
    }
  }

  // async function AddProduct(addProductPos) {
  //   console.log('我在這喔', addProductPos)
  //   let Add = await axios.post(
  //     `http://localhost:3002/cart/`,
  //     {
  //       Order_Amount: 1,
  //       Product_id: 'PM001',
  //       Member_id: 'st880517',
  //     }
  //   )
  //   if (Add.status === 200) {
  //     setaddProductPos(0)
  //     console.log('現在的addProduct', addProductPos)
  //   }
  // }

  return (
    <>
      <div className="storelike col-lg-8 col-10 d-lg-flex justify-content-around align-content-center my-5">
        {StoreCard1.map((v, i) => {
          return (
            <Heart
              i={i}
              v={v}
              setData={setData}
              setCount={setCount}
              Pos={Pos}
              setPos={setPos}
            />
          )
        })}
        <div className="morecard my-auto">
          <FaAngleDoubleRight
            className="DoubleRight"
            onClick={() => {
              props.history.push('/products')
            }}
          />
          <h1>MORE</h1>
        </div>
      </div>
    </>
  )
}
export default withRouter(StoreCard)
