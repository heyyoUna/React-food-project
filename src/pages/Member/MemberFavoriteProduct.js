import React, { useEffect, useState } from 'react'
import { withRouter, useHistory } from 'react-router-dom'
import { CgShoppingCart } from 'react-icons/cg'
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io'
import MemberNavbar from './../../components/member/MemberNavbar'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

function MemberFavoriteProduct(props) {
  let history = useHistory()
  const { setCountNav } = props
  const token = localStorage.getItem('token')
  const [memberID, setMemberID] = useState(0)
  const [products, setProducts] = useState([])

  useEffect(() => {
    favoriteProductGet()
  }, [])

  const favoriteProductGet = () => {
    if (!token) {
      Swal.fire('尚未登入，請連到登入頁面')
      history.push('/login')
    }

    fetch(`http://localhost:3002/member/favorite-product-get`, {
      method: 'GET',
      headers: {
        //token 從 header 中 Authorization 屬性傳入
        //格式為 Bearer + 空格 + token
        'Authorization': 'Bearer ' + token
      }
    }).then(obj => obj.json())
      .then(obj => {
        if (obj.success) {
          if (obj.data.length) {
            setProducts(obj.data)
            setMemberID(obj.memberID)
          } else {
            Swal.fire(obj.error || '尚未收藏商品')
          }
        } else {
          Swal.fire(obj.error)
        }
      })
  }

  const handlingClick = (productid, index, remove_flag) => {
    if (remove_flag) {
      handlingInsert(productid, index)
    } else {
      handlingDelete(productid, index)
    }
  }

  const handlingDelete = (productid, index) => {
    fetch(`http://localhost:3002/member/favorite-product-delete/${productid}`, {
      method: 'DELETE',
    }).then(r => r.json())
      .then(obj => {
        if (obj.success) {
          //複製出新的products
          let newProducts = [...products]
          //註記products中第index筆資料被刪除(註記刪除)
          newProducts[index].remove_flag = true
          //新的products覆蓋掉原本的products
          setProducts(newProducts)

          //空心愛心

        } else {
          Swal.fire(obj.error || '移除收藏商品失敗')
        }
      })
  }

  const handlingInsert = (productid, index) => {
    fetch(`http://localhost:3002/member/favorite-product-insert`, {
      method: 'POST',
      body: JSON.stringify({
        productid: productid
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    }).then(r => r.json())
      .then(obj => {
        if (obj.success) {
          //複製出新的products
          let newProducts = [...products]
          //拿掉被刪除的products中第index筆資料的註記(取消刪除註記)
          newProducts[index].remove_flag = false
          //新的products覆蓋掉原本的products
          setProducts(newProducts)
          //實心愛心
          Swal.fire({
            icon: 'success',
            title: '已加入收藏清單',
            showConfirmButton: false,
            timer: 1000
          })
        } else {
          Swal.fire(obj.error || ' 新增收藏商品失敗')
        }
      })
  }

  const handlingAddToCart = (product) => {
    fetch(`http://localhost:3002/cart`, {
      method: 'POST',
      body: JSON.stringify({
        Sid: product.sid,
        Member_id: memberID,
        Product_id: product.product_id,
        Order_Amount: 1,
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
    }).then(obj => {
      setCartCount()
    })
  }

  const setCartCount = () => {
    fetch(`http://localhost:3002/member/member-cart-count`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    }).then(r => r.json())
      .then(obj => {
        if (obj.success) {
          Swal.fire({
            icon: 'success',
            title: '已加入購物車',
            showConfirmButton: false,
            timer: 1000
          })
          localStorage.setItem('數量', obj.count)
          setCountNav(obj.count)
        }
      })
  }

  return (
    <>
      <div className="member-favorite-container">
        <div className="row member-favorite-title">
          <h1 id="member-favorite-h1">商品收藏清單</h1>
        </div>
        <div className="row member-favorite">
          <MemberNavbar />
          <div className="member-n col-1"></div>
          <div className="member-favorite-card col-9">
            {products.map((value, index) => {
              return (
                <div className="card mb-3" key={value.sid}>
                  <div className="row member-favorite-product">
                    <div className="col-md-4">
                      <img className="img-fluid rounded-start"
                        src={'http://localhost:3002/img/Product/' + value.detail_img}
                        alt="" />
                    </div>
                    <div className="col-md-7">
                      <div className="card-body">
                        <div className="member-card-title">
                          <h5 className="card-title">
                            {value.name}
                          </h5>
                        </div>
                        <div className="member-favorite-text">
                          <p className="card-text">NT {value.price}</p>
                        </div>
                      </div>
                    </div>
                    <div className="member-icon col-md-1">
                      <div className="member-like" onClick={() =>
                        handlingClick(value.sid, index, value.remove_flag)
                      }>
                        <IoIosHeartEmpty
                          style={{
                            color: '#FB6107',
                            fontSize: '26px',
                            marginTop: '3px',
                            display: value.remove_flag ? 'block' : 'none'
                          }}
                        />
                        <IoIosHeart
                          style={{
                            color: '#d96e30',
                            fontSize: '26px',
                            marginTop: '3px',
                            display: value.remove_flag ? 'none' : 'block'
                          }}
                        />
                      </div>
                      <div className="member-cart">
                        <button
                          type="button"
                          className="btn member-cart-btn-primary"
                          onClick={() =>
                            handlingAddToCart(value)
                          }>
                          加入購物車
                        </button>
                        <CgShoppingCart
                          class="member-cart-icon"
                          style={{
                            fontSize: '30px',
                            color: '#2a593e',
                            cursor: 'pointer',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="member-favorite-card-mobile">
            {products.map((value, index) => {
              return (
                <div className="card mb-3" key={value.sid}>
                  <div className="row member-favorite-product">
                    <div className="col-md-4">
                      <img className="img-fluid rounded-start"
                        src={'http://localhost:3002/img/Product/' + value.detail_img}
                        alt="" />
                    </div>
                    <div className="col-md-7">
                      <div className="card-body">
                        <div className="member-card-title">
                          <h5 className="card-title">
                            {value.name}
                          </h5>
                        </div>
                        <div className="member-favorite-text">
                          <p className="card-text">NT {value.price}</p>
                        </div>
                      </div>
                    </div>
                    <div className="member-icon col-md-1">
                      <div className="member-like" onClick={() =>
                        handlingClick(value.sid, index, value.remove_flag)
                      }>
                        <IoIosHeartEmpty
                          style={{
                            color: '#FB6107',
                            fontSize: '26px',
                            marginTop: '3px',
                            display: value.remove_flag ? 'block' : 'none'
                          }}
                        />
                        <IoIosHeart
                          style={{
                            color: '#d96e30',
                            fontSize: '26px',
                            marginTop: '3px',
                            display: value.remove_flag ? 'none' : 'block'
                          }}
                        />
                      </div>
                      <div className="member-cart" onClick={() =>
                        handlingAddToCart(value)
                      }>
                        <CgShoppingCart
                          style={{
                            fontSize: '26px',
                            color: '#2a593e',
                            cursor: 'pointer',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default withRouter(MemberFavoriteProduct)