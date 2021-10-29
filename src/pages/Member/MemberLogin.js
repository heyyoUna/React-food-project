import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

function MemberLogin(props) {
  const { setMember } = props
  let history = useHistory();

  const handleSubmit = (e) => {
    //阻擋form的預設送出行為
    e.preventDefault()
    
    // 用fetch api/axios送到伺服器
    // // TODO: 欄位檢查
    const fd = new FormData(document.memberForm);
    console.log(new URLSearchParams(fd).toString())
    fetch('http://localhost:3002/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams(fd).toString(),
    }).then(r => r.json()).then(obj => {
      console.log(JSON.stringify(obj, null, 4));
      if (obj.success) {
        alert('登入成功');
        setMember({id: obj.id});
        history.push('/member/profile')
      } else {
        alert('登入失敗\n' + (obj.error || ''));
      }
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