import React,{ useEffect, useState } from 'react'
import { withRouter , useHistory} from 'react-router-dom'
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io'

function ProductCard(props) {
  const { sid, index,img, name, cal, price, setProductId } = props
  const id = localStorage.getItem('id')
  const [products, setProducts] = useState([])
  let history = useHistory()
  const [display, setDisplay] = useState(true)


  return (
    <>
      <div
        className="pd-card d-flex "
        onClick={(e) => {
          console.log('key', sid)
          setProductId(sid)
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
                console.log(e.target)
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
                console.log(e.target)
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
