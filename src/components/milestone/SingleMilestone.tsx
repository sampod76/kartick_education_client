import { SVGYelloDot } from "@/assets/svg/Icon";
import { IMilestoneData } from "@/types/miestoneType";
import Link from "next/link";
import React from "react";
import { ContainerOutlined } from "@ant-design/icons";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";

export default function SingleMilestone({
  milestoneData,
  index,
}: {
  milestoneData: IMilestoneData;
  index: number;
}) {
  // console.log('milestoneData', milestoneData)

  return (
    <div className="border-2 shadow-xl  rounded-xl">
      <Link
        href={`/module/${milestoneData?._id}`}
        className={`text-start text-[20px] flex gap-2 font-semibold font-['Inter'] leading-1 py-4  ${index % 8 === 0
          ? "bg-[#2c92a8]"
          : index % 7 === 0
            ? "bg-[#0374d4]"
            : index % 6 === 0
              ? "bg-[#159f85]"
              : index % 5 === 0
                ? "bg-[#a95fdc]"
                : index % 4 === 0
                  ? "bg-[#2c92a8]"
                  : index % 3 === 0
                    ? "bg-[#5a9b33]"
                    : index % 2 === 0
                      ? "bg-[#2c38a8]"
                      : "bg-[#215461]"
          }  text-white px-3 brightness-95 rounded-t-md`}
      >
        <ContainerOutlined />
        <span>{milestoneData?.title}</span>

        {/* //! Milestone Title */}
      </Link>

      <div className="py-3 px-2 pl-3 flex flex-col gap-x-2 gap-y-1">

        {milestoneData?.modules?.map((module: any, index: number) => {
          return (
            <Link
              href={`/lesson/module/${module?._id}?module=${module?.title}`}
              key={module?._id || index}
              className="text-gray-900 text-start flex justify-start  gap-1"
            >
              <p className="mt-1">
                <HiOutlineClipboardDocumentList />
              </p>
              <p className=" "> {module?.title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
