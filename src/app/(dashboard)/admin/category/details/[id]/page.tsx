"use client";

import LoadingForDataFetch from "@/components/Utlis/LoadingForDataFetch";
import { useGetSingleCategoryQuery } from "@/redux/api/adminApi/categoryApi";

import Image from "next/image";

const ServiceDetiles = ({ params }: any) => {
  const { data: data, isLoading } = useGetSingleCategoryQuery(params?.id, {
    skip: !Boolean(params?.id),
  });
  console.log(data);

  if (isLoading) {
    return <LoadingForDataFetch />;
  }
  return (
    <>
      <div className="container mx-auto mt-10">
        <div className="w-full rounded overflow-hidden shadow-lg">
          <section className="grid  grid-cols-1 xl:grid-cols-2">
            <div>
              <Image
                width={800}
                height={800}
                src={data?.img}
                alt="Transport Image"
                className="w-full"
              />
            </div>
            <div>
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{data?.title}</div>
                <p className="text-gray-700 text-base">{data?.description}</p>
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
          </section>
        </div>
      </div>
    </>
  );
};

export default ServiceDetiles;
