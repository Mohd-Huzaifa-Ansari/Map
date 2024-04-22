import { transform } from "ol/proj";
// import calculateArea from "./CalculateArea";

const latLongToCoordinates = (coordinates, setPolygonList) => {
  const finalCoordinates = [];
  for (let i = 0; i < coordinates.length; i++) {
    const polygonWithHolesLatLong = coordinates[i];
    const polygonWithHolesCoords = [];
    for (let j = 0; j < polygonWithHolesLatLong.length; j++) {
      const latLong = polygonWithHolesLatLong[j];
      var coords = [];
      for (let k = 0; k < latLong.length; k++) {
        var singlePolygon = latLong[k];
        if (singlePolygon)
          coords.push(
            transform(
              [parseFloat(singlePolygon[0]), parseFloat(singlePolygon[1])],
              "EPSG:4326",
              "EPSG:3857"
            )
          );
      }
      polygonWithHolesCoords.push(coords);
    }
    finalCoordinates.push({
      id: i + 1,
      data: polygonWithHolesCoords,
      visible: true,
    //   measurement: calculateArea(polygonWithHolesCoords),
    });
  }
  setPolygonList(finalCoordinates);
};

export default latLongToCoordinates;
