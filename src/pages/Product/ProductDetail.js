import React, { useState, useEffect } from 'react'
import conf, {
  ProductDetail_API,IMG_PATH,
} from './../../config/config.js'

// 組合用元件
// 商品圖
import ProductWrap from './../../components/Product/ProductWrap'
// 細節介紹
import Detail from './../../components/Product/Detail'
// 評論區
import Comments from './../../components/Product/Comments'

// 細節頁
function ProductDetail(props) {
  const { productId } = props
  const [ProductDetail, setProductDetail] = useState([])

  const p = { ...ProductDetail }
  useEffect(() => {
    ;(async () => {
      const r = await fetch(ProductDetail_API + productId) 
      //此api多查member_fav_product檢查目前登入的會員是否有收藏這項商品 (依傳入productId和token中取得的memberid查詢)
      //回傳的obj.data內多一個屬性fav_indicator = true or false

      //畫面用fav_indicator判斷愛心為紅色或白色

      //點擊時用fav_indicator判斷需要在member_fav_product資料表新增或刪除資料

      //member_fav_product資料維護後更改ProductDetail.fav_indicator供下次點擊時判斷
      const obj = await r.json()
      setProductDetail(obj.data)
      console.log(obj.data)
    })()
  }, [])
  return (
    <>
      
      {/* 商品大圖 */}
      <div className="container dt-pd-container">
        <div className="row d-flex dt-product">
          <ProductWrap
            name={p.name}
            img={p.product_img}
            intro={p.introduction}
            unit={p.unit}
            cal={p.content_cal}
            protein={p.content_protein}
            fat={p.content_fat}
            carbon={p.content_carbon}
            price={p.price}
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
          <div className="dt-review d-flex mb80">
            <div className="dt-reviews-wrap d-flex col-sm-12 col-lg-3 ">
              {/* 評論框 */}
              <Comments />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductDetail
