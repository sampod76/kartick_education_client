import Checkout from '@/components/checkout/Checkout'
import React from 'react'

export default function CheckOutCoursePage({ courseId }: { courseId: string }) {
    console.log("🚀 ~ file: page.tsx:5 ~ CheckOutCoursePage ~ courseId:", courseId)
    return (
        <div><Checkout /></div>
    )
}
