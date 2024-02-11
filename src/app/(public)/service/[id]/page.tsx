"use client";

import LoadingForDataFetch from "@/components/Utlis/LoadingForDataFetch";
import { useGetAllRatingFeedbackQuery } from "@/redux/api/ratingFeedback";

import { useGetSingleServiceQuery } from "@/redux/api/serviceApi";
import { CutText } from "@/utils/CutText";
import { Input, Rate } from "antd";
import Image from "next/image";

const ServiceDetiles = ({ params }: any) => {
  const { data: data = {}, isLoading } = useGetSingleServiceQuery(params?.id, {
    skip: !Boolean(params?.id),
  });

  const { data: ratingData, isLoading: ratingLoading } =
    useGetAllRatingFeedbackQuery(
      { service: params?.id },
      {
        skip: !Boolean(params?.id),
      }
    );
  console.log(ratingData);

  if (isLoading || ratingLoading) {
    return <LoadingForDataFetch />;
  }
  return (
    <>
      <div className="container mx-auto mt-10">
        <div className="w-full rounded overflow-hidden shadow-lg">
          <div className="grid  grid-cols-1 xl:grid-cols-2">
            <div>
              <Image
                width={800}
                height={800}
                src={data?.image}
                alt="Transport Image"
                className="w-full"
              />
            </div>
            <div>
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{data?.title}</div>
                <p className="text-gray-700 text-base">
                  {data?.description && CutText(data?.description, 100)}
                </p>
                <p className="text-gray-700 mt-2">Price: {data?.price} tk</p>
                <p className="text-gray-700">
                  Available Tickets: {data?.availableTickets}
                </p>
                <p className="text-gray-700">Contact: {data?.contact}</p>
                <p className="text-gray-700">
                  Service Date:{" "}
                  {new Date(data?.serviceDate).toLocaleDateString()}
                </p>
                <p className="text-gray-700">
                  Category: {data?.category?.title}
                </p>
              </div>
              <div className="px-6 py-4">
                <span className="inline-block bg-gray-200  px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                  Status : ➡
                </span>
                <span className="inline-block bg-green-600 text-white  px-3 py-1 text-sm font-semibold capitalize">
                  {data?.status}
                </span>
              </div>
            </div>
          </div>
        </div>
        <h1 className="text-center p-2 text-xl border-2 rounded-lg">User rating</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2">
          {ratingData?.data?.map((data: any, key: number) => (
            <div key={key} className="border-2 rounded-xl p-2">
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
        </div>
      </div>
    </>
  );
};

export default ServiceDetiles;
