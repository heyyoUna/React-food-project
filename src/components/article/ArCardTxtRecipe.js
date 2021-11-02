import React, { useState, useEffect } from 'react'
import { API_img } from '../../config/index'
import '../../styles/article/Article.scss'
import { Link } from 'react-router-dom'
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io'

function ArCardTxtRecipe(props) {
  const [data, setData] = useState([])
  // const [totalRows, setTotalRows] = useState(0)

  useEffect(() => {
    ;(async () => {
      let r = await fetch('http://localhost:3002/ArtRecipe')
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

                  <Link to={'/RecipeContent/' + el.sid}>
                    <div className="px-1 py-1 arCardTxt">
                      <div className="d-flex justify-content-between pr-5">
                        <p className="pt-3 grey">
                          美味食譜
                        </p>
                        <IoIosHeartEmpty
                          style={{
                            color: '#FB6107',
                            fontSize: '30px',
                            marginTop: '3px',
                            // display: value.remove_flag ? 'block' : 'none'
                          }}
                        />
                        <IoIosHeart
                          style={{
                            color: '#d96e30',
                            fontSize: '30px',
                            marginTop: '3px',
                            // display: value.remove_flag ? 'none' : 'block'
                          }}
                        />

                      </div>
                      <h6 className="productTitle f_darkgreen pt-1">
                          {el.ar_title}
                        </h6>
                      <p className="pb-1 grey articleDate">
                        {articleDate(el.ar_date)}
                      </p>
                    </div>
                  </Link>
                </div>
              </>
            )
          })
        : ''}
    </>
  )
}

export default ArCardTxtRecipe
