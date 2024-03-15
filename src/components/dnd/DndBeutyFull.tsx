/* eslint-disable @next/next/no-img-element */

"use client";

import { AllImage } from "@/assets/AllImge";
import React, { useState } from "react";
import { Draggable, Droppable, DragDropContext } from "react-beautiful-dnd";

interface Answer {
    _id?: string;
    title: string;
    correct?: boolean;
    imgs: string[];
    status: "active" | "deactivate" | "save";
}

interface Card {
    _id: string;
    title: string;
    answers: Answer[];
    imgs: string[];
}

interface DragAndDropProps {
    card: Card;
}

const DndQuizCard: React.FC<DragAndDropProps> = ({ card }) => {
    const [selectedImages, setSelectedImages] = useState<string[]>([]);

    const onDragEnd = (result: any) => {
        const { source, destination } = result;

        if (!destination) return;

        if (source.droppableId === "images" && destination.droppableId === "dropZone") {
            const draggedImage = card.answers[source.index]?.imgs?.[0];
            if (draggedImage) {
                setSelectedImages((prevSelectedImages) => [...prevSelectedImages, draggedImage]);
            }
        }
    };

    return (
        <div>
            <h1 className="text-center mt-8 mb-3 font-bold text-[25px]">{card.title}</h1>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="flex gap-4 justify-between my-20 mx-4">
                    {/* Images Section */}
                    <Droppable droppableId="images" direction="horizontal">
                        {(provided: any) => (
                            <div {...provided.droppableProps} ref={provided.innerRef} className="flex gap-4 mb-8">
                                {card.answers.map((answer, index) => (
                                    <Draggable key={answer._id || index} draggableId={`image-${index}`} index={index}>
                                        {(provided: any) => (
                                            <div
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                ref={provided.innerRef}
                                                className={`w-16 h-16 bg-gray-200 ${selectedImages.includes(answer.imgs?.[0] || "") ? "border-2 border-blue-500" : ""
                                                    }`}
                                            >
                                                <img
                                                    src={answer.imgs?.[0]}
                                                    alt={`img-${index}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>

                    {/* Drop Zone Section */}
                    <Droppable droppableId="dropZone">
                        {(provided: any) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="h-48 bg-gray-300 relative"
                                style={{ backgroundImage: `url(${card.imgs.length ? card.imgs[0] : AllImage.notFoundImage})`, backgroundSize: "cover" }}
                            >
                                {selectedImages.map((img, index) => (
                                    <div
                                        key={index}
                                        className="w-12 h-12 bg-white absolute top-4 left-4"
                                        style={{ backgroundImage: `url(${img})`, backgroundSize: "cover" }}
                                    />
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            </DragDropContext>
        </div>
    );
};

export default DndQuizCard;
