"use client"
import CourseDetailsTop from "./CourseDetailsTop";
import AuthorCourseDetails from "./AuthorCourseDetails";
import CourseDetailsTab from "./CourseDetailsTab";
import { useGetSingleCourseQuery } from "@/redux/api/adminApi/courseApi";
import CourseStatistics from "../CourseStatistics";
import LoadingForDataFetch from "@/components/Utlis/LoadingForDataFetch";
import { useGetSingleCategoryQuery } from "@/redux/api/adminApi/categoryApi";
import Image from "next/image";
import React, { useState } from 'react'

import { useDeleteCourseMutation, useGetAllCourseQuery } from "@/redux/api/adminApi/courseApi";
import { useDebounced } from "@/redux/hooks";
import { Dropdown, Menu, Space } from "antd";
import Link from "next/link";
import dayjs from "dayjs";
import { IDecodedInfo, getUserInfo } from "@/services/auth.service";
import { Error_model_hook, Success_model, confirm_modal } from "@/utils/modalHook";
import { useDeleteMilestoneMutation, useGetAllMilestoneQuery } from "@/redux/api/adminApi/milestoneApi";
import HeadingUI from "@/components/ui/dashboardUI/HeadingUI";
import UMTable from "@/components/ui/UMTable";
import { AllImage } from "@/assets/AllImge";

export default function CourseDetailsMain({ courseId }: { courseId: string }) {

  const { data: CourseData, isLoading } = useGetSingleCourseQuery(courseId, {
    skip: !Boolean(courseId),
  });


  // ! for milestone

  const [deleteMilestone, { isLoading: deleteLoading }] = useDeleteMilestoneMutation();
  const userInfo = getUserInfo() as IDecodedInfo;
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  // const [courseId, setCourseId] = useState<string>("");

  const [filterValue, setFilterValue] = useState("");
  const query: Record<string, any> = {};
  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  query["status"] = "active";
  query["course"] = courseId;
  // if (filterValue) {
  //   query["category"] = filterValue;
  // }

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }

  // console.log(query)
  const { data, isLoading: milestoneLoading } = useGetAllMilestoneQuery({ ...query });
  const milestoneData = data?.data || [];
  const meta = data?.meta;
  const handleDelete = (id: string) => {
    confirm_modal(`Are you sure you want to delete`).then(async (res) => {
      if (res.isConfirmed) {
        try {
          const res = await deleteMilestone(id).unwrap();
          if (res?.success == false) {
            // message.success("Admin Successfully Deleted!");
            // setOpen(false);
            Error_model_hook(res?.message);
          } else {
            Success_model("Milestone Successfully Deleted");
          }
        } catch (error: any) {
          console.log("🚀 ~ confirm_modal ~ error:", error);
          Error_model_hook(error.message);
        }
      }
    });
  };


  // const category = data
  if (isLoading || milestoneLoading) {
    return <LoadingForDataFetch />;
  }


  const columns = [
    {
      title: "Image",
      render: function (data: any) {
        return (
          <>
            {
              <Image
                src={
                  data?.imgs?.length ? data?.imgs[0] : AllImage.notFoundImage
                }
                style={{ height: "50px", width: "80px" }}
                width={50}
                height={50}
                alt="dd"
              />
            }
          </>
        );
      },
      width: 100,
    },
    {
      title: "Name",
      dataIndex: "title",
      ellipsis: true,
      sorter: true,
    },
    {
      title: "Description",
      dataIndex: "short_description",
      ellipsis: true,
    },
    {
      title: "Milestone Number",
      dataIndex: "milestone_number",
      ellipsis: true,
      width: 100,
    },
    {
      title: "course",
      dataIndex: ["course", "title"],
      ellipsis: true,
      // render: function (data: any) {
      //   return <>{data?.title}</>;
      // },
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
      width: 150,
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,

    },
    {
      title: "Action",
      // fixed: "right",
      width: 120,
      render: (record: any) => (
        // console.log(object);
        <>
          <Space size="middle">
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item key="view">
                    <Link href={`/${userInfo?.role}/milestone/details/${record._id}`}>
                      View
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="edit">
                    <Link href={`/${userInfo?.role}/milestone/edit/${record._id}`}>
                      Edit
                    </Link>
                  </Menu.Item>
                  {/* <Menu.Item key="add_milestone">
                    <Link
                      href={`/${userInfo?.role}/milestone/create/module/${record?._id}?milestoneName=${record?.title}`}
                    >
                      Add Module
                    </Link>
                  </Menu.Item> */}
                  <Menu.Item
                    key="delete"
                    onClick={() => {
                      handleDelete(record._id);
                    }}
                  >
                    Delete
                  </Menu.Item>
                </Menu>
              }
            >
              <button className="text-blue-700">Action</button>
            </Dropdown>
          </Space>
        </>
      ),
    },
  ];
  const onPaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setSize(pageSize);
  };
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    // console.log(order, field);
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };
  // console.log(CourseData, "courseData");
  return (
    <div>
      {/* <CourseDetailsTop courseData={CourseData} />
      <CourseStatistics courseId={courseId} />
      <AuthorCourseDetails authorData={CourseData?.author} />
      <CourseDetailsTab CourseData={CourseData} /> */}

      <div
        style={{ marginLeft: "auto", marginRight: "auto" }}
        className="container "
      >
        <div className="container mx-auto p-8">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h1 className="text-3xl font-bold mb-6">{CourseData?.title}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="col-span-full mb-6 bg-cover w-full h-[18rem]" style={{
                backgroundImage: `url(${CourseData?.img})`,
                backgroundAttachment: 'fixed',
                backgroundSize: 'cover', // Add this line for covering the full height
              }}>
              </div>
              {/* Category Details */}
              <div className="col-span-full md:col-span-1">
                {/* <p className="text-gray-600 mb-2">Category ID: {CourseData?.id}</p> */}
                <p className="text-gray-600 mb-2">Status: {CourseData?.status}</p>
                <p className="text-gray-600 mb-2">Created At: {CourseData?.createdAt}</p>
                <p className="text-gray-600 mb-2">Updated At: {CourseData?.updatedAt}</p>
                {/* Add more details as needed */}
              </div>
            </div>

            {/* Additional Information */}
            <div className="mt-8">
              {/* <h2 className="text-xl font-semibold mb-4">Additional Information</h2> */}
              {/* Add more details or components as needed */}
            </div>
          </div>
        </div>

        <div className="">
          <HeadingUI>Milestone of {CourseData?.title}</HeadingUI>
          <UMTable
            loading={milestoneLoading}
            columns={columns}
            dataSource={milestoneData}
            pageSize={size}
            totalPages={meta?.total}
            showSizeChanger={true}
            onPaginationChange={onPaginationChange}
            onTableChange={onTableChange}
            showPagination={true}
          />

        </div>
      </div>
    </div>
  );
}
