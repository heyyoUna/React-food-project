import React, { useEffect, useState } from 'react'
import { withRouter, useHistory } from 'react-router-dom'
import { BsClock } from 'react-icons/bs'
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io'
import { MdOutlineAttachMoney } from 'react-icons/md'
import MemberNavbar from './../../components/member/MemberNavbar'

function MemberFavoriteRestaurant(props) {
  const token = localStorage.getItem('token')
  const [restaurant, setRestaurant] = useState([])
  let history = useHistory()

  useEffect(() => {
    favoriteRestaurantGet()
  }, [])

  const favoriteRestaurantGet = () => {
    if (!token) {
      alert('尚未登入，請連到登入頁面')
      history.push('/login')
    }

    fetch(`http://localhost:3002/member/favorite-restaurant-get`, {
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
            setRestaurant(obj.data)
          } else {
            alert(obj.error || '快去收藏文章吧')
          }
        } else {
          alert(obj.error)
        }
      })
  }

  const handlingClick = (restaurantid, index, remove_flag) => {
      if (remove_flag) {
        handlingInsert(restaurantid, index)
      } else {
        handlingDelete(restaurantid, index)
      }
    }

    const handlingDelete = (restaurantid, index) => {
      fetch(`http://localhost:3002/member/favorite-restaurant-delete/${restaurantid}`, {
        method: 'DELETE',
      }).then(r => r.json())
        .then(obj => {
          if (obj.success) {
            //複製出新的restaurant
            let newRestaurant = [...restaurant]
            //註記restaurant中第index筆資料被刪除(註記刪除)
            newRestaurant[index].remove_flag = true
            //新的restaurant覆蓋掉原本的restaurant
            setRestaurant(newRestaurant)

            //空心愛心

          } else {
            alert(obj.error || '移除收藏餐廳失敗')
          }
        })
    }

    const handlingInsert = (restaurantid, index) => {
      fetch(`http://localhost:3002/member/favorite-restaurant-insert`, {
        method: 'POST',
        body: JSON.stringify({
          restaurantid: restaurantid
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
      }).then(r => r.json())
        .then(obj => {
          if (obj.success) {
            //複製出新的restaurant
            let newRestaurant = [...restaurant]
            //拿掉被刪除的restaurant中第index筆資料的註記(取消刪除註記)
            newRestaurant[index].remove_flag = false
            //新的restaurant覆蓋掉原本的restaurant
            setRestaurant(newRestaurant)

            //實心愛心

          } else {
            alert(obj.error || ' 新增收藏餐廳失敗')
          }
        })
    }

    return (
      <>
        <div className="member-favorite-container">
          <div className="row member-favorite-title">
            <h1 id="member-favorite-h1">餐廳收藏清單</h1>
          </div>
          <div className="row member-favorite">
            <MemberNavbar />
            <div className="member-n col-1"></div>
            <div className="member-favorite-card col-9">
              {restaurant.map((value, index) => {
                return (
                  <div className="card mb-3" key={value.res_id}>
                    <div className="row member-favorite-restaurant">
                      <div className="col-md-4">
                        <img className="img-fluid rounded-start"
                          src={'http://localhost:3002/img/restaurant/' + value.res_img}
                          alt="" />
                      </div>
                      <div className="col-md-7">
                        <div className="card-body">
                          <div className="member-card-title">
                            <h5 className="card-title">
                              {value.res_name}
                            </h5>
                          </div>
                          <div className="member-favorite-text">
                            <p className="card-text">
                              <MdOutlineAttachMoney
                                style={{
                                  fontSize: '28px',
                                  color: '#FFB606',
                                  marginRight: '6px',
                                  paddingRight: '3px',
                                }}
                              />
                            平均消費：{value.res_aveprice}</p>
                            {/* <p className="member-clock"> 
                      <BsClock
                        className="member-clock-icon"
                        style={{
                          fontSize: '28px',
                          color: '#8FC065',
                        }}
                      />
                      {value.time}</p> */}
                          </div>
                        </div>
                      </div>
                      <div className="member-icon col-md-1">
                        <div className="member-like" onClick={() =>
                          handlingClick(value.res_id, index, value.remove_flag)
                        }>
                          <IoIosHeartEmpty
                            style={{
                              color: '#FB6107',
                              fontSize: '30px',
                              marginTop: '3px',
                              display: value.remove_flag ? 'block' : 'none'
                            }}
                          />
                          <IoIosHeart
                            style={{
                              color: '#d96e30',
                              fontSize: '30px',
                              marginTop: '3px',
                              display: value.remove_flag ? 'none' : 'block'
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
              {restaurant.map((value, index) => {
                return (
                  <div className="card mb-3" key={value.res_id}>
                    <div className="row member-favorite-restaurant">
                      <div className="col-md-4">
                        <img className="img-fluid rounded-start"
                          src={'http://localhost:3002/img/restaurant/' + value.res_img}
                          alt="" />
                      </div>
                      <div className="col-md-7">
                        <div className="card-body">
                          <div className="member-card-title">
                            <div className="member-card-text">
                              <h5 className="card-title">
                                {value.res_name}
                              </h5>
                              <div className="member-icon ">
                                <div className="member-like" onClick={() =>
                                  handlingClick(value.res_id, index, value.remove_flag)
                                }>
                                  <IoIosHeartEmpty
                                    style={{
                                      color: '#FB6107',
                                      fontSize: '30px',
                                      marginTop: '3px',
                                      display: value.remove_flag ? 'block' : 'none'
                                    }}
                                  />
                                  <IoIosHeart
                                    style={{
                                      color: '#d96e30',
                                      fontSize: '30px',
                                      marginTop: '3px',
                                      display: value.remove_flag ? 'none' : 'block'
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="member-favorite-text">
                              <p className="card-text"> <MdOutlineAttachMoney
                                style={{
                                  fontSize: '28px',
                                  color: '#FFB606',
                                  marginRight: '6px',
                                  paddingRight: '3px',
                                }}
                              />
                              平均消費：{value.res_aveprice}</p>
                              {/* <p className="member-clock"> <BsClock
                          className="member-clock-icon"
                        style={{
                          fontSize: '28px',
                          color: '#8FC065',
                        }}
                      />
                      11:00-20:00</p> */}
                            </div>
                          </div>
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

  export default withRouter(MemberFavoriteRestaurant)