import React from 'react'
import { imgUrl } from '../config/index'
import HpArMoreBtn from '../components/HpArMoreBtn'
import HpSBtn from '../components/HpSBtn'
import HpFixedBgc from '../components/HpFixedBgc'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'

function Home(props) {
  // const { auth } = props
  return (
    <>
      <div className="container-fluid px-0" id="hpTotal">
        <div className="row" id="hpKv">
          {/* <!-- ---------- KV Navbar ---------- --> */}
          <div
            id="HP_KV_navbar_wrap"
            className="col-lg-1 px-0"
          >
            <div id="icons">
              <a href="#/">
                <div>
                  <i className="far fa-handshake"></i>
                </div>
                <span className="HP_KV_logo_words">
                  量身訂做
                </span>
              </a>

              <p>x</p>

              <a href="#hp_shop_Cat_1">
                <div>
                  <i className="fas fa-shopping-basket"></i>
                </div>
                <span className="HP_KV_logo_words">
                  好食商城
                </span>
              </a>

              <p>x</p>

              <a href="#hpArticle">
                <div>
                  <i className="fas fa-book"></i>
                </div>
                <span className="HP_KV_logo_words">
                  好食專欄
                </span>
              </a>

              <p>x</p>

              <a href="#hpRes">
                <div>
                  <i className="fas fa-utensils"></i>
                </div>
                <span className="HP_KV_logo_words">
                  健康餐盒
                </span>
              </a>
            </div>
          </div>

          {/* <!-- ---------- KV 標題  ---------- --> */}
          <div id="HP_KV_title_wrap" className="col-lg-4">
            <div className="HP_KV_title HP_KV_title_main">
              <div className="pb-3">
                <h1 className="bannerTitle">良辰即食</h1>
              </div>

              <div>
                <p className="bannerSubTitle ">
                  在每個需要食光 <br />
                  讓美味快速上桌
                </p>
              </div>
            </div>
          </div>

          {/* <!-- ---------- KV 輪播照片 ---------- -->    */}
          <div
            id="HP_KV_img_frame"
            className="col-lg-7 px-0"
          >
            <figure className="HP_KV_img">
              <img
                className="first"
                src={`${imgUrl}/images/hp_kv2-4.jpg`}
                alt=""
              />
            </figure>
            <figure className="spin">
              <Link to="/game/GameChoose">
                <img
                  className="first"
                  src={`${imgUrl}/images/spin.png`}
                  alt=""
                />
              </Link>
            </figure>
          </div>
        </div>
        {/* 背景圖 */}
        <HpFixedBgc />
        {/* <!---------------------- shop ----------------------> */}
        <div className="hp_shop container">
          {/* <!------------ 1st 商品種類  ------------> */}
          <div
            id="hp_shop_Cat_1"
            className="hpShopCatWrap row"
          >
            {/* <!------- 1st商品種類：圖片  -------> */}
            <div className="hpShopCatItemWrap col-lg-8">
              <div className="hpShopCatImg">
                <img
                  src={`${imgUrl}/images/hp_shop1-3.png`}
                  alt=""
                />
              </div>
            </div>

            {/* <!------- 1st商品種類：文字  -------> */}
            <div className="hpShopCatDes col-lg">
              <h6 className="bannerSubTitle dark-green">
                快速上桌
              </h6>
              <p className="productTitle ">
                健康快速上桌，美味不用等
              </p>
              <Link
                onClick={() => {
                  window.location.href =
                    '/products/?cate=1&page=1'
                }}
              >
                <HpSBtn />
              </Link>
            </div>
          </div>

          {/* <!------------ 2nd 商品種類  ------------>     */}
          <div
            id="hp_shop_Cat_2"
            className="hpShopCatWrap row"
          >
            {/* <!------- 2nd 商品種類：文字  -------> */}
            <div className="hpShopCatDes col-lg">
              <h6 className="bannerSubTitle dark-green">
                健身專區
              </h6>
              <p className="productTitle ">
                為你每一次的進步，提供助力
              </p>
              <Link
                onClick={() => {
                  window.location.href =
                    '/products/?cate=2&page=1'
                }}
              >
                <HpSBtn />
              </Link>
            </div>

            {/* <!------- 2nd商品種類：圖片  -------> */}
            <div className="hpShopCatItemWrap col-lg-8">
              <div className="hpShopCatImg">
                <img
                  src={`${imgUrl}/images/hp_shop2-3.png`}
                  alt=""
                />
              </div>
            </div>
          </div>

          {/* <!------------ 3rd 商品種類  ------------> */}
          <div
            id="hp_shop_Cat_3"
            className="hpShopCatWrap row"
          >
            {/* <!------- 3rd 商品種類：圖片  -------> */}
            <div className="hpShopCatItemWrap col-lg-8">
              <div className="hpShopCatImg">
                <img
                  src={`${imgUrl}/images/hp_shop3-3.png`}
                  alt=""
                />
              </div>
            </div>

            {/* <!------- 3rd 商品種類：文字  -------> */}
            <div className="hpShopCatDes col-lg">
              <h6 className="bannerSubTitle dark-green">
                嚴選食材
              </h6>
              <p className="productTitle ">
                健康美味的產品，陪伴你每一個「吃」的時光。
              </p>
              <Link
                onClick={() => {
                  window.location.href =
                    '/products/?cate=3&page=1'
                }}
              >
                <HpSBtn />
              </Link>
            </div>
          </div>
        </div>
        {/* -------------------- 專欄 -------------------- */}
        {/* <!-------- 1st 文章 --------> */}
        <div className="article1Warp row" id="hpArticle">
          {/* <!-------- 文章1__文字 --------> */}
          <div className="hp_col_dec1Wrap col-lg-8 px-5">
            <p>首頁 / 聰明飲食</p>
            <h6 className="dark-green bannerSubTitle">
              冷凍蔬菜比較沒營養？
              <br />
              事實可能超乎你想像！
            </h6>

            <p>by食力編輯部</p>
            <div className="hpSBtn_Art">
              <Link
                onClick={() => {
                  window.location.href = '/FoodContent/3'
                }}
              >
                <HpSBtn text="完整文章" />
              </Link>
            </div>
          </div>
          {/* <!-------- 文章1__圖片 --------> */}
          <div className="hp_col_img1Wrap col-lg">
            <div className="hp_col_img1">
              <img
                src={`${imgUrl}/images/hp_col_img1-2.png`}
                alt=""
              />
            </div>
            <div className="hp_col_img1_m">
              <img
                src={`${imgUrl}/images/hp_col_img1-2mobile.png`}
                alt=""
              />
            </div>
          </div>
        </div>
        {/* <!-------- 2nd文章 -------->     */}
        <div className="article2Wrap row">
          {/* <!-------- 文章2__圖片 --------> */}
          <div className="hp_col_img2Wrap col-lg-8">
            <div>
              <img
                src={`${imgUrl}/images/hp_col_img2-2.png`}
                alt=""
              />
            </div>
          </div>

          {/* <!-------- 文章2__文字 --------> */}
          <div className="hp_col_dec2Wrap col-lg-2">
            <h6 className="bannerSubTitle  my-5">
              Most
              <br /> &emsp;Popular
            </h6>
          </div>
          <Link
            className="col my-auto"
            onClick={() => {
              window.location.href = '/article'
            }}
          >
            <HpArMoreBtn />
          </Link>

          <div className="col-1"></div>
        </div>
        {/* <!---------------------- 首頁餐廳 ----------------------> */}
        <div class="container" id="hpRes">
          <div class="row">
            <div class="col-lg-4 txtWrap">
              <div className="MobileFlex ">
                <h5 className="bannerSubTitle light-green">
                  HEALTHY
                </h5>
                <h5 className="bannerSubTitle light-orange">
                  FOOD
                </h5>
              </div>
              <div className="MobileFlex">
                <figure>
                  <img
                    src={`${imgUrl}/images/HP_res_bike.png`}
                    alt=""
                  />
                </figure>
                <div>
                  <h6 className="bannerSubTitle light-yellow">
                    查看附近的美味
                  </h6>
                  <Link
                    className="col my-auto"
                    onClick={() => {
                      window.location.href = '/restaurants'
                    }}
                  >
                    <HpSBtn text="Find the lunchbox" />
                  </Link>
                </div>
              </div>
            </div>
            <div class="col-lg-6 imgWrap">
              <div class="imgbox">
                <img
                  class="my-2"
                  src={`${imgUrl}/images/HP_res_img1.png`}
                  alt=""
                />
                <img
                  src={`${imgUrl}/images/HP_res_img1.png`}
                  alt=""
                />
              </div>

              <div class="imgbox">
                <img
                  class="my-2"
                  src={`${imgUrl}/images/HP_res_img1.png`}
                  alt=""
                />
                <img
                  src={`${imgUrl}/images/HP_res_img1.png`}
                  alt=""
                />
              </div>
            </div>
            <div class="col-lg-1 deliveryWrap">
              <img
                src={`${imgUrl}/images/hp_res_delivery.png`}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
