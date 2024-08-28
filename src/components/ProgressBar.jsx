import React from 'react';

function ProgressBar({ currentTime, totalTime }) {
  const progress = (currentTime / totalTime) * 100;

  return (
    <div className="progress-bar-container" style={{ width: '100%', height: '10px', backgroundColor: '#e0e0e0', borderRadius: '5px', overflow: 'hidden' }}>
      <div className="progress-bar" style={{ width: `${progress}%`, height: '100%', backgroundColor: '#007bff', transition: 'width 0.2s ease' }}>
      </div>
    </div>
  );
}

export default ProgressBar;
