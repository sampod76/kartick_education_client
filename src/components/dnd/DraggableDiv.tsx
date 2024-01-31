// DraggableDiv.tsx
'use client'
import React, { useRef } from 'react';
import { useDrop, DropTargetMonitor } from 'react-dnd';
import { XYCoord } from 'dnd-core';

interface DraggableDivProps {
  id: string;
  onDrop: (itemId: string) => void;
  children: React.ReactNode;
}

const DraggableDiv: React.FC<DraggableDivProps> = ({ id, onDrop, children }) => {
  const [, drop] = useDrop({
    accept: 'IMAGE',
    drop: (item: { id: string }, monitor: DropTargetMonitor) => {
      // Check if the drop happened inside the div
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        // If the drop did not happen inside the div, call the onDrop callback
        onDrop(item.id);
      }
    },
  });

  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} style={{ border: '1px dashed black', padding: '10px' }}>
      {children}
      {drop(<div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />)}
    </div>
  );
};

export default DraggableDiv;
