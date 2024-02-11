import ViewLesson from '@/components/lesson/ViewLesson'
import React from 'react'

export default function ViewAdminLessonPage({params}:{params:{id:string}}) {
  return (
    <div><ViewLesson lessonId={params?.id}/></div>
  )
}
