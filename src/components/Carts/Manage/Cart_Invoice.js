import React from 'react'

function Cart_Invoice(props) {
  return (
    <>
      <form class="container col-lg-6 col-10 invoice" action="">
        <div class="invoice d-lg-flex justify-content-between">
          <input
            type="button"
            class="info1 col-lg-3 col-12"
            value="電子發票 - 個人"
          />
          <input
            type="button"
            class="info1 col-lg-3 col-12"
            value="電子發票 - 公司"
          />
          <input
            type="button"
            class="info_mobile col-lg-3 col-12"
            value="手機條碼載具"
          />
        </div>
        <input
          type="hidden"
          class="infoinput col-12 px-3 mt-lg-5"
          placeholder="/請輸入預設載具"
        />
        <input
          type="hidden"
          class="infoinput col-12 px-3 mt-lg-5"
          placeholder="/請輸入統一編號"
        />
      </form>
    </>
  )
}

export default Cart_Invoice
