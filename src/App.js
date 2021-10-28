// 使用套件
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import React, { useState } from 'react'
// import { imgUrl } from './config/index'
import './App.scss'

// 頁面用元件
import Home from './pages/Home'
import About from './pages/About'
import ProductBaby from './pages/ProductBaby'
import ProductMen from './pages/ProductMen'
import ProductWomen from './pages/ProductWomen'
import NotFoundPage from './pages/NotFoundPage'
import ProductCategory from './pages/ProductCategory'
import Student from './pages/Student'
import Article from './pages/article/Article'
import ArtFood from './pages/article/ArtFood'
import ArtFit from './pages/article/ArtFit'
import ArtRecipe from './pages/article/ArtRecipe'
// 餐廳
import Restaurants from './pages/Restaurant/Restaurants'
import ResMap from './pages/Restaurant/ResMap'
import ResProducts from './pages/Restaurant/ResProducts'
import Signup from './pages/Member/MemberSignup'
import Login from './pages/Member/MemberLogin'
import MemberProfile from './pages/Member/MemberProfile'
import MemberOrder from './pages/Member/MemberOrder'
import MemberReview from './pages/Member/MemberReview'
import MemberPoint from './pages/Member/MemberPoint'
import MemberFavoriteProduct from './pages/Member/MemberFavoriteProduct'
import MemberFavoriteRestaurant from './pages/Member/MemberFavoriteRestaurant'
import GameChoose from './pages/Game/GameChoose'
import GameRecipe from './pages/Game/GameRecipe'
import GameDelivery from './pages/Game/GameDelivery'

// 購物車
import Cart_PreOrder from './pages/Carts/Cart_PreOrder'
import Cart_Manage from './pages/Carts/Cart_Manage'
import Cart_ConfimOrder from './pages/Carts/Cart_ConfimOrder'
import Cart_Complete from './pages/Carts/Cart_Complete'

// 組合用元件
import MyNavbar from './components/MyNavbar'
import MyFooter from './components/MyFooter'
import MainContent from './components/MainContent'
import ScrollToTop from './components/ScrollToTop'
//import BreadCrumb from './components/BreadCrumb'
import MultiLevelBreadCrumb from './components/MultiLevelBreadCrumb'

function App() {
  const [auth, setAuth] = useState(false)
  const [member, setMember] = useState({
    id: 0
  })

  return (
    <Router>
      <>
        {/* LOGO+標題+導覽列+上方選單 */}
        <MyNavbar auth={auth} />
        {/* 主內容區 */}
        <MainContent className="mt-5">
          {/* <MultiLevelBreadCrumb /> */}
          {/* 匹配路由表(路徑單一匹配) */}
          {/* 切換顯示的元件畫面放在這下面 */}
          {/* ScrollToTop是為了讓連到另一頁內容時，頁面回到最上方 */}
          <ScrollToTop>
            <Switch>
              <Route path="/student">
                <Student />
              </Route>
              <Route path="/product/women">
                <ProductWomen />
              </Route>
              <Route path="/product/men">
                <ProductMen />
              </Route>
              {/* 這裡要定義網址參數的屬性名稱 */}
              <Route path="/product/baby/:id?">
                <ProductBaby />
              </Route>

              <Route path="/signup">
                {/* 利用props傳入頁面元件狀態 */}
                <Signup auth={auth} setAuth={setAuth} 
                />
              </Route>
              <Route path="/login">
                {/* 利用props傳入頁面元件狀態 */}
                <Login auth={auth} setAuth={setAuth}   setMember={setMember} />
              </Route>

              <Route path="/about">
                <About auth={auth} />
              </Route>

              <Route path="/article/food">
                <ArtFood auth={auth} />
              </Route>
              <Route path="/article/fitness">
                <ArtFit auth={auth} />
              </Route>
              <Route path="/article/recipe">
                <ArtRecipe auth={auth} />
              </Route>
              {/* 餐廳 */}
              <Route path="/restaurants">
                <Restaurants />
              </Route>
              <Route path="/resmap">
                <ResMap />
              </Route>
              <Route
                path="/resprdoucts/:id"
                component={ResProducts}
              />
              <Route exact path="/">
                <Home />
              </Route>

              <Route path="/article/food">
                <ArtFood auth={auth} />
              </Route>
              <Route path="/article">
                <Article auth={auth} />
              </Route>
              <Route exact path="/">
                <Home auth={auth} />
              </Route>
              <Route path="/productcategory">
                <ProductCategory />
              </Route>
              <Route path="/member/profile">
                <MemberProfile auth={auth} member={member} />
              </Route>
              <Route path="/member/order">
                <MemberOrder />
              </Route>
              <Route path="/member/review">
                <MemberReview />
              </Route>
              <Route path="/member/point">
                <MemberPoint />
              </Route>
              <Route path="/member/FavoriteProduct">
                <MemberFavoriteProduct />
              </Route>
              <Route path="/member/FavoriteRestaurant">
                <MemberFavoriteRestaurant />
              </Route>
              <Route path="/game/GameChoose">
                <GameChoose />
              </Route>
              <Route path="/game/GameRecipe">
                <GameRecipe />
              </Route>
              <Route path="/game/GameDelivery">
                <GameDelivery />
              </Route>

              {/* 購物車 */}
              <Route exact path="/carts/PreOrder">
                <Cart_PreOrder />
              </Route>
              <Route exact path="/carts/Manage">
                <Cart_Manage />
              </Route>
              <Route exact path="/carts/ConfirmOrder">
                <Cart_ConfimOrder />
              </Route>
              <Route exact path="/carts/Complete">
                <Cart_Complete />
              </Route>
              <Route path="*">
                <NotFoundPage />
              </Route>
            </Switch>
            {/* end 匹配路由表 */}
          </ScrollToTop>
        </MainContent>
        {/* 頁尾+版權訊息 */}
        <MyFooter />
      </>
    </Router>
  )
}

export default App
