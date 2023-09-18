// import React from 'react';
// import {
//   ComposableMap,
//   Geographies,
//   Geography,
//   Marker,
// } from 'react-simple-maps';
// import issImage from './iss.png';

// // Use the world-110m.json geography data for the world map
// const geoUrl =
//   'https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries-sans-antarctica.json';

// function SatelliteMap({ latitude, longitude, orbitPoints }) {
//   return (
    
//     <ComposableMap projection="geoMercator">

//       <Geographies geography={geoUrl}>
//         {({ geographies }) =>
//           geographies.map((geo) => (
//             <Geography key={geo.rsmKey} geography={geo} />
//           ))
//         }
//       </Geographies>
//       <Marker coordinates={[longitude,latitude]}>
//           <image
//           x="-12"
//           y="-12" 
//           width="24px"
//           height="24px"
//           xlinkHref={issImage}/>
//       </Marker>

//     </ComposableMap>
//   );
// }

// export default SatelliteMap;
import React from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps';
import issImage from './iss.png';

const geoUrl =
  'https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries-sans-antarctica.json';

function SatelliteMap({ latitude, longitude, orbit }) {
  return (
    <ComposableMap projection="geoMercator">
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography key={geo.rsmKey} geography={geo} />
          ))
        }
      </Geographies>
      
      {/* Plot markers for each orbit point */}
      {orbit && orbit.map((point, index) => (
        <Marker
          key={index}
          coordinates={[point.longitude, point.latitude]}
        >
           <circle r={5} fill="#F53" />
        </Marker>
      ))}

 {console.log(latitude)}
 {console.log("11",longitude)}
      {/* Plot marker for the satellite's current position */}
      <Marker coordinates={[longitude, latitude]}>
        <image
          x="-15"
          y="-15"
          width="30px"
          height="30px"
          xlinkHref={issImage}
        />
      </Marker>
    </ComposableMap>
  );
}

export default SatelliteMap;
