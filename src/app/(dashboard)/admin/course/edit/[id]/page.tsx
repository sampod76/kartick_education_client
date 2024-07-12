
import EditCourse from '@/components/Course/EditCourse'
import React from 'react'

export default function EditAdminCoursePage({ params }: { params: { id: string } }) {
  return (
    <div><EditCourse courseId={params?.id}/></div>
  )
}


// export default CreateCoursePage;
// export default dynamic(() => Promise.resolve(UpdateCoursePage), {
//   ssr: false,
// });
