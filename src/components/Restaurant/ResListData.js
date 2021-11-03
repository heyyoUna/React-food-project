import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import '../../App.scss'
import { BsClock } from 'react-icons/bs'
import { BsStarFill } from 'react-icons/bs'
import { MdOutlineAttachMoney } from 'react-icons/md'
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io'
function ResListData(props) {
  const {
    res_id,
    res_img,
    res_name,
    res_rate,
    res_aveprice,
    res_starttime,
    res_endtime,
  } = props

  const [display, setDisplay] = useState(true)
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
          setDisplay(!display)
          alert('新增收藏餐廳成功')
          //實心愛心
        } else {
          alert(obj.error || ' 新增收藏餐廳失敗')
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
  }
  return (
    <>
      <div class="col-md-5  col-12  key={i}">
        <div class="reslist-card d-flex ">
          {/* <img className="res-foodImg" src={`${imgUrl}/images/food.jpg`} alt="" /> */}
          {/* <img className="res-foodImg" src={` http://localhost:3000/images/Restaurant/food.jpg`} alt="" /> */}

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
                {display ? (
                  <IoIosHeartEmpty
                    onClick={(e) => {
                      handlingInsert(res_id)
                      setDisplay(!display)
                      // if (display) {
                      //   setDisplay(false)
                      // } else {
                      //   setDisplay(true)
                      // }
                      // !setDisplay
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
              平均消費:{res_aveprice}
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
      </div>
    </>
  )
}

export default ResListData
