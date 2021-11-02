import React, { useEffect, useState } from 'react'
// import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import L from 'leaflet'
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet'
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
import MapButtonGroup from '../../components/Restaurant/MapButtonGroup'
import { Link } from 'react-router-dom'
import ResMapsearch from '../../components/Restaurant/ResMapsearch'
import MapSortButton from '../../components/Restaurant/MapSortButton'
import { BsFilterLeft } from 'react-icons/bs'

function ResMap() {
  delete L.Icon.Default.prototype._getIconUrl
  L.Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
  })

  const [location, setLocation] = useState()
  const [filterData, setFilterData] = useState([])
  const [filter, setFilter] = useState({
    price: '',
    rate: '',
    distance: '',
  })

  const history = useHistory()

  console.log(history.location.state.mapData)
  console.log(history.location.state)

  const onFilterChange = (e) => {
    setFilter({
      ...filter,
      // 物件中給變數要用[]包起來
      [e.target.name]: e.target.value, //下拉選單的值
    })
  }

  const goList = () => {
    history.push({
      pathname: '/restaurants',
    })
  }

  //存push來的原始資料
  useEffect(() => {
    setFilterData(history.location.state.mapData)
  }, [])

  useEffect(() => {
    if (filter.price || filter.rate || filter.distance) {
      // 避免指到同一個記憶體位置，引響原始資料，故淺拷貝一份apiData
      let processFilterData = [
        ...history.location.state.mapData,
      ]
      // 當選取價錢區間
      if (filter.price) {
        // 切割~，取得價錢範圍
        const rangeArr = filter.price.split('~')
        // 用原始資料做filter
        processFilterData = processFilterData.filter(
          (item) => {
            return (
              item.res_aveprice >= rangeArr[0] &&
              item.res_aveprice <= rangeArr[1]
            )
          }
        )
      }
      // TODO: 評分排序
      if (filter.rate) {
        // rate ===0  就用 原始資料由小到大排序
        // rate ===1  就用 原始資料由大到小排序
        processFilterData = processFilterData.sort(
          (a, b) => {
            return filter.rate === '1'
              ? a.res_rate - b.res_rate
              : b.res_rate - a.res_rate
          }
        )
        console.log(processFilterData)
      }

      if (filter.distance) {
        console.log(132)
        processFilterData = processFilterData.filter(
          (d) => {
            console.log(d)
            console.log(d.distance)
            return d.distance <= filter.distance
          }
        )
      }

      // if (filter.distance < 0.5) {
      //   processFilterData = processFilterData.filter(
      //     (d) => {
      //       return d.distance < 0.5
      //     }
      //   )
      //   console.log(processFilterData)
      // } else if (filter.distance < 1) {
      //   processFilterData = processFilterData.filter(
      //     (d) => {
      //       return d.distance < 1
      //     }
      //   )
      // } else {
      //   processFilterData = processFilterData.filter(
      //     (d) => {
      //       return d.distance < 3
      //     }
      //   )
      // }
      setFilterData(processFilterData)
    } else {
      setFilterData(history.location.state.mapData)
    }
  }, [filter])
  return (
    <div>
      <div className="map-searchbar">
        <div className="container   justify-content-center py-4 ">
          <div className="row">
            {/* <ResMapsearch /> */}

            <MapButtonGroup
              name="列表模式"
              linkFunction={goList}
            >
              <div className="col-md-3  col-6 ">
                <MapSortButton
                  name="price"
                  options={[
                    { name: '平均價格', value: '' },
                    { name: '100~200', value: '100~200' },
                    { name: '200~300', value: '200~300' },
                    { name: '300~400', value: '300~400' },
                  ]}
                  onChange={onFilterChange}
                />
              </div>

              <div className="col-md-3  col-6 ">
                <MapSortButton
                  name="rate"
                  options={[
                    { name: '評分排序', value: '' },
                    { name: '由高到低', value: '0' },
                    { name: '由低到高', value: '1' },
                  ]}
                  onChange={onFilterChange}
                />
              </div>
              <div className="col-md-3  col-6 ">
                <MapSortButton
                  name="distance"
                  options={[
                    { name: '最佳距離', value: '' },

                    { name: '3公里', value: '3' },
                    { name: '1公里', value: '1' },
                    { name: '500公尺', value: '0.5' },
                  ]}
                  onChange={onFilterChange}
                />
              </div>
            </MapButtonGroup>

            {/* {
              history.location && history.location.state && history.location.state.options &&
              history.location.state.options.map((el, index) => {
                return (
                  <>

                  </>
                )
              })
            } */}
          </div>
        </div>
      </div>
      <div className="row justify-content-start">
        <div className="col-6">
          <button
            type="button"
            class="map-filter d-md-none d-block"
          >
            <BsFilterLeft
              style={{
                color: '#FB6107',
                fontSize: '24px',
                marginBottom: '4px',
              }}
            />{' '}
            篩選條件
          </button>
        </div>
      </div>
      <div className=" map-wrapper ">
        <div className=" col-md-4  col-12 map-list ">
          {filterData.map((item, index) => {
            return (
              <>
                <div className="map-res-introduce d-flex">
                  <div class="col-md-4 col-4  p-0 ">
                    <img
                      className="mapImg"
                      src={
                        'http://localhost:3002/img/restaurant/' +
                        item.res_img
                      }
                      alt=""
                    />
                  </div>
                  <div className="col-md-7 map-res-info">
                    <div className="map-res-title d-flex justify-content-between">
                      <Link
                        to={'/resprdoucts/' + item.res_id}
                      >
                        <h4>{item.res_name} </h4>
                      </Link>

                      <span>
                        {item.res_rate}{' '}
                        <BsStarFill
                          style={{
                            fontSize: '22px',
                            color: '#FB6107',
                            marginRight: '7px',
                            paddingBottom: '4px',
                          }}
                        />
                      </span>
                    </div>
                    <h5>
                      {' '}
                      <MdOutlineAttachMoney
                        style={{
                          fontSize: '25px',
                          color: '#FFB606',
                          marginRight: '6px',
                          paddingRight: '3px',
                        }}
                      />
                      均消:{item.res_aveprice}
                    </h5>
                    <h5>
                      <FiPhone
                        style={{
                          color: '#2a593e',
                          fontSize: '26x',
                          marginRight: '16px',
                          marginBottom: '4px',
                        }}
                      />
                      電話:{item.res_tel}
                    </h5>{' '}
                    <h5>
                      <BsClock
                        style={{
                          color: '#8FC065',
                          marginRight: '14px',
                          marginLeft: '2px',
                          marginBottom: '2px',
                          fontSize: '16px',
                        }}
                      />
                      營業時間:{item.res_starttime}-
                      {item.res_endtime}
                    </h5>
                    <h5>
                      {' '}
                      <RiMapPinLine
                        style={{
                          color: '#FB6107',
                          fontSize: '20px',
                          marginRight: '10px',
                          marginBottom: '4px',
                        }}
                      />
                      地址:{item.res_address}
                    </h5>
                  </div>
                </div>
              </>
            )
          })}
        </div>
        <div className="map-container p-0 col-md-8 col-12">
          <MapContainer
            // 中心點: 會是你輸入的經緯
            center={[
              history.location.state.lat,
              history.location.state.lng,
            ]}
            zoom={14}
            scrollWheelZoom={false}
            showPopup={true}
            style={{ padding: 0, marginLeft: 'auto' }}
          >
            {console.log(history.location.state.lat)}

            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* history.location && history.location.state && history.location.state.mapData &&
              history.location.state.mapData */}

            {filterData.map((item, index) => {
              return (
                <>
                  <Marker
                    key={index}
                    position={[item.res_lat, item.res_lng]}
                  >
                    <Popup>
                      <div className="map-card  d-flex align-items-center justify-content-between">
                        <div class="col-md-5 p-0">
                          <img
                            className="mapImg"
                            src={
                              'http://localhost:3002/img/restaurant/' +
                              item.res_img
                            }
                            alt=""
                          />
                        </div>
                        <div class="col-md-7 ">
                          <div className="map-txt">
                            <Link
                              to={
                                '/resprdoucts/' +
                                item.res_id
                              }
                            >
                              <h5>{item.res_name} </h5>
                            </Link>
                            <span>{item.res_rate}</span>{' '}
                            <BsStarFill
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
            })}

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
