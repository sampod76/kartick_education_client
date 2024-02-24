import Checkout from "@/components/checkout/Checkout";
import React from "react";

export default function CheckOutCoursePage({
  params,
}: {
  params: { courseId: string };
}) {
  console.log(
    "🚀 ~ file: page.tsx:5 ~ CheckOutCoursePage ~ courseId:",
    params.courseId
  );
  return (
    <div>
      <Checkout courseId={params.courseId} />
    </div>
  );
}
