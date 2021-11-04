import React, { useState, useEffect } from 'react'
import {
  withRouter,
  BrowserRouter as Router,
  Link,
} from 'react-router-dom'
import { API_img } from '../../config/index'
import '../../styles/article/Article.scss'

import HpArMoreBtn from '../../components/HpArMoreBtn'
import BreadCrumb from '../../components/BreadCrumb'
import PopularRecipe from '../../components/article/PopularRecipe'
import RelatingRecipe from '../../components/article/RelatingRecipe'
// import ReceipeIngredient from '../../components/article/ReceipeIngredient'

function FoodContent(props) {
  const [data, setData] = useState([])
  const [ingredient, setIngredient] = useState([])
  const [steps, setSteps] = useState([])

  useEffect(() => {
    const fcURL = new URL(document.location.href) //目前網頁網址
    const fcSid = fcURL.pathname //目前網址的路徑
    const fcSplit = fcSid.split('/')[2] //將路徑的字串切割，第三個位置就是sid

    ;(async () => {
      let r = await fetch(
        'http://localhost:3002/ArtRecipe/' + fcSplit
      )
      let j = await r.json()

      if (j.success) {
        setData(j.data)
        setIngredient(JSON.parse(j.data.ar_rec_ingredient))
        setSteps(JSON.parse(j.data.ar_rec_process))
      }
    })()
  }, [])

  return (
    <>
      <div
        className="container-fluid pt-5"
        id="col-article"
      >
        <BreadCrumb />

        {/* <!------------ 互動nav ------------>   */}
        <div className="row interNav">
          <div className="col-1"></div>
          <div className="col-7">
            <div>
              <i class="fas fa-glasses"></i>
            </div>
            <p>200</p>
            <div>
              <i class="far fa-heart"></i>
            </div>
            <p>收藏</p>
          </div>
        </div>
        {/* <!------------ 正文 ------------>   */}
        <div className="row">
          <div className="col-1"></div>
          <div className="col-7 col-lg-7">
            <h3>{data.ar_title}</h3>
            <div className="imgWrap">
              <img
                src={`${API_img}` + data.ar_pic}
                alt=""
              />
            </div>
            <div className="text-center">
              <h3>材料</h3>
              <p>（ 約{data.ar_rec_quan}人份 ）</p>
            </div>
            <ul>{/* {data.ar_rec_ingredient} */}</ul>

            <div className="text-center">
              <h3>步驟</h3>
              <p>
                （ 料理時間{data.ar_rec_cookTime}分鐘 ）
              </p>
            </div>
            <ul>{/* {data.ar_rec_process} */}</ul>

            <div>{data.ar_index1}</div>
          </div>

          <div className="col-3 col-lg-3 mostPopular popularWeb">
            <ul>
              <div className="mostPopularTitle">
                Most Popular
              </div>
              <PopularRecipe />
            </ul>
          </div>

          <div className="col-1"></div>
        </div>

        <div className="row article_rec">
          <div className="col-1"></div>
          <RelatingRecipe />
          <HpArMoreBtn />
        </div>

        <div className="col-3 col-lg-3 mostPopular popularMobile">
          <ul>
            <div className="mostPopularTitle">
              Most Popular
            </div>
            <PopularRecipe />
          </ul>
        </div>
      </div>
    </>
  )
}

export default withRouter(FoodContent)
