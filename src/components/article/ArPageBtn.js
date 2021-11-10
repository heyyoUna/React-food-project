import React from 'react'
import { Link, withRouter } from 'react-router-dom'

function ArPageBtn(props) {
  const { totalPages, nowpage, setNowPage } = props // 把頁數轉換成陣列

  const page = []
  for (let i = 1; i <= totalPages; i++) {
    page.push(i)
  }
  // 解析路徑上的分類號
  const searchParams = new URLSearchParams(
    props.location.search
  )

  return (
    <>
      <div className="page-btn-wrap d-flex mt-3">
        {/* 前一頁 */}
        <div
          className="page-pre"
          onClick={() => {
            if (nowpage > 1) {
              const np = parseInt(nowpage) - 1
              setNowPage(np)
              const usp = new URLSearchParams({
                page: np,
              })

              props.history.push(`?${usp.toString()}`)
            }
          }}
        >
          <i className="fas fa-chevron-left"></i>
        </div>
        {/* 頁數 */}
        <div className="page d-flex">
          {page.map((v, i) => {
            const usp = new URLSearchParams({
              page: v,
            })

            return (
              //頁數
              <div key={i}>
                <Link
                  to={`?${usp.toString()}`}
                  onClick={(e) => {
                    setNowPage(v)
                  }}
                >
                  {v}
                </Link>
              </div>
            )
          })}
        </div>
        {/* 下一頁 */}
        <div
          className="page-next"
          onClick={() => {
            if (nowpage < totalPages) {
              const np = parseInt(nowpage) + 1
              setNowPage(np)
              const usp = new URLSearchParams({
                page: np,
              })

              props.history.push(`?${usp.toString()}`)
            }
          }}
        >
          <i className="fas fa-chevron-right"></i>
        </div>
        <p className="total-page">共 {totalPages} 頁</p>
      </div>
    </>
  )
}

export default withRouter(ArPageBtn)
