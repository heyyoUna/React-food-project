import React, { useRef, useState, useEffect } from 'react'
import L from 'leaflet'
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet'
// import centericon from 'leaflet/dist/images/centericon.png'
// import mapicon from 'leaflet/dist/images/mapicon.png'
import centericon from '../../imgs/centericon.png'
import mapicon from '../../imgs/mapicon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
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
// import { css } from '@emotion/react'
// import PacmanLoader from 'react-spinners/PacmanLoader'

function ResMap() {
  delete L.Icon.Default.prototype._getIconUrl
  L.Icon.Default.mergeOptions({
    iconUrl: mapicon,
    iconRetinaUrl: mapicon,
    shadowUrl: markerShadow,
    iconSize: [45, 45],
  })

  const myIcon = new L.Icon({
    iconUrl: centericon,
    iconSize: [43, 43],
    iconRetinaUrl: centericon,
  })

  const [location, setLocation] = useState()
  const [filterData, setFilterData] = useState([])
  const [listData, setListData] = useState([])

  const [filter, setFilter] = useState({
    price: '',
    rate: '',
    distance: '',
    sort: '',
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
    setListData(history.location.state.mapData)
  }, [])

  //篩選
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
        processFilterData = processFilterData.filter(
          (d) => {
            console.log(d)
            console.log(d.distance)
            return d.distance <= filter.distance
          }
        )
      }

      setFilterData(processFilterData)
      setListData(processFilterData)
    } else {
      setFilterData(history.location.state.mapData)
      setListData(history.location.state.mapData)
    }
  }, [filter])

  const markerChange = (e) => {
    let clickToFirstData = [...filterData]
    //e.target.options 套件取值用法
    const moveTarget = e.target.options.markerIndex
    //先暫存
    const tmpTargetData = clickToFirstData[moveTarget]
    //刪掉
    clickToFirstData.splice(moveTarget, 1)

    clickToFirstData.splice(0, 0, tmpTargetData)

    setListData(clickToFirstData)
  }

  return (
    <div>
      <div className="map-searchbar">
        <div className="container   justify-content-center py-4 p-0">
          {/* <ResMapsearch /> */}
          <MapButtonGroup
            name="列表模式"
            linkFunction={goList}
          >
            <div className="col-md-3  col-6  filternone">
              <MapSortButton
                name="price"
                options={[
                  { name: '價格範圍', value: '' },
                  { name: '100~200', value: '100~200' },
                  { name: '200~300', value: '200~300' },
                  { name: '300~400', value: '300~400' },
                ]}
                onChange={onFilterChange}
              />
            </div>
            <div className="col-md-3  col-6 filternone">
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
            <div className="col-md-3  col-6 filternone ">
              <MapSortButton
                name="distance"
                options={[
                  { name: '距離範圍', value: '' },

                  { name: '3公里', value: '3' },
                  { name: '1公里', value: '1' },
                  { name: '500公尺', value: '0.5' },
                ]}
                onChange={onFilterChange}
              />
            </div>{' '}
            <div className="col-6">
              <button type="button" class="map-filter ">
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
          </MapButtonGroup>
        </div>
      </div>

      <div className=" map-wrapper ">
        <div className=" col-md-4  col-12 map-list ">
          {listData.map((item, index) => {
            return (
              <>
                <div className="map-res-introduce d-flex key={index}">
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
                    <p className="font-weight-bolder">
                      距離{item.distance.toFixed(1)}公里
                    </p>
                    <h5>
                      <FiPhone
                        style={{
                          color: '#2a593e',
                          fontSize: '26x',
                          marginRight: '16px',
                          marginBottom: '4px',
                        }}
                      />
                      {item.res_tel}
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
                      {item.res_starttime}-
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
                      {item.res_address}
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
            <Marker
              position={[
                history.location.state.lat,
                history.location.state.lng,
              ]}
              icon={myIcon}
            ></Marker>
            {filterData.map((item, index) => {
              return (
                <>
                  <Marker
                    key={index}
                    markerIndex={index}
                    position={[item.res_lat, item.res_lng]}
                    // eventHandlers={{
                    //   click: (e) => {
                    //     console.log(
                    //       'marker clicked',
                    //       e.latlng.lat,
                    //       e.latlng.lng
                    //     )
                    //   },
                    // }}
                    eventHandlers={{
                      click: (e) => {
                        markerChange(e)
                      },
                    }}
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
                          <div className="map-txt  ">
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
                            <h6>
                              {' '}
                              平均消費:NT{item.res_aveprice}
                            </h6>
                          </div>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                </>
              )
            })}
          </MapContainer>
        </div>
      </div>
    </div>
  )
}

export default ResMap
