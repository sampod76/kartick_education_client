"use client";

import Image from 'next/image';
import { useState } from 'react';

interface DragAndDropProps {
  imageUrls: string[];
}

export default function DragTest() {
  const imageUrls = [
    'https://i.ibb.co/WDzDCFw/nodejs.png',
    'https://i.ibb.co/tChHPPg/socket.jpg',
    'https://i.ibb.co/DbWhk5q/prisma-1.jpg',
    // Add more image URLs as needed
  ];

  const [ImagesData, setImagesData] = useState<string[]>(imageUrls || [])
  // let ImagesData = [...imageUrls]
  const [draggedItems, setDraggedItems] = useState<string[]>([]);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const draggedItem = event.dataTransfer.getData('text/plain');
    // console.log('draggedItem', draggedItem);

    // Remove the dropped item from ImagesData
    // ImagesData = ImagesData.filter((item: any) => item !== draggedItem);
    const currentIndex = ImagesData?.findIndex((item) => item === draggedItem)
    // console.log('currentIndex', currentIndex);
    // const newImages = ImagesData?.splice(currentIndex, 1)
    // setImagesData(ImagesData?.splice(currentIndex, 1))

    const currentImages = ImagesData?.filter((item) => item !== draggedItem)

    setImagesData(currentImages)

    // console.log('ImagesData', ImagesData)
    // if (currentIndex !== -1) {
    //   // If the answer with the provided _id already exists, replace it
    //   state.userAnswers[existingAnswerIndex] = payload;
    // } else {
    //   // If the answer with the provided _id doesn't exist, add it
    //   state.userAnswers.push(payload);
    // }
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


  // console.log(ImagesData, 'draggedItems', draggedItems)

  return (
    <div className='max-w-2xl mx-auto my-3'>
      <div style={{ display: 'flex', gap: '10px' }}>
        {ImagesData.map((imageUrl, index: number) => (
          <div
            key={index}
            draggable
            onDragStart={(event) => event.dataTransfer.setData('text/plain', imageUrl)}
            style={{ cursor: 'move' }}
          >
            <Image src={imageUrl} alt={`Image ${index}`} width={100} height={100} />
          </div>
        ))}
      </div>
      <div
        id="destination"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className='p-3 text-white min-h-[20rem]'
        style={{
          border: '2px dashed #000', marginTop: '20px', background: `url(${'https://i.ibb.co/RbjJ4Xf/garden1.jpg'})`, backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        {/* <strong>Drop Zone</strong> */}
        <div className='flex gap-2 justify-center items-center'>
          {draggedItems.map((item, index) => (
            <div key={index}>
              <Image
                src={item}
                alt={`Image ${index}`}
                width={100}
                height={100}
                onClick={() => handleRemoveItem(index, item)}
                style={{ cursor: 'pointer' }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
