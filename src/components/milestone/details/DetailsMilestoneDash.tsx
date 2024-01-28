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
            <h2 className='text-center text-xl my-3'>Milestone Details </h2>

            <div className="block lg:flex gap-2">


                <div className="p-2 border-2 shadow-md  rounded-xl flex max-w-xl bg-white  overflow-hidden">
                    <div className="w-1/3 bg-cover" style={{
                        backgroundImage: `url(${milestoneData?.imgs[0] || AllImage?.notFoundImage})`
                    }}>
                    </div>
                    <div className="w-2/3 p-2 ">
                        <h1 className="text-gray-900 font-bold text-2xl uppercase">  <EllipsisMiddle suffixCount={3} maxLength={90}>
                            {milestoneData?.title}
                        </EllipsisMiddle></h1>
                        <p className="mt-2 text-gray-600 text-sm">  <EllipsisMiddle suffixCount={3} maxLength={160}>
                            {milestoneData?.short_description}
                        </EllipsisMiddle></p>

                        <div className="flex item-center justify-between mt-3">
                            <h1 className="text-gray-700 font-bold text-xl">Milestone No : {milestoneData?.milestone_number}</h1>

                        </div>
                    </div>
                </div>


                <div className="max-w-xl">
                    <SingleMilestone milestoneData={singleMilestoneData} />
                </div>
            </div>
        </div>
    )
}
