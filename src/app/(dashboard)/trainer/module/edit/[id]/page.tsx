
import EditModule from '@/components/module/edit/EditModule'
import React from 'react'

export default function EditAdminModulePage({ params }: { params: { id: string } }) {
  return (
    <div><EditModule moduleId={params?.id} /></div>
  )
}

