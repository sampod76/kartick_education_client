"use client";
import { addAnswer } from "@/redux/features/quizSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import React, { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

interface QuizTimerProps {
  time_duration: number;
  quiz: any;
  index: number;
  submittedDefaultData: any;
}

const QuizTimer: React.FC<QuizTimerProps> = ({
  time_duration = 10000,
  quiz,

  index,
  submittedDefaultData,
}) => {
  //   console.log(time_duration, "ttttttttttttt");

  const dispatch = useAppDispatch();

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const { userAnswers } = useAppSelector((state: any) => state.quiz);

  const currentData = userAnswers?.find(
    (answer: any) => answer?._id === quiz?._id
  );

  //   const [isTimeUp,setIsTimeUp] = useState(false)

  const OnFinishTimeUP = () => {
    console.log("finished time");

    if (currentData) {
      // Check if the object is extensible
      if (Object.isExtensible(currentData)) {
        currentData.is_time_up = true;
        dispatch(addAnswer(currentData));
      } else {
        // If not extensible, create a new object with the desired properties
        const newData = { ...currentData, is_time_up: true };
        dispatch(addAnswer(newData));
      }
    } else {
      dispatch(
        addAnswer({
          index: index + 1,
          answer: null,
          title: quiz?.title,
          _id: quiz?._id,
          type: quiz?.type,
          serialNumber: quiz?.serialNumber,
          is_time_up: true,
        })
      );
    }
  };

  // console.log(submittedDefaultData)

  //   const [updatedTime, setUpdatedTime] = useState<number | null>(null);

  //   useEffect(() => {
  //     if (updatedTime !== null && currentData) {
  //       dispatch(addAnswer({ ...currentData, usedTime: updatedTime }));
  //     }
  //   }, [updatedTime, currentData, dispatch]);

  return (
    <div>
      <CountdownCircleTimer
        isPlaying={(submittedDefaultData?.singleQuiz || currentData?.is_time_up) ? false : true}
        duration={
          currentData?.usedTime ? currentData?.usedTime : time_duration / 1000
        } // convert milliseconds to seconds
        colors={["#5371FF", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[7, 5, 2, 0]}
        onComplete={() => OnFinishTimeUP()}
        size={120}
        strokeWidth={6}
        isSmoothColorTransition
      // onUpdate={(remainingTime) => {
      //     if (remainingTime !== updatedTime) {
      //       setUpdatedTime(remainingTime);
      //     }
      //   }}
      >
        {({ remainingTime }) => formatTime(remainingTime)}
      </CountdownCircleTimer>
    </div>
  );
};

export default QuizTimer;
