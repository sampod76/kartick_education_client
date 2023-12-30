import Image from "next/image";
import React from "react";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import Link from "next/link";

const moderatorInfo = [
  {
    title: "Student ",
    number: 612,
  },
  {
    title: "Course ",
    number: 8,
  },
  {
    title: "Reviews ",
    number: 11,
  },
  {
    title: "Subscription ",
    number: 452,
  },
];

export default function TopProfileSection({ userData }: { userData: any }) {
  const img = userData?.img || userData[userData.role]["img"];
  // console.log(img);
  const gender = userData?.gender || userData[userData.role]["gender"];
  const phoneNumber =
    userData?.phoneNumber || userData[userData.role]["phoneNumber"];
  const address = userData?.address || userData[userData.role]["address"];
  const firstName =
    userData?.name?.firstName || userData[userData.role]["name"].firstName;
  const lastName =
    userData?.name?.lastName || userData[userData.role]["name"].lastName;
  return (
    <div>
      <div className=" bg-[#333333] text-white p-6 rounded-lg shadow-lg flex flex-col gap-5">
        {/* user avatar sections */}
        <div className="flex justify-center flex-col items-center">
          <Image
            src={img}
            width={100}
            height={100}
            className="w-[5rem] h-[5rem] rounded-[100%] "
            alt="userProfile"
          />
          <div className="mt-4 text-center">
            <h2 className="text-[24px] font-bold">
              Name: {userData?.name?.firstName} {userData?.name?.lastName}{" "}
              {userData?.role}
            </h2>
            <h2 className="text-[14px]">Full Stack Developer</h2>
          </div>
        </div>

        {/* user box section  */}

        <div className="flex  justify-center items-center">
          {moderatorInfo?.map((info: any, index: number) => {
            return (
              <div
                className="px-5 py-2 flex flex-col justify-center items-center border border-white gap-2 "
                key={index}
              >
                <h2 className="text-[14px]">{info.title}</h2>
                <h2 className="text-[14px]">{info.number}</h2>
              </div>
            );
          })}
        </div>

        {/* SOcial sections */}
        <div className="flex justify-center items-center  gap-3">
          <Link href="">
            <FacebookOutlined
              style={{
                fontSize: "38px",
                fontWeight: "bold",
                color: "blue",
                backgroundColor: "white",
                borderRadius: "4px",
              }}
            />
          </Link>
          <Link href="">
            <TwitterOutlined
              style={{
                fontSize: "38px",
                fontWeight: "bold",
                color: "#1DA1F2",
                backgroundColor: "  white",
                borderRadius: "4px",
              }}
            />
          </Link>
          <Link href="">
            <LinkedinOutlined
              style={{
                fontSize: "38px",
                fontWeight: "bold",
                color: "#8D6CAB",
                backgroundColor: "white",
                borderRadius: "4px",
              }}
            />
          </Link>
          <Link href="">
            <YoutubeOutlined
              style={{
                fontSize: "38px",
                fontWeight: "bold",
                color: " #FF0000",
                // backgroundColor: "white",
                borderRadius: "4px",
              }}
            />
          </Link>
        </div>

        {/* button Sections */}
        <div className="flex justify-center items-center  font-[550] gap-3">
          <button className="px-3 py-1 bg-[red] rounded">Course Studio</button>
          <button className="px-3 py-1 border border-white rounded">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
