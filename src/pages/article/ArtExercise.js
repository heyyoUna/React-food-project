import React, { useState, useEffect } from 'react'
import '../../styles/article/Article.scss'
import { withRouter } from 'react-router-dom'
import '../../styles/article/Article.scss'

// 組合用元件
import ArCardTxtExercise from '../../components/article/ArCardTxtExercise'
import ArPageBtn from '../../components/article/ArPageBtn'
import BreadCrumb from '../../components/BreadCrumb'

function ArtExercise(props) {
  const [data, setData] = useState([])
  const [pages, setPages] = useState([])
  const [totalPages, setTotalPages] = useState('') // 總頁數

  const searchParams = new URLSearchParams(
    props.location.search
  ) // 解析路徑上的分類號

  const [nowpage, setNowPage] = useState(
    searchParams.get('page') || 1
  ) // 設定目前頁數狀態

  const { favArr, setFavArr } = props
  const ID = localStorage.getItem('id')

  useEffect(() => {
    ; (async () => {
      let r = await fetch(
        'http://localhost:3002/ArtExercise' +
        `${props.location.search}`
      )
      let j = await r.json()
      setData(j.rows)
      // console.log('data in ArExercise:', data)
      // console.log('j.rows in ArtExercise page', j.rows)
      setPages(j)
      setTotalPages(j.totalPages)
    })()
  }, [nowpage])

  const page = []
  for (let i = 1; i <= totalPages; i++) {
    page.push(i)
  }

  // 解析URL參數
  const sp = searchParams.toString()
  // 跳轉頁面都會觸發,將URL參數設定回狀態
  useEffect(() => {
    setUpdateState()
  }, [sp])
  // 當跳頁的時候把URL參數設定回狀態
  const setUpdateState = () => {
    setNowPage(page)
  }

  //轉換時間格式
  function articleDate(aaa) {
    let time = new Date(aaa)
    let year = time.getFullYear()
    let month = time.getMonth()
    let date = time.getDate()

    return `${year} - ${month + 1} - ${date} `
  }

  return (
    <>
      <div className="container col-cat-article">
        <BreadCrumb />
        <div className="row">
          {/* <div className="col-lg col-8 cardsWrap d-flex flex-wrap"> */}
          <div className="col-md-12 cardsWrap d-flex flex-wrap">
            {data && data.length
              ? data.map((el, i) => {
                return (
                  <ArCardTxtExercise
                    favArr={favArr}
                    sid={el.sid}
                    cate={el.ar_cate}
                    pic={el.ar_pic}
                    title={el.ar_title}
                    date={articleDate(el.ar_date)}
                  />
                )
              })
              : ''}
          </div>
          <ArPageBtn
            nowpage={nowpage}
            totalPages={totalPages}
            setNowPage={setNowPage}
          />
        </div>
      </div>
    </>
  )
}

export default withRouter(ArtExercise)
