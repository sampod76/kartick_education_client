import { useGetSingleMilestoneQuery } from '@/redux/api/adminApi/milestoneApi';
import React from 'react'

export default function DetailsMilestoneDash({ milestoneId }: { milestoneId: string }) {

    const { data, isLoading: gerMilestoneLoading } =
        useGetSingleMilestoneQuery(milestoneId);


    return (
        <div>DetailsMilestoneDash</div>
    )
}
