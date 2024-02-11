"use client";

import StudentListCom from "@/components/student/studentListCom";
import { useState } from "react";

const StudentPage = () => {
  const [open, setOpen] = useState(false);
  return <StudentListCom setOpen={setOpen} />;
};

export default StudentPage;
