"use client";

import CreateStudentComponent from "@/components/student/addStudentByAuthor/addStudentComponent";
import { getUserInfo } from "@/services/auth.service";
import { useState } from "react";

const CreateStudentPage = () => {
  const userInfo = getUserInfo() as { email: string; id: string } | undefined;
  const [open, setOpen] = useState(false);
  return (
    <div>
      <CreateStudentComponent author={userInfo?.id} setOpen={setOpen} />
    </div>
  );
};

export default CreateStudentPage;
