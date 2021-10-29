import { useState, useEffect } from 'react'
import Cart_OrderDetail from '../../components/Carts/Manage/Cart_OrderDetail'
import TitleBorder from '../../components/TitleBorder'
import { FaCcVisa } from 'react-icons/fa'
import {
  FaShoppingCart,
  FaLongArrowAltRight,
  FaRegEdit,
  FaCheck,
} from 'react-icons/fa'
import '../../styles/Carts/CartConfirmOrder.scss'
import '../../styles/Carts/Banner.scss'
import '../../styles/Carts/ProcessChart.scss'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

function CartConfimOrder(props) {
  let [data, setData] = useState([{}])
  let [DataDetail, setDataDetail] = useState({})
  let member = 'st880517'

  useEffect(() => {
    console.log('這邊是初始化')
    DataAxios()
  }, [])

  async function DataAxios() {
    let r = await axios.get('http://localhost:3002/cart/')
    let rD = await axios.get(
      `http://localhost:3002/cart/addList/${member}`
    )
    if (r.status === 200 && rD.status === 200) {
      setData(r.data)
      console.log('rD', rD)
      setDataDetail(rD.data.data)
      // console.log(rD.data)
    }
  }

  async function ConfirmOrder() {
    let a = []
    a = JSON.parse(localStorage.getItem('測試'))
    console.log('這是暫存資料', a)
    console.log('完成訂單')
    let r = await axios.post(
      'http://localhost:3002/cart/ConfirmList',
      {
        Order_Sid: '',
        Member_id: 'st880517',
        Total_Price: a[0],
        Order_Status: '訂單成立',
      }
    )
    if (r.status === 200) {
      console.log('已完成訂單，請到 DB 查看')
      localStorage.setItem('訂單編號', DataDetail.Sid)
      props.history.push('/carts/Complete')
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
        <FaLongArrowAltRight className="arrow secondArrow" />
        <div className="FinishInfo col-lg-3 col-xs-1">
          <FaCheck className="icons third" />
          <h3 className="third">完成訂單</h3>
        </div>
      </div>

      <div class="titleBorder col-lg-6 col-10">
        <h4 class="res-title title-fz fw-700">
          確認訂單資訊
        </h4>
      </div>

      <Cart_OrderDetail data={data} setData={setData} />

      <div class="titleBorder col-lg-6 col-10">
        <h4 class="res-title title-fz fw-700">
          付款與運送方式
        </h4>
      </div>

      <div className="container confirmorderdetail mx-auto col-lg-6 col-10">
        <div className="container importinfo d-flex justify-content-between">
          <div className="importinfotitle col-lg-9 col-6">
            <h2>以下列方式支付金額</h2>
            <h6>{DataDetail.Payment_Type}</h6>
          </div>
          <FaCcVisa className="favisa" />
        </div>
        <table className="table text-center table-borderless mx-auto">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="title text-end col-lg-5">
                訂單編號
              </td>
              <td className="text-start col-lg-6">
                {DataDetail.Sid}
              </td>
            </tr>
            <tr>
              <td className="title text-end col-lg-5">
                訂單時間
              </td>
              <td className="text-start col-6">
                UTC+8 {DataDetail.Created_At}
              </td>
            </tr>
            <tr>
              <td className="title text-end col-lg-5">
                配送方式
              </td>
              <td className="text-start col-6">
                {DataDetail.Payment_Type}
              </td>
            </tr>
            <tr>
              <td className="title text-end col-lg-5">
                收件人方式
              </td>
              <td className="text-start col-6">
                {DataDetail.Order_Name}
              </td>
            </tr>
            <tr>
              <td className="title text-end col-5">
                手機號碼
              </td>
              <td className="text-start col-6">
                {DataDetail.Order_Phone}
              </td>
            </tr>
            <tr>
              <td className="title text-end col-5">
                電子信箱
              </td>
              <td className="text-start col-6">
                {DataDetail.E_Mail}
              </td>
            </tr>
            <tr>
              <td className="title text-end col-5">
                收件地址
              </td>
              <td className="text-start col-6">
                {DataDetail.Order_Address}{' '}
              </td>
            </tr>
            <tr>
              <td className="title text-end col-5">
                發票方式
              </td>
              <td className="text-start col-6">
                {DataDetail.Invoice_Type}
              </td>
            </tr>
            <tr className="border-bottom">
              <td className="title text-end col-5">備註</td>
              <td className="text-start col-6">
                {DataDetail.Order_Remark}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="container confirmorderdetail mx-auto text-center">
        <h1>準備完成你的訂單了嗎?</h1>
      </div>

      <div class="container col-lg-7 col-12 confirm my-5 d-lg-flex text-center justify-content-around">
        <button
          class="returninfo col-lg-4 col-10"
          onClick={() => {
            props.history.push('/carts/Manage')
          }}
        >
          返回
        </button>
        <button
          class="confirminfo col-lg-4 col-10"
          onClick={() => {
            ConfirmOrder()
          }}
        >
          送出訂單
        </button>
      </div>
    </>
  )
}

export default withRouter(CartConfimOrder)
