import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import spinWheel from './spinWheel.png'
import fork from './fork.png'
import { Modal } from 'react-bootstrap';
import ProductCard from '../../components/Product/ProductCard'

function GameRecipe(props) {
  const { setProductId } = props

  const [show, setShow] = useState(false)
  const [product, setProduct] = useState({})

  const handleRandom = () => {
    fetch(`http://localhost:3002/game/random-product-get`, {
      method: 'GET',
    }).then(obj => obj.json())
      .then(obj => {
        if (obj.success) {
          setProduct(obj.data)
          handleShow()
        } else {
          alert(obj.error)
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
          <img className={'rotate-delivery-img ' + (show ? '' : 'img-rotate')} src={spinWheel} alt={"spinWheel"} />
          <div className="karin-rotate-fork" onClick={handleRandom}>
            <img className="karin-rotate-fork" src={fork} alt={"fork"} />
          </div>
        </div>
        <div className="karin-game-btn-wrap d-flex">
          <button className="karin-game-leave-btn">
            <Link to="/" className="karin-game-leave">離開轉盤</Link>
          </button>
          <div className="karin-game-again">再轉一次</div>
        </div>
        <Modal show={show} centered={true} dialogClassName={'modal-xs'} contentClassName={'pd-card game-card-wrap'} onHide={handleClose}>
          <Modal.Body>
            <ProductCard
              key={product.sid}
              sid={product.sid}
              img={product.product_img}
              name={product.name}
              cal={product.content_cal}
              price={product.price}
              setProductId={setProductId}
            />
          </Modal.Body>
        </Modal>
      </div>
    </>
  )
}

export default withRouter(GameRecipe)
