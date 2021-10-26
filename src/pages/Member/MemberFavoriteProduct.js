import { withRouter } from 'react-router-dom'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { CgShoppingCart } from 'react-icons/cg'
import { IoIosHeart } from 'react-icons/io'
// import { noodles } from '../../../public/images/member/noodles.png'

function MemberFavoriteProduct(props) {
  console.log(props)
  return (
    <>
      <div className="member-favorite-container">
        <div className="row member-favorite-title">
          <h1 id="member-favorite-h1">商品追蹤清單</h1>
        </div>
        <div className="row member-favorite">
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
                a className="nav-link active"
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
        <div className="member-n col-1"></div>
        <div className="member-favorite-card col-9">
          <div className="card mb-3">
            <div className="row member-favorite-product">
              <div className="col-md-4">
                  <img className="img-fluid rounded-start"
                    src={`http://localhost:3000/images/member/noodles.png`}
                  alt="" />
              </div>
              <div className="col-md-7">
                <div className="card-body">
                  <div className="member-card-title">
                    <h5 className="card-title">
                      川椒麻辣蒟蒻拌麵(袋/3份入)
                    </h5>
                  </div>
                  <div className="member-favorite-text">
                    <p className="card-text">NT 280</p>
                  </div>
                </div>
              </div>
              <div className="member-icon col-md-1">
                <div className="member-like">
                  <IoIosHeart
                    style={{
                      fontSize: '30px',
                      color: '#d96e30',
                      cursor: 'pointer',
                    }}
                  />
                </div>
                <div className="member-cart">
                  <button
                    type="button"
                    className="btn member-cart-btn-primary">
                    加入購物車
                  </button>
                  <CgShoppingCart
                    class="member-cart-icon"
                    style={{
                      fontSize: '30px',
                      color: '#2a593e',
                      cursor: 'pointer',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="card mb-3">
              <div className="row member-favorite-product">
                <div className="col-md-4">
                  <img className="img-fluid rounded-start"
                    src={`http://localhost:3000/images/member/noodles.png`}
                    alt="" />
                </div>
                <div className="col-md-7">
                  <div className="card-body">
                    <div className="member-card-title">
                      <h5 className="card-title">
                        川椒麻辣蒟蒻拌麵(袋/3份入)
                    </h5>
                    </div>
                    <div className="member-favorite-text">
                      <p className="card-text">NT 280</p>
                    </div>
                  </div>
                </div>
                <div className="member-icon col-md-1">
                  <div className="member-like">
                    <IoIosHeart
                      style={{
                        fontSize: '30px',
                        color: '#d96e30',
                        cursor: 'pointer',
                      }}
                    />
                  </div>
                  <div className="member-cart">
                    <button
                      type="button"
                      className="btn member-cart-btn-primary">
                      加入購物車
                  </button>
                    <CgShoppingCart
                      class="member-cart-icon"
                      style={{
                        fontSize: '30px',
                        color: '#2a593e',
                        cursor: 'pointer',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          <div className="card mb-3">
              <div className="row member-favorite-product">
                <div className="col-md-4">
                  <img className="img-fluid rounded-start"
                    src={`http://localhost:3000/images/member/noodles.png`}
                    alt="" />
                </div>
                <div className="col-md-7">
                  <div className="card-body">
                    <div className="member-card-title">
                      <h5 className="card-title">
                        川椒麻辣蒟蒻拌麵(袋/3份入)
                    </h5>
                    </div>
                    <div className="member-favorite-text">
                      <p className="card-text">NT 280</p>
                    </div>
                  </div>
                </div>
                <div className="member-icon col-md-1">
                  <div className="member-like">
                    <IoIosHeart
                      style={{
                        fontSize: '30px',
                        color: '#d96e30',
                        cursor: 'pointer',
                      }}
                    />
                  </div>
                  <div className="member-cart">
                    <button
                      type="button"
                      className="btn member-cart-btn-primary">
                      加入購物車
                  </button>
                    <CgShoppingCart
                      class="member-cart-icon"
                      style={{
                        fontSize: '30px',
                        color: '#2a593e',
                        cursor: 'pointer',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>           
        </div>
        <div className="member-favorite-card-mobile">
            <div className="card mb-3 ">
              <div className="row member-favorite-product">
                <div className="col-md-4">
                  <img className="img-fluid rounded-start"
                    src={`http://localhost:3000/images/member/noodles.png`}
                    alt="" />
                </div>
                <div className="col-md-7">
                  <div className="card-body">
                    <div className="member-card-title">
                      <h5 className="card-title">
                        川椒麻辣蒟蒻拌麵(袋/3份入)
                      </h5>
                    </div>
                    <div className="member-favorite-text">
                      <p className="card-text">NT 280</p>
                    </div>
                  </div>
                </div>
                <div className="member-icon col-md-1">
                  <div className="member-like">
                    <IoIosHeart
                      style={{
                        fontSize: '30px',
                        color: '#d96e30',
                        cursor: 'pointer',
                      }}
                    />
                  </div>
                  <div className="member-cart">
                    <CgShoppingCart
                      style={{
                        fontSize: '30px',
                        color: '#2a593e',
                        cursor: 'pointer',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="card mb-3">
              <div className="row member-favorite-product">
                <div className="col-md-4">
                  <img className="img-fluid rounded-start"
                    src={`http://localhost:3000/images/member/noodles.png`}
                    alt="" />
                </div>
                <div className="col-md-7">
                  <div className="card-body">
                    <div className="member-card-title">
                      <h5 className="card-title">
                        川椒麻辣蒟蒻拌麵(袋/3份入)
                      </h5>
                    </div>
                    <div className="member-favorite-text">
                      <p className="card-text">NT 280</p>
                    </div>
                  </div>
                </div>
                <div className="member-icon col-md-1">
                  <div className="member-like">
                    <IoIosHeart
                      style={{
                        fontSize: '30px',
                        color: '#d96e30',
                        cursor: 'pointer',
                      }}
                    />
                  </div>
                  <div className="member-cart">
                    <CgShoppingCart
                      style={{
                        fontSize: '30px',
                        color: '#2a593e',
                        cursor: 'pointer',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="card mb-3">
              <div className="row member-favorite-product">
                <div className="col-md-4">
                  <img className="img-fluid rounded-start"
                    src={`http://localhost:3000/images/member/noodles.png`}
                    alt="" />
                </div>
                <div className="col-md-7">
                  <div className="card-body">
                    <div className="member-card-title">
                      <h5 className="card-title">
                        川椒麻辣蒟蒻拌麵(袋/3份入)
                      </h5>
                    </div>
                    <div className="member-favorite-text">
                      <p className="card-text">NT 280</p>
                    </div>
                  </div>
                </div>
                <div className="member-icon col-md-1">
                  <div className="member-like">
                    <IoIosHeart
                      style={{
                        fontSize: '30px',
                        color: '#d96e30',
                        cursor: 'pointer',
                      }}
                    />
                  </div>
                  <div className="member-cart">
                    <CgShoppingCart
                      style={{
                        fontSize: '30px',
                        color: '#2a593e',
                        cursor: 'pointer',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </>
  )
}

export default withRouter(MemberFavoriteProduct)
