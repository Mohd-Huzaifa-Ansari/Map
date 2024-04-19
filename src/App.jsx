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


function App() {


//  useEffect(()=>{
//   const image = new Circle({
//     radius: 5,
//     fill: null,
//     stroke: new Stroke({color: 'red', width: 1}),
//   });

//   const geojsonObject = {
//     'type': 'FeatureCollection',
//     'crs': {
//       'type': 'name',
//       'properties': {
//         'name': 'EPSG:3857',
//       },
//     },
//     'features': [
//       {
//         'type': 'Feature',
//         'geometry': {
//           'type': 'Point',
//           'coordinates': [0, 0],
//         },
//       },
//       {
//         'type': 'Feature',
//         'geometry': {
//           'type': 'LineString',
//           'coordinates': [
//             [4e6, -2e6],
//             [8e6, 2e6],
//           ],
//         },
//       },
     
//       {
//         'type': 'Feature',
//         'geometry': {
//           'type': 'Polygon',
//           'coordinates': [
//             [
//               [-5e6, -1e6],
//               [-3e6, -1e6],
//               [-4e6, 1e6],
//               [-5e6, -1e6],
//             ],
//           ],
//         },
//       },
//       {
//         'type': 'Feature',
//         'geometry': {
//           'type': 'MultiLineString',
//           'coordinates': [
//             [
//               [-1e6, -7.5e5],
//               [-1e6, 7.5e5],
//             ],
//             [
//               [1e6, -7.5e5],
//               [1e6, 7.5e5],
//             ],
//             [
//               [-7.5e5, -1e6],
//               [7.5e5, -1e6],
//             ],
//             [
//               [-7.5e5, 1e6],
//               [7.5e5, 1e6],
//             ],
//           ],
//         },
//       },
//       {
//         'type': 'Feature',
//         'geometry': {
//           'type': 'MultiPolygon',
//           'coordinates': [
//             [
//               [
//                 [-5e6, 6e6],
//                 [-3e6, 6e6],
//                 [-3e6, 8e6],
//                 [-5e6, 8e6],
//                 [-5e6, 6e6],
//               ],
//             ],
//             [
//               [
//                 [-2e6, 6e6],
//                 [0, 6e6],
//                 [0, 8e6],
//                 [-2e6, 8e6],
//                 [-2e6, 6e6],
//               ],
//             ],
//             [
//               [
//                 [1e6, 6e6],
//                 [3e6, 6e6],
//                 [3e6, 8e6],
//                 [1e6, 8e6],
//                 [1e6, 6e6],
//               ],
//             ],
//           ],
//         },
//       },
//       {
//         'type': 'Feature',
//         'geometry': {
//           'type': 'GeometryCollection',
//           'geometries': [
//             {
//               'type': 'LineString',
//               'coordinates': [
//                 [-5e6, -5e6],
//                 [0, -5e6],
//               ],
//             },
//             {
//               'type': 'Point',
//               'coordinates': [4e6, -5e6],
//             },
//             {
//               'type': 'Polygon',
//               'coordinates': [
//                 [
//                   [1e6, -6e6],
//                   [3e6, -6e6],
//                   [2e6, -4e6],
//                   [1e6, -6e6],
//                 ],
//               ],
//             },
//           ],
//         },
//       },
//     ],
//   };
  
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
   
//   vectorSource.addFeature( new Feature(new Circle([5e6,7e6],1e6)));
  
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
    <GeoJSONMap />
   </>
  )
}

export default App