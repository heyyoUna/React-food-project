import React,{ useState }  from 'react'
import { withRouter , useHistory} from 'react-router-dom'
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io'
import Swal from 'sweetalert2'

const ProductWrap = (props) => {
  const token = localStorage.getItem('token')
  const ID = localStorage.getItem('id')
  
  const {
    sid,
    name,
    img,
    intro,
    unit,
    cal,
    protein,
    product_id,
    fat,
    carbon,
    price,
  } = props

  const [display, setDisplay] = useState(true)
  const [ orderQty, setOrderQty] = useState(1)

  //寫入資料庫（訂單編號, 數量未修正）
  const addtocart=(sid,ID,product_id)=>{
    fetch(`http://localhost:3002/cart`,{
      method: 'POST',
      body: JSON.stringify({
        Sid: sid,
        Order_Sid:'test01',
        Member_id:ID,
        Product_id:product_id,
        Order_Amount:orderQty,
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    })
    console.log(sid,ID,product_id)
  }
  // 收藏新增商品
  const handlingInsert = (sid) => {
    fetch(`http://localhost:3002/member/favorite-product-insert`, {
      method: 'POST',
      body: JSON.stringify({
        productid: sid

      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    })
  }
  // 刪除收藏商品
  const handlingDelete = (sid) => {
    fetch(`http://localhost:3002/member/favorite-product-delete/${sid}`, {
      method: 'DELETE',
    })
  }
  return (
    <>
      <div className="dt-product-imgwrap col-lg-6">
        <div className="dt-bgimg">
          {/* 商品大圖 */}
          <img
            src={'http://localhost:3002/img/Product/' + img}
            alt=""
          />
        </div>
      </div>
      <div className="dt-intro-wrap col-sm-12 col-lg-6">
        {/* 商品名稱 */}
        <div className="dt-name fs44 mb20 d-flex">
          {name}
          {/* 收藏區 */}
          <div className="dt-love-icon">
          <IoIosHeartEmpty
            onClick={(e)=>{
              if(!token){
                alert('請先登入')
              }else{
                // swal("Good job!", "You clicked the button!", "success");
                handlingInsert(sid)
                if(display){
                  setDisplay(false)
                }else{
                  setDisplay(true)
                }
              }
              }}
              style={{
                display: display ? 'block' : 'none'
              }}
          />
          <IoIosHeart
              onClick={(e)=>{
                handlingDelete(sid)
                if(display){
                  setDisplay(false)
                }else{
                  setDisplay(true)
                }
              }}
              style={{
                display: display ? 'none' : 'block'
              }}
            />
          </div>
        </div>
        {/* 商品介紹 */}
        <p className="dt-intro fs24 mb20">
          {intro}({unit})
        </p>
        <div className="dt-content-wrap d-flex">
          <div className="content-wrap">
            {/* 營養成分 */}
            <p className="fs24">熱量:{cal}大卡</p>
            <p className="fs24">蛋白質:{protein}克</p>
            <p className="fs24">脂肪:{fat}克</p>
            <p className="fs24">碳水:{carbon}克</p>
          </div>
          {/* 價錢 */}
          <h1 className="dt-price">NT${price}</h1>
        </div>
        <div className="dt-btn-wrap d-flex">
          <div className="dt-qty-wrap d-flex ">
          {/* 減少數量 */}
            <button className="dt-minus">
              <i className="fas fa-minus"
              onClick={()=>{
                if(orderQty>1){
                  setOrderQty(orderQty-1)
                }
                if(orderQty<=1){
                  alert('商品最少一樣')
                }
              }}></i>
            </button>
            <div className="dt-qty">{orderQty}</div>

          {/* 增加數量 */}
            <button className="dt-add">
              <i className="fas fa-plus"
              onClick={()=>{
                setOrderQty(orderQty+1)
                console.log(typeof orderQty)
              }}></i>
            </button>
          </div>
          <button className="dt-addtocart "
          onClick={(e)=>{
            addtocart(sid,ID,product_id)
          }}>
            Add To Cart
          </button>
        </div>
      </div>
    </>
  )
}

export default withRouter(ProductWrap)
