

import EditCategory from '@/components/category/EditCategory'
import React from 'react'

export default function UpdateAdminCategoryPage({params}:{params:{id:string}}) {
  return (
    <div><EditCategory categoryId={params?.id}/></div>
  )
}



// export default EditCategoryPage;

// export default dynamic(() => Promise.resolve(EditCategoryPage), {
//   ssr: false,
// });
