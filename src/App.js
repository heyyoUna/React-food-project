// 使用套件
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import React, { useState, useEffect } from 'react'
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

//文章
import Article from './pages/article/Article'
import ArtFood from './pages/article/ArtFood'
import ArtExercise from './pages/article/ArtExercise'
import ArtRecipe from './pages/article/ArtRecipe'
import FoodContent from './pages/article/FoodContent'
import ExerciseContent from './pages/article/ExerciseContent'
import RecipeContent from './pages/article/RecipeContent'

// 餐廳
import Restaurants from './pages/Restaurant/Restaurants'
import ResMap from './pages/Restaurant/ResMap'
import ResProducts from './pages/Restaurant/ResProducts'

//會員
import Signup from './pages/Member/MemberSignup'
import Login from './pages/Member/MemberLogin'
import MemberProfile from './pages/Member/MemberProfile'
import MemberOrder from './pages/Member/MemberOrder'
import MemberOrderDetail from './pages/Member/MemberOrderDetail'
import MemberReview from './pages/Member/MemberReview'
import MemberPoint from './pages/Member/MemberPoint'
import MemberFavoriteProduct from './pages/Member/MemberFavoriteProduct'
import MemberFavoriteArticle from './pages/Member/MemberFavoriteArticle'
import MemberFavoriteRestaurant from './pages/Member/MemberFavoriteRestaurant'
import MemberChangePassword from './pages/Member/MemberChangePassword'

//輪盤
import GameChoose from './pages/Game/GameChoose'
import GameRecipe from './pages/Game/GameRecipe'
import GameDelivery from './pages/Game/GameDelivery'

// 購物車
import CartPreOrder from './pages/Carts/CartPreOrder'
import CartManage from './pages/Carts/CartManage'
import CartConfimOrder from './pages/Carts/CartConfimOrder'
import CartComplete from './pages/Carts/CartComplete'

// 商城
import ProductDetail from './pages/Product/ProductDetail'
import Products from './pages/Product/Products'
import Customize from './pages/Product/Customize'

// 組合用元件
import MyNavbar from './components/MyNavbar'
import MyNavbarOriginal from './components/MyNavbarOriginal'
import MyFooter from './components/MyFooter'
import MainContent from './components/MainContent'
//import BreadCrumb from './components/BreadCrumb'
// import MultiLevelBreadCrumb from './components/MultiLevelBreadCrumb'

function App() {
  const [auth, setAuth] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      setAuth(false)
    } else {
      setAuth(true)
    }
  }, [])

  return (
    <Router>
      <>
        {/* LOGO+標題+導覽列+上方選單 */}
        <MyNavbar auth={auth} setAuth={setAuth} />
        {/* <MyNavbarOriginal auth={auth} /> */}

        {/* 主內容區 */}
        <MainContent className="pt-5">
          {/* <MultiLevelBreadCrumb /> */}
          {/* 匹配路由表(路徑單一匹配) */}
          {/* 切換顯示的元件畫面放在這下面 */}
          {/* ScrollToTop是為了讓連到另一頁內容時，頁面回到最上方 */}
          
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

              {/* 商城 */}
              <Route path="/products">
                <Products/>
              </Route>

              <Route path="/product/:id">
                <ProductDetail
                />
              </Route>

              <Route path="/customize">
                <Customize/>
              </Route>

              {/* 文章 */}
              {/* <Route path="/article/ExerciseContent">
                <ExerciseContent auth={auth} />
              </Route> */}
              <Route
                path="/RecipeContent/:id"
                component={RecipeContent}
              ></Route>

              <Route
                path="/ExerciseContent/:id"
                component={ExerciseContent}
              ></Route>

              <Route
                path="/FoodContent/:id"
                component={FoodContent}
              ></Route>

              <Route path="/article/recipe">
                <ArtRecipe auth={auth} />
              </Route>

              <Route path="/article/exercise">
                <ArtExercise auth={auth} />
              </Route>

              <Route path="/article/food">
                <ArtFood auth={auth} />
              </Route>

              <Route path="/article">
                <Article auth={auth} />
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
                <Home auth={auth} />
              </Route>

              <Route path="/productcategory">
                <ProductCategory />
              </Route>

              {/* 會員 */}
              <Route path="/signup">
                {/* 利用props傳入頁面元件狀態 */}
                <Signup auth={auth} setAuth={setAuth} />
              </Route>

              <Route path="/login">
                {/* 利用props傳入頁面元件狀態 */}
                <Login auth={auth} setAuth={setAuth} />
              </Route>

              <Route path="/member/profile">
                <MemberProfile auth={auth} />
              </Route>

              <Route path="/member/order">
                <MemberOrder />
              </Route>

            <Route path="/member/orderdetail">
                <MemberOrderDetail />
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

              <Route path="/member/FavoriteArticle">
                <MemberFavoriteArticle />
              </Route>

              <Route path="/member/FavoriteRestaurant">
                <MemberFavoriteRestaurant />
              </Route>

              <Route path="/member/ChangePassword">
                <MemberChangePassword />
              </Route>

              {/* 輪盤 */}
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
                <CartPreOrder />
              </Route>
              <Route exact path="/carts/Manage">
                <CartManage />
              </Route>
              <Route exact path="/carts/ConfirmOrder">
                <CartConfimOrder />
              </Route>
              <Route exact path="/carts/Complete">
                <CartComplete />
              </Route>
              <Route path="*">
                <NotFoundPage />
              </Route>
            </Switch>
            {/* end 匹配路由表 */}
        </MainContent>
        {/* 頁尾+版權訊息 */}
        <MyFooter />
      </>
    </Router>
  )
}

export default App