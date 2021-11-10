import React, { useState, useEffect } from 'react'
import '../../styles/article/Article.scss'
import { Link } from 'react-router-dom'

function PopularFood(props) {
  const [data, setData] = useState([])


  useEffect(() => {
    ;(async () => {
      let r = await fetch(
        'http://localhost:3002/ArtFood/FoodContent/popluar'
      )
      let j = await r.json()
      // console.log('j:', j)
      if (j.length) {
        setData(j)
      }
    })()
  }, [])

  return (
    <>
      {data && data.length
        ? data.map((el) => {
            return (
              <>
                <div className="my-3 mostPopularItems">
                  <Link
                    onClick={() => {
                      window.location.href =
                        '/FoodContent/' + el.sid
                    }}
                  >
                    <li>{el.ar_title}</li>
                  </Link>
                  {/* <div className="heartWrap my-2 mx-3">
                    <i className="far fa-heart"></i>
                  </div> */}
                </div>
              </>
            )
          })
        : ''}
    </>
  )
}

export default PopularFood
