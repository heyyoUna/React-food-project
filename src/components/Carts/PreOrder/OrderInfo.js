import React from 'react'
import { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Modal } from 'react-bootstrap'
import Button from '@restart/ui/esm/Button'
import axios from 'axios'

function OrderInfo(props) {
  const [data, setdata] = useState()
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  let [textWarn, settextWarn] = useState(
    '您尚未登入會員哦!請先進行登入!'
  )
  let [textConfirm, settextConfirm] = useState('這邊做登入')
  let [textClose, settextClose] = useState('關閉')
  let promo = false
  let nextStep = false
  const {
    productPrice,
    totalPrice,
    Promotion,
    setPromotion,
  } = props

  // 清空 localstorage 裡的優惠資訊
  localStorage.removeItem('訂單價格資訊')

  // 記錄會員優惠點數
  let textvalue = ''

  // 記錄訂單小計、優惠總額與訂單總計
  let orderdetailPriceInfo = [
    totalPrice(),
    Promotion,
    productPrice(),
  ]

  useEffect(() => {
    getMemberPoint()
  }, [])

  // 記錄到 LocalStorage 裡，使用 JSON 包進去
  localStorage.setItem(
    '訂單價格資訊',
    JSON.stringify(orderdetailPriceInfo)
  )

  async function getMemberPoint() {
    let M = await axios.get(
      `http://localhost:3002/cart/memberpoint`
    )
    if (M.status === 200) {
      setdata(M.data)
      console.log('會員資料', M.data)
    }
  }

  async function getLoginData() {
    // 取得 token
    const token = localStorage.getItem('token')
    console.log(token)
    console.log('promo1', promo)

    if (!token) {
      setShow(true)
      return
    }
    if (promo) {
      promo = false
      console.log('會員點數')
      console.log('點數', data[0].left_point)
      if (textvalue > data[0].left_point) {
        settextWarn('點數不足!!')
        settextConfirm('知道了')
        setShow(true)
      }
      else
      {
        let R = await axios.post(
          `http://localhost:3002/cart/memberpoint`
        )
        if (R.status === 200) {
       
        }
      }
    }

    if (nextStep) {
      nextStep = false
      props.history.push('/carts/Manage')
    }
    // let r = await axios.post(
    //   'http://localhost:3002/cart/jwt',
    //   {
    //     headers: {
    //       Authorization: 'Bearer ' + token,
    //     },
    //   }
    // )
    // if (r.status === 200) {
    //   console.log('驗證', r)
    // }
  }

  return (
    <>
      <div className="orderinfolist col-lg-3 mx-lg-3 mt-3">
        <h4>訂單資訊</h4>
        <table className="table table-borderless">
          <tbody>
            <tr scope="row" className="border-top">
              <th>商品小計</th>
              <td>NT${productPrice()}</td>
            </tr>
            <tr scope="row">
              <th>運費</th>
              <td>未選擇</td>
            </tr>
            <tr scope="row" className="border-bottom">
              <th>優惠</th>
              <td>-NT${Promotion}</td>
            </tr>
            <tr scope="row">
              <th>商品總計</th>
              <td>NT${totalPrice()}</td>
            </tr>
            <tr scope="row">
              <th>使用點數</th>
              <td></td>
            </tr>
          </tbody>
        </table>

        {/* 會員優惠點數使用區 */}
        <div className="promotion d-flex justify-content-between">
          <input
            type="text"
            placeholder="請輸入使用點數"
            onChange={(e) => {
              // 記錄會員優惠點數
              textvalue = e.target.value
            }}
          />
          <button
            onClick={(e) => {
              promo = true
              console.log('promo', promo)
              getLoginData()
            }}
          >
            使用
          </button>
        </div>

        {/* 確認到下一步或返回商城 */}
        <div className="my-3">
          <button
            className="orderconfirm col-12 my-3"
            onClick={() => {
              // 到填寫資料頁面
              nextStep = true
              console.log('nextstep', nextStep)
              getLoginData()
            }}
          >
            結帳去
          </button>
          <button
            className="returnstore col-12 my-3"
            onClick={() => {
              // 到商城頁面
              props.history.push('')
            }}
          >
            返回商城
          </button>
        </div>
      </div>

      {/* 彈出視窗 */}
      <Modal
        className="Modal"
        show={show}
        onHide={handleClose}
      >
        <Modal.Header>
          <Modal.Title className="ModalTitle">
            溫馨提醒
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="ModalBody">
          {textWarn}
        </Modal.Body>
        <Modal.Footer className="ModalFooter">
          <Button
            className="ButtonClose"
            variant="secondary"
            onClick={handleClose}
          >
            {textClose}
          </Button>
          <Button
            className="ButtonLogin"
            variant="primary"
            onClick={handleClose}
          >
            {textConfirm}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default withRouter(OrderInfo)
