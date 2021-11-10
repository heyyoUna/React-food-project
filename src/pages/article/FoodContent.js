import React, { useState, useEffect } from 'react'
import {
  withRouter,
  BrowserRouter as Router,
  Link,
} from 'react-router-dom'
import { API_img } from '../../config/index'
import '../../styles/article/Article.scss'
import HpArMoreBtn from '../../components/HpArMoreBtn'
import PopularFood from '../../components/article/PopularFood'
import RelatingFood from '../../components/article/RelatingFood'
import ArQARadioButton from '../../components/article/ArQARadioButton'
import { Spinner } from 'react-bootstrap'
import { IoIosHeartEmpty } from 'react-icons/io'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

function FoodContent(props) {
  const token = localStorage.getItem('token')
  const ID = localStorage.getItem('id')

  const fcURL = new URL(document.location.href) //目前網頁網址
  const fcSid = fcURL.pathname //目前網址的路徑
  const fcSplit = fcSid.split('/')[2] //將路徑的字串切割，第三個位置就是sid

  const [data, setData] = useState([])
  const [options, setOptions] = useState([])
  const [reply, setReply] = useState('')

  useEffect(() => {
    ;(async () => {
      let r = await fetch(
        'http://localhost:3002/ArtFood/' + fcSplit
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
        {/* <BreadCrumb /> */}

        {/* <!------------ 互動nav ------------>   */}
        <div className="row interNav">
          <div className="col-1"></div>
          <div className="col-7 my-auto">
            <div>
              <i class="fas fa-graduation-cap"></i>
            </div>
            <p>{data.ar_inter}</p>
            <div className="pd-love-icon">
              <IoIosHeartEmpty />
            </div>
            <p>收藏</p>
          </div>
        </div>
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
            <div className="art-hotlight">
              <i className="fas fa-quote-left px-5 pt-5"></i>
              <p>{data.ar_highlight}</p>
              <div className="rightCommaWrap">
                <i className="fas fa-quote-left px-5 pb-5 rightComma"></i>
              </div>
            </div>
            <h3 className="dark-green py-4">
              {data.ar_index_title1}
            </h3>
            <div>{data.ar_index1}</div>
            <h3 className="dark-green py-4">
              {data.ar_index_title2}
            </h3>
            <div>{data.ar_index2}</div>
            <h3 className="dark-green py-4">
              {data.ar_index_title3}
            </h3>
            <div>{data.ar_index3}</div>
            <form className="mt-5">
              <div className="QA">
                <h3 className="py-3">{data.ar_question}</h3>
                <ul>
                  {/* {console.log('options', options)} */}
                  <></>
                  {options ? (
                    options.map((v, i) => {
                      return (
                        <ArQARadioButton
                          name="reply"
                          key={i}
                          value={v}
                          checkedReply={reply}
                          setCheckReply={setReply}
                        />
                      )
                    })
                  ) : (
                    <Spinner
                      animation="border"
                      variant="primary"
                    />
                  )}
                </ul>
              </div>
            </form>
          </div>
          <div className="col-3 mostPopular">
            <ul>
              <div className="mostPopularTitle">
                Most Popular
              </div>
              <PopularFood />
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
            <RelatingFood />
            <Link
              className="col-1 mx-auto my-auto"
              onClick={() => {
                window.location.href = '/article/food'
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

export default withRouter(FoodContent)
