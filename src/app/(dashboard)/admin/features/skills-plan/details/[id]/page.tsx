"use client";
import { AllImage } from '@/assets/AllImge';
import { AnimatePresenceWrapper } from '@/components/framer_motion/AnimatePresence';
import LoadingSkeleton from '@/components/ui/Loading/LoadingSkeleton';
import { useGetSingleSkills_planQuery } from '@/redux/api/adminApi/features/skillsPlanApi';
import { ISkillsPlanData } from '@/types/features/SkillsAndPlanDataType';
import Image from 'next/image';
import React from 'react'

export default function SkillAndPlanDetailsPage({ params }: { params: { id: string } }) {
    const { data = {}, isLoading } =
        useGetSingleSkills_planQuery(params?.id, {
            skip: !Boolean(params?.id),
        });
    const skillData: ISkillsPlanData = data
    if (isLoading) {
        return <LoadingSkeleton />;
    }
    return (
        <div>   <AnimatePresenceWrapper>
            <div className="container mx-auto   ">
                <div className="rounded shadow bg-white mx-3 block lg:flex justify-between text-start my-[5rem] gap-5 px-2 lg:px-7 py-7 lg:py-12">
                    <div>
                        <h2 className="text-[#31576A]   lg:text-[3.5vw] xl:text-4xl font-[800] uppercase">
                            {skillData?.title}
                        </h2>
                        <ul className="text-[#023047E5] text-md lg:text-xl gap-y-3 font-[500] mt-7 list-none">
                            {skillData?.points?.map((data: any) => (
                                <li
                                    key={data?._id || data?.title}
                                    className="flex items-center my-1 "
                                >
                                    <span className="bg-secondary rounded-full inline-block w-3 h-3 mr-3"></span>
                                    {data?.title}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-5 lg:mt-0">
                        <h1 className="text-[#31576A] capitalize text-[2vw] md:text-[3vw] xl:text-3xl font-[500]">
                            {skillData?.imgTitle}
                        </h1>

                        <Image
                            src={skillData?.imgs?.length ? skillData?.imgs[0] : AllImage.notFoundImage}
                            style={{ marginTop: "10px" }}
                            height={332}
                            width={570}
                            alt="support"
                        />
                    </div>
                </div>
            </div>
        </AnimatePresenceWrapper></div>
    )
}
