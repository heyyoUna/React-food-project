import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { RiMapPinLine } from 'react-icons/ri'
import { imgUrl } from '../../config'
function SortBtn(props) {

  const { mapData, lat, lng, options } = props;
  const history = useHistory();


  const goToMap = () => {
    history.push({
      pathname: '/resmap',
      state: { mapData, lat, lng, options },

    });
  }
  return (
    <>
      <div className="row ">
        <div className="col-md-3 col-6 ">
          <button type="button" class="btn orange-btn" onClick={goToMap}>
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

        {options && options.map((el, i) => {
          return <div className="col-md-3  col-6 ">
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
        })}

        {/* <div className="col-md-4  col-6 ">
          <select
          // className="form-select form-select-sm"
            // aria-label=".form-select-sm "
            style={{
              backgroundImage: `url('http://localhost:3000/images/Restaurant/arrow-icon.png')`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: '90% center',
            }}
          >
            <option value="">{props.sortName}</option>
            <option value="1">最高評分</option>
            <option value="2">最低評分</option>
          </select>
        </div> */}
      </div>
    </>
  )
}

export default SortBtn
