import React from 'react';
import {NavLink} from 'react-router-dom';
import style from './Menu.css'

const Menu = ({city,toggelWeather, isActive}) => {
    return (
        <ul  className={style.list}>
           <li className = {isActive?style.isActive:style.menuItem} onClick={toggelWeather}>
                <NavLink title={`${city}`} to='/'>Cьогодні</NavLink>
           </li>
           <li className = {!isActive?style.isActive:style.menuItem} onClick={toggelWeather}>
                <NavLink title={`${city}`} to='/fivedayforecast'>5 днів</NavLink>
           </li>
       </ul>
        
    );
};

export default Menu;