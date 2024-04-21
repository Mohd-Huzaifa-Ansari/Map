import React, { useState, useEffect } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import { Fill, Stroke, Style } from 'ol/style';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import GeoJSON from 'ol/format/GeoJSON';
import axios from 'axios';
import { transform } from 'ol/proj'; // Import the transform function

const GeoJSONMap = () => {
  const [geojsonObject, setGeojsonObject] = useState(null);

  const latLongToCoordinates = (coordinates) => {
    // Convert the latitude and longitude coordinates to projected coordinates
    const convertedCoordinates = coordinates.map((polygon) =>
      polygon.map((ring) =>
        ring.map((coord) =>
          transform([coord[0], coord[1]], 'EPSG:4326', 'EPSG:3857')
        )
      )
    );
    // Return a GeoJSON object with the converted coordinates
    return {
      type: 'Feature',
      geometry: {
        type: 'MultiPolygon',
        coordinates: convertedCoordinates,
      },
    };
  };

  useEffect(() => {
    axios.get('../../parcel.json')
      .then((res) => {
        console.log(res.data);
        // Convert latitude and longitude to coordinates
        const convertedGeoJSON = latLongToCoordinates(res.data.geometry.coordinates);
        // Update the state with the converted GeoJSON object
        setGeojsonObject(convertedGeoJSON);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    if (geojsonObject) {
      const vectorSource = new VectorSource({
        features: new GeoJSON().readFeatures(geojsonObject),
      });

      const vectorLayer = new VectorLayer({
        source: vectorSource,
        style: new Style({
          stroke: new Stroke({
            color: 'blue',
            width: 2,
          }),
          fill: new Fill({
            color: 'rgba(0, 0, 255, 0.1)',
          }),
        }),
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
    }
  }, [geojsonObject]);

  return <div id="map" style={{ width: '100%', height: '100%' }} />;
};

export default GeoJSONMap;
