import React, { useState } from 'react'
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
  const { auth } = props

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
              <Nav.Link href="/customization">
                量身訂做
              </Nav.Link>

              <NavDropdown
                title="好食商城"
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="/shop/convenient">
                  快速上桌
                </NavDropdown.Item>
                <NavDropdown.Item href="/shop/fitness">
                  健身專區
                </NavDropdown.Item>
                <NavDropdown.Item href="/product/selected">
                  嚴選食材
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/product">
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
                <i class="fas fa-search"></i>
              </Nav.Link>

              <Nav.Link href="/login">
                <i class="far fa-user"></i>
              </Nav.Link>

              <NavDropdown
                title="會員專區"
                id="basic-nav-dropdown"
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
                  商品追蹤清單
                </NavDropdown.Item>

                <NavDropdown.Item href="/member/FavoriteArticle">
                  文章收藏清單
                </NavDropdown.Item>

                <NavDropdown.Item href="/member/FavoriteRestaurant">
                  餐廳收藏清單
                </NavDropdown.Item>

                <NavDropdown.Divider />
                <NavDropdown.Item href="/logout">
                  登出
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link href="/carts/PreOrder">
                <i class="fas fa-shopping-cart"></i>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default MyNavbar
