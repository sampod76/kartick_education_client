import { AllImage } from "@/assets/AllImge";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const packageData = [
  {
    _id: "1",
    title: "Standard Plan",
    enroll_time: "2024-01-15T10:30:00Z",
    price: 29.99,
    time_duration: "3 months",
    img: AllImage.subscription.subFamily,
  },
  {
    _id: "2",
    title: "Premium Plan",
    enroll_time: "2024-01-20T12:45:00Z",
    price: 39.99,
    time_duration: "6 months",
    img: AllImage.subscription.subTeacher,
  },
  {
    _id: "3",
    title: "Basic Plan",
    enroll_time: "2024-01-10T08:00:00Z",
    price: 19.99,
    time_duration: "1 month",
    img: AllImage.subscription.subAdmin,
  },
];
export default function JoinPackage() {
  return (
    <div className="mt-[5rem]">
      <h2 className="text-[1.4rem] text-slate-700 font-normal mt-5 mb-2">
        Choose a package
      </h2>
      <div className="w-full mx-auto  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 ">
        {packageData?.map((packages, index: number) => {
          return (
            <div
              key={index + 1}
              className="w-full bg-white rounded-[10px] border mx-auto  items-center  shadow-xl  min-h-[24rem] flex flex-col justify-between"
            >
              {/* //! banner section */}
              <div className="bg-primary h-[4rem] w-full mt-0 py-3">
                <h1 className="text-center font-bold text-white">
                  {packages?.title}
                </h1>
              </div>
              <div className="py-3 flex flex-col justify-between   w-full">
                {/* //! course section */}
                <div className="py-3">
                  {/* single */}
                  {[
                    "Math",
                    "Language Art",
                    "science",
                    "Global Studies",
                    "Physics",
                  ]?.map((item: any) => {
                    return (
                      <div
                        className="flex justify- items-center gap-2 px-5 py-2"
                        key={item}
                      >
                        <Image
                          height={20}
                          width={20}
                          src={packages?.img}
                          alt="package"
                        />
                        <h5 className="text-primary text-md ">
                          {packages?.title} {item}
                        </h5>
                        <span className="text-[12px] text-slate-600 ">
                          (Pre-k t 12)
                        </span>
                      </div>
                    );
                  })}
                </div>
                {/*//! select button */}
                <Link
                  href={`/packages/join/${packages?._id}`}
                  className="w-[90%] mx-auto bg-white h-[48px] border border-primary  text-center px-7 py-3 text-primary hover:bg-primary hover:text-white font-semibold  rounded-xl my-3"
                >
                  Select
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
