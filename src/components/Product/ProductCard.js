import React,{ useState,useEffect } from 'react'
import { withRouter , useHistory} from 'react-router-dom'
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

function ProductCard(props) {
  const { sid, index,img, name, cal, price,favArr } = props
  const token = localStorage.getItem('token')
  let history = useHistory()
  const [display, setDisplay] = useState(true)


  // 判斷商品有在收藏清單時，設定icon為實心
  useEffect(() => {
    if(token){
      if(favArr){
        favArr.forEach((value)=>{
          if(value.product_id === sid){
            setDisplay(false)
          }
        })
      }
    }
  }, []);

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
              View Detail
            </button>
            <div className="pd-love-icon">
            <IoIosHeartEmpty 
              onClick={(e)=>{
                e.stopPropagation()
                if (!token) {
                  Swal.fire({
                  title: '請先登入會員',
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: '前往登入頁面'
                }).then((result) => {
                  if (result.isConfirmed) {
                    props.history.push('/login' )
                  }
                })
                }else{
                  handlingInsert(sid)
                  Swal.fire({
                    icon: 'success',
                    title: '已加入收藏清單',
                    showConfirmButton: false,
                    timer: 1000
                  })
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
                e.stopPropagation()
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
        </div>
      </div>
    </>
  )
}

export default withRouter(ProductCard)
