import ModuleTab from "@/components/module/ModuleTab";
import ModuleTop from "@/components/module/ModuleTop";
import React from "react";

export default function ModulePage({ params }: { params: { id: string } }) {
    const moduleId = params?.id
  console.log(moduleId);
  return (
    <div>
      <h1>ModulePageDetails Page</h1>
      <ModuleTop moduleId={moduleId} />
      <ModuleTab moduleId={moduleId}/>
    </div>
  );
}
