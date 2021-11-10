import React, { useState } from 'react'
import InputWarning from './InputWarning'

function Cart_Invoice(props) {
  let { Invoice, setInvoice } = props
  let [status, setStatus] = useState('hidden')
  let [status1, setstatus1] = useState('hidden')
  let [CssStyle, setCssStyle] = useState([
    false,
    false,
    false,
  ])
  let [Warning, setWarning] = useState()
  let [Text, setText] = useState()
  let MobileBarcode = new RegExp(/^\/{1}[0-9A-Z]{7}$/)
  let CompanyNumber = new RegExp(/^[0-9]{8}$/)

  function UpdateInfo(value, index) {
    let NewInvoice = [...Invoice]
    if (index === 0) {
      NewInvoice.splice(1, 1)
    }
    NewInvoice[index] = value
    // console.log('NewVoice', NewInvoice)
    setInvoice(NewInvoice)
  }

  return (
    <>
      <div className="container col-lg-6 col-10 invoice">
        <div className="invoice d-lg-flex justify-content-between">
          <input
            type="button"
            className={
              !CssStyle[0]
                ? 'info1 col-lg-3 col-12'
                : 'info1 col-lg-3 col-12 foucsOn'
            }
            value="電子發票 - 個人"
            onClick={(e) => {
              UpdateInfo(e.target.value, 0)
              CssStyle[0] = true
              CssStyle[1] = false
              CssStyle[2] = false
              setCssStyle(CssStyle)
              setStatus('hidden')
              setstatus1('hidden')
            }}
          />
          <input
            type="button"
            className={
              !CssStyle[1]
                ? 'info1 col-lg-3 col-12'
                : 'info1 col-lg-3 col-12 foucsOn'
            }
            value="電子發票 - 公司"
            onClick={(e) => {
              UpdateInfo(e.target.value, 0)
              CssStyle[1] = true
              CssStyle[0] = false
              CssStyle[2] = false
              setCssStyle(CssStyle)
              setstatus1('text')
              setStatus('hidden')
            }}
          />
          <input
            type="button"
            className={
              !CssStyle[2]
                ? 'info_mobile col-lg-3 col-12'
                : 'info_mobile col-lg-3 col-12 foucsOn'
            }
            value="手機條碼載具"
            onClick={(e) => {
              UpdateInfo(e.target.value, 0)
              CssStyle[2] = true
              CssStyle[0] = false
              CssStyle[1] = false
              setCssStyle(CssStyle)
              setstatus1('hidden')
              setStatus('text')
            }}
          />
        </div>
        <input
          type={status}
          className="infoinput col-12 px-3 mt-lg-5"
          placeholder="/請輸入預設載具"
          onBlur={() => {
            // console.log('手機條碼載具', Warning)
            // console.log(
            //   '手機條碼驗證',
            //   MobileBarcode.test(Warning)
            // )
            if (!MobileBarcode.test(Warning)) {
              setText('手機載具條碼格式錯誤')
            } else {
              UpdateInfo(Warning, 1)
              setText('')
            }
          }}
          onChange={(e) => {
            setWarning(e.target.value)
            // UpdateInfo(e.target.value, 1)
          }}
        />
        <input
          type={status1}
          className="infoinput col-12 px-3 mt-lg-5"
          placeholder="請輸入統一編號"
          onBlur={() => {
            // console.log('公司編號', Warning)
            // console.log(
            //   '公司編號驗證',
            //   CompanyNumber.test(Warning)
            // )
            if (!CompanyNumber.test(Warning)) {
              setText('公司統編格式錯誤')
            } else {
              UpdateInfo(Warning, 1)
              setText('')
            }
          }}
          onChange={(e) => {
            setWarning(e.target.value)
            // UpdateInfo(e.target.value, 1)
          }}
        />
        <InputWarning name={Text} />
      </div>
    </>
  )
}

export default Cart_Invoice
