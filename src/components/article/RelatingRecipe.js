import React, { useState, useEffect } from 'react'
import { API_img, imgUrl } from '../../config/index'
import '../../styles/article/Article.scss'
import { Link } from 'react-router-dom'
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io'
import ArCardTxt from '../../components/article/ArCardTxt'

function RelatingRecipe(props) {
  const [data, setData] = useState([])
  // const [totalRows, setTotalRows] = useState(0)

  useEffect(() => {
    const fcURL = new URL(document.location.href) //目前網頁網址
    const fcSid = fcURL.pathname //目前網址的路徑
    const fcSplit = fcSid.split('/')[2] //將路徑的字串切割，第三個位置就是sid

    ;(async () => {
      let r = await fetch(
        'http://localhost:3002/ArtRecipe/relatingPro/' +
          fcSplit
      )
      let j = await r.json()
      // console.log('j:', j)
      if (j.length) {
        setData(j)
      }
    })()
  }, [])

  return (
    <>
      {data && data.length
        ? data.map((el) => {
            return (
              <>
                <div
                  className="col-3"
                  classname="relatingRecipe"
                >
                  <div>
                    <img
                      src={`${imgUrl}/images/article/col_article_more1-3.png`}
                      alt=""
                    />
                  </div>
                  <ArCardTxt />
                </div>
              </>
            )
          })
        : ''}
    </>
  )
}

export default RelatingRecipe
