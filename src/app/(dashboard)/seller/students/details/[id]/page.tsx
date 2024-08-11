"use client";

import LoadingForDataFetch from "@/components/Utlis/LoadingForDataFetch";

import UserProfile from "@/components/profile/UserProfile";
import { useGetSingleStudentQuery } from "@/redux/api/adminApi/moderatorApi";

const StudentDetailsPage = ({ params }: any) => {
  const id = params.id;
  // console.log("🚀 ~ StudentDetailsPage ~ id:", id);

  const { data: userData, isLoading: loading } = useGetSingleStudentQuery(id);
  // console.log("🚀 ~ StudentDetailsPage ~ userData:", userData);

  if (loading) {
    return <LoadingForDataFetch />;
  }

  return (
    <div>
      <UserProfile userData={userData}></UserProfile>
    </div>
  );
};

export default StudentDetailsPage;
