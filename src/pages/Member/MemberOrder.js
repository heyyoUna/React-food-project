import React, { useEffect, useState } from 'react'
import { Link, withRouter, useHistory } from 'react-router-dom'
import MemberNavbar from './../../components/member/MemberNavbar'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

function MemberOrder(props) {
  let history = useHistory()
  const token = localStorage.getItem('token')
  const [order, setOrder] = useState([])

  useEffect(() => {
    if (!token) {
      Swal.fire('尚未登入，請連到登入頁面')
      history.push('/login')
    }

    fetch(`http://localhost:3002/member/memberorder`, {
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
            setOrder(obj.data)
          } else {
            Swal.fire(obj.error || '查無歷史訂單')
          }
        } else {
          Swal.fire(obj.error)
        }
      })
  }, [])
  
  return (
    <>
      <div className="member-order-container">
        <div className="row member-order-title">
          <h1 id="member-order-h1">歷史訂單</h1>
        </div>
        <div className="row member-order-table">
          <MemberNavbar />
          <div className="member-order col-10">
            <div className="table-responsive-xl">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col" className="member-order-primary">訂單編號</th>
                    <th scope="col" className="member-order-primary">訂單日期</th>
                    <th scope="col" className="member-order-primary">總金額</th>
                    <th scope="col" className="member-order-primary">訂單狀態</th>
                    <th scope="col" className="member-order-primary">檢視訂單</th>
                  </tr>
                </thead>
                <tbody>
                  {order.map((value) => {
                    return (
                      <tr key={value.Member_id}>
                        <th scope="row">{value.Order_Sid.toUpperCase()}</th>
                        <td>{value.Created_At}</td>
                        <td>${value.Total_Price}</td>
                        <td>{value.Order_Status}</td>
                        <td>
                          <button type="button" className="btn member-btn-primary">
                            <Link to={`/member/orderdetail/${value.Order_Sid}`} >檢視訂單</Link>
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="member-order-mobile">
            <div className="table-responsive-xl">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col" className="member-order-primary">訂單編號</th>
                    <th scope="col" className="member-order-primary">訂單日期</th>
                    <th scope="col" className="member-order-primary">總金額</th>
                    <th scope="col" className="member-order-primary">訂單狀態</th>
                    <th scope="col" className="member-order-primary">檢視訂單</th>
                  </tr>
                </thead>
                <tbody>
                  {order.map((value) => {
                    return (
                      <tr key={value.Member_id}>
                        <th scope="row">{value.Order_Sid}</th>
                        <td>{value.Created_At}</td>
                        <td>${value.Total_Price}</td>
                        <td>{value.Order_Status}</td>
                        <td>
                          <button className="member-btn-primary">
                            <Link to="/member/orderdetail" className="member-order-detail-btn">檢視訂單</Link>
                          </button>
                        </td>
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

export default withRouter(MemberOrder)