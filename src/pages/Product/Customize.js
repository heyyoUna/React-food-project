import React, { useState, useEffect } from 'react'
import conf, { Product_API, Customize_API } from './../../config/config.js'
import {
  BrowserRouter as Router,
  withRouter,
} from 'react-router-dom'

// 引用元件
import ProductCard from './../../components/Product/ProductCard'
import Target from '../../components/Product/Target'
import Clientinfo from '../../components/Product/Clientinfo'


function Customize(props) {
  const { setProductId } = props
  const searchParams = new URLSearchParams(
    props.location.search
  )
  // 運動習慣狀態
  const [target, setTarget] = useState('變瘦')
  const [exercises, setExercises] = useState('不運動')
  // 基本資料狀態
  const [gender, setGender] = useState('男')
  const [years, setYears] = useState('')
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  // 建議區
  // TDEE 初始值(記錄用)
  const [oriTDEE, setOriTDEE] = useState(0)
  // 每日消耗熱量（展示用）
  const [TDEE, setTDEE] = useState(0)

  // 建議熱量初始值(記錄用)
  const [oriCal, setOriCal] = useState(0)
  // 選擇目標後的熱量（紀錄用）
  const [secondCal, setSecondCal] = useState(0)
  // 建議攝取熱量(展示用)
  const [sugCal, setSugCal] = useState(0)

  // 建議攝取蛋白質
  const [sugProtein, setSugProtein] = useState(0)
  // 推薦商品
  const [sugProducts, setSugProducts] = useState([])

  //Customize_API ='http://localhost:3002/product/customize/'


  // 商品區要資料
  useEffect(() => {
    ; (async () => {
      const r = await fetch(`${Customize_API}` + `${props.location.search}`)
      const obj = await r.json()
      setSugProducts(obj.rows)
    })()
  }, [target])


  // TDEE設定完在設定建議攝取量(熱量初始值/建議熱量/建議蛋白質)
  // 預設值是變瘦＋不運動
  useEffect(() => {
    setSugCal(oriTDEE)
    setSugProtein(Math.ceil(weight * 1.2))
  }, [TDEE])

  const calculate = () => {
    if (target === '變瘦' && exercises === '不運動') {
      //建議熱量
      let sugCal = Math.ceil(oriTDEE * 0.8)
      setTDEE(TDEE)
      setSugCal(sugCal)
    }
    if (target === '變瘦' && exercises === '三次左右') {
      let newTDEE = Math.ceil((oriTDEE / 1.2) * 1.375)
      let sugCal = Math.ceil((oriTDEE / 1.2) * 1.375 * 0.8)
      setSugCal(sugCal)
      setTDEE(newTDEE)
    }
    if (target === '變瘦' && exercises === '五次以上') {
      let newTDEE = Math.ceil((oriTDEE / 1.2) * 1.55)
      let sugCal = Math.ceil((oriTDEE / 1.2) * 1.55 * 0.8)
      setSugCal(sugCal)
      setTDEE(newTDEE)
    }
    if (target === '增肌減脂' && exercises === '不運動') {
      let sugCal = Math.ceil(oriTDEE * 1.2)
      setSugCal(sugCal)
      setTDEE(TDEE)
    }
    if (target === '增肌減脂' && exercises === '三次左右') {
      let newTDEE = Math.ceil((oriTDEE / 1.2) * 1.375)
      let sugCal = Math.ceil((oriTDEE / 1.2) * 1.375 * 1.2)
      setSugCal(sugCal)
      setTDEE(newTDEE)
    }
    if (target === '增肌減脂' && exercises === '五次以上') {
      let newTDEE = Math.ceil((oriTDEE / 1.2) * 1.55)
      let sugCal = Math.ceil((oriTDEE / 1.2) * 1.55 * 1.2)
      setSugCal(sugCal)
      setTDEE(newTDEE)
    }
  }

  useEffect(() => {
    calculate()
  }, [target, exercises,TDEE])

  // 選擇飲食目標後改變建議攝取量熱量跟蛋白質
  // useEffect(() => {

  //   if (target==='增肌減脂'){
  //     let targetCal = Math.ceil(TDEE*1.2)
  //     let targetProtein = (Math.ceil(weight*1.6))
  //     setSecondCal(targetCal) 
  //     setSugCal(targetCal)
  //     setSugProtein(targetProtein)
  //   }if(target==='變瘦'){
  //     let targetCal = Math.ceil(TDEE*0.8)
  //     setSecondCal(targetCal) 
  //     setSugCal(targetCal) 
  //     setSugProtein(Math.ceil(weight*1.2)) 
  //   }
  // }, [target])


  // useEffect(() => {
  //   console.log({exercises});
  //   if (exercises==='五次以上'){
  //     let newTDEE = Math.ceil(((oriTDEE/1.2)*1.55))
  //     setTDEE(newTDEE)
  //   }if(exercises==='三次左右'){
  //     let newTDEE = Math.ceil((oriTDEE/1.2)*1.375)
  //     setTDEE(newTDEE)
  //     setSugCal(1200)
  //     console.log({exercises});
  //   }if(exercises==='不運動'){
  //     setTDEE(oriTDEE)
  //     setSugCal(secondCal)
  //   }
  // }, [exercises])



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
              setTDEE={setTDEE}
              setOriTDEE={setOriTDEE}
            />
          </div>
          <div className="pd-suggest d-flex">
            <p className="dkgreen">每日消耗熱量{TDEE}大卡</p>
            <p className="pd-day">建議每日攝取</p>
            <p className="dkgreen">熱量{sugCal}大卡</p>
            <p className="dkgreen">蛋白質{sugProtein}克</p>
          </div>
          <button className="pd-client-btn">
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

        </div>
        <h1>餐盒推薦</h1>
        <h1>文章推薦</h1>
      </div>
    </>
  )
}

export default withRouter(Customize)
