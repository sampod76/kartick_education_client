import ModuleList from "@/components/module/ModuleList";
import ModuleTab from "@/components/module/ModuleTab";
import ModuleTop from "@/components/module/ModuleTop";
import React from "react";

export default function ModulePage({ params }: { params: { id: string } }) {
  const milestoneId = params?.id;

  return (
    <div>
      <ModuleList milestoneId={milestoneId}></ModuleList>
    </div>
  );
}
