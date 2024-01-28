'use client'
import { useGetSingleMilestoneQuery } from '@/redux/api/adminApi/milestoneApi';
import React from 'react'
import SingleMilestone from '../SingleMilestone';
import LoadingSkeleton from '@/components/ui/Loading/LoadingSkeleton';

export default function DetailsMilestoneDash({ milestoneId }: { milestoneId: string }) {

    const { data, isLoading: gerMilestoneLoading } =
        useGetSingleMilestoneQuery(milestoneId);

    if (gerMilestoneLoading){
        return (<div className="">
            <LoadingSkeleton number={20} />
        </div>)
        }

    console.log(data,'datadata')
    return (
        <div>
            <div className="">

            </div>
            <div className="">
                <SingleMilestone milestoneData={data} />
            </div>
        </div>
    )
}
