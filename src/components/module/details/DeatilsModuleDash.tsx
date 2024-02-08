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


    // console.log(singleModuleData, 'singleModuleData')

    return (
        <div>
            <h2 className='text-center text-md my-3'>Module Detail </h2>

            <div className="block lg:flex gap-2">


                <div className="p-2 border-2 shadow-md  rounded-xl flex max-w-xl bg-white  overflow-hidden">
                    <div className="w-1/3 bg-cover" style={{
                        backgroundImage: `url(${moduleData?.imgs?.length ? moduleData?.imgs[0] : AllImage?.notFoundImage})`
                    }}>
                    </div>
                    <div className="w-2/3 p-2 ">
                        <h1 className="text-gray-900 font-bold text-2xl uppercase">  <EllipsisMiddle suffixCount={3} maxLength={90}>
                            {moduleData?.title}
                        </EllipsisMiddle></h1>
                        <p className="mt-2 text-gray-600 text-sm">  <EllipsisMiddle suffixCount={3} maxLength={160}>
                            {moduleData?.short_description}
                        </EllipsisMiddle></p>

                        <div className="flex item-center justify-between mt-3">
                            <h1 className="text-gray-700 font-bold text-xl">Module No : {moduleData?.module_number}</h1>
                        </div>
                    </div>
                </div>


                <div className="max-w-xl">
                    <LessonList moduleId={moduleId} moduleData={moduleData} />
                    {/* <SingleModule moduleData={singlemoduleData} /> */}
                </div>
            </div>
        </div>
    )
}
