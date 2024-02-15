
'use client'

import NotFound from '@/app/not-found';
import SIngleAdvanceClass from '@/components/Home/AdvanceClass/SingleAdvanceClass';
import EditAdvanceClass from '@/components/features/advance-class/edit/EditAdvanceClass'
import LoadingSkeleton from '@/components/ui/Loading/LoadingSkeleton';
import { ENUM_STATUS, ENUM_YN } from '@/constants/globalEnums';
import { useGetAllShowAdvanceClassesQuery, useGetSingleShowAdvanceClassesQuery } from '@/redux/api/adminApi/features/showAdvanceClassApi';
import Link from 'next/link';
import React from 'react'

export default function AdvanceClassDetailsPage({ params }: { params: { id: string } }) {

    const { data = {}, isLoading: defaultLoading } =
        useGetSingleShowAdvanceClassesQuery(params?.id, {
            skip: !Boolean(params?.id),
        });

    const classData = data
    if (defaultLoading) {
        return <LoadingSkeleton />;
    }
    if (!classData?._id) {
        return <NotFound />;
    }

    return (
        <div className="mt-7  container mx-auto ">
            <div className="flex  justify-between gap-3 py-3 px-2">
                <h1 className="text-xl lg:text-3xl text-[#282938] font-[600]">
                    {classData?.title}
                </h1>
                <Link href={`/subscription`} className="p-2 text-nowrap border-2 border-primary rounded px-3 font-semibold gap-3 hover:bg-primary hover:text-white">
                    Join Now
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 first-letter:">
                {classData?.classes?.map((item: any, index: number) => {
                    return <SIngleAdvanceClass programme={item} key={index + 1} />;
                })}
            </div>
        </div>
    );
}

