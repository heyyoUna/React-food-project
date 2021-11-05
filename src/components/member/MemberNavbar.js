import React from 'react'
import { NavDropdown } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

function MemberNavbar(props) {
    return (
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
                    a className="nav-link"
                    id="v-pills-settings-tab"
                    data-toggle="pill"
                    href="#v-pills-settings"
                    role="tab"
                    aria-controls="v-pills-settings"
                    aria-selected="false">商品收藏清單</NavDropdown.Item>
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
    )
}

export default MemberNavbar