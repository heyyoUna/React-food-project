import React, { useEffect, useState } from 'react'
import { FiHeart } from 'react-icons/fi'
import { imgUrl } from '../../config'

function ResPopular(props) {
  const [popular, setPopular] = useState([])

  useEffect(() => {
    ;(async () => {
      let r = await fetch(
        'http://localhost:3002/reslist/popular/list'
      )

      let data = await r.json()
      console.log('data', data)
      if (data.length) {
        setPopular(data)
      } else {
        alert('出事了')
      }
    })()
  }, [])
  return (
    <>
      <div className="container mx-auto">
        <div className="row  justify-content-center ">
          {popular &&
            popular.map((v, i) => {
              return (
                <div className="col-md-3 col-12 m-4">
                  <div class="res-popular">
                    <div className="res-popular-pic-wrapper">
                      <img
                        className="foodImg"
                        // src={`${imgUrl}/images/food.jpg`}
                        src={
                          'http://localhost:3002/img/restaurant/' +
                          v.res_img
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
                        <h3>{v.res_name}</h3>
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
                        <p>{v.res_introduce}</p>
                      </div>
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

export default ResPopular
