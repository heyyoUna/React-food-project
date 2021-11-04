import React,{ useState } from 'react'
import { withRouter , useHistory} from 'react-router-dom'
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io'

function ProductCard(props) {
  const { sid, index,img, name, cal, price } = props
  const token = localStorage.getItem('token')
  const ID = localStorage.getItem('id')
  let history = useHistory()
  const [display, setDisplay] = useState(true)

  // 新增收藏
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
  //  刪除收藏
  const handlingDelete = (sid) => {
    fetch(`http://localhost:3002/member/favorite-product-delete/${sid}`, {
      method: 'DELETE',
    })
  }

  return (
    <>
      <div
        className="pd-card d-flex "
        onClick={(e) => {
          props.history.push('/product/' + sid)
        }}
      >
        <div className="pd-img">
          <img
            src={'http://localhost:3002/img/Product/' + img}
            alt=""
          />
        </div>
        <div className="pd-card-intro d-flex">
          <div className="pd-name">{name}</div>
          <p className="pd-cal">{cal} Calories</p>
          <p className="pd-price">NT$ {price}</p>
          <div className="pd-btn-wrap d-flex">
            <button className="pd-order-btn">
              ORDER NOW
            </button>
            <div className="pd-love-icon">
              
            <IoIosHeartEmpty 
              onClick={(e)=>{
                e.stopPropagation()
                if(!token){
                  alert('請先登入')
                }else{
                  handlingInsert(sid)
                }
                if(display){
                  setDisplay(false)
                }else{
                  setDisplay(true)
                }
              }}
              style={{
                display: display ? 'block' : 'none'
              }}
            />
            <IoIosHeart
              onClick={(e)=>{
                e.stopPropagation()
                if(!token){
                  alert('請先登入')
                }else{
                  handlingDelete(sid)
                }
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
        </div>
      </div>
    </>
  )
}

export default withRouter(ProductCard)
