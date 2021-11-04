import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

function MemberSignup(props) {
  let history = useHistory();

   const handleSubmit = (e) => {
    //阻擋form的預設送出行為
    e.preventDefault()

    // 用fetch api/axios送到伺服器
     // // TODO: 欄位檢查
     const fd = new FormData(document.memberForm);
     console.log(new URLSearchParams(fd).toString())
     fetch('http://localhost:3002/member/signup', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
       },
       body: new URLSearchParams(fd).toString(),
     }).then(r => r.json()).then(obj => {
       console.log(JSON.stringify(obj, null, 4));
       if (obj.success) {
         Swal.fire({
           icon: 'success',
           title: '註冊成功',
           showConfirmButton: false,
           timer: 1500,
         });
         history.push('/login')
       } else {
         Swal.fire({
          icon: 'error',
          text: '註冊失敗\n' + (obj.error || '')});
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
          <button type="submit" className="btn karin-btn-signuppage-signup">SIGN UP</button>
          <Link to="/login"
          button type="submit" className="btn karin-btn-signuppage-login">LOG IN</Link>
        </div>
      </div>
      </form>
    </>
  )
}

export default MemberSignup