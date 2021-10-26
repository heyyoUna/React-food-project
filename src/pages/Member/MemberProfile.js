import React from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { withRouter, Redirect } from 'react-router-dom'

function MemberProfile(props) {
  // const { auth } = props
 
  // if (!auth) return <Redirect to="/login" />

  //   if (!auth)
  //     return (
  //       <Redirect>
  //         你沒登入，請連到<Link to="/login">登入頁面</Link>
  //       </Redirect>
  //     )

  return (
    <>
      <div className="karin-profile-container">
        <div className="row karin-profile-title">
          <h1 id="karin-profile-h1">個人檔案</h1>
        </div>
        <div className="row karin-profile-table">
          {/* nav */}
          <div className="member-nav col-2">
            <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
              <NavDropdown.Item
                as={NavLink}
                to="/member/profile"
                a className="nav-link active" id="v-pills-home-tab"
                data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">個人檔案</NavDropdown.Item>
              <NavDropdown.Item
                as={NavLink}
                to="/member/order"
                a className="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">歷史訂單</NavDropdown.Item>
              <NavDropdown.Item
                as={NavLink}
                to="/member/review"
                a className="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">我的評價</NavDropdown.Item>
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
          {/* nav */}
          <div className="karin-profile-main col-8">
            <form>
            {/* avatar */}
              <div className="karin-avatar">
                <img src="" alt=""/>
              </div>
              <div className="karin-form-group row">
                <label for="inputEmail3" className="col-sm-3 col-form-label">姓名</label>
                <div className="col-sm-9">
                  <input
                    type="email"
                    className="karin-profile-form-control"
                    id="inputEmail3"/>
                </div>
              </div>
              <div className="karin-form-group row">
                <label for="inputEmail3" className="col-sm-3 col-form-label">Email</label>
                <div className="col-sm-9">
                  <input
                    type="email"
                    className="karin-profile-form-control"
                    id="inputEmail3"/>
                </div>
              </div>
              <div className="karin-form-group row">
                <label for="inputEmail3" className="col-sm-3 col-form-label">手機</label>
                <div className="col-sm-9">
                  <input
                    type="email"
                    className="karin-profile-form-control"
                    id="inputEmail3"/>
                </div>
              </div>
              <div className="karin-form-group row">
                <label for="inputEmail3" className="col-sm-3 col-form-label">地址</label>
                <div className="col-sm-9">
                  <input
                    type="email"
                    className="karin-profile-form-control"
                    id="inputEmail3"/>
                </div>
              </div>

              {/* 更換密碼 */}
            <div className="karin-form-group row">
                <label for="inputPassword3" className="col-sm-3 col-form-label">舊密碼</label>
                <div className="col-sm-9">
                  <input
                    type="password"
                    className="karin-profile-form-control"
                    id="inputPassword3"/>
                </div>
              </div>
              <div className="karin-form-group row">
                <label for="inputPassword3" className="col-sm-3 col-form-label">新密碼</label>
                <div className="col-sm-9">
                  <input
                    type="password"
                    className="karin-profile-form-control"
                    id="inputPassword3"/>
                </div>
              </div>
              <div className="karin-form-group row">
                <label for="inputPassword3" className="col-sm-3 col-form-label">確認新密碼</label>
                <div className="col-sm-9">
                  <input
                    type="password"
                    className="karin-profile-form-control"
                    id="inputPassword3"/>
                </div>
              </div>
               {/* 更換密碼  */}
             {/* 送出按鈕  */}
              <div className="karin-form-group row">
                <button type="submit" className="karin-profile-btn btn-primary">確認送出</button>
              </div>
              {/* 送出按鈕  */}
          </form>
          </div>
          <div className="karin-profile-right col-2"></div>
        </div>
      </div>
    </>
  )
}

export default withRouter(MemberProfile)
