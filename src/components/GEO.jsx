import React, { useState, useEffect, useRef } from "react";
import "ol/ol.css";
import { transform } from 'ol/proj';
import Map from "ol/Map";
import View from "ol/View";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
import { OSM, Vector as VectorSource } from "ol/source";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import GeoJSON from "ol/format/GeoJSON";
import Feature from "ol/Feature";
import Circle from "ol/geom/Circle";
import { LineString } from "ol/geom";
import axios from "axios";

// 1. Load this geojson on map -- MOnday
//   2. Zoom in to parcel -- useeffect -- Monday
//   3. Draw edit and delete -- Wednsday

const GeoJSONMap = () => {
  //  const [geojsonObject, setGeojsonObject] = useState([]);
  //  const [newdata,setnewdata] = useState([]);
  //  const mydiv = useRef(null)
   
  //  useEffect(()=>{
  //   axios.get("/api/parcel")
  //   .then((res) => {
  //     //  console.log(res.data,"get response");
  //     setGeojsonObject(res.data);
  //     // setnewdata(res.data)
     
  //   })
  //   .catch((e) => {
  //     console.log(e);
  //   });
           
  //  },[])

  




  useEffect(() => {

    
      // axios
      //   .get("../../parcel.json")
      //   .then((res) => {
      //      console.log(res.data,"get response");


      //     //const data = JSON.parse(res.data);
      //     //  setparcelData(res.data)
      //     setGeojsonObject(res.data);
      //     console.log(geojsonObject,"afterrrr set response");
      //   })
      //   .catch((e) => {
      //     console.log(e);
      //   });
    // console.log(geojsonObject)

    const image = new CircleStyle({
      radius: 10,
      fill: null,
      stroke: new Stroke({ color: "grey", width: 1 }),
    });

    const styles = {
      Point: new Style({
        image: image,
      }),
      LineString: new Style({
        stroke: new Stroke({
          color: "green",
          width: 1,
        }),
      }),
      MultiLineString: new Style({
        stroke: new Stroke({
          color: "green",
          width: 1,
        }),
      }),
      MultiPoint: new Style({
        image: image,
      }),
      MultiPolygon: new Style({
        stroke: new Stroke({
          color: "red",
          width: 1,
        }),
        fill: new Fill({
          color: "rgba(255, 255, 0, 0.1)",
        }),
      }),
      Polygon: new Style({
        stroke: new Stroke({
          color: "blue",
          lineDash: [4],
          width: 3,
        }),
        fill: new Fill({
          color: "rgba(0, 0, 255, 0.1)",
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
          color: "green",
          width: 2,
        }),
        fill: new Fill({
          color: "black",
        }),
      }),

      second_circle: new Style({
        stroke: new Stroke({ color: "blue", widht: 5 }),
        fill: new Fill({ color: "orange" }),
      }),
    };

    const styleFunction = function (feature) {
      return styles[feature.getGeometry().getType()];
    };

    const geojsonObject = {
      type: "FeatureCollection",
      crs: {
        type: "name",
        properties: {
          name: "EPSG:3857",
        },
      },
      features: [
        // {
        //   type: "Feature",
        //   geometry: {
        //     type: "Point",
        //     coordinates: [0, 0],
        //   },
        // },

        // {
        //   type: "Feature",
        //   geometry: {
        //     type: "LineString",
        //     coordinates: [
        //       [4e6, -2e6],
        //       [8e6, 2e6],
        //     ],
        //   },
        // },
        // {
        //   type: "Feature",
        //   geometry: {
        //     type: "LineString",
        //     coordinates: [
        //       [100, 200],
        //       [5e6, 4e6],
        //       [30000, 40000],
        //     ],
        //   },
        // },
        // {
        //   type: "Feature",
        //   geometry: {
        //     type: "LineString",
        //     coordinates: [
        //       [4e6, 2e6],
        //       [8e6, -2e6],
        //     ],
        //   },
        // },
        // {
        //   type: "Feature",
        //   geometry: {
        //     type: "Polygon",
        //     coordinates: [
        //       [
        //         [-5e6, -1e6],
        //         [-3e6, -1e6],
        //         [-4e6, 1e6],
        //         [-5e6, -1e6],
        //       ],
        //     ],
        //   },
        // },
        // // add new polygon practice
        // {
        //   type: "Feature",
        //   geometry: {
        //     type: "Polygon",
        //     coordinates: [
        //       [
        //         [-4e6, -2e6],
        //         [-300, -4000],
        //         [-4000, -9000],
        //         [-2e6, -2e6],
        //       ],
        //     ],
        //   },
        // },
        // {
        //   type: "Feature",
        //   geometry: {
        //     type: "MultiLineString",
        //     coordinates: [
        //       [
        //         [-1e6, -7.5e5],
        //         [-1e6, 7.5e5],
        //       ],
        //       [
        //         [1e6, -7.5e5],
        //         [1e6, 7.5e5],
        //       ],
        //       [
        //         [-7.5e5, -1e6],
        //         [7.5e5, -1e6],
        //       ],
        //       [
        //         [-7.5e5, 1e6],
        //         [7.5e5, 1e6],
        //       ],
        //     ],
        //   },
        // },
        // {
        //   type: "Feature",
        //   geometry: {
        //     type: "MultiPolygon",
        //     coordinates: [
        //       [
        //         // [
        //         //   [-5e6, 6e6],
        //         //   [-3e6, 6e6],
        //         //   [-3e6, 8e6],
        //         //   [-5e6, 8e6],
        //         //   [-5e6, 6e6],
        //         // ],
        //       ],
        //       [
        //         [
        //           [-2e6, 6e6],
        //           [0, 6e6],
        //           [0, 8e6],
        //           [-2e1, 8e6],
        //           [-2e6, 6e6],
        //         ],
        //       ],
        //       [
        //         [
        //           [1e6, 6e6],
        //           [3e6, 6e6],
        //           [3e6, 8e6],
        //           [1e6, 8e6],
        //           [1e6, 6e6],
        //         ],
        //       ],
        //       [
        //         [
        //           [1e5, 4e6],
        //           [3e6, 6e6],
        //           [3e6, 8e6],
        //           [1e6, 8e6],
        //           [1e5, 4e6],
        //         ],
        //       ],
        //     ],
        //   },
        // },
        // {
        //   type: "Feature",
        //   geometry: {
        //     type: "GeometryCollection",
        //     geometries: [
        //       {
        //         type: "LineString",
        //         coordinates: [
        //           [-5e6, -5e6],
        //           [0, -5e6],
        //         ],
        //       },
        //       {
        //         type: "Point",
        //         coordinates: [4e6, -5e6],
        //       },
        //       {
        //         type: "Polygon",
        //         coordinates: [
        //           [
        //             [1e6, -6e6],
        //             [3e6, -6e6],
        //             [2e6, -4e6],
        //             [1e6, -6e6],
        //           ],
        //         ],
        //       },
        //     ],
        //   },
        // },

        {
          type: "Feature",
          geometry: {
            type: "MultiPolygon",
            // coordinates: [
            //   [
            //     [
            //       [77e4, 38e5],
            //       [-77.30523, 38.94873899999999],
            //       [-77.305222, 38.948893],
            //       [-77.305751, 38.948908000000046],
            //       [-77.30595100000001, 38.94900799999999],
            //       [-77.306057, 38.948879999999974],
            //       [-77.306063, 38.94875999999999],
            //       [-77.306684, 38.948756],
            //       [-77.306824, 38.94880599999996],
            //       [-77.307412, 38.948792999999995],
            //       [-77.308165, 38.948826000000025],
            //       [-77.30832, 38.94885099999999],
            //       [-77.308461, 38.948835],
            //       [-77.308399, 38.95064099999999],
            //       [-77.307205, 38.950563999999986],
            //       [-77.307108, 38.951628],
            //       [-77.305287, 38.951584999999994],
            //       [-77.305273, 38.951536000000004],
            //       [-77.304556, 38.94870800000001],
            //     ],
            //   ],
            // ],

            coordinates: 
            [
              [
                  [
                      [
                          -77.304556,
                          38.94870800000001
                      ],
                      [
                          -77.30523,
                          38.94873899999999
                      ],
                      [
                          -77.305222,
                          38.948893
                      ],
                      [
                          -77.305751,
                          38.948908000000046
                      ],
                      [
                          -77.30595100000001,
                          38.94900799999999
                      ],
                      [
                          -77.306057,
                          38.948879999999974
                      ],
                      [
                          -77.306063,
                          38.94875999999999
                      ],
                      [
                          -77.306684,
                          38.948756
                      ],
                      [
                          -77.306824,
                          38.94880599999996
                      ],
                      [
                          -77.307412,
                          38.948792999999995
                      ],
                      [
                          -77.308165,
                          38.948826000000025
                      ],
                      [
                          -77.30832,
                          38.94885099999999
                      ],
                      [
                          -77.308461,
                          38.948835
                      ],
                      [
                          -77.308399,
                          38.95064099999999
                      ],
                      [
                          -77.307205,
                          38.950563999999986
                      ],
                      [
                          -77.307108,
                          38.951628
                      ],
                      [
                          -77.305287,
                          38.951584999999994
                      ],
                      [
                          -77.305273,
                          38.951536000000004
                      ],
                      [
                          -77.304556,
                          38.94870800000001
                      ]
                  ]
              ]
          ]
            
          },
        },
      ],
    };

    console.log(geojsonObject,"this getting")

    const vectorSource = new VectorSource({
      features: new GeoJSON().readFeatures(geojsonObject, {
        dataProjection: "EPSG:4326",
        featureProjection: "EPSG:3857",
      }),
    });

    // create a new line and add into the feature

    // const Linee = [
    //   [1e2, 1e7], // start point
    //   [2e6, 0], // mid point
    //   [3e5, 0], // end point
    // ];
    // vectorSource.addFeature(new Feature(new LineString(Linee)));

    // [it contains centre of circle ], defines the radius

    // vectorSource.addFeature(new Feature(new Circle([2e2, 5e6], 1e6)));

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
      target: "map",
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    map
      .getView()
      .animate(
        { zoom: 17 },
        { duration: 1000 },
        {
          center: transform(
            [-77.3065055, 
              38.9499497],
            "EPSG:4326",
            "EPSG:3857"
          ),
        }
      );
  //  map.setTarget(mydiv.current)
   // useEffect(() => {
  //   console.log(geojsonObject, "after set response")
  // }, [geojsonObject])
    return () => {
      map.setTarget(null);
    };
  }, []);
  //  useEffect(() => {
  //   console.log(geojsonObject, "after set response")
  // }, [geojsonObject])

 

  return <div id="map"   style={{ width: "100%", height: "100%" }} />;
};

export default GeoJSONMap;
