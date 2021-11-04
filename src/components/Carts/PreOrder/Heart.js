import { useState, useEffect } from 'react'
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io'
import { FaCartPlus } from 'react-icons/fa'
import { Modal } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import Button from '@restart/ui/esm/Button'
import axios from 'axios'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

function Heart(props) {
  let { v, i, setData, setCount, Pos, setPos } = props
  const [display, setDisplay] = useState(true)
  let member
  const token = localStorage.getItem('token')
  const [data, setdata] = useState()
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)


  async function AddtoCart() {
    let NewPos = v.sid
    let p = await axios.post('http://localhost:3002/cart', {
      Sid: '',
      // Order_Sid: 'order' + localStorage.getItem('訂單編號'),
      Member_id: '5',
      Product_id: v.product_id,
      Order_Amount: 1,
    })
    if (p.status === 200) {
      Swal.fire({
        icon: 'success',
        title: '已成功加入購物車',
        showConfirmButton: false,
        timer: 1000,
      })
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
  async function addtoFav(i) {
    await axios
      .get(`http://localhost:3002/member/memberprofile`, {
        headers: {
          //token 從 header 中 Authorization 屬性傳入
          //格式為 Bearer + 空格 + token
          Authorization:
            'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        if (res.data.success) {
          member = res.data.data[0].sid
          console.log('會員 id ', member)
          let r = axios
            .post('http://localhost:3002/cart/FavProduct', {
              member_id: member,
              product_id: v.sid,
            })
            .then((res) => {
              if (res.data.success) {
                Swal.fire({
                  icon: 'success',
                  title: '已成功加入收藏清單',
                  showConfirmButton: false,
                  timer: 1000,
                })
                return setDisplay(i)
              }
            })
        } else {
          Swal.fire({
            icon: 'error',
            title: '請先登入會員哦',
            showConfirmButton: true,
            confirmButtonText: '我知道了',
          }).then((result) => {
            if (result.isConfirmed) {
              props.history.push('/login')
            }
          })
        }
      })
    console.log('加入')
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
                  addtoFav(false)
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
                  Swal.fire({
                    icon: 'success',
                    title: '已成功移除收藏商品',
                    showConfirmButton: false,
                    timer: 1000,
                  })
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
    </div>
  )
}

export default withRouter(Heart)
