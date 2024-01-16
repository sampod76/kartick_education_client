"use client";
import { AllImage } from "@/assets/AllImge";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { IPlan } from "./JoinMain";
import { Card, Checkbox, Input, Radio, Select, Space, message } from "antd";
import { IPackageData } from "@/types/packageType";
import { useGetAllPackageQuery } from "@/redux/api/userApi/packageAPi";
import { IPackageCategory } from "../../../types/packageType";
import InternelError from "@/components/shared/Error/InternelError";
import LoadingSkeleton from "@/components/ui/Loading/LoadingSkeleton";
// interface ICaterory {
//   _id: string;
//   title: string;
//   img: string;

//   monthly?: {
//     price: number;
//     each_student_increment: number;
//   };
//   biannual?: {
//     price: number;
//     each_student_increment: number;
//   };
//   yearly?: {
//     price: number;
//     each_student_increment: number;
//   };
// }

// interface IPackage {
//   _id: string;
//   title: string;
//   img?: string;
//   type: "combo" | "select" | "multiple";
//   price_time?: string;
//   date_range?: [string];
//   categories: ICaterory[];
//   monthly?: {
//     price: number;
//     each_student_increment: number;
//   };
//   biannual?: {
//     price: number;
//     each_student_increment: number;
//   };
//   yearly?: {
//     price: number;
//     each_student_increment: number;
//   };
// }

// const packageData: IPackage[] = [
//   {
//     _id: "1",
//     title: "Core Subjects",
//     img: "core_subjects_image_url",
//     type: "combo",
//     monthly: {
//       price: 100,
//       each_student_increment: 4,
//     },
//     yearly: {
//       price: 100,
//       each_student_increment: 40,
//     },
//     biannual: {
//       price: 100,
//       each_student_increment: 20,
//     },

//     price_time: "monthly",
//     categories: [
//       {
//         _id: "11",
//         title: "Math (Pre-K to 12)",
//         img: "math_image_url",
//       },
//       {
//         _id: "12",

//         title: "Language Arts (Pre-K to 12)",
//         img: "language_arts_image_url",
//         // monthly_price: 42,
//         // yearly_price: 159,
//       },
//       {
//         title: "Science (Grades K to 8)",
//         img: "science_image_url",
//         // monthly_price: 20,
//         // yearly_price: 159,
//         _id: "13",
//       },
//       {
//         title: "Social Studies (Grades K to 8)",
//         img: "social_studies_image_url",
//         // monthly_price: 20,
//         // yearly_price: 159,
//         _id: "14",
//       },
//     ],
//   },
//   {
//     _id: "2",
//     title: "Combo Package",
//     img: "combo_package_image_url",
//     type: "combo",
//     monthly: {
//       price: 120,
//       each_student_increment: 4,
//     },
//     biannual: {
//       price: 500,
//       each_student_increment: 20,
//     },
//     yearly: {
//       price: 920,
//       each_student_increment: 40,
//     },

//     categories: [
//       {
//         title: "Math (Pre-K to 12)",
//         img: "math_image_url",
//         _id: "21",
//       },
//       {
//         title: "Language Arts (Pre-K to 12)",
//         img: "language_arts_image_url",
//         _id: "22",
//       },
//     ],
//   },
//   {
//     _id: "3",
//     title: "Single Subject",
//     img: "single_subject_image_url",
//     type: "select",
//     monthly: {
//       price: 220,
//       each_student_increment: 4,
//     },
//     biannual: {
//       price: 600,
//       each_student_increment: 20,
//     },
//     yearly: {
//       price: 1020,
//       each_student_increment: 40,
//     },
//     categories: [
//       {
//         _id: "31",
//         title: "Math (Pre-K to 12)",
//         img: "math_image_url",
//       },
//       {
//         title: "Language Arts (Pre-K to 12)",
//         img: "language_arts_image_url",
//         _id: "32",
//       },
//     ],
//   },
//   {
//     _id: "4",
//     title: "Multiple Subject",
//     img: "Multiple_image_url",
//     type: "multiple",

//     monthly: {
//       price: 420,
//       each_student_increment: 4,
//     },
//     biannual: {
//       price: 550,
//       each_student_increment: 20,
//     },
//     yearly: {
//       price: 820,
//       each_student_increment: 40,
//     },
//     categories: [
//       {
//         _id: "41",
//         title: "Math (Pre-K to 12)",
//         img: "math_image_url",
//         // monthly_price: 20,
//         // yearly_price: 79,
//       },
//       {
//         _id: "42",
//         title: "Language Arts (Pre-K to 12)",
//         img: "language_arts_image_url",
//         // monthly_price: 40,
//         // yearly_price: 79,
//       },
//     ],
//   },
// ];

export default function JoinPackage({
  plan,
  setPlan,
  quantity,
  setQuantity,
}: {
  plan: IPlan;
  setPlan: React.Dispatch<React.SetStateAction<IPlan>>;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}) {
  // const calculateTotalPrice = (categories: ICaterory[], plan: string) => {
  //   return (
  //     categories.reduce((total, caterory) => {
  //       const price =
  //         plan === "monthly" ? caterory.monthly_price ?? 0 : caterory.yearly_price;
  //       return total + price;
  //     }, 0) * quantity
  //   );
  // }

  const { data, isLoading, error } = useGetAllPackageQuery({
    status: "active",
    limit: 9999,
  });

  const packageData = data?.data ?? [];

  console.log(packageData);

  // ! For select package

  // For select package
  const [selectPackage, setSelectPackage] = useState<IPackageData | null>(
    packageData[0] || null
  );

  ///! for the multiple and single select package

  const [singleSelect, setSingleSelect] = useState("");
  const [multipleSelect, setMultipleSelect] = useState("");

  console.log(singleSelect, "ppppppppppp", multipleSelect);
  const calculatePackage2 = (packages: IPackageData): number | undefined => {
    // console.log(packages);

    let newPrice = 0;

    if (plan === "monthly" && packages?.monthly) {
      newPrice =
        packages.monthly.price +
        packages.monthly.each_student_increment * quantity;
    } else if (plan === "biannual" && packages?.biannual) {
      newPrice =
        packages.biannual.price +
        packages.biannual.each_student_increment * quantity;
    } else if (plan === "yearly" && packages?.yearly) {
      newPrice =
        packages.yearly.price +
        packages.yearly.each_student_increment * quantity;
    }
    return newPrice;
  };

  const selectPackageHandler = (value: IPackageData) => {
    setSelectPackage(value);
    message.success(`Selected ${value?.title}`);
    console.log(value);
    if (value?.type === "select") {
    }
    // const selectedPackageData = {};
  };

  // console.log(packageData);

  // For error
  if (error) {
    return (
      <InternelError
        message={
          //@ts-ignore
          error?.data ||
          //@ts-ignore
          data?.data?.message
        }
      />
    );
  }
  return (
    <div className="mt-[5rem]">
      <h2 className="text-[1.4rem] text-slate-700 font-normal mt-5 mb-2">
        Choose a package
      </h2>
      {isLoading && <LoadingSkeleton />}
      <div className="w-full mx-auto  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 ">
        {packageData?.map((packages: IPackageData, index: number) => {
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
                {/* //! category section */}
                <div className="py-3">
                  {/* single */}
                  {packages?.type === "bundle" &&
                    packages?.categories?.map(
                      (categoryData: IPackageCategory) => {
                        const category = categoryData?.category;
                        // console.log(category);
                        return (
                          <div
                            className="flex justify- items-center gap-2 px-5 py-2 "
                            key={category?.title}
                          >
                            {/* <Image
                          height={20}
                          width={20}
                          src={packages?.img}
                          alt="package"
                        /> */}

                            <h5 className="text-primary text-md ">
                              {category?.title}
                            </h5>

                            <span className="text-[12px] text-slate-600 ">
                              (Pre-k t 12)
                            </span>
                          </div>
                        );
                      }
                    )}
                  {packages?.type === "select" && (
                    <div>
                      <Radio.Group
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "1rem",
                        }}
                        onChange={(e) => setSingleSelect(e.target.value)}
                      >
                        {packages?.categories?.map(
                          (option?: IPackageCategory) => (
                            <Radio
                              key={option?.category?.title}
                              value={option?._id}
                              style={{
                                display: "flex",
                                paddingTop: "0.5rem",
                                paddingBottom: "0.5rem",
                                paddingLeft: "1.25rem",
                                paddingRight: "1.25rem",
                                gap: "0.5rem",
                                alignItems: "center",
                              }}
                            >
                              <h5 className="text-primary text-md ">
                                {option?.category?.title}
                              </h5>

                              <span className="text-[12px] text-slate-600 ">
                                {option?.label}
                              </span>
                            </Radio>
                          )
                        )}
                      </Radio.Group>
                    </div>
                  )}
                  {packages?.type === "multiple_select" && (
                    <div>
                      <Checkbox.Group
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "1rem",
                        }}
                        onChange={(value: any) => setMultipleSelect(value)}
                      >
                        {packages?.categories?.map(
                          (option?: IPackageCategory) => (
                            <Checkbox
                              key={option?.category?.title}
                              value={option?._id}
                              style={{
                                display: "flex",
                                paddingTop: "0.5rem",
                                paddingBottom: "0.5rem",
                                paddingLeft: "1.25rem",
                                paddingRight: "1.25rem",
                                gap: "0.5rem",
                                alignItems: "center",
                              }}
                            >
                              <h5 className="text-primary text-md ">
                                {option?.category?.title}
                              </h5>

                              <span className="text-[12px] text-slate-600 ">
                                {option?.label}
                              </span>
                            </Checkbox>
                          )
                        )}
                      </Checkbox.Group>
                    </div>
                  )}
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
