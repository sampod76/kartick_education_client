
import EditMilestone from '@/components/milestone/edit/EditMilestone'
import React from 'react'

export default function EditAdminMilestonePage({ params }: { params: { id: string } }) {
  return (
    <div><EditMilestone milestoneId={params?.id} /></div>
  )
}
