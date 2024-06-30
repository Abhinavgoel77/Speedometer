import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './speedometer.css'; 

const socket = io('http://localhost:5000'); 

const Speedometer = () => {
  const [speed, setSpeed] = useState(0);

  useEffect(() => {
    socket.on('new-speed-data', (data) => {
        console.log("data",data);
      setSpeed(data.speed);
    });

    return () => {
      socket.off('new-speed-data');
    };
  }, []);

  return (
    <div className="speedometer">
      <h1>Speedometer</h1>
      <div className="speed-display">
        <h2>{speed} km/h</h2>
      </div>
    </div>
  );
};

export default Speedometer;
