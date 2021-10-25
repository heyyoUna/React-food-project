import React from 'react'
import { imgUrl } from '../config'

function HpFixedBgc(props) {
  return (
    <>
      <div class="hp_bgcWrap">
        <img
          class="hp_bgc hp_bgc_1"
          src={`${imgUrl}/images/hp_bgc1-3.png`}
          alt=""
        />
        <img
          class="hp_bgc hp_bgc_2"
          src={`${imgUrl}/images/hp_bgc2-3.png`}
          alt=""
        />
        <img
          class="hp_bgc hp_bgc_3"
          src={`${imgUrl}/images/hp_bgc3-3.png`}
          alt=""
        />
      </div>
    </>
  )
}

export default HpFixedBgc
