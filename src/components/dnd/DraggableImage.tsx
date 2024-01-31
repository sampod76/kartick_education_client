/* eslint-disable @next/next/no-img-element */
// DraggableImage.tsx
"use client";
import Image from "next/image";
import React from "react";
import { useDrag, DragSourceMonitor } from "react-dnd";

interface DraggableImageProps {
  src: string;
  id: string;
  onDrag: (imageId: string) => void;
}

const DraggableImage: React.FC<DraggableImageProps> = ({ src, id, onDrag }) => {
  console.log("🚀 ~ src:", src);
  const [, drag] = useDrag({
    type: "IMAGE",
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <Image
      ref={drag}
      //   src={src}
      width={300}
      height={300}
      className="w-10 h-7"
      src={src}
      alt={`Draggable Image ${id}`}
      style={{
        // opacity:  1,
        cursor: "move",
      }}
      onClick={() => onDrag(id)}
    />
  );
};

export default DraggableImage;
