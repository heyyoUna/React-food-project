import { withRouter } from 'react-router-dom'
import '../../styles/article/Article.scss'
import ArCardTxtFood from '../../components/article/ArCardTxtFood'

import BreadCrumb from '../../components/BreadCrumb'

function ArtFood(props) {
  return (
    <>
      <div className="container col-cat-article">
        <BreadCrumb />
        <div className="row">
          <div className="col-lg col-8 cardsWrap d-flex flex-wrap">
            <ArCardTxtFood />
          </div>
        </div>
      </div>
    </>
  )
}

export default withRouter(ArtFood)
