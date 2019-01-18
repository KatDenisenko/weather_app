import React from 'react';
import style from './DayForecast.css'
import moment from 'moment';
import rise from '../images/rise.png';
import sunset from '../images/sunset.png';
import ForecastPictures from '../Forecast_pictures/ForecastPictures';
import Main from '../Main/Main';
import Map from '../Map/Map';
import PropTypes from 'prop-types';

const DayForecast = ({data,handleMarkerClick }) => {
    //data.main.temp, data.wind.speed, data.main.humidity, data.main.pressure, data.sys.sunrise, data.sys.sunset,data.coord
    console.log(data)
    return (
<Main>
    <div className={style.oneDayForecast}> 
    <div className = {style.day}>
    <div className = {style.forecatDescrWrapper}>
        <div className = {style.tempreture}>
            <ForecastPictures dataDescr={data.weather[0].main}/>
            <div className = {style.wrapper}>
                <p className={style.temper_data}>{Math.round(data.main.temp)}&#8451;</p>
                <p>{data.weather.reduce((acc,el)=>acc+el.description + ', ','')}</p>
            </div>
        </div>
        <div className = {style.textWrapper}>
            <p>Швидкість вітру: {data.wind.speed}м/с.</p>
            <p>Вологість: {data.main.humidity}%.</p>
            <p>Атмосферний тиск: {data.main.pressure}hPa.</p>
        </div>
        </div>
            <p className = {style.image_wrapper}><img src = {rise} alt = 'rise'/>
            {` ${moment.unix(data.sys.sunrise).format("HH:mm")} (за місцевим часом).`}</p>
            <p className = {style.image_wrapper}><img src = {sunset} alt ='sunset' />{`  ${moment.unix(data.sys.sunset).format("HH:mm")} (за місцевим часом).`}</p>
    </div>
        <div className={style.mapWrapper}>
        <Map coord={data.coord} handleMarkerClick={handleMarkerClick}/>
        </div>

        
    </div>
</Main>
    );
};

DayForecast.propTypes = {
    //data.sys.sunrise, data.sys.sunset, data.wind.speed,data.main.temp,  data.main.humidity, data.main.pressure,   data.coord
  
data: PropTypes.shape({
    coord: PropTypes.shape({lon: PropTypes.number.isRequired, lat:PropTypes.number.isRequired}).isRequired,
    main: PropTypes.shape({
        humidity: PropTypes.number,
        pressure: PropTypes.number,
        temp: PropTypes.number,//если значение отрицательное тоже number ???
        //temp_max: PropTypes.number,//нужно ли описывать поля которые не используем????
        //temp_min: PropTypes.number,
    }).isRequired,
    sys: PropTypes.shape({
        sunrise: PropTypes.number,
        sunset: PropTypes.number,
    }).isRequired,
    weather: PropTypes.arrayOf(PropTypes.shape({
        main: PropTypes.string.isRequired,
    }))


    
}).isRequired,

handleMarkerClick: PropTypes.func.isRequired,
}
   


export default DayForecast;