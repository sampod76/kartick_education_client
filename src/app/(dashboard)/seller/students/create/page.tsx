"use client";

import CreateStudentComponent from "@/components/student/addStudentByAuthor/addStudentComponent";
import { useState } from "react";

const CreateStudentPage = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <CreateStudentComponent setOpen={setOpen} />
    </div>
  );
};

export default CreateStudentPage;
