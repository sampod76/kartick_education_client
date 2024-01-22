"use client";

import StudentListCom from "@/components/student/studentListCom";
import { getUserInfo } from "@/services/auth.service";
import { useState } from "react";

const StudentPage = () => {
  const userInfo = getUserInfo() as { email: string; id: string } | undefined;
  const [open, setOpen] = useState(false);
  return <StudentListCom author={userInfo?.id} setOpen={setOpen} />;
};

export default StudentPage;
