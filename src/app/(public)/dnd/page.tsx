// App.tsx
'use client'
import DraggableDiv from '@/components/dnd/DraggableDiv';
import DraggableImage from '@/components/dnd/DraggableImage';
import React, { useState } from 'react';


const Dnd: React.FC = () => {
  const [imageLinks, setImageLinks] = useState<string[]>([]);
  const [draggedImage, setDraggedImage] = useState<string | null>(null);

  const handleDrop = (imageId: string) => {
    setImageLinks((prevLinks) => [...prevLinks, `Image ${imageId} link`]);
    setDraggedImage(null);
  };

  const handleImageDrag = (imageId: string) => {
    setDraggedImage(imageId);
  };

  return (
    <div>
      <DraggableDiv id="div1" onDrop={handleDrop}>
        <p>Draggable Div</p>
      </DraggableDiv>

      {draggedImage !== null ? (
        <DraggableImage onDrag={()=>{}} id={draggedImage} src={`image${draggedImage}.jpg`} />
      ) : (
        <>
          <DraggableImage id="1" src="https://images.unsplash.com/photo-1611262588024-d12430b98920?q=80&w=80&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" onDrag={handleImageDrag} />
          <DraggableImage id="2" src="https://images.unsplash.com/photo-1611262588024-d12430b98920?q=80&w=80&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" onDrag={handleImageDrag} />
          {/* Add more draggable images as needed */}
        </>
      )}

      <div>
        <h2>Image Links:</h2>
        <ul>
          {imageLinks.map((link, index) => (
            <li key={index}>{link}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dnd;
