import React from 'react';
import style from './Favorits.css';

import deletIcon from '../images/favorite_del.png';
const Favorits = ({favorList,deleteFromFavor,fromFavorit}) => {
    return (
        // <div className = {favorList}>
        <ul  className = {style.favorList}>
         {favorList.map(el=><li  key = {el} onClick= {fromFavorit} className = {style.listItom}>
             <p data-name = {el}>{el}</p>
             <img onClick = {deleteFromFavor} data-name = {el} src={deletIcon} alt="Delet from favourite"/>
             </li>)}
        </ul>
        // </div>
    );
};

export default Favorits;