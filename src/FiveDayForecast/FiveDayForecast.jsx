import React, { Component } from 'react';
import moment from 'moment';
import style from './FiveDayForecast.css'
import ForecastPictures from '../Forecast_pictures/ForecastPictures'
import Chart from '../Chart/Chart';
import Container from '../Container/Container';
import Loader from 'react-loader-spinner';
import Main from '../Main/Main'



class FiveDayForecast extends Component {

    state = {
        dataFive: [],
        isLoader:true,
     
    average: {
        temperature:[],
        wind: [],
        pressure:[],
        humidity: [],
      }, 
    }
    

    findFive = ()=> {
        
        this.props.fetchFunc (`https://api.openweathermap.org/data/2.5/forecast?q=${this.props.geo.city}&units=metric&APPID=b5ec4144af2651a6b2eb07fb26d8ba0c&lang=ua`,this.updateState)
       
      }
      writeAvarage =(avarage, result)=>{
        avarage.temperature = result.map(el=>Math.round((el.reduce((acc,item)=>(acc+item.main.temp),0))/el.length));

        avarage.pressure = result.map(el=>Number(((el.reduce((acc,item)=>(acc+item.main.pressure),0))/el.length).toFixed(2)));

        avarage.humidity = result.map(el=>Math.round((el.reduce((acc,item)=>(acc+item.main.humidity),0))/el.length));

        avarage.wind = result.map(el=>Number(((el.reduce((acc,item)=>(acc+item.wind.speed),0))/el.length).toFixed(2)));
    //   console.log(avarage);
      return (avarage)
        }

   
      updateState =async(data)=> {
                 let result = [];
                 let avarage ={};
                 for (let i=0; i<=4; i++) {
                  let dayStart=moment().startOf('day');
                  let dayEnd=moment().endOf('day');
       
                   let start = dayStart.add(i,'d').format('X');
                   let end = dayEnd.add(i, 'd').format('X');
                            result.push(data.data.list.filter(el => (el.dt>start && el.dt<end)));}
                    console.log(result)
                   await this.writeAvarage(avarage, result);
                    
                   
            // }
                    
                 this.setState({
                dataFive: result,
                average:  avarage, 
                // isLoaderFive:false,
                isLoader:false       
          })  
     }

    componentDidMount () {
        this.findFive()
        console.log('Didmount')
        
    }

    componentDidUpdate (prevProps) {
      
        if (prevProps.geo.city!==this.props.geo.city) {
        
            this.findFive();
        }
       
    }

    render() {
        console.log(this.state.average)
        // console.log(this.state.dataFive[0].weather)
    //    console.log(this.state.dataFive[0][0].dt)
        return (
           
    <Container>
            {this.state.isLoader ? 
            <Main> 
                <div className={style.loaderWrapper}>
                <Loader 
                type="Plane"
                color="#00BFFF"
                height="1"	
                width="1"/> 
                 </div>
         </Main>
      :<Main>

 <div className = {style.fiveDayWrapper}>
    <div className = {style.fiveDay}>
    
        {this.state.dataFive.map((el,i) => el.length<8? 

    <div title = {`${this.props.geo.city}`} className = {style.currentOur} key={i}>
        <p className = {style.dayPart}>Погода на поточну годину.</p>
        <div className = {style.forecatDescrWrapper}>
            <div className = {style.imageWrapper}>
                <ForecastPictures dataDescr={el[0].weather[0].main}/>
                <div className = {style.wrapper}>
                    <p className={style.temper_data}>{Math.round(el[0].main.temp)}&#8451;</p>
                    <p>{el[0].weather.reduce((acc,el)=>acc+el.description + ', ','')}</p>
                </div>
            </div>
            <div className = {style.textWrapper}>
                <p>Швидкість вітру: {el[0].wind.speed}м/с.</p>
                <p>Вологість: {el[0].main.humidity}%.</p>
                <p className = {style.pressure}>Атмосферний тиск: {el[0].main.pressure}hPa.</p>
            </div>
        </div>
    </div> :
    <div className = {style.day} title = {`${this.props.geo.city}`}key={el[0].dt}>
    
    <p className={style.moment}>{moment().add( i,'d').format("dddd, DD.MM.YYYY")}</p>
    <div className={style.wrapperMorningEvening}>
            <div className = {style.morning}>   
            
                <p className = {style.dayPart}>Ранок:</p>
                <div className = {style.forecatDescrWrapper}>
                    <div className = {style.imageWrapper}>
                    {/* <img  className = {style.forecastImage} src={`http://openweathermap.org/img/w/${el[2].weather[0].icon}.png`} alt='picture'/> */}
                        <ForecastPictures dataDescr={el[2].weather[0].main}/>
                        <div className = {style.wrapper}>
                            <p className={style.temper_data}>{Math.round(el[2].main.temp)}&#8451;</p>
                            <p>{el[2].weather.reduce((acc,el)=>acc+el.description + ', ','')}</p>
                        </div>
                    </div>
                <div className = {style.textWrapper}>
                    <p>Швидкість вітру: {el[2].wind.speed}м/с.</p>
                    <p>Вологість: {el[2].main.humidity}%.</p>
                    <p className = {style.pressure}>Атмосферний тиск: {el[2].main.pressure}hPa.</p>
                </div>
                </div>
            </div>
    
            <div className = {style.evening}>
            <p className = {style.dayPart}>Ніч:</p>
            <div className = {style.forecatDescrWrapper}>
                <div className = {style.imageWrapper}>
                {/* <img  className = {style.forecastImage} src={`http://openweathermap.org/img/w/${el[7].weather[0].icon}.png`} alt='picture'/> */}
                    <ForecastPictures dataDescr={el[7].weather[0].main}/>
                    <div className = {style.wrapper}>
                        <p className={style.temper_data}>{Math.round(el[7].main.temp)}&#8451;</p>
                        <p>{el[7].weather.reduce((acc,el)=>acc+el.description + ', ','')}</p>
                    </div>
                </div>
                <div className = {style.textWrapper}>
                    <p>Швидкість вітру: {el[7].wind.speed}м/с.</p>
                    <p className = {style.humidity}>Вологість: {el[7].main.humidity}%.</p>
                    <p className = {style.pressure}>Атмосферний тиск: {el[7].main.pressure}hPa.</p>
                </div>
            </div>
            </div>
        </div>
</div>
            
        )}
       
        
  </div>  
  <div className = {style.chartWrapper}>
    <Chart average={this.state.average}/>
  </div>
            </div>
            </Main>   
} 
           
           </Container>
           ) }
}

export default FiveDayForecast;
