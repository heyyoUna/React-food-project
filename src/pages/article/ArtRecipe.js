import { withRouter } from 'react-router-dom'
import '../../styles/article/Article.scss'
import ArCardTxtRecipe from '../../components/article/ArCardTxtRecipe'

import BreadCrumb from '../../components/BreadCrumb'

function ArtRecipe(props) {
  return (
    <>
      <div className="container col-cat-article">
        <BreadCrumb />
        <div className="row">
          <div className="col-lg col-8 cardsWrap d-flex flex-wrap">
            <ArCardTxtRecipe />
          </div>
        </div>
      </div>
    </>
  )
}

export default withRouter(ArtRecipe)
