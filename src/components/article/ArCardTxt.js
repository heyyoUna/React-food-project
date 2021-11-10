import React, { useState } from 'react'
import {
  withRouter,
  useHistory,
  Link,
} from 'react-router-dom'
import '../../styles/article/Article.scss'
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

function ArCardTxt(props) {
  const { sid, cate, title, date, favArr } = props
  const token = localStorage.getItem('token')
  let history = useHistory()
  const [display, setDisplay] = useState(true)

  //轉換時間格式
  function articleDate(aaa) {
    let time = new Date(aaa)
    let year = time.getFullYear()
    let month = time.getMonth()
    let date = time.getDate()

    return `${year} / ${month + 1} / ${date} `
  }

  // 新增收藏
  const handlingInsert = () => {
    fetch(
      `http://localhost:3002/member/favorite-article-insert`,
      {
        method: 'POST',
        body: JSON.stringify({
          article_id: sid,
          article_cate: cate
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      }
    )
    console.log('sid in insert', sid)
  }
  //  刪除收藏
  const handlingDelete = () => {
    fetch(
      `http://localhost:3002/member/favorite-article-delete/${sid}/${cate}`,
      {
        method: 'DELETE',
      }
    )
  }

  return (
    <>
      {/* <div className="px-1 py-1 arCardTxt">
        <p className="pt-1 grey">{props.name}</p>
        <p>{props.title}</p>
        <p className="pb-1">{articleDate(props.date)}</p>
      </div> */}

      <div className="px-1 py-1 arCardTxt">
        <div className="d-flex justify-content-between pr-5">
          <p className="grey">{props.name}</p>
          <div className="pd-love-icon">
            <IoIosHeartEmpty
              onClick={(e) => {
                if (!token) {
                  Swal.fire({
                    title: '請先登入會員',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: '前往登入頁面',
                  }).then((result) => {
                    if (result.isConfirmed) {
                      props.history.push('/login')
                    }
                  })
                } else {
                  handlingInsert()
                  Swal.fire({
                    icon: 'success',
                    title: '已加入收藏清單',
                    showConfirmButton: false,
                    timer: 1000,
                  })
                  if (display) {
                    setDisplay(false)
                  } else {
                    setDisplay(true)
                  }
                }
              }}
              style={{
                display: display ? 'block' : 'none',
              }}
            />
            <IoIosHeart
              onClick={(e) => {
                handlingDelete()
                if (display) {
                  setDisplay(false)
                } else {
                  setDisplay(true)
                }
              }}
              style={{
                display: display ? 'none' : 'block',
              }}
            />
          </div>
        </div>

        <h6 className="productTitle f_darkgreen pt-1">
          {title}
        </h6>
        <p className="pb-1 grey articleDate">
          {articleDate(date)}
        </p>
      </div>
    </>
  )
}
ArCardTxt.defaultProps = {
  title: '藝FUN券抽籤第二批幸運兒出爐 快對身分證號碼',
  name: '聰明飲食',
  date: '2020/11/11',
}

export default ArCardTxt
