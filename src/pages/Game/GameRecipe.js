import { withRouter } from 'react-router-dom'
import spinWheel from './spinWheel.png'
import fork from './fork.png'

function GameRecipe(props) {
  console.log(props)
  return (
    <>
      <div className="karin-game-container-main">
        <div className="karin-game-title">
          <h1>良辰即食 精選食譜</h1>
        </div>
        <div className="karin-rotate">
          <img className="karin-rotate-img" src={spinWheel} alt={"spinWheel"} />
          <div className="karin-rotate-fork">
            <img className="karin-rotate-fork" src={fork} alt={"fork"} />
          </div>
        </div>
        <div className="karin-game-btn-wrap d-flex">
          <div className="karin-game-leave">離開轉盤</div>
          <div className="karin-game-again">再轉一次</div>
        </div>
      </div>
    </>
  )
}

export default withRouter(GameRecipe)
