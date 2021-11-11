import axios from 'axios'
import { useState, useRef } from 'react'
import InputWarning from './InputWarning'
import { FaChevronDown } from 'react-icons/fa'

function Cart_OrderInfoInput(props) {
  let {
    OrderInfo,
    setOrderInfo,
    CityArr,
    setCityArr,
    EmailCheck,
    PhoneCheck,
  } = props
  let [Name, setName] = useState()
  let [Phone, setPhone] = useState()
  let [Email, setEmail] = useState()
  let [City, setCity] = useState()
  let [District, setDistrict] = useState()
  let [Address, setAddress] = useState()
  let [Notice, setNotice] = useState()
  let token = localStorage.getItem('token')
  let [data, setdata] = useState()
  let district = [...OrderInfo]
  let [WarningText, setWarningText] = useState([])

  function UpdateInfo(value, index) {
    let NewOrderInfo = [...OrderInfo]
    NewOrderInfo[index] = value
    // console.log('123', NewOrderInfo)
    setOrderInfo(NewOrderInfo)
  }

  async function getMembersInfo() {
    let NewData
    let M = await axios.get(
      `http://localhost:3002/member/memberprofile`,
      {
        headers: {
          //token 從 header 中 Authorization 屬性傳入
          //格式為 Bearer + 空格 + token
          Authorization: 'Bearer ' + token,
        },
      }
    )
    // console.log('讀取成功')
    // console.log(M.data.data)
    setdata(M.data.data)
    NewData = M.data.data
    setName(NewData[0].name)
    setEmail(NewData[0].email)
    setPhone(NewData[0].mobile)
    let NewOrderInfo = [...OrderInfo]
    NewOrderInfo.push(NewData[0].name)
    NewOrderInfo.push(NewData[0].email)
    NewOrderInfo.push(NewData[0].mobile)
    console.log('新訂單', NewOrderInfo)
    WarningText[0] = ''
    WarningText[1] = ''
    WarningText[2] = ''
    setOrderInfo(NewOrderInfo)
    setWarningText(WarningText)
  }

  return (
    <>
      <div
        className="
        container
        importinfo
        d-flex
        justify-content-lg-between
        justify-content-sm-center
        col-lg-6 col-10
        mb-5
      "
      >
        <h2>收件人資訊</h2>
        <button
          className="import col-lg-3 col-10"
          onClick={() => {
            getMembersInfo()
          }}
        >
          匯入會員資料
        </button>
      </div>

      <div
        className="container col-lg-6 col-10 orderform"
        action=""
      >
        <div className="order">
          <label for="Name">
            <span>*</span>姓名
          </label>
          <input
            type="text"
            className="ordername px-3"
            name="Name"
            value={Name}
            onBlur={(e) => {
              // console.log(e.target.value)
              if (e.target.value === '') {
                WarningText[0] = '您尚未輸入收件人姓名喔'
                setWarningText(WarningText)
              } else {
                WarningText[0] = ''
                setWarningText(WarningText)
                UpdateInfo(e.target.value, 0)
              }
            }}
            onChange={(e) => {
              setName(e.target.value)
            }}
          />
        </div>
        <InputWarning name={WarningText[0]} />
        <div className="order">
          <label for="Phone">
            <span>*</span>手機號碼
          </label>
          <input
            type="text"
            className="phonenumber px-3"
            name="Phone"
            value={Phone}
            onBlur={(e) => {
              // console.log(e.target.value)
              if (
                !PhoneCheck.test(e.target.value) ||
                e.target.value === ''
              ) {
                WarningText[1] =
                  '手機格式不正確，例如:0910xxxxxx。或尚未輸入'
                setWarningText(WarningText)
              } else {
                WarningText[1] = ''
                setWarningText(WarningText)
                UpdateInfo(e.target.value, 1)
              }
            }}
            onChange={(e) => {
              setPhone(e.target.value)
            }}
          />
        </div>
        <InputWarning name={WarningText[1]} />
        <div className="order">
          <label for="Email">
            <span>*</span>電子郵件
          </label>
          <input
            type="email"
            className="email px-3"
            name="Email"
            value={Email}
            onBlur={(e) => {
              // console.log(e.target.value)
              if (
                !EmailCheck.test(e.target.value) ||
                e.target.value === ''
              ) {
                WarningText[2] =
                  '信箱格式不正確，例如:123@gmail.com。或尚未輸入'
                setWarningText(WarningText)
              } else {
                WarningText[2] = ''
                setWarningText(WarningText)
                UpdateInfo(e.target.value, 2)
              }
            }}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />
        </div>
        <InputWarning name={WarningText[2]} />
        <div className="order position-relative">
          <label for="City">
            <span>*</span>請填寫縣市
          </label>
          {/* <input
            type="text"
            className="city px-3"
            name="City"
            value={City}
            onChange={(e) => {
              setCity(e.target.value)
              UpdateInfo(e.target.value, 3)
            }}
          /> */}
          <select
            name="city"
            id="city"
            onBlur={(e) => {
              // console.log(e.target.value)
              if (e.target.value === '') {
                WarningText[3] = '尚未選擇縣市喔'
                setWarningText(WarningText)
              } else {
                WarningText[3] = ''
                setWarningText(WarningText)
                UpdateInfo(e.target.value, 3)
              }
            }}
            onChange={(e) => {
              // console.log('選到的A', e.target.value)
              setCity(e.target.value)
            }}
          >
            {CityArr.map((v, i) => {
              return (
                <option value={v.City}>{v.City}</option>
              )
            })}
          </select>
          <FaChevronDown className="ChevronDown position-absolute" />
        </div>
        <InputWarning name={''} />
        <div className="order position-relative">
          <label for="District">
            <span>*</span>請填寫行政區
          </label>
          {/* <input
            type="text"
            className="district px-3"
            name="District"
            value={District}
            onChange={(e) => {
              setDistrict(e.target.value)
              UpdateInfo(e.target.value, 4)
            }}
          /> */}
          <select
            name="districts"
            id="districts"
            onBlur={(e) => {
              // console.log(e.target.value)
              if (e.target.value === '') {
                WarningText[4] = '尚未選擇行政區喔'
                setWarningText(WarningText)
              } else {
                WarningText[4] = ''
                setWarningText(WarningText)
                UpdateInfo(e.target.value, 4)
              }
            }}
            onChange={(e) => {
              setDistrict(e.target.value)
            }}
          >
            {!OrderInfo[3] ? (
              <option selected>請選擇地區</option>
            ) : (
              CityArr.map((v, i) => {
                if (v.City === OrderInfo[3]) {
                  return v.districts.map((a) => {
                    return (
                      <option value={a.name}>
                        {a.name}
                      </option>
                    )
                  })
                }
              })
            )}
          </select>
          <FaChevronDown className="ChevronDown position-absolute" />
        </div>
        <InputWarning name={''} />
        <div className="order">
          <label for="Address">
            <span>*</span>請填寫地址
          </label>
          <input
            type="text"
            className="address px-3"
            name="Address"
            value={Address}
            onBlur={(e) => {
              // console.log(e.target.value)
              if (e.target.value === '') {
                WarningText[5] = '尚未輸入地址喔'
                setWarningText(WarningText)
              } else {
                WarningText[5] = ''
                setWarningText(WarningText)
                UpdateInfo(e.target.value, 5)
              }
            }}
            onChange={(e) => {
              setAddress(e.target.value)
            }}
          />
        </div>
        <InputWarning name={WarningText[5]} />

        <div className="order">
          <label for="Notice">是否需填寫備註</label>
          <input
            type="text"
            classNameName="notice px-3"
            name="Notice"
            value={Notice}
            onChange={(e) => {
              setNotice(e.target.value)
              UpdateInfo(e.target.value, 6)
            }}
          />
        </div>
      </div>
    </>
  )
}

export default Cart_OrderInfoInput
