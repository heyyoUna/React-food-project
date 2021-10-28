import React, { useState, useEffect } from 'react'
import {
  FaShoppingCart,
  FaLongArrowAltRight,
  FaRegEdit,
  FaCheck,
} from 'react-icons/fa'
import OrderInfo from '../../components/Carts/PreOrder/OrderInfo'
import OrderDetail from '../../components/Carts/PreOrder/OrderDetail'
import '../../styles/Carts/Cart_PreOrder.scss'
import '../../styles/Carts/Banner.scss'
import '../../styles/Carts/ProcessChart.scss'
import axios from 'axios'

function Cart_PreOrder() {
  let [data, setData] = useState([{}])
  let [Count, setCount] = useState([])
  let [Pos, setPos] = useState()
  let [ODPos, setODPos] = useState()
  let [DeletePos, setDeleteODPos] = useState()
  let [addProductPos, setaddProductPos] = useState()
  let [Promotion, setPromotion] = useState(0)
  let [judge, setjudge] = useState(false)

  useEffect(() => {
    console.log('這邊是初始化')
    DataAxios()
  }, [addProductPos])

  useEffect(() => {
    // console.log('目前商品位置', Pos, ODPos)

    ModifyProduct(Count, Pos, ODPos)
  }, [Count[Pos]])

  useEffect(() => {
    // console.log('目前刪除位置', DeletePos)
    DeleteProduct(DeletePos)
  }, [DeletePos])

  // useEffect(() => {
  //   console.log('目前新增位置', addProductPos)
  //   AddProduct(addProductPos)
  // }, [addProductPos])

  async function DataAxios() {
    let r = await axios.get('http://localhost:3002/cart/')
    if (r.status === 200) {
      setData(r.data)
      for (let i = 0; i < r.data.length; i++) {
        Count[i] = r.data[i].Order_Amount
      }
      // console.log('DataAxios裡面', Count)
      setCount(Count)
      productPrice()
      // totalPromotion()
      totalPrice()
      // return Count
    }
  }

  // async function AddProduct(addProduct) {
  //   console.log('我在這喔')
  //   let Add = await axios.post(`http://localhost:3001/cart/`, {
  //     Order_Amount: 1,
  //     Product_id: 'PM001',
  //     Member_id: 'st880517',
  //   })
  //   if (Add.status === 200) {
  //     setaddProductPos(0)
  //     console.log('現在的addProduct', addProductPos)
  //     // DataAxios()
  //   }
  // }

  async function ModifyProduct(Count, Pos) {
    // console.log('修改函數', Count, Pos, ODPos, Count[Pos])
    let Mod = await axios.put(
      `http://localhost:3002/cart/${ODPos}`,
      {
        Order_Amount: Count[Pos],
      }
    )
    if (Mod.status === 200) {
      console.log('已經 Modify', Count)
      DataAxios()
      return Count
    }
  }

  async function DeleteProduct(DeletePos) {
    let del = await axios.delete(
      `http://localhost:3002/cart/${DeletePos}`
    )
    if (del.status === 200) {
      console.log('已經刪除')
      DataAxios()
      return DeletePos
    }
  }

  // Summary
  // 計算目前所有的商品小計
  const productPrice = () => {
    let totalCount = 0
    let priceinfo = [...data]

    priceinfo.map((v, i) => {
      totalCount += v.Order_Amount * v.price
    })

    // for (let i = 0; i < Count.length; i++) {
    // }
    console.log('商品小計', totalCount)

    return totalCount
  }

  // // 計算目前所有的商品優惠總價
  // const totalPromotion = () => {
  //   let Promotionsum = 0
  //   let Promoinfo = [...data]

  //   Promoinfo.map((v, i) => {
  //     Promotionsum += v.Promotion_Number
  //   })

  //   console.log('商品總優惠', Promotionsum)
  //   return Promotionsum
  // }

  const totalPrice = () => {
    let Pricesum = 0
    let Priceinfo = [...data]

    Priceinfo.map((v, i) => {
      Pricesum += v.Order_Amount * v.price
    })
    Pricesum -= Promotion

    console.log('商品總價', Pricesum)
    return Pricesum
  }

  return (
    <>
      <div className="container-fluid Banner col-xs-10">
        <div className="bannerTitle col-lg-8 col-xs-8 ">
          <h1 className="bannerTitle1 col-xs-6">
            只差一步
          </h1>
          <h1 className="bannerTitle2 col-xs-6">
            眼前所及全部歸你
          </h1>
        </div>
      </div>

      <div className="Process col-lg-8 col-xs-6 d-flex justify-content-around align-content-end">
        <div className="CartImage col-lg-3 col-xs-1">
          <FaShoppingCart className="icons first" />
          <h3 className="first">確認購物車</h3>
        </div>
        <FaLongArrowAltRight className="arrow firstArrow" />
        <div className="EditInfo col-lg-3 col-xs-1">
          <FaRegEdit className="icons" />
          <h3>填寫資料</h3>
        </div>
        <FaLongArrowAltRight className="arrow" />
        <div className="FinishInfo col-lg-3 col-xs-1">
          <FaCheck className="icons" />
          <h3>完成訂單</h3>
        </div>
      </div>

      <div className="container shoppingtitle my-5 col-lg-10">
        <span>SHOPPING CART</span>
        <div className="bottom-line col-lg-6 col-10 mx-lg-0 mx-auto"></div>
      </div>

      <div className="container ordercheck col-lg-10 d-lg-flex">
        <OrderDetail
          data={data}
          Count={Count}
          setCount={setCount}
          Pos={Pos}
          setODPos={setODPos}
          setPos={setPos}
          setDeleteODPos={setDeleteODPos}
          addProductPos={addProductPos}
          setaddProductPos={setaddProductPos}
        />
        <OrderInfo
          productPrice={productPrice}
          totalPrice={totalPrice}
          // totalPromotion={totalPromotion}
          Promotion={Promotion}
          setPromotion={setPromotion}
        />
      </div>
    </>
  )
}

export default Cart_PreOrder
