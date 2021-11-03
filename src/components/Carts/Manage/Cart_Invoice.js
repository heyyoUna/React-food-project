import React, { useState } from 'react'

function Cart_Invoice(props) {
  let { Invoice, setInvoice } = props
  let [status, setStatus] = useState('hidden')
  let [status1, setstatus1] = useState('hidden')

  function UpdateInfo(value, index) {
    let NewInvoice = [...Invoice]
    NewInvoice[index] = value
    setInvoice(NewInvoice)
  }

  return (
    <>
      <form class="container col-lg-6 col-10 invoice" action="">
        <div class="invoice d-lg-flex justify-content-between">
          <input
            type="button"
            class="info1 col-lg-3 col-12"
            value="電子發票 - 個人"
            onClick={(e) => {
              UpdateInfo(e.target.value, 0)
              setStatus('hidden')
              setstatus1('hidden')
            }}
          />
          <input
            type="button"
            class="info1 col-lg-3 col-12"
            value="電子發票 - 公司"
            onClick={(e) => {
              UpdateInfo(e.target.value, 0)
              setstatus1('text')
              setStatus('hidden')
            }}
          />
          <input
            type="button"
            class="info_mobile col-lg-3 col-12"
            value="手機條碼載具"
            onClick={(e) => {
              UpdateInfo(e.target.value, 0)
              setstatus1('hidden')
              setStatus('text')
            }}
          />
        </div>
        <input
          type={status}
          class="infoinput col-12 px-3 mt-lg-5"
          placeholder="/請輸入預設載具"
          onChange={(e) => {
            UpdateInfo(e.target.value, 1)
          }}
        />
        <input
          type={status1}
          class="infoinput col-12 px-3 mt-lg-5"
          placeholder="請輸入統一編號"
          onChange={(e) => {
            UpdateInfo(e.target.value, 1)
          }}
        />
      </form>
    </>
  )
}

export default Cart_Invoice
