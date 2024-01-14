import { AllImage } from "@/assets/AllImge";
import { message } from "antd";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { IPlan } from "./JoinMain";

interface ICourse {
  _id: string;
  title: string;
  img: string;
  monthly_price?: number | null;
  yearly_price?: number;
}

interface IPackage {
  _id: string;
  title: string;
  img?: string;
  type: string;
  price_time?: string;
  date_range?: [string];
  courses: ICourse[];
  biannual?: {
    price: number;
    increment: number;
  };
  monthly?: {
    price: number;
    increment: number;
  };
  yearly?: {
    price: number;
    increment: number;
  };
}

const packageData: IPackage[] = [
  {
    _id: "1",
    title: "Core Subjects",
    img: "core_subjects_image_url",
    type: "combo",
    monthly: {
      price: 100,
      increment: 4,
    },
    yearly: {
      price: 100,
      increment: 40,
    },
    biannual: {
      price: 100,
      increment: 20,
    },

    price_time: "monthly",
    courses: [
      {
        _id: "11",
        title: "Math (Pre-K to 12)",
        img: "math_image_url",
      },
      {
        _id: "12",

        title: "Language Arts (Pre-K to 12)",
        img: "language_arts_image_url",
        // monthly_price: 42,
        // yearly_price: 159,
      },
      {
        title: "Science (Grades K to 8)",
        img: "science_image_url",
        // monthly_price: 20,
        // yearly_price: 159,
        _id: "13",
      },
      {
        title: "Social Studies (Grades K to 8)",
        img: "social_studies_image_url",
        // monthly_price: 20,
        // yearly_price: 159,
        _id: "14",
      },
    ],
  },
  {
    _id: "2",
    title: "Combo Package",
    img: "combo_package_image_url",
    type: "combo",
    monthly: {
      price: 120,
      increment: 4,
    },
    biannual: {
      price: 500,
      increment: 20,
    },
    yearly: {
      price: 920,
      increment: 40,
    },

    courses: [
      {
        title: "Math (Pre-K to 12)",
        img: "math_image_url",
        _id: "21",
      },
      {
        title: "Language Arts (Pre-K to 12)",
        img: "language_arts_image_url",
        _id: "22",
      },
    ],
  },
  {
    _id: "3",
    title: "Single Subject",
    img: "single_subject_image_url",
    type: "select",
    monthly: {
      price: 220,
      increment: 4,
    },
    biannual: {
      price: 600,
      increment: 20,
    },
    yearly: {
      price: 1020,
      increment: 40,
    },
    courses: [
      {
        _id: "31",
        title: "Math (Pre-K to 12)",
        img: "math_image_url",
        monthly_price: 20,
        yearly_price: 79,
      },
      {
        title: "Language Arts (Pre-K to 12)",
        img: "language_arts_image_url",
        _id: "32",
      },
    ],
  },
  {
    _id: "4",
    title: "Multiple Subject",
    img: "Multiple_image_url",
    type: "multiple",

    monthly: {
      price: 420,
      increment: 4,
    },
    biannual: {
      price: 550,
      increment: 20,
    },
    yearly: {
      price: 820,
      increment: 40,
    },
    courses: [
      {
        _id: "41",
        title: "Math (Pre-K to 12)",
        img: "math_image_url",
        // monthly_price: 20,
        // yearly_price: 79,
      },
      {
        _id: "42",
        title: "Language Arts (Pre-K to 12)",
        img: "language_arts_image_url",
        // monthly_price: 40,
        // yearly_price: 79,
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
  setPlan: React.Dispatch<React.SetStateAction<IPlan>>;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}) {
  // const calculateTotalPrice = (courses: ICourse[], plan: string) => {
  //   return (
  //     courses.reduce((total, course) => {
  //       const price =
  //         plan === "monthly" ? course.monthly_price ?? 0 : course.yearly_price;
  //       return total + price;
  //     }, 0) * quantity
  //   );
  // }

  const calculatePackage2 = (packages: IPackage): number => {
    console.log(packages);
    if (packages?.type) {
    }

    return 0;
    // if (packages.type === "combo") {
    //   return packages.price;
    // }
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
          const totalPackagePrice = calculatePackage2(packages);
          return (
            <div
              key={index + 1}
              className="w-full bg-white rounded-[10px] border mx-auto  items-center  shadow-xl  min-h-[24rem] flex flex-col justify-between"
            >
              {/* //! banner section */}
              <div className="bg-primary h-[4rem] w-full mt-0 py-3 rounded-t-lg">
                <h1 className="text-center font-bold text-white ">
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
                    selectPackage?.title === packages?.title
                      ? "bg-primary text-white"
                      : "bg-white text-primary"
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
