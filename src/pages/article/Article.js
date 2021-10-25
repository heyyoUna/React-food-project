import { withRouter } from 'react-router-dom'
import React from 'react'
import { imgUrl } from '../../config'
import './Article.scss'
import ArCardTxt from '../../components/article/ArCardTxt'
import LineTitle from '../../components/article/LineTitle'

function Article(props) {
  return (
    <>
      {/* <!------------ 專欄KV ------------>  */}
      <div className="container-fluid mt-5" id="article-kv">
        <div
          id="carouselExampleCaptions"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src={`${imgUrl}/images/article/col_kv1-3.png`}
                className="d-block w-100"
                alt=""
              />
              <div className="carousel-caption d-none d-md-block car-title">
                從歐美名人圈紅到台灣，
                <br />
                康普茶到底是什麼？
              </div>
            </div>
            <div className="carousel-item">
              <img
                src={`${imgUrl}/images/article/col_kv1-3.png`}
                className="d-block w-100"
                alt=""
              />
              <div className="carousel-caption d-none d-md-block car-title">
                我是第二張
                <br />
                投影片
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="..."
                className="d-block w-100"
                alt="..."
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>Third slide label</h5>
                <p>
                  Some representative placeholder content
                  for the third slide.
                </p>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">
              Previous
            </span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      {/* <!------------ 專欄頁： 1st種類 聰明飲食  ------------>   */}
      <div className="container" id="col-cat">
        <LineTitle text="聰明飲食" />

        <div className="row" id="col-cat1">
          <div className="col-lg-7">
            <div className="col-cat-firstImg">
              <img
                src={`${imgUrl}/images/article/col_cat1_1-3.png`}
                alt=""
              />
            </div>
            <ArCardTxt />
          </div>
          <div className="col-lg-5">
            <div className="col-cat1-s">
              <div className="imgWrap">
                <img
                  src={`${imgUrl}/images/article/col_cat1_2-3.png`}
                  alt=""
                />
              </div>
              <ArCardTxt />
            </div>

            <div className="col-cat1-s">
              <div className="imgWrap">
                <img
                  src={`${imgUrl}/images/article/col_cat1_2-3.png`}
                  alt=""
                />
              </div>
              <ArCardTxt />
            </div>
          </div>
        </div>

        <div className="col_RM_btn">
          <button>更多文章</button>
        </div>

        {/* <!------------ 專欄頁： 2nd 種類 運動  ------------>   */}
        <LineTitle text="運動訓練" />

        <div className="row" id="col-cat2">
          <div className="col-lg">
            <div className="col-cat-firstImg">
              <img
                src={`${imgUrl}/images/article/col_cat2_1-3.png`}
                alt=""
              />
            </div>
            <ArCardTxt />
          </div>

          <div className="col-lg">
            <div className="col-cat-firstImg">
              <img
                src={`${imgUrl}/images/article/col_cat2_1-3.png`}
                alt=""
              />
            </div>
            <ArCardTxt />
          </div>

          <div className="col-lg">
            <div className="col-cat-firstImg">
              <img
                src={`${imgUrl}/images/article/col_cat2_1-3.png`}
                alt=""
              />
            </div>
            <ArCardTxt />
          </div>
        </div>
        <div className="col_RM_btn">
          <button>更多文章</button>
        </div>

        {/* <!------------ 專欄頁： 3rd 種類 美味食譜  ------------>   */}
        <LineTitle text="美味食譜" />
        <div className="row" id="col-cat3">
          <div className="col-lg">
            <div className="imgWrap">
              <img
                src={`${imgUrl}/images/article/col_cat3.png`}
                alt=""
              />
            </div>
            <ArCardTxt />
          </div>
          <div className="col-lg colList">
            <ul>
              <div>
                <li>
                  肉吃太多讓你被蚊子叮？ 容易累？都是迷思！
                </li>
                <span>
                  <i className="far fa-heart"></i>
                </span>
              </div>
              <div>
                <li>
                  肉吃太多讓你被蚊子叮？ 容易累？都是迷思！
                </li>
                <span>
                  <i className="far fa-heart"></i>
                </span>
              </div>
              <div>
                <li>
                  肉吃太多讓你被蚊子叮？ 容易累？都是迷思！
                </li>
                <span>
                  <i className="far fa-heart"></i>
                </span>
              </div>
              <div>
                <li>
                  肉吃太多讓你被蚊子叮？ 容易累？都是迷思！
                </li>
                <span>
                  <i className="far fa-heart"></i>
                </span>
              </div>
              <div>
                <li>
                  肉吃太多讓你被蚊子叮？ 容易累？都是迷思！
                </li>
                <span>
                  <i className="far fa-heart"></i>
                </span>
              </div>
            </ul>
          </div>
        </div>
        <div className="col_RM_btn">
          <button>更多文章</button>
        </div>
      </div>
    </>
  )
}

export default withRouter(Article)
