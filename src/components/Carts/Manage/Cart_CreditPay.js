import React from 'react'
import { useState } from 'react'
import Cart_OrderInfoInput from './Cart_OrderInfoInput'
import InputWarning from './InputWarning'

function Cart_CreditPay(props) {
  let {
    OrderInfo,
    setOrderInfo,
    CityArr,
    setCityArr,
    EmailCheck,
    PhoneCheck,
    Credit,
    setCredit,
  } = props

  let [CreditNumber, setCreditNumber] = useState([])
  let [WarningText, setWarningText] = useState([])
  let [Pos, setPos] = useState([])
  const CreditCheck = new RegExp(/\d{4}/)
  const CreditSafe = new RegExp(/\d{3}/)

  // console.log('信用卡號', CreditNumber)
  // console.log('信用卡位置', WarningText)
  // console.log('信用卡', Pos)

  function UpdateInfo(value, index) {
    let NewCredit = [...Credit]
    NewCredit[index] = value
    console.log('信用卡', NewCredit)
    setCredit(NewCredit)
  }

  return (
    <>
      <div
        action=""
        class="container creditcard col-lg-6 col-10 px-0"
      >
        <div class="creditcard_number">
          <label for="">
            <span class="star">*</span>信用卡號
          </label>
          <input
            type="text"
            class="cardnumber mx-1"
            name={CreditNumber[0]}
            id="cardnumber"
            onBlur={(e) => {
              if (
                !CreditCheck.test(e.target.value) ||
                e.target.value.length != 4
              ) {
                WarningText[0] =
                  '信用卡格式不正確或尚未輸入'
                setWarningText(WarningText)
              } else {
                WarningText[0] = ''
                setWarningText(WarningText)
              }
              setPos(0)
              UpdateInfo(e.target.value, 0)
            }}
            onChange={(e) => {
              CreditNumber[0] = e.target.value
              setCreditNumber(CreditNumber)
              setCredit(CreditNumber)
            }}
          />
          <span>/</span>
          <input
            type="text"
            class="cardnumber mx-1"
            name={CreditNumber[1]}
            id="cardnumber"
            onBlur={(e) => {
              // console.log(e.target.value)
              if (
                !CreditCheck.test(e.target.value) ||
                e.target.value.length != 4
              ) {
                WarningText[1] =
                  '信用卡格式不正確或尚未輸入'
                setWarningText(WarningText)
              } else {
                WarningText[1] = ''
                setWarningText(WarningText)
              }
              setPos(1)
              UpdateInfo(e.target.value, 1)
            }}
            onChange={(e) => {
              // console.log('信用卡1', e.target.value)
              CreditNumber[1] = e.target.value
              setCreditNumber(CreditNumber)
              setCredit(CreditNumber)
            }}
          />
          <span>/</span>
          <input
            type="text"
            class="cardnumber mx-1"
            name={CreditNumber[2]}
            id="cardnumber"
            onBlur={(e) => {
              // console.log(e.target.value)
              if (
                !CreditCheck.test(e.target.value) ||
                e.target.value.length != 4
              ) {
                WarningText[2] =
                  '信用卡格式不正確或尚未輸入'
                setWarningText(WarningText)
              } else {
                WarningText[2] = ''
                setWarningText(WarningText)
              }
              setPos(2)
              UpdateInfo(e.target.value, 2)
            }}
            onChange={(e) => {
              // console.log('信用卡1', e.target.value)
              CreditNumber[2] = e.target.value
              setCreditNumber(CreditNumber)
              setCredit(CreditNumber)
            }}
          />
          <span>/</span>
          <input
            type="text"
            class="cardnumber mx-1"
            name={CreditNumber[3]}
            id="cardnumber"
            onBlur={(e) => {
              // console.log(e.target.value)
              if (
                !CreditCheck.test(e.target.value) ||
                e.target.value.length != 4
              ) {
                WarningText[3] =
                  '信用卡格式不正確或尚未輸入'
                setWarningText(WarningText)
              } else {
                WarningText[3] = ''
                setWarningText(WarningText)
              }
              setPos(3)
              UpdateInfo(e.target.value, 3)
            }}
            onChange={(e) => {
              // console.log('信用卡1', e.target.value)
              CreditNumber[3] = e.target.value
              setCreditNumber(CreditNumber)
              setCredit(CreditNumber)
            }}
          />
        </div>
        <InputWarning name={WarningText[Pos]} />
        <div class="creditcard_duedate">
          <label for="">
            <span class="star">*</span>有效期限
          </label>
          {/* <input
            type="text"
            class="cardduedate mx-lg-1 mx-2"
            name="cardduedate"
            id="cardduedate"
            placeholder="MM"
          /> */}
          <select
            type="text"
            class="cardduedate mx-lg-1 mx-2"
            name={CreditNumber[4]}
            id="cardduedate"
            placeholder="MM"
            onBlur={(e) => {
              if (e.target.value === '') {
                WarningText[4] = '信用卡月份尚未選擇'
                setWarningText(WarningText)
              } else {
                WarningText[4] = ''
                setWarningText(WarningText)
              }
              setPos(4)
              UpdateInfo(e.target.value, 4)
                          }}
            onChange={(e) => {
              CreditNumber[4] = e.target.value
              setCreditNumber(CreditNumber)
              setCredit(CreditNumber)
            }}
          >
            <option value="01">01</option>
            <option value="02">02</option>
            <option value="03">03</option>
            <option value="04">04</option>
            <option value="05">05</option>
            <option value="06">06</option>
            <option value="07">07</option>
            <option value="08">08</option>
            <option value="09">09</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
          <span>/</span>
          <select
            type="text"
            class="cardduedate mx-lg-1 mx-2"
            name={CreditNumber[5]}
            id="cardduedate"
            placeholder="YY"
            onBlur={(e) => {
              if (e.target.value === '') {
                WarningText[5] = '信用卡年份尚未選擇'
                setWarningText(WarningText)
              } else {
                WarningText[5] = ''
                setWarningText(WarningText)
              }
              setPos(5)
              UpdateInfo(e.target.value, 5)
            }}
            onChange={(e) => {
              CreditNumber[5] = e.target.value
              setCreditNumber(CreditNumber)
              setCredit(CreditNumber)
            }}
          >
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
          </select>
          {/* <input
            type="text"
            class="cardduedate mx-lg-1 mx-2"
            name="cardduedate"
            id="cardduedate"
            placeholder="YY"
          /> */}
        </div>
        <InputWarning name={WarningText[Pos]} />
        <div class="creditcard_checkcode">
          <label for="">
            <span class="star">*</span>背面末三碼
          </label>
          <input
            type="text"
            class="cardcheckcode mx-1"
            name={CreditNumber[6]}
            id="cardcheckcode"
            placeholder="***"
            onBlur={(e) => {
              // console.log(e.target.value)
              if (
                !CreditSafe.test(e.target.value) ||
                e.target.value.length != 3
              ) {
                WarningText[6] =
                  '信用卡安全碼格式不正確或尚未輸入'
                setWarningText(WarningText)
              } else {
                WarningText[6] = ''
                setWarningText(WarningText)
              }
              setPos(6)
              UpdateInfo(e.target.value, 6)
            }}
            onChange={(e) => {
              CreditNumber[6] = e.target.value
              setCreditNumber(CreditNumber)
              setCredit(CreditNumber)
            }}
          />
        </div>
        <InputWarning name={WarningText[Pos]} />
        <div class="container warning_text my-5">
          <h6>
            ※
            提供VISA丶MasterCard丶JCB信用卡交易，全程使用安全加密，信用卡資料將不會儲存於網站，您可以安心使用信用卡付款。
          </h6>
        </div>
      </div>
      <Cart_OrderInfoInput
        OrderInfo={OrderInfo}
        setOrderInfo={setOrderInfo}
        CityArr={CityArr}
        setCityArr={setCityArr}
        EmailCheck={EmailCheck}
        PhoneCheck={PhoneCheck}
      />
    </>
  )
}

export default Cart_CreditPay
