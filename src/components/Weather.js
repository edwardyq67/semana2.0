import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Weather = () => {
    const [temp,setTemp]=useState(0);
    const [cambio,setCambio]=useState(true);
    const [clima,setClima]=useState({})
    const success=pos=>{
        console.log(pos.coords)
       const latitude=pos.coords.latitude
       const longitude=pos.coords.longitude
         axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=b95203633d0f67ec25ce3d9230290535`)
         .then(res=>{
            console.log(res.data)
            setClima(res.data)
            setTemp(res.data.main.temp-273.15)
         })
       }
       const convertTemp=()=>{
        if(cambio){
            setTemp((temp *9/5)+ 32 );
            setCambio(false);
        }else{
            setTemp((temp- 32)*5/9);
            setCambio(true);
        }
       }
       
     useEffect(()=>{
         navigator.geolocation.getCurrentPosition(success);
     },[])
     
    return (
        <div className='todo'>
           <h2>{clima.sys?.country},{clima.name}</h2>
           <img src= 'http://openweathermap.org/img/wn/04d@2x.png' alt="" />
           <h3>{Number(temp.toFixed(2))}  {cambio ?"°C":"°F"}</h3>
           <button onClick={convertTemp}> {cambio ?"farenheit ":" celcius"}</button>
           <ul>
            <li><b>humidity: </b>{clima.main?.humidity}%</li>
            <li><b>pressure: </b>{clima.main?.pressure} hPa</li>
            <li><b>visibility: </b>{clima.visibility}</li>
            
           </ul>

        </div>
    );
};

export default Weather;