import { useState, useEffect } from 'react'
import Cart_OrderDetail from '../../components/Carts/Manage/Cart_OrderDetail'
import TitleBorder from '../../components/TitleBorder'
import { FaCcVisa } from 'react-icons/fa'
import {
  FaShoppingCart,
  FaLongArrowAltRight,
  FaRegEdit,
  FaCheck,
  FaTruckMoving,
  FaStoreAlt,
} from 'react-icons/fa'
import '../../styles/Carts/CartConfirmOrder.scss'
import '../../styles/Carts/Banner.scss'
import '../../styles/Carts/ProcessChart.scss'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import emailjs from 'emailjs-com'
import { init } from 'emailjs-com'
import Spinner from '../../components/SpinnerCart'
init('user_YM7Y1JKslMi9OVCYc197i')

function Cart_ConfimOrder(props) {
  let [data, setData] = useState([{}])
  let [DataDetail, setDataDetail] = useState({})
  let [MemberPoint, setMemberPoint] = useState({})
  let [pointChange, setpointChange] = useState()
  let [loading, setLoading] = useState(true)
  let OrderSid = localStorage.getItem('訂單編號')

  // 設定訂單編號的格式
  useEffect(() => {
    console.log('這邊是初始化')
    // DataAxios()
    MemberLogin()
  }, [])

  async function MemberLogin() {
    let m = await axios.get(
      `http://localhost:3002/member/memberprofile`,
      {
        headers: {
          //token 從 header 中 Authorization 屬性傳入
          //格式為 Bearer + 空格 + token
          Authorization:
            'Bearer ' + localStorage.getItem('token'),
        },
      }
    )
    if (m.data.success) {
      console.log('會員成功登入 id', m.data.data[0].sid)
      DataAxios(m.data.data[0].sid)
    } else {
      Swal.fire({
        icon: 'error',
        title: '請先登入會員哦',
        showConfirmButton: true,
        confirmButtonColor: '#8FC065',
        confirmButtonText: '我知道了',
      }).then((result) => {
        if (result.isConfirmed) {
          props.history.push('/login')
        }
      })
    }
  }
  // 讀取商品資料的 function
  async function DataAxios(Member_id) {
    console.log('會員 id', Member_id)
    let r = await axios.get(
      `http://localhost:3002/cart/ordertempmember/${Member_id}`
    )
    let rD = await axios.get(
      `http://localhost:3002/cart/addList/${OrderSid}`
    )

    let M = await axios.get(
      `http://localhost:3002/cart/memberpoint/${Member_id}`
    )

    if (
      r.status === 200 &&
      rD.status === 200 &&
      M.status === 200
    ) {
      setData(r.data)
      console.log('rD', rD)
      setDataDetail(rD.data.data)
      setMemberPoint(M.data)
      setpointChange(M.data[0].left_point)
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }
  }

  // async function DataAxios() {
  //   let r = await axios.get('http://localhost:3002/cart/')
  //   let rD = await axios.get(
  //     `http://localhost:3002/cart/addList/${OrderSid}`
  //   )
  //   if (r.status === 200 && rD.status === 200) {
  //     setData(r.data)
  //     console.log('rD', rD)
  //     setDataDetail(rD.data.data)
  //     // console.log(rD.data)
  //   }
  // }

  async function ConfirmOrder() {
    setLoading(true)
    let a = []
    let s
    let NewData = [...data]
    a = JSON.parse(localStorage.getItem('訂單價格資訊'))
    // console.log('這是暫存資料', a)
    // console.log('確認訂單資訊', DataDetail)

    if (a[1] !== 0) {
      // console.log('會員點數', a[1])
      await axios.post(
        `http://localhost:3002/cart/modifyPoint`,
        {
          member_sid: MemberPoint[0].member_sid,
          change_point: a[1],
          change_type: 'USE',
          left_point: MemberPoint[0].left_point - a[1],
          change_reason: '會員使用點數',
          // create_at: '',
        }
      )
    }

    await axios.post(
      'http://localhost:3002/cart/ConfirmList',
      {
        Order_Sid: OrderSid,
        Member_id: DataDetail.Member_id,
        Promotion_Amount: a[1],
        Delivery_Fee: localStorage.getItem('運費'),
        Total_Price:
          parseInt(a[2]) -
          parseInt(a[1]) +
          parseInt(localStorage.getItem('運費')),
        Order_Status: '訂單成立',
        Created_At: localStorage.getItem('訂單時間'),
      }
    )

    for (let i in NewData) {
      // console.log('訂單內容', DataDetail.Order_Name)
      s = await axios.post(
        'http://localhost:3002/cart/addDetail',
        {
          Order_Sid: OrderSid,
          Order_Name: DataDetail.Order_Name,
          Product_id: NewData[i].Product_id,
          Order_Total: a[2],
          Order_Amount: NewData[i].Order_Amount,
        }
      )
    }
    if (s.status === 200) {
      sendEmail()
      // console.log('已完成訂單，請到 DB 查看')
      props.history.push('/carts/Complete')
    }
  }

  async function returnfilldata() {
    let m = await axios.get(
      `http://localhost:3002/member/memberprofile`,
      {
        headers: {
          //token 從 header 中 Authorization 屬性傳入
          //格式為 Bearer + 空格 + token
          Authorization:
            'Bearer ' + localStorage.getItem('token'),
        },
      }
    )
    if (m.data.success) {
      // console.log('會員成功登入 id', m.data.data[0].sid)
      let r = await axios.delete(
        `http://localhost:3002/cart/deleteList/${m.data.data[0].sid}`
      )
      if (r.status === 200) {
        // console.log('刪除成功')
        setLoading(false)
        props.history.push('/carts/Manage')
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: '請先登入會員哦',
        showConfirmButton: true,
        confirmButtonColor: '#8FC065',
        confirmButtonText: '我知道了',
      }).then((result) => {
        if (result.isConfirmed) {
          props.history.push('/login')
        }
      })
    }
  }

  async function sendEmail() {
    let templateParams = {
      userMail: DataDetail.E_Mail,
      user: DataDetail.Order_Name,
      time: DataDetail.Created_At,
      orderSid: DataDetail.Order_Sid,
      address: DataDetail.Order_Address,
      paymentType: DataDetail.Payment_Type,
      Invoice:
        DataDetail.Invoice_Type +
        ':' +
        DataDetail.Invoice_Number,
    }

    let service_id = 'EatHealthy'
    let template_id = 'template_wiunfpk'
    let userID = 'user_YM7Y1JKslMi9OVCYc197i'
    emailjs
      .send(service_id, template_id, templateParams, userID)
      .then((response) => {
        console.log(
          'SUCCESS!',
          response.status,
          response.text
        )
      })
      .catch((error) => {
        console.log('FAILED...', error)
      })
  }

  return (
    <>
      <Spinner
        loading={loading}
        customCss={{
          position: 'sticky',
          top: '50%',
          left: '50%',
          zIndex: '100',
        }}
      />
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

      <Cart_OrderDetail data={data} setData={setData} />

      <TitleBorder name="付款與運送方式" />

      <div className="container confirmorderdetail mx-auto col-lg-6 col-10">
        <div className="container importinfo d-flex justify-content-between">
          <div className="importinfotitle col-lg-9 col-6">
            <h2>以下列方式支付金額</h2>
            <h6>{DataDetail.Payment_Type}</h6>
          </div>
          {DataDetail.Payment_Type === '7-11取貨付款' ? (
            <FaStoreAlt className="fastore" />
          ) : DataDetail.Payment_Type === '宅配貨到付款' ? (
            <FaTruckMoving className="fatruck" />
          ) : DataDetail.Payment_Type === '信用卡支付' ? (
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
                {localStorage.getItem('訂單時間')}
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
                收件人姓名
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

      <div class="container confirmorderdetail mx-auto text-center">
        <h1>準備完成你的訂單了嗎?</h1>
      </div>

      <div class="container col-lg-7 col-12 confirm my-5 d-lg-flex text-center justify-content-around">
        <button
          class="returninfo"
          onClick={() => {
            // props.history.push('/carts/Manage')
            returnfilldata()
          }}
        >
          返回填寫資料
        </button>
        <button
          class="confirminfo"
          onClick={() => {
            // console.log('確認')
            ConfirmOrder()
          }}
        >
          完成送出訂單
        </button>
      </div>
    </>
  )
}

export default withRouter(Cart_ConfimOrder)
