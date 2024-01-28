'use client'
import { useGetSingleMilestoneQuery } from '@/redux/api/adminApi/milestoneApi';
import React from 'react'
import SingleMilestone from '../SingleMilestone';
import LoadingSkeleton from '@/components/ui/Loading/LoadingSkeleton';
import { useGetAllModuleQuery } from '@/redux/api/adminApi/moduleApi';
import { IMilestoneData } from '@/types/miestoneType';
import { CiClock2 } from 'react-icons/ci';
import { EllipsisMiddle } from '@/utils/CutTextElliples';
import { AllImage } from '@/assets/AllImge';

export default function DetailsMilestoneDash({ milestoneId }: { milestoneId: string }) {



    const query: Record<string, any> = {};
    //! for Course options selection
    query["limit"] = 999999;
    query["sortBy"] = "title";
    query["sortOrder"] = "asc";

    //! for Module options selection
    const { data: moduleData, isLoading } = useGetAllModuleQuery({ ...query, milestone: milestoneId });
    // console.log(moduleData, 'moduleData')
    if (isLoading) {
        return (<div className="">
            <LoadingSkeleton number={20} />
        </div>)
    }

    const milestoneData = { ...moduleData?.data[0]?.milestone }


    const singleMilestoneData: IMilestoneData = {
        ...milestoneData,
        modules: moduleData?.data
    }


    // console.log(singleMilestoneData)
    return (
        <div>
            <h2 className='text-center text-xl my-3'>Milestone Details Page</h2>
            <div className="border-2 shadow-md p-2 rounded-xl">
                <div className="py-2">
                    <div className="flex max-w-lg bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="w-1/3 bg-cover" style={{
                            backgroundImage: `url(${milestoneData?.imgs[0] || AllImage?.notFoundImage})`
                        }}>
                        </div>
                        <div className="w-2/3 p-2">
                            <h1 className="text-gray-900 font-bold text-2xl uppercase">  <EllipsisMiddle suffixCount={3} maxLength={90}>
                                {milestoneData?.title}
                            </EllipsisMiddle></h1>
                            <p className="mt-2 text-gray-600 text-sm">  <EllipsisMiddle suffixCount={3} maxLength={160}>
                                {milestoneData?.short_description}
                            </EllipsisMiddle></p>
                            <div className="flex item-center mt-2">
                                <svg className="w-5 h-5 fill-current text-yellow-700" viewBox="0 0 24 24">
                                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                                </svg>
                                <svg className="w-5 h-5 fill-current text-yellow-700" viewBox="0 0 24 24">
                                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                                </svg>
                                <svg className="w-5 h-5 fill-current text-yellow-700" viewBox="0 0 24 24">
                                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                                </svg>
                                <svg className="w-5 h-5 fill-current text-yellow-500" viewBox="0 0 24 24">
                                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                                </svg>
                                <svg className="w-5 h-5 fill-current text-yellow-500" viewBox="0 0 24 24">
                                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                                </svg>
                            </div>
                            <div className="flex item-center justify-between mt-3">
                                <h1 className="text-gray-700 font-bold text-xl">Milestone No : {milestoneData?.milestone_number}</h1>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="">
                <SingleMilestone milestoneData={singleMilestoneData} />
            </div>
        </div>
    )
}
