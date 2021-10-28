import React, { useEffect, useState } from 'react'
import {
  FaRegHeart,
  FaCartPlus,
  FaAngleDoubleRight,
  FaHeart,
} from 'react-icons/fa'
import axios from 'axios'

function StoreCard(props) {
  const { Likeicon, setLikeicon } = props
  const { unLikeicon, setunLikeicon } = props
  let { addProductPos, setaddProductPos } = props

  async function AddProduct(addProductPos) {
    console.log('我在這喔', addProductPos)
    let Add = await axios.post(
      `http://localhost:3001/cart/`,
      {
        Order_Amount: 1,
        Product_id: 'PM001',
        Member_id: 'st880517',
      }
    )
    if (Add.status === 200) {
      setaddProductPos(0)
      console.log('現在的addProduct', addProductPos)
    }
  }

  return (
    <>
      <div className="storelike col-10 d-lg-flex justify-content-around align-content-center my-5">
        {/* <div className="storecard col-lg-4 col-10 position-relative">
          <div className="storeproduct">
            <div className="body py-2">
              <p className="text ps-5 text-center">特選草飼沙朗牛</p>
              <p className="text ps-5 text-center">NT$80</p>
              <div className="storeicon text-center">
                <FaRegHeart
                  className={unLikeicon}
                  onClick={(e) => {
                    setLikeicon(e.target === true ? Likeicon : 'heart')
                    setunLikeicon('full')
                  }}
                />
                <FaHeart
                  className={Likeicon}
                  onClick={(e) => {
                    setLikeicon(e.target === true ? Likeicon : 'full')
                    setunLikeicon('heart')
                  }}
                />
                <FaCartPlus
                  className="cartlike"
                  onClick={() => {
                    setaddProductPos(0)
                    AddProduct(addProductPos)
                  }}
                />
              </div>
            </div>
          </div>
        </div> */}
        <div className="storecard col-lg-4 col-10 position-relative">
          {/* <img
            src="../../../image/otherproduct.png"
            className="position-absolute"
          /> */}
          <div className="storeproduct">
            <div className="body py-2">
              <p className="text ps-5 text-center">
                冰烤地瓜
              </p>
              <p className="text ps-5 text-center">NT$79</p>
              <div
                className="storeicon text-center"
                onclick="heartclick(event)"
              >
                {/* 卡關:兩個都會亮起關閉 */}
                <FaRegHeart
                  className={unLikeicon}
                  onClick={(e) => {
                    setLikeicon(
                      e.target === true ? Likeicon : 'heart'
                    )
                    setunLikeicon('full')
                  }}
                />
                <FaHeart
                  className={Likeicon}
                  onClick={(e) => {
                    setLikeicon(
                      e.target === true ? Likeicon : 'full'
                    )
                    setunLikeicon('heart')
                  }}
                />{' '}
                <FaCartPlus
                  className="cartlike"
                  onClick={() => {
                    setaddProductPos(1)
                    AddProduct(addProductPos)
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="morecard my-auto">
          <FaAngleDoubleRight className="DoubleRight" />
          <h1>MORE</h1>
        </div>
      </div>
    </>
  )
}
export default StoreCard
