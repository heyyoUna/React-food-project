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

function FoodContent(props) {
  const [data, setData] = useState([])
  const fcURL = new URL(document.location.href) //目前網頁網址
  // console.log('fcURL:', fcURL)
  const fcSid = fcURL.pathname //目前網址的路徑
  // console.log('fcid:', fcSid)
  const fcSplit = fcSid.split('/')[2] //將路徑的字串切割，第三個位置就是sid
  // console.log('fcsplit[2]:', fcSplit)

  useEffect(() => {
    ;(async () => {
      let r = await fetch(
        'http://localhost:3002/ArtFood/' + fcSplit
      )
      let j = await r.json()

      if (j.success) {
        // setProduct(j.products)
        setData(j.data)
        console.log(j.data)
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

            <div className="QA">
              <h3> {data.ar_question}</h3>
              <ul>
                <li>{data.ar_answers}</li>
              </ul>
              <div>
                <button className="QAbtn">作答</button>
              </div>
            </div>
          </div>
          <div className="col-3 col-lg-3" id="mostPopular">
            <ul>
              <div className="mostPopularTitle">
                {' '}
                Most Popular
              </div>
              <div className="d-flex my-3 mostPopularItems">
                <li>
                  芒果營養成分新發現！有治療阿茲海默症潛力
                </li>
                <div className="heartWrap my-2 mx-3">
                  <i className="far fa-heart"></i>
                </div>
              </div>
              <div className="d-flex my-3 mostPopularItems">
                <li>
                  芒果營養成分新發現！有治療阿茲海默症潛力
                </li>
                <div className="heartWrap my-2 mx-3">
                  <i className="far fa-heart"></i>
                </div>
              </div>
              <div className="d-flex my-3 mostPopularItems">
                <li>
                  芒果營養成分新發現！有治療阿茲海默症潛力
                </li>
                <div className="heartWrap my-2 mx-3">
                  <i className="far fa-heart"></i>
                </div>
              </div>
              <div className="d-flex my-3 mostPopularItems">
                <li>
                  芒果營養成分新發現！有治療阿茲海默症潛力
                </li>
                <div className="heartWrap my-2 mx-3">
                  <i className="far fa-heart"></i>
                </div>
              </div>
              <div className="d-flex my-3 mostPopularItems">
                <li>
                  芒果營養成分新發現！有治療阿茲海默症潛力
                </li>
                <div className="heartWrap my-2 mx-3">
                  <i className="far fa-heart"></i>
                </div>
              </div>
            </ul>
          </div>
          <div className="col-1"></div>
        </div>

        <div className="row article_rec">
          <div className="col-1"></div>
          <div className="col-3">
            <div>
              <img
                src={`${imgUrl}/images/article/col_article_more1-3.png`}
                alt=""
              />
            </div>
            <ArCardTxt />
          </div>
          <div className="col-3">
            <div>
              <img
                src={`${imgUrl}/images/article/col_article_more1-3.png`}
                alt=""
              />
            </div>
            <ArCardTxt />
          </div>{' '}
          <div className="col-3">
            <div>
              <img
                src={`${imgUrl}/images/article/col_article_more1-3.png`}
                alt=""
              />
            </div>
            <ArCardTxt />
          </div>
          <HpArMoreBtn />
        </div>
      </div>
    </>
  )
}

export default withRouter(FoodContent)
