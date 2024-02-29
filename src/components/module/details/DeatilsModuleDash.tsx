'use client'

import React from 'react'

import LoadingSkeleton from '@/components/ui/Loading/LoadingSkeleton';

import { EllipsisMiddle } from '@/utils/CutTextElliples';
import { AllImage } from '@/assets/AllImge';
import { useGetAllLessonQuery } from '@/redux/api/adminApi/lessoneApi';
import { useGetSingleModuleQuery } from '@/redux/api/adminApi/moduleApi';
import LessonList from '@/components/lesson/LessonList';

export default function DetailsModuleDash({ moduleId }: { moduleId: string }) {


    const { data: moduleData } = useGetSingleModuleQuery(moduleId)

    // console.log('moduleData', moduleData)


    // console.log(moduleData, 'singleModuleData')

    return (
        <div>
            <h2 className='text-center text-md my-3'>Module Details </h2>

            <div className="block lg:flex gap-4">
                <div className="p-2 border-2 shadow-md rounded-xl block lg:flex md:flex xl:flex max-w-xl bg-white overflow-hidden">
                    <div
                        className="w-1/3 bg-cover"
                        style={{
                            backgroundImage: `url(${moduleData?.imgs?.length ? moduleData?.imgs[0] : AllImage?.notFoundImage})`,
                        }}
                    ></div>
                    <div className="w-2/3 p-2">
                        <h1 className="text-gray-900 font-bold text-2xl uppercase">
                            <EllipsisMiddle suffixCount={3} maxLength={90}>
                                {moduleData?.title}
                            </EllipsisMiddle>
                        </h1>
                        <p className="mt-2 text-gray-600 text-sm">
                            <EllipsisMiddle suffixCount={3} maxLength={160}>
                                {moduleData?.short_description}
                            </EllipsisMiddle>
                        </p>

                        <div className="flex item-center justify-between mt-3">
                            <h1 className="text-gray-700 font-bold text-xl">Module No : {moduleData?.module_number}</h1>
                        </div>
                    </div>
                </div>

                <div className="max-w-xl">
                    <h4 className='text-slate-600 '>Lesson List of the module</h4>
                    <LessonList moduleId={moduleData?._id} moduleData={moduleData} />
                    {/* Add more components or details as needed */}
                </div>
            </div>
        </div>
    )
}
