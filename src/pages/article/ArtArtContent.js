// 在第三個斷點就變成手機版 lg
// <img src={`${imgUrl}/images/col_kv1-3.png`} alt="" />

import React from 'react'
import { withRouter } from 'react-router-dom'
import { imgUrl } from './config'
import '../../styles/article/Article.scss'
import ArCardTxt from './components/ArCardTxt'
import ArMoreBtn from './components/ArMoreBtn'
import BreadCrumb from '../../components/BreadCrumb'

function ArtArtContent() {
  return (
    <>
      <div className="container-fluid" id="col-article">
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
            <h3>
              你還在一頁式網站買「在地」農產品?小心網購和包裹成非洲豬瘟入侵破口
            </h3>
            <div>
              <img
                src={`${imgUrl}/images/col_article_kv.png`}
                alt=""
              />
            </div>
            <div className="art-hotlight">
              <p>
                非洲豬瘟對於台灣的入侵從未中斷，但形式逐漸從個人攜帶入境，改為主要由網購、境外包裹入侵台灣，農委會副主委黃金城呼籲民眾小心「一頁式網站」銷售謊稱台灣在地生產的境外肉製品，也切勿從國外攜帶或寄送違規物品，以免受罰甚至危害台灣養豬業。
              </p>
            </div>
            <h3>
              個人攜帶境外肉品比例逐漸下降
              網購成為防疫新破口
            </h3>

            <div>
              自從非洲豬瘟在2018年時在全球爆發後，台灣仰賴嚴格把關「個人攜帶入境」，在亞洲與日本同為少數成功守住的國家之一，但關務署副署長陳依財表示，最容易成為非洲豬瘟破口的部分為旅客挾帶、包裹，近3年旅客挾帶數量減少，反而是包裹量劇增，2021年1至9月，查緝邊境違法攜入物品案件分別為旅客挾帶19件，郵包135件。
            </div>

            <div>
              黃金城強調，這並不只是關務署的責任，近年許多民眾在過年過節時，經常會自國外寄送肉品如肉乾禮盒、含肉月餅等至國內，或是在社群平台如臉書（Facebook）、電商平台上的一頁式詐騙網站購買謊稱是台灣在地農產，事實上來自境外的商品，他提醒民眾對於網路購物保持警戒，才能守護台灣淨土。
            </div>

            <div className="QA">
              <h3> 一般民眾如何在防堵非洲豬瘟盡一份力？</h3>
              <ul>
                <li>A在一頁式網站購物</li>
                <li>B在一頁式網站購物</li>
              </ul>
              <ul>
                <li>C在一頁式網站購物</li>
                <li>D在一頁式網站購物</li>
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
                src={`${imgUrl}/images/col_article_more1-3.png`}
                alt=""
              />
            </div>
            <ArCardTxt />
          </div>
          <div className="col-3">
            <div>
              <img
                src={`${imgUrl}/images/col_article_more1-3.png`}
                alt=""
              />
            </div>
            <ArCardTxt />
          </div>{' '}
          <div className="col-3">
            <div>
              <img
                src={`${imgUrl}/images/col_article_more1-3.png`}
                alt=""
              />
            </div>
            <ArCardTxt />
          </div>
          <ArMoreBtn />
        </div>
      </div>
    </>
  )
}

export default withRouter(ArtArtContent)
