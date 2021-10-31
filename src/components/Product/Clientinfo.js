import React from 'react';


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
        setTDEE
      } = props

    const yesrsnumber= parseInt(years)
    const heightnumber = parseInt(height)
    const weightnumber = parseInt(weight)

    const calculate=()=>{
        if(gender==="男"){
            let newTDEE = Math.ceil(((13.7*weightnumber)+(5*heightnumber)-(6.8*yesrsnumber)+66)*1.2)
            setTDEE(newTDEE)
        }else{
            let newTDEE = Math.ceil(((9.6*weightnumber)+(1.8*heightnumber)-(4.7*yesrsnumber)+655)*1.2)
            setTDEE(newTDEE)
        }
    }
    return (<>
    {/* 性別 */}
            <div>
              <label for="gender">性別</label>
              <select
                className="pd-gender"
                id="gender"
                value={gender}
                onChange={(e)=>{
                    setGender(e.target.value)
                    console.log(typeof gender)
                }}
              >
                <option value="男">男</option>
                <option value="女">女</option>
              </select>
    {/* 年齡 */}
              <label for="years">年齡</label>
              <input
                className="pd-years"
                type="number"
                value={years}
                onChange={(e)=>{
                    setYears(e.target.value)
                }}
              />
            </div>
    {/* 身高 */}
            <div>
              <label for="height">身高</label>
              <input
                className="pd-height"
                type="number"
                value={height}
                onChange={(e)=>{
                    setHeight(e.target.value)
                }}
              />
    {/* 體重 */}
              <label for="weight">體重</label>
              <input
                className="pd-weight"
                type="number"
                value={weight}
                onChange={(e)=>{
                    setWeight(e.target.value)
                    calculate()
                }}
              />
            </div>
        </>
    );
};


export default Clientinfo;
