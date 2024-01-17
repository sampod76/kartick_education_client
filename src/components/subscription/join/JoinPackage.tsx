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

  const [paymentData, setPaymentData] = useState({});
  // For select package
  const [selectPackage, setSelectPackage] = useState<any | null>({});
  ///! for the multiple and single select package
  const [singleSelect, setSingleSelect] = useState({});
  const [multipleSelect, setMultipleSelect] = useState([]);

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
    { isLoading: PaypalpaymentLoading, error: PaypalpaymentError },
  ] = useAddPaypalPaymentMutation();
  const makePayment = async (platform?: string) => {
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
        console.log("🚀 ~ makePayment ~ result:", result);
        const redirectResult = await stripe?.redirectToCheckout({
          sessionId: result?.id,
        });
        if (redirectResult?.error) {
          console.log(redirectResult?.error);
          //@ts-ignore
          message.error(redirectResult?.error?.message);
        }
      } else {
        const resultPaypal = await createPaypalPayment(paymentData).unwrap();
        console.log(resultPaypal);
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
    // ! All selected package data
    const { totalPackagePrice, incrementPrice, packages } = values;
    // console.log("🚀 ~ selectPackageHandler ~ values:", values);
    setSelectPackage(packages);


    // console.log(packages);
    // console.log(multipleSelect);
    // console.log(quantity);
    message.success(`Selected ${packages?.title} ${totalPackagePrice}`);
    console.log(packages);
    console.log(plan)

    // data for purchase course
    const data = {
      package: packages?._id,
      membership: packages?.membership,
      title: packages?.title,
      categories: multipleSelect.map((select: any) => ({
        ...select,
        category: select._id,
      })),
      total_purchase_student: quantity,
      user: userInfo?.id,
      type: packages?.type,
      purchase: {
        label: plan,
        price: packages[plan]["price"],
        each_student_increment: packages[plan]["each_student_increment"],
      },
    };

    const paypalData = {
      items: [
        {
          name: data.title,
          sku: data.package,
          price: String(totalPackagePrice),
          currency: "USD",
          quantity: 1,
        },
      ],
    };
    // item_list for paypal
    setPaymentData({
      item_list: paypalData,
      amount: { total: String(totalPackagePrice), currency: "USD" },
      data,
    });
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
      <h2 className="text-[1.4rem] text-slate-700 font-normal mt-5 mb-2">
        Choose a package
      </h2>
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <>
          <div className="w-full mx-auto  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 ">
            {packageData?.map((packages: IPackageData, index: number) => {
              const totalPackagePrice = calculatePackage2(packages);
              const incrementPrice = packages[plan]?.each_student_increment;
              return (
                <div
                  key={index + 1}
                  className="w-full bg-white rounded-[10px] border mx-auto  items-center  shadow-xl  min-h-[24rem flex flex-col justify-start"
                >
                  {/* //! banner section */}
                  <div className="bg-primary h-[4rem] w-full mt-0 py-3 rounded-t-lg">
                    <h1 className="text-center font-bold text-white ">
                      {packages?.title}
                    </h1>
                  </div>
                  <div className="py-3 flex flex-col justify-between   w-full h-full">
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
                                  {categoryData?.label}
                                </span>
                              </div>
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

                    <div className="w-full mx-auto text-center">
                      <h2 className="text-4xl font-bold text-center text-slate-700 ">
                        ${totalPackagePrice}
                        <span className="text-2xl text-slate-500">
                          {" "}
                          /{plan}
                        </span>
                        <p className="text-[12px] text-grey px-2 ">
                          Each additional child is only {incrementPrice}
                        </p>
                      </h2>
                      {/*//! select button */}
                      <button
                        onClick={() =>
                          selectPackageHandler({
                            totalPackagePrice,
                            incrementPrice,
                            packages,
                          })
                        }
                        className={`w-[80%] mx-auto  h-[48px] border border-primary  text-center px-7 py-3   font-semibold  rounded-xl my-3 ${
                          selectPackage?._id === packages?._id
                            ? "bg-primary text-white"
                            : "bg-white text-primary"
                        } `}
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
            <div onClick={() => makePayment()}>
              {paymentLoading || PaypalpaymentLoading ? (
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
                  className="text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 mr-2 mb-2"
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
