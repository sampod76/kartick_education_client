import UpdatePackage from '@/components/package/update/EditPackage'
import React from 'react'

export default function EditPackagePage({ params }: { params: { id: string } }) {
  return (
    <div><UpdatePackage id={params?.id} /></div>
  )
}
