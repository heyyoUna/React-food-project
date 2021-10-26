import React from 'react'
import { FiHeart } from 'react-icons/fi'
import { imgUrl } from '../../config'


function ResPopular (props) {
    return (
        <>
               <div className="container mx-auto">
        <div className="row  justify-content-center ">
          <div className="col-md-3 col-12 m-4">
            <div class="res-popular">
              <div className="res-popular-pic-wrapper">
                <img
                  className="foodImg"
                  // src={`${imgUrl}/images/food.jpg`}
                  src={` http://localhost:3000/images/Restaurant/food.jpg`}
                  alt=""
                  style={{
                    width: '100%',
                    height: '160px',
                    borderRadius: '15px 15px 0 0',
                    objectFit: 'cover',
                  }}
                />
              </div>

              <div className="res-popular-body ">
                <div className="res-popular-title d-flex justify-content-between mt-3">
                  <h3>生活倉廚</h3>
                  <span>
                    <FiHeart
                      style={{
                        color: '#FB6107',

                        fontSize: '24px',
                      }}
                    />
                  </span>
                </div>

                <div className="res-popular-prodution">
                  <p>
                    站在每位食用者的立場來料理每一個食材，現點現做，手工修清所有嚴選原肉品。
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-12 m-4">
            <div class="res-popular">
              <div className="res-popular-pic-wrapper">
                <img
                  className="foodImg"
                  src={` http://localhost:3000/images/Restaurant/food.jpg`}
                  alt=""
                  style={{
                    width: '100%',
                    height: '160px',
                    borderRadius: '15px 15px 0 0',
                    objectFit: 'cover',
                  }}
                />
              </div>

              <div className="res-popular-body   ">
                <div className="res-popular-title d-flex justify-content-between mt-3">
                  <h3>生活倉廚</h3>
                  <span>
                    <FiHeart
                      style={{
                        color: '#FB6107',

                        fontSize: '24px',
                      }}
                    />
                  </span>
                </div>

                <div className="res-popular-prodution">
                  <p>
                    站在每位食用者的立場來料理每一個食材，現點現做，手工修清所有嚴選原肉品。
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-12 m-4">
            <div class="res-popular">
              <div className="res-popular-pic-wrapper">
                <img
                  className="foodImg"
                  src={` http://localhost:3000/images/Restaurant/food.jpg`}
                  alt=""
                  style={{
                    width: '100%',
                    height: '160px',
                    borderRadius: '15px 15px 0 0',
                    objectFit: 'cover',
                  }}
                />
              </div>

              <div className="res-popular-body ">
                <div className="res-popular-title d-flex justify-content-between mt-3">
                  <h3>生活倉廚</h3>
                  <span>
                    <FiHeart
                      style={{
                        color: '#FB6107',

                        fontSize: '24px',
                      }}
                    />
                  </span>
                </div>

                <div className="res-popular-prodution">
                  <p>
                    站在每位食用者的立場來料理每一個食材，現點現做，手工修清所有嚴選原肉品。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        </>
    )
}



export default ResPopular

