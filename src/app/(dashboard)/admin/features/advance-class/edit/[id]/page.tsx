

import EditAdvanceClass from '@/components/features/advance-class/edit/EditAdvanceClass'
import React from 'react'

export default function AdvanceClassEditPage({ params }: { params: { id: string } }) {
    return (
        <div><EditAdvanceClass classId={params?.id} /></div>
    )
}

