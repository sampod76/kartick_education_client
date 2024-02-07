'use client'
import { Collapse } from 'antd'
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
    const [time, setTime] = useState<{ _id?: string; title?: string }>({});


    if (isLoading) {
        return <LoadingForDataFetch />
    }

    return (
        <div>

            <TopFilterSelect setCourse={setCourse} setCategory={setCategory} setTime={setTime} category={category} />
            {/* //! progress Section */}
            <div className="mt-5">

                <h1 className='text-2xl lg:text-3xl font my-2 text-slate-700 uppercase'>Progress and Improvement <PrinterOutlined /></h1>

                <Collapse onChange={handleChange} style={{
                    backgroundColor: '#298BA0',
                    color: "white"
                }}>
                    {CategoryData?.data?.map((category: any) => (
                        <Panel header={<h2 className='text-white font-normal bg-[#b0d9e2'>{category?.title}</h2>} key={category?._id}>
                            <Collapse style={{
                                backgroundColor: '#b0d9e2'
                            }} defaultActiveKey="1"
                                bordered={false}
                            //  ghost={true}
                            >
                                {category?.courses?.map((course: any) => (
                                    <Panel header={course?.title} key={course?._id}>
                                        {
                                            course?.milestones?.map((milestone: any, milestoneIndex: number) => {
                                                return <div className="flex justify-between items-center" key={milestone?._id}>
                                                    <section className='flex gap-1'>
                                                        <SearchOutlined />
                                                        <span>{milestone?.milestone_number}</span>

                                                        <EllipsisMiddle suffixCount={5} maxLength={64}>
                                                            {milestone?.title}
                                                        </EllipsisMiddle>

                                                    </section>
                                                    <section>
                                                        <span className='text-sm text-slate-600'>   module: {milestone?.modules?.length}</span>
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
