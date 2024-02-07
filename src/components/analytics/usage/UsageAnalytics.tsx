"use client";
import React, { useState } from 'react'
import { PrinterOutlined } from "@ant-design/icons"
import TopFilterSelect from '../TopFilterSelect';
export default function UsageAnlytics() {

    const [category, setCategory] = useState<{ _id?: string; title?: string }>(
        {}
    );
    const [course, setCourse] = useState<{ _id?: string; title?: string }>({});
    const [time, setTime] = useState<string>('Today');


    console.log(time)

    return (
        <div>
            <TopFilterSelect setCourse={setCourse} setCategory={setCategory} setTime={setTime} category={category} />
            <h1 className='text-2xl lg:text-3xl font-semibold my-2 mt-5 text-slate-700 uppercase'>Usage Details <PrinterOutlined /></h1>

            <div className="bg-white">
                <h1 className='text-2xl lg:text-2xl font-normal my-2 mt-5 text-slate-600  '>In the  {time} with {course?.title}</h1>

                
            </div>
        </div>
    )
}
