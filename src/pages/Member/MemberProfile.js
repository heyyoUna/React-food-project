import React, { useEffect, useState } from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { withRouter, Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'

function MemberProfile(props) {
   const { member } = props
   const [profile, setProfile] = useState({
     sid: 0
   })
   
  useEffect(()=>{
    if( member.id ){
      // TODO: 欄位檢查
      fetch(`http://localhost:3002/memberprofile/${member.id}`, {
        method: 'GET',
      }).then(r => r.json()).then(obj => {
        console.log(JSON.stringify(obj, null, 4));
        if (obj.length) {
          setProfile(obj[0])
        } else {
          alert(obj.error || '資料修改失敗');
        }
      });

    }else{
      return (
        <Redirect>
          尚未登入，請連到<Link to="/login">登入頁面</Link>
        </Redirect>
      )
    }
  }, [])


  const handleSubmit = (e) => {
    //阻擋form的預設送出行為
    e.preventDefault()
  // TODO: 欄位檢查
    const fd = new FormData(document.memberForm);
    fetch('http://localhost:3002/memberprofile', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams(fd).toString(),
  }).then(r => r.json()).then(obj => {
    console.log(JSON.stringify(obj, null, 4));
    if (obj.success) {
      alert('資料修改成功');
      <Link to='/memberprofile' ></Link>;
    } else {
      alert(obj.error || '資料修改失敗');
    }
  });
}

  return (
    <>
      <form name="memberForm" onSubmit={handleSubmit}>
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
                <label for="name" className="col-sm-3 col-form-label">姓名</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="karin-profile-form-control"
                    id="membername"
                    name="name"
                    value={profile.name}
                    />
                </div>
              </div>
              <div className="karin-form-group row">
                <label for="email" className="col-sm-3 col-form-label">Email</label>
                <div className="col-sm-9">
                  <input
                    type="email"
                    className="karin-profile-form-control"
                    id="memberemail"
                    name="email"
                    value={profile.email}
<<<<<<< HEAD
                      disabled
=======
                    
>>>>>>> 1773495cf322cb8f849f2293fc9c93cd5a840c52
                    />
                </div>
              </div>
              <div className="karin-form-group row">
                <label for="mobile" className="col-sm-3 col-form-label">手機</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="karin-profile-form-control"
                    id="membermobile"
                    name="mobile"
                    value={profile.mobile}
                    />
                </div>
              </div>
              <div className="karin-form-group row">
                <label for="address" className="col-sm-3 col-form-label">地址</label>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="karin-profile-form-control"
                    id="memberaddress"
                    name="address"
                    value={profile.address}
                    />
                </div>
              </div>

              {/* 更換密碼 */}
            <div className="karin-form-group row">
                <label for="password" className="col-sm-3 col-form-label">舊密碼</label>
                <div className="col-sm-9">
                  <input
                    type="password"
                    className="karin-profile-form-control"
                    id="oldpassword"
                    />
                </div>
              </div>
              <div className="karin-form-group row">
                <label for="password" className="col-sm-3 col-form-label">新密碼</label>
                <div className="col-sm-9">
                  <input
                    type="password"
                    className="karin-profile-form-control"
                    id="newpassword"/>
                </div>
              </div>
              <div className="karin-form-group row">
                <label for="password" className="col-sm-3 col-form-label">確認新密碼</label>
                <div className="col-sm-9">
                  <input
                    type="password"
                    className="karin-profile-form-control"
                    id="checknewpassword"/>
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
      </form>
    </>
  )
}

export default withRouter(MemberProfile)
