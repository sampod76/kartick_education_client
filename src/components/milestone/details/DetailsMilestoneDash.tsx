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
import notFoundImga from "@/assets/noImge.jpg"
export default function DetailsMilestoneDash({ milestoneId }: { milestoneId: string }) {


    const { data: milestoneSingleData } = useGetSingleMilestoneQuery(milestoneId)
    console.log(milestoneSingleData, 'milestoneSingleData')
    // console.log(milestoneId,'milestoneId')
    const query: Record<string, any> = {};
    //! for Course options selection
    query["limit"] = 999999;
    query["sortBy"] = "title";
    query["sortOrder"] = "asc";

    //! for Module options selection
    const { data: moduleData, isLoading } = useGetAllModuleQuery({ ...query, milestone: milestoneId });
    // console.log(moduleData, 'moduleData',milestoneId)

    if (isLoading) {
        return (<div className="">
            <LoadingSkeleton number={20} />
        </div>)
    }

    const milestoneData = { ...moduleData?.data[0]?.milestone }


    const singleMilestoneFullData: IMilestoneData = {
        ...milestoneSingleData,
        modules: moduleData?.data
    }

    // ! uuid for unique color in SIngle Milestone
    const generateUUID = (): number => {
        const timestamp = new Date().getTime();
        const uuidString = `${timestamp.toString(16)}-xxxx-4xxx-xxxx`.replace(/[xy]/g, function (c) {
            const r = (Math.random() * 16) | 0;
            const v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16); // Convert each character to a string
        });
        // Convert the hexadecimal string to a decimal number
        const uuidNumber = parseInt(uuidString.replace(/[^0-9a-f]/gi, ''), 16);
        return uuidNumber;
    };


    // console.log(milestoneData, 'milestoneData')
    // console.log(singleMilestoneFullData)
    // const ImgUrl =milestoneSingleData?.imgs?.length ? milestoneSingleData?.imgs[0] : AllImage?.notFoundImage
    // console.log(ImgUrl,'ImgUrl')


    return (
        <div>
            <h2 className='text-center text-xl my-3'>Milestone Details </h2>

            <div className="block lg:flex gap-2">

                {/* backgroundImage: `url(${milestoneData?.imgs?.length ? milestoneData?.imgs[0] : AllImage?.notFoundImage})`, */}
                <div className="p-2 border-2 shadow-md  rounded-xl  block lg:flex md:flex xl:flex  max-w-xl bg-white  overflow-hidden">
                    <div className="w-1/3 bg-cover" style={{
                        backgroundImage: `url(${milestoneSingleData?.imgs?.length ? milestoneSingleData?.imgs[0] : AllImage?.notFoundImage})`
                    }}>
                    </div>
                    <div className="w-2/3 p-2 ">
                        <h1 className="text-gray-900 font-bold text-2xl uppercase">  <EllipsisMiddle suffixCount={3} maxLength={90}>
                            {milestoneSingleData?.title}
                        </EllipsisMiddle></h1>
                        <p className="mt-2 text-gray-600 text-sm">  <EllipsisMiddle suffixCount={3} maxLength={160}>
                            {milestoneSingleData?.short_description}
                        </EllipsisMiddle></p>

                        <div className="flex item-center justify-between mt-3">
                            <h1 className="text-gray-700 font-bold text-xl">Milestone No : {milestoneSingleData?.milestone_number}</h1>
                        </div>
                    </div>
                </div>
                <div className="max-w-xl">
                    <SingleMilestone milestoneData={singleMilestoneFullData} index={generateUUID()} />
                </div>
            </div>
        </div>
    )
}
