import React from 'react'

function Cart_OrderInfoInput(props) {
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
          onclick="importMember(event)"
        >
          匯入會員資料
        </button>
      </div>

      <form className="container col-lg-6 col-10 orderform" action="">
        <div className="order">
          <label for="">
            <span>*</span>姓名
          </label>
          <input
            type="text"
            className="ordername px-3"
            name="ordername"
            id="ordername"
          />
        </div>
        <div className="order">
          <label for="">
            <span>*</span>手機號碼
          </label>
          <input
            type="text"
            className="phonenumber px-3"
            name="phonenumber"
            id="phonenumber"
          />
        </div>
        <div className="order">
          <label for="">
            <span>*</span>電子郵件
          </label>
          <input type="email" className="email px-3" name="email" id="email" />
        </div>
        <div className="order">
          <label for="">
            <span>*</span>請填寫縣市
          </label>
          <input type="text" className="city px-3" name="city" id="city" />
        </div>
        <div className="order">
          <label for="">
            <span>*</span>請填寫行政區
          </label>
          <input
            type="text"
            className="district px-3"
            name="district"
            id="district"
          />
        </div>
        <div className="order">
          <label for="">
            <span>*</span>請填寫地址
          </label>
          <input
            type="text"
            className="address px-3"
            name="address"
            id="address"
          />
        </div>
        <div className="order">
          <label for="">是否需填寫備註</label>
          <input
            type="text"
            classNameName="notice px-3"
            name="notice"
            id="notice"
            placeholder="請在此填寫，最多 200 字"
          />
        </div>
      </form>
    </>
  )
}

export default Cart_OrderInfoInput
