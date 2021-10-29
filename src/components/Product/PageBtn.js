import React from 'react'
import { Link, withRouter } from 'react-router-dom'

function PageBtn(props) {
  const { totalpages, nowpage, setNowPage } = props
  // 把頁數轉換成陣列
  const page = []
  for (let i = 1; i <= totalpages; i++) {
    page.push(i)
  }
  // 解析路徑上的分類號
  const searchParams = new URLSearchParams(
    props.location.search
  )
  // 取的分類號,跟關鍵字
  const searchCate = searchParams.get('cate')
  const searchKeyword = searchParams.get('keyword')

  return (
    <>
      <div className="page-btn-wrap d-flex">
        {/* 前一頁 */}
        <div
          className="page-pre"
          onClick={() => {
            if (nowpage > 1){
              const np = parseInt(nowpage) -1;
              setNowPage(np)
              const usp = new URLSearchParams({'page': np});
              if(searchCate){
                usp.set('cate', searchCate);
              }
              if(searchKeyword){
                usp.set('keyword', searchKeyword);
              }
              props.history.push(
                `?${usp.toString()}`
              ) 
            }
          }}
        >
          <i className="fas fa-chevron-left"></i>
        </div>
        {/* 頁數 */}
        <div className="page d-flex">
          {page.map((v, i) => {
            const usp = new URLSearchParams({'page': v});
            if(searchCate){
              usp.set('cate', searchCate);
            }
            if(searchKeyword){
              usp.set('keyword', searchKeyword);
            }
            return (
              <div key={i}>
                <Link
                  to={`?${usp.toString()}`}
                  onClick={(e) => {
                    setNowPage(v)
                    console.log('nopage', v)
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
            if (nowpage < totalpages){
              const np = parseInt(nowpage) + 1;
              setNowPage(np)
              const usp = new URLSearchParams({'page': np});
              if(searchCate){
                usp.set('cate', searchCate);
              }
              if(searchKeyword){
                usp.set('keyword', searchKeyword);
              }
              props.history.push(
                `?${usp.toString()}`
              )

            }

          }}
        >
          <i className="fas fa-chevron-right"></i>
        </div>
        <p className="total-page">共 {totalpages} 頁</p>
      </div>
    </>
  )
}

export default withRouter(PageBtn)
