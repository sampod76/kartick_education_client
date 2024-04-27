"use client";

import LoadingForDataFetch from "@/components/Utlis/LoadingForDataFetch";

import { useGetSingleStudentQuery } from "@/redux/api/adminApi/moderatorApi";
import UserProfile from "@/components/profile/UserProfile";
import { useGetSingleAdminQuery } from "@/redux/api/adminApi/adminApi";
import { USER_ROLE } from "@/constants/role";

const AdminDetailsPage = ({ params }: any) => {
  const id = params.id;

  const { data: userData, isLoading: loading } = useGetSingleAdminQuery(id);



  if (loading) {
    return <LoadingForDataFetch />;
  }

  return (
    <div>
      <UserProfile userData={{ ...userData, role: USER_ROLE.ADMIN }}></UserProfile>
    </div>
  );
};

export default AdminDetailsPage;

function useAdminQuery(id: any): { data: any; isLoading: any } {
  throw new Error("Function not implemented.");
}
