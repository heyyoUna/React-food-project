import { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { FaCcVisa } from 'react-icons/fa'
import moment from 'moment'
import Cart_OrderDetail from '../../components/Carts/Manage/Cart_OrderDetail'
import '../../styles/Carts/CartConfirmOrder.scss'
import '../../styles/Carts/Banner.scss'
import '../../styles/Carts/ProcessChart.scss'

function MemberOrderDetail(props) {
  let [data, setData] = useState([{}])
  let [dataDetail, setDataDetail] = useState({})
  let orderSID = props.match.params.ordersid

  useEffect(() => {
    //讀取訂單明細
    fetch(`http://localhost:3002/cart/getDetail/${orderSID}`, {
      method: 'GET',
    }).then(obj => obj.json())
      .then(obj => {
        // setDataDetail(obj.data)
        console.log('test', obj)
      })

    //讀取訂單內商品明細資料
    fetch(`http://localhost:3002/cart/`, {
      method: 'GET',
    }).then(obj => obj.json())
      .then(obj => {
        setData(obj)
      })
  }, [])

  return (
    <>
      <div className="titleBorder col-lg-6 col-10">
        <h4 className="res-title title-fz fw-700">
          訂單資訊
        </h4>
      </div>

      {/* <Cart_OrderDetail data={data} setData={setData} /> */}
      <div className="titleBorder col-lg-6 col-10">
        <h4 className="res-title title-fz fw-700">
          付款與運送方式
        </h4>
      </div>
      <div className="container confirmorderdetail mx-auto col-lg-6 col-10">
        <div className="container importinfo d-flex justify-content-between">
          <div className="importinfotitle col-lg-9 col-6">
            <h2>以下列方式支付金額</h2>
            <h6>{dataDetail.Payment_Type}</h6>
          </div>
          {dataDetail.Payment_Type === '信用卡支付' ? (
            <FaCcVisa className="favisa" />
          ) : (
            ''
          )}
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
                {orderSID.toUpperCase()}
              </td>
            </tr>
            <tr>
              <td className="title text-end col-lg-5">
                訂單時間
              </td>
              <td className="text-start col-6">
                {moment(orderSID.split('order')[1], 'YYYYMMDDHHmmss').format('YYYY-MM-DD HH:mm:ss')}
              </td>
            </tr>
            <tr>
              <td className="title text-end col-lg-5">
                配送方式
              </td>
              <td className="text-start col-6">
                {dataDetail.Payment_Type}
              </td>
            </tr>
            <tr>
              <td className="title text-end col-lg-5">
                收件人方式
              </td>
              <td className="text-start col-6">
                {dataDetail.Order_Name}
              </td>
            </tr>
            <tr>
              <td className="title text-end col-5">
                手機號碼
              </td>
              <td className="text-start col-6">
                {dataDetail.Order_Phone}
              </td>
            </tr>
            <tr>
              <td className="title text-end col-5">
                電子信箱
              </td>
              <td className="text-start col-6">
                {dataDetail.E_Mail}
              </td>
            </tr>
            <tr>
              <td className="title text-end col-5">
                收件地址
              </td>
              <td className="text-start col-6">
                {dataDetail.Order_Address}{' '}
              </td>
            </tr>
            <tr>
              <td className="title text-end col-5">
                發票方式
              </td>
              <td className="text-start col-6">
                {dataDetail.Invoice_Type} /{' '}
                {dataDetail.Invoice_Number}
              </td>
            </tr>
            <tr className="border-bottom">
              <td className="title text-end col-5">備註</td>
              <td className="text-start col-6">
                {dataDetail.Order_Remark}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default withRouter(MemberOrderDetail)