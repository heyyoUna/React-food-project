import React, { useState, useEffect } from 'react'
import { API_img, imgUrl } from '../../config/index'
import '../../styles/article/Article.scss'
import { Link } from 'react-router-dom'
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io'

function RelatingRecipe(props) {
  const [product, setProduct] = useState([])

  useEffect(() => {
    //將路徑的字串切割，第三個位置就是sid

    ;(async () => {
      let r = await fetch(
        'http://localhost:3002/ArtFood/FoodContent/relatingArt'
      )
      let j = await r.json()

      if (j.length) {
        setProduct(j)
      }
    })()
  }, [])

  //轉換時間格式
  function articleDate(aaa) {
    let time = new Date(aaa)
    let year = time.getFullYear()
    let month = time.getMonth()
    let date = time.getDate()

    return `${year} / ${month + 1} / ${date} `
  }

  return (
    <>
      {product && product.length
        ? product.map((el) => {
            return (
              <>
                <div className="artColCards cardsHover col-3">
                  <Link
                    onClick={() => {
                      window.location.href =
                        '/FoodContent/' + el.sid
                    }}
                  >
                    <div className="imgWrap col-lg">
                      <img
                        src={`${API_img}` + el.ar_pic}
                        alt=""
                      />
                    </div>
                  </Link>

                  <div className="px-1 py-1 arCardTxt">
                    <div className="d-flex justify-content-between pr-5">
                      <p className="grey">聰明飲食</p>
                      <i class="far fa-heart pt-1 me-3"></i>
                    </div>
                    <h6 className="productTitle f_darkgreen pt-1">
                      {el.ar_title}
                    </h6>
                    <p className="pb-1 grey articleDate">
                      {articleDate(el.ar_date)}
                    </p>
                  </div>
                </div>
              </>
            )
          })
        : ''}
    </>
  )
}

export default RelatingRecipe
