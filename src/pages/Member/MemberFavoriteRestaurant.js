import { withRouter } from 'react-router-dom'
import { BsClock } from 'react-icons/bs'
import { IoIosHeart } from 'react-icons/io'
import { MdOutlineAttachMoney } from 'react-icons/md'
import MemberNavbar from './../../components/member/MemberNavbar'

function MemberFavoriteRestaurant(props) {
  console.log(props)
  return (
    <>
      <div className="member-favorite-container">
        <div className="row member-favorite-title">
          <h1 id="member-favorite-h1">餐廳收藏清單</h1>
        </div>
        <div className="row member-favorite">
          <MemberNavbar />
        <div className="member-n col-1"></div>
        <div className="member-favorite-card col-9">
          <div className="card mb-3">
            <div className="row member-favorite-product">
              <div className="col-md-4">
                  <img className="img-fluid rounded-start"
                    src={`http://localhost:3000/images/member/res.jpeg`}
                  alt="" />
              </div>
              <div className="col-md-7">
                <div className="card-body">
                  <div className="member-card-title">
                    <h5 className="card-title">
                      生活倉廚 
                    </h5>
                  </div>
                  <div className="member-favorite-text">
                      <p className="card-text"> <MdOutlineAttachMoney
                        style={{
                          fontSize: '28px',
                          color: '#FFB606',
                          marginRight: '6px',
                          paddingRight: '3px',
                        }}
                      />
                      平均消費：150</p>
                      <p className="member-clock"> <BsClock
                        class="member-clock-icon"
                        style={{
                          fontSize: '28px',
                          color: '#8FC065',
                        }}
                      />
                      11:00-20:00</p>
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
              </div>
            </div>
          </div>
          <div className="card mb-3">
              <div className="row member-favorite-product">
                <div className="col-md-4">
                  <img className="img-fluid rounded-start"
                    src={`http://localhost:3000/images/member/res.jpeg`}
                    alt="" />
                </div>
                <div className="col-md-7">
                  <div className="card-body">
                    <div className="member-card-title">
                      <h5 className="card-title">
                        生活倉廚 
                    </h5>
                    </div>
                    <div className="member-favorite-text">
                      <p className="card-text"> <MdOutlineAttachMoney
                        style={{
                          fontSize: '28px',
                          color: '#FFB606',
                          marginRight: '6px',
                          paddingRight: '3px',
                        }}
                      />
                      平均消費：150</p>
                      <p className="member-clock"> <BsClock
                        class="member-clock-icon"
                        style={{
                          fontSize: '28px',
                          color: '#8FC065',
                        }}
                      />
                      11:00-20:00</p>
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
                </div>
              </div>
            </div>
          <div className="card mb-3">
              <div className="row member-favorite-product">
                <div className="col-md-4">
                  <img className="img-fluid rounded-start"
                    src={`http://localhost:3000/images/member/res.jpeg`}
                    alt="" />
                </div>
                <div className="col-md-7">
                  <div className="card-body">
                    <div className="member-card-title">
                      <h5 className="card-title">
                        生活倉儲 
                    </h5>
                    </div>
                    <div className="member-favorite-text">
                      <p className="card-text"> <MdOutlineAttachMoney
                        style={{
                          fontSize: '28px',
                          color: '#FFB606',
                          marginRight: '6px',
                          paddingRight: '3px',
                        }}
                      />
                      平均消費：150</p>
                      <p className="member-clock"> <BsClock
                        class="member-clock-icon"
                        style={{
                          fontSize: '28px',
                          color: '#8FC065',
                        }}
                      />
                      11:00-20:00</p>
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
                
                </div>
              </div>
            </div>           
        </div>
        <div className="member-favorite-card-mobile">
            <div className="card mb-3 ">
              <div className="row member-favorite-product">
                <div className="col-md-4">
                  <img className="img-fluid rounded-start"
                    src={`http://localhost:3000/images/member/res.jpeg`}
                    alt="" />
                </div>
                <div className="col-md-7">
                  <div className="card-body">
                    <div className="member-card-title">
                      <div className="member-card-text">
                        <h5 className="card-title">
                        生活倉儲 
                        </h5>
                        <div className="member-icon ">
                          <div className="member-like">
                              <IoIosHeart
                                style={{
                                  fontSize: '30px',
                                  color: '#d96e30',
                                  cursor: 'pointer',
                                }}
                              />
                          </div>
                        </div>
                      </div>
                      
                    <div className="member-favorite-text">
                      <p className="card-text"> <MdOutlineAttachMoney
                        style={{
                          fontSize: '28px',
                          color: '#FFB606',
                          marginRight: '6px',
                          paddingRight: '3px',
                        }}
                      />
                      平均消費：150</p>
                      <p className="member-clock"> <BsClock
                        class="member-clock-icon"
                        style={{
                          fontSize: '28px',
                          color: '#8FC065',
                        }}
                      />
                      11:00-20:00</p>
                    </div>
                  </div>
                </div>
                
                  
                </div>
              </div>
            </div>
            <div className="card mb-3">
              <div className="row member-favorite-product">
                <div className="col-md-4">
                  <img className="img-fluid rounded-start"
                    src={`http://localhost:3000/images/member/res.jpeg`}
                    alt="" />
                </div>
                <div className="col-md-7">
                  <div className="card-body">
                    <div className="member-card-title">
                      <h5 className="card-title">
                        生活倉廚房 
                      </h5>
                    </div>
                    <div className="member-favorite-text">
                      <p className="card-text"> <MdOutlineAttachMoney
                        style={{
                          fontSize: '28px',
                          color: '#FFB606',
                          marginRight: '6px',
                          paddingRight: '3px',
                        }}
                      />
                      平均消費：150</p>
                      <p className="member-clock"> <BsClock
                        class="member-clock-icon"
                        style={{
                          fontSize: '28px',
                          color: '#8FC065',
                        }}
                      />
                      11:00-20:00</p>
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
                  
                </div>
              </div>
            </div>
            <div className="card mb-3">
              <div className="row member-favorite-product">
                <div className="col-md-4">
                  <img className="img-fluid rounded-start"
                    src={`http://localhost:3000/images/member/res.jpeg`}
                    alt="" />
                </div>
                <div className="col-md-7">
                  <div className="card-body">
                    <div className="member-card-title">
                      <h5 className="card-title">
                        生活倉廚 
                      </h5>
                    </div>
                    <div className="member-favorite-text">
                      <p className="card-text"> <MdOutlineAttachMoney
                        style={{
                          fontSize: '28px',
                          color: '#FFB606',
                          marginRight: '6px',
                          paddingRight: '3px',
                        }}
                      />
                      平均消費：150</p>
                      <p className="member-clock"> <BsClock
                        class="member-clock-icon"
                        style={{
                          fontSize: '28px',
                          color: '#8FC065',
                        }}
                      />
                      11:00-20:00</p>
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
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default withRouter(MemberFavoriteRestaurant)