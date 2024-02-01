"use client";

import ImageNext from 'next/image';
import React, { useState } from 'react';
import { Avatar, Badge, Image, Space } from 'antd';
interface DragAndDropProps {
  imageUrl: string[];
  defaultValue: string;  // Change the type as per your data type
  disabled: boolean;
  onChange: (questionIndex: number, answer: any) => void;
  quizIndex: number;
}



const DragQUizTest: React.FC<DragAndDropProps> = ({ imageUrl, defaultValue, disabled, onChange, quizIndex }) => {

  console.log(disabled, 'disabled')

  const imageUrls = [
    'https://i.ibb.co/WDzDCFw/nodejs.png',
    'https://i.ibb.co/tChHPPg/socket.jpg',
    'https://i.ibb.co/DbWhk5q/prisma-1.jpg',
    // Add more image URLs as needed
  ];

  const [ImagesData, setImagesData] = useState<string[]>(disabled ? [] : imageUrl)
  // let ImagesData = [...imageUrls]
  const [draggedItems, setDraggedItems] = useState<string[]>(disabled ? imageUrls : []);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const draggedItem = event.dataTransfer.getData('text/plain');

    const currentIndex = ImagesData?.findIndex((item) => item === draggedItem)


    const currentImages = ImagesData?.filter((item) => item !== draggedItem)

    setImagesData(currentImages)
    if (draggedItems?.length > 0) {
      onChange(quizIndex, ImagesData)
    }

    setDraggedItems((prevItems) => {
      if (!prevItems.includes(draggedItem)) {
        // Update the state with the dropped item
        return [...prevItems, draggedItem];
      }
      return prevItems;
    });
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleRemoveItem = (index: number, item: string) => {
    setDraggedItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems.splice(index, 1);
      return updatedItems;
    });

    setImagesData((prev) => [...prev, item])


  };

  // if (draggedItems?.length > 0) {
  //   onChange(quizIndex, ImagesData)
  // } else {
  // }

  // console.log(ImagesData, 'draggedItems', draggedItems)

  return (
    <div className={`max-w-2xl mx-auto my-3 ${disabled && 'disabled opacity-[0.5] cursor-none '}`}>

      <div style={{ display: 'flex', gap: '10px', }} id="images">
        {ImagesData.map((imageUrl, index: number) => (
          <div
            key={index}
            draggable
            onDragStart={(event) => event.dataTransfer.setData('text/plain', imageUrl)}
            style={{ cursor: 'move' }}
          >
            <ImageNext src={imageUrl} alt={`Image ${index}`} width={100} height={100} />
          </div>
        ))}
        I</div>
      <div
        id="destination"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className='p-3 text-white min-h-[20rem]'
        style={{
          border: '2px dashed #000', marginTop: '20px',
          //  background: `url(${'https://i.ibb.co/RbjJ4Xf/garden1.jpg'})`, backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        {/* <strong>Drop Zone</strong> */}
        <div className='flex gap-3 justify-center items-center' >
          {draggedItems.map((item, index) => (
            <div  key={index} className=""
              style={{ cursor: 'zoom-out' }}>
              <Badge.Ribbon  text={<span onClick={() => handleRemoveItem(index, item)}>X</span>} color='red' placement="end">
                <Image
                  src={item}
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