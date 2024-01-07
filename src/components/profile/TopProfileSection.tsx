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

export type IProfileDetailsTop = {
  headings: string;
  sub_headings: string;
  total_student: number;
  total_course: number;
  total_review: number;
  total_subscription: number;
  img: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  youtube?: string;
  edit_link?: string;
  detail_link?: string;
};

export default function TopProfileSection({
  topDetails,
}: {
  topDetails: IProfileDetailsTop;
}) {
  console.log("🚀 ~ file: TopProfileSection.tsx:34 ~ topDetails:", topDetails)

  const statisticsInfo: { title: string; number: number }[] = [
    {
      title: "Student ",
      number: topDetails.total_student || 0,
    },
    {
      title: "Course ",
      number: topDetails.total_course || 0,
    },
    {
      title: "Reviews ",
      number: topDetails?.total_review || 0,
    },
    {
      title: "Subscription ",
      number: topDetails.total_subscription || 0,
    },
  ];

  // const img = topDetails?.img || userData[userData.role]["img"];
  // // console.log(img);
  // const gender = userData?.gender || userData[userData.role]["gender"];
  // const phoneNumber =
  //   userData?.phoneNumber || userData[userData.role]["phoneNumber"];
  // const address = userData?.address || userData[userData.role]["address"];
  // const firstName =
  //   userData?.name?.firstName || userData[userData.role]["name"].firstName;
  // const lastName =
  //   userData?.name?.lastName || userData[userData.role]["name"].lastName;

  return (
    <div>
      <div className=" bg-[#333333] py-[3rem] text-white p-6 rounded-lg shadow-lg block lg:flex justify-between items-center gap-3  px-2 lg:px-[10%]">
        {/* user avatar sections */}
        <div className="flex justify-center flex-col items-center lg:items-start gap-5">
          <aside className="block lg:flex gap-5 ">
            <Image
              src={topDetails?.img}
              width={100}
              height={100}
              className="w-[5rem] h-[5rem] rounded-[100%] mx-auto "
              alt="userProfile"
            />
            <div className="mt-4 text-center">
              <h2 className="text-[24px] font-bold">{topDetails.headings}</h2>
              <h2 className="text-[14px]">{topDetails?.sub_headings}</h2>
            </div>
          </aside>

          {/* user box section  */}

          <div className="flex  justify-center items-center">
            {statisticsInfo?.map((info: any, index: number) => {
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
        </div>

        <div className="flex flex-col gap-5 mt-5 lg:mt-0">
          {/* SOcial sections */}
          <div className="flex justify-center items-center  gap-3">
            <Link href={topDetails.facebook || "/"}>
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
            <Link href={topDetails.twitter || "/"}>
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
            <Link href={topDetails.linkedin || "/"}>
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
            <Link href={topDetails.youtube || "/"}>
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
            <Link
              href={topDetails.detail_link || "/"}
              className="px-3 py-1 bg-[red] rounded"
            >
              Explore Studio
            </Link>
            <Link
              href={topDetails.edit_link || "/"}
              className="px-3 py-1 border border-white rounded"
            >
              Edit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
