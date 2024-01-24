import EditPackage from '@/components/package/update/EditPackage'
import React from 'react'

export default function EditPackagePage({ params }: { params: { id: string } }) {
  return (
    <div><EditPackage packageId={params?.id} /></div>
  )
}
