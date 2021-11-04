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
import PopularExercise from '../../components/article/PopularExercise'
import RelatingExercise from '../../components/article/RelatingExercise'
import ArQARadioButton from '../../components/article/ArQARadioButton'
import { Spinner } from 'react-bootstrap'

function ExerciseContent(props) {
  const [data, setData] = useState([])
  const [options, setOptions] = useState([])
  const [reply, setReply] = useState('')

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
        // console.log('j.data:', j.data)
        setOptions(JSON.parse(j.data.ar_answers))
      }
    })()
  }, [])

  function imgDisplay(aaa) {}

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
            <div>{data.ar_preface}</div>
            <h3>{data.ar_index_title1}</h3>
            <div>{data.ar_index1}</div>
            <div>
              <img
                src={`${API_img}` + data.ar_index_pic1}
                alt=""
              />
            </div>
            <h3>{data.ar_index_title2}</h3>
            <div>{data.ar_index2}</div>
            <div>
              <img
                src={`${API_img}` + data.ar_index_pic2}
                alt=""
              />
            </div>
            <h3>{data.ar_index_title3}</h3>
            <div>{data.ar_index3}</div>
            <div>
              <img
                src={`${API_img}` + data.ar_index_pic3}
                alt=""
              />
            </div>

            <div>
              <iframe
                style={{ display: 'none' }}
                width="560"
                height="315"
                src=""
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </div>
          <div className="col-3 col-lg-3 mostPopular">
            <ul>
              <div className="mostPopularTitle">
                Most Popular
              </div>
              <PopularExercise />
            </ul>
          </div>
          <div className="col-1"></div>
        </div>

        <div className="row article_rec">
          <div className="col-1"></div>
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
    </>
  )
}

export default withRouter(ExerciseContent)
