import { withRouter, Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { imgUrl, API_img } from '../../config/index'
import '../../styles/article/Article.scss'
import ArCardTxt from '../../components/article/ArCardTxt'
import TitleBorder from '../../components/TitleBorder'
import { Carousel } from 'react-bootstrap'
import HpArMoreBtn from '../../components/HpArMoreBtn'

function Article(props) {
  const [foodOne, setFoodOne] = useState([])
  const [twoFoodRand, setTwoFoodRand] = useState([])
  const [exerciseRand, setExerciseRand] = useState([])
  const [recipeOne, setRecipeOne] = useState([])
  const [recipeList, setRecipeList] = useState([])

  //聰明飲食路由
  useEffect(() => {
    ;(async () => {
      let r = await fetch(
        'http://localhost:3002/ArtFood/' + 1
      )
      let j = await r.json()
      setFoodOne(j.data)
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      let r = await fetch(
        'http://localhost:3002/ArtFood/FoodContent/TwoRandom'
      )
      let j = await r.json()
      setTwoFoodRand(j)
    })()
  }, [])

  //運動訓練路由
  useEffect(() => {
    ;(async () => {
      let r = await fetch(
        'http://localhost:3002/ArtExercise/ExerciseContent/relatingArt'
      )
      let j = await r.json()
      // console.log('ExerciseRand:', j)
      setExerciseRand(j)
    })()
  }, [])

  //食譜路由
  useEffect(() => {
    ;(async () => {
      let r = await fetch(
        'http://localhost:3002/ArtRecipe/1'
      )
      let j = await r.json()
      console.log('RecipeOne:', j.data)
      setRecipeOne(j.data)
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      let r = await fetch(
        'http://localhost:3002/ArtRecipe/RecipeContent/popluar'
      )
      let j = await r.json()
      console.log('RecipeList:', j)
      setRecipeList(j)
    })()
  }, [])

  return (
    <>
      {/* <!------------ 專欄KV ------------>  */}
      <div className="container-fluid p-0" id="articlePage">
        <div className="row p-0 mx-auto" id="article-kv">
          <Carousel className="p-0 col-lg">
            <Carousel.Item className="imgWrap">
              <Link
                onClick={() => {
                  window.location.href = '/FoodContent/9'
                }}
              >
                <img
                  className="d-block "
                  src={`${imgUrl}/images/article/col_kv1-3.jpg`}
                  alt="First slide"
                />
              </Link>
            </Carousel.Item>
            <Carousel.Item className="imgWrap">
              <Link
                onClick={() => {
                  window.location.href =
                    '/ExerciseContent/4'
                }}
              >
                <img
                  className="d-block "
                  src={`${imgUrl}/images/article/col_kv2-3.jpg`}
                  alt="Second slide"
                />
              </Link>
            </Carousel.Item>
            <Carousel.Item className="imgWrap">
              <Link
                onClick={() => {
                  window.location.href =
                    '/ExerciseContent/4'
                }}
              ></Link>
              <img
                className="d-block "
                src={`${imgUrl}/images/article/col_kv3-3.jpg`}
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
        </div>

        {/* <!------------ 專欄頁： 1st種類 聰明飲食  ------------>   */}
        <div className="container" id="col-cat">
          <TitleBorder name="聰明飲食" />

          <div className="row" id="col-cat1">
            <div className="col-lg-7">
              <Link to={`/FoodContent/${foodOne.sid}`}>
                <figure className="articlePageCards">
                  <img
                    src={`${API_img}` + foodOne.ar_pic}
                    alt=""
                  />
                </figure>
              </Link>
              <ArCardTxt
                title={foodOne.ar_title}
                date={foodOne.ar_date}
              />
            </div>
            <div className="col-lg-5">
              <div className="col-cat1-s col">
                {twoFoodRand.map((el) => {
                  return (
                    <>
                      <Link to={`/FoodContent/${el.sid}`}>
                        <figure className="imgWrap articlePageCards">
                          <img
                            src={`${API_img}` + el.ar_pic}
                            alt=""
                          />
                        </figure>
                      </Link>
                      <ArCardTxt
                        title={el.ar_title}
                        date={el.ar_date}
                      />
                    </>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="col_RM_btn">
            <Link to={`/article/food`}>
              <button>更多文章</button>
            </Link>
          </div>

          {/* <!------------ 專欄頁： 2nd 種類 運動  ------------>   */}
          <TitleBorder name="運動訓練" />

          <div className="row" id="col-cat2">
            <div className="col-lg d-flex">
              {exerciseRand.map((el) => {
                return (
                  <div className="mx-3 col">
                    <Link to={`/ExerciseContent/${el.sid}`}>
                      <figure className="col-cat-firstImg articlePageCards">
                        <img
                          src={`${API_img}` + el.ar_pic}
                          alt=""
                        />
                      </figure>
                    </Link>
                    <ArCardTxt
                      name="運動訓練"
                      title={el.ar_title}
                      date={el.ar_date}
                    />
                  </div>
                )
              })}
            </div>
          </div>
          <div className="col_RM_btn">
            <Link to={`/article/Exercise`}>
              <button>更多文章</button>
            </Link>
          </div>

          {/* <!------------ 專欄頁： 3rd 種類 美味食譜  ------------>   */}
          <TitleBorder name="美味食譜" />

          <div className="row" id="col-cat3">
            <div className="col-lg">
              <Link to={`/RecipeContent/${recipeOne.sid}`}>
                <figure className="imgWrap articlePageCards">
                  <img
                    src={`${API_img}` + recipeOne.ar_pic}
                    alt=""
                  />
                </figure>
              </Link>
              <ArCardTxt
                name="美味食譜"
                title={recipeOne.ar_title}
                date={recipeOne.ar_date}
              />
            </div>
            <div className="col-lg colList">
              <ul>
                {recipeList.map((el) => {
                  return (
                    <div>
                      <Link to={`/RecipeContent/${el.sid}`}>
                        <li>{el.ar_title}</li>
                      </Link>

                      <span>
                        <i className="far fa-heart"></i>
                      </span>
                    </div>
                  )
                })}
              </ul>
            </div>
          </div>
          <div className="col_RM_btn">
          <Link to={`/article/Recipe`}>
            <button>更多文章</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default withRouter(Article)
