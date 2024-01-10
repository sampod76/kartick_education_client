"use client";
import CreateLessonByModule from "@/components/lesson/CreateLessonByModule";
import { useSearchParams } from "next/navigation";

export default function CreateAdminLessonByModule({
  params,
}: {
  params: { moduleId: string };
}) {
  console.log(params);

  const searchParams = useSearchParams();


  const moduleName = searchParams.get("moduleName")  as string


 return (<>
 <CreateLessonByModule moduleId={params?.moduleId} moduleName={moduleName}/>
 </>)
}
