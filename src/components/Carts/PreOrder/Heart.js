import { useState} from 'react'
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io'
import { FaShoppingCart } from 'react-icons/fa'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

function Heart(props) {
  let { v, i, setData, setCount, setPos, setCountNav } =
    props
  const [display, setDisplay] = useState(true)
  let CountNav

  async function MemberLogin() {}
  async function AddtoCart() {
    let m = await axios.get(
      `http://localhost:3002/member/memberprofile`,
      {
        headers: {
          //token 從 header 中 Authorization 屬性傳入
          //格式為 Bearer + 空格 + token
          Authorization:
            'Bearer ' + localStorage.getItem('token'),
        },
      }
    )
    if (m.data.success) {
      console.log('會員成功登入 id', m.data.data[0].sid)
      let NewPos = v.sid
      let p = await axios.post(
        'http://localhost:3002/cart',
        {
          Sid: '',
          Member_id: m.data.data[0].sid,
          Product_id: v.product_id,
          Order_Amount: 1,
        }
      )
      Swal.fire({
        icon: 'success',
        title: '已成功加入購物車',
        showConfirmButton: false,
        timer: 1000,
      })
      DataAxios(NewPos, m.data.data[0].sid)
    }
  }

  // 讀取商品資料的 function
  async function DataAxios(NewPos, member_id) {
    let Count = []
    let r = await axios.get(
      `http://localhost:3002/cart/ordertempmember/${member_id}`
    )
    if (r.status === 200) {
      // 設定 data
      setData(r.data)

      // 讀取裡面的商品數量
      for (let i = 0; i < r.data.length; i++) {
        Count[i] = r.data[i].Order_Amount
      }

      CountNav = r.data.length

      // // 設定商品初始數量
      setCount(Count)
      setCountNav(CountNav)
      localStorage.setItem('數量', CountNav)
      setPos(NewPos)
      // // // 計算訂單小計
      // productPrice()

      // // // 計算訂單總計(扣除會員點數)
      // totalPrice()
    }
  }

  // 加入收藏清單的 function
  async function addtoFav(i) {
    let m = await axios.get(
      `http://localhost:3002/member/memberprofile`,
      {
        headers: {
          //token 從 header 中 Authorization 屬性傳入
          //格式為 Bearer + 空格 + token
          Authorization:
            'Bearer ' + localStorage.getItem('token'),
        },
      }
    )
    console.log('succcess', m.data.success)
    if (m.data.success) {
      let r = axios.post(
        'http://localhost:3002/cart/FavProduct',
        {
          member_id: m.data.data[0].sid,
          product_id: v.sid,
        }
      )
      Swal.fire({
        icon: 'success',
        title: '已成功加入收藏清單',
        showConfirmButton: false,
        timer: 1000,
      })
      return setDisplay(i)
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
    <div className="storecard col-lg-4 col-10 mx-lg-0 mx-auto my-lg-0 my-5 position-relative">
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
            <FaShoppingCart
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
