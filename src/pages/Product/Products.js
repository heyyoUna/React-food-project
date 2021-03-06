import {
  BrowserRouter as Router,
  withRouter,
} from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { Product_API } from './../../config/config.js'

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
  const { setFavArr, favArr } = props
  const token = localStorage.getItem('token')
  const searchParams = new URLSearchParams(
    props.location.search
  )
  // 所有商品
  // const [products, setProducts] = useState([])
  // 篩選後商品
  const [displayProducts, setDisplayProducts] = useState([])
  // 關鍵字搜尋狀態
  const [searchWord, setSearchWord] = useState(
    searchParams.get('keyword') || ''
  )
  // 商品分類標籤(radio)
  const [productCate, setProductCate] = useState(
    searchParams.get('cate') || '0'
  )
  // 總頁數
  const [totalpages, setTotalPages] = useState('')

  // 設定目前頁數狀態
  const [nowpage, setNowPage] = useState(
    searchParams.get('page') || 1
  )
  // 篩選radio
  const [filter, setFilter] = useState('')

  const [url, setUrl]= useState(sp)

  // 解析URL參數
  const sp = searchParams.toString()
  // 跳轉頁面都會觸發,將URL參數設定回狀態
  useEffect(() => {
    setUpdateState()
    setUrl(sp)
    console.log('sp',sp)
  }, [sp])
  // 當跳頁的時候把URL參數設定回狀態
  const setUpdateState = () => {
    const cate = searchParams.get('cate')
    const page = searchParams.get('page')
    setProductCate(cate)
    setNowPage(page)
  }

  const [reset, setReset] = useState(0)

  //要所有資料
  useEffect(() => {
    ;(async () => {
      const r = await fetch(
        `${Product_API}` + `${props.location.search}`
      )
      const obj = await r.json()
      setDisplayProducts(obj.rows)
      setTotalPages(obj.totalPages)

      //  拿收藏商品
      if (token) {
        // 有token 的話去拿到ID
        ;(async () => {
          const r = await fetch(
            `http://localhost:3002/member/memberprofile`,
            {
              method: 'GET',
              headers: {
                Authorization: 'Bearer ' + token,
              },
            }
          )
          const obj = await r.json()
          if (obj.data[0].sid) {
            const rs = await fetch(
              `http://localhost:3002/product/fav/${obj.data[0].sid}`,
              {
                headers: {
                  Authorization: 'Bearer ' + token,
                },
              }
            )
            const favlist = await rs.json()
            const favData = {};
            //錯誤處理
            if (favlist.success) {
              if(favlist.data.length){
                favlist.data.forEach(el=>{
                  favData[el.product_id] = 1
                })
              }
              console.log('更新商品收藏')
              setFavArr(favData)
            }
          }
        })()
      }else{
        setFavArr({})
      }
    })()
  }, [nowpage, productCate, searchWord, filter, reset,url])

  // 切換banner
  const All = <AllBanner />
  const Table = <TableBanner />
  const Workout = <WorkoutBanner />
  const Material = <MaterialBanner />

  // 換分類banner
  const switchBanner = (productCate) => {
    switch (productCate) {
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
      <>{switchBanner(productCate)}</>
      {/* ---------- */}
      {/* 手機版分類按鈕 */}
      <div className="pd-filter-mb-wrap">
        <div className="pd-cate-mb ">
          商品分類
          <i class="fas fa-chevron-down"></i>
        </div>
        <div className="pd-filter-mb ">
          篩選條件
          <i class="fas fa-chevron-down"></i>
        </div>
      </div>
      <div className="container">
        <div className="row pd-row">
          {/* 分類按鈕 */}
          <div className="pd-filter-btn-wrap">
            <div className="pd-cate">
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
                setReset={setReset}
              />
            </div>
          </div>
          {/* ---- */}
          <div className="pd-card-wrap d-flex col-md-12 col-lg-9">
            {/* 商品卡 */}
            {displayProducts.map((v, i) => {
              return (
                <ProductCard
                  favArr={favArr}
                  setFavArr={setFavArr}
                  index={i}
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
