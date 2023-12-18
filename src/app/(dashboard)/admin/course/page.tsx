"use client";
import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { Button, Input, message } from "antd";
import Link from "next/link";
import {
  DeleteOutlined,
  EditOutlined,
  FilterOutlined,
  ReloadOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useDebounced } from "@/redux/hooks";
import UMTable from "@/components/ui/UMTable";

import dayjs from "dayjs";
import UMModal from "@/components/ui/UMModal";

import Image from "next/image";
import {
  Error_model_hook,
  Success_model,
  confirm_modal,
} from "@/utils/modalHook";

import { useDeleteCourseMutation, useGetAllCourseQuery } from "@/redux/api/adminApi/courseApi";

const CourseList = () => {
  const query: Record<string, any> = {};

  // const SUPER_ADMIN=USER_ROLE.ADMIN

  const [deleteCourse] = useDeleteCourseMutation();

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [adminId, setAdminId] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  query["status"] = "active";

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }
  const { data = [], isLoading } = useGetAllCourseQuery({ ...query });

  //@ts-ignore
  const courseData = data?.data;
  console.log("🚀 ~ file: page.tsx:51 ~ ServiceList ~ adminData:", courseData);
  //@ts-ignore
  const meta = data?.meta;

  const handleDelete = (id: string) => {
    confirm_modal(`Are you sure you want to delete`).then(async (res) => {
      if (res.isConfirmed) {
        try {
          console.log(id);

          const res = await deleteCourse(id).unwrap();

          console.log(res, "response for delete course");
          if (res.success == false) {
            // message.success("Admin Successfully Deleted!");
            // setOpen(false);
            Error_model_hook(res?.message);
          } else {
            Success_model("Course Successfully Deleted");
          }
        } catch (error: any) {
          message.error(error.message);
        }
      }
    });
  };

  const columns = [
    {
      title: "",
      render: function (data: any) {
        return <>{<Image src={data?.img} width={80} height={50} alt="dd" />}</>;
      },
      width: 100,
    },
    {
      title: "Name",
      dataIndex: "title",
      ellipsis: true,
    },
    {
      title: "snid",
      dataIndex: "snid",
      ellipsis: true,
    },
    {
      title: "price",
      dataIndex: "price",
      ellipsis: true,
    },
    {
      title: "duration",
      dataIndex: "duration",
      ellipsis: true,
    },
    {
      title: "level",
      dataIndex: "level",
      ellipsis: true,
    },
    {
      title: "Price Type",
      dataIndex: "price_type",
      ellipsis: true,
    },
    {
      title: "author",
      dataIndex: "author",
      render: function (data:any) {
        // console.log(data);
        return data.email
      },
      ellipsis: true,
    },
    {
      title: "author Role",
      dataIndex: "author",
      render: function (data:any) {
        // console.log(data);
        return data.role
      },
      ellipsis: true,
    },
    {
      title: "category",
      dataIndex: "category",
      render: function (data:any) {
        console.log(data);
        return data.title
      },
      ellipsis: true,
    },
  
    {
      title: "Created at",
      dataIndex: "createdAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },
    // {
    //   title: "Contact no.",
    //   dataIndex: "contact",
    // },
    // {
    //   title: "Course",
    // //   dataIndex: "course",
    //   render: function (data: any) {
    //     return <>{data?.course?.title}</>;
    //   },
    // },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "_id",
      render: function (data: any) {
        return (
          <>
            <Link href={`/admin/course/details/${data}`}>
              <Button onClick={() => console.log(data)} type="default">
                <EyeOutlined />
              </Button>
            </Link>
            <Link href={`/admin/course/edit/${data}`}>
              <Button
                style={{
                  margin: "0px 5px",
                }}
                onClick={() => console.log(data)}
                type="default"
              >
                <EditOutlined />
              </Button>
            </Link>
            <Button onClick={() => handleDelete(data)} type="default" danger>
              <DeleteOutlined />
            </Button>
          </>
        );
      },
    },
  ];
  const onPaginationChange = (page: number, pageSize: number) => {
    console.log("Page:", page, "PageSize:", pageSize);
    setPage(page);
    setSize(pageSize);
  };
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    // console.log(order, field);
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };

  const deleteAdminHandler = async (id: string) => {
    // console.log(id);
    try {
      const res = await deleteCourse(id);
      if (res) {
        message.success("Admin Successfully Deleted!");
        setOpen(false);
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  return (
    <div>
      {/* <UMBreadCrumb
        items={[
          {
            label: "admin",
            link: "/admin",
          },
        ]}
      /> */}
      <ActionBar title="Service List">
        <Input
          size="large"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "20%",
          }}
        />
        <div>
          <Link href={`/admin/course/create`}>
            <Button type="default">Create Course</Button>
          </Link>
          {(!!sortBy || !!sortOrder || !!searchTerm) && (
            <Button
              style={{ margin: "0px 5px" }}
              type="default"
              onClick={resetFilters}
            >
              <ReloadOutlined />
            </Button>
          )}
        </div>
      </ActionBar>

      <UMTable
        loading={isLoading}
        columns={columns}
        dataSource={courseData}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />

      <UMModal
        title="Remove admin"
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => deleteAdminHandler(adminId)}
      >
        <p className="my-5">Do you want to remove this admin?</p>
      </UMModal>
    </div>
  );
};

export default CourseList;
