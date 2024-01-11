"use client";
import React, { useEffect, useState } from "react";

export default function QuizAside({
  time_duration,
  questionLength,
}: {
  time_duration: any;
  questionLength: any;
}) {
  // const initialTime = 20 * 60; // 20 minutes in seconds
  const initialTime = Number(time_duration); // 20 minutes in seconds
  const [timeRemaining, setTimeRemaining] = useState(initialTime);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (timeRemaining > 0) {
        setTimeRemaining((prevTime) => prevTime - 1);
      } else {
        clearInterval(intervalId); // Stop the interval when time reaches 0
      }
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [timeRemaining]); // Re-run effect whenever timeRemaining changes

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

  // const formattedTime = currentTime.toLocaleTimeString();
  return (
    <div className="text-center">
      <h1 className="text-2xl animate-pulse font-bold">Total question</h1>
    <div className="w-full mx-auto flex items-center justify-center">
      <div className="text-center bg-white shadow flex flex-col items-center justify-center gap-2 p-8 rounded">
        <div className="h-[6rem] w-[6rem] p-[1rem] border-2 border-slate-900 rounded-full  flex justify-center items-center">
          <button className="text-3xl font-bold">{questionLength}</button>
        </div>
        <h4 className="text-xl font-[500]">Questions</h4>
      </div>
      {/* <div className="text-center bg-white shadow flex flex-col items-center justify-center gap-2 p-8 rounded">
        <div className="h-[6rem] w-[6rem] p-[1rem] border-2 border-slate-900 rounded-full  flex justify-center items-center">
          <button className="text-3xl font-bold animate-pulse">{formattedTime}</button>
        </div>
        <h4 className="text-xl font-[500]">Minute</h4>
      </div> */}
    </div>
    </div>
  );
}
