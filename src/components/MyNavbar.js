import React from 'react'
import { Link, useHistory } from 'react-router-dom'

import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
} from 'react-bootstrap'
import { imgUrl } from '../config/index'
import '../App.scss'

// 要使用能有active css效果的NavLink元件
// import { NavLink } from 'react-router-dom'

function MyNavbar(props) {
  let history = useHistory()
  const { auth, setAuth, CountNav, setCountNav } = props

  const handlingLogout = (e) => {
    localStorage.removeItem('token')
    localStorage.setItem('數量', 0)

    setAuth(false)
    setCountNav(0)

    history.push('/')
  }

  return (
    <>
      <Navbar
        bg="light"
        expand="lg"
        className="myNavbarNew"
        fixed="top"
      >
        <Container>
          <Navbar.Brand className="navLogoWrap">
            <Link to="/">
              <img
                src={`${imgUrl}/images/logo.png`}
                alt=""
              />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto mx-auto">
              <Nav.Link>
                <Link to="/customize">良身訂做</Link>
              </Nav.Link>

              <NavDropdown
                title="好食商城"
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item>
                  <Link to="/products/?cate=1&page=1">
                    快速上桌
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/products/?cate=2&page=1">
                    健身專區
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/products/?cate=3&page=1">
                    嚴選食材
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <Link to="/products/?cate=0&page=1">
                    全部商品
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown
                title="好食專欄"
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item>
                  <Link to="/article/food">聰明飲食</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/article/exercise">
                    運動訓練
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to="/article/recipe">美味食譜</Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/article">
                  <Link to="/article">全部文章</Link>
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link>
                <Link to="/restaurants">健康餐盒</Link>
              </Nav.Link>

              <Nav.Link>
                <Link to="/game/GameChoose">餐食輪盤</Link>
              </Nav.Link>
            </Nav>
            <Nav>
              {/* <Nav.Link href="/search">
                <i className="fas fa-search"></i>
              </Nav.Link> */}
              <Nav.Link
                href="/login"
                style={
                  auth
                    ? { display: 'none' }
                    : { display: 'block' }
                }
              >
                <i className="far fa-user"></i>
              </Nav.Link>

              <NavDropdown
                title="會員專區"
                id="basic-nav-dropdown"
                style={
                  auth
                    ? { display: 'block' }
                    : { display: 'none' }
                }
              >
                <NavDropdown.Item>
                  <Link to="/member/profile">個人檔案</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/member/order">歷史訂單</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/member/review">我的評價</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/member/point">會員點數</Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/member/FavoriteProduct">
                    商品收藏清單
                  </Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/member/FavoriteArticle">
                    文章收藏清單
                  </Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/member/FavoriteRestaurant">
                    餐廳收藏清單
                  </Link>
                </NavDropdown.Item>

                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <Link to="/member/ChangePassword">
                    更改密碼
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item onClick={handlingLogout}>
                  登出
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link href="/carts/PreOrder">
                <div
                  className="carticon"
                  style={{
                    position: 'relative',
                  }}
                >
                  <Link to="/carts/PreOrder">
                    <i className="fas fa-shopping-cart"></i>
                  </Link>

                  <div
                    className="circle"
                    style={{
                      width: '25px',
                      height: '25px',
                      borderRadius: '50px',
                      backgroundColor: '#8FC065',
                      position: 'absolute',
                      top: '-30%',
                      left: '60%',
                    }}
                  >
                    <p
                      style={{
                        color: '#ffffff',
                        paddingBottom: '10px',
                      }}
                    >
                      {CountNav}
                    </p>
                  </div>
                </div>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default MyNavbar
