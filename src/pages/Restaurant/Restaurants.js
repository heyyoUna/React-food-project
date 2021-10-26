import { Link } from 'react-router-dom'
import React, { useRef, useState, useEffect } from 'react'
import '../../App.scss'
import { BsCursor } from 'react-icons/bs'
import { imgUrl } from '../../config'
// import { RESTAURANT } from '../../config'
import ResList from '../../components/Restaurant/ResList'
import MapButtonGroup from '../../components/Restaurant/MapButtonGroup'
import ResPopular from '../../components/Restaurant/ResPopular'
import TitleBorder from '../../components/TitleBorder'
import Geocode from 'react-geocode'
import { apiKey } from '../../api/googleApi'
import { useHistory } from 'react-router-dom'
import ResMap from './ResMap'
import ResMapsearch from '../../components/Restaurant/ResMapsearch'
import MapSortButton from '../../components/Restaurant/MapSortButton'

// import { data } from '../../data'


function Restaurants(props) {
  const [lat, setLat] = useState(25.033198)
  const [lng, setLng] = useState(121.543575)
  const [address, setAddress] = useState('')
  const [apiData, setApiData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [filter, setFilter] = useState({
    price: '',
    rate: '',
    distance: '',
  });

  const onFilterChange = (e) => {
    setFilter({
      ...filter,
      // 物件中給變數要用[]包起來
      [e.target.name]: e.target.value //下拉選單的值
    })
  }


//   {  price: '',
//   rate: '',
//   distance: '',
// price:value (100-200) 會覆蓋掉原本的}


  // filter 不是陣列的filter，是狀態的filter
  useEffect(() => {
    /* 有任意一個篩選有輸入，即進行判斷 */
    if (filter.price || filter.rate || filter.distance) {
      // 當選取價錢區間
      if (filter.price) {
        // 切割~，取得價錢範圍
        const rangeArr = filter.price.split('~');
        // 用原始資料做filter
        const priceFilterData = apiData.filter(item => {
          return item.res_aveprice >= rangeArr[0] && item.res_aveprice <= rangeArr[1];
        })
        setFilterData(priceFilterData);
      }
      // TODO: 評分排序
      if (filter.rate) {
        // rate ===0  就用 原始資料由小到大排序
        // rate ===1  就用 原始資料由大到小排序
      }
    }
  }, [filter])

  //  const optionList=[
  //    { name:"平均價格",value:"" ,
  //     name:"100~150",value:"1" ,
  //     name:"150~200",value:"2" ,
  //     name:"200~250",value:"3" ,
  //     name:"250~300",value:"4" ,
  //  },
  //  { name:"評分排序",value:"" ,
  //  name:"最高評分",value:"1" ,
  //  name:"最低評分",value:"2" ,

  // },
  // ]
  const history = useHistory()
  const myRef = useRef(null)

  async function listData() {
    let r = await fetch('http://localhost:3002/reslist');
    let j = await r.json();
    if (j.length) {
      /** apiData包存原始資料，filterData設定渲染所需的資料 */
      setApiData(j);
      setFilterData(j);
    }

  }
  useEffect(() => {
    listData();
  }, [])


  const onSubmit = () => {
    // history.push('/map')
    listData();
    myRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })//滾動效果
    Geocode.setApiKey(apiKey)//輸入地址抓經緯度
    Geocode.setLanguage('zh-TW')
    Geocode.setRegion('tw')
    Geocode.enableDebug()
    Geocode.fromAddress(address).then((response) => {
      const { lat, lng } = response.results[0].geometry.location
      console.log(lat, lng);
      setLat(lat)
      setLng(lng)
    }, (error) => {
      console.error(error)
    }
    )
  }
  // useEffect (()=>{
  //   (async()=>{
  //     let r= await fetch(ResList);
  //     let j = await r.json();
  //     if(j.apiData){
  //       setApiData(j);
  //     }
  //     })();
  //   },[]);



  return (
    <>
      <div
        className="res-banner p-0"
        style={{
          // backgroundImage: `url(${`${imgUrl}/images/banner.jpg`})`,
          backgroundImage: `url('http://localhost:3000/images/Restaurant/banner.jpg')`,

        }}
      >
        <div className="res-slogan">
          <h1>尋找，</h1>
          <h2>附近的健康餐盒</h2>
        </div>
        <div className="search-group ">
          <input
            type="text"
            id="resaddress"
            className="map-seacrh"
            placeholder="請輸入地址"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          {/* 
          {/* <Link to="/resdetail/">
            <button id="submit">
              <BsCursor size="24px" />
            </button>
          </Link> */}

          <button id="ressubmit" onClick={onSubmit}>
            <BsCursor size="24px" />
          </button>
        </div>
      </div>


      <div className="ma-80" ref={myRef}>
        <TitleBorder name="健康餐盒" />
      </div>

      <div className="container d-flex  justify-content-center ">

        <MapButtonGroup mapData={apiData} lat={lat} lng={lng} name="地圖模式">
          <div className="col-md-3  col-6 ">

            <MapSortButton
              name='price'
              options={[
                { name: "平均價格", value: "" },
                { name: "100~200", value: "100~200" },
                { name: "200~300", value: "200~300" },
                { name: "300~400", value: "300~400" }
              ]}
              onChange={onFilterChange}
            />
          </div>

          <div className="col-md-3  col-6 ">
            <MapSortButton
              name='rate'
              options={[
                { name: "評分排序", value: "" },
                { name: "由高到低", value: "1" },
                { name: "由低到高", value: "2", },
              ]
              }
              onChange={onFilterChange}
            />

          </div>
          <div className="col-md-3  col-6 ">
            <MapSortButton
              name='distance'
              options={[
                { name: "最佳距離", value: "1" },
                { name: "3公里", value: "2" },
                { name: "2公里", value: "3" },
                { name: "1公里", value: "4" },
                { name: "500公尺", value: "5" }
              ]}
              onChange={onFilterChange}
            />
          </div>

        </MapButtonGroup>
        {/* name="地圖模式"  sortName="評分排序" */}
      </div>
      <div className="container mt-35" >

        {/* 原本是傳apiData進來，但為了呈現篩選過後的資料，所以改傳filterData */}
        <ResList listData={filterData} />
      </div>
      <div className="ma-80" ref={myRef}>
        <TitleBorder name="人氣精選" />
      </div>
      <ResPopular />
      {/* <ResMap options={options}/> */}
      {/* <ResMapsearch  mapData={apiData} setApiData={setApiData} lat={lat}  setLat={setLat} lng={lng} setLng={setLng} address={address}  setAddress ={setAddress} /> */}
    </>
  )
}

export default Restaurants
