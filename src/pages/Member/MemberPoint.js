import React, { useEffect, useState } from 'react'
import { withRouter, useHistory } from 'react-router-dom'
import MemberNavbar from './../../components/member/MemberNavbar'

function MemberPoint(props) {
  const token = localStorage.getItem('token')
  const [point, setPoint] = useState([])
  let history = useHistory()

  useEffect(() => {
    if (!token) {
      alert('尚未登入，請連到登入頁面')
      history.push('/login')
    }

    fetch(`http://localhost:3002/member/memberpoint`, {
      method: 'GET',
      headers: {
        //token 從 header 中 Authorization 屬性傳入
        //格式為 Bearer + 空格 + token
        'Authorization': 'Bearer ' + token
      }
    }).then(obj => obj.json())
      .then(obj => {
        if (obj.success) {
          if (obj.data.length) {
            setPoint(obj.data)
          } else {
            alert(obj.error || '查無點數資料')
          }
        } else {
          alert(obj.error)
        }
      })
  }, [])

  return (
    <>
      <div className=" member-point-container">
        <div className="row member-point-title">
          <h1 id="member-point-h1">會員點數</h1>
        </div>
        <div className="row member-point-table">
          <MemberNavbar />
          <div className="member-point col-10">
            <div className="table-responsive-xl">
              <table className="table table-hover" >
                <thead>
                  <tr>
                    <th scope="col" className="member-point-primary">日期</th>
                    <th scope="col" className="member-point-primary">點數更動原因</th>
                    <th scope="col" className="member-point-primary">點數</th>
                    <th scope="col" className="member-point-primary">現有總點數</th>
                  </tr>
                </thead>
                <tbody>
                  {point.map((value) => {
                    return (
                      <tr key={value.sid}>
                        <th scope="row">{value.create_at}</th>
                        <td>{value.change_reason}</td>
                        <td>{value.change_type == 'GET' ? '+' : '-'}{value.change_point}點</td>
                        <td>{value.left_point}點</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="member-point-mobile">
            <div className="table-responsive-xl" >
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col" className="member-point-primary">日期</th>
                    <th scope="col" className="member-point-primary">點數更動原因</th>
                    <th scope="col" className="member-point-primary">點數</th>
                    <th scope="col" className="member-point-primary">現有總點數</th>
                  </tr>
                </thead>
                <tbody>
                  {point.map((value) => {
                    return (
                      <tr key={value.sid}>
                        <th scope="row">{value.create_at}</th>
                        <td>{value.change_reason}</td>
                        <td>{value.change_type == 'GET' ? '+' : '-'}{value.change_point}點</td>
                        <td>{value.left_point}點</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default withRouter(MemberPoint)