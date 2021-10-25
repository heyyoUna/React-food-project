import React from 'react'
import { imgUrl } from '../config/index'
// import '../App.scss'

function MyFooter(props) {
  return (
    <>
      <footer className="container my-5">
        <div className="row">
          <div className="col-1 col-lg-2 logo">
            <img src={`${imgUrl}/images/logo.png`} alt="" />
          </div>

          <div className="col-9 col-lg-9">
            <ul className="footerNav">
              <div className="web">
                <li className="f_darkgreen ">量身訂做</li>
                <li className="f_darkgreen ">好食商城</li>
                <li className="f_darkgreen ">好食專欄</li>
                <li className="f_darkgreen ">健康餐盒</li>
                <li className="f_darkgreen ">餐食轉盤</li>
              </div>

              <div className="mobile">
                <figure className="col-4 mx-4">
                  <img
                    src={`${imgUrl}/images/logo.png`}
                    alt=""
                  />
                </figure>
                <div className="col">
                  <div className="d-flex">
                    <li className="f_darkgreen ">
                      量身訂做
                    </li>
                    <li className="f_darkgreen ">
                      好食商城
                    </li>
                  </div>
                  <div className="d-flex">
                    <li className="f_darkgreen ">
                      好食專欄
                    </li>
                    <li className="f_darkgreen ">
                      健康餐盒
                    </li>
                    <li className="f_darkgreen ">
                      餐食轉盤
                    </li>
                  </div>
                </div>
              </div>
            </ul>

            <ul classNames="icons">
              <li>
                <i class="fab fa-facebook"></i>
              </li>
              <li>
                <i className="fab fa-twitter"></i>
              </li>
              <li>
                <i className="fab fa-instagram"></i>
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
