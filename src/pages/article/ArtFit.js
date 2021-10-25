import { withRouter } from 'react-router-dom'
import React from 'react'
import { imgUrl } from '../../config'
import '../../styles/article/Article.scss'
import ArCardTxt from '../../components/article/ArCardTxt'

function ArtFit(props) {
  return (
    <>
      <div className="container" id="col-cat-article">
        <div className="row">
          <div className="col-lg">
            <div>
              <div>
                <img
                  src={`${imgUrl}/images/article/col_cat_articleS.png`}
                  alt=""
                />
              </div>
              <ArCardTxt
                text="A:
              我是運動文章"
              />
            </div>

            <div className="cards">
              <div className="imgWrap">
                <img
                  src={`${imgUrl}/images/article/col_cat_articleL.png`}
                  alt=""
                />
              </div>
              <ArCardTxt
                text="B:
              我是ArCardTxt集氣！第二波60萬份國旅券5組幸運號碼出爐 15：30再抽i原券"
              />
            </div>
          </div>
          <div className="col-lg">
            <div className="cards">
              <div className="imgWrap">
                <img
                  src={`${imgUrl}/images/article/col_cat_articleL.png`}
                  alt=""
                />
              </div>
              <ArCardTxt
                text="C:
              我是ArCardTxt集氣！第二波60萬份國旅券5組幸運號碼出爐 15：30再抽i原券"
              />
            </div>
            <div className="cards">
              <div className="imgWrap">
                <img
                  src={`${imgUrl}/images/article/col_cat_articleS.png`}
                  alt=""
                />
              </div>
              <ArCardTxt
                text="D:
              我是ArCardTxt集氣！第二波60萬份國旅券5組幸運號碼出爐 15：30再抽i原券"
              />
            </div>
          </div>

          <div className="col-lg">
            <div className="cards">
              <div className="imgWrap">
                <img
                  src={`${imgUrl}/images/article/col_cat_articleM.png`}
                  alt=""
                />
              </div>
              <ArCardTxt
                text="E:
              我是ArCardTxt集氣！第二波60萬份國旅券5組幸運號碼出爐 15：30再抽i原券"
              />
            </div>

            <div className="cards">
              <div className="imgWrap">
                <img
                  src={`${imgUrl}/images/article/col_cat_articleM.png`}
                  alt=""
                />
              </div>
              <ArCardTxt
                text="F:
              我是ArCardTxt集氣！第二波60萬份國旅券5組幸運號碼出爐 15：30再抽i原券"
              />
            </div>
          </div>
        </div>
        {/* <!------------ 分頁/頁碼 ------------>   */}
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <a
                className="page-link"
                href="#/"
                aria-label="Previous"
              >
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#/">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#/">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#/">
                3
              </a>
            </li>
            <li className="page-item">
              <a
                className="page-link"
                href="#/"
                aria-label="Next"
              >
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  )
}

export default withRouter(ArtFit)
