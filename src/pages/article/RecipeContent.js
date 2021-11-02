import React, { useState, useEffect } from 'react'
import {
  withRouter,
  BrowserRouter as Router,
  Link,
} from 'react-router-dom'
import { imgUrl, API_img } from '../../config/index'
import '../../styles/article/Article.scss'
import ArCardTxt from '../../components/article/ArCardTxt'
import HpArMoreBtn from '../../components/HpArMoreBtn'
import BreadCrumb from '../../components/BreadCrumb'
import ArQARadioButton from '../../components/article/ArQARadioButton'
import { Spinner } from 'react-bootstrap'
import PopularRecipe from '../../components/article/PopularRecipe'
import RelatingRecipe from '../../components/article/RelatingRecipe'

function FoodContent(props) {
  const fcURL = new URL(document.location.href) //目前網頁網址
  const fcSid = fcURL.pathname //目前網址的路徑
  const fcSplit = fcSid.split('/')[2] //將路徑的字串切割，第三個位置就是sid

  const [data, setData] = useState([])
  const [options, setOptions] = useState([])
  const [reply, setReply] = useState('')

  useEffect(() => {
    ;(async () => {
      let r = await fetch(
        'http://localhost:3002/ArtRecipe/' + fcSplit
      )
      let j = await r.json()

      if (j.success) {
        setData(j.data)
        // console.log('j.data:', j.data)
        setOptions(JSON.parse(j.data.ar_answers))
      }
    })()
  }, [])

  // 在 表單完成驗証 之後，才會觸發
  const handleSubmit = (e) => {
    // 阻擋form的預設送出行為
    e.preventDefault()

    // 利用FormData Api 得到各欄位的值 or 利用狀態值
    // FormData 利用的是表單元素的 name
    const formData = new FormData(e.target)
  }

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
              <i class="fas fa-graduation-cap"></i>
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
            <div>
              <img
                src={`${API_img}` + data.ar_pic}
                alt=""
              />
            </div>
            <div className="art-hotlight">
              <p>{data.ar_highlight}</p>
            </div>
            <h3>{data.ar_index_title1}</h3>
            <div>{data.ar_index1}</div>
            <h3>{data.ar_index_title2}</h3>
            <div>{data.ar_index2}</div>
            <h3>{data.ar_index_title3}</h3>
            <div>{data.ar_index3}</div>
          </div>

          <div className="col-3 col-lg-3" id="mostPopular">
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
      </div>
    </>
  )
}

export default withRouter(FoodContent)
