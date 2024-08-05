import SingleAssignmentAndSubmit from "@/components/assignment/SingleAssignmentAndSubmit";
import React from "react";

export default function AssignmentPage({ params }: any) {
  return (
    <div>
      <SingleAssignmentAndSubmit id={params?.id} />
    </div>
  );
}
