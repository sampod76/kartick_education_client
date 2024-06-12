
import ViewCourse_label from "@/components/course_label/ViewCourseLavel";
import React from "react";

export default function DetailsAdminCourse_labelPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div>
      <ViewCourse_label courseLabelId={params?.id} />
    </div>
  );
}
