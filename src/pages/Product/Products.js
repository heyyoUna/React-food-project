import {
  BrowserRouter as Router,
  withRouter,
} from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import conf, { Product_API } from './../../config/config.js'

// 組合用元件
import AllBanner from './../../components/Product/AllBanner'
import MaterialBanner from '../../components/Product/MaterialBanner'
import WorkoutBanner from '../../components/Product/WorkoutBanner'
import TableBanner from '../../components/Product/TableBanner'

import CateTag from './../../components/Product/CateTag'
import Filter from './../../components/Product/Filter'
import ProductCard from './../../components/Product/ProductCard'
import PageBtn from './../../components/Product/PageBtn'

function Products(props) {
  
  const searchParams = new URLSearchParams(
    props.location.search
  )
  // 設定商品sid for 細節頁
  const { productId, setProductId } = props
  // 所有商品
  const [products, setProducts] = useState([])
  // 篩選後商品
  const [displayProducts, setDisplayProducts] = useState([])
  // 關鍵字搜尋狀態
  const [searchWord, setSearchWord] = useState(searchParams.get('keyword') || '')
  // 商品分類標籤(radio)
  const [productCate, setProductCate] = useState(searchParams.get('cate') || '0')
  // 總頁數
  const [totalpages, setTotalPages] = useState('')
  // 設定目前頁數狀態
  const [nowpage, setNowPage] = useState( searchParams.get('page') || 1)
  // 篩選radio
  const [filter, setFilter] = useState('')
  
  // 解析URL參數
  const sp = searchParams.toString()
  
  // 當跳頁的時候把URL參數設定回狀態
  const setUpdateState = ()=>{
    const cate = searchParams.get('cate')
    const page = searchParams.get('page')
    setProductCate(cate)
    setNowPage(page)

  }

  // 跳轉頁面都會觸發
  useEffect(() => {
    setUpdateState()
  }, [sp])


  // // 要所有資料
  useEffect(() => {
    
    ;(async () => {
      const r = await fetch(
        `${Product_API}` + `${props.location.search}`
      )
      const obj = await r.json()
      setProducts(obj.rows)
      setDisplayProducts(obj.rows)
      setTotalPages(obj.totalPages)
      console.log('無相依性')
    })()
  }, [nowpage,productCate,searchWord,filter])

 
  // 切換banner
  const All = <AllBanner />
  const Table = <TableBanner />
  const Workout = <WorkoutBanner />
  const Material = <MaterialBanner />

  // 換分類banner
  const switchBanner = (productCate) => {
    switch (productCate) {
      // console.log('ok')
      case '0':
        return All
      case '1':
        return Table
      case '2':
        return Workout
      case '3':
        return Material
      default:
        return All
    }
  }

  return (
    <>
      {/* ----------Banner 元件區-------- */}
      {/* <AllBanner /> */}
      {/* <MaterialBanner /> */}
      {/* <WorkoutBanner /> */}
      {/* <TableBanner /> */}
      <>{switchBanner(productCate)}</>

      {/* ---------- */}
      <div className="container">
        <div className="row">
          {/* 分類按鈕 */}
          <div className="pd-filter-btn-wrap">
            <div className="pd-cate d-flex mb-80">
              <CateTag
                productCate={productCate}
                setProductCate={setProductCate}
                setSearchWord={setSearchWord}
                setFilter={setFilter}
              />
            </div>
            {/* 篩選器(關鍵字搜尋/熱量篩選) */}
            <div className="pd-filter">
              <Filter
                filter={filter}
                setFilter={setFilter}
                searchWord={searchWord}
                setSearchWord={setSearchWord}
                setProductCate={setProductCate}
              />
            </div>
          </div>
          {/* ---- */}
          <div className="pd-card-wrap d-flex col-md-12 col-lg-9">
            {/* 商品卡 */}
            {displayProducts.map((v, i) => {
              return (
                <ProductCard
                  setProductId={setProductId}
                  key={v.sid}
                  sid={v.sid}
                  img={v.product_img}
                  name={v.name}
                  cal={v.content_cal}
                  price={v.price}
                />
              )
            })}
          </div>

          {/* 頁碼 */}
          <PageBtn
            nowpage={nowpage}
            totalpages={totalpages}
            setNowPage={setNowPage}
          />
        </div>
      </div>
    </>
  )
}

export default withRouter(Products)
