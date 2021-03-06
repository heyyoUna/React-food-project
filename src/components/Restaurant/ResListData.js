import React, { useEffect, useState } from 'react'
import {
  withRouter,
  Link,
  useHistory,
} from 'react-router-dom'
import '../../App.scss'
import { BsClock } from 'react-icons/bs'
import { BsStarFill } from 'react-icons/bs'
import { MdOutlineAttachMoney } from 'react-icons/md'
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
function ResListData(props) {
  const {
    res_id,
    res_img,
    res_name,
    res_rate,
    res_aveprice,
    res_starttime,
    res_endtime,
    isNotLiked,
    refreshData,
  } = props

  //true 空心 false 實心
  const [displayEmpty, setDisplayEmpty] = useState(
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
      .then((r) => r.json())
      .then((obj) => {
        if (obj.success) {
          setDisplayEmpty(!displayEmpty)
          if (refreshData)
            refreshData(id, displayEmpty)//轉盤不會定義這個方法所以下判斷
        }
      })
  }

  // 刪除收藏
  const handlingDelete = (res_id) => {
    fetch(
      `http://localhost:3002/member/favorite-restaurant-delete/${res_id}`,
      {
        method: 'DELETE',
      }
    )
      .then((r) => r.json())
      .then((obj) => {
        if (obj.success) {
          setDisplayEmpty(!displayEmpty)
          if (refreshData)
            refreshData(res_id, displayEmpty)
        }
      })
  }
  return (
    <>
      <div className="reslist-card d-flex">
        <img
          className="res-foodImg"
          src={`http://localhost:3002/img/restaurant/${res_img}`}
          alt=""
        />
        <div className="reslist-txt ">
          <div className="reslist-title d-flex justify-content-between ">
            <Link to={`/resprdoucts/${res_id}`}>
              <h3>{res_name}</h3>
            </Link>
            <span>
              {/* <IoIosHeartEmpty
                  onClick={(e) => {
                    handlingInsert(res_id)

                    if (display) {
                      setDisplay(false)
                    } else {
                      setDisplay(true)
                    }
                    // !setDisplay
                  }}
                  style={{
                    display: display ? 'block' : 'none',
                    color: '#FB6107',
                    fontSize: '26px',
                    marginTop: '3px',
                  }}
                />
                <IoIosHeart
                  onClick={(e) => {
                    handlingDelete(res_id)
                    if (display) {
                      setDisplay(false)
                    } else {
                      setDisplay(true)
                    }
                  }}
                  style={{
                    color: '#d96e30',
                    fontSize: '26px',
                    marginTop: '3px',
                    display: display ? 'none' : 'block',
                  }}
                /> */}
              {displayEmpty ? (
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
                      handlingInsert(res_id)
                      Swal.fire({
                        icon: 'success',
                        title: '已加入收藏清單',
                        showConfirmButton: false,
                        timer: 1000,
                      })
                    }
                    // handlingInsert(res_id)
                    // if (display) {
                    //   setDisplay(false)
                    // } else {
                    //   setDisplay(true)
                    // }
                  }}
                  style={{
                    color: '#FB6107',
                    fontSize: '26px',
                    marginTop: '3px',
                    // display: display ? 'none' : 'block',
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
          </div>
          <p>
            {res_rate}
            <BsStarFill
              style={{
                fontSize: '24px',
                color: '#FB6107',
                marginRight: '6px',
                paddingBottom: '4px',
              }}
            />
          </p>
          <p>
            <MdOutlineAttachMoney
              style={{
                fontSize: '28px',
                color: '#FFB606',
                marginRight: '6px',
                paddingRight: '3px',
              }}
            />
            均消:NT{res_aveprice}
          </p>
          <p>
            <BsClock
              style={{
                color: '#8FC065',
                marginRight: '14px',
                marginLeft: '2px',
                fontSize: '20px',
              }}
            />
            {res_starttime}-{res_endtime}
          </p>
        </div>
      </div>
    </>
  )
}

export default withRouter(ResListData)
