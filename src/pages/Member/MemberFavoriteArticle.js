import React, { useEffect, useState } from 'react'
import { API_img } from '../../config/index'
import { withRouter, useHistory } from 'react-router-dom'
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io'
import MemberNavbar from '../../components/member/MemberNavbar'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

function MemberFavoriteArticle(props) {
  const token = localStorage.getItem('token')
  const [article, setArticle] = useState([])
  let history = useHistory()

  useEffect(() => {
    favoriteArticleGet()
  }, [])

  const favoriteArticleGet = () => {
    if (!token) {
      Swal.fire('尚未登入，請連到登入頁面')
      history.push('/login')
    }

    fetch(`http://localhost:3002/member/favorite-article-get`, {
      method: 'GET',
      headers: {
        //token 從 header 中 Authorization 屬性傳入
        //格式為 Bearer + 空格 + token
        'Authorization': 'Bearer ' + token
      }
    }).then(obj => obj.json())
      .then(obj => {
        if (obj.success) {
          if (obj.data.length) {
            setArticle(obj.data)
          } else {
            Swal.fire(obj.error || '尚未收藏文章')
          }
        } else {
          Swal.fire(obj.error)
        }
      })
  }

  const handlingClick = (article_id, article_cate, index, remove_flag) => {
    if (remove_flag) {
      handlingInsert(article_id, article_cate, index)
    } else {
      handlingDelete(article_id, article_cate, index)
    }
  }

  const handlingDelete = (article_id, article_cate, index) => {
    fetch(`http://localhost:3002/member/favorite-article-delete/${article_id}/${article_cate}`, {
      method: 'DELETE',
    }).then(r => r.json())
      .then(obj => {
        if (obj.success) {
          //複製出新的products
          let newArticle = [...article]
          //註記products中第index筆資料被刪除(註記刪除)
          newArticle[index].remove_flag = true
          //新的products覆蓋掉原本的products
          setArticle(newArticle)

          //空心愛心

        } else {
          Swal.fire(obj.error || '移除收藏文章失敗')
        }
      })
  }

  const handlingInsert = (article_id, article_cate, index) => {
    fetch(`http://localhost:3002/member/favorite-article-insert`, {
      method: 'POST',
      body: JSON.stringify({
        article_id: article_id,
        article_cate: article_cate
      }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    }).then(r => r.json())
      .then(obj => {
        if (obj.success) {
          //複製出新的article
          let newArticle = [...article]
          //拿掉被刪除的article中第index筆資料的註記(取消刪除註記)
          newArticle[index].remove_flag = false
          //新的article覆蓋掉原本的article
          setArticle(newArticle)
          //實心愛心
          Swal.fire({
            icon: 'success',
            title: '已加入收藏清單',
            showConfirmButton: false,
            timer: 1000
          })
        } else {
          Swal.fire(obj.error || ' 新增收藏文章失敗')
        }
      })
  }

  return (
    <>
      <div className="member-favorite-container">
        <div className="row member-favorite-title">
          <h1 id="member-favorite-h1">文章收藏清單</h1>
        </div>
        <div className="row member-favorite">
          <MemberNavbar />
          <div className="member-n col-1"></div>
          <div className="member-favorite-card col-9">
            {article.map((value, index) => {
              return (
                <div className="card mb-3" key={index}>
                  <div className="row member-favorite-product">
                    <div className="col-md-4">
                      <img className="img-fluid rounded-start"
                        src={`${API_img}` + value.ar_pic}
                        alt="" />
                    </div>
                    <div className="col-md-7">
                      <div className="card-body">
                        <div className="member-card-title">
                          <h5 className="card-title">
                            {value.ar_title}
                          </h5>
                        </div>
                        <div className="member-favorite-text">
                          <p className="card-text">{value.ar_date}</p>
                        </div>
                      </div>
                    </div>
                    <div className="member-icon col-md-1">
                      <div className="member-like" onClick={() =>
                        handlingClick(value.sid, value.ar_cate, index, value.remove_flag)
                      }>
                        <IoIosHeartEmpty
                          style={{
                            color: '#FB6107',
                            fontSize: '26px',
                            marginTop: '3px',
                            display: value.remove_flag ? 'block' : 'none'
                          }}
                        />
                        <IoIosHeart
                          style={{
                            color: '#d96e30',
                            fontSize: '26px',
                            marginTop: '3px',
                            display: value.remove_flag ? 'none' : 'block'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="member-favorite-card-mobile">
            {article.map((value, index) => {
              return (
                <div className="card mb-3 " key={index}>
                  <div className="row member-favorite-product">
                    <div className="col-md-4">
                      <img className="img-fluid rounded-start"
                        src={`${API_img}` + value.ar_pic}
                        alt="" />
                    </div>
                    <div className="col-md-7">
                      <div className="card-body">
                        <div className="member-card-title">
                          <h5 className="card-title">
                            {value.ar_title}
                          </h5>
                        </div>
                        <div className="member-favorite-text">
                          <p className="card-text">{value.ar_date}</p>
                        </div>
                      </div>
                    </div>
                    <div className="member-icon col-md-1">
                      <div className="member-like" onClick={() =>
                        handlingClick(value.sid, index, value.remove_flag)
                      }>
                        <IoIosHeartEmpty
                          style={{
                            color: '#FB6107',
                            fontSize: '26px',
                            marginTop: '3px',
                            display: value.remove_flag ? 'block' : 'none'
                          }}
                        />
                        <IoIosHeart
                          style={{
                            color: '#d96e30',
                            fontSize: '26px',
                            marginTop: '3px',
                            display: value.remove_flag ? 'none' : 'block'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default withRouter(MemberFavoriteArticle)