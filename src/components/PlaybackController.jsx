import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faChevronLeft, faChevronRight, faRedo } from '@fortawesome/free-solid-svg-icons';

function PlaybackController({ onPlayPause, onNext, onPrev, onRestart, playing }) {
  const handleButtonClick = (callback) => {
    try {
      if (callback) callback();
    } catch (error) {
      console.error('Error in PlaybackController:', error);
    }
  };

  return (
    <div className="playback-controller flex space-x-4">
      <button
        className="control-button p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-500 focus:outline-none transition duration-300 ease-in-out"
        onClick={() => handleButtonClick(onPrev)}
        title="Previous"
      >
        <FontAwesomeIcon icon={faChevronLeft} className="text-lg" />
      </button>
      <button
        className="control-button p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-500 focus:outline-none transition duration-300 ease-in-out"
        onClick={() => handleButtonClick(onPlayPause)}
        title={playing ? "Pause" : "Play"}
      >
        <FontAwesomeIcon icon={playing ? faPause : faPlay} className="text-lg" />
      </button>
      <button
        className="control-button p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-500 focus:outline-none transition duration-300 ease-in-out"
        onClick={() => handleButtonClick(onNext)}
        title="Next"
      >
        <FontAwesomeIcon icon={faChevronRight} className="text-lg" />
      </button>
      <button
        className="control-button"
        onClick={() => handleButtonClick(onRestart)}
        title="Restart"
      >
        <FontAwesomeIcon icon={faRedo} className="text-lg" />
      </button>
    </div>
  );
}

export default PlaybackController;
