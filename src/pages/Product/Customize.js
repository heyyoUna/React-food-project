import React, { useRef,useState, useEffect } from 'react'
import { Customize_API } from './../../config/config.js'
import {
  BrowserRouter as Router,
  withRouter,Link, useHistory,
} from 'react-router-dom'
import { API_img } from '../../config/index'
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

// 引用元件
import ProductCard from './../../components/Product/ProductCard'
import Target from '../../components/Product/Target'
import Clientinfo from '../../components/Product/Clientinfo'

function Customize(props) {
  const ID = localStorage.getItem('id')
  const token = localStorage.getItem('token')
  let history = useHistory()
  const [display, setDisplay] = useState(true)

  const { 
    setProductId,
    setFavArr, 
    favArr,
    gender,
    setGender,
    years,
    setYears,
    height,
    setHeight,
    weight,
    setWeight,
    oriTDEE,
    setOriTDEE,
    TDEE,
    setTDEE,
  } = props
  // 運動習慣狀態
  const [target, setTarget] = useState('變瘦')
  const [exercises, setExercises] = useState('不運動')
  // 建議攝取熱量(展示用)
  const [sugCal, setSugCal] = useState(0)
  // 建議攝取蛋白質
  const [sugProtein, setSugProtein] = useState(0)
  // 推薦商品
  const [sugProducts, setSugProducts] = useState([])
  // 推薦餐盒
  const [ sugFoodBox, setSugFoodBox] = useState([])
  // 推薦文章
  const [ sugArt, setSugArt] = useState([])
  

  const myRef = useRef(null)

  // 拿到會員收藏商品資料
  useEffect(() => {
    ;(async () => {
      const r = await fetch(
        'http://localhost:3002/product/fav/' + ID
      )
      const obj = await r.json()
      setFavArr(obj.data)
    })()
  }, [])

  // 商品區要資料
  useEffect(() => {
    ; (async () => {
      if(target==='變瘦'){
        const r = await fetch(`${Customize_API}` + `?target=變瘦`)
      const obj = await r.json()
      setSugProducts(obj.rows)
      }else{
        const r = await fetch(`${Customize_API}` + `${props.location.search}`)
        const obj = await r.json()
        setSugProducts(obj.rows)
      }
    })()
  }, [target])

  //餐盒要資料
  useEffect(() => {
    ; (async () => {
      if(target==='變瘦'){
        const r = await fetch(`http://localhost:3002/reslist/introduce/calories`)
        const obj = await r.json()
        setSugFoodBox(obj)
      }
      if(target==='增肌減脂'){
        const r = await fetch(`http://localhost:3002/reslist/introduce/protein`)
        const obj = await r.json()
        setSugFoodBox(obj)
      }
    })()
  }, [target])

  // 文章要資料
  useEffect(() => {
    ; (async () => {
      if(target==='變瘦'){
        const r = await fetch(`http://localhost:3002/ArtExercise/article/lostweight`)
        const obj = await r.json()
        setSugArt(obj)
      }
      if(target==='增肌減脂'){
        const r = await fetch(`http://localhost:3002/ArtExercise/article/muscle`)
        const obj = await r.json()
        setSugArt(obj)
      }
    })()
  }, [target])

  //轉換時間格式for 文章區用
  function articleDate(aaa) {
    let time = new Date(aaa)
    let year = time.getFullYear()
    let month = time.getMonth()
    let date = time.getDate()

    return `${year} - ${month + 1} - ${date} `
  }

  // TDEE設定完在設定建議攝取量(建議熱量/建議蛋白質)
  // 預設值是變瘦＋不運動
  useEffect(() => {
    setSugCal(Math.ceil(oriTDEE * 0.8))
    setSugProtein(Math.ceil(weight * 1.2))
  }, [TDEE])

  //  計算公式
  const calculate = () => {
    if (target === '變瘦' && exercises === '不運動') {
      //建議熱量
      let newTDEE = Math.ceil(oriTDEE)
      let sugCal = Math.ceil(oriTDEE * 0.8)
      setTDEE(newTDEE)
      setSugCal(sugCal)
      setSugProtein(Math.ceil(weight * 1.2))
    }
    if (target === '變瘦' && exercises === '三次左右') {
      let newTDEE = Math.ceil((oriTDEE / 1.2) * 1.375)
      let sugCal = Math.ceil((oriTDEE / 1.2) * 1.375 * 0.8)
      setSugCal(sugCal)
      setTDEE(newTDEE)
      setSugProtein(Math.ceil(weight * 1.2))
    }
    if (target === '變瘦' && exercises === '五次以上') {
      let newTDEE = Math.ceil((oriTDEE / 1.2) * 1.55)
      let sugCal = Math.ceil((oriTDEE / 1.2) * 1.55 * 0.8)
      setSugCal(sugCal)
      setTDEE(newTDEE)
      setSugProtein(Math.ceil(weight * 1.2))
    }
    if (target === '增肌減脂' && exercises === '不運動') {
      let newTDEE = Math.ceil(oriTDEE)
      let sugCal = Math.ceil(oriTDEE * 1.2)
      let targetProtein = (Math.ceil(weight*1.6))
      setSugCal(sugCal)
      setTDEE(newTDEE)
      setSugProtein(targetProtein)
    }
    if (target === '增肌減脂' && exercises === '三次左右') {
      let newTDEE = Math.ceil((oriTDEE / 1.2) * 1.375)
      let sugCal = Math.ceil((oriTDEE / 1.2) * 1.375 * 1.2)
      let targetProtein = (Math.ceil(weight*1.6))
      setSugCal(sugCal)
      setTDEE(newTDEE)
      setSugProtein(targetProtein)
    }
    if (target === '增肌減脂' && exercises === '五次以上') {
      let newTDEE = Math.ceil((oriTDEE / 1.2) * 1.55)
      let sugCal = Math.ceil((oriTDEE / 1.2) * 1.55 * 1.2)
      let targetProtein = (Math.ceil(weight*1.6))
      setSugCal(sugCal)
      setTDEE(newTDEE)
      setSugProtein(targetProtein)
    }
  }
  // 有變動的時候重新計算
  useEffect(() => {
    calculate()
  }, [target, exercises,TDEE])

  const mySubmit = () => {
    //滾動效果
    myRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  // 客製化按鈕滑動
  const scroll = ()=>{
    window.scroll({
      top: 800,
      behavior: 'smooth',
    })
  }
 
  // 按鈕特效
  const buttonCSS = ()=>{
    const btn = document.querySelector('.pd-client-btn')
    btn.classList.remove('animate__pulse')
    setTimeout(() => {
      btn.classList.add('animate__pulse')},
       500);
  }

  useEffect(() => {
    if(exercises&&target){
      buttonCSS()
    }
  }, [exercises,target]);
  
  return (
    <>
      <div className="pd-client-banner d-flex">
        <div className="pd-target-wrap d-flex col-lg-7 col-md-12">
          {/* 左區-運動目標+習慣------- */}
          <Target
            target={target}
            setTarget={setTarget}
            exercises={exercises}
            setExercises={setExercises}
            TDEE={TDEE}
          />
        </div>
        {/* 右區-使用者資料------- */}
        <div className="pd-client-wrap d-flex col-lg-5 col-md12">
          <div className="pd-client-info d-flex">
            <Clientinfo
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
          </div>
          <div className="pd-suggest d-flex">
            <p className="dkgreen">每日消耗熱量{TDEE}大卡</p>
            <p className="pd-day">建議每日攝取</p>
            <p className="dkgreen">熱量<span className="orange">{sugCal}</span>大卡</p>
            <p className="dkgreen">蛋白質<span className="orange">{sugProtein}</span>克</p>
          </div>
          <button className="pd-client-btn animate__animated animate__pulse" 
          // onClick={mySubmit}
          onClick={scroll}
          >
            查看飲食推薦
          </button>
        </div>
      </div>
      {/* 推薦區 */}
      <div className="container d-flex pd-sug-wrap">
        <h1>商品推薦</h1>
        <div className="pd-card-wrap d-flex col-12">
          {sugProducts.map((v, i) => {
            return (
              <ProductCard
                favArr={favArr}
                key={v.sid}
                sid={v.sid}
                img={v.product_img}
                name={v.name}
                cal={v.content_cal}
                price={v.price}
                setProductId={setProductId}
              />
            )
          })}
          <div className="pd-viewmore-wrap">
            <i className="fas fa-angle-double-right front"></i>

            <Link to={'/products/?cate=0&page=1'}>
            <div className="pd-viewmore">查看更多商品</div>
            </Link>

            <i className="fas fa-angle-double-right back"></i>
          </div>
        </div>
        <h1>餐盒推薦</h1>
        <div className="container mx-auto mb50">
        <div className="row  justify-content-center ">
        {sugFoodBox.map((v,i)=>{
        return (
          <div className="col-md-4 col-12 ">
            <div class="res-menu m-4">
              <div className="res-pic-wrapper">
                <div className="res-product-card-overlay d-flex justify-content-center  ">
                  <Link to={'/restaurants'}>
                    <div className="res-orderBtn  ">
                      前往訂餐
                    </div>
                  </Link>
                </div>
                <img
                  className="res-product-Img"
                  src={
                    'http://localhost:3002/img/restaurant/' +
                    v.res_product_img
                  }
                  alt=""
                  style={{
                    width: '100%',
                    height: '165px',
                    borderRadius: '15px 15px 0 0',
                    objectFit: 'cover',
                  }}
                />
              </div>
              <div className="res-product-body fw-700  ">
                <div className="res-product-title d-flex justify-content-between">
                  <h3>{v.res_product_name}</h3>
                  <h3>NT$ {v.res_product_price}</h3>
                </div>
                <div className="res-product-kcal d-flex justify-content-between">
                  <p>蛋白質:{v.protein}g</p>
                  <p>碳水:{v.adipose}g</p>
                  <p>脂防:{v.carbohydrate}g</p>
                </div>
                <p className="text-right">
                  熱量:{v.calories}kcal
                </p>
              </div>
            </div>
          </div>
              )
        })}
          <div className="pd-viewmore-wrap">
            <i className="fas fa-angle-double-right front"></i>

            <Link to={'/restaurants'}>
            <div className="pd-viewmore">查看更多餐盒</div>
            </Link>

            <i className="fas fa-angle-double-right back"></i>
          </div>
          </div>
        </div>
        <h1>文章推薦</h1>
        <div className="container col-cat-article">
          <div className="row">
            <div className="col-md-12 client-art-wrap d-flex flex-wrap">
            {sugArt.map((v,i)=>{
              return (
              <div className="artColCards client-art cardsHover sug-art">
                <Link to={`/ExerciseContent/${v.sid}`}>
                  <div className="imgWrap col-lg">
                    <img src={`${API_img}` + v.ar_pic} alt="" />
                  </div>
                </Link>

                <div className="px-1 py-1 arCardTxt">
                  <div className="d-flex justify-content-between pr-5">
                    <p className="grey">運動訓練</p>
                    <div className="pd-love-icon">
                      <IoIosHeartEmpty
                        onClick={(e) => {
                          if (!token) {
                            Swal.fire({
                              title: '請先登入會員',
                              icon: 'warning',
                              showCancelButton: true,
                              confirmButtonColor: '#3085d6',
                              cancelButtonColor: '#d33',
                              confirmButtonText: '前往登入頁面',
                            }).then((result) => {
                              if (result.isConfirmed) {
                                props.history.push('/login')
                              }
                            })
                          } else {
                            Swal.fire({
                              icon: 'success',
                              title: '已加入收藏清單',
                              showConfirmButton: false,
                              timer: 1000,
                            })
                            if (display) {
                              setDisplay(false)
                            } else {
                              setDisplay(true)
                            }
                          }
                        }}
                        style={{
                          display: display ? 'block' : 'none',
                        }}
                      />
                      <IoIosHeart
                        onClick={(e) => {
                          if (display) {
                            setDisplay(false)
                          } else {
                            setDisplay(true)
                          }
                        }}
                        style={{
                          display: display ? 'none' : 'block',
                        }}
                      />
                    </div>
                  </div>

                  <h6 className="productTitle f_darkgreen pt-1">
                    {v.ar_title}
                  </h6>
                  <p className="pb-1 grey articleDate">{articleDate(v.ar_date)}</p>
                </div>
              </div>
              )
            })}
              {/* 看更多按鈕 */}
            <div className="ar-viewmore-wrap">
              <i className="fas fa-angle-double-right front"></i>
              <Link to={'/article/exercise'}>
              <div className="pd-viewmore">查看更多文章</div>
              </Link>
              <i className="fas fa-angle-double-right back"></i>
            </div>
            </div>
            
          </div>
        </div>
      </div>
    </>
  )
}

export default withRouter(Customize)
