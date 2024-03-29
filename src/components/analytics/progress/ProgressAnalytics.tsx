'use client'
import { Collapse, Progress } from 'antd'
import React, { useState } from 'react'
import {
    CaretRightOutlined,
    RightCircleOutlined,
    EyeOutlined,
    LockOutlined,
    EyeInvisibleOutlined,
    SearchOutlined,
    PrinterOutlined,

} from "@ant-design/icons";
import Link from 'next/link';
import { useGetAllCartQuery } from '@/redux/api/userApi/cartAPi';
import { ENUM_STATUS, ENUM_YN } from '@/constants/globalEnums';
import LoadingForDataFetch from '@/components/Utlis/LoadingForDataFetch';
import { useGetAllCategoryChildrenQuery } from '@/redux/api/categoryChildrenApi';
import { EllipsisMiddle } from '@/utils/CutTextElliples';
import SelectCategoryChildren from '@/components/Forms/GeneralField/SelectCategoryChildren';
import { Select } from 'antd';
import TopFilterSelect from '../TopFilterSelect';
// import { Line, } from '@ant-design/charts';

const { Panel } = Collapse



export default function ProgressAnalytics() {

    const { data: CategoryData, isLoading } = useGetAllCategoryChildrenQuery({ status: ENUM_STATUS.ACTIVE, isDelete: ENUM_YN.NO, children: 'course-milestone-module' })
    //! collapse section ////
    const [currentCollapse, setCurrentCollapse] = useState<string[]>([]);
    const handleChange = (key: any) => {
        console.log(key, 'key')

        setCurrentCollapse(key);
    };






    const [category, setCategory] = useState<{ _id?: string; title?: string }>(
        {}
    );
    const [course, setCourse] = useState<{ _id?: string; title?: string }>({});
    const [time, setTime] = useState<string>('Today');

    if (isLoading) {
        return <LoadingForDataFetch />
    }

    return (
        <div>

            <TopFilterSelect setCourse={setCourse} setCategory={setCategory} setTime={setTime} category={category} />
            {/* //! progress Section */}
            <div className="mt-5 px-2">

                <h1 className='text-2xl lg:text-3xl font-semibold mt-9 mb-3 text-slate-700 uppercase'>Progress and Improvement <PrinterOutlined /></h1>

                {/* top header section */}
                <div className="flex justify-between uppercase bg-blue-500 text-white font-semibold py-3 px-2 rounded-md">

                    <h3 className='text-nowrap w-[40%]'>Course</h3>
                    <div className="w-[60%] grid grid-cols-1 lg:grid-cols-3">
                        <h3 className='text-nowrap'>Time Spent</h3>
                        <h3 className='text-nowrap'>Questions</h3>
                        <h3 className='text-nowrap'>Score Improvement</h3>

                    </div>

                </div>
                <Collapse onChange={handleChange} style={{
                    backgroundColor: '#298BA0',
                    color: "white",
                    marginTop: "0px",
                }}>
                    {CategoryData?.data?.map((category: any) => (
                        <Panel header={<h2 className='text-white font-normal bg-[#b0d9e2'>{category?.title}</h2>} key={category?._id}>
                            <Collapse style={{
                                backgroundColor: '#b0d9e'
                            }} defaultActiveKey="1"
                                bordered={false}
                            //  ghost={true}
                            >
                                {category?.courses?.map((course: any) => (
                                    <Panel header={course?.title} key={course?._id}>
                                        {
                                            course?.milestones?.map((milestone: any, milestoneIndex: number) => {
                                                return <div className="flex justify-between items-center" key={milestone?._id}>
                                                    <section className='flex gap-1 w-[40%]'>
                                                        <SearchOutlined />
                                                        <span>{milestone?.milestone_number}</span>
                                                        <EllipsisMiddle suffixCount={5} maxLength={64}>
                                                            {milestone?.title}
                                                        </EllipsisMiddle>
                                                    </section>
                                                    <section className='w-[60%] grid grid-cols-1 lg:grid-cols-3 gap-3 items-center'>
                                                        <h3 className='text-sm text-slate-600'>   module: {milestone?.modules?.length} min </h3>
                                                        <h3 className='text-nowrap'>{10 + milestoneIndex}</h3>
                                                        <h3 className='text-nowrap'>   <Progress percent={90} status="active" strokeColor={{ from: '#108ee9', to: '#87d068' }} /></h3>
                                                    </section>

                                                </div>
                                            })
                                        }

                                        {/* <Collapse defaultActiveKey="1">
                                            {(course?.milestones || []).map((milestone: any) => (
                                                <Panel header={milestone?.title} key={milestone?._id}>
                                                    <p>Content for milestone: {milestone?.title}</p>
                                                </Panel>
                                            ))}
                                        </Collapse> */}
                                    </Panel>
                                ))}
                            </Collapse>
                        </Panel>
                    ))}
                </Collapse>

            </div>
        </div>
    )
}
