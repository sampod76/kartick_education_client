"use client";

import ImageNext from "next/image";
import React, { useEffect, useState } from "react";
import { Avatar, Badge, Image, Space } from "antd";
import { IAnswer, ISingleQuizData } from "@/types/quiz/singleQuizType";
import { ISubmittedUserQuizData } from "@/types/quiz/submittedQuizType";
import { IQuizAnswer } from "@/redux/features/quizSlice";
import { CiCircleRemove } from "react-icons/ci";
interface DragAndDropProps {
  // imageUrls: IAnswer[];
  defaultValue: ISubmittedUserQuizData; // Change the type as per your data type
  disabled: boolean;
  onChange: (questionIndex: number, answer: any) => void;
  quizIndex: number;
  quizData: ISingleQuizData;
}

const DragQUizTest: React.FC<DragAndDropProps> = ({
  defaultValue,
  disabled,
  onChange,
  quizIndex,
  quizData,
}) => {
  // console.log(disabled, 'disabled', quizData?.answers, 'defaultValue', defaultValue)

  // const imageUrls = [
  //   'https://i.ibb.co/WDzDCFw/nodejs.png',
  //   'https://i.ibb.co/tChHPPg/socket.jpg',
  //   'https://i.ibb.co/DbWhk5q/prisma-1.jpg',
  //   // Add more image URLs as needed
  // ];
  const [imagesData, setImagesData] = useState<IAnswer[]>(quizData?.answers);

  const [draggedItems, setDraggedItems] = useState<IAnswer[]>([]);
  console.log("🚀 ~ draggedItems:", draggedItems);

  useEffect(() => {
    if (disabled) {
      setImagesData([]);

      const quizDefaultData = quizData?.answers?.filter((item: any) =>
        defaultValue?.submitAnswers?.includes(item?._id)
      );

      setDraggedItems(quizDefaultData);
    } else {
      setImagesData(quizData?.answers);
    }
  }, [defaultValue?.submitAnswers, disabled, quizData?.answers]);

  // console.log(quizData?.answers)
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const draggedItem = event.dataTransfer.getData("text/plain");
    console.log("🚀 ~ handleDrop ~ draggedItem:", draggedItem);

    if (!draggedItems.some((item) => item?._id === draggedItem)) {
      const draggedAnswer = imagesData.find(
        (answer) => answer._id === draggedItem
      );
      console.log("🚀 ~ handleDrop ~ draggedAnswer:", draggedAnswer);

      if (draggedAnswer) {
        setDraggedItems((prevItems) => [...prevItems, draggedAnswer]);
        setImagesData((prevData) =>
          prevData.filter((answer) => answer?._id !== draggedItem)
        );
        // console.log('draggedItems',draggedItems,draggedAnswer,'draggedAnswer?.id')
        onChange(quizIndex, [...draggedItems, draggedAnswer]);
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleRemoveItem = (index: number) => {
    const removedItem = draggedItems[index];
    setDraggedItems((prevItems) => prevItems.filter((item, i) => i !== index));
    setImagesData((prevData) => [...prevData, removedItem]);
    onChange(
      quizIndex,
      draggedItems.filter((item, i) => i !== index)
    );
  };

  const correctAnswer = defaultValue?._id
    ? quizData.answers.filter((item) => item?.correct)
    : [];
  console.log("🚀 ~ correctAnswer:", correctAnswer);

  return (
    <div
      className={`max-w-2xl mx-auto my-3 ${
        disabled && "disabled  cursor-none "
      }`}
    >
      <div style={{ display: "flex", gap: "10px" }} id="images">
        {imagesData?.map((answer: any, index: number) => (
          <div
            key={index}
            draggable={!disabled}
            onDragStart={(event) =>
              event.dataTransfer.setData("text/plain", answer?._id)
            }
            style={{ cursor: !disabled ? "move" : "not-allowed" }}
          >
            <ImageNext
              src={answer.imgs?.length ? answer?.imgs[0] : ""}
              alt={`Image ${index}`}
              width={100}
              height={100}
              style={{ height: "80px", width: "80px" }}
            />
          </div>
        ))}
      </div>
      <div
        id="destination"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="p-3 text-white min-h-[20rem]"
        style={{
          border: "2px dashed #000",
          marginTop: "20px",
          backgroundSize: "cover",
          backgroundImage: quizData ? `url(${quizData?.imgs[0]})` : "none",
        }}
      >
        <div className="flex gap-3 justify-center items-center">
          {draggedItems?.map((item, index) => (
            <div key={index} style={{ cursor: "zoom-out" }}>
              <div
              className="relative"
              >
                <ImageNext
                  src={item.imgs?.length ? item.imgs[0] : ""}
                  alt={`Image ${index}`}
                  width={100}
                  height={120}
                  style={{
                    height: "100px",
                    width: "100px",
                  }}
                />
                <span hidden={correctAnswer.length ? true : false} className="absolute -top-3 -right-3  text-lg rounded-full px-1" onClick={() => {
                      if (!correctAnswer.length) {
                       return handleRemoveItem(index);
                      }
                    }}><CiCircleRemove className=" text-3xl text-red-600 font-bold "/></span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        {correctAnswer.length ? (
          <>
            <p className="my-2 ">Correct answer :</p>
            <div
              className="p-3 text-white min-h-[20rem]"
              style={{
                border: "2px dashed #000",
                marginTop: "20px",
                backgroundSize: "cover",
                backgroundImage: quizData
                  ? `url(${quizData?.imgs[0]})`
                  : "none",
              }}
            >
              <div className="flex gap-3 justify-center items-center">
                {correctAnswer.length &&
                  correctAnswer?.map((item: any, index: number) => (
                    <div key={index} style={{ cursor: "zoom-out" }}>
                      <ImageNext
                        src={item?.imgs?.length ? item.imgs[0] : ""}
                        alt={`Image ${index}`}
                        width={100}
                        height={120}
                        style={{
                          height: "100px",
                          width: "100px",
                        }}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default DragQUizTest;
