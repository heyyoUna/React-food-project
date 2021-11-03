import { Link } from 'react-router-dom'
import React, { useRef, useState, useEffect } from 'react'
import '../../App.scss'
import { BsCursor } from 'react-icons/bs'
import { imgUrl } from '../../config'
// import { RESTAURANT } from '../../config'
import ResListData from '../../components/Restaurant/ResListData'
import MapButtonGroup from '../../components/Restaurant/MapButtonGroup'
import ResPopular from '../../components/Restaurant/ResPopular'
import TitleBorder from '../../components/TitleBorder'
import Geocode from 'react-geocode'
import { apiKey } from '../../api/googleApi'
import { useHistory } from 'react-router-dom'
import ResMap from './ResMap'
import ResMapsearch from '../../components/Restaurant/ResMapsearch'
import MapSortButton from '../../components/Restaurant/MapSortButton'
import PageBtn from './../../components/Product/PageBtn'
import { FiFilter } from 'react-icons/fi'

// import { data } from '../../data'

function Restaurants(props) {
  const [lat, setLat] = useState(25.033198)
  const [lng, setLng] = useState(121.543575)
  const [address, setAddress] = useState('')
  const [apiData, setApiData] = useState([]) //原始資料
  const [filterData, setFilterData] = useState([]) //篩選資料
  const [displayData, setDisplayData] = useState([]) // 實際呈現的資料
  const [pages, setPages] = useState({
    currentPage: 0, //當前頁碼
    perPage: 6, //每頁6筆
    totalPages: 0, //總頁數
  })
  const [pagination, setPagination] = useState([])

  const [filter, setFilter] = useState({
    price: '',
    rate: '',
    distance: '',
  })

  const onFilterChange = (e) => {
    setFilter({
      ...filter,
      // 物件中給變數要用[]包起來
      [e.target.name]: e.target.value, //下拉選單的值
    })
  }

  //點擊當前頁碼
  const onperPageChange = (e) => {
    const index =
      e.target.attributes.getNamedItem('data-index').value

    const data =
      filter.data || filter.price || filter.distance
        ? filterData
        : apiData
    let newData = [...data]

    newData = newData.slice(
      parseInt(index) * pages.perPage,
      pages.perPage * (parseInt(index) + 1) //0*6,6*1
    )
    //計算用舊資料算  呈現塞進filterdata
    setDisplayData(newData)
    setPages({ ...pages, currentPage: parseInt(index) }) //當前頁碼為點擊頁碼
  }

  const goToMap = () => {
    history.push({
      pathname: '/resmap',
      state: { mapData: apiData, lat, lng },
    })
  }

  // filter 不是陣列的filter，是狀態的filter
  useEffect(() => {
    /* 有任意一個篩選有輸入，即進行判斷 */
    if (filter.price || filter.rate || filter.distance) {
      // 避免指到同一個記憶體位置，引響原始資料，故淺拷貝一份apiData
      // let processFilterData = apiData
      let processFilterData = [...apiData]
      // 當選取價錢區間
      if (filter.price) {
        // 切割~，取得價錢範圍
        const rangeArr = filter.price.split('~')
        // 用原始資料做filter
        processFilterData = processFilterData.filter(
          (item) => {
            return (
              item.res_aveprice >= +rangeArr[0] &&
              item.res_aveprice <= +rangeArr[1]
            )
          }
        )
      }

      // 評分排序
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

      setFilterData(processFilterData) //放篩選後的資料

      //filter的資料切成6筆(0-6) 因為篩選後的資料都會在第一頁
      const dataPerpage = processFilterData.slice(
        0,
        pages.perPage
      )
      console.log(dataPerpage)

      setDisplayData(dataPerpage)
      const totalPages = Math.ceil(
        processFilterData.length / pages.perPage
      )

      setPages({ ...pages, currentPage: 0, totalPages })
      const arr = []
      for (let i = 1; i <= totalPages; i++) {
        arr.push(i)
      }
      console.log(arr)
      setPagination(arr)
    }
  }, [filter])

  const history = useHistory()
  const myRef = useRef(null)

  // async function listData() {
  //   let r = await fetch('http://localhost:3002/reslist')
  //   let j = await r.json()
  //   if (j.length) {
  //     /** apiData包存原始資料，filterData設定渲染所需的資料 */
  //     setApiData(j)
  //     setFilterData(j)
  //   }
  // }
  // useEffect(() => {
  //   listData()
  // }, [])

  useEffect(() => {
    ;(async () => {
      let r = await fetch(
        'http://localhost:3002/reslist/address',
        {
          method: 'POST',
          body: JSON.stringify({
            latitude: lat,
            longitude: lng,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      const data = await r.json()
      console.log('data', data)
      if (data.success) {
        setApiData(data.data)
        setDisplayData(data.data)

        const dataSize = data.data.length
        const totalPages = Math.ceil(
          dataSize / pages.perPage
        )
        console.log(totalPages)
        const arr = []
        for (let i = 1; i <= totalPages; i++) {
          arr.push(i)
        }
        console.log(arr)
        setPages({ ...pages, totalPages })
        setPagination(arr)
      }
      //filter的資料切成6筆(0-6)
      const dataPerpage = data.data.slice(
        pages.currentPage,
        pages.perPage
      )
      console.log(dataPerpage)
      setDisplayData(dataPerpage)
    })()
  }, [lat, lng])

  const mySubmit = () => {
    // listData()
    //滾動效果
    myRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
    Geocode.setApiKey(apiKey) //輸入地址抓經緯度
    Geocode.setLanguage('zh-TW')
    Geocode.setRegion('tw')
    Geocode.enableDebug()
    Geocode.fromAddress(address).then(
      (response) => {
        const { lat, lng } =
          response.results[0].geometry.location
        console.log(lat, lng)
        setLat(lat)
        setLng(lng)
      },
      (error) => {
        console.error(error)
      }
    )
  }

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

          <button id="ressubmit" onClick={mySubmit}>
            <BsCursor size="24px" />
          </button>
        </div>
      </div>

      <div className="ma-80" ref={myRef}>
        <TitleBorder name="健康餐盒" />
      </div>

      <div className="container d-flex  justify-content-center ">
        <MapButtonGroup
          linkFunction={goToMap}
          name="地圖模式"
        >
          <div className="col-md-3  col-6 ">
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
      </div>
      {/* <ResMap name="列表模式"/> */}
      <div className="container mt-35 mb-5">
        <div class="row  justify-content-center">
          {/* 原本是傳apiData進來，但為了呈現篩選過後的資料，所以改傳filterData */}
          {displayData.map((v, i) => {
            return (
              <ResListData
                res_id={v.res_id}
                res_img={v.res_img}
                res_name={v.res_name}
                res_rate={v.res_rate}
                res_aveprice={v.res_aveprice}
                res_starttime={v.res_starttime}
                res_endtime={v.res_endtime}
              />
            )
          })}
        </div>
      </div>

      {/* 分頁 */}

      <div className="page-btn-wrap d-flex">
        {/* 前一頁 */}
        <div
          className="page-pre"
          onClick={() => {
            console.log('currentPage', pages.currentPage)
            console.log('totalPages', pages.totalPages)
            if (pages.currentPage === 0) {
              return
            }

            const data =
              filter.distance || filter.price || filter.rate
                ? filterData
                : apiData

            const arr = data.slice(
              (pages.currentPage - 1) * pages.perPage,
              pages.currentPage * pages.perPage
            )

            setDisplayData(arr)

            setPages({
              ...pages,
              currentPage: pages.currentPage - 1,
            })
          }}
        >
          <i className="fas fa-chevron-left"></i>
        </div>
        {/* 頁數 */}
        <div className="page d-flex">
          {pagination.map((item, i) => {
            return (
              <div
                className={
                  pages.currentPage === i
                    ? 'res-pages-active res-pages'
                    : 'res-pages'
                }
                key={i}
                onClick={onperPageChange}
                data-index={i}
              >
                {item}
              </div>
            )
          })}
        </div>
        {/* 下一頁 */}
        <div
          className="page-next"
          onClick={() => {
            if (
              pages.currentPage + 1 ===
              pages.totalPages
            ) {
              return
            }
            console.log(
              'currentPage',
              pages.currentPage + 1
            )
            console.log('totalPages', pages.totalPages)

            const data =
              filter.distance || filter.price || filter.rate
                ? filterData
                : apiData

            setDisplayData(
              data.slice(
                (pages.currentPage + 1) * pages.perPage,
                (pages.currentPage + 2) * pages.perPage
              )
            )

            setPages({
              ...pages,
              currentPage: pages.currentPage + 1,
            })
          }}
        >
          <i className="fas fa-chevron-right"></i>
        </div>
        <p className="total-page">
          共 {pages.totalPages} 頁
        </p>
      </div>

      <div className="ma-80">
        <TitleBorder name="人氣精選" />
      </div>
      <ResPopular />
    </>
  )
}

export default Restaurants
