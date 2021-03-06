import React, { useState, useEffect } from 'react'
import { withRouter, useHistory } from 'react-router-dom'
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const ProductWrap = (props) => {
  const { CountNav, setCountNav } = props
  const token = localStorage.getItem('token')
  let history = useHistory()
  const [ID, setID] = useState(0)

  const {
    sid,
    name,
    img,
    intro,
    unit,
    cal,
    protein,
    fat,
    carbon,
    price,
    product_id,
    favIndicator,
    setFavIndicator,
  } = props

  const [display, setDisplay] = useState(true)
  const [orderQty, setOrderQty] = useState(1)

  //  token 解密拿到會員ID
  const addtocart = (product_id, orderQty) => {
    fetch(`http://localhost:3002/member/memberprofile`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then((r) => r.json())
      .then((obj) => {
        const ID = obj.data[0].sid
        setID(ID)
        // 有會員ID才寫入暫存訂單
        if (ID) {
          fetch(`http://localhost:3002/cart`, {
            method: 'POST',
            body: JSON.stringify({
              Member_id: ID,
              Product_id: product_id,
              Order_Amount: orderQty,
            }),
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + token,
            },
          })
            .then((r) => r.json)
            .then((obj) => {
              if (obj) {
                fetch(
                  `http://localhost:3002/cart/ordertempmember/` +
                    ID,
                  {
                    method: 'GET',
                    headers: {
                      Authorization: 'Bearer ' + token,
                    },
                  }
                )
                  .then((r) => r.json())
                  .then((obj) => {
                    setCountNav(obj.length)
                  })
              }
            })
        }
      })
  }

  // 更新購物車數量
  useEffect(() => {
    if (token) {
      //拿到會員ID
      ;(async () => {
        const r = await fetch(
          `http://localhost:3002/member/memberprofile`,
          {
            method: 'GET',
            headers: {
              Authorization: 'Bearer ' + token,
            },
          }
        )
        const obj = await r.json()
        // console.log('obj', obj.data[0].sid)
        setID(obj.data[0].sid)
        if (obj.data[0].sid) {
          const rs = await fetch(
            `http://localhost:3002/cart/ordertempmember/${obj.data[0].sid}`,
            {
              headers: {
                Authorization: 'Bearer ' + token,
              },
            }
          )
          const orderlist = await rs.json()
          // console.log(orderlist)
          if (orderlist.length) {
            setCountNav(orderlist.length)
          }
        }
      })()
    } else {
      setCountNav(0)
    }
  }, [])

  // 收藏新增
  const handlingInsert = (sid) => {
    fetch(
      `http://localhost:3002/member/favorite-product-insert`,
      {
        method: 'POST',
        body: JSON.stringify({
          productid: sid,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      }
    )
      .then((obj) => obj.json())
      .then((obj) => {
        if (obj.success) {
          setFavIndicator(true)
        }
      })
  }
  // 刪除收藏
  const handlingDelete = (sid) => {
    fetch(
      `http://localhost:3002/member/favorite-product-delete/${sid}`,
      {
        method: 'DELETE',
      }
    )
      .then((obj) => obj.json())
      .then((obj) => {
        if (obj.success) {
          // 有成功刪除, 設定false
          setFavIndicator(false)
        }
      })
  }

  return (
    <>
      <div className="dt-product-imgwrap col-lg-6">
        <div className="dt-bgimg">
          {/* 商品大圖 */}
          <img
            src={'http://localhost:3002/img/Product/' + img}
            alt=""
          />
        </div>
        <div className="dtmb-love-icon">
          <i className="far fa-heart"></i>
        </div>
      </div>
      <div className="dt-intro-wrap col-sm-12 col-lg-6">
        {/* 商品名稱 */}
        <div className="dt-name fs44 mb20 d-flex">
          {name}
          {/* 收藏區 */}
          <div className="dt-love-icon">
            {/* 空心 */}
            <IoIosHeartEmpty
              onClick={(e) => {
                if (!token) {
                  Swal.fire({
                    title: '請先登入會員',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#8fc065',
                    cancelButtonColor: '#fb6107',
                    confirmButtonText: '前往登入頁面',
                  }).then((result) => {
                    if (result.isConfirmed) {
                      props.history.push('/login')
                    }
                  })
                } else {
                  handlingInsert(sid)
                  Swal.fire({
                    icon: 'success',
                    title: '已加入收藏清單',
                    showConfirmButton: false,
                    timer: 1000,
                  })
                }
              }}
              style={{
                display: favIndicator ? 'none' : 'block',
              }}
            />
            {/* 實心 */}
            <IoIosHeart
              onClick={(e) => {
                handlingDelete(sid)
              }}
              style={{
                display: favIndicator ? 'block' : 'none',
              }}
            />
          </div>
        </div>
        {/* 商品介紹 */}
        <p className="dt-intro fs24 mb20">
          {intro}({unit})
        </p>
        <div className="dt-content-wrap d-flex">
          <div className="content-wrap">
            {/* 營養成分 */}
            <p className="fs24">熱量:{cal}大卡</p>
            <p className="fs24">蛋白質:{protein}克</p>
            <p className="fs24">脂肪:{fat}克</p>
            <p className="fs24">碳水:{carbon}克</p>
          </div>
          {/* 價錢 */}
          <h1 className="dt-price">NT${price}</h1>
        </div>
        <div className="dt-btn-wrap d-flex">
          <div className="dt-qty-wrap d-flex ">
            <button className="dt-minus">
              <i
                className="fas fa-minus"
                onClick={() => {
                  if (orderQty > 1) {
                    setOrderQty(orderQty - 1)
                  }
                  if (orderQty <= 1) {
                    Swal.fire({
                      icon: 'warning',
                      title: '商品最少一樣',
                      showConfirmButton: false,
                      timer: 1000,
                    })
                  }
                }}
              ></i>
            </button>
            <div className="dt-qty">{orderQty}</div>
            <button className="dt-add">
              <i
                className="fas fa-plus"
                onClick={() => {
                  setOrderQty(orderQty + 1)
                }}
              ></i>
            </button>
          </div>
          {/* 加入購物車 */}
          <button
            className="dt-addtocart"
            onClick={(e) => {
              if (!token) {
                Swal.fire({
                  title: '請先登入會員',
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#8fc065',
                  cancelButtonColor: '#fb6107',
                  confirmButtonText: '前往登入頁面',
                }).then((result) => {
                  if (result.isConfirmed) {
                    props.history.push('/login')
                  }
                })
              } else {
                addtocart(product_id, orderQty)
                Swal.fire({
                  icon: 'success',
                  title: '已加入購物車',
                  showConfirmButton: false,
                  timer: 1000,
                })
              }
            }}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </>
  )
}

export default withRouter(ProductWrap)
