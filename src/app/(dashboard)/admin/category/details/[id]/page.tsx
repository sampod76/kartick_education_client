"use client";

import LoadingForDataFetch from "@/components/Utlis/LoadingForDataFetch";
import { useGetSingleCategoryQuery } from "@/redux/api/adminApi/categoryApi";

import Image from "next/image";

const ServiceDetiles = ({ params }: any) => {
  const { data: data, isLoading } = useGetSingleCategoryQuery(params?.id, {
    skip: !Boolean(params?.id),
  });


  if (isLoading) {
    return <LoadingForDataFetch />;
  }
  return (
    <>
      <div
        style={{ marginLeft: "auto", marginRight: "auto" }}
        className="container "
      >
        <div
          style={{
            overflow: "hidden",
            borderRadius: "0.25rem",
            width: "100%",
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          }} /* className="w-full rounded overflow-hidden shadow-lg" */
        >
          <section className="grid  grid-cols-1 xl:grid-cols-2">
            <div>
              <Image
                width={800}
                height={800}
                src={data?.img}
                alt="Transport Image"
                // className="w-full"
                style={{ width: "100%" }}
              />
            </div>
            <div>
              <div
                style={{
                  paddingTop: "1rem",
                  paddingBottom: "1rem",
                  paddingLeft: "1.5rem",
                  paddingRight: "1.5rem",
                }} /* className="px-6 py-4" */
              >
                <p
                  style={{
                    marginBottom: "0.5rem",
                    fontSize: "1.25rem",
                    lineHeight: "1.75rem",
                    fontWeight: 700,
                  }} /* className="font-bold text-xl mb-2" */
                >
                  {data?.title}
                </p>
                <p
                  style={{
                    fontSize: "1rem",
                    lineHeight: "1.5rem",
                    color: "#374151",
                  }} /* className="text-gray-700 text-base" */
                >
                  {data?.description}
                </p>
              </div>
              <div
                style={{
                  paddingTop: "1rem",
                  paddingBottom: "1rem",
                  paddingLeft: "1.5rem",
                  paddingRight: "1.5rem",
                }} /* className="px-6 py-4" */
              >
                <span
                  style={{
                    display: "inline-block",
                    paddingTop: "0.25rem",
                    paddingBottom: "0.25rem",
                    paddingLeft: "0.75rem",
                    paddingRight: "0.75rem",
                    marginRight: "0.5rem",
                    fontSize: "0.875rem",
                    lineHeight: "1.25rem",
                    fontWeight: 600,
                    color: "#374151",
                    backgroundColor: "#E5E7EB",
                  }} /* className="inline-block bg-gray-200  px-3 py-1 text-sm font-semibold text-gray-700 mr-2" */
                >
                  Status : ➡
                </span>
                <span
                  style={{
                    display: "inline-block",
                    paddingTop: "0.25rem",
                    paddingBottom: "0.25rem",
                    paddingLeft: "0.75rem",
                    paddingRight: "0.75rem",
                    fontSize: "0.875rem",
                    lineHeight: "1.25rem",
                    fontWeight: 600,
                    color: "#ffffff",
                    textTransform: "capitalize",
                    backgroundColor: "#059669",
                  }} /* className="inline-block bg-green-600 text-white  px-3 py-1 text-sm font-semibold capitalize" */
                >
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
