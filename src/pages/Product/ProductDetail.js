import React, { useState, useEffect } from 'react'
import { ProductDetail_API } from './../../config/config.js'
import {withRouter} from 'react-router-dom'

// 組合用元件
// 商品圖
import ProductWrap from './../../components/Product/ProductWrap'
// 細節介紹
import Detail from './../../components/Product/Detail'
// 評論區
import Comments from './../../components/Product/Comments'

// 細節頁
function ProductDetail(props) {
  const { CountNav,setCountNav,setFavArr,favArr} = props
  // 解析路徑
  const searchParams = (
    props.location.pathname
  )
  const [ProductDetail, setProductDetail] = useState([])
  const token = localStorage.getItem('token')

  // 拿到評論資料
  const [ review, setReview] = useState([])

  // 解析字串(帶數字路由去fetch)
  const sp = searchParams.split('/')[2]

  // 展開拿到的資料
  const p = { ...ProductDetail }
  useEffect(() => {
    ; (async () => {
      const r = await fetch(`${ProductDetail_API}` + `${sp}`, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      // 拿到評論
      const obj = await r.json()
      if(obj.success){
        setProductDetail(obj.data)
        const rs = await fetch(`http://localhost:3002/product/reviews/${obj.data.product_id}`, {
          headers:{
            'Authorization': 'Bearer ' + token
          }
        })
        const obj2 = await rs.json()
        if(obj2.success){
          const newReview = obj2.data.filter(function(value){
            return value.Review_Level !==0
          })
          setReview(newReview)
        } 
      }
    })()
  }, [])
  
  //  判斷收藏
  const setFavIndicator = (indicator) => {
    let tempProduct = { ...ProductDetail }
    tempProduct.favIndicator = indicator
    setProductDetail(tempProduct)
  }

  return (
    <>

      {/* 商品大圖 */}
      <div className="container dt-pd-container">
        <div className="row d-flex dt-product">
          <ProductWrap
            sid={p.sid}
            name={p.name}
            product_id={p.product_id}
            img={p.product_img}
            intro={p.introduction}
            unit={p.unit}
            cal={p.content_cal}
            protein={p.content_protein}
            fat={p.content_fat}
            carbon={p.content_carbon}
            price={p.price}
            setFavArr={setFavArr}
            favArr={favArr}
            CountNav={CountNav}
            setCountNav={setCountNav}
            favIndicator={p.favIndicator}
            setFavIndicator={setFavIndicator}
          />
        </div>
      </div>
      <div className="dt-bg"></div>
      {/* detail */}
      <div className="container">
        <div className="row">
          <div className="dt-sub-title">
            <h4>Detail</h4>
          </div>
          <div className="dt-product-wrap d-flex">
            <Detail
              detailImg={p.detail_img}
              title={p.detail_title}
              content={p.detail_content}
            />
          </div>
        </div>
      </div>

      {/* 評論區 */}
      <div className="container mb80">
        <div className="row">
          <div className="dt-sub-title">
            <h4>Reviews</h4>
          </div>
            <div className="dt-reviews-wrap d-flex ">
              {/* 評論框 */}
              {review.length ===0 ? (
                <p>此商品目前無評論</p>
              ) :(
                review.map((v,i)=>{
                return (
                <Comments 
                  key={i}
                  name={v.Order_Name}
                  comments={v.Review_Description}
                  rating={v.Review_Level}
                  commenttime={v.Review_Timestamp}
                />
                )
              }))}
            </div>
        </div>
      </div>
    </>
  )
}

export default withRouter(ProductDetail)
