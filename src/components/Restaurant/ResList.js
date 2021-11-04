import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import '../../App.scss'
import { BsClock } from 'react-icons/bs'
import { BsStarFill } from 'react-icons/bs'
import { MdOutlineAttachMoney } from 'react-icons/md'
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io'
import { imgUrl } from '../../config'

function ResList({ listData }) {
  const id = localStorage.getItem('id')
  const [restaurant, setRestaurant] = useState([])
  const [display, setDisplay] = useState(true)
  let history = useHistory()

  // const favoriteRestaurantGet = () => {
  //   if (id > 0) {
  //     fetch(
  //       `http://localhost:3002/member/favorite-restaurant-get/${id}}`,
  //       {
  //         method: 'GET',
  //       }
  //     )
  //       .then((r) => r.json())
  //       .then((obj) => {
  //         if (obj.length) {
  //           setRestaurant(obj)
  //         } else {
  //           alert(obj.error || '快去收藏餐廳吧')
  //         }
  //       })
  //   } else {
  //     alert('尚未登入，請連到登入頁面')
  //     history.push('/login')
  //   }
  // }

  const handlingClick = (
    restaurantid,
    index,
    remove_flag
  ) => {
    if (remove_flag) {
      handlingInsert(restaurantid)
    } else {
      handlingDelete(restaurantid)
    }
  }

  const handlingDelete = (restaurantid) => {
    fetch(
      `http://localhost:3002/member/favorite-restaurant-delete/${restaurantid}`,
      {
        method: 'DELETE',
      }
    )
      .then((r) => r.json())
      .then((obj) => {
        if (obj.success) {
          //複製出新的restaurant
          let newRestaurant = [...restaurant]
          //註記restaurant中第index筆資料被刪除(註記刪除)
          newRestaurant.remove_flag = true
          //新的restaurant覆蓋掉原本的restaurant
          setRestaurant(newRestaurant)

          //空心愛心
        } else {
          alert(obj.error || '移除收藏餐廳失敗')
        }
      })
  }

  const handlingInsert = (restaurantid) => {
    fetch(
      `http://localhost:3002/member/favorite-restaurant-insert`,
      {
        method: 'POST',
        body: JSON.stringify({
          memberid: +id,
          restaurantid: restaurantid,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((r) => r.json())
      .then((obj) => {
        if (obj.success) {
          //複製出新的restaurant
          let newRestaurant = [...restaurant]
          //拿掉被刪除的restaurant中第index筆資料的註記(取消刪除註記)
          newRestaurant.remove_flag = false
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
      <div class="row  justify-content-center">
        {listData.map((el, i) => {
          return (
            <div class="col-md-5  col-12  key={i}">
              <div class="reslist-card d-flex ">
                {/* <img className="res-foodImg" src={`${imgUrl}/images/food.jpg`} alt="" /> */}
                {/* <img className="res-foodImg" src={` http://localhost:3000/images/Restaurant/food.jpg`} alt="" /> */}

                <img
                  className="res-foodImg"
                  src={
                    'http://localhost:3002/img/restaurant/' +
                    el.res_img
                  }
                  alt=""
                />
                <div className="reslist-txt ">
                  <div className="reslist-title d-flex justify-content-between ">
                    <Link to={'/resprdoucts/' + el.res_id}>
                      <h3>{el.res_name}</h3>
                    </Link>
                    <span>
                      <IoIosHeartEmpty
                        data-index={i}
                        onClick={(e) => {
                          const index =
                            e.target.attributes.getNamedItem(
                              'data-index'
                            ).value
                          console.log(index)
                          // console.log(e.target.value)
                          if (display) {
                            setDisplay(false)
                          } else {
                            setDisplay(true)
                          }
                        }}
                        style={{
                          display: display
                            ? 'block'
                            : 'none',
                          color: '#FB6107',
                          fontSize: '26px',
                          marginTop: '3px',
                        }}
                      />
                      <IoIosHeart
                        data-index={i}
                        onClick={(e) => {
                          const index =
                            e.target.attributes.getNamedItem(
                              'data-index'
                            ).value
                          console.log(index)
                          if (display) {
                            setDisplay(true)
                          } else {
                            setDisplay(false)
                          }
                        }}
                        style={{
                          color: '#d96e30',
                          fontSize: '26px',
                          marginTop: '3px',
                          display: display
                            ? 'none'
                            : 'block',
                        }}
                      />
                    </span>
                  </div>
                  <p>
                    {el.res_rate}
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
                    平均消費:{el.res_aveprice}
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
                    {el.res_starttime}-{el.res_endtime}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default ResList
