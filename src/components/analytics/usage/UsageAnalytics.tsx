"use client";
import React, { useState } from 'react'
import { PrinterOutlined } from "@ant-design/icons"
import TopFilterSelect from '../TopFilterSelect';
import { Progress, Space } from 'antd';
import { Line } from '@ant-design/charts';
import { EditOutlined, ClockCircleOutlined, SettingOutlined } from "@ant-design/icons"
import dynamic from 'next/dynamic';
const DynamicLineChart = dynamic(() => import('@ant-design/charts').then((module) => module.Line), {
    ssr: false, // Set ssr to false to prevent server-side rendering
});


let LineChart: any; // Define LineChart variable

if (typeof window !== 'undefined') {
    // Import Line component only on the client side
    LineChart = require('@ant-design/charts').Line;
}
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
                    title: "skills ",
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
        height: 300,
        width: 1090,
        responsive: true,

    }

    return (
        <div className='mt-7 px-3'>
            {/*// ! --- top usage------ */}
            <div className="">
                <TopFilterSelect setCourse={setCourse} setCategory={setCategory} setTime={setTime} category={category} />

            </div>
            <h1 className='text-2xl lg:text-3xl font-semibold my-2 mt-12 text-slate-700 uppercase'>Usage Details <PrinterOutlined /></h1>
            {/* main Usage Sections */}
            <div className="bg-white">

                <h1 className='text-2xl lg:text-2xl font-normal my-2 mt-5 text-slate-600  '>In the  {time} with {course?.title}</h1>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {/*Answered card- */}
                    <div className="w-[18rem] mx-auto  max-h-[10rem] flex  gap-4 items-start justify-center shadow-md px-3 py-5 bg-white rounded-md">
                        <EditOutlined style={{
                            fontSize: "2rem",
                            color: "green",
                        }} />
                        <div className="text-lg lg:text-[18px] font-normal uppercase text-slate-600">
                            <h6 className=''>Answered </h6>
                            <h6>{usageDetailsData[0].quizData?.answered.total}</h6>
                            <h6>{usageDetailsData[0].quizData?.answered.title}</h6>
                        </div>
                    </div>
                    { }
                    <div className="w-[18rem] mx-auto max-h-[10rem] flex  gap-4 items-start justify-center shadow-md px-3 py-5 bg-white rounded-md">
                        <EditOutlined style={{
                            fontSize: "2rem",
                            color: "blue",
                        }} />
                        <div className="text-lg lg:text-[18px] font-normal uppercase text-slate-600">
                            <h6 className=''>Spent </h6>
                            <h6>{usageDetailsData[0].quizData?.spent.total}</h6>
                            <h6>{usageDetailsData[0].quizData?.spent.title}</h6>
                        </div>
                    </div>
                    {/*Made Progress in  card- */}
                    <div className="w-[18rem] mx-auto max-h-[10rem] flex  gap-4 items-start justify-center shadow-md px-3 py-5 bg-white rounded-md">
                        <EditOutlined style={{
                            fontSize: "2rem",
                            color: "yellow",
                        }} />
                        <div className="text-lg lg:text-[18px] font-normal uppercase text-slate-600">
                            <h6 className=''>Made Progress in </h6>
                            <h6>{usageDetailsData[0].quizData?.progress.total}</h6>
                            <h6>{usageDetailsData[0].quizData?.progress.title}</h6>
                        </div>
                    </div>

                </div>

                {/*  progress and chart sections */}
                <div className="block lg:flex justify-between items-start mt-5 pt-3 ">
                    {/* progress category */}
                    <div className="">
                        <h2 className='text-xl font-semibold my-2 text-slate-700'>Practice by category</h2>
                        <Progress type="circle" percent={80} strokeColor={{ '0%': '#5371FF', '100%': '#87d068' }} gapDegree={30} />
                    </div>

                    {/* chart sections */}
                    <div className="max-w-[38rem] relative max-h-[18rem] ">
                        {/* <Line {...config} /> */}
                        {/* <LineChart {...config} /> */}
                        {/* {LineChart && <LineChart {...config} />} */}
                        {typeof window !== 'undefined' && <DynamicLineChart {...config} />}
                    </div>
                </div>



            </div>
        </div>
    )
}
