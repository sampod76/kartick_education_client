"use client";

import LoadingForDataFetch from "@/components/Utlis/LoadingForDataFetch";
import { NO_IMAGE } from "@/constants/filePatch";

import { useGetSingleStudentQuery } from "@/redux/api/adminApi/studentApi";
import { IStudent } from "@/schemas/studentSchema";
import Image from "next/image";

const EditStudentPage = ({ params }: any) => {
  // console.log(params, "params");
  const { data, isLoading: loading } = useGetSingleStudentQuery(params?.id);
  const studentData:IStudent = data?.data;

  console.log(studentData);

  if (loading) {
    return <LoadingForDataFetch />;
  }

  return (
    <>
      <section className="flex justify-center items-center h-screen bg-gray-100">
        <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-center">
            <Image
              width={800}
              height={800}
              src={studentData?.img || NO_IMAGE}
              alt="Profile Image"
              className="w-60 h-60 rounded-full"
            />
          </div>
          <div className="mt-4 text-center">
            <h2 className="text-xl font-bold">Name: {studentData?.name?.firstName}</h2>
            <p className="text-gray-600">Gender: {studentData?.gender}</p>
            <p className="text-gray-600">
              Date of Birth:{" "}
              {new Date(studentData?.dateOfBirth).toLocaleDateString()}
            </p>
            <p className="text-gray-600">Phone: {studentData?.phoneNumber}</p>
            <p className="text-gray-600">Email: {studentData?.email}</p>
            <p className="text-gray-600">Address: {studentData?.address}</p>
            <p className="text-gray-600">
              {" "}
              Description :{studentData?.address}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditStudentPage;

function useAdminQuery(id: any): { data: any; isLoading: any } {
  throw new Error("Function not implemented.");
}
