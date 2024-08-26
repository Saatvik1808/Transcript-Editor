import { useState, useEffect, useRef } from 'react';

export function usePlayback(transcript) {
  const [playing, setPlaying] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const totalTime = transcript.reduce((total, word) => total + word.duration, 0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (playing) {
      const wordDuration = Math.max(transcript[currentWordIndex].duration, 100);

      intervalRef.current = setInterval(() => {
        setCurrentTime((prevTime) => {
          const nextTime = prevTime + 10;
          const wordEndTime = transcript[currentWordIndex].start_time + wordDuration;

          if (nextTime >= wordEndTime) {
            const nextIndex = currentWordIndex + 1;
            if (nextIndex < transcript.length) {
              setCurrentWordIndex(nextIndex);
              return transcript[nextIndex].start_time; 
            } else {
              clearInterval(intervalRef.current);
              setPlaying(false);
              return totalTime;
            }
          }

          return nextTime;
        });
      }, 10); 
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [playing, currentWordIndex, transcript, totalTime]);

  const handlePlayPause = () => {
    setPlaying((prevPlaying) => !prevPlaying);
  };

  const handleNext = () => {
    if (currentWordIndex < transcript.length - 1) {
      const nextIndex = currentWordIndex + 1;
      setCurrentWordIndex(nextIndex);
      setCurrentTime(transcript[nextIndex].start_time);
    }
  };

  const handlePrev = () => {
    if (currentWordIndex > 0) {
      const prevIndex = currentWordIndex - 1;
      setCurrentWordIndex(prevIndex);
      setCurrentTime(transcript[prevIndex].start_time);
    }
  };

  const handleRestart = () => {
    setPlaying(false);
    setCurrentWordIndex(0);
    setCurrentTime(0);
  };

  return {
    playing,
    currentWordIndex,
    handlePlayPause,
    handleNext,
    handlePrev,
    handleRestart,
    currentTime,
    totalTime
  };
}
