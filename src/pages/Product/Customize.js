import React, { useRef,useState, useEffect } from 'react'
import conf, { Product_API, Customize_API } from './../../config/config.js'
import {
  BrowserRouter as Router,
  withRouter,Link,
} from 'react-router-dom'

// 引用元件
import ProductCard from './../../components/Product/ProductCard'
import Target from '../../components/Product/Target'
import Clientinfo from '../../components/Product/Clientinfo'


function Customize(props) {
  const ID = localStorage.getItem('id')
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
  const searchParams = new URLSearchParams(
    props.location.search
  )
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

  const myRef = useRef(null)

  // 拿到會員收藏商品資料
  useEffect(() => {
    ;(async () => {
      const r = await fetch(
        'http://localhost:3002/product/fav/' + ID
      )
      const obj = await r.json()
      console.log(obj)
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
      console.log(oriTDEE)
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
    // listData()
    //滾動效果
    myRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

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
            <p className="dkgreen">熱量{sugCal}大卡</p>
            <p className="dkgreen">蛋白質{sugProtein}克</p>
          </div>
          <button className="pd-client-btn" 
          onClick={mySubmit}>
            查看飲食推薦
          </button>
        </div>
      </div>
      
      <div ref={myRef}></div>
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

            <Link to={'products/?cate=0&page=1'}>
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
        </div>
      </div>
        <h1>文章推薦</h1>
      </div>
    </>
  )
}

export default withRouter(Customize)
