"use client";
import React, { useState } from 'react'
import { PrinterOutlined } from "@ant-design/icons"
import TopFilterSelect from '../TopFilterSelect';
import { Line } from '@ant-design/charts';



export default function UsageAnlytics() {

    const [category, setCategory] = useState<{ _id?: string; title?: string }>(
        {}
    );
    const [course, setCourse] = useState<{ _id?: string; title?: string }>({});
    const [time, setTime] = useState<string>('Today');


    // console.log(time)
    const data = [
        { day: '1 January', value: 3 },
        { day: '2 January', value: 4 },
        { day: '3 January', value: 3.5 },
        { day: '4 January', value: 5 },
        { day: '5 January', value: 4.9 },
        { day: '6 January', value: 6 },
        { day: '7 January', value: 7 },
        { day: '8 January', value: 9 },
        { day: '9 January', value: 13 },
    ];



    const usageDetailsData = [
        {
            quizData: {
                answered: {
                    title: "questions",
                    total: "10",
                    icon: ""
                },
                spent: {
                    title: "spent",
                    name: "Practice",
                    total: "18"
                },
                progress: {
                    title: "Made Progress in ",
                    name: "skills",
                    total: "18"
                },
            },
            progressData: {
                title: "Practice by Category",
                progress: "70"
            },
            practiceByDay: [{ day: '1 January', value: 3 },
            { day: '2 January', value: 4 },
            { day: '3 January', value: 3.5 },
            { day: '4 January', value: 5 },
            { day: '5 January', value: 4.9 },
            { day: '6 January', value: 6 },
            { day: '7 January', value: 7 },
            { day: '8 January', value: 9 },
            { day: '9 January', value: 13 },]
        }
    ]

    const config = {
        data: usageDetailsData[0].practiceByDay,
        xField: 'day',
        yField: 'value',

    }

    return (
        <div>
            {/*// ! --- top usage------ */}
            <div className="">
                <TopFilterSelect setCourse={setCourse} setCategory={setCategory} setTime={setTime} category={category} />
                <h1 className='text-2xl lg:text-3xl font-semibold my-2 mt-5 text-slate-700 uppercase'>Usage Details <PrinterOutlined /></h1>
            </div>

            <div className="bg-white">
                <h1 className='text-2xl lg:text-2xl font-normal my-2 mt-5 text-slate-600  '>In the  {time} with {course?.title}</h1>

                <Line {...config} />

            </div>
        </div>
    )
}
