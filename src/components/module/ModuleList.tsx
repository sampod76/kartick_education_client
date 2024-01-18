"use client";
import { useGetSingleCourseQuery } from "@/redux/api/adminApi/courseApi";
import {
  useGetAllMilestoneQuery,
  useGetSingleMilestoneQuery,
} from "@/redux/api/adminApi/milestoneApi";
import { useGetAllModuleQuery } from "@/redux/api/adminApi/moduleApi";
import { Divider } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import LoadingForDataFetch from "../Utlis/LoadingForDataFetch";
const allPackae= [
  {
      "membership": {
          "title": "school & teacher",
          "uid": "yt4Xx5nHMB"
      },
      "payment": {
          "transactionId": "PAYID-MWUKEQY3GJ84050777920038",
          "platform": "paypal",
          "record": {
              "membership": {
                  "title": "school & teacher",
                  "uid": "yt4Xx5nHMB"
              },
              "payment": {
                  "transactionId": "PAYID-MWUKEQY3GJ84050777920038",
                  "platform": "paypal"
              },
              "purchase": {
                  "label": "monthly",
                  "price": 5,
                  "each_student_increment": 2
              },
              "_id": "65a8a23ed7df16f14e5a04bc",
              "package": "65a86a711f0eeb8fbcfac4da",
              "title": "Multi choice",
              "categories": [
                  {
                      "category": "65a86a711f0eeb8fbcfac4de",
                      "label": "(Grades K to 8)",
                      "_id": "65a86a711f0eeb8fbcfac4de",
                      "id": "65a86a711f0eeb8fbcfac4de"
                  },
                  {
                      "category": "65a86a711f0eeb8fbcfac4dd",
                      "label": "(Grades K to 8)",
                      "_id": "65a86a711f0eeb8fbcfac4dd",
                      "id": "65a86a711f0eeb8fbcfac4dd"
                  },
                  {
                      "category": "65a86a711f0eeb8fbcfac4dc",
                      "label": "(Pre-K to 12)",
                      "_id": "65a86a711f0eeb8fbcfac4dc",
                      "id": "65a86a711f0eeb8fbcfac4dc"
                  }
              ],
              "total_purchase_student": 1,
              "students": [],
              "expireDate":"2025-01-01",
              "paymentStatus": "approved",
              "user": "65932e8eeaba9f65cfcd8217",
              "type": "multiple_select",
              "status": "active",
              "isDelete": "no",
              "createdAt": "2024-01-18T03:59:58.966Z",
              "updatedAt": "2024-01-18T04:00:21.783Z",
              "__v": 0,
              "id": "65a8a23ed7df16f14e5a04bc"
          }
      },
      "purchase": {
          "label": "monthly",
          "price": 5,
          "each_student_increment": 2
      },
      "_id": "65a8a23ed7df16f14e5a04bc",
      "package": "65a86a711f0eeb8fbcfac4da",
      "title": "Multi choice",
      "expireDate":"2023-01-01",
      "categories": [
          {
              "category": "65a86a711ddf0eeb8fbcfac4de",
              "label": "(Grades K to 8)",
              "_id": "65a86a711f0eeb8fbcfac4de",
              "id": "65a86a711f0eeb8fbcfac4de"
          },
          {
              "category": "65a86a711ddf0eeb8fbcfac4dd",
              "label": "(Grades K to 8)",
              "_id": "65a86a711f0eeb8fbcfac4dd",
              "id": "65a86a711f0eeb8fbcfac4dd"
          },
          {
              "category": "65a86a711dddf0eeb8fbcfac4dc",
              "label": "(Pre-K to 12)",
              "_id": "65a86a711f0eeb8fbcfac4dc",
              "id": "65a86a711f0eeb8fbcfac4dc"
          }
      ],
      "total_purchase_student": 1,
      "students": [],
      "paymentStatus": "approved",
      "user": null,
      "type": "multiple_select",
      "status": "active",
      "isDelete": "no",
      "createdAt": "2024-01-18T03:59:58.966Z",
      "updatedAt": "2024-01-18T03:59:58.966Z",
      "__v": 0,
      "id": "65a8a23ed7df16f14e5a04bc"
  },
  {
      "membership": {
          "title": "school & teacher",
          "uid": "yt4Xx5nHMB"
      },
      "payment": {
          "transactionId": "PAYID-MWUKEQY3GJ84050777920038",
          "platform": "paypal",
          "record": {
              "membership": {
                  "title": "school & teacher",
                  "uid": "yt4Xx5nHMB"
              },
              "payment": {
                  "transactionId": "PAYID-MWUKEQY3GJ84050777920038",
                  "platform": "paypal"
              },
              "purchase": {
                  "label": "monthly",
                  "price": 5,
                  "each_student_increment": 2
              },
              "_id": "65a8a23ed7df16f14e5a04bc",
              "package": "65a86a711f0eeb8fbcfac4da",
              "title": "Multi choice",
              "categories": [
                  {
                      "category": "65a86a711f0eeb8fbcfac4de",
                      "label": "(Grades K to 8)",
                      "_id": "65a86a711f0eeb8fbcfac4de",
                      "id": "65a86a711f0eeb8fbcfac4de"
                  },
                  {
                      "category": "65a86a711f0eeb8fbcfac4dd",
                      "label": "(Grades K to 8)",
                      "_id": "65a86a711f0eeb8fbcfac4dd",
                      "id": "65a86a711f0eeb8fbcfac4dd"
                  },
                  {
                      "category": "65a86a711f0eeb8fbcfac4dc",
                      "label": "(Pre-K to 12)",
                      "_id": "65a86a711f0eeb8fbcfac4dc",
                      "id": "65a86a711f0eeb8fbcfac4dc"
                  }
              ],
              "total_purchase_student": 1,
              "students": [],
              "paymentStatus": "approved",
              "user": "65932e8eeaba9f65cfcd8217",
              "type": "multiple_select",
              "status": "active",
              "isDelete": "no",
              "createdAt": "2024-01-18T03:59:58.966Z",
              "updatedAt": "2024-01-18T04:00:21.783Z",
              "__v": 0,
              "id": "65a8a23ed7df16f14e5a04bc"
          }
      },
      "purchase": {
          "label": "monthly",
          "price": 5,
          "each_student_increment": 2
      },
      "_id": "65a8a23ed7df16f14e5a04bc",
      "package": "65a86a711f0eeb8fbcfac4da",
      "title": "Multi choice",
      "categories": [
          {
              "category": "65a86a711f0eeb8fbcfac4de",
              "label": "(Grades K to 8)",
              "_id": "65a86a711f0eeb8fbcfac4de",
              "id": "65a86a711f0eeb8fbcfac4de"
          },
          {
              "category": "65a86a711f0eeb8fbcfac4dd",
              "label": "(Grades K to 8)",
              "_id": "65a86a711f0eeb8fbcfac4dd",
              "id": "65a86a711f0eeb8fbcfac4dd"
          },
          {
              "category": "65a86a711f0eeb8fbcfac4dc",
              "label": "(Pre-K to 12)",
              "_id": "65a86a711f0eeb8fbcfac4dc",
              "id": "65a86a711f0eeb8fbcfac4dc"
          }
      ],
      "total_purchase_student": 1,
      "students": [],
      "paymentStatus": "approved",
      "user": null,
      "type": "multiple_select",
      "status": "active",
      "isDelete": "no",
      "createdAt": "2024-01-18T03:59:58.966Z",
      "updatedAt": "2024-01-18T03:59:58.966Z",
      "__v": 0,
      "id": "65a8a23ed7df16f14e5a04bc"
  }
]
const ModuleList = ({ milestoneId }: { milestoneId: any }) => {
  // console.log(milestoneId);
  const { data: milestoneData, isLoading: milestionLoading } =
  useGetSingleMilestoneQuery(milestoneId);
  // console.log(milestoneData);

  const { data, isLoading } = useGetAllModuleQuery({
    course: milestoneId,
    // lesson: "yes",
    status: "active",
  });
  
  const modulesData = data?.data;


  return (
    <>
      {isLoading || milestionLoading ? (
        <LoadingForDataFetch />
      ) : (
        <div
          style={{
            marginTop: "1.25rem",
          }}
        >
          <h2
            style={{
              fontWeight: 700,
              textAlign: "center",
              color: "black",
              textTransform: "uppercase",
              fontSize: "24px",
              fontFamily: "Lato",
            }}
          >
            {milestoneData?.title}
            {/* //! Course Title */}
          </h2>
          <Divider
            style={{
              color: "red",
              fontSize: "5px",
              background: "red",
            }}
          />
          <div className="grid  grid-cols-1 lg:grid-cols-2  gap-3 max-w-[80%] mx-auto mt-5 ">
            {modulesData?.map((module: any, index: number) => {
              return (
                <div key={index} className="p-2 ">
                  <Link
                    href={`/lesson/${module?._id}`}
                    className="text-start  text-[20px] font-[550] font-['Inter'] leading-2 "
                  >
                    {module?.title}
                    {/* //! module Title */}
                  </Link>
                  <ul className="py-3">
                    {module?.lesson?.map((module: any, index: number) => {
                      return (
                        <Link
                          href={`/lessonDetails/${module?._id}`}
                          // className="text-sky-950 text-opacity-90 text-[18px] font-medium font-['Inter'] leading-2 flex gap-2 items-center"
                          style={{
                            display: "flex",
                            gap: "0.5rem",
                            alignItems: "center",
                            fontWeight: 500,
                            color: "grey",
                            fontSize: "18px",
                            fontFamily: "Inter",
                            marginBlock: "1rem",
                          }}
                          key={index}
                        >
                          {/* //! Modules List  */}
                          <div className="Ellipse14 w-3 h-3 bg-yellow-400 rounded-full"></div>
                          <h1 className="text-base font-normal">{module?.title}</h1>
                        </Link>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default ModuleList;
