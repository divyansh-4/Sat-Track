import React, { useEffect, useState } from 'react';
import {
  twoline2satrec,
  propagate,
  gstime,
  eciToGeodetic,
} from 'satellite.js';
import SatelliteMap from './SatelliteMap';

const times=[{AOS:4.2,LOS:4.4},{AOS:4.6,LOS:4.8},{AOS:5.0,LOS:5.3}]

function SatellitePosition({TLE}) {
  const [position, setPosition] = useState(null);
  const [orbitPoints, setOrbit] = useState([]);
  const [antennaPoints, setAntenna] = useState([]);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setDate(new Date()), 4000);
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
      TLE.split('\n')[0].trim(),
      TLE.split('\n')[1].trim()
    );

    const calculatePosition = (newDate) => {
      const positionAndVelocity = propagate(satrec, newDate);
      const gmst = gstime(newDate);
      console.log(gmst);
      const satellitePositions = eciToGeodetic(positionAndVelocity.position, gmst);
      setPosition(satellitePositions);
    };

    calculatePosition(date); 
    const orb=[];
    const calculatedPositions = [];
    const startDate = new Date();

    for (let i = 59; i >-1; i--) {
      const date = new Date(startDate.getTime() - i * 1 * 8* 1000);

      const positionAndVelocity = propagate(satrec, date);
      const gmst = gstime(date);
      const satellitePosition = eciToGeodetic(positionAndVelocity.position, gmst);

      calculatedPositions.push({
        latitude: satellitePosition.latitude * (180 / Math.PI),
        longitude: satellitePosition.longitude * (180 / Math.PI),
      });
    }
    orb.push({points:calculatedPositions,col:"#0000FF"});
    const calculatedPositions2 = [];
    for (let i = 0; i < 662; i++) {
      const date = new Date(startDate.getTime() + i * 1 * 8 * 1000);

      const positionAndVelocity = propagate(satrec, date);
      const gmst = gstime(date);
      const satellitePosition = eciToGeodetic(positionAndVelocity.position, gmst);

      calculatedPositions2.push({
        latitude: satellitePosition.latitude * (180 / Math.PI),
        longitude: satellitePosition.longitude * (180 / Math.PI),

      });
    }
    orb.push({points:calculatedPositions2,col:"#FF0000"});
    
    setOrbit(orb);
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
