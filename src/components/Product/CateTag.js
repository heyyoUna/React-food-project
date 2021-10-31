import React from 'react'
import {
  BrowserRouter as Router,
  withRouter,
} from 'react-router-dom'

function CateTag(props) {
  const { productCate, setProductCate, setSearchWord,setFilter } =
    props
  return (
    <>
      <input
        type="radio"
        name="pd-cate"
        id="all"
        value="0"
        checked={productCate === '0'}
        onClick={(e) => {
          setProductCate(e.target.value)
          setSearchWord('')
          props.history.push('/products/?cate=0&page=1')
        }}
      />
      <label className="pd-all" htmlFor="all">
        全部商品
      </label>

      <input
        type="radio"
        name="pd-cate"
        id="table"
        value="1"
        checked={productCate === '1'}
        onClick={(e) => {
          setProductCate(e.target.value)
          setSearchWord('')
          setFilter('')
          props.history.push('/products/?cate=1&page=1')
        }}
      />
      <label className="pd-table" htmlFor="table">
        快速上桌
      </label>

      <input
        type="radio"
        name="pd-cate"
        id="workable"
        value="2"
        checked={productCate === '2'}
        onClick={(e) => {
          setProductCate(e.target.value)
          setSearchWord('')
          setFilter('')
          props.history.push('/products/?cate=2&page=1')
        }}
      />
      <label className="pd-workout" htmlFor="workable">
        健身專區
      </label>

      <input
        type="radio"
        name="pd-cate"
        id="material"
        value="3"
        checked={productCate === '3'}
        onClick={(e) => {
          setProductCate(e.target.value)
          setSearchWord('')
          setFilter('')
          props.history.push('/products/?cate=3&page=1')
        }}
      />
      <label className="pd-material" htmlFor="material">
        嚴選食材
      </label>
    </>
  )
}

export default withRouter(CateTag)
