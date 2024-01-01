"use client";

import LoadingForDataFetch from "@/components/Utlis/LoadingForDataFetch";

import { useGetSingleUserQuery } from "@/redux/api/adminApi/usersApi";

import UserProfilePage from "@/components/profile/ProfileInstructorPage";

const UserDetailsPage = ({ params }: any) => {
  const id = params.id;
  console.log(id);
  const { data: userData, isLoading: loading } = useGetSingleUserQuery(id);

  console.log(userData);

  if (loading) {
    return <LoadingForDataFetch />;
  }

  return (
    <div>
      <UserProfilePage userData={userData}></UserProfilePage>
    </div>
  );
};

export default UserDetailsPage;

function useAdminQuery(id: any): { data: any; isLoading: any } {
  throw new Error("Function not implemented.");
}
