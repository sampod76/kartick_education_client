import ModuleTab from "@/components/module/ModuleTab";
import ModuleTop from "@/components/module/ModuleTop";
import React from "react";

export default function LessonPage({ params }: { params: { id: string } }) {
  const moduleId = params.id;
  console.log(moduleId);

  return <div>
       <ModuleTop moduleId={moduleId} />
      <ModuleTab moduleId={moduleId}/>
  </div>;
}
