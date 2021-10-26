import React, { useState } from 'react'
// import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { BsStarFill } from 'react-icons/bs'
import { BsClock } from 'react-icons/bs'
import { RiMapPinLine } from 'react-icons/ri'
import { MdOutlineAttachMoney } from 'react-icons/md'
import { FiPhone } from 'react-icons/fi'
import { useHistory } from 'react-router'
import SortBtn from '../../components/Restaurant/SortBtn'
import { Link } from 'react-router-dom'
import ResMapsearch from '../../components/Restaurant/ResMapsearch'


function ResMap() {
  delete L.Icon.Default.prototype._getIconUrl
  L.Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
  })

  const [location, setLocation] = useState();


  const history = useHistory();

  console.log(history.location.state.mapData);
  console.log(history.location.state);
 
  return (

    <div>

      <div className="map-searchbar">

     
    
  <div className="container   justify-content-center py-4 ">
        <div className="row  "> 
       <div className="col-4 ">  
        <ResMapsearch/>
        </div>
        <div className="col-md-2 col-6 ">
               <button type="button" class="btn orange-btn" >
            <RiMapPinLine
              style={{
                color: '#FB6107',
                fontSize: '24px',
                marginBottom: '4px',
              }}
            />{' '}
           <Link to={"/restaurants/"}  >列表模式</Link>
          </button>
          </div>
        {
            history.location && history.location.state && history.location.state.options &&
            history.location.state.options.map((el, index) => {
              return (
                <>
                 <div className="col-md-2  col-6 ">
        
            <select
              style={{
                // backgroundImage: `url(${`${imgUrl}/images/arrow-icon.png`}) `,
                backgroundImage: `url('http://localhost:3000/images/Restaurant/arrow-icon.png')`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: '90% center',
              }}

            >
              {/* <option value=""{el.name}>{el.name}</option> */}
              <option value="{el.value1}">{el.name1}</option>
              <option value="{el.value2}">{el.name2}</option>
              <option value="{el.value3}">{el.name3}</option>
              <option value="{el.value4}">{el.name4}</option>
              <option value="{el.value4}">{el.name5}</option>
            </select>
          </div>
         
                </>
              )
            })
          }

 </div>
        </div>
      </div>

      <div className=" map-wrapper ">
     
        <div className=" col-md-4  col-12 map-list ">
          {
            history.location && history.location.state && history.location.state.mapData &&
            history.location.state.mapData.map((item, index) => {
              return (
                <>

                  <div className="map-res-introduce d-flex">
                    <div class="col-md-4 col-4  p-0 ">
                      <img className="mapImg" src={` http://localhost:3000/images/Restaurant/food.jpg`} alt="" />

                    </div>
                    <div className="col-md-8 map-res-info">
                      <div className="map-res-title d-flex justify-content-between">
                        <h4>{item.res_name} </h4>
                        <span>{item.res_rate} <BsStarFill
                          style={{
                            fontSize: '22px',
                            color: '#FB6107',
                            marginRight: '7px',
                            paddingBottom: '4px',
                          }}
                        /></span>
                      </div>
                      <h5> <MdOutlineAttachMoney
                        style={{
                          fontSize: '25px',
                          color: '#FFB606',
                          marginRight: '6px',
                          paddingRight: '3px',
                        }}
                      />均消:{item.res_aveprice}
                      </h5>
                      <h5>
                        <FiPhone
                          style={{
                            color: '#2a593e',
                            fontSize: '26x',
                            marginRight: '16px',
                            marginBottom: '4px',
                          }}

                        />電話:{item.res_tel}
                      </h5>           <h5><BsClock
                        style={{
                          color: '#8FC065',
                          marginRight: '14px',
                          marginLeft: '2px',
                          marginBottom: '2px',
                          fontSize: '16px',
                        }}
                      />營業時間:{item.res_starttime}-{item.res_endtime}
                      </h5>
                      <h5>   <RiMapPinLine
                        style={{
                          color: '#FB6107',
                          fontSize: '20px',
                          marginRight: '10px',
                          marginBottom: '4px',

                        }}
                      />地址:{item.res_address}
                      </h5>
                    </div>
                  </div>

                </>
              )
            })
          }

        </div>
        <div className="map-container p-0 col-md-8 col-12">

          <MapContainer
            // 中心點: 會是你輸入的經緯
            center={[history.location.state.lat, history.location.state.lng]}
            zoom={14}
            scrollWheelZoom={false}
            showPopup={true}
            style={{ padding: 0, marginLeft: 'auto' }}
          >


            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {
              history.location && history.location.state && history.location.state.mapData &&
              history.location.state.mapData.map((item, index) => {
                return (
                  <>

                    <Marker key={index} position={[item.res_lng, item.res_lat]}>
                      <Popup>

                        <div className="map-card  d-flex align-items-center justify-content-between">
                          <div class="col-md-5 p-0">
                            <img className="mapImg" src={` http://localhost:3000/images/Restaurant/food.jpg`} alt="" />

                          </div>
                          <div class="col-md-7 ">
                            <div className="map-txt">
                              <h5>{item.res_name} </h5>
                              <span>{item.res_rate}</span>  <BsStarFill
                                style={{
                                  fontSize: '22px',
                                  color: '#FB6107',
                                  marginRight: '6px',
                                  paddingBottom: '4px',
                                }}
                              />
                              <p>{item.res_address}</p>
                            </div>
                            {/* <p>{item.res_starttime}-{item.res_endtime	}</p> */}

                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  </>
                )
              })
            }

            {/* <Marker position={[25.0723232, 121.4627458]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <Marker position={[25.0723999, 121.4627451]}>
          <Popup>
            A pretty 2222222. <br /> Easily customizable.
          </Popup>
        </Marker> */}
          </MapContainer>
        </div>
      </div>
      </div>

  )
}

export default ResMap