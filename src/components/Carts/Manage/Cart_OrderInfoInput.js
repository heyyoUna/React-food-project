import axios from 'axios'
import { useRef, useState } from 'react'
import InputWarning from './InputWarning'
import { FaChevronDown } from 'react-icons/fa'

function Cart_OrderInfoInput(props) {
  let { OrderInfo, setOrderInfo, CityArr, setCityArr } =
    props
  let [Name, setName] = useState()
  let [Phone, setPhone] = useState()
  let [Email, setEmail] = useState()
  let [City, setCity] = useState()
  let [District, setDistrict] = useState()
  let [Address, setAddress] = useState()
  let [Notice, setNotice] = useState()
  let token = localStorage.getItem('token')
  let [data, setdata] = useState()
  let [Noticejump, setNOticejump] = useState([
    '',
    '',
    '',
    '',
    '',
    '',
  ])
  console.log('檢查正規', Noticejump)
  let EmailCheck = new RegExp(
    /[a-zA-Z_0-9][a-zA-Z_.0-9-]*@([a-zA-Z_0-9][a-zA-Z_.0-9-]*)+/
  )
  let PhoneCheck = new RegExp(/^09[0-9]{8}$/)
  let district = [...OrderInfo]

  function UpdateInfo(value, index) {
    let NewOrderInfo = [...OrderInfo]
    NewOrderInfo[index] = value
    console.log('123', NewOrderInfo)
    setOrderInfo(NewOrderInfo)
  }

  async function getMembersInfo() {
    let M = await axios.get(
      'http://localhost:3002/member/memberprofile',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    if (M.status === 200) {
      let NewData
      console.log('讀取成功')
      console.log(M.data.data)
      setdata(M.data.data)
      NewData = M.data.data
      setName(NewData[0].name)
      setEmail(NewData[0].email)
      setPhone(NewData[0].mobile)
      console.log('New', NewData)
      let NewOrderInfo = [...OrderInfo]
      NewOrderInfo.push(NewData[0].name)
      NewOrderInfo.push(NewData[0].email)
      NewOrderInfo.push(NewData[0].mobile)
      console.log('123', NewOrderInfo)
      setOrderInfo(NewOrderInfo)
    }
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
            onChange={(e) => {
              setName(e.target.value)
              if (e.target.value === '') {
                Noticejump[0] = '請記得輸入收件人姓名哦'
                setNOticejump(Noticejump)
              } else {
                UpdateInfo(e.target.value, 0)
                Noticejump[0] = ''
                setNOticejump(Noticejump)
              }
            }}
          />
        </div>
        <InputWarning name={Noticejump[0]} />
        <div className="order">
          <label for="Phone">
            <span>*</span>手機號碼
          </label>
          <input
            type="text"
            className="phonenumber px-3"
            name="Phone"
            value={Phone}
            onChange={(e) => {
              setPhone(e.target.value)
              if (
                !PhoneCheck.test(e.target.value) ||
                e.target.value === ''
              ) {
                Noticejump[1] = '請輸入正確的手機號碼格式'
                setNOticejump(Noticejump)
              } else {
                UpdateInfo(e.target.value, 1)
                Noticejump[1] = ''
                setNOticejump(Noticejump)
              }
            }}
          />
        </div>
        <InputWarning name={Noticejump[1]} />
        <div className="order">
          <label for="Email">
            <span>*</span>電子郵件
          </label>
          <input
            type="email"
            className="email px-3"
            name="Email"
            value={Email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (
                !EmailCheck.test(e.target.value) ||
                e.target.value === ''
              ) {
                Noticejump[2] = '請輸入正確的信箱格式'
                setNOticejump(Noticejump)
              } else {
                UpdateInfo(e.target.value, 2)
                Noticejump = ''
                setNOticejump(Noticejump)
              }
            }}
          />
        </div>
        <InputWarning name={Noticejump[2]} />
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
            onChange={(e) => {
              // console.log('選到的A', e.target.value)
              setCity(e.target.value)
              if (e.target.value === '') {
                Noticejump[3] = '請記得選擇縣市喔'
                setNOticejump(Noticejump)
              } else {
                Noticejump = ''
                setNOticejump(Noticejump)
                UpdateInfo(e.target.value, 3)
              }
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
        <InputWarning name={Noticejump[3]} />
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
            onChange={(e) => {
              setDistrict(e.target.value)
              if (e.target.value === '') {
                Noticejump[4] = '請記得選擇行政區喔'
                setNOticejump(Noticejump)
              } else {
                Noticejump = ''
                setNOticejump(Noticejump)
                UpdateInfo(e.target.value, 4)
              }
            }}
          >
            {CityArr.map((v, i) => {
              if (!OrderInfo[3]) {
                return <option disabled>請選擇地區</option>
              }
              if (v.City === OrderInfo[3]) {
                return v.districts.map((a) => {
                  return (
                    <option value={a.name}>{a.name}</option>
                  )
                })
              }
            })}
          </select>
          <FaChevronDown className="ChevronDown position-absolute" />
        </div>
        <InputWarning name={Noticejump[4]} />
        <div className="order">
          <label for="Address">
            <span>*</span>請填寫地址
          </label>
          <input
            type="text"
            className="address px-3"
            name="Address"
            value={Address}
            onChange={(e) => {
              if (e.target.value === '') {
                Noticejump[1] = '請記得輸入地址哦'
                setNOticejump(Noticejump)
              } else {
                UpdateInfo(e.target.value, 5)
                Noticejump = ''
                setNOticejump(Noticejump)
              }
              setAddress(e.target.value)

            }}
          />
        </div>
        <InputWarning name={Noticejump[5]} />

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
