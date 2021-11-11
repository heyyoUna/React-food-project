import React, { useEffect, useState } from 'react'
import { FaAngleDoubleRight } from 'react-icons/fa'
import axios from 'axios'
import Heart from './Heart'
import { withRouter } from 'react-router-dom'

// 購物車頁面 - 商品卡片
function StoreCard(props) {
  let [StoreCard1, setStoreCard1] = useState([])
  let [Pos, setPos] = useState()
  let {
    setCount,
    setData,
    Filter,
    setFilter,
    CountNav,
    setCountNav,
  } = props
  let NewFilter = [...Filter]

  useEffect(() => {
    // console.log('重新整理')
    StoreCard1 = []
    GetProduct(Pos)
  }, [Pos])

  async function GetProduct(Pos) {
    let P = await axios.get(
      'http://localhost:3002/cart/getProduct'
    )
    if (P.status === 200) {
      // console.log('記錄商品位置', Pos)
      NewFilter.push(Pos)
      let max = 24
      let randomresult = ['', '']
      randomresult[0] = Math.floor(Math.random() * max)
      randomresult[1] = Math.floor(Math.random() * max)
      while (
        randomresult[0] === NewFilter ||
        randomresult[1] === NewFilter ||
        randomresult[0] === randomresult[1]
      ) {
        randomresult[0] = Math.floor(Math.random() * max)
        randomresult[1] = Math.floor(Math.random() * max)
      }

      StoreCard1.push(P.data[randomresult[0]])
      StoreCard1.push(P.data[randomresult[1]])
      setStoreCard1(StoreCard1)
      setFilter(NewFilter)
    }
  }

  return (
    <>
      <div className="storelike col-lg-8 col-12 d-lg-flex justify-content-lg-around align-content-center my-5">
        {StoreCard1.map((v, i) => {
          return (
            <Heart
              i={i}
              v={v}
              setData={setData}
              setCount={setCount}
              Pos={Pos}
              setPos={setPos}
              CountNav={CountNav}
              setCountNav={setCountNav}
            />
          )
        })}
        <div
          className="morecard my-lg-auto mt-5 justify-content-lg-start justify-content-center"
          onClick={() => {
            // console.log('點擊')
            props.history.push('/products')
          }}
        >
          <FaAngleDoubleRight className="DoubleRight" />
          <h1>MORE</h1>
        </div>
      </div>
    </>
  )
}
export default withRouter(StoreCard)
