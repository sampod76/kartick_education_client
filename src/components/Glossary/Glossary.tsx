import { useGetSingleGlossaryQuery } from '@/redux/api/adminApi/glossaryApi'
import React from 'react'

import parse from "html-react-parser";
import LoadingSkeleton from '../ui/Loading/LoadingSkeleton';


export default function GlossaryPage({moduleId}:{moduleId:string}) {

console.log("🚀 ~ file: Glossary.tsx:8 ~ GlossaryPage ~ moduleId:", moduleId)


// console.log(moduleId)
   const {data:glossaryData,isLoading}= useGetSingleGlossaryQuery("659f72a40be3552ff0eb4217")

   console.log("🚀 ~ GlossaryPage ~ glossaryData:", glossaryData)

   if(isLoading){
    return <LoadingSkeleton/>
   }

  return (
    <div>
         {glossaryData?.details && parse(glossaryData?.details)}
    </div>
  )
}
