"use client"
import React, { useState } from 'react'
import TopFilterSelect from '../TopFilterSelect';
import { PrinterOutlined } from "@ant-design/icons"
import { Pie } from '@ant-design/plots';
import LoadingForDataFetch from '@/components/Utlis/LoadingForDataFetch';
import PieChart from '@/components/dashboard/admin/chart/PieChart';
import dynamic from 'next/dynamic';

const DynamicPie = dynamic(() => import('@ant-design/plots').then((mod) => mod.Pie), {
    ssr: false, // Set ssr to false to prevent rendering on the server
});
export default function ScoreAnalytics() {
    const [category, setCategory] = useState<{ _id?: string; title?: string }>(
        {}
    );
    const [course, setCourse] = useState<{ _id?: string; title?: string }>({});
    const [time, setTime] = useState<string>('Today');

    interface PieChartData {
        type: string;
        value: number;
    }

    const data: PieChartData[] = [
        {
            type: 'Course',
            value: 80, // Update with the actual course score
        },
        {
            type: 'Quiz',
            value: 70, // Update with the actual quiz score
        },
        {
            type: 'English',
            value: 90, // Update with the actual English score
        },
    ];


    // const config = {
    //     appendPadding: 10,
    //     data,
    //     angleField: 'value',
    //     colorField: 'type',
    //     radius: 0.75,
    //     label: {
    //         type: 'spider',
    //         labelHeight: 28,
    //         content: '{name}\n{percentage}',
    //     },
    //     interactions: [
    //         {
    //             type: 'element-selected',
    //         },
    //         {
    //             type: 'element-active',
    //         },
    //     ],
    //     legend: {
    //         layout: 'vertical',
    //         position: 'right',
    //     },
    //     responsive: true,

    // };

    if (!data?.length) {
        return (<div>

            <LoadingForDataFetch />
        </div>)
    }
    const config = {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.75,
        // label: {
        //     type: 'spider', // Change 'shape.spider' to 'spider'
        //     labelHeight: 28,
        //     content: '{name}\n{percentage}',
        // },
        interactions: [
            {
                type: 'element-selected',
            },
            {
                type: 'element-active',
            },
        ],
        legend: {
            layout: 'vertical',
            position: 'right',
        },
        responsive: true,
    };

    return (
        <div>
            <div className="">
                <TopFilterSelect setCourse={setCourse} setCategory={setCategory} setTime={setTime} category={category} />

            </div>
            <h1 className='text-2xl lg:text-3xl font-semibold my-2 mt-12 text-slate-700 uppercase'>Scores <PrinterOutlined /></h1>
            <div className="bg-white">
                <h1 className='text-2xl lg:text-2xl font-normal my-2 mt-5 text-slate-600  '> Overview of  {course?.title} In the  {time}</h1>
            </div>
            <div className="">
                {/* <Pie {...config} />; */}
                {/* <PieChart /> */}
                {typeof window !== 'undefined' && <DynamicPie {...config} />}
            </div>
        </div>
    )
}





