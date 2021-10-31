import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { RiMapPinLine } from 'react-icons/ri'
import { imgUrl } from '../../config'

function MapButtonGroup(props) {
  const { linkFunction } = props

  return (
    <div className="row ">
      <div className="col-md-3 col-6 ">
        <button
          type="button"
          class="orange-btn"
          onClick={linkFunction}
        >
          <RiMapPinLine
            style={{
              color: '#FB6107',
              fontSize: '24px',
              marginBottom: '4px',
            }}
          />{' '}
          {props.name}
        </button>
      </div>

      {/* 從restaurant 三個sortbutton */}
      {props.children}
    </div>
  )
}

export default MapButtonGroup
