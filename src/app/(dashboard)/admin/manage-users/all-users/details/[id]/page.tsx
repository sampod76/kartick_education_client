"use client";

import LoadingForDataFetch from "@/components/Utlis/LoadingForDataFetch";
import { NO_IMAGE } from "@/constants/filePatch";
import { useGetSingleadminQuery } from "@/redux/api/adminApi";
import { useGetSingleGeneralUserQuery } from "@/redux/api/adminApi/userManageApi";
import Image from "next/image";
import {
  GithubFilled,
  TwitterSquareFilled,
  FacebookFilled,
  LinkedinFilled,
  InstagramFilled,
} from "@ant-design/icons";
import Link from "next/link";
import { useGetSingleUserQuery } from "@/redux/api/adminApi/usersApi";
import ImageTag from "@/components/ui/CustomTag/ImageTag";

const EditUserPage = ({ params }: any) => {
  const id = params.id;
  console.log(id);
  const { data: userData, isLoading: loading } = useGetSingleUserQuery(id);

  console.log(userData);

  if (loading) {
    return <LoadingForDataFetch />;
  }

  const img = userData[userData.role]["img"];
  const gender = userData[userData.role]["gender"];
  const phoneNumber = userData[userData.role]["phoneNumber"];
  const address = userData[userData.role]["address"];
  const firstName = userData[userData.role]["name"].firstName;
  const lastName = userData[userData.role]["name"].lastName;

  return (
    <>
      <section className="block lg:flex justify-between gap-5">
        <aside className="w-full lg:w-[45%]">
          {/* profile card */}
          <div className=" bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-center">
              <ImageTag
                url={img}
                width={100}
                height={100}
                style="w-[9rem] h-[9rem] rounded-[50%]"
                alt="dd"
              />
            </div>
            <div className="mt-4 text-center">
              <h2 className="text-xl font-bold">
                Name: {firstName} {lastName}
              </h2>
              <h2 className="text-[18px] font-bold text-gray-700">
                {userData?.role}
              </h2>
              <h2 className="text-[18px] font-bold text-gray-700">{address}</h2>
            </div>
          </div>
          {/* website cards */}
          <div className="bg-white w-full flex flex-col gap-4 shadow-md p-4 py-9 mt-5">
            {/* Github */}
            <div className="flex justify-between ">
              <aside className="flex gap-3">
                <GithubFilled
                  style={{ fontSize: "24px", borderRadius: "2px" }}
                />
                <h2 className="text-[16px] font-semibold">Github</h2>
              </aside>
              <Link href={`https://github.com/sampod76`} target="_blank">
                https://github.com/sampod76
              </Link>
            </div>
            {/* Facebook */}
            <div className="flex justify-between ">
              <aside className="flex gap-3">
                <FacebookFilled
                  style={{ fontSize: "24px", borderRadius: "2px" }}
                />
                <h2 className="text-[16px] font-semibold">Facebook</h2>
              </aside>
              <Link href={`https://facebook.com/sampod76`} target="_blank">
                https://facebook.com/sampod76
              </Link>
            </div>
            {/* Linkedin */}
            <div className="flex justify-between ">
              <aside className="flex gap-3">
                <LinkedinFilled
                  style={{ fontSize: "24px", borderRadius: "2px" }}
                />
                <h2 className="text-[16px] font-semibold">Linkedin</h2>
              </aside>
              <Link href={`https://linkedin.com/sampod76`} target="_blank">
                https://linkedin.com/sampod76
              </Link>
            </div>
            {/* Twitter */}
            <div className="flex justify-between ">
              <aside className="flex gap-3">
                <TwitterSquareFilled
                  style={{ fontSize: "24px", borderRadius: "2px" }}
                />
                <h2 className="text-[16px] font-semibold">Twitter</h2>
              </aside>
              <Link href={`https://twiter.com/sampod76`} target="_blank">
                https://twiter.com/sampod76
              </Link>
            </div>
          </div>
        </aside>
        <aside className="w-full lg:w-[55%] ">
          {/* Information card */}
          <div className="flex flex-col gap-3 bg-white shadow-xl p-7 rounded">
            <div className="flex gap-5 justify-between  text-start  py-3">
              <h1 className="text-[18px] font-semibold text-start">
                Full Name
              </h1>
              <h3 className="text-[18px] ">
                {firstName} {lastName}
              </h3>
            </div>
            <div className="flex gap-5 justify-between  text-start  border-t-2 py-3">
              <h1 className="text-[18px] font-semibold text-start">Email</h1>
              <h3 className="text-[18px] ">{userData?.role}</h3>
            </div>
            <div className="flex gap-5 justify-between  text-start  border-t-2 py-3">
              <h1 className="text-[18px] font-semibold text-start">
                Contact No
              </h1>
              <h3 className="text-[18px] ">{phoneNumber}</h3>
            </div>
            <div className="flex gap-5 justify-between  text-start  border-t-2 py-3">
              <h1 className="text-[18px] font-semibold text-start">
                User status
              </h1>
              <h3 className="text-[18px] ">{userData?.status}</h3>
            </div>
            <div className="flex gap-5 justify-between  text-start  border-t-2 py-3">
              <h1 className="text-[18px] font-semibold text-start">Address</h1>
              <h3 className="text-[18px] ">{address}</h3>
            </div>
          </div>
        </aside>
      </section>
    </>
  );
};

export default EditUserPage;

function useAdminQuery(id: any): { data: any; isLoading: any } {
  throw new Error("Function not implemented.");
}
