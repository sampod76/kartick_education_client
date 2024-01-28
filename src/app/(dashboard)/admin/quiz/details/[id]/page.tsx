import ViewQuiz from '@/components/Quiz/ViewQuiz'
import React from 'react'

export default function ViewsAdminQuizPage({params}:{params:{id:string}}) {
  
  return (
    <div><ViewQuiz quizId={params?.id}/></div>
  )
}

