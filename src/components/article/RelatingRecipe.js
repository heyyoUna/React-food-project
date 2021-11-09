import React, { useState, useEffect } from 'react'
import { API_img, imgUrl } from '../../config/index'
import '../../styles/article/Article.scss'
import { Link } from 'react-router-dom'
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io'
import ArCardTxt from '../../components/article/ArCardTxt'

function RelatingRecipe(props) {
  const fcURL = new URL(document.location.href) //目前網頁網址
  const fcSid = fcURL.pathname //目前網址的路徑
  const fcSplit = fcSid.split('/')[2]
  const [product, setProduct] = useState([])

  useEffect(() => {
    //將路徑的字串切割，第三個位置就是sid

    ;(async () => {
      let r = await fetch(
        'http://localhost:3002/ArtRecipe/relatingPro/' +
          fcSplit
      )
      let j = await r.json()

      if (j.success) {
        setProduct(j.pop)
      }
    })()
  }, [])

  return (
    <>
      {product && product.length
        ? product.map((el) => {
            return (
              <>
                <div className="col-3">
                  <Link
                    onClick={() => {
                      window.location.href =
                        '/product/' + el.sid
                    }}
                  >
                    <div className="imgWrap">
                      <img
                        src={`http://localhost:3002/img/Product/${el.product_img}`}
                        alt=""
                      />
                    </div>
                    <div className="recipeRelPro d-flex">
                      <div className="pd-name">
                        {el.name}
                      </div>
                      <p className="pd-cal">
                        {el.cal} Calories
                      </p>
                      <p className="pd-price">
                        NT$ {el.price}
                      </p>
                      <div className="pd-btn-wrap d-flex">
                        <button className="pd-order-btn">
                          detail
                        </button>
                      </div>
                    </div>
                  </Link>
                </div>
              </>
            )
          })
        : ''}
    </>
  )
}

export default RelatingRecipe
