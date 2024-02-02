'use client';



import React, { useEffect, useState } from "react";
import { Draggable, DropResult, Droppable, DragDropContext } from "react-beautiful-dnd";
import LoadingSkeleton from "../ui/Loading/LoadingSkeleton";
// import 'react-beautiful-dnd/style.css';
// import 'react-beautiful-dnd/style.css';
// import 'react-beautiful-dnd/dist/react-beautiful-dnd.css';
// import 'react-beautiful-dnd/dist/styles.css';



interface Cards {
    id: number;
    title: string;
    components: {
        id: number;
        name: string;
    }[];

}

const cardsData = [
    {
        id: 0,
        title: "Component Librarys",
        components: [
            {
                id: 100,
                name: "material ui"
            },
            {
                id: 200,
                name: "bootstrap"
            },
        ]
    },
    {
        id: 1,
        title: "Javascript Librarys",
        components: [
            {
                id: 300,
                name: "react"
            },
            {
                id: 400,
                name: "node"
            },
        ]
    },
    {
        id: 2,
        title: "react helping Librarys",
        components: [
            {
                id: 500,
                name: "redux"
            },
            {
                id: 600,
                name: "recoil"
            },
        ]
    }


]


interface DragAndDropProps {
    imageUrl?: string[];
    defaultValue?: string;  // Change the type as per your data type
    disabled?: boolean;
    onChange?: (questionIndex: number, answer: any) => void;
    quizIndex?: number;
}



const DndQuizCard: React.FC<DragAndDropProps> = ({ imageUrl, defaultValue, disabled, onChange, quizIndex }) => {
    const [data, setData] = useState<Cards[] | []>([])
    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;
        if (!destination) return;
        if (source.droppableId !== destination.droppableId) {
            const newData = [...data];
            const oldDroppableIndex = newData.findIndex((x: any) => x.id == source.droppableId.split("droppable")[1]);
            const newDroppableIndex = newData.findIndex((x: any) => x.id == destination.droppableId.split("droppable")[1]);
            const [item] = newData[oldDroppableIndex].components.splice(source.index, 1);
            newData[newDroppableIndex].components.splice(destination.index, 0, item);
            setData(newData);
        } else {
            const newData = [...data];
            const droppableIndex = newData.findIndex((x: any) => x.id == source.droppableId.split("droppable")[1]);
            const [item] = newData[droppableIndex].components.splice(source.index, 1);
            newData[droppableIndex].components.splice(destination.index, 0, item);
            setData(newData);
        }
    };
    useEffect(() => {
        setData(cardsData)
    }, [])
    if (!data.length) {
        return <LoadingSkeleton />
    }
    return (
        <div>
            <h1 className="text-center mt-8 mb-3 font-bold text-[25px]">Drag and Drop Application</h1>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="flex gap-4 justify-between my-20 mx-4 flex-col lg:flex-row">
                    {data.map((val, index) => (
                        <Droppable key={index} droppableId={`droppable${index}`}>
                            {(provided: any) => (
                                <div
                                    className="p-5 lg:w-1/3 w-full bg-white border-gray-400 border border-dashed"
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    <h2 className="text-center font-bold mb-6 text-black">{val.title}</h2>
                                    {val.components?.map((component, index) => (
                                        <Draggable key={component.id} draggableId={component.id.toString()} index={index}>
                                            {(provided: any) => (
                                                <div
                                                    className="bg-gray-200 mx-1 px-4 py-3 my-3"
                                                    {...provided.dragHandleProps}
                                                    {...provided.draggableProps}
                                                    ref={provided.innerRef}
                                                >
                                                    {component.name}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>
        </div>
    )
};

export default DndQuizCard;