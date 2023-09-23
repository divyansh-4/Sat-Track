import React from "react";
import { useMemo } from "react";
import issImage from "./iss.png";
import antenna from "./antenna.png";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  PolylineF,
} from "@react-google-maps/api";

function SatelliteMap({ latitude, longitude, orbit, antennas }) {
  const center = useMemo(() => ({ lat: 0, lng: 0 }), []);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY || "APIKEY",
  });

  if (!isLoaded) return <div>Loading...</div>;

  const icon = {
    url: issImage,
    scaledSize: new window.google.maps.Size(76, 76), 
    anchor: new window.google.maps.Point(38, 38), 
  };
  const icon2 = {
    url: antenna,
    scaledSize: new window.google.maps.Size(76, 76), 
    anchor: new window.google.maps.Point(38, 38), 
  };

  return (
    <GoogleMap zoom={2.5} center={center} mapContainerClassName="map-container">
      <MarkerF position={{ lat: latitude, lng: longitude }} icon={icon} />
      {antennas &&
        antennas.map((point, index) => (
          <MarkerF
            key={index}
            position={{ lat: point.latitude, lng: point.longitude }}
            icon={icon2}
          />
        ))}
      {orbit.map((orbits, index) => (
        <PolylineF
          key={index}
          path={orbits.points.map((point) => ({
            lat: point.latitude,
            lng: point.longitude,
          }))}
          options={{
            strokeColor: orbits.col, 
            strokeOpacity: 1.0,
            strokeWeight: 4,
          }}
        />
      ))}
    </GoogleMap>
  );
}

export default SatelliteMap;

// const geoUrl =
// 'https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json';
// import {
//   ComposableMap,
//   Geographies,
//   Geography,
//   Marker,
// } from 'react-simple-maps';
//    <ComposableMap projection="geoMercator">
//        <Geographies geography={geoUrl}>
//          {({ geographies }) =>
//           geographies.map((geo) => (
//             <Geography key={geo.rsmKey} geography={geo} />
//           ))
//         }
//       </Geographies>
// {orbit && orbit.map((point, index) => (
//   <Marker
//     key={index}
//     coordinates={[point.longitude, point.latitude]}
//   >
//      <circle r={2} fill="#F53" />
//   </Marker>
// ))}
//       {antennas && antennas.map((point, index) => (
//   <Marker
//     key={index}
//     coordinates={[point.longitude, point.latitude]}
//   >
//   <image
//     x="-15"
//     y="-15"
//     width="30px"
//     height="30px"
//     xlinkHref={sat}
//   />
//   </Marker>
// ))}

//  {console.log(latitude)}
//  {console.log("11",longitude)}
//       <Marker coordinates={[longitude, latitude]}>
//         <image
//           x="-25"
//           y="-25"
//           width="50px"
//           height="50px"
//           xlinkHref={issImage}
//         />
//       </Marker>
//     </ComposableMap>
