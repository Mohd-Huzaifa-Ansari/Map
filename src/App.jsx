import { useState,useEffect, useRef } from 'react'

import './App.css';
import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';


import GeoJSON from 'ol/format/GeoJSON';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import VectorLayer from 'ol/layer/Vector';
import { Source } from 'ol/source';

import {Circle , Fill, Stroke, Style} from 'ol/style';
import GeoJSONMap from './components/GEO';

import axios from 'axios'
import ParcelDisplay from './components/ParcelDisplay';
import FinallyDisplay from './components/FinallyDisplay';


function App() {
// const [ parcelData, setparcelData] = useState({})

//  useEffect(()=>{
  

//   const styles = {
//     'Point': new Style({
//       image: image,
//     }),
//     'LineString': new Style({
//       stroke: new Stroke({
//         color: 'green',
//         width: 1,
//       }),
//     }),
//     'MultiLineString': new Style({
//       stroke: new Stroke({
//         color: 'green',
//         width: 1,
//       }),
//     }),
//     'MultiPoint': new Style({
//       image: image,
//     }),
//     'MultiPolygon': new Style({
//       stroke: new Stroke({
//         color: 'yellow',
//         width: 1,
//       }),
//       fill: new Fill({
//         color: 'rgba(255, 255, 0, 0.1)',
//       }),
//     }),
//     'Polygon': new Style({
//       stroke: new Stroke({
//         color: 'blue',
//         lineDash: [4],
//         width: 3,
//       }),
//       fill: new Fill({
//         color: 'rgba(0, 0, 255, 0.1)',
//       }),
//     }),
//     'GeometryCollection': new Style({
//       stroke: new Stroke({
//         color: 'magenta',
//         width: 2,
//       }),
//       fill: new Fill({
//         color: 'magenta',
//       }),
//       image: new CircleStyle({
//         radius: 10,
//         fill: null,
//         stroke: new Stroke({
//           color: 'magenta',
//         }),
//       }),
//     }),
//     'Circle': new Style({
//       stroke: new Stroke({
//         color: 'red',
//         width: 2,
//       }),
//       fill: new Fill({
//         color: 'rgba(255,0,0,0.2)',
//       }),
//     }),
//   };
  
  
  
  
  
//   const StyleFunction = function(feature){
//     return styles[ feature.getGeometry().getType()]
//   }
//   const vectorSource =  new VectorSource( { features : new GeoJSON().readFeatures(geojsonObject)})
   
  
  
//   const vectorLayerbanih = new VectorLayer(
//    {
//   source: vectorSource,
//   style: StyleFunction,
  
//    }
//   )
  



//   const map = new Map({
//     target: "map",
//     layers: [
//       new TileLayer({
//         source: new OSM(),
//       }), vectorLayerbanih,
//     ],
//     view: new View({
//       center: [0,0],
//       zoom: 2,
//     }),
//   });

//   return () => {
//     map.setTarget(null);
//   };


// },[])

  return (
   <>
    {/* <div id="map"  ></div> */}

    {/* GeoJSONMap works correctly */}
    <GeoJSONMap /> 

    {/* <ParcelDisplay /> */}

    {/* <FinallyDisplay /> */}



   </>
  )
}

export default App
