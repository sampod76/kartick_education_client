"use client";

import LoadingForDataFetch from "@/components/Utlis/LoadingForDataFetch";

import { useGetSingleStudentQuery } from "@/redux/api/adminApi/moderatorApi";
import UserProfile from "@/components/profile/UserProfile";
import { useGetSingleSellerQuery } from "@/redux/api/adminApi/sellerApi";
import { USER_ROLE } from "@/constants/role";

const TeacherDetailsPage = ({ params }: any) => {
  const id = params.id;

  const { data: userData, isLoading: loading } = useGetSingleSellerQuery(id);

  console.log(userData);

  if (loading) {
    return <LoadingForDataFetch />;
  }

  return (
    <div>
      <UserProfile userData={{ ...userData, role: USER_ROLE.SELLER }}></UserProfile>
    </div>
  );
};

export default TeacherDetailsPage;

