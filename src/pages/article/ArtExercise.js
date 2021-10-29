import { withRouter } from 'react-router-dom'
import React from 'react'
import '../../styles/article/Article.scss'
import ArCardTxtExercise from '../../components/article/ArCardTxtExercise'
import BreadCrumb from '../../components/BreadCrumb'

function ArtExercise(props) {
  return (
    <>
      <div className="container col-cat-article">
        <BreadCrumb />
        <div className="row">
          <div className="col-lg col-8 cardsWrap d-flex flex-wrap">
            <ArCardTxtExercise />
          </div>
        </div>
      </div>
    </>
  )
}

export default withRouter(ArtExercise)
