import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

function MemberLogin(props) {
  const { setAuth } = props
  let history = useHistory()

  const handleSubmit = (e) => {
    //阻擋form的預設送出行為
    e.preventDefault()

    const fd = new FormData(document.memberForm);

    fetch('http://localhost:3002/member/login', {
      method: 'POST',
      body: new URLSearchParams(fd).toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    }).then(r => r.json())
      .then(obj => {
        if (obj.success) {
          alert('登入成功')
          localStorage.setItem('token', obj.token)
          setAuth(true)
          history.push('/member/profile')
        } else {
          alert('登入失敗\n' + (obj.error || ''))
        }
      })
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
                required />
            </div>
            <div className="karin-form-group">
              <input
                type="password"
                name="password"
                className="karin-form-control"
                placeholder="Password"
                minLength="5"  //最少要輸入5個字元
                required />
            </div>
            <div className="karin-form-group form-check">
              <input type="checkbox" className="form-check-input" id="exampleCheck1" />
              <label className="form-check-label" for="exampleCheck1">Remember me</label>
            </div>
            <button type="submit" className="btn karin-btn-login">LOG IN</button>
            <Link to="/signup"
              button type="submit" className="btn karin-btn-signup">SIGN UP</Link>
            <div className="forgot-password">
              <a href="" id="karin-forgot-password">Forgot Password?</a>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default MemberLogin