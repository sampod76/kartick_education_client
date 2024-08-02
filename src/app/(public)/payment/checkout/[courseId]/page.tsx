import Checkout from "@/components/checkout/Checkout";
import React from "react";

export default function CheckOutCoursePage({
  params,
}: {
  params: { courseId: string };
}) {

  return (
    <div>
      <Checkout courseId={params.courseId} />
    </div>
  );
}
