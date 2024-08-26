import React, { useState, useEffect } from 'react';
import './Timer.css'; 

function Timer({ currentTime }) {
  const [displayTime, setDisplayTime] = useState(currentTime);

  useEffect(() => {
    setDisplayTime(currentTime);
  }, [currentTime]);

  const formatTime = (ms) => {
    if (typeof ms !== 'number' || ms < 0) return '0:00.00';
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((ms % 1000) / 10);

    return `${minutes}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="timer-container">
      {formatTime(displayTime)}
    </div>
  );
}

export default Timer;
