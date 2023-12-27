import ModuleList from "@/components/module/ModuleList";
import ModuleTab from "@/components/module/ModuleTab";
import ModuleTop from "@/components/module/ModuleTop";
import React from "react";

export default function ModulePage({ params }: { params: { id: string } }) {
  const milestoneId = params?.id;
  console.log(milestoneId);
  return (
    <div>
      <h1>ModulePageDetails Page</h1>
      <ModuleList milestoneId={milestoneId}></ModuleList>
   
    </div>
  );
}
