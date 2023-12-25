import Image from "next/image";
import {
  GithubFilled,
  TwitterSquareFilled,
  FacebookFilled,
  LinkedinFilled,
  InstagramFilled,
} from "@ant-design/icons";
import Link from "next/link";

import React from "react";
import ImageTag from "../ui/CustomTag/ImageTag";

const ProfilePage = ({ userData }: { userData: any }) => {
  console.log(userData);
  const img = userData?.img || userData[userData.role]["img"];
  console.log(img);
  const gender = userData?.gender || userData[userData.role]["gender"];
  const phoneNumber =
    userData?.phoneNumber || userData[userData.role]["phoneNumber"];
  const address = userData?.address || userData[userData.role]["address"];
  const firstName =
    userData?.name?.firstName || userData[userData.role]["name"].firstName;
  const lastName =
    userData?.name?.lastName || userData[userData.role]["name"].lastName;

  return (
    <div className="max-w-full lg:max-w-[80%] mx-auto block lg:flex justify-between gap-5">
      <aside className="w-full lg:w-[45%]">
        {/* profile card */}
        <div className=" bg-white  p-6 rounded-lg shadow-lg">
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
              Name: {firstName} {lastName} {userData?.role}
            </h2>
            <h2 className="text-[18px] font-bold text-gray-700">
              Full Stack Developer
            </h2>
            <h2 className="text-[18px] font-bold text-gray-700">{address}</h2>
          </div>
        </div>
        {/* website cards */}
        <div className="bg-white w-full flex flex-col gap-4 shadow-md p-4 py-9 mt-5">
          {/* Github */}
          <div className="flex justify-between ">
            <aside className="flex gap-3">
              <GithubFilled style={{ fontSize: "24px", borderRadius: "2px" }} />
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
            <h1 className="text-[16px] font-semibold text-start">Full Name</h1>
            <h3 className="text-[16px] ">
              {firstName} {lastName}
            </h3>
          </div>
          <div className="flex gap-5 justify-between  text-start  border-t-2 py-3">
            <h1 className="text-[16px] font-semibold text-start">Email</h1>
            <h3 className="text-[16px] ">{userData?.role}</h3>
          </div>
          <div className="flex gap-5 justify-between  text-start  border-t-2 py-3">
            <h1 className="text-[16px] font-semibold text-start">Contact No</h1>
            <h3 className="text-[16px] ">{phoneNumber}</h3>
          </div>
          <div className="flex gap-5 justify-between  text-start  border-t-2 py-3">
            <h1 className="text-[16px] font-semibold text-start">
              User status
            </h1>
            <h3 className="text-[16px] ">{userData?.status}</h3>
          </div>
          <div className="flex gap-5 justify-between  text-start  border-t-2 py-3">
            <h1 className="text-[16px] font-semibold text-start">Address</h1>
            <h3 className="text-[16px] ">{address}</h3>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default ProfilePage;
