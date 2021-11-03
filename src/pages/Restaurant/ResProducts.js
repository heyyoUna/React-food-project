import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  useHistory,
} from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { imgUrl } from '../../config'
import TitleBorder from '../../components/TitleBorder'
import ResPopular from '../../components/Restaurant/ResPopular'
import { FiPhone } from 'react-icons/fi'
import { RiMapPinLine } from 'react-icons/ri'
import { BsClock } from 'react-icons/bs'
function ResPrdoucts(props) {
  console.log(props)

  const [product, setProduct] = useState([])
  const [restaurant, setRestaurant] = useState([])

  // TODO: 查DB
  useEffect(() => {
    if (props.match.params.id) {
      ;(async () => {
        let r = await fetch(
          'http://localhost:3002/reslist/' +
            props.match.params.id
        )
        let j = await r.json()

        if (j.success) {
          setProduct(j.data.products)
          setRestaurant(j.data.restaurant)
          console.log(j.data.restaurant)
        } else {
          alert('出事了')
        }
      })()
    }
  }, [])

  return (
    <>
      <div className="container p-0 ">
        <div className="ma-80 ">
          <TitleBorder name={restaurant.res_name} />
        </div>

        <div className="row  justify-content-center">
          <div className="col-md-5 col-sm-6 p-0">
            <img
              className="resImg"
              // src={`${imgUrl}/images/res.png`}
              src={
                'http://localhost:3002/img/restaurant/' +
                restaurant.res_introduce_img
              }
              alt=""
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </div>
          <div className="col-md-5 col-sm-6 p-0">
            <div className="res-production">
              <h3>{restaurant.res_introduce}</h3>
            </div>
          </div>
        </div>
        <div className="res-connect text-center">
          <h3>
            <FiPhone
              style={{
                color: '#2a593e',
                fontSize: '26x',
                marginRight: '8px',
                marginBottom: '4px',
              }}
            />
            {restaurant.res_tel}{' '}
          </h3>
          <h3>
            {' '}
            <BsClock
              style={{
                color: '#8FC065',
                marginRight: '8px',
                marginBottom: '4px',
                fontSize: '24px',
              }}
            />
            每週一至週日{restaurant.res_starttime}~
            {restaurant.res_endtime}
          </h3>{' '}
          <h3>
            {' '}
            <RiMapPinLine
              style={{
                color: '#FB6107',
                fontSize: '26px',
                marginRight: '8px',
                marginBottom: '4px',
              }}
            />
            地址:{restaurant.res_address}
          </h3>
        </div>
      </div>
      <div className="ma-80">
        <TitleBorder name="精選產品" />
      </div>
      {/* <ResProductCard  data={data} setData={setData}/> */}
      <div className="container mx-auto">
        <div className="row  justify-content-center ">
          {/* 產品資料 */}
          {console.log('P', product)}
          {product &&
            product.map((v, i) => {
              return (
                <div className="col-md-4 col-12 ">
                  <div class="res-menu m-4">
                    <div className="res-pic-wrapper">
                      <div className="res-product-card-overlay d-flex justify-content-center  ">
                        <a href="https://www.ubereats.com/tw/store/life-kitchen-%E7%94%9F%E6%B4%BB%E5%80%89%E5%BB%9A-%E5%A4%A7%E5%AE%89%E9%96%80%E5%B8%82/tpFP_EXWSCuQHvr2nzwlmQ?pl=JTdCJTIyYWRkcmVzcyUyMiUzQSUyMiVFNSVCRSVBOSVFOCU4OCU4OCVFNSU4RCU5NyVFOCVCNyVBRiVFNCVCOCU4MCVFNiVBRSVCNSUyMiUyQyUyMnJlZmVyZW5jZSUyMiUzQSUyMkVqMVRaV04wYVc5dUlERXNJRVoxZUdsdVp5QlRJRkprTENCRVllS0FtV0Z1SUVScGMzUnlhV04wTENCVVlXbHdaV2tnUTJsMGVTd2dWR0ZwZDJGdUlpNHFMQW9VQ2hJSkI4cFB4OUNyUWpRUk5ZOWR3VlRkNURVU0ZBb1NDVTM0YVJrc3FrSTBFVjJWMmZMTHRhQnUlMjIlMkMlMjJyZWZlcmVuY2VUeXBlJTIyJTNBJTIyZ29vZ2xlX3BsYWNlcyUyMiUyQyUyMmxhdGl0dWRlJTIyJTNBMjUuMDM5Nzg1MyUyQyUyMmxvbmdpdHVkZSUyMiUzQTEyMS41NDM4MjU5JTdE">
                          <div className="res-orderBtn  ">
                            前往訂餐
                          </div>
                        </a>
                      </div>
                      <img
                        className="res-product-Img"
                        // src={`${imgUrl}/images/food.jpg`}
                        src={
                          'http://localhost:3002/img/restaurant/' +
                          v.res_product_img
                        }
                        alt=""
                        style={{
                          width: '100%',
                          height: '165px',
                          borderRadius: '15px 15px 0 0',
                          objectFit: 'cover',
                        }}
                      />
                    </div>

                    <div className="res-product-body fw-700  ">
                      <div className="res-product-title d-flex justify-content-between">
                        <h3>{v.res_product_name}</h3>
                        <h3>NT$ {v.res_product_price}</h3>
                      </div>
                      <div className="res-product-kcal d-flex justify-content-between">
                        <p>蛋白質:{v.protein}g</p>
                        <p>碳水:{v.adipose}g</p>
                        <p>脂防:{v.carbohydrate}g</p>
                      </div>
                      <p className="text-right">
                        熱量:{v.calories}kcal
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </>
  )
}

export default ResPrdoucts
