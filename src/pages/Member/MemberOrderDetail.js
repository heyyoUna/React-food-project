import { useState, useEffect } from 'react'
import Cart_OrderDetail from '../../components/Carts/Manage/Cart_OrderDetail'
import { FaCcVisa } from 'react-icons/fa'
import '../../styles/Carts/CartConfirmOrder.scss'
import '../../styles/Carts/Banner.scss'
import '../../styles/Carts/ProcessChart.scss'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

function MemberOrderDetail(props) {
  let [data, setData] = useState([{}])
  let [DataDetail, setDataDetail] = useState({})
  let member = localStorage.getItem('id')
  let OrderSid = localStorage.getItem('訂單編號')

  // 設定訂單編號的格式
  useEffect(() => {
    console.log('這邊是初始化')
    DataAxios()
  }, [])

  async function DataAxios() {
    let r = await axios.get('http://localhost:3002/cart/')
    let rD = await axios.get(
      `http://localhost:3002/cart/addList/${OrderSid}`
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
    let s
    let NewData = [...data]
    a = JSON.parse(localStorage.getItem('訂單價格資訊'))
    // console.log('這是暫存資料', a)
    // console.log('確認訂單資訊', NewData[0].Order_Sid)

    let r = await axios.post(
      'http://localhost:3002/cart/ConfirmList',
      {
        Order_Sid: OrderSid,
        Member_id: member,
        Total_Price: a[0],
        Order_Status: '訂單成立',
        Created_At: DataDetail.Created_At,
      }
    )

    for (let i in NewData) {
      console.log('訂單內容', NewData[i].Order_Sid)
      s = await axios.post(
        'http://localhost:3002/cart/addDetail',
        {
          Order_Sid: OrderSid,
          Product_id: NewData[i].Product_id,
          Order_Total: a[2],
          Promotion_Amount: a[1],
          Order_Amount: NewData[i].Order_Amount,
        }
      )
    }

    if (r.status === 200) {
      console.log('已完成訂單，請到 DB 查看')
      props.history.push('/carts/Complete')
    }
  }

  return (
    <>
      <div class="titleBorder col-lg-6 col-10">
        <h4 class="res-title title-fz fw-700">
          訂單資訊
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
          {DataDetail.Payment_Type === '信用卡支付' ? (
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
                {OrderSid}
              </td>
            </tr>
            <tr>
              <td className="title text-end col-lg-5">
                訂單時間
              </td>
              <td className="text-start col-6">
                {DataDetail.Created_At}
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
                {DataDetail.Invoice_Type} /{' '}
                {DataDetail.Invoice_Number}
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
    </>
  )
}

export default withRouter(MemberOrderDetail)