import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
} from 'react-bootstrap'
import { imgUrl } from '../config/index'
import '../App.scss'

// 要使用能有active css效果的NavLink元件
import { NavLink } from 'react-router-dom'

function MyNavbar(props) {
  const { auth, setAuth } = props
  let a = localStorage.getItem('數量')
  let [CountNav, setCountNav] = useState(a)
  let history = useHistory()
  const handlingLogout = (e) => {
    localStorage.removeItem('token')
    setAuth(false)

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
          <Navbar.Brand href="/" className="navLogoWrap">
            <img src={`${imgUrl}/images/logo.png`} alt="" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto mx-auto">
              <Nav.Link href="/customize">
                量身訂做
              </Nav.Link>

              <NavDropdown
                title="好食商城"
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="/products/?cate=1&page=1">
                  快速上桌
                </NavDropdown.Item>
                <NavDropdown.Item href="/products/?cate=2&page=1">
                  健身專區
                </NavDropdown.Item>
                <NavDropdown.Item href="/products/?cate=3&page=1">
                  嚴選食材
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/products/?cate=0&page=1">
                  查看全部
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown
                title="好食專欄"
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="/article/food">
                  聰明飲食
                </NavDropdown.Item>
                <NavDropdown.Item href="/article/exercise">
                  運動訓練
                </NavDropdown.Item>
                <NavDropdown.Item href="/article/recipe">
                  美味食譜
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/article">
                  查看全部
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link href="/restaurants">
                健康餐盒
              </Nav.Link>

              <Nav.Link href="/game/GameChoose">
                餐食輪盤
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="/search">
                <i className="fas fa-search"></i>
              </Nav.Link>

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
                <NavDropdown.Item href="/member/profile">
                  個人檔案
                </NavDropdown.Item>
                <NavDropdown.Item href="/member/order">
                  歷史訂單
                </NavDropdown.Item>

                <NavDropdown.Item href="/member/review">
                  我的評價
                </NavDropdown.Item>

                <NavDropdown.Item href="/member/point">
                  會員點數
                </NavDropdown.Item>

                <NavDropdown.Item href="/member/FavoriteProduct">
                  商品收藏清單
                </NavDropdown.Item>

                <NavDropdown.Item href="/member/FavoriteArticle">
                  文章收藏清單
                </NavDropdown.Item>

                <NavDropdown.Item href="/member/FavoriteRestaurant">
                  餐廳收藏清單
                </NavDropdown.Item>

                <NavDropdown.Divider />
                <NavDropdown.Item href="/member/ChangePassword">
                  更改密碼
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
                  <i className="fas fa-shopping-cart"></i>
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
