import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import spinWheel from './spinWheel.png'
import fork from './fork.png'
import { Modal } from 'react-bootstrap';
import ResListData from '../../components/Restaurant/ResListData'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

function GameDelivery(props) {
  const [show, setShow] = useState(false)
  const [rotate, setRotate] = useState(false)
  const [restaurant, setRestaurant] = useState({})

  const handleRandom = () => {
    fetch(`http://localhost:3002/game/random-restaurant-get`, {
      method: 'GET',
    }).then(obj => obj.json())
      .then(obj => {
        if (obj.success) {
          setRestaurant(obj.data)
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
      <div className="game-container-main-delivery">
        <div className="game-title-delivery">
          <h1>良辰即食 精選外送餐</h1>
        </div>
        <div className="rotate-delivery">
          <img className={'rotate-delivery-img ' + (rotate ? 'img-rotate' : '')} src={spinWheel} alt={"spinWheel"} onClick={handleRandom} />
          <div className="rotate-delivery-fork">
            <img className="rotate-delivery-fork" src={fork} alt={"fork"} />
          </div>
        </div>
        <div className="game-btn-wrap d-flex">
          <button className="game-leave-delivery-btn">
            <Link to="/" className="game-leave-delivery">離開轉盤</Link>
          </button>
          <div className="game-again-delivery" onClick={handleRandom}>再轉一次</div>
        </div>
        <Modal show={show} centered={true} contentClassName={'game-card-wrap'} onHide={handleClose}>
            <ResListData
              res_id={restaurant.res_id}
              res_img={restaurant.res_img}
              res_name={restaurant.res_name}
              res_rate={restaurant.res_rate}
              res_aveprice={restaurant.res_aveprice}
              res_starttime={restaurant.res_starttime}
              res_endtime={restaurant.res_endtime}
              isNotLiked={restaurant.isLiked}
            />
        </Modal>
      </div>
    </>
  )
}

export default withRouter(GameDelivery)