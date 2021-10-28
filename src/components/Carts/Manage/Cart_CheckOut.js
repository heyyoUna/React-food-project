import React from 'react'

function Cart_CheckOut(props) {
  return (
    <>
      <form className="container col-lg-6 checkout" action="">
        <div className="check d-flex justify-content-between">
          <div className="choose">
            <input type="radio" name="delivery" id="delivery" value="A" />
            <label for="">7-11取貨付款</label>
          </div>
          <div className="choose">
            <input type="radio" name="delivery" id="delivery" value="B" />
            <label for="">全家取貨付款</label>
          </div>
          <div className="choose">
            <input
              type="radio"
              name="delivery"
              id="delivery"
              value="C"
              checked
            />
            <label for="">
              宅配 貨到付款<span>(僅限台灣本島)</span>
            </label>
          </div>
        </div>
        <div className="check d-flex justify-content-around">
          <div className="choose d-flex">
            <input type="radio" name="delivery" id="delivery" value="D" />
            <label for="">信用卡支付</label>
            <div className="payicon mx-2">
              <img src="../../../image/cc-apple-pay-brands.svg" alt="" />
              <img src="../../../image/cc-mastercard-brands.svg" alt="" />
              <img src="../../../image/cc-visa-brands.svg" alt="" />
              <img src="../../../image/google-pay-brands.svg" alt="" />
            </div>
          </div>
          <div className="choose">
            <input type="radio" name="delivery" id="delivery" value="E" />
            <label for="">LINE PAY 支付</label>
          </div>
        </div>
      </form>
      <form className="container checkoutmobileform col-10" action="">
        <div className="checkmobile d-flex justify-content-between align-content-center">
          <input
            type="radio"
            name="delivery"
            id="delivery"
            value="A"
            onclick="radiochange(event)"
          />
          <label for="">7-11取貨付款</label>
        </div>
        <div className="checkmobile d-flex justify-content-between align-content-center">
          <input type="radio" name="delivery" id="delivery" value="B" />
          <label for="">全家取貨付款</label>
        </div>
        <div className="checkmobile d-flex justify-content-between align-content-center">
          <input type="radio" name="delivery" id="delivery" value="C" checked />
          <label for="">
            宅配 貨到付款<span>(僅限台灣本島)</span>
          </label>
        </div>
        <div className="checkmobile d-flex justify-content-between align-content-center">
          <input
            type="radio"
            name="delivery"
            id="delivery"
            value="D"
            onclick="radiochange(event)"
          />
          <div className="payicon d-flex align-content-center">
            <img src="../../../image/cc-apple-pay-brands.svg" alt="" />
            <img src="../../../image/cc-mastercard-brands.svg" alt="" />
            <img src="../../../image/cc-visa-brands.svg" alt="" />
            <img src="../../../image/google-pay-brands.svg" alt="" />
          </div>
          <label for="">信用卡支付</label>
        </div>
        <div className="checkmobile d-flex justify-content-between align-content-center">
          <input type="radio" name="delivery" id="delivery" value="E" />
          <label for="">LINE PAY 支付</label>
        </div>
      </form>
    </>
  )
}

export default Cart_CheckOut
