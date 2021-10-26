import React from 'react'
import { Link , useHistory } from 'react-router-dom'
import '../../App.scss'
import { BsClock } from 'react-icons/bs'
import { BsStarFill } from 'react-icons/bs'
import { MdOutlineAttachMoney } from 'react-icons/md'
import { FiHeart } from 'react-icons/fi'
import { imgUrl } from '../../config'

// import { Col, Row } from 'reactstrap'
function ResList({listData}) {


  return (
    <>
    
      {/* <Row className="justify-content-center"> */}
        <div class="row  justify-content-center"> 
      {listData.map((el,i)=>{
         return  <div class="col-md-5  col-12  key={i}">
      
          {/* <Col md={5} sm={12}> */}
            <div class="reslist-card d-flex  ">

            {/* <img className="res-foodImg" src={`${imgUrl}/images/food.jpg`} alt="" /> */}
            {/* <img className="res-foodImg" src={` http://localhost:3000/images/Restaurant/food.jpg`} alt="" /> */}
            
   <img className="res-foodImg" src={'http://localhost:3002/img/restaurant/'+el.res_img} alt="" />
            <div className="reslist-txt ">
              <div className="reslist-title d-flex justify-content-between ">

                <Link to={"/resprdoucts/"+el.res_id}
                 >
                <h3>{el.res_name}</h3>
                </Link>
                <span>
                  <FiHeart
                    style={{
                      color: '#FB6107',
                      fontSize: '22px',
                      marginTop: '3px',
                    }}
                  />
                </span>
              </div>
              <p>
               {el.res_rate}
                <BsStarFill
                  style={{
                    fontSize: '24px',
                    color: '#FB6107',
                    marginRight: '6px',
                    paddingBottom: '4px',
                  }}
                />
              </p>
              <p>
                <MdOutlineAttachMoney
                  style={{
                    fontSize: '28px',
                    color: '#FFB606',
                    marginRight: '6px',
                    paddingRight: '3px',
                  }}
                />
                平均消費:{el.res_aveprice}
              </p>
              <p>
                <BsClock
                  style={{
                    color: '#8FC065',
                    marginRight: '14px',
                    marginLeft: '2px',
                    fontSize: '20px',
                  }}
                />
               {el.res_starttime}-{el.res_endtime}
              </p>
            </div>
          </div>

          
         </div> })}
        {/* </Col> */}
      
        
    
  
        </div>
        
      {/* </Row> */}

    
   
    </>
  )
}

export default ResList
