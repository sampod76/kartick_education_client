"use client"
import React, { useState } from 'react'
import { PrinterOutlined } from "@ant-design/icons"
import TopFilterSelect from '../TopFilterSelect';
export default function UsageAnlytics() {

    const [category, setCategory] = useState<{ _id?: string; title?: string }>(
        {}
    );
    const [course, setCourse] = useState<{ _id?: string; title?: string }>({});
    const [time, setTime] = useState<{ _id?: string; title?: string }>({});
    return (
        <div>
            <TopFilterSelect setCourse={setCourse} setCategory={setCategory} setTime={setTime} category={category} />
            <h1 className='text-2xl lg:text-3xl font-semibold my-2 mt-5 text-slate-700 uppercase'>Usage Details <PrinterOutlined /></h1>
        </div>
    )
}
