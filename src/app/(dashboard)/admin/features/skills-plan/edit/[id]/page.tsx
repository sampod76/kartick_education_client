

import EditSKillsAndPlan from '@/components/features/skills-plan/edit/UpdateSKillsAndPlan'
import React from 'react'

export default function EditSillsAndPlanPage({ params }: { params: { id: string } }) {
    return (
        <div><EditSKillsAndPlan planId={params?.id} /></div>
    )
}

