'use client';

import React from 'react';

import LoadingSkeleton from '@/components/ui/Loading/LoadingSkeleton';

import { EllipsisMiddle } from '@/utils/CutTextElliples';
import { AllImage } from '@/assets/AllImge';
import { useGetAllLessonQuery } from '@/redux/api/adminApi/lessoneApi';
import { useGetSingleModuleQuery } from '@/redux/api/adminApi/moduleApi';
import LessonList from '@/components/lesson/LessonList';

export default function DetailsModuleDash({ moduleId }: { moduleId: string }) {
  const { data: moduleData } = useGetSingleModuleQuery(moduleId);

  // console.log('moduleData', moduleData)

  // console.log(moduleData, 'singleModuleData')

  return (
    <div>
      <h2 className="text-md my-3 text-center">Module Details </h2>

      <div className="block gap-4 lg:flex">
        {/* <div className="block max-w-xl overflow-hidden rounded-xl border-2 bg-white p-2 shadow-md md:flex lg:flex xl:flex">
          <div
            className="w-1/3 bg-cover"
            style={{
              backgroundImage: `url(${moduleData?.imgs?.length ? moduleData?.imgs[0] : AllImage?.notFoundImage})`,
            }}
          ></div>
          <div className="w-2/3 p-2">
            <h1 className="text-2xl font-bold uppercase text-gray-900">
              <EllipsisMiddle suffixCount={3} maxLength={90}>
                {moduleData?.title}
              </EllipsisMiddle>
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              <EllipsisMiddle suffixCount={3} maxLength={160}>
                {moduleData?.short_description}
              </EllipsisMiddle>
            </p>

            <div className="item-center mt-3 flex justify-between">
              <h1 className="text-xl font-bold text-gray-700">
                Module No : {moduleData?.module_number}
              </h1>
            </div>
          </div>
        </div> */}

        <div className="mx-auto">
          <LessonList moduleId={moduleData?._id} moduleData={moduleData} />
          {/* Add more components or details as needed */}
        </div>
      </div>
    </div>
  );
}
