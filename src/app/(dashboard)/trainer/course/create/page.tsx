'use client'
import CreateCourse from "@/components/Course/CreateCourse";
import React, { useState } from "react";

export default function CreateCoursePage() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <CreateCourse setOpen={setOpen} />
    </div>
  );
}
