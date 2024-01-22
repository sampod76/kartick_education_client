import EditQuiz from '@/components/Quiz/EditQuiz'
import React from 'react'

export default function EditCoursePage({ params }: { params: { id: string } }) {
  return (
    <div><EditQuiz quizId={params?.id} /></div>
  )
}

