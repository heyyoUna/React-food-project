import { useState } from 'react'

function Cart_CheckOut(props) {
  let { setCheckout } = props
  // let [Delivery, setDelivery] = useState(0)
  return (
    <>
      <div
        className="container col-lg-6 checkout"
        action=""
      >
        <div className="check d-flex justify-content-between">
          <div className="choose">
            <input
              type="radio"
              name="checkout"
              id="checkout"
              value="7-11取貨付款"
              onChange={(e) => {
                setCheckout(e.target.value)
                localStorage.setItem('運費', 60)
              }}
            />
            <label>7-11取貨付款</label>
          </div>
          <div className="choose">
            <input
              type="radio"
              name="checkout"
              id="checkout"
              value="全家取貨付款"
              onChange={(e) => {
                setCheckout(e.target.value)
                // setStoreA(e.target.value)
                // UpdateInfo(e.target.value, 1)
              }}
            />
            <label>全家取貨付款</label>
          </div>
          <div className="choose">
            <input
              type="radio"
              name="checkout"
              id="checkout"
              value="宅配貨到付款"
              onChange={(e) => {
                setCheckout(e.target.value)
                localStorage.setItem('運費', 80)
                // setStoreA(e.target.value)
                // UpdateInfo(e.target.value, 1)
              }}
            />
            <label>
              宅配 貨到付款<span>(僅限台灣本島)</span>
            </label>
          </div>
        </div>
        <div className="check d-flex justify-content-around">
          <div className="choose d-flex">
            <input
              type="radio"
              name="checkout"
              id="checkout"
              value="信用卡支付 - 宅配到府"
              onChange={(e) => {
                setCheckout(e.target.value)
                localStorage.setItem('運費', 100)
                // setStoreA(e.target.value)
                // UpdateInfo(e.target.value, 1)
              }}
            />
            <label>信用卡支付</label>
            <div className="payicon mx-2">
              <img
                src="http://localhost:3000/image/cc-apple-pay-brands.svg"
                alt=""
              />
              <img
                src="http://localhost:3000/image/cc-mastercard-brands.svg"
                alt=""
              />
              <img
                src="http://localhost:3000/image/cc-visa-brands.svg"
                alt=""
              />
              <img
                src="http://localhost:3000/image/google-pay-brands.svg"
                alt=""
              />
            </div>
          </div>
          <div className="choose">
            <input
              type="radio"
              name="checkout"
              id="checkout"
              value="LINE PAY 支付 - 宅配到府"
              onChange={(e) => {
                setCheckout(e.target.value)
                // setStoreA(e.target.value)
                // UpdateInfo(e.target.value, 1)
              }}
            />
            <label>LINE PAY 支付</label>
          </div>
        </div>
      </div>

      <div
        className="container checkoutmobileform col-10"
        action=""
      >
        <div className="checkmobile d-flex justify-content-between align-content-center">
          <input
            type="radio"
            name="checkout"
            id="checkout"
            value="7-11取貨付款"
            onChange={(e) => {
              setCheckout(e.target.value)
            }}
          />
          <label for="">7-11取貨付款</label>
        </div>
        <div className="checkmobile d-flex justify-content-between align-content-center">
          <input
            type="radio"
            name="checkout"
            id="checkout"
            value="全家取貨付款"
            onChange={(e) => {
              setCheckout(e.target.value)
              // setStoreA(e.target.value)
              // UpdateInfo(e.target.value, 1)
            }}
          />
          <label for="">全家取貨付款</label>
        </div>
        <div className="checkmobile d-flex justify-content-between align-content-center">
          <input
            type="radio"
            name="checkout"
            id="checkout"
            value="宅配貨到付款"
            onChange={(e) => {
              setCheckout(e.target.value)
              // setStoreA(e.target.value)
              // UpdateInfo(e.target.value, 1)
            }}
          />
          <label for="">
            宅配 貨到付款<span>(僅限台灣本島)</span>
          </label>
        </div>
        <div className="checkmobile d-flex justify-content-between align-content-center">
          <input
            type="radio"
            name="checkout"
            id="checkout"
            value="信用卡支付 - 宅配到府"
            onChange={(e) => {
              setCheckout(e.target.value)
              // setStoreA(e.target.value)
              // UpdateInfo(e.target.value, 1)
            }}
          />
          <div className="payicon d-flex align-content-center">
            <img
              src="http://localhost:3000/image/cc-apple-pay-brands.svg"
              alt=""
            />
            <img
              src="http://localhost:3000/image/cc-mastercard-brands.svg"
              alt=""
            />
            <img
              src="http://localhost:3000/image/cc-visa-brands.svg"
              alt=""
            />
            <img
              src="http://localhost:3000/image/google-pay-brands.svg"
              alt=""
            />
          </div>
          <label for="">信用卡支付</label>
        </div>
        <div className="checkmobile d-flex justify-content-between align-content-center">
          <input
            type="radio"
            name="checkout"
            id="checkout"
            value="LINE PAY 支付 - 宅配到府"
            onChange={(e) => {
              setCheckout(e.target.value)
              // setStoreA(e.target.value)
              // UpdateInfo(e.target.value, 1)
            }}
          />
          <label for="">LINE PAY 支付</label>
        </div>
      </div>
    </>
  )
}

export default Cart_CheckOut
