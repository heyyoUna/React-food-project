import React, { useEffect, useState } from 'react'
import {
  FaRegHeart,
  FaCartPlus,
  FaAngleDoubleRight,
  FaHeart,
} from 'react-icons/fa'
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io'
import axios from 'axios'

// 購物車頁面 - 商品卡片
function StoreCard(props) {
  const { Likeone, setLikeone } = props
  const { Liketwo, setLiketwo } = props
  let { addProductPos, setaddProductPos } = props
  let cardmap = ['1', '2']
  let [StoreCard, setStoreCard] = useState([])
  let NewLikeone = [...Likeone]
  useEffect(() => {
    GetProduct()
  }, [])

  useEffect(() => {}, [StoreCard])

  async function GetProduct() {
    let P = await axios.get(
      'http://localhost:3002/cart/getProduct'
    )
    if (P.status === 200) {
      let max = 24
      let randomresult = ['', '']
      // console.log(P.data)
      randomresult[0] = Math.floor(Math.random() * max)
      randomresult[1] = Math.floor(Math.random() * max)
      StoreCard.push(P.data[randomresult[0]])
      StoreCard.push(P.data[randomresult[1]])
      setStoreCard(StoreCard)
      console.log('新陣列', StoreCard)
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
      <div className="storelike col-10 d-lg-flex justify-content-around align-content-center my-5">
        {StoreCard.map((v, i) => {
          return (
            <div className="storecard col-lg-4 col-10 position-relative">
              <img
                src={`http://localhost:3002/img/Product/${v.product_id}.jpg`}
                className="position-absolute"
              />
              <div className="storeproduct">
                <div className="body py-2">
                  <p className="text ps-5 text-center">
                    {v.name}
                  </p>
                  <p className="text ps-5 text-center">
                    NT${v.price}
                  </p>
                  <div
                    className="storeicon ps-3 text-center"
                    onclick="heartclick(event)"
                  >
                    {/* 卡關:兩個都會亮起關閉 */}
                    <IoIosHeartEmpty
                      className={NewLikeone[0]}
                      onClick={(e) => {
                        console.log('位置', e.state)
                        // // if (e.target.id === i) {
                        // //   e.target.className = 'full'
                        // // }
                        // NewLikeone[0] = 'full'
                        // setLikeone(['full', 'heart'])
                        // console.log(Likeone)
                        // // setLikeicon(
                        // //   i === true ? Likeicon : 'heart'
                        // // )
                        // // setunLikeicon('full')
                      }}
                    />
                    <IoIosHeart className={Liketwo} />
                    <FaCartPlus
                      className="cartlike"
                      onClick={() => {
                        setaddProductPos(1)
                        // AddProduct(addProductPos)
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )
        })}

        <div className="morecard my-auto">
          <FaAngleDoubleRight className="DoubleRight" />
          <h1>MORE</h1>
        </div>
      </div>
    </>
  )
}
export default StoreCard
