import React, { useState, useEffect } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { API_img } from '../../config/index'
import '../../styles/article/Article.scss'

import HpArMoreBtn from '../../components/HpArMoreBtn'
import PopularExercise from '../../components/article/PopularExercise'
import RelatingExercise from '../../components/article/RelatingExercise'

function ExerciseContent(props) {
  const [data, setData] = useState([])
  const [options, setOptions] = useState([])

  useEffect(() => {
    const fcURL = new URL(document.location.href) //目前網頁網址
    const fcSid = fcURL.pathname //目前網址的路徑
    const fcSplit = fcSid.split('/')[2] //將路徑的字串切割，第三個位置就是sid
    ;(async () => {
      let r = await fetch(
        'http://localhost:3002/ArtExercise/' + fcSplit
      )
      let j = await r.json()

      if (j.success) {
        setData(j.data)
        setOptions(JSON.parse(j.data.ar_answers))
      }
    })()
  }, [])

  return (
    <>
      <div className="container-fluid pt-5 col-article">
        {/* <!------------ 正文 ------------>   */}
        <div className="row contentMobileFlex">
          {/* <div className="col-1"></div> */}
          <div className="col-7">
            <h3>{data.ar_title}</h3>
            <figure className="imgWrap">
              <img
                src={`${API_img}` + data.ar_pic}
                alt=""
              />
            </figure>
            <div>{data.ar_preface}</div>
            <h3 className="dark-green py-3">
              {data.ar_index_title1}
            </h3>
            <div>{data.ar_index1}</div>
            <figure className="imgWrap my-3 py-3">
              <img
                src={`${API_img}` + data.ar_index_pic1}
                alt=""
              />
            </figure>
            <h3 className="dark-green py-3">
              {data.ar_index_title2}
            </h3>
            <div>{data.ar_index2}</div>
            <figure className="imgWrap py-3">
              <img
                src={`${API_img}` + data.ar_index_pic2}
                alt=""
              />
            </figure>
            <h3 className="dark-green py-4">
              {data.ar_index_title3}
            </h3>
            <div>{data.ar_index3}</div>
            <figure className="imgWrap py-3">
              <img
                src={`${API_img}` + data.ar_index_pic3}
                alt=""
              />
            </figure>
          </div>
          <div className="col-3 mostPopular">
            <ul>
              <div className="mostPopularTitle">
                Most Popular
              </div>
              <PopularExercise />
            </ul>
          </div>
          {/* <div className="col-1"></div> */}
        </div>

        <div className="row article_rec">
          <div className="col-1"></div>

          <div className="text-center articleRecom d-flex my-5 dark-green">
            <hr className="col my-auto" />
            <div className="col-5 my-3">
              <h4>推薦文章</h4>
            </div>
            <hr className="col my-auto" />
          </div>
          <div className="row artColCardsWrap">
            <RelatingExercise />
            <Link
              className="col-1 mx-auto my-auto"
              onClick={() => {
                window.location.href = '/article/exercise'
              }}
            >
              <HpArMoreBtn />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default withRouter(ExerciseContent)
