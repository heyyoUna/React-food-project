import React from 'react'
import {
  BrowserRouter as Router,
  withRouter,
} from 'react-router-dom'

function Filter(props) {
  const {
    searchWord,
    setSearchWord,
    filter,
    setFilter,
    setProductCate,
    setReset,
  } = props

  return (
    <>
      {/* 關鍵字搜尋 */}
      <div className="d-flex pd-search-wrap">
        <div className="pd-search-icon">
          <i className="fas fa-search "></i>
        </div>
        <input
          type="text"
          className="pd-search-input"
          placeholder="請輸入關鍵字"
          value={searchWord}
          // 輸入框狀態改變時設定回值
          onChange={(e) => {
            setSearchWord(e.target.value)
            // 如果沒有關鍵字, 回到全部商品
            if (e.target.value==='') {
              console.log('123')
              setProductCate('0')
              props.history.push('/products/?cate=0&page=1')
            }
          }}
          // 按enter之後
          onKeyPress={(e) => {
            // 如果有關鍵字
            if (e.target.value!=='') {
              if (e.key === 'Enter') {
                setReset(Math.random())
                setProductCate('0')
                setFilter('')
                const keyword = e.target.value
                props.history.push(
                  '/products/?keyword=' + `${keyword}&page=1&cate=0`
                )
              } 
            }// 如果沒有關鍵字
            // if (!e.target.value) {
            //   setSearchWord('')
            //   props.history.push('/products/?cate=0&page=1')
            //   setProductCate('0')
            // }
          }}
        />
      </div>
      {/* 熱量篩選器 */}
      <div className="pd-radio-wrap">
        <input
          type="radio"
          name="pd-filter"
          id="low"
          value="低熱量"
          checked={filter === '低熱量'}
          onChange={(e) => {
            setFilter(e.target.value)
            setSearchWord('')
            props.history.push('/products/?cate=0&filter=低熱量&page=1')
          }}
        />
        <label htmlFor="low">低熱量優先</label>
        <br />
        {/* 高蛋白 */}
        <input
          type="radio"
          name="pd-filter"
          id="hight"
          value="高蛋白"
          checked={filter === '高蛋白'}
          onChange={(e) => {
            setFilter(e.target.value)
            setSearchWord('')
            props.history.push('/products/?cate=0&filter=高蛋白&page=1')
          }}
        />
        <label htmlFor="hight">高蛋白優先</label>
        <br />
        {/* 低醣 */}
        <input
          type="radio"
          name="pd-filter"
          id="lowsugar"
          value="低醣"
          checked={filter === '低醣'}
          onChange={(e) => {
            setFilter(e.target.value)
            setSearchWord('')
            props.history.push('/products/?cate=0&filter=低醣&page=1')
          }}
        />
        <label htmlFor="lowsugar">低醣料理</label>
      </div>
    </>
  )
}
export default withRouter(Filter)
