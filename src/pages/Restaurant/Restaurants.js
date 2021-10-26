import { Link } from 'react-router-dom'
import React, { useRef, useState, useEffect } from 'react'
import '../../App.scss'
import { BsCursor } from 'react-icons/bs'
import { imgUrl } from '../../config'
// import { RESTAURANT } from '../../config'
import ResList from '../../components/Restaurant/ResList'
import SortBtn from '../../components/Restaurant/SortBtn'
import ResPopular from '../../components/Restaurant/ResPopular'
import TitleBorder from '../../components/TitleBorder'
import Geocode from 'react-geocode'
import { apiKey } from '../../api/googleApi'
import { useHistory } from 'react-router-dom'
import ResMap from './ResMap'
import ResMapsearch from '../../components/Restaurant/ResMapsearch'

// import { data } from '../../data'


function Restaurants(props) {
  const [lat, setLat] = useState(25.033198)
  const [lng, setLng] = useState(121.543575)
  const [address, setAddress] = useState('')
  const [apiData, setApiData] = useState([]);
  const [options, setOption] = useState([
    {
      name1: "平均價格", value: "1",
      name2: "100~200", value1: "2",
      name3: "200~300", value2: "3",
      name4: "300~400", value3: "4",

    },
    {
      name1: "評分排序", value: "",
      name2: "由高到低", value1: "1",
      name3: "由低到高", value2: "2",
    },
    {
      name1: "最佳距離", value: "1",
      name2: "3公里", value1: "2",
      name3: "2公里", value2: "3",
      name4: "1公里", value3: "4",
      name5: "500公尺", value4: "5",
    },
  ]);
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

  async function test() {
    let r = await fetch('http://localhost:3002/reslist');
    let j = await r.json();
    if (j.length) {
      setApiData(j);
    }

  }
  useEffect(() => {
    test();
  }, [])


  const onSubmit = () => {
    // history.push('/map')
    test();
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
        <SortBtn mapData={apiData} lat={lat} lng={lng} options={options} name="地圖模式" />
        {/* name="地圖模式"  sortName="評分排序" */}
      </div>
      <div className="container mt-35" >

        <ResList listData={apiData} />
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
