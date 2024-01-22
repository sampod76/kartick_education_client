"use client";

import EditStudentComponent from "@/components/student/editStudent";

const EditStudentPage = ({ params }: any) => {
  return (
    <>
      <EditStudentComponent id={params?.id} />
    </>
  );
};

export default EditStudentPage;


