import React, { useState } from 'react'
import {
  FaTrash,
  FaPlusCircle,
  FaMinusCircle,
  FaAngleDoubleRight,
} from 'react-icons/fa'

function CartItem(props) {
  const {
    Order_Sid,
    Product_id,
    Promotion_Number,
    name,
    cate_sid,
    price,
    Order_Amount,
    CountA,
    pos,
    setCount,
  } = props

  const [ChangeCount, setChangeCount] = useState(CountA)
  // let NewCount = [...Count]
  console.log('第三層', CountA)

  // async function ModifyProduct(e, t) {
  //   let Mod = await axios.put(`http://localhost:3001/cart/${e.Order_Sid}`, {
  //     Order_Amount: t,
  //   })
  //   if (Mod.status === 200) {
  //     console.log(Mod)
  //   }
  // }
  return (
    <>
      <tr>
        <td>
          <img
            src={`http://localhost:3000/image/${cate_sid}/${Product_id}.jpg`}
            alt=""
          />
        </td>
        <td className="text-start">{name}</td>
        <td className="text-start ">{Promotion_Number}</td>
        <td className="text-start">
          <FaMinusCircle
            className="countIcon"
            onClick={() => {
              // setTotal(parseInt(el.Order_Amount) - 1)
              // ModifyProduct(el, total)
            }}
          />
          {}
          <FaPlusCircle
            className="countIcon"
            onClick={() => {
              // setChangeCount()
              // console.log(ChangeCount[pos])
              //   ModifyProduct(Order_Amount + 1)
            }}
          />
        </td>
        <td className="text-start">{price}</td>
        <td>
          <FaTrash
            className="trashIcon"
            onClick={() => {
              // console.log(el.Order_Sid)
              // DeleteProduct(Order_Sid)
            }}
          />
        </td>
      </tr>
    </>
  )
}

export default CartItem
