import React from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps';
import issImage from './iss.png';
import sat from './satellite.png';

const geoUrl =
  'https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries-sans-antarctica.json';

function SatelliteMap({ latitude, longitude, orbit,satellites }) {

  return (
    <ComposableMap projection="geoMercator">
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography key={geo.rsmKey} geography={geo} />
          ))
        }
      </Geographies>
      {orbit && orbit.map((point, index) => (
        <Marker
          key={index}
          coordinates={[point.longitude, point.latitude]}
        >
           <circle r={2} fill="#F53" />
        </Marker>
      ))}
            {satellites && satellites.map((point, index) => (
        <Marker
          key={index}
          coordinates={[point.longitude, point.latitude]}
        >
        <image
          x="-15"
          y="-15"
          width="30px"
          height="30px"
          xlinkHref={sat}
        />
        </Marker>
      ))}

 {console.log(latitude)}
 {console.log("11",longitude)}
      <Marker coordinates={[longitude, latitude]}>
        <image
          x="-25"
          y="-25"
          width="50px"
          height="50px"
          xlinkHref={issImage}
        />
      </Marker>
    </ComposableMap>
  );
}

export default SatelliteMap;
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