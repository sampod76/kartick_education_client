"use client";

import ImageNext from 'next/image';
import React, { useEffect, useState } from 'react';
import { Avatar, Badge, Image, Space } from 'antd';
import { IAnswer, ISingleQuizData } from '@/types/quiz/singleQuizType';
import { ISubmittedUserQuizData } from '@/types/quiz/submittedQuizType';

interface DragAndDropProps {
  // imageUrls: IAnswer[];
  defaultValue: ISubmittedUserQuizData;  // Change the type as per your data type
  disabled: boolean;
  onChange: (questionIndex: number, answer: any) => void;
  quizIndex: number;
  quizData: ISingleQuizData
}



const DragQUizTest: React.FC<DragAndDropProps> = ({ defaultValue, disabled, onChange, quizIndex, quizData }) => {

  // console.log(disabled, 'disabled', quizData?.answers, 'defaultValue', defaultValue)

  // const imageUrls = [
  //   'https://i.ibb.co/WDzDCFw/nodejs.png',
  //   'https://i.ibb.co/tChHPPg/socket.jpg',
  //   'https://i.ibb.co/DbWhk5q/prisma-1.jpg',
  //   // Add more image URLs as needed
  // ];
  const [imagesData, setImagesData] = useState<IAnswer[]>(quizData?.answers);
  const [draggedItems, setDraggedItems] = useState<IAnswer[]>([]);

  useEffect(() => {
    if (disabled) {
      setImagesData([]);

      const quizDefaultData = quizData?.answers?.filter((item: any) => defaultValue?.submitAnswers?.includes(item?._id))

      setDraggedItems(quizDefaultData);
    }
  }, [defaultValue?.submitAnswers, disabled, quizData?.answers]);

  // console.log(quizData?.answers)
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const draggedItem = event.dataTransfer.getData('text/plain');

    if (!draggedItems.some((item) => item.title === draggedItem)) {
      const draggedAnswer = imagesData.find((answer) => answer.title === draggedItem);

      if (draggedAnswer) {
        setDraggedItems((prevItems) => [...prevItems, draggedAnswer]);
        setImagesData((prevData) => prevData.filter((answer) => answer.title !== draggedItem));
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
    onChange(quizIndex, draggedItems.filter((item, i) => i !== index));
  };

  console.log(quizData?.imgs[0])
  return (
    <div className={`max-w-2xl mx-auto my-3 ${disabled && 'disabled opacity-[0.5] cursor-none '}`}>
      <div style={{ display: 'flex', gap: '10px' }} id="images">
        {imagesData?.map((answer, index: number) => (
          <div
            key={index}
            draggable={!disabled}
            onDragStart={(event) => event.dataTransfer.setData('text/plain', answer.title)}
            style={{ cursor: !disabled ? 'move' : 'not-allowed' }}
          >
            <ImageNext src={answer.imgs ? answer.imgs[0] : ''} alt={`Image ${index}`} width={100} height={100} style={{ height: "80px", width: "80px" }} />
          </div>
        ))}
      </div>
      <div
        id="destination"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className='p-3 text-white min-h-[20rem]'
        style={{
          border: '2px dashed #000',
          marginTop: '20px',
          backgroundSize: "cover",
          backgroundImage: quizData ? `url(${quizData?.imgs[0]})` : 'none',

        }}
      >
        <div className='flex gap-3 justify-center items-center'>
          {draggedItems?.map((item, index) => (
            <div key={index} style={{ cursor: 'zoom-out' }}>
              <Badge.Ribbon text={<span onClick={() => handleRemoveItem(index)}>X</span>} color='red' placement="end">
                <ImageNext
                  src={item.imgs ? item.imgs[0] : ''}
                  alt={`Image ${index}`}
                  width={100}
                  height={120}
                  style={{
                    height: "100px",
                    width: "100px"
                  }}
                />
              </Badge.Ribbon>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


export default DragQUizTest;