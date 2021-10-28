import React from 'react'
import { useState, useEffect } from 'react'
import Cart_OrderDetail from '../../components/Carts/Manage/Cart_OrderDetail'
import Cart_OrderInfoInput from '../../components/Carts/Manage/Cart_OrderInfoInput'
import Cart_CreditPay from '../../components/Carts/Manage/Cart_CreditPay'
import Cart_Store from '../../components/Carts/Manage/Cart_Store'
import Cart_CheckOut from '../../components/Carts/Manage/Cart_CheckOut'
import Cart_Invoice from '../../components/Carts/Manage/Cart_Invoice'
import TitleBorder from '../../components/TitleBorder'
import {
  FaShoppingCart,
  FaLongArrowAltRight,
  FaRegEdit,
  FaCheck,
} from 'react-icons/fa'
import '../../styles/Carts/Cart_Manage.scss'
import '../../styles/Carts/Banner.scss'
import '../../styles/Carts/ProcessChart.scss'
import axios from 'axios'
import { withRouter } from 'react-router-dom'


function Cart_Manage(props) {
  let [data, setData] = useState([{}])
  let [OrderInfo, setOrderInfo] = useState([])
  let [Checkout, setCheckout] = useState()
  let [Invoice, setInvoice] = useState([])
  console.log('Checkout', Checkout)

  useEffect(() => {
    console.log('這邊是初始化')
    DataAxios()
  }, [])

  useEffect(() => {
    // console.log('訂購資料', OrderInfo)
    // console.log('付款資料', Checkout)
    // console.log('發票資料', Invoice)
  }, [OrderInfo, Checkout, Invoice])

  async function DataAxios() {
    let r = await axios.get('http://localhost:3002/cart/')
    if (r.status === 200) {
      setData(r.data)
      console.log(r.data)
    }
  }

  async function AddOrder(OrderInfo, Checkout, Invoice) {
    console.log('寫出訂單')
    let NewOrderInfo = [...OrderInfo, Checkout, ...Invoice]
    console.log('寫出的訂購資料', NewOrderInfo)
    let r = await axios.post(
      'http://localhost:3002/cart/addList',
      {
        Sid: '',
        Member_id: 'st880517',
        Order_Name: NewOrderInfo[0],
        Order_Phone: NewOrderInfo[1],
        E_Mail: NewOrderInfo[2],
        Order_Address:
          NewOrderInfo[3] +
          NewOrderInfo[4] +
          NewOrderInfo[5],
        Invoice_Type: NewOrderInfo[8],
        Payment_Type: NewOrderInfo[7],
        Order_Remark: NewOrderInfo[6],
      }
    )
    if (r.status === 200) {
      console.log('寫入 DB')
      props.history.push('/carts/ConfirmOrder')
    }
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
          <FaRegEdit className="icons second" />
          <h3 className="second">填寫資料</h3>
        </div>
        <FaLongArrowAltRight className="arrow" />
        <div className="FinishInfo col-lg-3 col-xs-1">
          <FaCheck className="icons" />
          <h3>完成訂單</h3>
        </div>
      </div>
      <div className="titleBorder col-lg-6 col-10">
        <h4 className="res-title title-fz fw-700">
          確認訂單資訊
        </h4>
      </div>
      <Cart_OrderDetail data={data} />
      <div className="titleBorder col-lg-6 col-10">
        <h4 className="res-title title-fz fw-700">
          付款方式
        </h4>
      </div>
      <Cart_CheckOut setCheckout={setCheckout} />
      <div className="titleBorder col-lg-6 col-10">
        <h4 className="res-title title-fz fw-700">
          取貨資料
        </h4>
      </div>
      {/* <Cart_Store OrderInfo={OrderInfo} setOrderInfo={setOrderInfo} /> */}
      {/* <Cart_CreditPay OrderInfo={OrderInfo} setOrderInfo={setOrderInfo}  /> */}
      <Cart_OrderInfoInput
        OrderInfo={OrderInfo}
        setOrderInfo={setOrderInfo}
      />
      <div className="titleBorder col-lg-6 col-10">
        <h4 className="res-title title-fz fw-700">
          發票方式
        </h4>
      </div>
      <Cart_Invoice
        Invoice={Invoice}
        setInvoice={setInvoice}
      />
      <div className="container col-lg-7 col-12 confirm my-5 d-lg-flex text-center justify-content-around">
        <button
          className="returninfo col-lg-4 col-10"
          onClick={() => {
            console.log(props)
            props.history.push('/carts/PreOrder')
          }}
        >
          返回購物車
        </button>
        <button
          className="confirminfo col-lg-4 col-10"
          onClick={() => {
            AddOrder(OrderInfo, Checkout, Invoice)
          }}
        >
          確認訂單
        </button>
      </div>
    </>
  )
}

export default withRouter(Cart_Manage)
