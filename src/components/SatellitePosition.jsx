import React, { useEffect, useState } from 'react';
import {
  twoline2satrec,
  propagate,
  gstime,
  eciToGeodetic,
} from 'satellite.js';
import SatelliteMap from './SatelliteMap';

const ISS_TLE =
  `1 25544U 98067A   23261.37754304  .00014387  00000-0  26521-3 0  9999
   2 25544  51.6416 226.9153 0005862  31.7166 102.3637 15.49379141416241`;

function SatellitePosition() {
  const [position, setPosition] = useState(null);
  const [orbitPoints, setOrbit] = useState([]);
  const [antennaPoints, setAntenna] = useState([]);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const antennae = [];

    for (let i = 0; i < 15; i++) {
      const latitude = Math.random() * 180 - 90;
      const longitude = Math.random() * 360 - 180;
      antennae.push({ latitude, longitude });
    }
    setAntenna(antennae);
  }, []);

  useEffect(() => {
    const satrec = twoline2satrec(
      ISS_TLE.split('\n')[0].trim(),
      ISS_TLE.split('\n')[1].trim()
    );

    const calculatePosition = (newDate) => {
      const positionAndVelocity = propagate(satrec, newDate);
      const gmst = gstime(newDate);
      const satellitePositions = eciToGeodetic(positionAndVelocity.position, gmst);
      setPosition(satellitePositions);
    };

    calculatePosition(date); 

    const calculatedPositions = [];
    const startDate = new Date();

    for (let i = 0; i < 10; i++) {
      const date = new Date(startDate.getTime() - i * 1 * 60 * 1000);

      const positionAndVelocity = propagate(satrec, date);
      const gmst = gstime(date);
      const satellitePosition = eciToGeodetic(positionAndVelocity.position, gmst);

      calculatedPositions.push({
        latitude: satellitePosition.latitude * (180 / Math.PI),
        longitude: satellitePosition.longitude * (180 / Math.PI),
      });
    }

    for (let i = 0; i < 662; i++) {
      const date = new Date(startDate.getTime() + i * 1 * 8 * 1000);

      const positionAndVelocity = propagate(satrec, date);
      const gmst = gstime(date);
      const satellitePosition = eciToGeodetic(positionAndVelocity.position, gmst);

      calculatedPositions.push({
        latitude: satellitePosition.latitude * (180 / Math.PI),
        longitude: satellitePosition.longitude * (180 / Math.PI),
      });
    }

    setOrbit(calculatedPositions);
  }, [date]);

  return (
    <div>
      <h1>Satellite Position</h1>
      {position && (
        <SatelliteMap
          latitude={parseFloat(position.latitude * (180 / Math.PI))}
          longitude={parseFloat(position.longitude * (180 / Math.PI))}
          orbit={orbitPoints}
          antennas={antennaPoints}
        />
      )}
    </div>
  );
}

export default SatellitePosition;
