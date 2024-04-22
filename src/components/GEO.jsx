import React, { useEffect, useState } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import GeoJSON from 'ol/format/GeoJSON';
import Feature from 'ol/Feature';
import Circle from 'ol/geom/Circle';
import { LineString } from 'ol/geom';
import axios from 'axios';



// 1. Load this geojson on map -- MOnday
//   2. Zoom in to parcel -- useeffect -- Monday
//   3. Draw edit and delete -- Wednsday
const GeoJSONMap = () => {

  useEffect(() => {
    const image = new CircleStyle({
      radius: 10,
      fill: null,
      stroke: new Stroke({ color: 'grey', width: 1 }),
    });

    const styles = {
      Point: new Style({
        image: image,
      }),
      LineString: new Style({
        stroke: new Stroke({
          color: 'green',
          width: 1,
        }),
      }),
      MultiLineString: new Style({
        stroke: new Stroke({
          color: 'green',
          width: 1,
        }),
      }),
      MultiPoint: new Style({
        image: image,
      }),
      MultiPolygon: new Style({
        stroke: new Stroke({
          color: 'red',
          width: 1,
        }),
        fill: new Fill({
          color: 'rgba(255, 255, 0, 0.1)',
        }),
      }),
      Polygon: new Style({
        stroke: new Stroke({
          color: 'blue',
          lineDash: [4],
          width: 3,
        }),
        fill: new Fill({
         
            color: 'rgba(0, 0, 255, 0.1)',
        }),
      }),
    //   GeometryCollection: new Style({
    //     stroke: new Stroke({
    //       color: 'magenta',
    //       width: 2,
    //     }),
    //     fill: new Fill({
    //       color: 'magenta',
    //     }),
    //     image: new CircleStyle({
    //       radius: 10,
    //       fill: null,
    //       stroke: new Stroke({
    //         color: 'magenta',
    //       }),
    //     }),
    //   }),
      Circle: new Style({
        stroke: new Stroke({
          color: 'green',
          width: 2,
        }),
        fill: new Fill({
          color: 'black',
        }),
      }),

    

    second_circle : new Style ({ stroke: new Stroke({ color:'blue', widht:5}), fill: new Fill({ color: "orange"})})
    };
   
    const styleFunction = function (feature) {
      return styles[feature.getGeometry().getType()];
    };

    // const geojsonObject = {
    //   type: 'FeatureCollection',
    //   crs: {
    //     type: 'name',
    //     properties: {
    //       name: 'EPSG:3857',
    //     },
    //   },
    //   features: [
    //     {
    //       type: 'Feature',
    //       geometry: {
    //         type: 'Point',
    //         coordinates: [0, 0],
    //       },
    //     },

    //     {
    //       type: 'Feature',
    //       geometry: {
    //         type: 'LineString',
    //         coordinates: [
    //           [4e6, -2e6],
    //           [8e6, 2e6],
    //         ],
    //       },
    //     },
    //        {
    //         type:'Feature',
    //         geometry:{
    //             type:'LineString',
    //             coordinates: [ [ 100, 200],[ 5e6,4e6],[30000,40000] ]
    //         }
    //        }
    //     ,
    //     {
    //       type: 'Feature',
    //       geometry: {
    //         type: 'LineString',
    //         coordinates: [
    //           [4e6, 2e6],
    //           [8e6, -2e6],
    //         ],
    //       },
    //     },
    //     {
    //       type: 'Feature',
    //       geometry: {
    //         type: 'Polygon',
    //         coordinates: [
    //           [
    //             [-5e6, -1e6],
    //             [-3e6, -1e6],
    //             [-4e6, 1e6],
    //             [-5e6, -1e6],
    //           ],
    //         ],
    //       },
    //     },
    //     // add new polygon practice 
    //     {
    //         type:'Feature',
    //         geometry:{
    //             type: 'Polygon',
    //             coordinates:[
    //                 [
    //                     [-4e6,-2e6],[-300,-4000],[-4000,-9000], [-2e6,-2e6]
    //                 ]
    //             ]
    //         }
    //     },
    //     {
    //       type: 'Feature',
    //       geometry: {
    //         type: 'MultiLineString',
    //         coordinates: [
    //           [
    //             [-1e6, -7.5e5],
    //             [-1e6, 7.5e5],
    //           ],
    //           [
    //             [1e6, -7.5e5],
    //             [1e6, 7.5e5],
    //           ],
    //           [
    //             [-7.5e5, -1e6],
    //             [7.5e5, -1e6],
    //           ],
    //           [
    //             [-7.5e5, 1e6],
    //             [7.5e5, 1e6],
    //           ],
    //         ],
    //       },
    //     },
    //     {
    //       type: 'Feature',
    //       geometry: {
    //         type: 'MultiPolygon',
    //         coordinates: [
    //           [
    //             // [
    //             //   [-5e6, 6e6],
    //             //   [-3e6, 6e6],
    //             //   [-3e6, 8e6],
    //             //   [-5e6, 8e6],
    //             //   [-5e6, 6e6],
    //             // ],
    //           ],
    //           [
    //             [
    //               [-2e6, 6e6],
    //               [0, 6e6],
    //               [0, 8e6],
    //               [-2e1, 8e6],
    //               [-2e6, 6e6],
    //             ],
    //           ],
    //           [
    //             [
    //               [1e6, 6e6],
    //               [3e6, 6e6],
    //               [3e6, 8e6],
    //               [1e6, 8e6],
    //               [1e6, 6e6],
    //             ],
    //           ],
    //           [
    //             [
    //               [1e5, 4e6],
    //               [3e6, 6e6],
    //               [3e6, 8e6],
    //               [1e6, 8e6],
    //               [1e5, 4e6],
    //             ],
    //           ],
    //         ],
    //       },
    //     },
    //     {
    //       type: 'Feature',
    //       geometry: {
    //         type: 'GeometryCollection',
    //         geometries: [
    //           {
    //             type: 'LineString',
    //             coordinates: [
    //               [-5e6, -5e6],
    //               [0, -5e6],
    //             ],
    //           },
    //           {
    //             type: 'Point',
    //             coordinates: [4e6, -5e6],
    //           },
    //           {
    //             type: 'Polygon',
    //             coordinates: [
    //               [
    //                 [1e6, -6e6],
    //                 [3e6, -6e6],
    //                 [2e6, -4e6],
    //                 [1e6, -6e6],
    //               ],
    //             ],
    //           },
    //         ],
    //       },
    //     },
    //   ],
    // };

    const vectorSource = new VectorSource({
      features: new GeoJSON().readFeatures(geojsonObject),
    });

   // create a new line and add into the feature

   const Linee = [ 
   
    [1e2,1e7], // start point 
    [2e6,0],  // mid point
    [3e5,0]  // end point 
    
  ];
   vectorSource.addFeature( new Feature( new LineString(Linee)))

   // [it contains centre of circle ], defines the radius

 vectorSource.addFeature( new Feature( new Circle([2e2,5e6],1e6)))

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: styleFunction,
    });

    const map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer,
      ],
      target: 'map',
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    return () => {
      map.setTarget(null);
    };
  }, []);

  return <div id="map" style={{ width: '100%', height: '100%' }} />;
};

export default GeoJSONMap;
