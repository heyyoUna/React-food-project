import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'

function MemberSignup(props) {
  // console.log(props)
  // const email = document.querySelector('#email');

  // const keyHandler = event => {
  //   // console.log(event.type, event.key);
  //   // TODO: 檢查格式是否符合 email 格式

  //   const usp = new URLSearchParams();
  //   usp.set('email', email.value.toLowerCase().trim());
  //   //email沒給值就會跳錯

  //   fetch('/account-check?' + usp).then(r => r.json()).then(data => {
  //     if (data.used) {
  //       // email 已被使用
  //       email.style.border = '2px solid red';
  //     } else {
  //       email.style.border = '1px solid #CCCCCC';
  //     }
  //   });
  // }
  // email.addEventListener('input', keyHandler);

   const handleSubmit = (e) => {
    //這行一定要寫 為了阻擋form的預設送出行為
    e.preventDefault()

    // ex. 以下用fetch api/axios送到伺服器
     // // TODO: 欄位檢查
     const fd = new FormData(document.memberForm);
     console.log(new URLSearchParams(fd).toString())
     fetch('http://localhost:3002/signup', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
       },
       body: new URLSearchParams(fd).toString(),
     }).then(r => r.json()).then(obj => {
       console.log(JSON.stringify(obj, null, 4));
       if (obj.success) {
         alert('註冊成功');
         <Link to = '/login' ></Link>;
       } else {
         alert('註冊失敗\n' + (obj.error || ''));
       }
     });
  }
  
  return (
    <>
    <form name="memberForm" onSubmit={handleSubmit}>
      <div className="karin-signup-container">
        <div className="karin-signup">
          <h1 id="karin-signup-h1">Sign up</h1>
          <div className="karin-form-group">
            <input
              type="email"
              name="email"
              className="karin-form-control"
              placeholder="Email"
              required/>
          </div>
          <div className="karin-form-group">
            <input
              type="password"
              name="password"
              className="karin-form-control"
              placeholder="Password" 
              minLength="5"  //最少要輸入5個字元
              required/>
          </div>
          <div className="karin-form-group form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
            <label className="form-check-label" for="exampleCheck1">Remember me</label>
          </div>
          <button type="submit" className="btn karin-btn-signuppage-signup">SIGN UP</button>
          <Link to="/login"
          button type="submit" className="btn karin-btn-signuppage-login">LOG IN</Link>
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
      </form>
    </>
  )
}

export default MemberSignup
