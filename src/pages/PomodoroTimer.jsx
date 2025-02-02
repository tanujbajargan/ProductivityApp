import React, { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import toast, { Toaster } from 'react-hot-toast';

const PomodoroTimer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [key, setKey] = useState(0);
  const [duration, setDuration] = useState(25);
  const [breakKey, setBreakKey] = useState(0);
  const [isBreakPlaying, setIsBreakPlaying] = useState(false);
  const [breakDuration, setBreakDuration] = useState(5);

  const handleComplete = (isBreak) => {
    const message = isBreak 
      ? "Break Time Complete! Time to get back to work!"
      : "Pomodoro Session Complete! Time for a break!";
      
    toast(message, {
      icon: isBreak ? '💪' : '☕',
      duration: 4000,
      style: {
        background: isBreak ? '#f0f9ff' : '#fff7ed',
        color: '#004777',
        padding: '16px',
        borderRadius: '8px',
      },
    });
    return { shouldRepeat: false };
  };

  const renderTime = ({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    return (
      <div className="timer">
        <div className="value">
          {`${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`}
        </div>
        <div className="progress-label">Remaining Time</div>
      </div>
    );
  };

  const handleReset = () => {
    setKey((prevKey) => prevKey + 1);
    setIsPlaying(false);
  };

  const handleBreakReset = () => {
    setBreakKey((prevKey) => prevKey + 1);
    setIsBreakPlaying(false);
  };

  return (
    <div className="pomodoro-container">
      <Toaster position="top-right" />
      
      <div className="pomodoro-section timer-transition">
        <h1>Pomodoro Timer</h1> 
        <div className="timer-wrapper">
          <div className="timer-slider">
            <label className="timer-label">
              Duration: {duration} minutes
            </label>
            <input
              type="range"
              min="5"
              max="30"
              value={duration}
              onChange={(e) => {
                setDuration(Number(e.target.value));
                handleReset();
              }}
            />
          </div>

          <div className="timer">
            <CountdownCircleTimer
              key={key}
              isPlaying={isPlaying}
              duration={duration * 60}
              colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
              colorsTime={[duration * 60, duration * 30, duration * 10, 0]}
              size={200}
              strokeWidth={6}
              onComplete={() => handleComplete(false)}
            >
              {renderTime}
            </CountdownCircleTimer>
          </div>
          <div className="controls">
            <button onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? "Pause" : "Start"}
            </button>
            <button onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>
      </div>

      <div className="pomodoro-section timer-transition">
        <h1>Break Timer</h1>  
        <div className="timer-wrapper">
          <div className="timer-slider">
            <label className="timer-label">
              Break Duration: {breakDuration} minutes
            </label>
            <input
              type="range"
              min="5"
              max="15"
              value={breakDuration}
              onChange={(e) => {
                setBreakDuration(Number(e.target.value));
                handleBreakReset();
              }}
            />
          </div>
          <div className="timer">
            <CountdownCircleTimer
              key={breakKey}
              isPlaying={isBreakPlaying}
              duration={breakDuration * 60}
              colors={["#004777"]}
              size={120}
              strokeWidth={0}
              onComplete={() => handleComplete(true)}
            >
              {renderTime}
            </CountdownCircleTimer>
          </div>
          <div className="controls">
            <button onClick={() => setIsBreakPlaying(!isBreakPlaying)}>
              {isBreakPlaying ? "Pause Break" : "Start Break"}
            </button>
            <button onClick={handleBreakReset}>
              Reset Break
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;