import style from './Main.css'
import React from 'react';




const Main = (props) => {
    return (
    <div className={style.main}>
     {props.children}
     </div>
    );
};

export default Main;