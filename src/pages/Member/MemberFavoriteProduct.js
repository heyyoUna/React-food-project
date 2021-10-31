import { withRouter } from 'react-router-dom'
import { CgShoppingCart } from 'react-icons/cg'
import { IoIosHeart } from 'react-icons/io'
import MemberNavbar from './../../components/member/MemberNavbar'

function MemberFavoriteProduct(props) {
  console.log(props)
  return (
    <>
      <div className="member-favorite-container">
        <div className="row member-favorite-title">
          <h1 id="member-favorite-h1">商品追蹤清單</h1>
        </div>
        <div className="row member-favorite">
          <MemberNavbar/>
        <div className="member-n col-1"></div>
        <div className="member-favorite-card col-9">
          <div className="card mb-3">
            <div className="row member-favorite-product">
              <div className="col-md-4">
                  <img className="img-fluid rounded-start"
                    src={`http://localhost:3000/images/member/noodles.png`}
                  alt="" />
              </div>
              <div className="col-md-7">
                <div className="card-body">
                  <div className="member-card-title">
                    <h5 className="card-title">
                      川椒麻辣蒟蒻拌麵(袋/3份入)
                    </h5>
                  </div>
                  <div className="member-favorite-text">
                    <p className="card-text">NT 280</p>
                  </div>
                </div>
              </div>
              <div className="member-icon col-md-1">
                <div className="member-like">
                  <IoIosHeart
                    style={{
                      fontSize: '30px',
                      color: '#d96e30',
                      cursor: 'pointer',
                    }}
                  />
                </div>
                <div className="member-cart">
                  <button
                    type="button"
                    className="btn member-cart-btn-primary">
                    加入購物車
                  </button>
                  <CgShoppingCart
                    class="member-cart-icon"
                    style={{
                      fontSize: '30px',
                      color: '#2a593e',
                      cursor: 'pointer',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="card mb-3">
              <div className="row member-favorite-product">
                <div className="col-md-4">
                  <img className="img-fluid rounded-start"
                    src={`http://localhost:3000/images/member/noodles.png`}
                    alt="" />
                </div>
                <div className="col-md-7">
                  <div className="card-body">
                    <div className="member-card-title">
                      <h5 className="card-title">
                        川椒麻辣蒟蒻拌麵(袋/3份入)
                    </h5>
                    </div>
                    <div className="member-favorite-text">
                      <p className="card-text">NT 280</p>
                    </div>
                  </div>
                </div>
                <div className="member-icon col-md-1">
                  <div className="member-like">
                    <IoIosHeart
                      style={{
                        fontSize: '30px',
                        color: '#d96e30',
                        cursor: 'pointer',
                      }}
                    />
                  </div>
                  <div className="member-cart">
                    <button
                      type="button"
                      className="btn member-cart-btn-primary">
                      加入購物車
                  </button>
                    <CgShoppingCart
                      class="member-cart-icon"
                      style={{
                        fontSize: '30px',
                        color: '#2a593e',
                        cursor: 'pointer',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          <div className="card mb-3">
              <div className="row member-favorite-product">
                <div className="col-md-4">
                  <img className="img-fluid rounded-start"
                    src={`http://localhost:3000/images/member/noodles.png`}
                    alt="" />
                </div>
                <div className="col-md-7">
                  <div className="card-body">
                    <div className="member-card-title">
                      <h5 className="card-title">
                        川椒麻辣蒟蒻拌麵(袋/3份入)
                    </h5>
                    </div>
                    <div className="member-favorite-text">
                      <p className="card-text">NT 280</p>
                    </div>
                  </div>
                </div>
                <div className="member-icon col-md-1">
                  <div className="member-like">
                    <IoIosHeart
                      style={{
                        fontSize: '30px',
                        color: '#d96e30',
                        cursor: 'pointer',
                      }}
                    />
                  </div>
                  <div className="member-cart">
                    <button
                      type="button"
                      className="btn member-cart-btn-primary">
                      加入購物車
                  </button>
                    <CgShoppingCart
                      class="member-cart-icon"
                      style={{
                        fontSize: '30px',
                        color: '#2a593e',
                        cursor: 'pointer',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>           
        </div>
        <div className="member-favorite-card-mobile">
            <div className="card mb-3 ">
              <div className="row member-favorite-product">
                <div className="col-md-4">
                  <img className="img-fluid rounded-start"
                    src={`http://localhost:3000/images/member/noodles.png`}
                    alt="" />
                </div>
                <div className="col-md-7">
                  <div className="card-body">
                    <div className="member-card-title">
                      <h5 className="card-title">
                        川椒麻辣蒟蒻拌麵(袋/3份入)
                      </h5>
                    </div>
                    <div className="member-favorite-text">
                      <p className="card-text">NT 280</p>
                    </div>
                  </div>
                </div>
                <div className="member-icon col-md-1">
                  <div className="member-like">
                    <IoIosHeart
                      style={{
                        fontSize: '30px',
                        color: '#d96e30',
                        cursor: 'pointer',
                      }}
                    />
                  </div>
                  <div className="member-cart">
                    <CgShoppingCart
                      style={{
                        fontSize: '30px',
                        color: '#2a593e',
                        cursor: 'pointer',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="card mb-3">
              <div className="row member-favorite-product">
                <div className="col-md-4">
                  <img className="img-fluid rounded-start"
                    src={`http://localhost:3000/images/member/noodles.png`}
                    alt="" />
                </div>
                <div className="col-md-7">
                  <div className="card-body">
                    <div className="member-card-title">
                      <h5 className="card-title">
                        川椒麻辣蒟蒻拌麵(袋/3份入)
                      </h5>
                    </div>
                    <div className="member-favorite-text">
                      <p className="card-text">NT 280</p>
                    </div>
                  </div>
                </div>
                <div className="member-icon col-md-1">
                  <div className="member-like">
                    <IoIosHeart
                      style={{
                        fontSize: '30px',
                        color: '#d96e30',
                        cursor: 'pointer',
                      }}
                    />
                  </div>
                  <div className="member-cart">
                    <CgShoppingCart
                      style={{
                        fontSize: '30px',
                        color: '#2a593e',
                        cursor: 'pointer',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="card mb-3">
              <div className="row member-favorite-product">
                <div className="col-md-4">
                  <img className="img-fluid rounded-start"
                    src={`http://localhost:3000/images/member/noodles.png`}
                    alt="" />
                </div>
                <div className="col-md-7">
                  <div className="card-body">
                    <div className="member-card-title">
                      <h5 className="card-title">
                        川椒麻辣蒟蒻拌麵(袋/3份入)
                      </h5>
                    </div>
                    <div className="member-favorite-text">
                      <p className="card-text">NT 280</p>
                    </div>
                  </div>
                </div>
                <div className="member-icon col-md-1">
                  <div className="member-like">
                    <IoIosHeart
                      style={{
                        fontSize: '30px',
                        color: '#d96e30',
                        cursor: 'pointer',
                      }}
                    />
                  </div>
                  <div className="member-cart">
                    <CgShoppingCart
                      style={{
                        fontSize: '30px',
                        color: '#2a593e',
                        cursor: 'pointer',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </>
  )
}

export default withRouter(MemberFavoriteProduct)
