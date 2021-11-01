import { withRouter } from 'react-router-dom'
import MemberNavbar from './../../components/member/MemberNavbar'

function MemberReview(props) {
  console.log(props)
  return (
    <>
      <div className="member-review-container">
        <div className="row member-review-title">
          <h1 id="member-review-h1">我的評價</h1>
        </div>
        <div className="row member-review-table">
        <MemberNavbar />
        <div className="member-review-main-right col-9">
            {/* <!-- 評價按鈕  --> */}
          <div className="member-review-button">
              <button type="button" className="btn member-btn-evaluated">
                待評價
            </button>
              <button type="button" className="btn member-btn-evaluating">
                已評價
            </button>
            </div>
            {/* <!-- 評價按鈕  --> */}
          {/* <!-- 評價內容 --> */}
          <div className="member-order-number">
              <a href="#">訂單編號: 20210517044231619</a>
            </div>
            <div className="member-review-main">
              <div className="member-review-img">
                <img className="img-fluid rounded-start"
                    src={`http://localhost:3000/images/member/noodles.png`}
                  alt="" />
              </div>
              <div className="member-product-name">
                <h5>川椒麻辣蒟蒻拌麵(袋/3份入)</h5>
                <div className="member-cart">
                  <i className="far fa-star"></i>
                  <i className="far fa-star"></i>
                  <i className="far fa-star"></i>
                  <i className="far fa-star"></i>
                  <i className="far fa-star"></i>
                </div>
              </div>
              <div className="member-review-right">
                <div className="member-review-text">
                  <input type="text" className="member-review-text-input" />
                </div>
              </div>
            </div>
            <div className="member-order-number">
              <a href="#">訂單編號: 202105170442316</a>
            </div>
            <div className="member-review-main">
              <div className="member-review-img">
                <img className="img-fluid rounded-start"
                    src={`http://localhost:3000/images/member/noodles.png`}
                  alt="" />
              </div>
              <div className="member-product-name">
                <h5>川椒麻辣蒟蒻拌麵(袋/3份入)</h5>
                <div className="member-cart">
                  <i className="far fa-star"></i>
                  <i className="far fa-star"></i>
                  <i className="far fa-star"></i>
                  <i className="far fa-star"></i>
                  <i className="far fa-star"></i>
                </div>
              </div>
              <div className="member-review-text">
                <input type="text" className="member-review-text-input" />
              </div>
            </div>
            {/* 送出按鈕  */}
            <div className="karin-form-group row">
              <button type="submit" className="karin-profile-btn btn-primary">確認送出</button>
            </div>
            {/* 送出按鈕  */}
            {/* <!-- 評價內容 --> */}
        </div>
          <div className="member-review-main-right-mobile">
            {/* <!-- 評價按鈕  --> */}
          <div className="member-review-button">
              <button type="button" className="btn member-btn-evaluated">
                待評價
            </button>
              <button type="button" className="btn member-btn-evaluating">
                已評價
            </button>
            </div>
            {/* <!-- 評價按鈕  --> */}
          {/* <!-- 評價內容 --> */}
          <div className="member-order-number">
              <a href="#">訂單編號: 20210517044231619</a>
            </div>
            <div className="member-review-main">
              <div className="member-review-img">
                <img src="../public/imgages/member/noodles.png" className="img-fluid rounded-start" alt="" />
              </div>
              <div className="member-product-name">
                <h5>川椒麻辣蒟蒻拌麵(袋/3份入)</h5>
                <div className="member-cart">
                  <i className="far fa-star"></i>
                  <i className="far fa-star"></i>
                  <i className="far fa-star"></i>
                  <i className="far fa-star"></i>
                  <i className="far fa-star"></i>
                </div>
              </div>
              <div className="member-review-right">
                <div className="member-review-text">
                  <input type="text" className="member-review-text-input" />
                </div>
              </div>
            </div>
            <div className="member-order-number">
              <a href="#">訂單編號: 202105170442316</a>
            </div>
            <div className="member-review-main">
              <div className="member-review-img">
                <img className="img-fluid rounded-start"
                    src={`http://localhost:3000/images/member/noodles.png`}
                  alt="" />
              </div>
              <div className="member-product-name">
                <h5>川椒麻辣蒟蒻拌麵(袋/3份入)</h5>
                <div className="member-cart">
                  <i className="far fa-star"></i>
                  <i className="far fa-star"></i>
                  <i className="far fa-star"></i>
                  <i className="far fa-star"></i>
                  <i className="far fa-star"></i>
                </div>
              </div>
              <div className="member-review-text">
                <input type="text" className="member-review-text-input" />
              </div>
            </div>
            {/* 送出按鈕  */}
            <div className="karin-form-group row">
              <button type="submit" className="karin-profile-btn btn-primary">確認送出</button>
            </div>
            {/* 送出按鈕  */}
            {/* <!-- 評價內容 --> */}
        </div>
        </div>
      </div>
    </>
  )
}

export default withRouter(MemberReview)
