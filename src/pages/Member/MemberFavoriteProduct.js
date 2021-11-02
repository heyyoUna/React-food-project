import React, { useEffect, useState } from 'react'
import { withRouter, useHistory } from 'react-router-dom'
import { CgShoppingCart } from 'react-icons/cg'
import { IoIosHeart } from 'react-icons/io'
import { FiHeart } from 'react-icons/fi'
import MemberNavbar from './../../components/member/MemberNavbar'

function MemberFavoriteProduct(props) {
  const id = localStorage.getItem('id')
  const [products, setProducts] = useState([])
  let history = useHistory()

  useEffect(() => {
    favoriteProductGet()
  }, [])

  const favoriteProductGet = () => {
    if (id > 0) {
      fetch(`http://localhost:3002/member/favorite-product-get/${id}}`, {
        method: 'GET',
      }).then(r => r.json())
        .then(obj => {
          if (obj.length) {
            setProducts(obj)
          } else {
            alert(obj.error || '快去收藏商品吧')
          }
        })
    } else {
      alert('尚未登入，請連到登入頁面')
      history.push('/login')
    }
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
          alert(obj.error || '移除收藏商品失敗')
        }
      })
  }

  const handlingInsert = (productid, index) => {
    fetch(`http://localhost:3002/member/favorite-product-insert`, {
      method: 'POST',
      body: JSON.stringify({
        memberid: +id,
        productid: productid
      }),
      headers: {
        'Content-Type': 'application/json'
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

        } else {
          alert(obj.error || ' 新增收藏商品失敗')
        }
      })
  }

  return (
    <>
      <div className="member-favorite-container">
        <div className="row member-favorite-title">
          <h1 id="member-favorite-h1">商品追蹤清單</h1>
        </div>
        <div className="row member-favorite">
          <MemberNavbar/>
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
                        <FiHeart
                          style={{
                            color: '#FB6107',
                            fontSize: '22px',
                            marginTop: '3px',
                            display: value.remove_flag ? 'block' : 'none'
                          }}
                        />
                        <IoIosHeart
                          style={{
                            fontSize: '30px',
                            color: '#d96e30',
                            cursor: 'pointer',
                            display: value.remove_flag ? 'none' : 'block'
                          }}
                        />
                      </div>
                      <div className="member-cart">
                        <button
                          type="button"
                          className="btn member-cart-btn-primary">
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
            {products.map((i) => {
              return (
                <div className="card mb-3 ">
                  <div className="row member-favorite-product">
                    <div className="col-md-4">
                      <img className="img-fluid rounded-start"
                        src={'http://localhost:3002/img/Product/' + i.detail_img}
                        alt="" />
                    </div>
                    <div className="col-md-7">
                      <div className="card-body">
                        <div className="member-card-title">
                          <h5 className="card-title">
                            {i.name}
                          </h5>
                        </div>
                        <div className="member-favorite-text">
                          <p className="card-text">NT {i.price}</p>
                        </div>
                      </div>
                    </div>
                    <div className="member-icon col-md-1" >
                      <div className="member-like">
                        <IoIosHeart
                          style={{
                            fontSize: '30px',
                            color: '#d96e30',
                            cursor: 'pointer',
                          }}
                        />
                      </div>
                      <div className="member-cart">
                        <CgShoppingCart
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
        </div>
      </div>
    </>
  )
}

export default withRouter(MemberFavoriteProduct)