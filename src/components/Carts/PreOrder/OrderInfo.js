import React from 'react'
import { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Modal } from 'react-bootstrap'
import Button from '@restart/ui/esm/Button'
import axios from 'axios'
import { point } from 'leaflet'

function OrderInfo(props) {
  const [data, setdata] = useState()
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const token = localStorage.getItem('token')

  let [textWarn, settextWarn] = useState(
    '您尚未登入會員哦!請先進行登入!'
  )
  let [textConfirm, settextConfirm] = useState('這邊做登入')
  let [textClose, settextClose] = useState('關閉')
  // let pointChange = false
  let [pointChange, setpointChange] = useState()

  let promo = false
  let nextStep = false
  const {
    productPrice,
    totalPrice,
    Promotion,
    setPromotion,
  } = props

  // 清空 localstorage 裡的資訊
  localStorage.removeItem('訂單價格資訊')
  localStorage.removeItem('店號')
  localStorage.removeItem('訂單編號')
  localStorage.removeItem('運費')

  console.log('優惠點數', Promotion)
  // 記錄會員優惠點數
  let textvalue = ''

  // 記錄訂單小計、優惠總額與訂單總計
  let orderdetailPriceInfo = [
    // 訂單小計
    totalPrice(),
    // 優惠
    Promotion,
    // 訂單總計
    productPrice(),
  ]

  useEffect(() => {
    // 取得會員點數資料
    getMemberPoint()
  }, [])

  // 取得會員點數資料的函式
  async function getMemberPoint() {
    let M = await axios.get(
      `http://localhost:3002/cart/memberpoint`
    )
    if (M.status === 200) {
      setdata(M.data)
      console.log('會員點數', pointChange)
      if (!token) {
        pointChange = '未登入'
      } else {
        setpointChange(M.data[0].left_point)
      }
      console.log('會員資料', M.data)
    }
  }

  // 確認是否登入的函式
  async function getLoginData() {
    // 取得 token
    console.log(token)
    console.log('promo1', promo)

    // 沒有取得會員的所屬 token
    if (!token) {
      // 跳 Modal 顯示需先登入
      setShow(true)
      return
    }

    // 如果要使用優惠
    if (promo) {
      promo = false
      // console.log('會員點數')
      // console.log('點數', data[0].left_point)

      // 如果購物車內沒商品
      if (productPrice() === 0) {
        // 跳出 Modal 顯示購物車內沒商品
        settextWarn('購物車內沒有商品喔')
        settextConfirm('知道了')
        setShow(true)
      } else {
        // 如果輸入的點數 > 會員目前所有點數
        if (textvalue > data[0].left_point) {
          // 跳出 Modeal 顯示目前點數不足
          settextWarn('點數不足!!')
          settextConfirm('知道了')
          setShow(true)
        } else {
          // 記錄扣點與扣款，到會員資料表
          let R = await axios.post(
            `http://localhost:3002/cart/modifyPoint`,
            {
              sid: '',
              member_sid: data[0].member_sid,
              change_point: textvalue,
              change_type: 'USE',
              left_point: data[0].left_point - textvalue,
              change_reason: '會員使用點數',
              create_at: '',
            }
          )
          if (R.status === 200) {
            alert('扣點完成!')
            setpointChange(data[0].left_point - textvalue)
            setPromotion(textvalue)
          }
        }
      }
    }

    // 如果點擊是到下一步填寫資料
    if (nextStep) {
      nextStep = false

      // 記錄到 LocalStorage 裡，使用 JSON 包進去
      localStorage.setItem(
        '訂單價格資訊',
        JSON.stringify(orderdetailPriceInfo)
      )

      // 到填寫資料頁面
      props.history.push('/carts/Manage')
    }
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
              <th>剩餘點數</th>
              <td>{pointChange}</td>
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
              // console.log('promo', promo)

              // 點擊使用優惠鈕，交給函式處理
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

              // 交給函式處理
              getLoginData()
            }}
          >
            結帳去
          </button>
          <button
            className="returnstore col-12 my-3"
            onClick={() => {
              // 返回商城頁面
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
            onClick={() => {
              if (!token) {
                props.history.push('/login')
              }
              handleClose()
            }}
          >
            {textConfirm}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default withRouter(OrderInfo)
