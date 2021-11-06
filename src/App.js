// 使用套件
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from 'react-router-dom'
import React, { useState, useEffect } from 'react'
// import { imgUrl } from './config/index'
import './App.scss'

// 頁面用元件
import Home from './pages/Home'

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
import MemberForgotPassword from './pages/Member/MemberForgotPassword'

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
import ScrollToTop from './components/ScrollToTop'
import MyNavbarOriginal from './components/MyNavbarOriginal'
import MyFooter from './components/MyFooter'
import MainContent from './components/MainContent'
//import BreadCrumb from './components/BreadCrumb'
// import MultiLevelBreadCrumb from './components/MultiLevelBreadCrumb'

function App() {
  let a = parseInt(localStorage.getItem('數量'))
  const [restaurantId, setRestaurantId] = useState('')
  const [productId, setProductId] = useState('')
  const [CountNav, setCountNav] = useState(
    !CountNav ? a : CountNav
  )
  const [auth, setAuth] = useState(false)
  //給客製化跟商品區收藏商品資料用
  const [favArr, setFavArr] = useState([])
  // 客製化用
  const [gender, setGender] = useState('男')
  const [years, setYears] = useState('')
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [oriTDEE, setOriTDEE] = useState(0)
  const [TDEE, setTDEE] = useState(0)

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
        <MyNavbar
          auth={auth}
          setAuth={setAuth}
          CountNav={CountNav}
          setCountNav={setCountNav}
        />
        {/* <MyNavbarOriginal auth={auth} /> */}

        {/* 主內容區 */}
        <MainContent className="pt-5">
          {/* <MultiLevelBreadCrumb /> */}
          {/* 匹配路由表(路徑單一匹配) */}
          {/* 切換顯示的元件畫面放在這下面 */}
          {/* ScrollToTop是為了讓連到另一頁內容時，頁面回到最上方 */}

          <Switch>
            {/* 商城 */}
            <Route path="/products">
              <Products
                favArr={favArr}
                setFavArr={setFavArr}
              />
            </Route>

            <Route path="/product/:id">
              <ProductDetail />
            </Route>
            
            <Route path="/customize">
            <ScrollToTop>
              <Customize
                favArr={favArr}
                setFavArr={setFavArr}
                gender={gender}
                setGender={setGender}
                years={years}
                setYears={setYears}
                height={height}
                setHeight={setHeight}
                weight={weight}
                setWeight={setWeight}
                TDEE={TDEE}
                setTDEE={setTDEE}
                oriTDEE={oriTDEE}
                setOriTDEE={setOriTDEE}
              />
              </ScrollToTop>
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
              <Home 
              auth={auth}
              gender={gender}
              setGender={setGender}
              years={years}
              setYears={setYears}
              height={height}
              setHeight={setHeight}
              weight={weight}
              setWeight={setWeight}
              TDEE={TDEE}
              setTDEE={setTDEE}
              oriTDEE={oriTDEE}
              setOriTDEE={setOriTDEE} />
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

            <Route path="/member/ForgotPassword/:email/:password">
              <MemberForgotPassword />
            </Route>

            {/* 輪盤 */}
            <Route path="/game/GameChoose">
              <GameChoose />
            </Route>

            <Route path="/game/GameRecipe">
              <GameRecipe setProductId={setProductId} />
            </Route>

            <Route path="/game/GameDelivery">
              <GameDelivery
                setRestaurantId={setRestaurantId}
              />
            </Route>

            {/* 購物車 */}
            <Route exact path="/carts/PreOrder">
              <CartPreOrder
                CountNav={CountNav}
                setCountNav={setCountNav}
              />
            </Route>
            <Route exact path="/carts/Manage">
              <CartManage />
            </Route>
            <Route exact path="/carts/ConfirmOrder">
              <CartConfimOrder />
            </Route>
            <Route exact path="/carts/Complete">
              <CartComplete setCountNav={setCountNav} />
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
