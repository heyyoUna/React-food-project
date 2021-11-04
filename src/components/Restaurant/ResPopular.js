import React, { useEffect, useState } from 'react'
import { imgUrl } from '../../config'
import { Link, useHistory } from 'react-router-dom'
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io'
function ResPopular(props) {
  // const [popular, setPopular] = useState([])
  const { res_id, res_img, res_name, res_introduce } = props

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
      <div className="col-md-3 col-12 m-4">
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
                  <IoIosHeartEmpty
                    onClick={(e) => {
                      handlingInsert(res_id)
                      if (display) {
                        setDisplay(false)
                      } else {
                        setDisplay(true)
                      }
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
                  />
                </span>
              </span>
            </div>

            <div className="res-popular-prodution">
              <p>{res_introduce}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ResPopular
