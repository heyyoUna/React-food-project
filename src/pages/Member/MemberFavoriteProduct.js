import React, { useEffect, useState } from 'react'
import { withRouter, useHistory } from 'react-router-dom'
import { CgShoppingCart } from 'react-icons/cg'
import { IoIosHeart } from 'react-icons/io'
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