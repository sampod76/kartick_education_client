"use client";
import { AllImage } from "@/assets/AllImge";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IPlan } from "./JoinMain";
import {
  Button,
  Card,
  Checkbox,
  Input,
  Radio,
  Select,
  Space,
  message,
} from "antd";
import { IPackageData } from "@/types/packageType";
import { useGetAllPackageQuery } from "@/redux/api/userApi/packageAPi";
import { IPackageCategory } from "../../../types/packageType";
import InternelError from "@/components/shared/Error/InternelError";
import LoadingSkeleton from "@/components/ui/Loading/LoadingSkeleton";
import { ENUM_STATUS, ENUM_YN } from "@/constants/globalEnums";

import { loadStripe } from "@stripe/stripe-js";

import {
  useAddPaypalPaymentMutation,
  useAddStripePaymentMutation,
} from "@/redux/api/public/paymentApi";
import ButtonLoading from "@/components/ui/Loading/ButtonLoading";
import { useSearchParams } from "next/navigation";
import { getUserInfo } from "@/services/auth.service";
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
  // const paramsSearch = useSea
  const userInfo = getUserInfo() as any;

  const searchParams = useSearchParams();
  const packName = searchParams.get("pack") as string;

  // For select package
  const [selectPackage, setSelectPackage] = useState<any | null>({});
  ///! for the multiple and single select package
  const [singleSelect, setSingleSelect] = useState<Record<string, any>>({});
  const [multipleSelect, setMultipleSelect] = useState<string[]>([]);

  // const calculateTotalPrice = (categories: ICaterory[], plan: string) => {
  //   return (
  //     categories.reduce((total, caterory) => {
  //       const price =
  //         plan === "monthly" ? caterory.monthly_price ?? 0 : caterory.yearly_price;
  //       return total + price;
  //     }, 0) * quantity
  //   );
  // }
  const [
    createStripePayment,
    { isLoading: paymentLoading, error: paymentError },
  ] = useAddStripePaymentMutation();
  const [
    createPaypalPayment,
    { isLoading: PaypalPaymentLoading, error: PaypalPaymentError },
  ] = useAddPaypalPaymentMutation();

  const makePayment = async (platform?: string) => {
    if (!userInfo?.id) {
      window.open("/login", "_blank");
      return;
    }
    if (!selectPackage?._id) {
      message.error("Please select any package")
      return
    }
    if (packName === 'family_personal' && quantity > 11) {
      message.info("Select max 10 for Family Pack")
      setSelectPackage(null)
      return
    }
    else if (packName === 'school_teacher' && quantity < 11) {
      setSelectPackage(null)
      message.info("Select min 10 for School Teacher  Pack")
      return
    }

    let categories = [];
    if (selectPackage?.type === "bundle") {
      categories = selectPackage.categories.map((singleCategory: any) => ({
        category: singleCategory.category?._id,
        label: singleCategory.label,
      }));
    } else if (selectPackage?.type === "select") {
      categories = [singleSelect];
    } else if (selectPackage?.type === "multiple_select") {
      categories = multipleSelect.map((select: any) => ({
        label: select.label,
        category: select?.category?._id,
      }));
    }
    // data for purchase course
    const data = {
      package: selectPackage?._id,
      membership: selectPackage?.membership,
      title: selectPackage?.title,
      categories: categories,
      total_purchase_student: quantity,
      user: userInfo?.id,
      type: selectPackage?.type,
      purchase: {
        label: plan,
        price: selectPackage[plan]["price"],
        each_student_increment: selectPackage[plan]["each_student_increment"],
      },
    };

    const paypalData = {
      items: [
        {
          name: data.title,
          sku: data.package,
          // price: String("40"),
          currency: "USD",
          quantity: 1,
        },
      ],
    };
    // item_list for paypal

    // return
    try {
      if (platform === "stripe") {
        const stripe = await loadStripe(
          "pk_test_51OZ1ThK3q1wTHHNQ6UdozrToq0YcFNnBTvYOdOiF2crDgravXCLPkL6ZQ02UTulA7jkd0vuTvt40nuFqLK8P3wjO00hhjv5T2P"
        );
        const result: any = await createStripePayment({
          products: [
            {
              name: "Language Arts",
              img: "https://i.ibb.co/P698btB/math.jpg",
              price: 120,
              quantity: 1,
            },
          ],
        }).unwrap();
        const redirectResult = await stripe?.redirectToCheckout({
          sessionId: result?.id,
        });
        if (redirectResult?.error) {
          console.log(redirectResult?.error);
          //@ts-ignore
          message.error(redirectResult?.error?.message);
        }
      } else {
        const resultPaypal = await createPaypalPayment({
          item_list: paypalData,
          // amount: { total: String("10"), currency: "USD" },
          data,
        }).unwrap();

        if (resultPaypal?.url) {
          window.open(resultPaypal?.url, "_blank");
        }
      }
    } catch (error) {
      console.log(error);
      //@ts-ignore
      message.error(error?.message);
    }
  };

  const { data, isLoading, error } = useGetAllPackageQuery(
    {
      status: ENUM_STATUS.ACTIVE,
      limit: 9999,
      isDelete: ENUM_YN.NO,
      membershipTitle:
        packName === "school_teacher"
          ? "school & teacher"
          : packName === "family_personal"
            ? "family & personal"
            : "nulls",
    },
    {
      skip: !Boolean(packName),
    }
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const packageData = data?.data ?? [];
  const calculatePackage2 = (packages: IPackageData): number | undefined => {
    let newPrice = 0;
    if (plan === "monthly" && packages?.monthly) {
      newPrice =
        (packages.monthly.price +
          packages.monthly.each_student_increment * quantity) *
        (packages?.type === "multiple_select" ? multipleSelect?.length : 1);
    } else if (plan === "biannual" && packages?.biannual) {
      newPrice =
        (packages.biannual.price +
          packages.biannual.each_student_increment * quantity) *
        (packages?.type === "multiple_select" ? multipleSelect?.length : 1);
    } else if (plan === "yearly" && packages?.yearly) {
      newPrice =
        (packages.yearly.price +
          packages.yearly.each_student_increment * quantity) *
        (packages?.type === "multiple_select" ? multipleSelect?.length : 1);
    }
    return newPrice;
  };

  //  ! Select Handler
  const selectPackageHandler = (values: any) => {
    if (packName === 'family_personal' && quantity > 11) {
      message.info("Select max 10 for Family Pack")
      setSelectPackage(null)
      return
    }
    else if (packName === 'school_teacher' && quantity < 11) {
      setSelectPackage(null)
      message.info("Select min 10 for School Teacher  Pack")
      return
    }

    // ! All selected package data
    const { totalPackagePrice, incrementPrice, packages } = values;
    setSelectPackage(packages);
    console.log("🚀 ~ selectPackageHandler ~ packages:", packages);
    // console.log(quantity);
    message.success(`Selected ${packages?.title}-> $${totalPackagePrice}`);

    // const selectedPackageData = {};
  };

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
      <h2 className="text-[1.4rem] lg:text-[2rem] text-slate-700 font-normal mt-5 mb-5">
        Choose a package
      </h2>
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <>
          <div className="w-full mx-auto  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
            {packageData?.map((packages: IPackageData, index: number) => {
              const totalPackagePrice = calculatePackage2(packages);
              const incrementPrice = packages[plan]?.each_student_increment;
              return (
                <div
                  key={index + 1}
                  className="shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] rounded-md overflow-hidden transition-all duration-500 hover:scale-105 relative bg-blue-200 min-h-full  lg:min-h-[30rem] "
                >
                  <span
                    className={`px-2 py-1 text-[16px] font-semibold  rounded-md ml-3 absolute -left-4 top-0 capitalize
                    ${selectPackage?._id === packages?._id
                        ? "bg-secondary text-white"
                        : "bg-white text-black"
                      }
                  `}
                  >
                    {plan}
                  </span>
                  <div
                    className={`h-28 ${selectPackage?._id === packages?._id
                      ? "bg-green-600"
                      : "bg-gray-700"
                      } text-center p-4`}
                  >
                    <h3 className="text-2xl text-white uppercase font-semibold mb-1">
                      {packages?.title}
                    </h3>
                    {/* <p className="text-xs text-white">{plan}</p> */}
                  </div>
                  <div
                    className={`h-24 w-24 mx-auto -mt-8 shadow-xl rounded-full ${selectPackage?._id === packages?._id
                      ? "bg-green-600"
                      : "bg-gray-700"
                      } text-white border-4 flex flex-col items-center justify-center border-white`}
                  >
                    <h3 className="text-2xl font-semibold">
                      ${totalPackagePrice}
                    </h3>
                  </div>
                  <div className="px-6 py-4 mt-4 h-max ">
                    <ul className="space-y-4">
                      {/* //! for bundle type */}
                      {packages?.type === "bundle" &&
                        packages?.categories?.map(
                          (categoryData: IPackageCategory) => {
                            const category = categoryData?.category;
                            // console.log(category);
                            return (
                              <li
                                className="flex items-center text-sm text-gray-500"
                                key={category?._id}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="17"
                                  className="mr-4 bg-green-500 fill-white rounded-full p-[3px]"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                                    data-original="#000000"
                                  />
                                </svg>
                                <span className="text-[16px]">
                                  {" "}
                                  {category?.title}
                                </span>
                                {/* <span>{category?.title}</span> */}
                                <span className="text-[12px] text-slate-600 ml-2">
                                  {categoryData?.label}
                                </span>
                              </li>
                            );
                          }
                        )}
                      {packages?.type === "select" && (
                        <div className="">
                          <Radio.Group
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "1rem",
                            }}
                          // onChange={(e) => {
                          //   setSingleSelect(e.target.value);
                          // }}
                          >
                            {packages?.categories?.map(
                              (option?: IPackageCategory) => (
                                <Radio
                                  key={option?.category?.title}
                                  value={option?.category?._id}
                                  onClick={() =>
                                    setSingleSelect({
                                      category: option?.category?._id,
                                      label: option?.label,
                                    })
                                  }
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
                                  <span className="text-[16px]">
                                    {" "}
                                    {option?.category?.title}
                                  </span>
                                  {/* <span>{category?.title}</span> */}
                                  <span className="text-[12px] text-slate-600 ml-2">
                                    {option?.label}
                                  </span>
                                </Radio>
                              )
                            )}
                          </Radio.Group>
                        </div>
                      )}

                      {/* for multiple select */}
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
                                  value={option}
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
                                  <span className="text-[16px]">
                                    {" "}
                                    {option?.category?.title}
                                  </span>
                                  {/* <span>{category?.title}</span> */}
                                  <span className="text-[12px] text-slate-600 ml-2">
                                    {option?.label}
                                  </span>
                                </Checkbox>
                              )
                            )}
                          </Checkbox.Group>
                        </div>
                      )}
                    </ul>
                    <div className="">
                      <button
                        onClick={() =>
                          selectPackageHandler({
                            totalPackagePrice,
                            incrementPrice,
                            packages,
                          })
                        }
                        type="button"
                        className={`w-full mt-8 px-2 py-3 text-sm font-semibold text-white ${selectPackage?._id === packages?._id
                          ? "bg-green-600 hover:brightness-125"
                          : "bg-gray-700 hover:bg-gray-800"
                          }  rounded-md static lg:absolute bottom-1 left-0`}
                      >
                        Select
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center items-center m-5">
            <div>
              {paymentLoading || PaypalPaymentLoading ? (
                <Button
                  type="default"
                  style={{
                    padding: "1rem",
                    width: "3rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ButtonLoading />
                </Button>
              ) : (
                <button
                  type="button"
                  onClick={() => makePayment()}
                  // disabled={!selectPackage?._id }
                  className="text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 mr-2 mb-2 cursor-pointer"
                >
                  <svg
                    className="mr-2 -ml-1 w-4 h-4"
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="paypal"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                  >
                    <path
                      fill="currentColor"
                      d="M111.4 295.9c-3.5 19.2-17.4 108.7-21.5 134-.3 1.8-1 2.5-3 2.5H12.3c-7.6 0-13.1-6.6-12.1-13.9L58.8 46.6c1.5-9.6 10.1-16.9 20-16.9 152.3 0 165.1-3.7 204 11.4 60.1 23.3 65.6 79.5 44 140.3-21.5 62.6-72.5 89.5-140.1 90.3-43.4 .7-69.5-7-75.3 24.2zM357.1 152c-1.8-1.3-2.5-1.8-3 1.3-2 11.4-5.1 22.5-8.8 33.6-39.9 113.8-150.5 103.9-204.5 103.9-6.1 0-10.1 3.3-10.9 9.4-22.6 140.4-27.1 169.7-27.1 169.7-1 7.1 3.5 12.9 10.6 12.9h63.5c8.6 0 15.7-6.3 17.4-14.9 .7-5.4-1.1 6.1 14.4-91.3 4.6-22 14.3-19.7 29.3-19.7 71 0 126.4-28.8 142.9-112.3 6.5-34.8 4.6-71.4-23.8-92.6z"
                    ></path>
                  </svg>
                  Check out with PayPal
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
