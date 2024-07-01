import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import ReactSpeedometer from "react-d3-speedometer";
import './speedometer.css'; // Import the CSS file

const socket = io('http://localhost:5000');

const SpeedometerComponent = () => {
  const [speed, setSpeed] = useState(0);

  useEffect(() => {
    socket.on('new-speed-data', (data) => {
      setSpeed(data.speed);
    });

    // Clean up the effect
    return () => {
      socket.off('new-speed-data');
    };
  }, []);

  return (
    <div>
         <h1>Speedometer</h1>
    <div className="speedometer-container">
      <ReactSpeedometer
        className="speedometer"
        maxValue={200}
        value={speed}
        needleColor="red"
        startColor="green"
        segments={10}
        endColor="red"
        textColor="black"
      />
    </div>
    </div>
  );
};

export default SpeedometerComponent;
