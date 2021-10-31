import React, { useEffect, useState } from 'react'
import { imgUrl } from '../../config'

function ResProductCard(props) {
  const { data, setData } = props

  useEffect(() => {
    if (props.match.params.id) {
      ;(async () => {
        console.log(props)
        let r = await fetch(
          'http://localhost:3002/reslist/' +
            props.match.params.id
        )
        let j = await r.json()

        if (j.success) {
          setData(j.data)
        } else {
          alert('出事了')
        }
        console.log(j)
      })()
    }
  }, [])

  return (
    <>
      <div className="container mx-auto">
        <div className="row  justify-content-center ">
          {/* {data.length > 0 && data.map((el,i)=>{ */}
          <div className="col-md-3 col-12 m-4">
            <div class="res-menu">
              <div className="res-pic-wrapper">
                <img
                  className="res-product-Img"
                  // src={`${imgUrl}/images/food.jpg`}
                  src={`http://localhost:3000/images/Restaurant/food.jpg`}
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
                  <h3>{data.res_product_name}</h3>
                  <h3>NT$ {data.res_product_price}</h3>
                </div>
                <div className="res-product-kcal d-flex justify-content-between">
                  <p>蛋白質:{data.protein}</p>
                  <p>碳水:{data.adipose}</p>
                  <p>脂防:{data.carbohydrate}</p>
                </div>
                <p className="text-right">
                  熱量:{data.carbohydrate}
                </p>
              </div>
            </div>
          </div>
          // })}
          {/* <div className="col-md-3 col-12 m-4">
            <div class="res-menu">
              <div className="res-pic-wrapper">
                <img
                  className="res-product-Img"
                  src={`http://localhost:3000/images/Restaurant/food.jpg`}
                  alt=""
                  style={{
                    width: '100%',
                    height: '165px',
                    borderRadius: '15px 15px 0 0',
                    objectFit: 'cover',
                  }}
                />
              </div>

              <div className="res-product-body fw-700 ">
                <div className="res-product-title d-flex justify-content-between">
                  <h3>椒鹽松阪豬</h3>
                  <h3>NT$ 270</h3>
                </div>
                <div className="res-product-kcal d-flex justify-content-between">
                  <p>蛋白質:34g</p>
                  <p>碳水:80g</p>
                  <p>脂防:5.8g</p>
                </div>
                <p className="text-right">熱量:513kcal</p>
              </div>
            </div>
          </div>

          <div className="col-md-3 col-12 m-4">
            <div class="res-menu">
              <div className="res-pic-wrapper">
                <img
                  className="res-product-Img"
                  src={`http://localhost:3000/images/Restaurant/food.jpg`}
                  alt=""
                  style={{
                    width: '100%',
                    height: '165px',
                    borderRadius: '15px 15px 0 0',
                    objectFit: 'cover',
                  }}
                />
              </div>

              <div className="res-product-body fw-700 ">
                <div className="res-product-title d-flex justify-content-between">
                  <h3>椒鹽松阪豬</h3>
                  <h3>NT$ 270</h3>
                </div>
                <div className="res-product-kcal d-flex justify-content-between">
                  <p>蛋白質:34g</p>
                  <p>碳水:80g</p>
                  <p>脂防:5.8g</p>
                </div>
                <p className="text-right">熱量:513kcal</p>
              </div>
            </div>
          </div>
          <div className="w-100"></div>
          <div className="col-md-3 col-12 m-4">
            <div class="res-menu">
              <div className="res-pic-wrapper">
                <img
                  className="res-product-Img"
                  src={`http://localhost:3000/images/Restaurant/food.jpg`}
                  alt=""
                  style={{
                    width: '100%',
                    height: '165px',
                    borderRadius: '15px 15px 0 0',
                    objectFit: 'cover',
                  }}
                />
              </div>

              <div className="res-product-body fw-700 ">
                <div className="res-product-title d-flex justify-content-between">
                  <h3>椒鹽松阪豬</h3>
                  <h3>NT$ 270</h3>
                </div>
                <div className="res-product-kcal d-flex justify-content-between">
                  <p>蛋白質:34g</p>
                  <p>碳水:80g</p>
                  <p>脂防:5.8g</p>
                </div>
                <p className="text-right">熱量:513kcal</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-12 m-4">
            <div class="res-menu">
              <div className="res-pic-wrapper">
                <img
                  className="res-product-Img"
                  src={`http://localhost:3000/images/Restaurant/food.jpg`}
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
                  <h3>椒鹽松阪豬</h3>
                  <h3>NT$ 270</h3>
                </div>
                <div className="res-product-kcal d-flex justify-content-between">
                  <p>蛋白質:34g</p>
                  <p>碳水:80g</p>
                  <p>脂防:5.8g</p>
                </div>
                <p className="text-right">熱量:513kcal</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-12 m-4">
            <div class="res-menu">
              <div className="res-pic-wrapper">
                <img
                  className="res-product-Img"
                  src={`http://localhost:3000/images/Restaurant/food.jpg`}
                  alt=""
                  style={{
                    width: '100%',
                    height: '165px',
                    borderRadius: '15px 15px 0 0',
                    objectFit: 'cover',
                  }}
                />
              </div>

              <div className="res-product-body fw-700 ">
                <div className="res-product-title d-flex justify-content-between">
                  <h3>椒鹽松阪豬</h3>
                  <h3>NT$ 270</h3>
                </div>
                <div className="res-product-kcal d-flex justify-content-between">
                  <p>蛋白質:34g</p>
                  <p>碳水:80g</p>
                  <p>脂防:5.8g</p>
                </div>
                <p className="text-right">熱量:513kcal</p>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  )
}

export default ResProductCard
