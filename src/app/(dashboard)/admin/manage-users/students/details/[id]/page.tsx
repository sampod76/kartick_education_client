"use client";

import LoadingForDataFetch from "@/components/Utlis/LoadingForDataFetch";

import { useGetSingleStudentQuery } from "@/redux/api/adminApi/moderatorApi";
import StudentProfile from "@/components/profile/UserProfile";

const StudentDetailsPage = ({ params }: any) => {
  const id = params.id;

  const { data: userData, isLoading: loading } = useGetSingleStudentQuery(id);

  if (loading) {
    return <LoadingForDataFetch />;
  }

  return (
    <div>
      <StudentProfile userData={userData}></StudentProfile>
    </div>
  );
};

export default StudentDetailsPage;

function useAdminQuery(id: any): { data: any; isLoading: any } {
  throw new Error("Function not implemented.");
}
