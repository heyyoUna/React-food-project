
const MapSortButton = ({options, onChange, name}) => {
    return (
      

      // sortbtn 樣式獨立  從restaurant 傳props過來
        <select
          name={name}
          className="map-select"
          onChange={onChange}
          style={{
            // backgroundImage: `url(${`${imgUrl}/images/arrow-icon.png`}) `,
            backgroundImage: `url('http://localhost:3000/images/Restaurant/arrow-icon.png')`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '90% center',
          }}
        >
          {
            options&&options.map((item, index) => {
              return(
                <option key={index} value={item.value}>{item.name}</option>
              )    
            })
          }
          {/* <option value="{el.value1}">{el.name1}</option>
          <option value="{el.value2}">{el.name2}</option>
          <option value="{el.value3}">{el.name3}</option>
          <option value="{el.value4}">{el.name4}</option>
          <option value="{el.value4}">{el.name5}</option> */}
        </select>
      
    )
  }

  export default MapSortButton;