import React from 'react'
import { Link } from 'react-router-dom'
import { imgUrl } from '../config/index'
// import '../App.scss'

function MyFooter(props) {
  return (
    <>
      <footer className="container">
        <div className="row">
          <div className="col-1 col-lg-2 logo">
            <img src={`${imgUrl}/images/logo.png`} alt="" />
          </div>

          <div className="col-9 col-lg-9">
            <ul className="footerNav">
              <div className="web">
                <li>
                  <Link
                    className="dark-green"
                    onClick={() => {
                      window.location.href = '/customize'
                    }}
                  >
                    量身訂做
                  </Link>
                </li>
                <li>
                  <Link
                    className="dark-green"
                    onClick={() => {
                      window.location.href =
                        '/products/?cate=0&page=1'
                    }}
                  >
                    好食商城
                  </Link>
                </li>
                <li>
                  <Link
                    className="dark-green"
                    onClick={() => {
                      window.location.href = '/article'
                    }}
                  >
                    好食專欄
                  </Link>
                </li>
                <li>
                  <Link
                    className="dark-green"
                    onClick={() => {
                      window.location.href = '/restaurants'
                    }}
                  >
                    健康餐盒
                  </Link>
                </li>
                <li>
                  <Link
                    className="dark-green"
                    onClick={() => {
                      window.location.href =
                        '/game/GameChoose'
                    }}
                  >
                    餐食轉盤
                  </Link>
                </li>
              </div>

              <div className="mobile">
                <figure className="col-4 mx-2">
                  <img
                    src={`${imgUrl}/images/logo.png`}
                    alt=""
                  />
                </figure>
                <div className="col">
                  <div className="d-flex">
                    <li className="dark-green ">
                      良身訂做
                    </li>
                    <li className="dark-green ">
                      好食商城
                    </li>
                  </div>
                  <div className="d-flex">
                    <li className="dark-green ">
                      好食專欄
                    </li>
                    <li className="dark-green ">
                      健康餐盒
                    </li>
                    <li className="dark-green ">
                      餐食轉盤
                    </li>
                  </div>
                </div>
              </div>
            </ul>

            <ul classNames="icons">
              <li>
                <a href="#/" className="light-green ">
                  <i class="fab fa-facebook"></i>
                </a>
              </li>

              <li>
                <a href="#/" className="light-green ">
                  <i className="fab fa-twitter"></i>
                </a>
              </li>

              <li>
                <a href="#/" className="light-green ">
                  <i className="fab fa-instagram"></i>
                </a>
              </li>

              <li>
                <p>
                  良辰即食 版權所有 <br />© copyright
                  Reserved 2021
                </p>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  )
}

export default MyFooter
