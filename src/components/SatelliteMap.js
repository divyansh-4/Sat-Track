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
