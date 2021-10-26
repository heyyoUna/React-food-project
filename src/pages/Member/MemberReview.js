import { withRouter } from 'react-router-dom'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

function MemberReview(props) {
  console.log(props)
  return (
    <>
      <div className="member-review-container">
        <div className="row member-review-title">
          <h1 id="member-review-h1">我的評價</h1>
        </div>
        <div className="row member-review-table">
          {/* <!-- nav --> */}
          <div className="member-nav col-2">
            <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
              <NavDropdown.Item
                as={NavLink}
                to="/member/profile"
                a className="nav-link" id="v-pills-home-tab"
                data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">個人檔案</NavDropdown.Item>
              <NavDropdown.Item
                as={NavLink}
                to="/member/order"
                a className="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">歷史訂單</NavDropdown.Item>
              <NavDropdown.Item
                as={NavLink}
                to="/member/review"
                a className="nav-link active" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">我的評價</NavDropdown.Item>
              <NavDropdown.Item
                as={NavLink}
                to="/member/point"
                a className="nav-link"
                id="v-pills-messages-tab"
                data-toggle="pill"
                href="#v-pills-messages"
                role="tab"
                aria-controls="v-pills-messages"
                aria-selected="false">會員點數</NavDropdown.Item>
              <NavDropdown.Item
                as={NavLink}
                to="/member/FavoriteProduct"
                a className="nav-link "
                id="v-pills-settings-tab"
                data-toggle="pill"
                href="#v-pills-settings"
                role="tab"
                aria-controls="v-pills-settings"
                aria-selected="false">商品追蹤清單</NavDropdown.Item>
              <NavDropdown.Item
                as={NavLink}
                to="/member/FavoriteArticle"
                a className="nav-link"
                id="v-pills-settings-tab"
                data-toggle="pill"
                href="#v-pills-settings"
                role="tab"
                aria-controls="v-pills-settings"
                aria-selected="false">文章收藏清單</NavDropdown.Item>
              <NavDropdown.Item
                as={NavLink}
                to="/member/FavoriteRestaurant"
                a className="nav-link"
                id="v-pills-settings-tab"
                data-toggle="pill"
                href="#v-pills-settings"
                role="tab"
                aria-controls="v-pills-settings"
                aria-selected="false">餐廳收藏清單</NavDropdown.Item>
            </div>
          </div>
          {/* <!-- nav --> */}
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