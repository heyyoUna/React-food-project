import React, { useEffect, useState } from 'react'
import { API_img } from '../../config/index'
import { withRouter, useHistory } from 'react-router-dom'
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io'
import MemberNavbar from '../../components/member/MemberNavbar'

function MemberFavoriteArticle(props) {
  const id = localStorage.getItem('id')
  const [article, setArticle] = useState([])
  let history = useHistory()

  useEffect(() => {
    favoriteArticleGet()
  }, [])

  const favoriteArticleGet = () => {
    if (id > 0) {
      fetch(`http://localhost:3002/member/favorite-article-get/${id}}`, {
        method: 'GET',
      }).then(r => r.json())
        .then(obj => {
          if (obj.length) {
            setArticle(obj)
          } else {
            alert(obj.error || '快去收藏文章吧')
          }
        })
    } else {
      alert('尚未登入，請連到登入頁面')
      history.push('/login')
    }
  }

  const handlingClick = (articleid, index, remove_flag) => {
    if (remove_flag) {
      handlingInsert(articleid, index)
    } else {
      handlingDelete(articleid, index)
    }
  }

  const handlingDelete = (articleid, index) => {
    fetch(`http://localhost:3002/member/favorite-article-delete/${articleid}`, {
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
          alert(obj.error || '移除收藏文章失敗')
        }
      })
  }

  const handlingInsert = (articleid, index) => {
    fetch(`http://localhost:3002/member/favorite-article-insert`, {
      method: 'POST',
      body: JSON.stringify({
        memberid: +id,
        articleid: articleid
      }),
      headers: {
        'Content-Type': 'application/json'
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

        } else {
          alert(obj.error || ' 新增收藏文章失敗')
        }
      })
  }

  return (
    <>
      <div className="member-favorite-container">
        <div className="row member-favorite-title">
          <h1 id="member-favorite-h1">文章追蹤清單</h1>
        </div>
        <div className="row member-favorite">
          <MemberNavbar/>
          <div className="member-n col-1"></div>
          <div className="member-favorite-card col-9">
            {article.map((value, index) => {
              return (
                <div className="card mb-3" key={value.sid}>
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
          <div className="member-favorite-card-mobile">
            {article.map((value, index) => {
              return (
                <div className="card mb-3 " key={value.sid}>
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