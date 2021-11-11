import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

// 註：修改為可以對應多重表單元件輸入
function ArQARadioButton(props) {
  const { value, checkedReply, setCheckReply } = props
  const [data, setData] = useState([])

  const token = localStorage.getItem('token')

  const fcURL = new URL(document.location.href) //目前網頁網址
  const fcSid = fcURL.pathname //目前網址的路徑
  const fcSplit = fcSid.split('/')[2] //將路徑的字串切割，第三個位置就是sid

  // 新增問答互動次數+會員點數
  const EngagementAdd = (sid) => {
    fetch(`http://localhost:3002/ArtFood/QA/${fcSplit}`, {
      method: 'POST',
      body: JSON.stringify({ sid }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
  }

  useEffect(() => {
    ;(async () => {
      let r = await fetch(
        'http://localhost:3002/ArtFood/' + fcSplit
      )
      let j = await r.json()
      if (j.success) {
        setData(j.data)
        // console.log('j.data:', j.data)
      }
      // console.log(
      //   'j.data.ar_correct_answer',
      //   j.data.ar_correct_answer
      // )
    })()
  }, [])

  return (
    <div className="QAanswers">
      <input
        type="radio"
        id={value}
        value={value}
        checked={checkedReply === value}
        onChange={(e) => {
          if (!token) {
            Swal.fire({
              title: '請登入',
              text: '登入答題，賺取會員點數',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: '立即登入',
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = '/login'
              }
            })
          } else {
            if (e.target.value !== data.ar_correct_answer) {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '答錯囉！再次一次吧',
              })
            } else {
              EngagementAdd(data.sid)
              setCheckReply(e.target.value)
              Swal.fire({
                icon: 'success',
                title: '恭喜獲得1點會員點數',
                showConfirmButton: false,
                timer: 1500,
              })
            }
          }
        }}
      />
      <label htmlFor={value}>{value}</label>
    </div>
  )
}

export default ArQARadioButton
