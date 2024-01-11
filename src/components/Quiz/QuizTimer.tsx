"use client";
import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

interface QuizTimerProps {
  time_duration: number;
}

const QuizTimer: React.FC<QuizTimerProps> = ({ time_duration }) => {
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div>
      <CountdownCircleTimer
        isPlaying
        duration={time_duration / 1000} // convert milliseconds to seconds
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[7, 5, 2, 0]}
        onComplete={() => console.log("Timer completed")}
        size={120}
        strokeWidth={6}

        // {({ remainingTime }) => remainingTime}
        // renderTime={(remainingTime:any) => formatTime(remainingTime)}
      >
        {/* renderTime={(remainingTime: any) => formatTime(remainingTime)}
         */}
          {({ remainingTime }) => formatTime(remainingTime)}
      </CountdownCircleTimer>
    </div>
  );
};

export default QuizTimer;
