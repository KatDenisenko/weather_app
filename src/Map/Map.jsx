import React from "react";
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import {MarkerWithLabel} from "react-google-maps/lib/components/addons/MarkerWithLabel";
import style from './Map.css';
//import './Map.css'
// const { MarkerWithLabel } = require("react-google-maps/lib/components/addons/MarkerWithLabel");
const google = window.google = window.google ? window.google : {}

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDQWi2sZJOs5nSThoD2rxtLa58vYJZrGtw&libraries=geometry,drawing,places",
    //my key for google api AIzaSyDQWi2sZJOs5nSThoD2rxtLa58vYJZrGtw

    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `320px` }}/>,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
 
)((props) =>
  <GoogleMap onClick={props.handleMarkerClick}
    defaultZoom={12}
    center={{ lat: props.coord.lat, lng: props.coord.lon }}
    >
    <MarkerWithLabel 
          
      position={{ lat: props.coord.lat, lng: props.coord.lon }}
      labelAnchor={new google.maps.Point(0, 0)}
      //labelVisible={el.showLabel}
      //onClick={props.handleLabel}
      // labelStyle={{ width: '30%', backgroundColor: "lightblue", opacity: 0.5, fontSize: "16px", padding: "3px"}}
      >
      {<div className ='show'></div>}
    </MarkerWithLabel> 
    
     </GoogleMap>)
    
  
 

export default  MyMapComponent;