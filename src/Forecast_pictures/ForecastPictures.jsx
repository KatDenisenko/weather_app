import React from 'react';
import style  from './Forecast_pictures.css';
import rain from '../images/rain.png';
import drizzle from '../images/drizzle.png';
import clouds from '../images/clouds.png';
import clear from '../images/clear.png';
import haze from '../images/haze.png';
import sand from '../images/sand.png';
import smoke from '../images/smoke.png';
import snow from '../images/snow.png';
import mist from '../images/mist.png';


const Forecast_pictures = ({dataDescr}) => {
        let forecastPictures = {
        rain,
        drizzle,
        clouds,
        clear,
        mist,
        haze,
        sand,
        smoke,
        snow,
}
let picture = dataDescr?dataDescr.toLowerCase():null
 
    return (
        <img className ={style.forecastImage} src={forecastPictures[picture]} alt="Forecast"/>
   
    );
};

export default Forecast_pictures;