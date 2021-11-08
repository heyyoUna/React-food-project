import '../../styles/Carts/CartComplete.scss'
import '../../styles/Carts/Banner.scss'
import { withRouter } from 'react-router-dom'
import React, { useEffect } from 'react'
import axios from 'axios'

// 清空 LocalStorage 資訊

function CartComplete(props) {
  let { setCountNav } = props
  setCountNav(0)
  // localStorage.removeItem('訂單價格資訊')
  localStorage.removeItem('店號')
  localStorage.setItem('數量', 0)
  useEffect(() => {
    let r = axios.delete('http://localhost:3002/cart/')
    if (r.status === 200) {
      console.log('刪除完成')
    }
  }, [])
  return (
    <>
      <div className="container-fluid Banner col-xs-10">
        <div className="bannerTitle col-lg-8 col-xs-8 ">
          <h1 className="bannerTitle1 col-xs-6">
            只差一步
          </h1>
          <h1 className="bannerTitle2 col-xs-6">
            眼前所及全部歸你
          </h1>
        </div>
      </div>

      <div class="container confirmtitle my-5 text-center">
        <h1>訂單已送出，感謝您的訂購</h1>
      </div>
      <div class="container confirmnumber my-5 text-center">
        <h3>訂單編號:{localStorage.getItem('訂單編號')}</h3>
      </div>

      <div
        class="
        container
        col-lg-8
        confirm
        mt-5
        d-lg-flex
        justify-content-around
        text-center
      "
      >
        <button
          class="info col-lg-4 col-10 my-3"
          onClick={() => {
            props.history.push('/products')
          }}
        >
          返回商城
        </button>
        <button
          class="info col-lg-4 col-10 my-3"
          onClick={() => {
            props.history.push('/member/order')
          }}
        >
          查看其他訂單
        </button>
      </div>
    </>
  )
}
export default withRouter(CartComplete)
