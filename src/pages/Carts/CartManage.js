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
  FaExclamationTriangle,
} from 'react-icons/fa'
import '../../styles/Carts/CartManage.scss'
import '../../styles/Carts/Banner.scss'
import '../../styles/Carts/ProcessChart.scss'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
import momentTZ from 'moment-timezone'
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import Spinner from '../../components/SpinnerCart'

function CartManage(props) {
  let EmailCheck = new RegExp(
    /[a-zA-Z_0-9][a-zA-Z_.0-9-]*@([a-zA-Z_0-9][a-zA-Z_.0-9-]*)+/
  )
  let PhoneCheck = new RegExp(/^09[0-9]{8}$/)
  let [data, setData] = useState([{}])
  let [OrderInfo, setOrderInfo] = useState([])
  let [Checkout, setCheckout] = useState('')
  let [Invoice, setInvoice] = useState([])
  let [StoreInfo, setStoreInfo] = useState([])
  let [Credit, setCredit] = useState([])
  let [CityArr, setCityArr] = useState([{}])
  let member
  let token = localStorage.getItem('token')
  let [loading, setLoading] = useState(true)
  var a = momentTZ
    .utc()
    .tz('Asia/Taipei')
    .format('YYYY-MM-DD HH:mm:ss')
  useEffect(() => {
    // console.log('這邊是初始化')
    CityAxios()
    MemberLogin()
  }, [])

  useEffect(() => {
    // console.log('訂購資料', OrderInfo)
    // console.log('付款資料', Checkout)
    // console.log('發票資料', Invoice)
  }, [OrderInfo, Checkout, Invoice])

  async function CityAxios() {
    let r = await axios.get(
      'http://localhost:3000/taiwan_districts.json'
    )
    if (r.status === 200) {
      // setData(r.data)
      // console.log(r.data)
      for (let i = 0; i < r.data.length; i++) {
        CityArr[i] = {
          City: r.data[i].name,
          districts: r.data[i].districts,
        }
      }
      // console.log('Store城市', CityArr)
    }
  }
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
      // console.log('會員成功登入 id', m.data.data[0].sid)
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
    // console.log('會員 id', Member_id)
    let r = await axios.get(
      `http://localhost:3002/cart/ordertempmember/${Member_id}`
    )
    if (r.status === 200) {
      // 設定 data
      setData(r.data)
      // console.log('抓回來的資料', r.data)
      setTimeout(() => {
        setLoading(false)
      }, 2000)
    }
  }

  async function AddOrder(
    OrderInfo,
    Checkout,
    Invoice,
    StoreInfo
  ) {
    localStorage.setItem('訂單時間', a)
    await axios
      .get(`http://localhost:3002/member/memberprofile`, {
        headers: {
          //token 從 header 中 Authorization 屬性傳入
          //格式為 Bearer + 空格 + token
          Authorization: 'Bearer ' + token,
        },
      })
      .then((res) => {
        member = res.data.data[0].sid
        // console.log('會員 id ', member)
      })
    // console.log('寫出訂單')
    let NewOrderInfo
    var b = momentTZ
      .utc()
      .tz('Asia/Taipei')
      .format('YYYYMMDDHHmmss')
    let OrderSid =
      'order' +
      b +
      '-' +
      Math.floor(Math.random() * (9999 - 1000)) +
      parseInt(1000)
    localStorage.setItem('訂單編號', OrderSid)
    // console.log('CHECKOUT', Checkout)

    if (Checkout === '7-11取貨付款') {
      if (!StoreInfo[7]) {
        // console.log('第8個位置沒有值', StoreInfo)
      }
      NewOrderInfo = [
        Checkout,
        StoreInfo[4],
        StoreInfo[5],
        StoreInfo[6],
        StoreInfo[3] + '-' + StoreInfo[0],
        StoreInfo[1],
        StoreInfo[2],
        !StoreInfo[7] ? '無' : StoreInfo[7],
        // ...Invoice,
      ]
      // NewOrderInfo[1] = StoreInfo[4]
      // NewOrderInfo[2] = StoreInfo[5]
      // NewOrderInfo[3] = StoreInfo[6]
      // NewOrderInfo[4] = StoreInfo[3]
      // NewOrderInfo[5] = '-' + StoreInfo[0]
      // NewOrderInfo[6] = StoreInfo[1] + StoreInfo[2]
    }
    if (
      Checkout === '宅配貨到付款' ||
      Checkout === '信用卡支付 - 宅配到府'
    ) {
      NewOrderInfo = [
        Checkout,
        OrderInfo[0],
        OrderInfo[1],
        OrderInfo[2],
        OrderInfo[3],
        OrderInfo[4],
        OrderInfo[5],
        OrderInfo[6],
        // ...Invoice,
      ]
    }
    // console.log('寫出的訂購資料', NewOrderInfo)

    // let NewOrderInfo = [Checkout, ...OrderInfo]
    if (!NewOrderInfo[7]) {
      // console.log('這邊是 undefine')
      NewOrderInfo[7] = '無'
      // console.log('寫出的訂購資料_加入備註', NewOrderInfo)
    }
    NewOrderInfo = [...NewOrderInfo, ...Invoice]
    console.log('寫出的訂購資料_加入發票', NewOrderInfo)

    let r = await axios.post(
      'http://localhost:3002/cart/addList',
      {
        Order_Sid: localStorage.getItem('訂單編號'),
        Payment_Type: NewOrderInfo[0],
        Order_Name: NewOrderInfo[1],
        E_Mail: NewOrderInfo[3],
        Order_Phone: NewOrderInfo[2],
        Order_Address:
          NewOrderInfo[4] +
          NewOrderInfo[5] +
          NewOrderInfo[6],
        Member_id: member,
        Invoice_Type: NewOrderInfo[8],
        Order_Remark: NewOrderInfo[7],
        Invoice_Number: NewOrderInfo[9],
        Created_At: localStorage.getItem('訂單時間'),
      }
    )
    if (r.status === 200) {
      // console.log('寫入 DB')
      localStorage.removeItem('門市')
      props.history.push('/carts/ConfirmOrder')
    }
  }

  function DeliveryJudge() {
    // console.log('測試checkout', Checkout)
    if (Checkout === '7-11取貨付款') {
      return (
        <Cart_Store
          StoreInfo={StoreInfo}
          setStoreInfo={setStoreInfo}
          CityArr={CityArr}
          setCityArr={setCityArr}
          EmailCheck={EmailCheck}
          PhoneCheck={PhoneCheck}
        />
      )
    }
    if (Checkout === '宅配貨到付款') {
      return (
        <Cart_OrderInfoInput
          OrderInfo={OrderInfo}
          setOrderInfo={setOrderInfo}
          CityArr={CityArr}
          setCityArr={setCityArr}
          EmailCheck={EmailCheck}
          PhoneCheck={PhoneCheck}
        />
      )
    }
    if (Checkout === '信用卡支付 - 宅配到府') {
      return (
        <Cart_CreditPay
          OrderInfo={OrderInfo}
          setOrderInfo={setOrderInfo}
          CityArr={CityArr}
          setCityArr={setCityArr}
          EmailCheck={EmailCheck}
          PhoneCheck={PhoneCheck}
          Credit={Credit}
          setCredit={setCredit}
        />
      )
    }
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
        <FaLongArrowAltRight className="arrow" />
        <div className="FinishInfo col-lg-3 col-xs-1">
          <FaCheck className="icons" />
          <h3>完成訂單</h3>
        </div>
      </div>
      <TitleBorder name="確認訂單資訊" />
      <Cart_OrderDetail data={data} />
      <TitleBorder name="付款方式" />

      <Cart_CheckOut setCheckout={setCheckout} />
      <TitleBorder name="取貨資料" />

      {!Checkout ? (
        <div
          className="container col-10"
          style={{
            height: '200px',
            // backgroundColor: '#2A593E',
            textAlign: 'center',
            lineHeight: '120px',
            borderRadius: '20px',
          }}
        >
          <FaExclamationTriangle
            style={{
              // color: '#ffffff',
              color: '#fb620980',
              // color: '#2a593e',
              fontSize: '70px',
            }}
          />
          <h3
            style={{
              color: '#fb620980',
              // color: '#2a593e',
              fontFamily: 'Noto Sans TC',
              fontWeight: '500',
            }}
          >
            Oops...請記得選擇付款與運送方式唷!
          </h3>
        </div>
      ) : (
        DeliveryJudge()
      )}
      <TitleBorder name="發票方式" />
      <Cart_Invoice
        Invoice={Invoice}
        setInvoice={setInvoice}
      />
      <div className="container col-lg-7 col-12 confirm my-5 d-lg-flex text-center justify-content-around">
        <button
          className="returninfo"
          onClick={() => {
            props.history.push('/carts/PreOrder')
          }}
        >
          返回至購物車
        </button>
        <button
          className="confirminfo"
          onClick={() => {
            // console.log('付款方式', Checkout)
            console.log('確認訂單', OrderInfo)
            // console.log('發票', Invoice)

            // 判斷是否都有選擇付款方式與發票形式
            if (
              Checkout.length === 0 ||
              Invoice.length === 0
            ) {
              Swal.fire({
                icon: 'warning',
                title: '未選擇付款方式或發票類型!',
                showConfirmButton: false,
                timer: 1500,
              })
            } else {
              // 判斷有選擇發票形式但未填裡面的資料
              if (
                (Invoice[0] === '手機條碼載具' ||
                  Invoice[0] === '電子發票 - 公司') &&
                (Invoice[1] === '' || !Invoice[1])
              ) {
                Swal.fire({
                  icon: 'warning',
                  title: '資料未填寫，或是載具統編格式有誤!',
                  showConfirmButton: false,
                  timer: 1500,
                })
              } else {
                // 如果是 7-11 取貨付款
                if (Checkout === '7-11取貨付款') {
                  for (let i = 0; i < 7; i++) {
                    if (!StoreInfo[i]) {
                      Swal.fire({
                        icon: 'warning',
                        title:
                          '您尚未填寫 7-11 收件資料或是填寫格式錯誤喔!',
                        showConfirmButton: false,
                        timer: 1500,
                      })
                      break
                    }
                    if (i == 6) {
                      AddOrder(
                        OrderInfo,
                        Checkout,
                        Invoice,
                        StoreInfo
                      )
                    }
                  }
                }

                // 如果是宅配付款或信用卡支付
                if (
                  Checkout === '宅配貨到付款' ||
                  Checkout === '信用卡支付 - 宅配到府'
                ) {
                  for (let i = 0; i < 6; i++) {
                    if (!OrderInfo[i]) {
                      Swal.fire({
                        icon: 'warning',
                        title:
                          '您尚未填寫宅配收件資料或是填寫格式錯誤喔!',
                        showConfirmButton: false,
                        timer: 1500,
                      })
                      break
                    } else if (i == 5) {
                      AddOrder(
                        OrderInfo,
                        Checkout,
                        Invoice,
                        StoreInfo
                      )
                    }
                  }
                }
              }
            }
          }}
        >
          確認，下一步
        </button>
      </div>
    </>
  )
}

export default withRouter(CartManage)
