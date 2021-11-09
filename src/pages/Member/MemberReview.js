import React, { useState, useEffect } from 'react'
import { withRouter, useHistory } from 'react-router-dom'
import MemberNavbar from './../../components/member/MemberNavbar'
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import moment from 'moment'

function MemberReview(props) {
  let history = useHistory()
  const token = localStorage.getItem('token')
  const [product, setProduct] = useState([])
  const [evaluating, setEvaluating] = useState(true)

  useEffect(() => {

    if (!token) {
      Swal.fire('尚未登入，請連到登入頁面')
      history.push('/login')
    }

    fetch(`http://localhost:3002/member/review-data-get/${evaluating}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(r => r.json())
      .then(obj => {
        if (obj.success) {
          setProduct(obj.data)
        } else {
          Swal.fire(obj.error)
        }
      })
  }, [evaluating])

  const handleSubmit = (e) => {
    //阻擋form的預設送出行為
    e.preventDefault()

    fetch('http://localhost:3002/member/review-data-save', {
      method: 'POST',
      body: JSON.stringify(product),
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(r => r.json())
      .then(obj => {
        if (obj.success) {
          Swal.fire({
            icon: 'success',
            title: '評價成功',
            showConfirmButton: false,
            timer: 1500,
          })
          setEvaluating(false)
        } else {
          Swal.fire({
            icon: 'error',
            text: '評價失敗\n' + (obj.error || '')
          });
        }
      })
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="member-review-container">
          <div className="row member-review-title">
            <h1 id="member-review-h1">我的評價</h1>
          </div>
          <div className="row member-review-table">
            <MemberNavbar />
            <div className="member-review-main-right col-9">
              {/* <!-- 評價按鈕  --> */}
              <div className="member-review-button">
                <button type="button" className={"btn " + (evaluating ? "member-btn-evaluating" : "member-btn-evaluated")} onClick={() => {
                  setEvaluating(true)
                }}>
                  待評價
                </button>
                <button type="button" className={"btn " + (evaluating ? "member-btn-evaluated" : "member-btn-evaluating")} onClick={() => {
                  setEvaluating(false)
                }
                }>
                  已評價
                </button>
              </div>
              {/* <!-- 評價按鈕  --> */}
              {/* <!-- 評價內容 --> */}
              {product.map((v, i) => {
                return (
                  <div key={i}>
                    <div className="member-order-number">
                      <a href="#">{v.order_id.toUpperCase()}</a>
                    </div>
                    <div className="member-review-main">
                      <div className="member-review-img">
                        <img className="img-fluid rounded-start"
                          src={'http://localhost:3002/img/Product/' + v.product_img}
                          alt="" />
                      </div>
                      <div className="member-product-name">
                        <h5>{v.product_name}</h5>
                        <div className="member-cart">
                          {[1, 2, 3, 4, 5].map((level) => {
                            return (
                              <div key={level} type={evaluating ? 'button' : ''} style={{ display: 'inline' }} onClick={() => {
                                if (!evaluating) {
                                  return;
                                }
                                let tempProduct = [...product]
                                tempProduct[i].level = level
                                setProduct(tempProduct)
                              }}>
                                <AiOutlineStar style={{ color: '#FB6107', fontSize: '20px', marginTop: '3px', display: v.level >= level ? 'none' : 'inline' }} />
                                <AiFillStar style={{ color: '#FB6107', fontSize: '20px', marginTop: '3px', display: v.level >= level ? 'inline' : 'none' }} />
                              </div>

                            )
                          })
                          }
                        </div>
                        <small>{moment(v.timestamp).format('YYYY-MM-DD HH:mm:ss')}</small>
                      </div>
                      <div className="member-review-right">
                        <div className="member-review-text">
                          <input type="text"
                            className="member-review-text-input"
                            value={v.description}
                            readOnly={evaluating ? false : true}
                            onChange={(e) => {
                              let tempProduct = [...product]
                              tempProduct[i].level = tempProduct[i].level == 0 ? 5 : tempProduct[i].level
                              tempProduct[i].description = e.target.value
                              setProduct(tempProduct)
                            }} />
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
              {/* 送出按鈕  */}
              <div className="member-review-form-group row" style={{ display: evaluating && product.length > 0 ? 'block' : 'none' }}>
                <button type="submit" className="karin-profile-btn btn-primary">確認送出</button>
              </div>
              {/* 送出按鈕  */}
              {/* <!-- 評價內容 --> */}
            </div>
            <div className="member-review-main-right-mobile">
              {/* <!-- 評價按鈕  --> */}
              <div className="member-review-button">
                <button type="button" className={"btn " + (evaluating ? "btn member-btn-evaluating" : "member-btn-evaluated")} onClick={() => {
                  setEvaluating(true)
                }}>
                  待評價
                </button>
                <button type="button" className={"btn " + (evaluating ? "btn member-btn-evaluated" : "member-btn-evaluating")} onClick={() => {
                  setEvaluating(false)
                }
                }>
                  已評價
                </button>
              </div>
              {/* <!-- 評價按鈕  --> */}
              {/* <!-- 評價內容 --> */}
              {product.map((v, i) => {
                return (
                  <div key={i}>
                    <div className="member-order-number">
                      <a href="#">{v.order_id.toUpperCase()}</a>
                    </div>
                    <div className="member-review-main">
                      <div className="member-review-img">
                        <img className="img-fluid rounded-start"
                          src={'http://localhost:3002/img/Product/' + v.product_img}
                          alt="" />
                      </div>
                      <div className="member-product-name">
                        <h5>{v.product_name}</h5>
                        <div className="member-cart">
                          {[1, 2, 3, 4, 5].map((level) => {
                            return (
                              <div key={level} type={evaluating ? 'button' : ''} style={{ display: 'inline' }} onClick={() => {
                                if (!evaluating) {
                                  return;
                                }
                                let tempProduct = [...product]
                                tempProduct[i].level = level
                                setProduct(tempProduct)
                              }}>
                                <AiOutlineStar style={{ color: '#FB6107', fontSize: '20px', marginTop: '3px', display: v.level >= level ? 'none' : 'inline' }} />
                                <AiFillStar style={{ color: '#FB6107', fontSize: '20px', marginTop: '3px', display: v.level >= level ? 'inline' : 'none' }} />
                              </div>
                            )
                          })
                          }
                        </div>
                      </div>
                      <div className="member-review-right">
                        <div className="member-review-text">
                          <input type="text"
                            className="member-review-text-input"
                            value={v.description}
                            readOnly={evaluating ? false : true}
                            onChange={(e) => {
                              let tempProduct = [...product]
                              tempProduct[i].level = tempProduct[i].level == 0 ? 5 : tempProduct[i].level
                              tempProduct[i].description = e.target.value
                              setProduct(tempProduct)
                            }} />
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
              {/* 送出按鈕  */}
              <div className="member-review-form-group row" style={{ display: evaluating ? 'block' : 'none' }}>
                <button type="submit" className="member-review-send-btn btn-primary">確認送出</button>
              </div>
              {/* 送出按鈕  */}
              {/* <!-- 評價內容 --> */}
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default withRouter(MemberReview)
