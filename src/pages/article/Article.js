import { withRouter } from 'react-router-dom'
import React from 'react'
import { imgUrl, API_img } from '../../config/index'
import '../../styles/article/Article.scss'
import ArCardTxt from '../../components/article/ArCardTxt'
import LineTitle from '../../components/article/LineTitle'
import { Carousel } from 'react-bootstrap'

function Article(props) {
  return (
    <>
      {/* <!------------ 專欄KV ------------>  */}
      <div className="container-fluid mt-5 p-0">
        <div className="row p-0 mx-auto">
          <Carousel id="article-kv" className="p-0">
            <Carousel.Item className="imgWrap">
              <img
                className="d-block "
                src={`${imgUrl}/images/article/col_kv1-3.jpg`}
                alt="First slide"
              />
              <Carousel.Caption className="car-title"></Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item className="imgWrap">
              <img
                className="d-block "
                src={`${imgUrl}/images/article/col_cat3.png`}
                alt="Second slide"
              />

              <Carousel.Caption className="car-title">
                <h3>Second slide label</h3>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item className="imgWrap">
              <img
                className="d-block "
                src={`${imgUrl}/images/article/col_cat1_2-3.png`}
                alt="Third slide"
              />

              <Carousel.Caption className="car-title">
                <h3>Third slide label</h3>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
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
                src={`${API_img} + {data.ar_pic} `}
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
