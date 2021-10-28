import React from 'react'
import Cart_OrderDetail from '../../components/Carts/Manage/Cart_OrderDetail'
import TitleBorder from '../../components/TitleBorder'
import { FaCcVisa } from 'react-icons/fa'
import {
  FaShoppingCart,
  FaLongArrowAltRight,
  FaRegEdit,
  FaCheck,
} from 'react-icons/fa'
import '../../styles/Carts/Cart_ConfirmOrder.scss'
import '../../styles/Carts/Banner.scss'
import '../../styles/Carts/ProcessChart.scss'

function Cart_ConfimOrder(props) {
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

      <TitleBorder name="確認訂單資訊" />

      <Cart_OrderDetail />

      <TitleBorder name="付款與運送方式" />

      <div className="container confirmorderdetail mx-auto col-lg-6 col-10">
        <div className="container importinfo d-flex justify-content-between">
          <div className="importinfotitle col-lg-9 col-6">
            <h2>以下列方式支付金額</h2>
            <h6>信用卡/現金卡</h6>
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
                AA202109190038
              </td>
            </tr>
            <tr>
              <td className="title text-end col-lg-5">
                訂單時間
              </td>
              <td className="text-start col-6">
                UTC+8 2021-09-19 00:38:40
              </td>
            </tr>
            <tr>
              <td className="title text-end col-lg-5">
                配送方式
              </td>
              <td className="text-start col-6">宅配運送</td>
            </tr>
            <tr>
              <td className="title text-end col-lg-5">
                收件人方式
              </td>
              <td className="text-start col-6">Nicolas</td>
            </tr>
            <tr>
              <td className="title text-end col-5">
                手機號碼
              </td>
              <td className="text-start col-6">
                0912-345-678
              </td>
            </tr>
            <tr>
              <td className="title text-end col-5">
                電子信箱
              </td>
              <td className="text-start col-6">
                st880517@gmail.com
              </td>
            </tr>
            <tr>
              <td className="title text-end col-5">
                收件地址
              </td>
              <td className="text-start col-6">
                台北市北投區石牌路 2 段 123 號 1 樓
              </td>
            </tr>
            <tr>
              <td className="title text-end col-5">
                發票方式
              </td>
              <td className="text-start col-6">
                手機載具條碼 / QK2TUU2
              </td>
            </tr>
            <tr className="border-bottom">
              <td className="title text-end col-5">備註</td>
              <td className="text-start col-6"></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="container confirmorderdetail mx-auto text-center">
        <h1>準備完成你的訂單了嗎?</h1>
      </div>

      <div class="container col-lg-7 col-12 confirm my-5 d-lg-flex text-center justify-content-around">
        <button class="returninfo col-lg-4 col-10">
          返回
        </button>
        <button class="confirminfo col-lg-4 col-10">
          送出訂單
        </button>
      </div>
    </>
  )
}

export default Cart_ConfimOrder
