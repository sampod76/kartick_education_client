

import EditShortOverview from '@/components/features/overview/edit/UpdateShortOverviews'
import EditSKillsAndPlan from '@/components/features/skills-plan/edit/UpdateSKillsAndPlan'
import React from 'react'

export default function EditSillsAndPlanPage({ params }: { params: { id: string } }) {
    return (
        <div><EditShortOverview overviewId={params?.id} /></div>
    )
}

