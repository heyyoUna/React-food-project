import React, { useState, useEffect } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { API_img, imgUrl } from '../../config/index'
import '../../styles/article/Article.scss'

import HpArMoreBtn from '../../components/HpArMoreBtn'
import PopularRecipe from '../../components/article/PopularRecipe'
import RelatingRecipe from '../../components/article/RelatingRecipe'
import { GiKnifeFork } from 'react-icons/gi'

function FoodContent(props) {
  const [data, setData] = useState([])
  const [ingredient, setIngredient] = useState([])
  const [ingredientSec, setIngredientSec] = useState([])
  const [steps, setSteps] = useState([])

  useEffect(() => {
    const fcURL = new URL(document.location.href) //目前網頁網址
    const fcSid = fcURL.pathname //目前網址的路徑
    const fcSplit = fcSid.split('/')[2] //將路徑的字串切割，第三個位置就是sid

    ;(async () => {
      let r = await fetch(
        'http://localhost:3002/ArtRecipe/' + fcSplit
      )
      let j = await r.json()

      if (j.success) {
        setData(j.data)
        setIngredient(JSON.parse(j.data.ar_rec_ingredient))
        setIngredientSec(
          JSON.parse(j.data.ar_rec_ingredient2)
        )
        setSteps(JSON.parse(j.data.ar_rec_process))
      }
    })()
  }, [])

  return (
    <>
      <div
        className="container-fluid pt-5 col-article"
        id="recipeContent"
      >
        {/* <!------------ 正文 ------------>   */}
        <div className="row contentMobileFlex">
          <div className="col-7">
            <h3>{data.ar_title}</h3>
            <figure className="imgWrap">
              <img
                src={`${API_img}` + data.ar_pic}
                alt=""
              />
            </figure>

            <div className="text-center recipeIngredient d-flex mt-3 dark-green">
              <hr className="col my-auto" />
              <div className="col-5 recipeContentIngreTitle">
                <h4>材料</h4>
                <p>(約{data.ar_rec_quan}人份)</p>
              </div>
              <hr className="col my-auto" />
            </div>

            <div className="d-flex me-auto justify-content-between align-middle mb-5 ingredientList">
              <table className="col-4">
                {ingredient.map((el) => {
                  return (
                    <tr>
                      <td>{el.name}</td>
                      <td className="ingredientQuantity">
                        {el.quantity}
                      </td>
                      <td>{el.unit}</td>
                    </tr>
                  )
                })}
              </table>
              <div className="my-auto forkIcon">
                <GiKnifeFork />
              </div>
              <table className="col-4">
                {ingredientSec.map((el) => {
                  return (
                    <tr>
                      <td>{el.name}</td>
                      <td className="ingredientQuantity">
                        {el.quantity}
                      </td>
                      <td>{el.unit}</td>
                    </tr>
                  )
                })}
              </table>
            </div>

            <div className="text-center recipeIngredient d-flex mt-5 dark-green">
              <hr className="col my-auto" />
              <div className="col-5">
                <h4>步驟</h4>
                <p>(約{data.ar_rec_cookTime}分鐘)</p>
              </div>
              <hr className="col my-auto" />
            </div>

            {steps.map((el) => {
              return (
                <>
                  <table>
                    <tr>
                      <td className="px-3 stepsIcons">
                        <img
                          src={`${imgUrl}/images/article/stepsIcon.png`}
                          alt=""
                        />
                      </td>
                      <td className="py-2">{el}</td>
                    </tr>
                  </table>
                </>
              )
            })}
          </div>

          <div className="col-3 mostPopular mostPopularRecipe">
            <ul>
              <div className="mostPopularTitle">
                Most Popular
              </div>
              <PopularRecipe />
            </ul>
          </div>
        </div>

        <div className="row article_rec">
          <div className="col-1"></div>
          <div className="text-center articleRecom d-flex my-5 dark-green">
            <hr className="col my-auto" />
            <div className="col-5 my-3">
              <h4>相關商品</h4>
            </div>
            <hr className="col my-auto" />
          </div>

          <div className="row artColCardsWrap">
            <RelatingRecipe className="mt-5" />
            <Link
              className="col-1 "
              onClick={() => {
                window.location.href = '/article/recipe'
              }}
            >
              <HpArMoreBtn />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default withRouter(FoodContent)
