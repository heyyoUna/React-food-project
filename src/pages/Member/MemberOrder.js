import { withRouter } from 'react-router-dom'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

function MemberOrder(props) {
  console.log(props)
  return (
    <>
      <div className="member-order-container">
        <div className="row member-order-title">
          <h1 id="member-order-h1">歷史訂單</h1>
        </div>
        <div className="row member-order-table">
          {/* nav */}
          <div className="member-nav col-2">
            <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
              <NavDropdown.Item
                as={NavLink}
                to="/member/profile"
                a className="nav-link" id="v-pills-home-tab"
                data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">個人檔案</NavDropdown.Item>
              <NavDropdown.Item
                as={NavLink}
                to="/member/order"
                a className="nav-link active" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">歷史訂單</NavDropdown.Item>
              <NavDropdown.Item
                as={NavLink}
                to="/member/review"
                a className="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">我的評價</NavDropdown.Item>
              <NavDropdown.Item
                as={NavLink}
                to="/member/point"
                a className="nav-link"
                id="v-pills-messages-tab"
                data-toggle="pill"
                href="#v-pills-messages"
                role="tab"
                aria-controls="v-pills-messages"
                aria-selected="false">會員點數</NavDropdown.Item>
              <NavDropdown.Item
                as={NavLink}
                to="/member/FavoriteProduct"
                a className="nav-link "
                id="v-pills-settings-tab"
                data-toggle="pill"
                href="#v-pills-settings"
                role="tab"
                aria-controls="v-pills-settings"
                aria-selected="false">商品追蹤清單</NavDropdown.Item>
              <NavDropdown.Item
                as={NavLink}
                to="/member/FavoriteArticle"
                a className="nav-link"
                id="v-pills-settings-tab"
                data-toggle="pill"
                href="#v-pills-settings"
                role="tab"
                aria-controls="v-pills-settings"
                aria-selected="false">文章收藏清單</NavDropdown.Item>
              <NavDropdown.Item
                as={NavLink}
                to="/member/FavoriteRestaurant"
                a className="nav-link"
                id="v-pills-settings-tab"
                data-toggle="pill"
                href="#v-pills-settings"
                role="tab"
                aria-controls="v-pills-settings"
                aria-selected="false">餐廳收藏清單</NavDropdown.Item>
            </div>
          </div>
          {/* nav */}
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
