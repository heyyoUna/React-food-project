import React,{ useState, useEffect  } from 'react';

const Clientinfo = (props) => {
    const {
        gender,
        setGender,
        years,
        setYears,
        height,
        setHeight,
        weight,
        setWeight,
        TDEE,
        setTDEE,
        oriTDEE,
        setOriTDEE
      } = props

    // 填寫完基本資料後算出TDEE
    useEffect(() => {
      const yesrsnumber= parseInt(years)
      const heightnumber = parseInt(height)
      const weightnumber = parseInt(weight)

      // 設定四個值都有在做計算
      if(years&&height&&weight&&gender==="男"){
        let TDEE = Math.ceil(((13.7*weightnumber)+(5*heightnumber)-(6.8*yesrsnumber)+66)*1.2)
        setOriTDEE(TDEE)
        setTDEE(TDEE)
        
      }if(years&&height&&weight&&gender==='女'){
          let TDEE = Math.ceil(((9.6*weightnumber)+(1.8*heightnumber)-(4.7*yesrsnumber)+655)*1.2)
          setOriTDEE(TDEE)
          setTDEE(TDEE)
      }
    }, [gender,years,height,weight])

    return (<>
    {/* 性別 */}
            <div>
              <label htmlFor="gender">性別</label>
              <select
                className="pd-gender"
                id="gender"
                value={gender}
                onChange={(e)=>{
                    setGender(e.target.value)
                }}
              >
                <option value="男">男</option>
                <option value="女">女</option>
              </select>
    {/* 年齡 */}
              <label htmlFor="years">年齡</label>
              <input
                className="pd-years"
                value={years}
                onChange={(e)=>{
                    setYears(e.target.value)
                }}
              />
            </div>
    {/* 身高 */}
            <div>
              <label htmlFor="height">身高</label>
              <input
                className="pd-height"
                type="number"
                // value={170}
                value={height}
                onChange={(e)=>{
                    setHeight(e.target.value)
                }}
              />
    {/* 體重 */}
              <label htmlFor="weight">體重</label>
              <input
                className="pd-weight"
                type="number"
                value={weight}
                onChange={(e)=>{
                    setWeight(e.target.value)
                }}
              />
            </div>
        </>
    );
};


export default Clientinfo;
