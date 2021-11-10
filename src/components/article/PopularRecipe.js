import React, { useState, useEffect } from 'react'
import '../../styles/article/Article.scss'
import { Link } from 'react-router-dom'

function PopularRecipe(props) {
  const [data, setData] = useState([])

  useEffect(() => {
    ;(async () => {
      let r = await fetch(
        'http://localhost:3002/ArtRecipe/RecipeContent/popluar'
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
                <div className="d-flex my-3 mostPopularItems justify-content-center">
                  <Link
                    onClick={() => {
                      window.location.href =
                        '/RecipeContent/' + el.sid
                    }}
                  >
                    <p className="text-center popularRecipeList">
                      {el.ar_title}
                    </p>
                  </Link>

                </div>
              </>
            )
          })
        : ''}
    </>
  )
}

export default PopularRecipe
