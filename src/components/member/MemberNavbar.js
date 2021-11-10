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
                    className="nav-link" id="v-pills-home-tab"
                    data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">個人檔案</NavDropdown.Item>
                <NavDropdown.Item
                    as={NavLink}
                    to="/member/order"
                    className="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">歷史訂單</NavDropdown.Item>
                <NavDropdown.Item
                    as={NavLink}
                    to="/member/review"
                    className="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">我的評價</NavDropdown.Item>
                <NavDropdown.Item
                    as={NavLink}
                    to="/member/point"
                    className="nav-link"
                    id="v-pills-messages-tab"
                    data-toggle="pill"
                    href="#v-pills-messages"
                    role="tab"
                    aria-controls="v-pills-messages"
                    aria-selected="false">會員點數</NavDropdown.Item>
                <NavDropdown.Item
                    as={NavLink}
                    to="/member/FavoriteProduct"
                    className="nav-link"
                    id="v-pills-settings-tab"
                    data-toggle="pill"
                    href="#v-pills-settings"
                    role="tab"
                    aria-controls="v-pills-settings"
                    aria-selected="false">商品收藏清單</NavDropdown.Item>
                <NavDropdown.Item
                    as={NavLink}
                    to="/member/FavoriteArticle"
                    className="nav-link"
                    id="v-pills-settings-tab"
                    data-toggle="pill"
                    href="#v-pills-settings"
                    role="tab"
                    aria-controls="v-pills-settings"
                    aria-selected="false">文章收藏清單</NavDropdown.Item>
                <NavDropdown.Item
                    as={NavLink}
                    to="/member/FavoriteRestaurant"
                    className="nav-link"
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