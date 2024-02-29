'use client'
import LoadingForDataFetch from "@/components/Utlis/LoadingForDataFetch";
import { useGetAllRatingFeedbackQuery } from "@/redux/api/ratingFeedback";
import { getUserInfo } from "@/services/auth.service";
import { Input, Rate } from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AllImage } from '@/assets/AllImge'


const Review = () => {
  const [user, setUserData] = useState<any>({});
  const [userLoading, setUserLoading] = useState<boolean>(true);
  useEffect(() => {
    setUserData(getUserInfo() as any);
    setUserLoading(false);
    return () => {};
  }, []);
  const { data: ratingData, isLoading: ratingLoading } =
    useGetAllRatingFeedbackQuery(
      { user: user?._id },
      {
        skip: !Boolean(user?._id),
      }
    );
    console.log(ratingData);
  if (userLoading) {
    return <LoadingForDataFetch />;
  }
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2">
        {ratingData?.data?.map((data: any, key: number) => (
          <div key={key} className="border-2 rounded-xl p-2">
            <div className="flex justify-between items-center font-extrabold">
                <h1 className="text-base font-normal">Service Name : {data?.service?.title}</h1>
                <Image width={150} height={150} className="w-[75px] h-[50px]" src={data?.service?.image} alt=""/>
            </div>
            <div>
              <p>User:{data?.user?.email}</p>
              <Rate allowHalf value={data.rating} disabled />
            </div>
            <div>
              <p>User Feedback:</p>
              <Input.TextArea rows={4} value={data?.feedback} disabled />
            </div>
          </div>
        ))}
        <div className='flex justify-center items-center container mx-auto'><Image alt="" src={AllImage.upcoming} width={700} height={700} className="min-w-sm rounded-lg" /></div>
      </div>
    </div>
  );
};

export default Review;
