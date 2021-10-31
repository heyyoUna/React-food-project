import { withRouter } from 'react-router-dom'
import MemberNavbar from './../../components/member/MemberNavbar'

function MemberOrder(props) {
  console.log(props)
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
                  <tr>
                    <th scope="row">20210517044231619</th>
                    <td>2021-05-20</td>
                    <td>$520</td>
                    <td>訂單確認中</td>
                    <td>
                      <button type="button" className="btn member-btn-primary">
                        檢視訂單
                    </button>
                    </td>
                  </tr>

                  <tr>
                    <th scope="row">20210517044231620</th>
                    <td>2021-05-19</td>
                    <td>$1600</td>
                    <td>已完成</td>
                    <td>
                      <button type="button" className="btn member-btn-primary">
                        檢視訂單
                    </button>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">20210517044231621</th>
                    <td>2021-05-18</td>
                    <td>$670</td>
                    <td>已完成</td>
                    <td>
                      <button type="button" className="btn member-btn-primary">
                        檢視訂單
                    </button>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">20210517044231622</th>
                    <td>2021-05-17</td>
                    <td>$1400</td>
                    <td>已完成</td>
                    <td>
                      <button type="button" className="btn member-btn-primary">
                        檢視訂單
                    </button>
                    </td>
                  </tr>
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
                  <tr>
                    <th scope="row">20210517044231619</th>
                    <td>2021-05-20</td>
                    <td>$520</td>
                    <td>訂單確認中</td>
                    <td>
                      <button type="button" className="btn member-btn-primary">
                        檢視訂單
                    </button>
                    </td>
                  </tr>

                  <tr>
                    <th scope="row">20210517044231620</th>
                    <td>2021-05-19</td>
                    <td>$1600</td>
                    <td>已完成</td>
                    <td>
                      <button type="button" className="btn member-btn-primary">
                        檢視訂單
                    </button>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">20210517044231621</th>
                    <td>2021-05-18</td>
                    <td>$670</td>
                    <td>已完成</td>
                    <td>
                      <button type="button" className="btn member-btn-primary">
                        檢視訂單
                    </button>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">20210517044231622</th>
                    <td>2021-05-17</td>
                    <td>$1400</td>
                    <td>已完成</td>
                    <td>
                      <button type="button" className="btn member-btn-primary">
                        檢視訂單
                    </button>
                    </td>
                  </tr>
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
