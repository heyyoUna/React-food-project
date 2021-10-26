import { withRouter } from 'react-router-dom'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

function MemberPoint(props) {
  console.log(props)
  return (
    <>
      <div className=" member-point-container">
        <div className="row member-point-title">
          <h1 id="member-point-h1">會員點數</h1>
        </div>
        <div className="row member-point-table">
          {/* <!-- nav --> */}
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
                a className="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">歷史訂單</NavDropdown.Item>
              <NavDropdown.Item
                as={NavLink}
                to="/member/review"
                a className="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">我的評價</NavDropdown.Item>
              <NavDropdown.Item
                as={NavLink}
                to="/member/point"
                a className="nav-link active"
                id="v-pills-messages-tab"
                data-toggle="pill"
                href="#v-pills-messages"
                role="tab"
                aria-controls="v-pills-messages"
                aria-selected="false">會員點數</NavDropdown.Item>
              <NavDropdown.Item
                as={NavLink}
                to="/member/FavoriteProduct"
                a className="nav-link"
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
          <div className="member-point col-10">
            <div className="table-responsive-xl">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col" className="member-point-primary">日期</th>
                    <th scope="col" className="member-point-primary">點數更動原因</th>
                    <th scope="col" className="member-point-primary">點數</th>
                    <th scope="col" className="member-point-primary">到期日</th>
                    <th scope="col" className="member-point-primary">現有總點數</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">2021-05-20</th>
                    <td>專欄Q&A正確回答</td>
                    <td>1點</td>
                    <td>2021-12-31</td>
                    <td>1點</td>
                  </tr>

                  <tr>
                    <th scope="row">2021-04-19</th>
                    <td>已使用點數在此筆訂單 <br /> <a href="">2019101015452170</a></td>
                    <td>-51點</td>
                    <td>2021-12-31</td>
                    <td>0點</td>
                  </tr>
                  <tr>
                    <th scope="row">2021-03-18</th>
                    <td>專欄Q&A正確回答</td>
                    <td>1點</td>
                    <td>2021-12-31</td>
                    <td>51點</td>
                  </tr>
                  <tr>
                    <th scope="row">2021-02-17</th>
                    <td>新加入會員點數</td>
                    <td>50點</td>
                    <td>2021-12-31</td>
                    <td>50點</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="member-point-mobile">
            <div className="table-responsive-xl">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col" className="member-point-primary">日期</th>
                    <th scope="col" className="member-point-primary">點數更動原因</th>
                    <th scope="col" className="member-point-primary">點數</th>
                    <th scope="col" className="member-point-primary">到期日</th>
                    <th scope="col" className="member-point-primary">現有總點數</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">2021-05-20</th>
                    <td>專欄Q&A正確回答</td>
                    <td>1點</td>
                    <td>2021-12-31</td>
                    <td>1點</td>
                  </tr>

                  <tr>
                    <th scope="row">2021-04-19</th>
                    <td>已使用點數在此筆訂單 <br /> <a href="">2019101015452170</a></td>
                    <td>-51點</td>
                    <td>2021-12-31</td>
                    <td>0點</td>
                  </tr>
                  <tr>
                    <th scope="row">2021-03-18</th>
                    <td>專欄Q&A正確回答</td>
                    <td>1點</td>
                    <td>2021-12-31</td>
                    <td>51點</td>
                  </tr>
                  <tr>
                    <th scope="row">2021-02-17</th>
                    <td>新加入會員點數</td>
                    <td>50點</td>
                    <td>2021-12-31</td>
                    <td>50點</td>
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

export default withRouter(MemberPoint)
