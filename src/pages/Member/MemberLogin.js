import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import emailjs from 'emailjs-com'

function MemberLogin(props) {
  const { setAuth } = props
  const [info, setInfo] = useState({
    'email': '',
    'password': '',
  })
  const [close, setClose] = useState('far fa-eye-slash')
  const [type, setType] = useState('password')

  let history = useHistory()

  const handleInfoChange = (e) => {
    const updateInfo = {
      ...info,
      [e.target.name]: e.target.value
    }

    setInfo(updateInfo)
  }

  const handleSubmit = (e) => {
    //阻擋form的預設送出行為
    e.preventDefault()

    fetch('http://localhost:3002/member/login', {
      method: 'POST',
      body: JSON.stringify(info),
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(r => r.json())
      .then(obj => {
        if (obj.success) {
          Swal.fire({
            icon: 'success',
            title: '登入成功',
            showConfirmButton: false,
            timer: 1500,
          })
          localStorage.setItem('token', obj.token)
          setAuth(true)
          history.push('/member/profile')
        } else {
          Swal.fire({
            icon: 'error',
            confirmButtonColoe: '#8fc065',
            text: '登入失敗\n' + (obj.error || '')
          });
        }
      })
  }

  const handlingForgotPassword = () => {
    if (!info.email) {
      Swal.fire({
        icon: 'error',
        text: '請先輸入 Email'
      });
      return;
    }

    fetch(`http://localhost:3002/member/memberprofile/${info.email}`, {
      method: 'GET'
    }).then(r => r.json())
      .then(obj => {
        if (obj.success) {
          Swal.fire({
            icon: 'success',
            text: '重設密碼信件已寄出',
            showConfirmButton: false,
            timer: 1500,
          })
          sendEmail(obj.data)
        } else {
          Swal.fire({
            icon: 'error',
            text: (obj.error || '')
          });
        }
      })
  }

  const sendEmail = (data) => {
    //send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', content, 'YOUR_USER_ID')
    emailjs.send('EatHealthy', 'template_cz0cu1b', { email: data.email, password: data.password.replaceAll('\/', '%2f') }, 'user_YM7Y1JKslMi9OVCYc197i')
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
  }

  return (
    <>
      <form name="memberForm" onSubmit={handleSubmit}>
        <div className="karin-login-container">
          <div className="karin-login">
            <h1 id="karin-login-h1">Login</h1>
            <div className="karin-form-group">
              <input
                type="email"
                name="email"
                className="karin-form-control"
                placeholder="Email"
                value={info.email}
                onChange={handleInfoChange}
                required />
            </div>
            <div className="karin-form-group">
              <div className="eye"  >
                <i className={`mt-4 mt-md-3 ml-2 ${close}`} style={{ 'visibility': 'hidden' }}
                ></i>
              </div>
              <input
                type={type}
                name="password"
                className="karin-form-control"
                placeholder="Password"
                minLength="5"  //最少要輸入5個字元
                value={info.password}
                onChange={handleInfoChange}
                required />
              <div className="eye" >
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
            <button type="submit" className="btn karin-btn-login">LOG IN</button>
            <Link to="/signup"
              type="submit" className="btn karin-btn-signup">SIGN UP</Link>
            <div className="forgot-password">
              <a id="karin-forgot-password" onClick={handlingForgotPassword}>Forgot Password?</a>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default MemberLogin