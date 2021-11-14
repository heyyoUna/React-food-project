import React, { useEffect, useState } from 'react'
import { withRouter, useHistory } from 'react-router-dom'
import MemberNavbar from '../../components/member/MemberNavbar'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

function MemberChangePassword(props) {
  const token = localStorage.getItem('token')
  const [changepassword, setChangePassword] = useState({
    'oldpassword': '',
    'newpassword': '',
    'checknewpassword': ''
  })

  //小眼睛設定，因為有兩個input要用，所以需要另設狀態，不能共用狀態
  const [close, setClose] = useState('far fa-eye-slash')
  const [closeAnother, setCloseAnother] = useState(
    'far fa-eye-slash'
  )
  // 切換input type
  const [type, setType] = useState('password')
  const [typeAnother, setTypeAnother] = useState('password')

  let history = useHistory()

  useEffect(() => {

    if (!token) {
      Swal.fire('尚未登入，請連到登入頁面')
      history.push('/login')
    }
  }, [])

  const handlePasswordChange = (e) => {
    const updatePassword = {
      ...changepassword,
      [e.target.name]: e.target.value
    }
    setChangePassword(updatePassword)
  }

  const handleSubmit = (e) => {
    //阻擋form的預設送出行為
    e.preventDefault()

    fetch('http://localhost:3002/member/memberchangepassword', {
      method: 'POST',
      body: JSON.stringify(changepassword),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    }).then(r => r.json())
      .then(obj => {
        if (obj.success) {
          Swal.fire({
            icon: 'success',
            title: '密碼修改成功',
            showConfirmButton: false,
            timer: 1500,
          })
        } else {
          Swal.fire({
            icon: 'error',
            text: (obj.error || '密碼修改失敗')
          });
        }
        setChangePassword({
          'oldpassword': '',
          'newpassword': '',
          'checknewpassword': ''
        })
      });
  }

  return (
    <>
      <div className="karin-profile-container">
        <div className="row karin-profile-title">
          <h1 id="karin-profile-h1">更改密碼</h1>
        </div>
        <div className="row karin-profile-table">
          <MemberNavbar />
          <div className="karin-profile-main col-8">
            <form name="memberForm" onSubmit={handleSubmit}>
              <div className="karin-form-group row">
                <label htmlFor="password" className="col-sm-3 col-form-label">舊密碼</label>
                <div className="col-sm-9">
                  <input
                    type={type}
                    className="karin-profile-form-control"
                    name="oldpassword"
                    value={changepassword.oldpassword}
                    onChange={handlePasswordChange}
                  />
                  <i
                    className={`mt-4 mt-md-3 ml-2 ${close}`}
                    onClick={() => {
                      if (type === 'password') {
                        setType('text')
                        setClose('far fa-eye')
                      } else {
                        setType('password')
                        setClose('far fa-eye-slash')
                      }
                    }}
                  ></i>
                </div>
              </div>
              <div className="karin-form-group row">
                <label htmlFor="password" className="col-sm-3 col-form-label">新密碼</label>
                <div className="col-sm-9">
                  <input
                    type={typeAnother}
                    className="karin-profile-form-control"
                    name="newpassword"
                    value={changepassword.newpassword}
                    onChange={handlePasswordChange}
                  />
                  <i
                    className={`mt-3 mt-md-3 ml-2 ${closeAnother}`}
                    onClick={() => {
                      if (typeAnother === 'password') {
                        setTypeAnother('text')
                        setCloseAnother('far fa-eye')
                      } else {
                        setTypeAnother('password')
                        setCloseAnother('far fa-eye-slash')
                      }
                    }}
                  ></i>
                </div>
              </div>
              <div className="karin-form-group row">
                <label htmlFor="password" className="col-sm-3 col-form-label">確認新密碼</label>
                <div className="col-sm-9">
                  <input
                    type={typeAnother}
                    className="karin-profile-form-control"
                    name="checknewpassword"
                    value={changepassword.checknewpassword}
                    onChange={handlePasswordChange}
                  />
                  <i
                    className={`mt-3 mt-md-3 ml-2 ${closeAnother}`}
                    onClick={() => {
                      if (typeAnother === 'password') {
                        setTypeAnother('text')
                        setCloseAnother('far fa-eye')
                      } else {
                        setTypeAnother('password')
                        setCloseAnother('far fa-eye-slash')
                      }
                    }}
                  ></i>
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

export default withRouter(MemberChangePassword)