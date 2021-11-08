import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import spinWheel from './spinWheel.png'
import fork from './fork.png'
import { Modal } from 'react-bootstrap';
import { API_img } from '../../config/index'
import ArCardTxtRecipe from '../../components/article/ArCardTxtRecipe'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

function GameRecipe(props) {
  const [show, setShow] = useState(false)
  const [rotate, setRotate] = useState(false)
  const [recipe, setRecipe] = useState({})

  const handleRandom = () => {
    fetch(`http://localhost:3002/game/random-artrecipe-get`, {
      method: 'GET',
    }).then(obj => obj.json())
      .then(obj => {
        if (obj.success) {
          setRecipe(obj.data)
          setRotate(true)
          setTimeout(() => {
            handleShow()
            setRotate(false)
          }, 1500);
        } else {
          Swal.fire(obj.error)
        }
      })
  }

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <div className="karin-game-container-main">
        <div className="karin-game-title">
          <h1>良辰即食 精選食譜</h1>
        </div>
        <div className="karin-rotate">
          <img className={'karin-rotate-img ' + (rotate ? 'img-rotate' : '')} src={spinWheel} alt={"spinWheel"} onClick={handleRandom} />
          <div className="karin-rotate-fork">
            <img className="karin-rotate-fork" src={fork} alt={"fork"} />
          </div>
        </div>
        <div className="karin-game-btn-wrap d-flex">
          <button className="karin-game-leave-btn">
            <Link to="/" className="karin-game-leave">離開轉盤</Link>
          </button>
          <div className="karin-game-again" onClick={handleRandom}>再轉一次</div>
        </div>
        <Modal show={show} centered={true} contentClassName={'game-card-wrap'} onHide={handleClose}>
          <ArCardTxtRecipe
            sid={recipe.sid}
            ar_pic={recipe.ar_pic}
            ar_title={recipe.ar_title}
            isNotLiked={recipe.isLiked}
          />
        </Modal>
      </div>
    </>
  )
}

export default withRouter(GameRecipe)
