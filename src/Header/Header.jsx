import React from 'react';
import style from './Header.css';
import favor from '../images/favorite.png';
import favor_add from '../images/favorite_add.png';
import PropTypes from 'prop-types';
import search from '../images/search.png'



const Header = ({city,country, date,input,handlerChange, goToServer,addToFavor,favorList,mistakeMessage}) => {
 

    return (
        
        <div className={style.header}>
                       
            <form action="" onSubmit = {goToServer}>
            <div className={style.searchInput}>
            <input title='Введіть назву свого міста англійськими літерами' className = {style.inputStyle} type="text" value = {input}  onChange={handlerChange} placeholder = "Find your city"/>
            <img onClick = {goToServer} className = {style.searchImg} title = 'Шукати' src = {search} alt='search icon' />
            </div>
            <p className={mistakeMessage.length!==0? style.mistakeMessage: style.noMistake}>{mistakeMessage}</p>
            </form>
           
               <div className = {style.geo}>
                        <div className = {style.favorCity}>
                            <p className = {style.text}>{`${city}, ${country}`}</p> 
                            <img onClick = {addToFavor} title='Додайте своє місто до обранного списку міст'  src={favorList.includes(city)?favor:favor_add} alt="Add to favourite"/>
                        </div>

                        <p className ={`${style.text} ${style.date}`}>{date}</p>
                </div>
           
        </div>
            
        

     

        
    );
};

Header.propTypes = {
    city:PropTypes.string.isRequired,
    country:PropTypes.string.isRequired, 
    date: PropTypes.string.isRequired,
    input:PropTypes.string.isRequired,
    handlerChange: PropTypes.func.isRequired, 
    goToServer: PropTypes.func.isRequired,
    addToFavor:  PropTypes.func.isRequired,
    favorList: PropTypes.arrayOf(PropTypes.string).isRequired,

    mistakeMessage: PropTypes.string.isRequired }
    

export default Header;