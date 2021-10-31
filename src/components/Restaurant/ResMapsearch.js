import React, { useRef, useState, useEffect } from 'react'
import { BsCursor } from 'react-icons/bs'
import Geocode from 'react-geocode'
import { apiKey } from '../../api/googleApi'

function ResMapsearch(props) {
  //  const {mapData, setApiData,setLat,lng, setLng,address, setAddress} =props;
  const [lat, setLat] = useState(25.033198)
  const [lng, setLng] = useState(121.543575)
  const [address, setAddress] = useState('')
  const [apiData, setApiData] = useState([])

  async function test() {
    let r = await fetch(
      'http://localhost:3002/reslist/address'
    )
    let j = await r.json()
    if (j.length) {
      setApiData(j)
    }
  }
  useEffect(() => {
    test()
  }, [])
  const onSubmit = () => {
    test()
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
      <div className="map-search">
        <input
          type="text"
          id="map-address"
          placeholder="請輸入地址"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button id="map-submit" onClick={onSubmit}>
          <BsCursor size="24px" />
        </button>
      </div>
    </>
  )
}

export default ResMapsearch
