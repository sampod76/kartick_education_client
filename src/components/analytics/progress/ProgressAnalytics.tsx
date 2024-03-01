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
import { useGlobalContext } from '@/components/ContextApi/GlobalContextApi';
import { useGetAnalyticsSubmitAllQuizQuery } from '@/redux/api/quizSubmitApi';
// import { Line, } from '@ant-design/charts';

const { Panel } = Collapse



export default function ProgressAnalytics() {
    const { userInfo, userInfoLoading } = useGlobalContext()


    const query: any = {}
    query.user = userInfo?.id
    const { data: CategoryData, isLoading } = useGetAnalyticsSubmitAllQuizQuery(query, { skip: !Boolean(userInfo?.id) })
    console.log("🚀 ~ ProgressAnalytics ~ CategoryData:", CategoryData)
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

    if (isLoading || userInfoLoading) {
        return <LoadingForDataFetch />
    }
// ! for calculate total "yes" modules
     const calculateProgressPercent = (isCorrects: string[]) => {
    const yesCount = isCorrects.filter((value) => value === 'yes').length;
    const totalCount = isCorrects.length;

    // Prevent division by zero
    return totalCount > 0 ? (yesCount / totalCount) * 100 : 0;
  };

    return (
        <div>

            <TopFilterSelect setCourse={setCourse} setCategory={setCategory} setTime={setTime} category={category} />
            {/* //! progress Section */}
            <div className="mt-5 px-2">

                <h1 className='text-2xl lg:text-3xl font-semibold mt-9 mb-3 text-slate-700 uppercase'>Progress and Improvement <PrinterOutlined /></h1>

                {/* top header section */}
                <div className="flex justify-between uppercase bg-blue-500 text-white font-semibold py-3 px-2 rounded-md">

                    <h3 className='text-nowrap w-[40%]'>Subject</h3>
                    <div className="w-[60%] grid grid-cols-1 lg:grid-cols-3">
                        <h3 className='text-nowrap'>Time Spent</h3>
                        <h3 className='text-nowrap'>Questions</h3>
                        <h3 className='text-nowrap'>Score Improvement</h3>

                    </div>

                </div>
              <Collapse onChange={handleChange} style={{ backgroundColor: '#298BA0', color: 'white', marginTop: '0px' }}>
{CategoryData?.data?.map((category: any) => (
  <Panel header={<h2 className='text-white font-normal bg-[#b0d9e2'>{category?.category?.title || ' '}</h2>} key={category?.category?._id}>
    <Collapse style={{ backgroundColor: '#b0d9e' }} defaultActiveKey="1" bordered={false}>
      {category?.courses?.length && category?.courses?.map((course: any) => (
        <Panel header={course?.title || ' '} key={course?._id}>
          {course?.milestones?.length &&
            course?.milestones?.map((milestone: any) => (
              <Panel header={<p className='font-normal bg-[#b0d9e2 bg-red-3 text-blue-30'>
                {/*//! milestone */}
                {milestone?.title || 'empty '}  
                
                  <Collapse style={{ backgroundColor: 'r' }} defaultActiveKey="1" bordered={false}>
                  {milestone?.modules?.length &&
                    milestone?.modules?.map((module: any) => (
                      <Panel
                        header={
                          <p className='font-normal bg-[#b0d9e2 text-blue-30'>{module?.title || 'empty ' } module</p>
                        }
                        className="bg-green-40 "
                        key={module?._id}
                      >
                 {/*//! module */}
                        <section className='flex gap-1  bg-blue-40'>
                          <EllipsisMiddle suffixCount={5} maxLength={50}>
                            {module?.title}
                          </EllipsisMiddle>
                        </section>
                        <section className='mx-auto bg-red-40'>
                          {/* <h3 className='text-sm text-slate-600'>module: {milestone?.modules?.length} min</h3> */}
                          <h3 className='text-nowrap w-[40%]'>
                            <Progress
                              percent={calculateProgressPercent(module?.isCorrects || [])}
                              status="active"
                              strokeColor={{ from: '#108ee9', to: '#87d068' }}
                            />
                          </h3>
                        </section>
                      </Panel>
                    ))}
                </Collapse>
                
                </p>} key={milestone?._id}>
            

      {/*///! here  the collapse is not showing  */}
             
              
              </Panel>
            ))}
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
