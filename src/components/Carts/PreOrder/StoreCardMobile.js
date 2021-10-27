import React from 'react'
import { FaRegHeart, FaCartPlus, FaAngleDoubleRight } from 'react-icons/fa'

function StoreCardMobile(props) {
  return (
    <>
      <div className="storelikemobile">
        <div className="storecardmobile position-relative my-5 mx-2">
          <img src="../../../image/otherproduct.png" />
          <div className="storeproductmobile col-10 mx-2">
            <div className="body d-flex justify-lg-content-end justify-content-center">
              <p className="text my-auto me-4">
                【減醣料理】
                <br />
                三杯嫩雞 3 包
              </p>
              <div
                className="storeiconmobile my-auto me-3"
                onclick="heartclick(event)"
              >
                <FaRegHeart className="heart" />
                <FaCartPlus className="cartlike" />
              </div>
            </div>
          </div>
        </div>
        <div className="morecardmobile my-5">
          <h1>MORE</h1>
        </div>
      </div>
    </>
  )
}

export default StoreCardMobile
