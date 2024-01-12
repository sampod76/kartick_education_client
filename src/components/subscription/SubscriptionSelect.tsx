"use client";

import { AllImage } from "@/assets/AllImge";
import Image from "next/image";
import React from "react";

type ISubscription = {
  title: string;
  enroll_time: string; // Assuming ISO date string format
  price: number;
  time_duration: string;
  img: any;
};

const subscriptionData: ISubscription[] = [
  {
    title: "Standard Plan",
    enroll_time: "2024-01-15T10:30:00Z",
    price: 29.99,
    time_duration: "3 months",
    img: AllImage.subscription.subFamily,
  },
  {
    title: "Premium Plan",
    enroll_time: "2024-01-20T12:45:00Z",
    price: 39.99,
    time_duration: "6 months",
    img: AllImage.subscription.subTeacher,
  },
  {
    title: "Basic Plan",
    enroll_time: "2024-01-10T08:00:00Z",
    price: 19.99,
    time_duration: "1 month",
    img: AllImage.subscription.subAdmin,
  },
];
export default function SubscriptionSelect() {
  return (
    <div className="max-w-full lg:max-w-[70%] mx-auto bg-slate-50 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-7">
      {subscriptionData?.map((subscription: ISubscription, index: number) => {
        return (
          <div
            key={index + 1}
            className="w-full lg:max-w-[400px]   bg-white rounded-[10px] border mx-auto flex flex-col justify-center gap-3 items-center  shadow-xl py-5"
          >
            <h1 className="text-2xl capitalize ">{subscription?.title}</h1>
            <Image
              height={200}
              width={200}
              className="h-[200px] w-[200px]"
              src={subscription?.img}
              alt="subscription"
            />
            <div className="mt-2 space-y-3">
              <button className="w-[100%] mx-auto bg-primary h-[48px] border border-white  text-center px-7 py-3 text-white font-semibold  rounded">
                Join Now
              </button>
              <button className="w-[100%] mx-auto bg-white text-primary hover:bg-primary h-[48px] border border-primary text-center px-7 py-3 hover:text-white font-semibold  rounded">
                Learn more
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
