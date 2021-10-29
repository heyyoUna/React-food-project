import React, { useState } from 'react'
import ProductCard from './../../components/Product/ProductCard'
import Target from '../../components/Product/Target'
function Customize(props) {
  const [target, setTarget] = useState('')
  const [exercises, setExercises] = useState('')
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
          />
        </div>
        {/* 右區-使用者資料------- */}
        <div className="pd-client-wrap d-flex col-lg-5 col-md12">
          <div className="pd-client-info d-flex">
            <div>
              <label for="gender">性別</label>
              <select
                className="pd-gender"
                name="gender"
                id="gender"
              >
                <option value="">男</option>
                <option value="">女</option>
              </select>
              <label for="years">年齡</label>
              <input
                type="number"
                name="years"
                value=""
                className="pd-years"
              />
            </div>
            <div>
              <label for="height">身高</label>
              <input
                type="number"
                name="height"
                value=""
                className="pd-height"
              />
              <label for="weight">體重</label>
              <input
                type="number"
                name="weight"
                value=""
                className="pd-weight"
              />
            </div>
          </div>
          <div className="pd-suggest d-flex">
            <p className="dkgreen">每日消耗熱量1500大卡</p>
            <p className="pd-day">建議每日攝取</p>
            <p className="dkgreen">熱量1500大卡</p>
            <p className="dkgreen">蛋白質50克</p>
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
