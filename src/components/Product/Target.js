import React from 'react'

function Target(props) {
  const { setTarget, setExercises } = props
  // 移除target選中CSS
  const removeTargetCss = (e) => {
    const all = document.querySelectorAll('.pd-targetImg')
    for (let i = 0; i < all.length; i++) {
      all[i].classList.remove('pd-cusClick')
    }
    e.classList.add('pd-cusClick')
  }
  // 移除運動習慣CSS
  const removeTimesCss = (e) => {
    const all = document.querySelectorAll('.pd-timesImg')
    for (let i = 0; i < all.length; i++) {
      all[i].classList.remove('pd-cusClick')
    }
    e.classList.add('pd-cusClick')
  }
  return (
    <>
      {/* 運動目標------------------- */}
      <h1>我想要...</h1>
      <div className="pd-target d-flex">
        <div className="pd-gain-wrap mlr">
          <div
            className="pd-gain pd-targetImg"
            onClick={(e) => {
              setTarget('增肌減脂')
              removeTargetCss(e.target)
            }}
          ></div>
          <p>增肌減脂</p>
        </div>

        <div className="pd-slim-wrap mlr">
          <div
            className="pd-slim pd-targetImg"
            onClick={(e) => {
              setTarget('變瘦')
              removeTargetCss(e.target)
            }}
          ></div>
          <p>變瘦</p>
        </div>
      </div>
      {/* 運動習慣------------------ */}
      <h1>我每周運動...</h1>
      <div className="pd-target d-flex">
        <div className="pd-five-wrap">
          <div
            className="pd-five pd-timesImg"
            onClick={(e) => {
              setExercises('五次以上')
              removeTimesCss(e.target)
            }}
          ></div>
          <p>五次以上</p>
        </div>
        <div className="pd-three-wrap">
          <div
            className="pd-three pd-timesImg"
            onClick={(e) => {
              setExercises('三次左右')
              removeTimesCss(e.target)
            }}
          ></div>
          <p>三次左右</p>
        </div>
        <div className="pd-none-wrap">
          <div
            className="pd-none pd-timesImg"
            onClick={(e) => {
              setExercises('不運動')
              removeTimesCss(e.target)
            }}
          ></div>
          <p>不運動</p>
        </div>
      </div>
    </>
  )
}

export default Target
