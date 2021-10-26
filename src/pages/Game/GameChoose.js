import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'

function GameChoose(props) {
  console.log(props)
  return (
    <>
      <div className="game-delivery-container">
        <Link to="/game/GameRecipe"  className="game-cook ">
          <Link to="/game/GameRecipe" className="game-cook-text">
          今天自己煮
          </Link>
        </Link>
        <Link to="/game/GameDelivery"  className="game-delivery ">
          <Link to="/game/GameDelivery" className="game-delivery-text">
          不煮了吃外送
          </Link>
        </Link>
      </div>
    </>
  )
}

export default withRouter(GameChoose)
