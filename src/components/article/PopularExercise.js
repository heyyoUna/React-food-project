import React, { useState, useEffect } from 'react'
import { API_img } from '../../config/index'
import '../../styles/article/Article.scss'
import { Link } from 'react-router-dom'
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io'

function PopularExercise(props) {
  const [data, setData] = useState([])
  // const [totalRows, setTotalRows] = useState(0)

  useEffect(() => {
    ;(async () => {
      let r = await fetch(
        'http://localhost:3002/ArtExercise/ExerciseContent/popluar'
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
                <div className="d-flex my-3 mostPopularItems ">
                  <Link
                    onClick={() => {
                      window.location.href =
                        '/ExerciseContent/' + el.sid
                    }}
                  >
                    <li>{el.ar_title}</li>
                  </Link>
                  <div className="heartWrap my-2 mx-3">
                    <i className="far fa-heart"></i>
                  </div>
                </div>
              </>
            )
          })
        : ''}
    </>
  )
}

export default PopularExercise
