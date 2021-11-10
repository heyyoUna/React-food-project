import React, { useState, useEffect } from 'react'
import {
  FaShoppingCart,
  FaLongArrowAltRight,
  FaRegEdit,
  FaCheck,
} from 'react-icons/fa'
import OrderInfo from '../../components/Carts/PreOrder/OrderInfo'
import OrderDetail from '../../components/Carts/PreOrder/OrderDetail'
import StoreCard from '../../components/Carts/PreOrder/StoreCard'
import '../../styles/Carts/CartPreOrder.scss'
import '../../styles/Carts/Banner.scss'
import '../../styles/Carts/ProcessChart.scss'
import axios from 'axios'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { withRouter } from 'react-router-dom'

function CartPreOrder(props) {
  let { CountNav, setCountNav } = props
  // 加入商品的 Data
  let [data, setData] = useState([{}])

  // 商品數量
  let [Count, setCount] = useState([])

  // 購物車內的商品位置
  let [Pos, setPos] = useState()

  // 給 sql 路由的訂單 ID
  let [ODPos, setODPos] = useState()

  // 購物車刪除的商品位置
  let [DeletePos, setDeleteODPos] = useState()

  // 使用會員優惠
  let [Promotion, setPromotion] = useState(0)

  let [Filter, setFilter] = useState([])

  let [loading, setLoading] = useState(false)

  useEffect(() => {
    // 讀取加入購物車的商品資料
    MemberLogin()
  }, [])

  useEffect(() => {
    // 修改購物車內的商品資料
    console.log('讀取Modify')
    ModifyProduct(Count, Pos, ODPos)
  }, [Count[Pos]])

  useEffect(() => {
    // 刪除購物車內的商品資料
    console.log('讀取Delete')

    // console.log('刪除', DeletePos)
    DeleteProduct(DeletePos)
  }, [DeletePos])

  async function MemberLogin() {
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
      DataAxios(m.data.data[0].sid)
    } else {
      Swal.fire({
        icon: 'error',
        title: '請先登入會員哦',
        showConfirmButton: true,
        confirmButtonColor: '#8FC065',
        confirmButtonText: '我知道了',
      }).then((result) => {
        if (result.isConfirmed) {
          props.history.push('/login')
        }
      })
    }
  }
  // 讀取商品資料的 function
  async function DataAxios(Member_id) {
    console.log('會員 id', Member_id)
    let r = await axios.get(
      `http://localhost:3002/cart/ordertempmember/${Member_id}`
    )
    if (r.status === 200) {
      // 設定 data
      setData(r.data)
      // console.log('讀取到的 preorder data', r)
      Count = []
      // 讀取裡面的商品數量
      for (let i = 0; i < r.data.length; i++) {
        Count[i] = r.data[i].Order_Amount
      }
      CountNav = r.data.length
      // console.log('por', CountNav)

      // 設定商品初始數量
      setCount(Count)
      setCountNav(CountNav)
      localStorage.setItem('數量', CountNav)

      // 計算訂單小計
      productPrice()

      // 計算訂單總計(扣除會員點數)
      totalPrice()
    }
  }

  // 修改商品數量函式
  async function ModifyProduct(Count, Pos, ODPos) {
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
      let Mod = await axios.put(
        `http://localhost:3002/cart/${ODPos}`,
        {
          Order_Amount: Count[Pos],
        }
      )
      if (Mod.status === 200) {
        // console.log('經過 Modify')
        DataAxios(m.data.data[0].sid)
        return Count
      }
    }
  }

  // 刪除商品函式
  async function DeleteProduct(DeletePos) {
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
      let del = await axios.delete(
        `http://localhost:3002/cart/${DeletePos}`
      )
      if (del.status === 200) {
        // console.log('經過刪除')
        DataAxios(m.data.data[0].sid)
      }
    }
  }

  // 計算訂單的商品小計
  const productPrice = () => {
    let totalCount = 0

    // 解構賦值
    let priceinfo = [...data]

    priceinfo.map((v, i) => {
      totalCount += v.Order_Amount * v.price
    })

    return totalCount
  }

  // 計算訂單的商品總計
  const totalPrice = () => {
    let Pricesum = 0


    // 解構賦值
    let Priceinfo = [...data]

    Priceinfo.map((v, i) => {
      Pricesum += v.Order_Amount * v.price
    })

    // 扣除商品優惠
    Pricesum -= Promotion

    return Pricesum
  }
  return (
    <>
      <div className="container-fluid Banner col-xs-10">
        <div className="bannerTitle col-lg-8 col-xs-8 ">
          <h1 className="bannerTitle1 col-xs-6">
            只差一步
          </h1>
          <h1 className="bannerTitle2 col-xs-6">
            眼前所及全部歸你
          </h1>
        </div>
      </div>

      <div className="Process col-lg-8 col-10 d-flex justify-content-around align-content-end">
        <div className="CartImage col-lg-3 col-xs-1">
          <FaShoppingCart className="icons first" />
          <h3 className="first">確認購物車</h3>
        </div>
        <FaLongArrowAltRight className="arrow firstArrow" />
        <div className="EditInfo col-lg-3 col-xs-1">
          <FaRegEdit className="icons" />
          <h3>填寫資料</h3>
        </div>
        <FaLongArrowAltRight className="arrow" />
        <div className="FinishInfo col-lg-3 col-xs-1">
          <FaCheck className="icons" />
          <h3>完成訂單</h3>
        </div>
      </div>

      <div className="container shoppingtitle my-5 col-lg-10">
        <span>SHOPPING CART</span>
        <div className="bottom-line col-lg-6 col-10 mx-lg-0 mx-auto"></div>
      </div>

      <div className="container ordercheck col-lg-10 d-lg-flex">
        {/* 訂單商品詳細 */}
        <OrderDetail
          data={data}
          Count={Count}
          setCount={setCount}
          Pos={Pos}
          setODPos={setODPos}
          setPos={setPos}
          setDeleteODPos={setDeleteODPos}
        />

        {/* 訂單小計詳情 */}
        <OrderInfo
          productPrice={productPrice}
          totalPrice={totalPrice}
          // totalPromotion={totalPromotion}
          Promotion={Promotion}
          setPromotion={setPromotion}
        />
      </div>

      <div className="container likemore col-lg-10 col-10">
        <div className="bottomline col-lg-6"></div>

        {/* 你可能會喜歡，的 component */}
        <h4 className="col-lg-10 text-lg-start text-center">
          你可能也會喜歡
        </h4>
        {/* 喜歡的卡片 */}
        <StoreCard
          setData={setData}
          setCount={setCount}
          Filter={Filter}
          setFilter={setFilter}
          CountNav={CountNav}
          setCountNav={setCountNav}
        />
      </div>
    </>
  )
}

export default withRouter(CartPreOrder)
