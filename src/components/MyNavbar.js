import React from 'react'
import { withRouter } from 'react-router-dom'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { imgUrl } from '../config/index'
import '../App.scss'

// 要使用能有active css效果的NavLink元件
import { NavLink } from 'react-router-dom'

function MyNavbar(props) {
  const { auth } = props

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        // bg="primary"
        variant="dark"
        fixed="top"
        className="MyNavbar"
      >
        <Navbar.Brand
          className="navLogoWrap"
          as={NavLink}
          to="/"
        >
          <img src={`${imgUrl}/images/logo.png`} alt="" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <div></div>
          <Nav className="mr-auto">
            {/* 利用as屬性來作選單link的整合 */}
            {/* 參考：https://react-bootstrap.github.io/components/navs/#nav-link-props */}
            <Nav.Link as={NavLink} to="/customization">
              量身訂做
            </Nav.Link>

            <NavDropdown
              title="好食商城"
              id="collasible-nav-dropdown"
            >
              <NavDropdown.Item
                as={NavLink}
                to="/shop/convenient"
              >
                快速上桌
              </NavDropdown.Item>
              <NavDropdown.Item
                as={NavLink}
                to="/shop/fitness"
              >
                健身專區
              </NavDropdown.Item>
              {/* <NavDropdown.Divider /> */}
              <NavDropdown.Item
                as={NavLink}
                to="/product/selected"
              >
                嚴選食材
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/product">
                查看全部
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown
              title="好食專欄"
              id="collasible-nav-dropdown"
            >
              <NavDropdown.Item
                as={NavLink}
                to="/article/food"
              >
                聰明飲食
              </NavDropdown.Item>
              <NavDropdown.Item
                as={NavLink}
                to="/article/fitness"
              >
                運動訓練
              </NavDropdown.Item>
              {/* <NavDropdown.Divider /> */}
              <NavDropdown.Item
                as={NavLink}
                to="/article/recipe"
              >
                美味食譜
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/article">
                查看全部
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={NavLink} to="/about">
              健康餐盒
            </Nav.Link>
            <Nav.Link as={NavLink} to="/game/GameChoose">
              餐食輪盤
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={NavLink} to="/search">
              <i class="fas fa-search"></i>
            </Nav.Link>
            <Nav.Link as={NavLink} to="/login">
              <i class="far fa-user"></i>
            </Nav.Link>
            <Nav>
              <NavDropdown
                title="會員專區"
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item
                  as={NavLink}
                  to="/member/profile">
                  個人檔案
              </NavDropdown.Item>
                <NavDropdown.Item
                  as={NavLink}
                  to="/member/order">
                  歷史訂單
              </NavDropdown.Item>
                {/* <NavDropdown.Divider /> */}
                <NavDropdown.Item
                  as={NavLink}
                  to="/member/review">
                  我的評價
              </NavDropdown.Item>
                <NavDropdown.Item
                  as={NavLink}
                  to="/member/point">
                  會員點數
              </NavDropdown.Item>
                <NavDropdown.Item
                  as={NavLink}
                  to="/member/FavoriteProduct">
                  商品追蹤清單
              </NavDropdown.Item>
                <NavDropdown.Item
                  as={NavLink}
                  to="/member/FavoriteArticle">
                  文章收藏清單
              </NavDropdown.Item>
                <NavDropdown.Item
                  as={NavLink}
                  to="/member/FavoriteRestaurant">
                  餐廳收藏清單
              </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav.Link as={NavLink} to="/search">
              <i class="fas fa-shopping-cart"></i>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default MyNavbar
