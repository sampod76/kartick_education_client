"use client";

import LoadingForDataFetch from "@/components/Utlis/LoadingForDataFetch";

import { useGetSingleStudentQuery } from "@/redux/api/adminApi/moderatorApi";
import UserProfile from "@/components/profile/UserProfile";
import { USER_ROLE } from "@/constants/role";

const StudentDetailsPage = ({ params }: any) => {
  const id = params.id;

  const { data: userData, isLoading: loading } = useGetSingleStudentQuery(id);

  if (loading) {
    return <LoadingForDataFetch />;
  }

  return (
    <div>
      <UserProfile userData={{ ...userData, role: USER_ROLE.STUDENT }}></UserProfile>
    </div>
  );
};

export default StudentDetailsPage;

function useAdminQuery(id: any): { data: any; isLoading: any } {
  throw new Error("Function not implemented.");
}
