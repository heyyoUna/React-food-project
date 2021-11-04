import React, { useEffect, useState } from 'react'
import { withRouter, useHistory } from 'react-router-dom'
import MemberNavbar from './../../components/member/MemberNavbar'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

function MemberProfile(props) {
  const [profile, setProfile] = useState({
    'sid': 0,
    'avatar': '',
    'email': '',
    'password': '',
    'mobile': '',
    'address': '',
    'birthday': '',
    'name': ''
  })

  let history = useHistory()

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (!token) {
      Swal.fire('尚未登入，請連到登入頁面')
      history.push('/login')
    }

    fetch(`http://localhost:3002/member/memberprofile`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }).then(r => r.json())
      .then(obj => {
        if (obj.success) {
          if (obj.data.length) {
            setProfile(obj.data[0])
          } else {
            Swal.fire(obj.error || '資料讀取失敗')
          }
        } else {
          Swal.fire(obj.error)
        }
      })
  }, [])

  const handleProfileChange = (e) => {
    const updateProfile = {
      ...profile,
      [e.target.name]: e.target.value
    }

    setProfile(updateProfile)
  }

  const handleSubmit = (e) => {
    //阻擋form的預設送出行為
    e.preventDefault()

    fetch('http://localhost:3002/member/edit', {
      method: 'POST',
      body: JSON.stringify(profile),
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(r => r.json())
      .then(obj => {
        if (obj.success) {
          Swal.fire({
            icon: 'success',
            title:'資料修改成功',
            showConfirmButton: false,
            timer: 1500,
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: obj.error || '資料修改失敗'
          })
        }
      });
  }

  return (
    <>
      <div className="karin-profile-container">
        <div className="row karin-profile-title">
          <h1 id="karin-profile-h1">個人檔案</h1>
        </div>
        <div className="row karin-profile-table">
          <MemberNavbar />
          <div className="karin-profile-main col-8">
            <form name="memberForm" onSubmit={handleSubmit}>
              {/* avatar */}
              <div className="karin-avatar">
                <img src="" alt="" />
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
                    onChange={handleProfileChange}
                    readOnly
                  />
                </div>
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
                    onChange={handleProfileChange}
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
                    onChange={handleProfileChange}
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
                    onChange={handleProfileChange}
                  />
                </div>
              </div>
              <div className="karin-form-group row">
                <label for="birthday" className="col-sm-3 col-form-label">生日</label>
                <div className="col-sm-9">
                  <input
                    type="date"
                    className="karin-profile-form-control"
                    id="memberbirthday"
                    name="birthday"
                    value={profile.birthday}
                    onChange={handleProfileChange}
                  />
                </div>
              </div>
              {/* 更換密碼 */}
              {/* <div className="karin-form-group row">
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
                      id="newpassword" />
                  </div>
                </div>
                <div className="karin-form-group row">
                  <label for="password" className="col-sm-3 col-form-label">確認新密碼</label>
                  <div className="col-sm-9">
                    <input
                      type="password"
                      className="karin-profile-form-control"
                      id="checknewpassword" />
                  </div>
                </div> */}
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