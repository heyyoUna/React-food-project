import React, { useState, useEffect  } from 'react'

// 引用元件
import ProductCard from './../../components/Product/ProductCard'
import Target from '../../components/Product/Target'
import Clientinfo from '../../components/Product/Clientinfo'


function Customize(props) {
  // 運動習慣狀態
  const [target, setTarget] = useState('')
  const [exercises, setExercises] = useState('')
  // 基本資料狀態
  const [gender, setGender] = useState('男')
  const [years, setYears] = useState('')
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  // 建議區
  // 每日消耗熱量
  const [TDEE, setTDEE] = useState(0)
  // 建議攝取熱量
  const [sugCal, setSugCal] = useState(0)
  // 建議攝取蛋白質
  const [sugProtein, setSugProtein] = useState(0)

  useEffect(() => {
    setSugCal(TDEE)
    setSugProtein(Math.ceil(weight*1.2))
  }, [TDEE])

  //  每日建議熱量計算

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
            />
          </div>
          <div className="pd-suggest d-flex">
          {/* {calculate()} */}
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
          <ProductCard />
        </div>
        <h1>餐盒推薦</h1>
        <h1>文章推薦</h1>
      </div>
    </>
  )
}

export default Customize
