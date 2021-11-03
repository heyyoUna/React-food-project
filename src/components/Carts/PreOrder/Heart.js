import { useState, useEffect } from 'react'
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io'
import { FaCartPlus } from 'react-icons/fa'
import { Modal } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import Button from '@restart/ui/esm/Button'
import axios from 'axios'
function Heart(props) {
  let { v, i, setData, setCount, Pos, setPos } = props
  const [display, setDisplay] = useState(true)
  const member = localStorage.getItem('id')
  const token = localStorage.getItem('token')
  const [data, setdata] = useState()
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  let [textWarn, settextWarn] = useState(
    '您尚未登入會員哦!請先進行登入!'
  )
  let [textConfirm, settextConfirm] = useState('這邊做登入')
  let [textClose, settextClose] = useState('關閉')
  console.log('會員', member)

  async function AddtoCart() {
    if (!token) {
      // 跳 Modal 顯示需先登入
      setShow(true)
      return
    }
    let NewPos = v.sid
    let p = await axios.post('http://localhost:3002/cart', {
      Sid: '',
      Order_Sid: 'order2021103141501',
      Member_id: member,
      Product_id: v.product_id,
      Order_Amount: 1,
    })
    if (p.status === 200) {
      console.log('加入成功')
      DataAxios(NewPos)
    }
  }

  // 讀取商品資料的 function
  async function DataAxios(NewPos) {
    let Count = []
    let r = await axios.get('http://localhost:3002/cart/')
    if (r.status === 200) {
      // 設定 data
      setData(r.data)

      // 讀取裡面的商品數量
      for (let i = 0; i < r.data.length; i++) {
        Count[i] = r.data[i].Order_Amount
      }

      // // 設定商品初始數量
      setCount(Count)
      setPos(NewPos)
      // // // 計算訂單小計
      // productPrice()

      // // // 計算訂單總計(扣除會員點數)
      // totalPrice()
    }
  }

  // 加入收藏清單的 function
  async function addtoFav() {
    console.log('加入')
    let r = await axios.post(
      'http://localhost:3002/cart/FavProduct',
      {
        sid: '',
        member_id: member,
        product_id: v.sid,
      }
    )
    if (r.status === 200) {
      console.log('加入成功')
    }
  }

  async function deletetoFav(sid) {
    let r = await axios.delete(
      `http://localhost:3002/cart/FavProduct/${sid}`
    )
    if (r.status === 200) {
      console.log('刪除成功')
    }
  }

  return (
    <div className="storecard col-lg-4 col-10 position-relative">
      <img
        src={`http://localhost:3002/img/Product/${v.product_id}.jpg`}
        className="position-absolute"
      />
      <div className="storeproduct">
        <div className="body py-2">
          <p className="text ps-5 text-center">{v.name}</p>
          <p className="text ps-5 text-center">
            NT${v.price}
          </p>
          <div className="storeicon ps-3 text-center">
            <IoIosHeartEmpty
              style={{
                color: '#FB6107',
                fontSize: '40px',
                marginTop: '3px',
                display: display ? 'inline' : 'none',
              }}
              onClick={(e) => {
                if (display) {
                  if (!token) {
                    // 跳 Modal 顯示需先登入
                    setShow(true)
                    return
                  }
                  setDisplay(false)
                  addtoFav()
                } else {
                  setDisplay(true)
                }
              }}
            />
            <IoIosHeart
              // cardstate={cardstate[1]}
              style={{
                color: '#d96e30',
                fontSize: '40px',
                marginTop: '3px',
                display: display ? 'none' : 'inline',
              }}
              onClick={(e) => {
                if (display) {
                  setDisplay(false)
                } else {
                  deletetoFav(v.sid)
                  setDisplay(true)
                }
              }}
            />
            <FaCartPlus
              className="cartlike"
              onClick={() => {
                console.log('點擊', i)
                console.log('產品', v.product_id)
                AddtoCart()
              }}
            />
          </div>
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
    </div>
  )
}

export default withRouter(Heart)
