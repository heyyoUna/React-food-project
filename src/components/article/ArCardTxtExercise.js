import React, { useState, useEffect } from 'react'
import { API_img } from '../../config/index'
import '../../styles/article/Article.scss'

function ArCardTxtExercise(props) {
  const [data, setData] = useState([])
  // const [totalRows, setTotalRows] = useState(0)

  useEffect(() => {
    ;(async () => {
      let r = await fetch(
        'http://localhost:3002/ArtExercise'
      )
      let j = await r.json()
      console.log(j)
      if (j.length) {
        setData(j)
      }
    })()
  })

  function articleDate(aaa) {
    let time = new Date(aaa)
    let year = time.getFullYear()
    let month = time.getMonth()
    let date = time.getDate()

    return `${year} / ${month + 1} / ${date} `
  }

  return (
    <>
      {data && data.length
        ? data.map((el) => {
            return (
              <>
                <div className="artColCards cardsHover">
                  <div className="imgWrap col-lg">
                    <img
                      src={`${API_img}` + el.ar_pic}
                      alt=""
                    />
                  </div>

                  <div className="px-1 py-1 arCardTxt">
                    <p className="pt-3 grey">運動訓練</p>

                    <h6 className="productTitle f_darkgreen pt-1">
                      {el.ar_title}
                    </h6>
                    <p className="pb-1 grey articleDate">
                      {articleDate(el.ar_date)}
                    </p>
                  </div>
                </div>
              </>
            )
          })
        : ''}
    </>
  )
}

export default ArCardTxtExercise
