import React, { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { API_img } from '../../config/index'
import '../../styles/article/Article.scss'
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

function ArCardTxtExercise(props) {
  const { sid, cate, pic, title, date, favArr } = props
  const token = localStorage.getItem('token')
  let history = useHistory()
  const [display, setDisplay] = useState(true)

  // 判斷商品有在收藏清單時，設定icon為實心
  useEffect(() => {
    if (token) {
      if (favArr) {
        favArr.forEach((value) => {
          if (value.article_id === sid) {
            setDisplay(false)
          }
        })
      }
    }
  }, [])

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
      <div className="artColCards cardsHover key={i}">
        <Link to={`/ExerciseContent/${sid}`}>
          <div className="imgWrap col-lg articlePageCards">
            <img src={`${API_img}` + pic} alt="" />
          </div>
        </Link>

        <div className="px-1 py-1 arCardTxt">
          <div className="d-flex justify-content-between pr-5">
            <p className="grey">運動訓練</p>
            <div className="pd-love-icon">
              {console.log(favArr)}
              <IoIosHeartEmpty
                onClick={(e) => {
                  // e.stopPropagation()
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
                  e.stopPropagation()
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
          <p className="pb-1 grey articleDate">{date}</p>
        </div>
      </div>
    </>
  )
}

export default ArCardTxtExercise
