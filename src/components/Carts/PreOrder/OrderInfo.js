import React from 'react'
import { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'

import axios from 'axios'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

function OrderInfo(props) {
  const [data, setdata] = useState()
  const token = localStorage.getItem('token')
  // let pointChange = false
  let [pointChange, setpointChange] = useState('未登入')
  let [textvalue, settextvalue] = useState(0)

  let promo = false
  let nextStep = false
  let member
  const {
    productPrice,
    totalPrice,
    Promotion,
    setPromotion,
  } = props

  const numberJudge = new RegExp(/\d/)

  // 清空 localstorage 裡的資訊
  localStorage.removeItem('訂單編號')
  localStorage.setItem('運費', 0)

  console.log('優惠點數', Promotion)
  // 記錄會員優惠點數

  // 記錄訂單小計、優惠總額與訂單總計
  let orderdetailPriceInfo = [
    // 訂單小計 0
    totalPrice(),
    // 優惠 1
    Promotion,
    // 訂單總計 2
    productPrice(),
  ]

  useEffect(() => {
    // 取得會員點數資料
    // getMemberPoint()
    LoginData()
  }, [])

  // 取得會員點數資料的函式
  async function LoginData() {
    let res = await axios.get(
      `http://localhost:3002/member/memberprofile`,
      {
        headers: {
          //token 從 header 中 Authorization 屬性傳入
          //格式為 Bearer + 空格 + token
          Authorization:
            'Bearer ' + localStorage.getItem('token'),
        },
      }
    )
    if (res.data.success) {
      getMemberPoint(res.data.data[0].sid)
    } else {
      Swal.fire({
        icon: 'error',
        title: '請先登入會員哦',
        showConfirmButton: true,
        confirmButtonColor: '#8FC065',
        confirmButtonText: '我知道了',
      }).then((result) => {
        if (result.isConfirmed) {
          props.history.push('/login')
        }
      })
    }
  }
  async function getMemberPoint(Member_id) {
    let M = await axios.get(
      `http://localhost:3002/cart/memberpoint/${Member_id}`
    )
    if (M.status === 200) {
      setdata(M.data)
      console.log('會員點數資料', M.data)
      if (!token) {
      } else {
        setpointChange(M.data[0].left_point)
      }
      console.log('會員資料', M.data)
    }
  }

  // 確認是否登入的函式
  async function getLoginData() {
    let res = await axios.get(
      `http://localhost:3002/member/memberprofile`,
      {
        headers: {
          //token 從 header 中 Authorization 屬性傳入
          //格式為 Bearer + 空格 + token
          Authorization:
            'Bearer ' + localStorage.getItem('token'),
        },
      }
    )
    if (res.data.success) {
      member = res.data.data[0].sid
      PromoOrNext()
    } else {
      Swal.fire({
        icon: 'error',
        title: '請先登入會員哦',
        showConfirmButton: true,
        confirmButtonColor: '#8FC065',
        confirmButtonText: '我知道了',
      }).then((result) => {
        if (result.isConfirmed) {
          props.history.push('/login')
        }
      })
    }
  }

  async function PromoOrNext() {
    // 如果要使用優惠
    if (promo && member) {
      promo = false
      // console.log('會員點數')
      // 如果購物車內沒商品
      if (productPrice() === 0) {
        console.log('點數', data[0].left_point)

        // 跳出 Modal 顯示購物車內沒商品
        Swal.fire({
          icon: 'info',
          title: '購物車內沒有商品喔',
          showConfirmButton: false,
          timer: 1500,
        })
      } else if (textvalue === '') {
        Swal.fire({
          icon: 'error',
          title: '您沒有輸入點數喔，請重新輸入',
          showConfirmButton: false,
          timer: 1500,
        })
      } else {
        // 如果輸入的點數 > 會員目前所有點數
        if (textvalue > data[0].left_point) {
          // 跳出 Modeal 顯示目前點數不足
          Swal.fire({
            icon: 'error',
            title: '點數不足!',
            showConfirmButton: false,
            timer: 1500,
          })
        } else if (textvalue > productPrice()) {
          console.log('總價', productPrice())
          Swal.fire({
            icon: 'error',
            title: '金額不能為負值喔，請調整使用的會員點數',
            showConfirmButton: false,
            timer: 1500,
          })
        } else {
          // 記錄扣點與扣款
          setpointChange(data[0].left_point - textvalue)
          settextvalue(textvalue)
          setPromotion(textvalue)
        }
      }
    }

    // 如果點擊是到下一步填寫資料
    if (nextStep) {
      nextStep = false
      if (productPrice() === 0) {
        // 跳出 Modal 顯示購物車內沒商品
        Swal.fire({
          icon: 'info',
          title: '購物車內沒有商品喔',
          showConfirmButton: false,
          timer: 1500,
        })
      } else {
        // 記錄到 LocalStorage 裡，使用 JSON 包進去
        localStorage.setItem(
          '訂單價格資訊',
          JSON.stringify(orderdetailPriceInfo)
        )

        //記錄扣點與扣款，到會員資料表
        if (textvalue !== 0 && textvalue && Promotion) {
          console.log('文字', textvalue)

          let R = await axios.post(
            `http://localhost:3002/cart/modifyPoint`,
            {
              member_sid: data[0].member_sid,
              change_point: textvalue,
              change_type: 'USE',
              left_point: data[0].left_point - textvalue,
              change_reason: '會員使用點數',
              // create_at: '',
            }
          )
          if (R.status === 200) {
            // Swal.fire({
            //   icon: 'success',
            //   title: '扣點成功!',
            //   showConfirmButton: false,
            //   timer: 1500,
            // })
            console.log('扣點成功')
          }
        }
        // 到填寫資料頁面
        props.history.push('/carts/Manage')
      }
    }
  }

  // async function PromoOrNext() {
  //   // 如果要使用優惠
  //   if (promo && member) {
  //     promo = false
  //     // console.log('會員點數')
  //     // 如果購物車內沒商品
  //     if (productPrice() === 0) {
  //       console.log('點數', data[0].left_point)

  //       // 跳出 Modal 顯示購物車內沒商品
  //       Swal.fire({
  //         icon: 'info',
  //         title: '購物車內沒有商品喔',
  //         showConfirmButton: false,
  //         timer: 1500,
  //       })
  //     } else if (textvalue === '') {
  //       Swal.fire({
  //         icon: 'error',
  //         title: '您沒有輸入點數喔，請重新輸入',
  //         showConfirmButton: false,
  //         timer: 1500,
  //       })
  //     } else {
  //       // 如果輸入的點數 > 會員目前所有點數
  //       if (textvalue > data[0].left_point) {
  //         // 跳出 Modeal 顯示目前點數不足
  //         Swal.fire({
  //           icon: 'error',
  //           title: '點數不足!',
  //           showConfirmButton: false,
  //           timer: 1500,
  //         })
  //       } else {
  //         // 記錄扣點與扣款，到會員資料表
  //         let R = await axios.post(
  //           `http://localhost:3002/cart/modifyPoint`,
  //           {
  //             member_sid: data[0].member_sid,
  //             change_point: textvalue,
  //             change_type: 'USE',
  //             left_point: data[0].left_point - textvalue,
  //             change_reason: '會員使用點數',
  //             // create_at: '',
  //           }
  //         )
  //         if (R.status === 200) {
  //           let tmpPro = 0
  //           Swal.fire({
  //             icon: 'success',
  //             title: '扣點成功!',
  //             showConfirmButton: false,
  //             timer: 1500,
  //           })
  //           setpointChange(data[0].left_point - textvalue)
  //           settextvalue(textvalue)
  //           setPromotion(textvalue)
  //         }
  //       }
  //     }
  //   }

  //   // 如果點擊是到下一步填寫資料
  //   if (nextStep) {
  //     nextStep = false
  //     if (productPrice() === 0) {
  //       // 跳出 Modal 顯示購物車內沒商品
  //       Swal.fire({
  //         icon: 'info',
  //         title: '購物車內沒有商品喔',
  //         showConfirmButton: false,
  //         timer: 1500,
  //       })
  //     } else {
  //       // 記錄到 LocalStorage 裡，使用 JSON 包進去
  //       localStorage.setItem(
  //         '訂單價格資訊',
  //         JSON.stringify(orderdetailPriceInfo)
  //       )

  //       // 到填寫資料頁面
  //       props.history.push('/carts/Manage')
  //     }
  //   }
  // }

  return (
    <>
      <div className="orderinfolist col-lg-3 col-10 mx-lg-3 mx-auto mt-3">
        <h4>訂單資訊</h4>
        <table className="table table-borderless">
          <tbody>
            <tr scope="row" className="border-top">
              <th>商品小計</th>
              <td>NT${productPrice()}</td>
            </tr>
            <tr scope="row">
              <th>運費</th>
              <td>未選擇</td>
            </tr>
            <tr scope="row" className="border-bottom">
              <th>優惠</th>
              <td>-NT${Promotion}</td>
            </tr>
            <tr scope="row">
              <th>商品總計</th>
              <td>NT${totalPrice()}</td>
            </tr>
            <tr scope="row">
              <th>剩餘點數</th>
              <td>{pointChange}</td>
            </tr>
            <tr scope="row">
              <th>使用點數</th>
              <td>{textvalue === '' ? '0' : textvalue}</td>
            </tr>
          </tbody>
        </table>

        {/* 會員優惠點數使用區 */}
        <div className="promotion d-flex justify-content-between">
          <input
            type="text"
            placeholder="請輸入使用點數"
            onChange={(e) => {
              // 記錄會員優惠點數
              textvalue = e.target.value
            }}
          />
          <button
            onClick={(e) => {
              promo = true
              if (!numberJudge.test(textvalue)) {
                Swal.fire({
                  icon: 'error',
                  title: '輸入格式不對喔，請檢查',
                  showConfirmButton: false,
                  timer: 1500,
                })
              } else {
                // 點擊使用優惠鈕，交給函式處理
                getLoginData()
              }
            }}
          >
            使用
          </button>
        </div>

        {/* 確認到下一步或返回商城 */}
        <div className="my-3 text-lg-start text-center">
          <button
            className="orderconfirm col-12 my-3"
            onClick={() => {
              // 到填寫資料頁面
              nextStep = true
              console.log('nextstep', nextStep)

              // 交給函式處理
              getLoginData()
            }}
          >
            結帳去
          </button>
          <button
            className="returnstore col-12  my-3"
            onClick={() => {
              // 返回商城頁面
              props.history.push('')
            }}
          >
            返回商城
          </button>
        </div>
      </div>
    </>
  )
}

export default withRouter(OrderInfo)
