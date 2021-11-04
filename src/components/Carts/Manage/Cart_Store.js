import { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import $ from 'jquery'
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
  Tooltip,
} from 'react-leaflet'
import markerIconPng from '../../../../node_modules/leaflet/dist/images/marker-icon.png'
import { Icon } from 'leaflet'
import '../../../../node_modules/leaflet/dist/leaflet.css'

// import { MapContainer } from 'react-leaflet'

// import Iframe from 'react-iframe'
import { FaChevronDown } from 'react-icons/fa'

function Cart_Store(props) {
  let { StoreInfo, setStoreInfo, CityArr, setCityArr } =
    props
  // let [StoreInfo, setStoreInfo] = useState([])
  let [GetAddress, setGetAddress] = useState([])
  let [GetStoreInfo, setGetStoreInfo] = useState([])
  let [test, settest] = useState(0)
  let SearchInfo = 'SearchRoad'
  let [GetPosition, setGetPosition] = useState([
    25.0475613, 121.5173399,
  ])
  let [Name, setName] = useState()
  let [Phone, setPhone] = useState()
  let [Email, setEmail] = useState()
  let [Notice, setNotice] = useState()

  // console.log(CityArr)
  // console.log('店名資訊', StoreInfo)
  // console.log('路段資訊', GetAddress)

  useEffect(() => {
    // GetCurrentPosition()
    if (StoreInfo[0] && StoreInfo[1]) {
      DataAxios()
    }
  }, [StoreInfo, test])

  useEffect(() => {
    // console.log('有抓到 GetStoreInfo', GetStoreInfo)
  }, [GetStoreInfo])

  useEffect(() => {
    localStorage.removeItem('門市')
    localStorage.removeItem('店號')
  }, [])

  async function DataAxios() {
    if (StoreInfo[2]) {
      SearchInfo = 'SearchStore'
    }
    // console.log('City', StoreInfo[0])
    // console.log('District', StoreInfo[1])
    // console.log('更改的Data', SearchInfo)
    // console.log('SearchINfo狀態', SearchInfo)

    let r = await axios.post(
      'http://localhost:3002/cart/store',
      {
        commandid: SearchInfo,
        city: StoreInfo[0],
        town: StoreInfo[1],
        roadname: StoreInfo[2],
      }
    )
    if (r.status === 200) {
      // console.log('DataX', r.data)
      const jqRoadName = $(r.data)
      let NewGetStore = [...GetStoreInfo]
      jqRoadName
        .find('RoadName rd_name_1')
        .each((i, el) => {
          // console.log('路名', el.innerText)
          GetAddress[i] = { RoadName: el.innerText }
        })
      jqRoadName
        .find('RoadName section_1')
        .each((i, el) => {
          // console.log('地址', el)
          GetAddress[i].RoadName += el.innerText
        })

      const jqStoreInfo = $(r.data)
      jqStoreInfo
        .find('GeoPosition POIName')
        .each((i, el) => {
          // console.log('路名', el.innerText)
          NewGetStore[i] = {
            POIName: el.innerText + '門市',
            X: '',
            Y: '',
            Address: '',
            POIID: '',
          }
        })
      jqStoreInfo.find('GeoPosition X').each((i, el) => {
        // console.log('路名', el.innerText)
        NewGetStore[i].X = parseInt(el.innerText) * 0.000001
      })
      jqStoreInfo.find('GeoPosition Y').each((i, el) => {
        // console.log('路名', el.innerText)
        NewGetStore[i].Y = parseInt(el.innerText) * 0.000001
      })
      jqStoreInfo
        .find('GeoPosition Address')
        .each((i, el) => {
          // console.log('路名', el.innerText)
          NewGetStore[i].Address = el.innerText
        })
      jqStoreInfo
        .find('GeoPosition POIID')
        .each((i, el) => {
          // console.log('POIID', el.innerText)
          NewGetStore[i].POIID = el.innerText
        })
      SearchInfo = 'SearchRoad'
      // console.log('店鋪資訊', NewGetStore)
      // console.log('路段', GetAddress)
      setGetStoreInfo(NewGetStore)
    }
  }

  function UpdateInfo(value, index) {
    let NewStoreInfo = [...StoreInfo]
    NewStoreInfo[index] = value
    console.log('123', NewStoreInfo)
    setStoreInfo(NewStoreInfo)
  }

  function MyComponent() {
    const map = useMap()
    console.log('MyCom的店舖', GetStoreInfo)
    let NewGetPosition = [...GetPosition]
    if (GetStoreInfo.length !== 0) {
      let NewGetStoreInfo = [...GetStoreInfo]
      console.log('GEOPOS', NewGetStoreInfo)
      console.log('GEOPOSITION_X', NewGetPosition)
      NewGetPosition[0] = NewGetStoreInfo[0].Y
      NewGetPosition[1] = NewGetStoreInfo[0].X
      console.log('新的位置座標', NewGetPosition)
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // console.log('緯度是', position.coords.latitude)
          // console.log('經度是', position.coords.longitude)
          NewGetPosition[0] = position.coords.latitude
          NewGetPosition[1] = position.coords.longitude
          setGetPosition(NewGetPosition)
        }
      )
      console.log('map center:', map.getCenter())
      console.log('通過')
    }
    map.setView(NewGetPosition, 17)

    return null
  }

  return (
    <>
      <div className="container store_711 col-lg-6 col-10">
        <div className="storeinfo d-lg-flex justify-content-around ">
          <div className="store_711_image col-lg-2 col-10 text-center mx-auto">
            <img
              src="http://localhost:3000/images/Cart/711icon.png"
              alt=""
            />
          </div>
          <div className="store_711_info col-lg-5 col-10 my-auto">
            <h4>
              已選擇門市店號:{localStorage.getItem('店號')}
            </h4>
            <h4>
              已選擇門市名稱:
              {!StoreInfo[3] ? '無資料' : StoreInfo[3]}
            </h4>
          </div>
          <div className="store_711_address col-lg-5 col-10">
            <h4>門市地址:{localStorage.getItem('門市')}</h4>
          </div>
        </div>
        <div className="storeform" action="">
          <label for="">
            <span>*</span>請選擇縣市
          </label>
          <div className="dropdown">
            <select
              name="city"
              id="city"
              onChange={(e) => {
                // console.log('選到的A', e.target.value)
                UpdateInfo(e.target.value, 0)
              }}
            >
              {CityArr.map((v, i) => {
                return (
                  <option value={v.City}>{v.City}</option>
                )
              })}
            </select>
            <FaChevronDown className="ChevronDown position-absolute" />
          </div>
          <label for="">
            <span>*</span>請選擇行政區
          </label>
          <div className="dropdown">
            <select
              name="districts"
              id="districts"
              onChange={(e) => {
                // console.log('選到的B', e.target.value)
                if (StoreInfo[2]) {
                  StoreInfo.splice(2, 1, '')
                  console.log('第二層資料刪除', StoreInfo)
                }
                UpdateInfo(e.target.value, 1)
                GetAddress = []
                setGetAddress(GetAddress)
                // SearchInfo = 'SearchStore'
                // console.log('更改的資料', SearchInfo)
                // DataAxios()
              }}
            >
              {console.log('第二層', StoreInfo)}
              {CityArr.map((v, i) => {
                if (v.City === StoreInfo[0]) {
                  return v.districts.map((a) => {
                    return (
                      <option value={a.name}>
                        {a.name}
                      </option>
                    )
                  })
                }
              })}
            </select>
            <FaChevronDown className="ChevronDown position-absolute" />
          </div>
          <label for="">
            <span>*</span>請選擇街道名稱
          </label>
          <div className="dropdown">
            <select
              name="roadname"
              id="roadname"
              onClick={(e) => {
                settest(test + 1)
                // console.log('測試數量', test)
              }}
              onChange={(e) => {
                GetAddress = []
                GetStoreInfo = []
                // console.log('選到的C', e.target.value)
                UpdateInfo(e.target.value, 2)
              }}
            >
              {GetAddress.map((v, i) => {
                return (
                  <option value={v.RoadName}>
                    {v.RoadName}
                  </option>
                )
              })}
            </select>
            <FaChevronDown className="ChevronDown position-absolute" />
          </div>
          <div className="Map">
            <MapContainer
              style={{ height: '400px', width: '100%' }}
              center={[GetPosition[0], GetPosition[1]]}
              zoom={20}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {GetStoreInfo.map((v, i) => {
                return (
                  <Marker
                    position={[v.Y, v.X]}
                    icon={
                      new Icon({
                        iconUrl: markerIconPng,
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                      })
                    }
                  >
                    <Popup>
                      <div className="PopCard">
                        <h6>
                          門市店號: <span>{v.POIID}</span>
                        </h6>
                        <h6>
                          門市名稱: <span>{v.POIName}</span>
                        </h6>
                        <h6>
                          門市地址: <span>{v.Address}</span>
                        </h6>
                        <button
                          onClick={(e) => {
                            console.log(
                              '已選擇',
                              e.target.value
                            )
                            localStorage.setItem(
                              '店號',
                              v.POIID
                            )
                            localStorage.setItem(
                              '門市',
                              v.Address
                            )
                            UpdateInfo(v.POIName, 3)
                          }}
                        >
                          請選擇門市
                        </button>
                      </div>
                    </Popup>
                  </Marker>
                )
              })}
              <MyComponent />
            </MapContainer>
          </div>
          <div className="storeinput name">
            <label for="">
              <span>*</span>姓名
            </label>
            <input
              type="text"
              className="ordername px-3"
              name={Name}
              onChange={(e) => {
                setName(e.target.value)
                UpdateInfo(e.target.value, 4)
              }}
            />
          </div>
          <div className="storeinput phone">
            <label for="">
              <span>*</span>手機號碼
            </label>
            <input
              type="text"
              className="ordername px-3"
              name={Phone}
              id="Phone"
              onChange={(e) => {
                setPhone(e.target.value)
                UpdateInfo(e.target.value, 5)
              }}
            />
          </div>
          <div className="storeinput email">
            <label for="">
              <span>*</span>電子郵件
            </label>
            <input
              type="text"
              className="emailname px-3"
              name={Email}
              id="Email"
              onChange={(e) => {
                setEmail(e.target.value)
                UpdateInfo(e.target.value, 6)
              }}
            />
          </div>
          <div className="storeinput notice">
            <label for="">是否需填寫備註</label>
            <input
              type="text"
              className="noticename px-3"
              name={Notice}
              id="Notice"
              placeholder="請在此填寫，最多 200 字"
              onChange={(e) => {
                setNotice(e.target.value)
                UpdateInfo(e.target.value, 7)
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart_Store
