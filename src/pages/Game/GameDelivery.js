import { withRouter } from 'react-router-dom'
import spinWheel from './spinWheel.png'
import fork from './fork.png'

function GameDelivery(props) {
  console.log(props)
  return (
    <>
      <div className="game-container-main-delivery">
        <div className="game-title-delivery">
          <h1>良辰即食 精選外送餐</h1>
        </div>
        <div className="rotate-delivery">
          <img className="rotate-delivery-img" src={spinWheel} alt={"spinWheel"} />
          <div className="rotate-delivery-fork">
            <img className="rotate-delivery-fork" src={fork} alt={"fork"} />
          </div>
        </div>
        <div className="game-btn-wrap d-flex">
          <div className="game-leave-delivery">離開轉盤</div>
          <div className="game-again-delivery">再轉一次</div>
        </div>
      </div>
    </>
  )
}

export default withRouter(GameDelivery)
