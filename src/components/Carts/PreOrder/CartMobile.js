import React from 'react'
import {
  FaTrash,
  FaPlusCircle,
  FaMinusCircle,
  FaAngleDoubleRight,
} from 'react-icons/fa'

function CartMobile(props) {
  const {
    Order_Sid,
    Product_id,
    Promotion_Number,
    name,
    cate_sid,
    price,
    Order_Amount,
    setCount,
    DeleteProduct,
    ModifyProduct,
  } = props

 
  return (
    <>
      <tr>
        <td>
          <img
            src={`http://localhost:3000/image/${cate_sid}/${Product_id}.jpg`}
            alt=""
          />
        </td>
        <td className="text-start">
          {name} <br />
          NT${price}
        </td>
        <td className="text-start col-4 text-center">
          <FaMinusCircle
            className="countIcon"
            onClick={() => {
              // console.log(el)
              // ModifyProduct(el)
            }}
          />
          {Order_Amount}
          <FaPlusCircle
            className="countIcon"
            onClick={() => {
              // console.log(e.target)
            }}
          />
        </td>
      </tr>
    </>
  )
}

export default CartMobile
