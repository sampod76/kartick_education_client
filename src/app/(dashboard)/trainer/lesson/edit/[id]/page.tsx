
import EditLesson from '@/components/lesson/EditLesson'
import React from 'react'

export default function EditAdminLessonPage({ params }: { params: { id: string } }) {
  return (
    <div><EditLesson lessonId={params?.id} /></div>
  )
}

