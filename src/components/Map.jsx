
import React, { useEffect, useRef, useState } from 'react';
import Map from 'ol/Map';
import Overlay from 'ol/Overlay';
import View from 'ol/View';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { LineString, Point, Polygon } from 'ol/geom';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import Draw from 'ol/interaction/Draw';
import { getArea, getLength } from 'ol/sphere';
import { unByKey } from 'ol/Observable';

const MapComponent = () => {
  const mapRef = useRef(null);
  const typeSelectRef = useRef(null);
  const [draw, setDraw] = useState(null);

  useEffect(() => {
    const raster = new TileLayer({
      source: new OSM(),
    });

    const source = new VectorSource();

    const vector = new VectorLayer({
      source: source,
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)',
        }),
        stroke: new Stroke({
          color: '#ffcc33',
          width: 2,
        }),
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({
            color: '#ffcc33',
          }),
        }),
      }),
    });

    let sketch;
    let helpTooltipElement;
    let helpTooltip;
    let measureTooltipElement;
    let measureTooltip;

    const continuePolygonMsg = 'Click to continue drawing the polygon';
    const continueLineMsg = 'Click to continue drawing the line';

    const pointerMoveHandler = (evt) => {
      if (evt.dragging) {
        return;
      }
      let helpMsg = 'Click to start drawing';

      if (sketch) {
        const geom = sketch.getGeometry();
        if (geom instanceof Polygon) {
          helpMsg = continuePolygonMsg;
        } else if (geom instanceof LineString) {
          helpMsg = continueLineMsg;
        }
      }

      helpTooltipElement.innerHTML = helpMsg;
      helpTooltip.setPosition(evt.coordinate);

      helpTooltipElement.classList.remove('hidden');
    };

    const map = new Map({
      layers: [raster, vector],
      target: mapRef.current,
      view: new View({
        center: [-11000000, 4600000],
        zoom: 15,
      }),
    });

    map.on('pointermove', pointerMoveHandler);

    map.getViewport().addEventListener('mouseout', function () {
      helpTooltipElement.classList.add('hidden');
    });

    const typeSelect = typeSelectRef.current;

    const formatLength = function (line) {
      const length = getLength(line);
      let output;
      if (length > 100) {
        output = Math.round((length / 1000) * 100) / 100 + ' ' + 'km';
      } else {
        output = Math.round(length * 100) / 100 + ' ' + 'm';
      }
      return output;
    };

    const formatArea = function (polygon) {
      const area = getArea(polygon);
      let output;
      if (area > 10000) {
        output = Math.round((area / 1000000) * 100) / 100 + ' ' + 'km²';
      } else {
        output = Math.round(area * 100) / 100 + ' ' + 'm²';
      }
      return output;
    };

    const style = new Style({
      fill: new Fill({
        color: 'rgba(255, 255, 255, 0.2)',
      }),
      stroke: new Stroke({
        color: 'rgba(0, 0, 0, 0.5)',
        lineDash: [10, 10],
        width: 2,
      }),
      image: new CircleStyle({
        radius: 5,
        stroke: new Stroke({
          color: 'rgba(0, 0, 0, 0.7)',
        }),
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)',
        }),
      }),
    });

    const addInteraction = (type) => {
      if (draw) {
        map.removeInteraction(draw);
      }
      
      const drawType = type === 'polygon' ? 'Polygon' : type === 'point' ? 'Point' : 'LineString';
    
      const newDraw = new Draw({
        source: source,
        type: drawType,
        style: function (feature) {
          const geometryType = feature.getGeometry().getType();
          if (geometryType === drawType || geometryType === 'Point') {
            return style;
          }
        },
      });
    
      map.addInteraction(newDraw);
      setDraw(newDraw);
    
      createMeasureTooltip();
      createHelpTooltip();
    
      let listener;
      newDraw.on('drawstart', function (evt) {
        sketch = evt.feature;
    
        let tooltipCoord = evt.coordinate;
    
        listener = sketch.getGeometry().on('change', function (evt) {
          const geom = evt.target;
          let output;
          if (geom instanceof Polygon) {
            output = formatArea(geom);
            tooltipCoord = geom.getInteriorPoint().getCoordinates();
          } else if (geom instanceof LineString) {
            output = formatLength(geom);
            tooltipCoord = geom.getLastCoordinate();
          } else if (geom instanceof Point) {
            output = 'Point';
            tooltipCoord = geom.getCoordinates();
          }
          measureTooltipElement.innerHTML = output;
          measureTooltip.setPosition(tooltipCoord);
        });
      });
    
      newDraw.on('drawend', function () {
        measureTooltipElement.className = 'ol-tooltip ol-tooltip-static';
        measureTooltip.setOffset([0, -7]);
        sketch = null;
        measureTooltipElement = null;
        createMeasureTooltip();
        unByKey(listener);
      });
    };
    

    const createHelpTooltip = () => {
      if (helpTooltipElement) {
        helpTooltipElement.parentNode.removeChild(helpTooltipElement);
      }
      helpTooltipElement = document.createElement('div');
      helpTooltipElement.className = 'ol-tooltip hidden';
      helpTooltip = new Overlay({
        element: helpTooltipElement,
        offset: [15, 0],
        positioning: 'center-left',
      });
      map.addOverlay(helpTooltip);
    };

    const createMeasureTooltip = () => {
      if (measureTooltipElement) {
        measureTooltipElement.parentNode.removeChild(measureTooltipElement);
      }
      measureTooltipElement = document.createElement('div');
      measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';
      measureTooltip = new Overlay({
        element: measureTooltipElement,
        offset: [0, -15],
        positioning: 'bottom-center',
        stopEvent: false,
        insertFirst: false,
      });
      map.addOverlay(measureTooltip);
    };

    typeSelect.onchange = function () {
      addInteraction(typeSelect.value);
    };


    addInteraction('line');
  }, []);

  return (
    <div>
      <div
        id="map"
        ref={mapRef}
        style={{ width: '100%', height: '80vh', border: '1px solid black' ,overflow:'hidden'}}
      ></div>
      <div id="toolbar" style={{ width: '100%', height: "20vh", margin: '10px 0',display:"flex",justifyContent:"center",alignItems:"center" ,flexDirection:"column"}}>
        <h1 style={{color:"white" ,fontSize:"20px",fontWeight:"500", marginBottom:"10px"}}>Select the type to draw!!</h1>
        <select id="type" ref={typeSelectRef} style={{ padding: '10px', fontSize: '16px',borderRadius:"5px",color:"black" }}>
          <option value="line">LineString</option>
          <option value="polygon">Polygon</option>
          <option value="point">Point</option>
        </select>
      </div>
    </div>
  );
};

export default MapComponent;