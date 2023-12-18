"use client";

import LoadingForDataFetch from "@/components/Utlis/LoadingForDataFetch";
import { NO_IMAGE } from "@/constants/filePatch";
import { useGetSingleadminQuery } from "@/redux/api/adminApi";
import Image from "next/image";

const EditAdminPage = ({ params }: any) => {
  const { data: adminData, isLoading: loading } = useGetSingleadminQuery(
    params?.id
  );
  console.log(adminData);

  if (loading) {
    return <LoadingForDataFetch />;
  }

  return (
    <>
      <section className="flex justify-center items-center h-screen bg-gray-100">
        <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-center">
            <Image width={800} height={800}
              src={adminData?.profileImage || NO_IMAGE } 
              alt="Profile Image"
              className="w-60 h-60 rounded-full"
            />
          </div>
          <div className="mt-4 text-center">
            <h2 className="text-xl font-bold">Name: {adminData?.name}</h2>
            <p className="text-gray-600">Gender: {adminData?.gender}</p>
            <p className="text-gray-600">Date of Birth: {new Date(adminData?.dateOfBirth).toLocaleDateString()}</p>
            <p className="text-gray-600">Phone: {adminData?.phoneNumber}</p>
            <p className="text-gray-600">Email: {adminData?.email}</p>
            <p className="text-gray-600">Address:  {adminData?.address}</p>
            <p className="text-gray-600"> Description :
              {adminData.address}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditAdminPage;

function useAdminQuery(id: any): { data: any; isLoading: any } {
  throw new Error("Function not implemented.");
}
