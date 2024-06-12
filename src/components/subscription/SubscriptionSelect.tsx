"use client";

import { AllImage } from "@/assets/AllImge";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

type ISubscription = {
  _id: string;
  title: string;
  enroll_time: string; // Assuming ISO date string format
  price: number;
  time_duration: string;
  img: any;
  params: string
};

const subscriptionData: ISubscription[] = [
  {
    _id: "1",
    title: "family & personal",
    params: "family_personal",
    enroll_time: "2024-01-15T10:30:00Z",
    price: 29.99,
    time_duration: "3 months",
    img: AllImage.subscription.subFamily,
  },

  {
    _id: "2",
    title: "Premium Plan",
    params: "",
    enroll_time: "2024-01-20T12:45:00Z",
    price: 39.99,
    time_duration: "6 months",
    img: AllImage.subscription.subTeacher,
  },
];

const customMembarData = [{
  _id: "3",
  title: "Custom Membership/ Free trial",
  params: "school_teacher",
  enroll_time: "2024-01-10T08:00:00Z",
  price: 19.99,
  time_duration: "1 month",
  img: AllImage.subscription.subAdmin,
},]

export default function SubscriptionSelect() {
  // const [test, setTest] = useState("")
  return (
    <div className="mt-5 lg:mt-[4rem] xl:mt-[5rem]">
      <div className="container mx-auto  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 ">
        {subscriptionData?.map((subscription: ISubscription, index: number) => {
          return (
            <div
              key={index + 1}
              className="w-[90%] lg:max-w-[480px]   bg-white rounded-[10px] border mx-auto   shadow-xl pb-5"
            >
              <h1 className="text-2xl capitalize bg-[#016A57] rounded-t-xl w-full text-white text-center py-5 mb-0">{subscription?.title}</h1>
              <div className="w-full h-[15rem] lg:h-[17rem] mt-0 relative ">
                <h1 className="bg-[#C6F2BA] min-h-[60%] w-full absolute top-0 z-[10]"></h1>
                <Image
                  priority
                  unoptimized
                  height={350}
                  width={300}
                  className="bg-cover bg-no-repeat w-[16rem] h-[15rem] lg:h-[17rem] mx-auto relative z-[20] pt-5"
                  src={subscription?.img}
                  alt="subscription"
                />
              </div>
              <div className="mt-7 flex items-center gap-5 w-full px-3 uppercase">
                <Link
                  href={`/subscription/join/${subscription?._id}?pack=${subscription?.params}`}
                  className="w-full mx-auto bg-[#C6F2BA] h-[48px] text-center px-3 py-3 text-black  border border-black font-semibold  rounded text-nowrap"
                >
                  Join Now
                </Link>
                <Link
                  href={`/subscription/trial/${subscription?._id}`}
                  className="w-full mx-auto bg-[white] h-[48px] text-center px-3 py-3 text-black  border border-[#5392F9] font-semibold  rounded text-nowrap"
                >
                  Learn more
                </Link>
              </div>
            </div>
          );
        })}


      </div>
      <div className="mt-4 md:mt-5 lg:mt-7 xl:mt-8">
        {customMembarData?.map((subscription: ISubscription, index: number) => {
          return (
            <div
              key={index + 1}
              className="w-[90%] lg:max-w-[580px]   bg-white rounded-[10px] border mx-auto    shadow-xl pb-5 "
            >
              <h1 className="text-2xl capitalize bg-[#016A57] rounded-t-xl w-full text-white text-center py-5 mb-0">{subscription?.title}</h1>
              <div className="w-full h-[15rem] lg:h-[17rem] mt-0 relative ">
                <h1 className="bg-[#C6F2BA] min-h-[60%] w-full absolute top-0 z-[10]"></h1>
                <Image
                  priority
                  unoptimized
                  height={350}
                  width={300}
                  className="bg-cover bg-no-repeat w-[16rem] h-[15rem] lg:h-[17rem] mx-auto relative z-[20] pt-5"
                  src={subscription?.img}
                  alt="subscription"
                />
              </div>
              <div className="mt-7 flex items-center gap-5 w-full px-3 uppercase">
                {/* <Link
                  href={`/subscription/join/${subscription?._id}?pack=${subscription?.params}`}
                  className="w-full mx-auto bg-[#C6F2BA] h-[48px] text-center px-3 py-3 text-black  border border-black font-semibold  rounded text-nowrap"
                >
                  Join Now
                </Link> */}
                <p className="w-full mx-auto bg-[#C6F2BA] h-[48px] text-center px-3 py-3 text-black  border border-black font-semibold  rounded text-nowrap">Contact us</p>
                <Link
                  href={`/subscription/trial/${subscription?._id}`}
                  className="w-full mx-auto bg-[white] h-[48px] text-center px-3 py-3 text-black  border border-[#5392F9] font-semibold  rounded text-nowrap"
                >
                  Learn more
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
