import { AllImage } from "@/assets/AllImge";
import { message } from "antd";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

interface ICourse {
  title: string;
  img: string;
  monthly_price?: number | null;
  yearly_price: number;
}

interface IPackage {
  title: string;
  img: string;
  courses: ICourse[];
}

const packageData: IPackage[] = [
  {
    title: "Core Subjects",
    img: "core_subjects_image_url",
    courses: [
      {
        title: "Math (Pre-K to 12)",
        img: "math_image_url",
        monthly_price: 28,
        yearly_price: 159,
      },
      {
        title: "Language Arts (Pre-K to 12)",
        img: "language_arts_image_url",
        monthly_price: 42,
        yearly_price: 159,
      },
      {
        title: "Science (Grades K to 8)",
        img: "science_image_url",
        monthly_price: 20,
        yearly_price: 159,
      },
      {
        title: "Social Studies (Grades K to 8)",
        img: "social_studies_image_url",
        monthly_price: 20,
        yearly_price: 159,
      },
    ],
  },
  {
    title: "Combo Package",
    img: "combo_package_image_url",
    courses: [
      {
        title: "Math (Pre-K to 12)",
        img: "math_image_url",
        monthly_price: 24,
        yearly_price: 129,
      },
      {
        title: "Language Arts (Pre-K to 12)",
        img: "language_arts_image_url",
        monthly_price: 25,
        yearly_price: 129,
      },
    ],
  },
  {
    title: "Single Subject",
    img: "single_subject_image_url",
    courses: [
      {
        title: "Math (Pre-K to 12)",
        img: "math_image_url",
        monthly_price: 20,
        yearly_price: 79,
      },
      {
        title: "Language Arts (Pre-K to 12)",
        img: "language_arts_image_url",
        monthly_price: 40,
        yearly_price: 79,
      },
    ],
  },
];

export default function JoinPackage({
  plan,
  setPlan,
  quantity,
  setQuantity,
}: {
  plan: string;
  setPlan: React.Dispatch<React.SetStateAction<"monthly" | "yearly">>;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}) {
  const calculateTotalPrice = (courses: ICourse[], plan: string) => {
    return (
      courses.reduce((total, course) => {
        const price =
          plan === "monthly" ? course.monthly_price ?? 0 : course.yearly_price;
        return total + price;
      }, 0) * quantity
    );
  };

  ///! For select package

  const [selectPackage, setSelectPackage] = useState<IPackage>(packageData[0]);
  const selectPackageHandler = (value: IPackage) => {
    setSelectPackage(value);
    message.success(`Selected ${value?.title}`);
  };

  return (
    <div className="mt-[5rem]">
      <h2 className="text-[1.4rem] text-slate-700 font-normal mt-5 mb-2">
        Choose a package
      </h2>
      <div className="w-full mx-auto  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 ">
        {packageData?.map((packages: IPackage, index: number) => {
          const totalPackagePrice = calculateTotalPrice(packages.courses, plan);
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
                  {packages?.courses?.map((course: ICourse) => {
                    return (
                      <div
                        className="flex justify- items-center gap-2 px-5 py-2"
                        key={course?.title}
                      >
                        {/* <Image
                          height={20}
                          width={20}
                          src={packages?.img}
                          alt="package"
                        /> */}
                        <h5 className="text-primary text-md ">
                          {course?.title}
                        </h5>

                        <span className="text-[12px] text-slate-600 ">
                          (Pre-k t 12)
                        </span>
                      </div>
                    );
                  })}
                </div>

                <h2 className="text-4xl font-bold text-center text-slate-700 ">
                  ${totalPackagePrice}
                  <span className="text-2xl text-slate-500"> /{plan}</span>
                </h2>
                {/*//! select button */}
                <button
                  onClick={() => selectPackageHandler(packages)}
                  className={`w-[90%] mx-auto  h-[48px] border border-primary  text-center px-7 py-3   font-semibold  rounded-xl my-3 ${
                    selectPackage?.title === packages?.title ?
                    "bg-primary text-white":"bg-white text-primary"
                  }`}
                >
                  Select
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
