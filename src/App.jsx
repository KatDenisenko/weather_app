import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header/Header';
import moment from 'moment';
import DayForecast from './DayForecast/DayForecast';

import FiveDayForecast from './FiveDayForecast/FiveDayForecast';
import Favorits from './Favorits/Favorits';
import list from './images/list.png'

import Container from './Container/Container';
import Menu from './Menu/Menu'
import {Switch,Route} from 'react-router-dom';
import style from './App.css';
import Loader from 'react-loader-spinner';
import bgArr from './Background/Background';
import statements from './Statements/statements';

class App extends Component {

  state = {
    
    input: 'Kyiv',
      geo: {
        city:'Kyiv',
        country:'UA',
      },
    date:moment().format('LLLL'),
    favorList:JSON.parse(localStorage.getItem('favorList')) || [],
    data: {},
    // labels:[],
    isActive:true,  
    isLoader:true,
    showFavor: false,
    backgroundUrl:null,
    statement:'',
    mistakeMessage:'',
   }

  fetchFunc = (url,func)=> {
    axios.get(url)
    .then(data => func(data))
    .catch(mis=>this.getMistake())
    
  
  }
  getMistake= ()=> {
    this.setState({
      mistakeMessage:'Нажаль інформації за вашим запитом відсутня.'
      }
           )
    // let reg = /404/;
    // if (mis.match(reg)) {
    //   console.log('На жаль таке місто не знайдено.')
    // }
  }

  changeBackground = ()=>{
    let index = Math.floor(Math.random() * (bgArr.length));
    let stIndex = Math.floor(Math.random() * (statements.length));
    this.setState({ 
      backgroundUrl:bgArr[index],
      statement:statements[stIndex],
      // isActive:false,
    })
  }

  wrightState = (data)=> {
   //console.log(data)
      this.setState({
        input: '',
        data: data.data,
        geo:{city:data.data.name,country:data.data.sys.country},
        isLoader:false,
        
             }) 
    
     }

    handlerChange = (e) => {//записываем в setState  value из input
    let value = e.target.value;
    this.setState({
      input: value,
      mistakeMessage:'',

        })
  };
  

    

    timeChange = () => {//меняем время каждую минуту
      this.setState({
        date:moment().format('LLLL')}
             )   
    }

    
  componentDidMount () {   
    setInterval(this.timeChange,60000);
    this.changeBackground();
    this.fetchFunc (`https://api.openweathermap.org/data/2.5/weather?q=${this.state.input}&units=metric&APPID=b5ec4144af2651a6b2eb07fb26d8ba0c&lang=ua`,this.wrightState)
    }
    //my key for google api AIzaSyDQWi2sZJOs5nSThoD2rxtLa58vYJZrGtw


    goToServer= (e) => {
    let reg = /[a-zA-Z]/ig;//ищем набор символов от a до z и от A до Z, если хотим укр язык должны сменить раскладку и указать [а-яА-Я,Ї]
   
    e.preventDefault();
if (!this.state.input.match(reg)) {
  this.setState({
    mistakeMessage:'Введіть назву міста латинецою.',
    } 
         )
  } 
  else {
      this.fetchFunc (`https://api.openweathermap.org/data/2.5/weather?q=${this.state.input}&units=metric&APPID=b5ec4144af2651a6b2eb07fb26d8ba0c&lang=ua`,this.wrightState)
    }}

    
    addToFavor = ()=> {
 
      let newResult = JSON.parse(localStorage.getItem('favorList')) || [];
        if (!newResult.includes(this.state.geo.city)) 
        {newResult.push(this.state.geo.city)
        localStorage.setItem('favorList', JSON.stringify(newResult))};

      if (!this.state.favorList.includes(this.state.geo.city)) {
        this.setState(prev=>({
          favorList:  [...prev.favorList, this.state.geo.city]
        
        }))
      }
      
    }
  
    deleteFromFavor = (e)=>{
      
      let element = e.target.dataset.name;
      console.log(e.target.dataset.name);
      let result  = JSON.parse(localStorage.getItem('favorList'));
      let delItem = result.filter(el=>el!==element);
      localStorage.setItem('favorList', JSON.stringify(delItem));

      this.setState({
        favorList: this.state.favorList.filter(el=>el!==element),
     })
  }
  
  fromFavorit  = async (e)=>{

   
    let element = e.target.dataset.name;
    
    await this.setState(prev=>({
     input:element,
     showFavor: !prev.showFavor,
   }))
    this.fetchFunc (`https://api.openweathermap.org/data/2.5/weather?q=${this.state.input}&units=metric&APPID=b5ec4144af2651a6b2eb07fb26d8ba0c&lang=ua`,this.wrightState)
 
  }

  toggelWeather = (e)=> {
    this.setState(prev =>({
      isActive: !prev.isActive,  
  }))
  }

  toggelFavorList = (e) => {
    e.stopPropagation();
    this.setState(prev => ({
        showFavor: !prev.showFavor,  
    }))
}

getCoordinats=(e)=>{
  let lat=e.latLng.lat();
  let lng=e.latLng.lng();
  axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&APPID=b5ec4144af2651a6b2eb07fb26d8ba0c&lang=ua`).then(result=>this.writeStateWithLonLgt(result));
   

}


writeStateWithLonLgt=(data)=> {
  
       this.setState({
         
         data: data.data,
         geo:{city:data.data.name,country:data.data.sys.country},
         isLoader:false,

              }) 
     
      
}

handleMarkerClick = (e) => {
    
  this.getCoordinats(e);
  
}
 


  render() {
    const {input, geo, data, date, favorList, showFavor, backgroundUrl, statement,isActive,mistakeMessage} = this.state;
      
    return (
     
   <div className = {style.mainWrapper} style={ { backgroundImage: `linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3)),url(${backgroundUrl})` } }>    
         {this.state.isLoader ?
        <div>
          <Loader 
         type="Plane"
         color="#00BFFF"
         height="100"	
         width="100"
      />
    </div> 
      : 
         <Container>
              <Header  mistakeMessage={mistakeMessage} favorList = {favorList} timeChange = {this.timeChange} city = {geo.city} country= {geo.country} date = {date} addToFavor = {this.addToFavor} handlerChange = {this.handlerChange} goToServer = {this.goToServer} input = {input}/>
              <div className={style.main}> 
              <div className = {style.favorListMain}>
              <p className = {style.statement}>{statement}</p>
                        {showFavor && <Favorits fromFavorit = {this.fromFavorit} favorList = {favorList} deleteFromFavor = {this.deleteFromFavor}/>}
                        <img title = 'Виберіть місто з списку обраних' onClick = {this.toggelFavorList} src={list} alt='Favorite list'/>
              </div> 
              <Menu city = {geo.city} toggelWeather ={this.toggelWeather} isActive ={isActive}/>
              <Switch>
                <Route exact path='/' render = {(props)=> <DayForecast {...props}  handleMarkerClick={this.handleMarkerClick} data = {data}/>}/>
                <Route path='/fivedayforecast' render = {(props)=> <FiveDayForecast {...props} geo ={geo} fetchFunc={this.fetchFunc}/>}/>
              </Switch>
                   
            </div>
        </Container>}
         </div>
    
    );
  }
}

export default App;
