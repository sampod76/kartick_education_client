import EditSingleQuiz from '@/components/single-auiz/EditSingleQuiz'
import React from 'react'

export default function EditAdminSIngleQuizPage({ params }: { params: { id: string } }) {
  return (
    <div><EditSingleQuiz singleQuizId={params?.id}/></div>
  )
}
