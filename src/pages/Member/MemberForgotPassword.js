import React, { useEffect, useState } from 'react'
import { withRouter, useHistory } from 'react-router-dom'
import MemberNavbar from '../../components/member/MemberNavbar'
import Swal from 'sweetalert2/dist/sweetalert2.js'

function MemberForgotPassword(props) {
  const [memberid, setMemberid] = useState(0)
  const [forgotPassword, setForgotePassword] = useState({
    'newpassword': '',
    'checknewpassword': ''
  })

  let history = useHistory()
  useEffect(() => {
    const email = props.match.params.email
    //url = 網址
    //為了取得密碼
    const url = props.match.url
    //密碼加密過會有'/'無法用props.match.params.password取出正確密碼
    //必須用url拆解
    const password = url.split(email)[1].substring(1)

    fetch(`http://localhost:3002/member/memberprofile`, {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(r => r.json())
      .then(obj => {
        if (obj.success) {
          setMemberid(obj.memberid)
        } else {
          Swal.fire({
            icon: 'error',
            text: (obj.error || '')
          }).then(() => {
            history.push('/')
          })
        }
      })
  }, [])

  const handlePasswordChange = (e) => {
    const updatePassword = {
      ...forgotPassword,
      [e.target.name]: e.target.value
    }
    setForgotePassword(updatePassword)
  }

  const handleSubmit = (e) => {
    //阻擋form的預設送出行為
    e.preventDefault()

    fetch('http://localhost:3002/member/resetpassword', {
      method: 'POST',
      body: JSON.stringify({ ...forgotPassword, memberid: memberid }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(r => r.json())
      .then(obj => {
        if (obj.success) {
          Swal.fire({
            icon: 'success',
            title: '密碼重設成功',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            history.push('/login')
          })
        } else {
          Swal.fire({
            icon: 'error',
            text: (obj.error || '密碼重設失敗')
          })
          setForgotePassword({
            'newpassword': '',
            'checknewpassword': ''
          })
        }
      });
  }

  return (
    <>
      <div className="karin-profile-container">
        <div className="row karin-profile-title">
          <h1 id="karin-profile-h1">重設密碼</h1>
        </div>
        <div className="row karin-profile-table">
          <MemberNavbar />
          <div className="karin-profile-main col-8">
            <form name="memberForm" onSubmit={handleSubmit}>
              <div className="karin-form-group row">
                <label for="password" className="col-sm-3 col-form-label">新密碼</label>
                <div className="col-sm-9">
                  <input
                    type="password"
                    className="karin-profile-form-control"
                    name="newpassword"
                    value={forgotPassword.newpassword}
                    onChange={handlePasswordChange}
                  />
                </div>
              </div>
              <div className="karin-form-group row">
                <label for="password" className="col-sm-3 col-form-label">確認新密碼</label>
                <div className="col-sm-9">
                  <input
                    type="password"
                    className="karin-profile-form-control"
                    name="checknewpassword"
                    value={forgotPassword.checknewpassword}
                    onChange={handlePasswordChange}
                  />
                </div>
              </div>
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

export default withRouter(MemberForgotPassword)