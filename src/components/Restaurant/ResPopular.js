import React, { useEffect, useState } from 'react'
import { imgUrl } from '../../config'
import {
  withRouter,
  Link,
  useHistory,
} from 'react-router-dom'
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io'
import Carousel from 'react-grid-carousel'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
function ResPopular(props) {
  // const [popular, setPopular] = useState([])
  const {
    res_id,
    res_img,
    res_name,
    res_introduce,
    isNotLiked,
  } = props

  const [display, setDisplay] = useState(
    isNotLiked ? false : true
  )
  const token = localStorage.getItem('token')
  // 收藏新增
  const handlingInsert = (id) => {
    console.log('token', token)
    fetch(
      `http://localhost:3002/member/favorite-restaurant-insert`,
      {
        method: 'POST',
        body: JSON.stringify({
          restaurantid: id,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      }
    )
  }
  // 刪除收藏
  const handlingDelete = (res_id) => {
    fetch(
      `http://localhost:3002/member/favorite-restaurant-delete/${res_id}`,
      {
        method: 'DELETE',
      }
    )
  }

  return (
    <>
      {/* <div className="col-md-3 col-12 m-4"> */}

      <div class="res-popular">
        <div className="res-popular-pic-wrapper">
          <img
            className="foodImg"
            // src={`${imgUrl}/images/food.jpg`}
            src={
              'http://localhost:3002/img/restaurant/' +
              res_img
            }
            alt=""
            style={{
              width: '100%',
              height: '175px',
              borderRadius: '15px 15px 0 0',
              objectFit: 'cover',
            }}
          />
        </div>

        <div className="res-popular-body ">
          <div className="res-popular-title d-flex justify-content-between mt-3">
            <Link to={`/resprdoucts/${res_id}`}>
              <h3>{res_name}</h3>
            </Link>
            <span>
              <span>
                {display ? (
                  <IoIosHeartEmpty
                    onClick={(e) => {
                      if (!token) {
                        Swal.fire({
                          title: '請先登入會員',
                          icon: 'warning',
                          showCancelButton: true,
                          confirmButtonColor: '#3085d6',
                          cancelButtonColor: '#d33',
                          confirmButtonText: '前往登入頁面',
                        }).then((result) => {
                          if (result.isConfirmed) {
                            props.history.push('/login')
                          }
                        })
                      } else {
                        handlingInsert(res_id)
                        Swal.fire({
                          icon: 'success',
                          title: '已加入收藏清單',
                          showConfirmButton: false,
                          timer: 1000,
                        })
                      }
                      handlingInsert(res_id)
                      setDisplay(!display)
                      // if (display) {
                      //   setDisplay(false)
                      // } else {
                      //   setDisplay(true)
                      // }
                    }}
                    style={{
                      // display: display ? 'block' : 'none',
                      color: '#FB6107',
                      fontSize: '26px',
                      marginTop: '3px',
                    }}
                  />
                ) : (
                  <IoIosHeart
                    onClick={(e) => {
                      Swal.fire({
                        icon: 'error',
                        title: '已移除收藏清單',
                        showConfirmButton: false,
                        timer: 1000,
                      })
                      handlingDelete(res_id)
                      setDisplay(!display)
                      // if (display) {
                      //   setDisplay(false)
                      // } else {
                      //   setDisplay(true)
                      // }
                    }}
                    style={{
                      color: '#d96e30',
                      fontSize: '26px',
                      marginTop: '3px',
                      // display: display ? 'none' : 'block',
                    }}
                  />
                )}
              </span>
            </span>
          </div>

          <div className="res-popular-prodution">
            <p>{res_introduce}</p>
          </div>
        </div>
      </div>

      {/* </div> */}
    </>
  )
}

export default withRouter(ResPopular)
