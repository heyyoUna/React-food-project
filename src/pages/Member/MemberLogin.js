function MemberLogin(props) {
  console.log(props)

  const { auth, setAuth } = props

  return (
    <>
      <div className="karin-login-container">
        <div className="karin-login">
          <h1 id="karin-login-h1">Login</h1>
          <div className="karin-form-group">
            <input
              type="email"
              className="karin-form-control"
              aria-describedby="emailHelp"
              placeholder="Email"/>
          </div>
          <div className="karin-form-group">
            <input
              type="password"
              className="karin-form-control"
              placeholder="Password"/>
          </div>
          <div className="karin-form-group form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" for="exampleCheck1">Remember me</label>
          </div>
          <button type="submit" className="btn karin-btn-login">LOG IN</button>
          <button type="submit" className="btn karin-btn-signup">SIGN UP</button>
          <div className="forgot-password">
            <a href="" id="karin-forgot-password">Forgot Password?</a>
          </div>
        </div>
      </div>
      {/* <button
        onClick={() => {
          setAuth(!auth)
        }}
      >
        {auth ? '登出' : '登入'}
      </button> */}
    </>
  )
}

export default MemberLogin
