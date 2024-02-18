


import EditCourseLabel from '@/components/course_label/EditCourseLavel'
import React from 'react'

export default function UpdateCourseLabel({ params }: { params: { id: string } }) {
  return (
    <div><EditCourseLabel courseLabelId={params?.id} /></div>
  )
}



// export default EditCategoryPage;

// export default dynamic(() => Promise.resolve(EditCategoryPage), {
//   ssr: false,
// });
