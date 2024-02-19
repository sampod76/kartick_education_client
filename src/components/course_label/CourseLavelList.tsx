"use client";
import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { Button, Dropdown, Input, Menu, Space, message } from "antd";
import Link from "next/link";
import { ReloadOutlined } from "@ant-design/icons";
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
import {
  useDeleteCourse_labelMutation,
  useGetAllCourse_labelQuery,
} from "@/redux/api/adminApi/courseLevelApi";
import HeadingUI from "@/components/ui/dashboardUI/HeadingUI";
import dynamic from "next/dynamic";
import { AllImage } from "@/assets/AllImge";
import { IDecodedInfo, getUserInfo } from "@/services/auth.service";
import { ENUM_YN } from "@/constants/globalEnums";
import FilterCategorySelect from "../dashboard/Filter/FilterCategory";

const Course_labelList = () => {
  const query: Record<string, any> = {};

  // const ADMIN = USER_ROLE.ADMIN;
  const userInfo = getUserInfo() as IDecodedInfo;

  // console.log("🚀 ~ file: page.tsx:41 ~ Course_labelList ~ role:", role);

  const [deleteCourse_label, { isLoading: DeleteCourseLabel }] = useDeleteCourse_labelMutation();


  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("serial_number");
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [filterValue, setFilterValue] = useState("");
  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  query["status"] = "active";
  query["isDelete"] = ENUM_YN.NO;
  if (filterValue) {
    query["category"] = filterValue;
  }

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }
  const { data, isLoading } = useGetAllCourse_labelQuery({ ...query });
  console.log("🚀 ~ data:", data)

  //@ts-ignore
  const Course_labelData = data?.data;

  //@ts-ignore
  const meta = data?.meta;

  const handleDelete = (id: string) => {
    confirm_modal(`Are you sure you want to delete`).then(async (res) => {
      if (res.isConfirmed) {
        try {
          const res = await deleteCourse_label(id).unwrap();
          console.log("🚀 ~ confirm_modal ~ res:", res)

          if (res?.success == false) {
            // message.success("Admin Successfully Deleted!");
            // setOpen(false);
            Error_model_hook(res?.message);
          } else {
            Success_model("Course_label Successfully Deleted");
          }
        } catch (error: any) {
          Error_model_hook(error.data);
          Error_model_hook(error.message);
        }
      }
    });
  };

  const columns = [
    {
      title: "Image",
      render: function (data: any) {
        return (
          <>
            {
              <Image
                src={data?.img || AllImage.notFoundImage}
                style={{ height: "50px", width: "80px" }}
                width={80}
                height={80}
                alt="dd"
              />
            }
          </>
        );
      },
      width: 130,
    },
    {
      title: "Name",
      dataIndex: "title",
      ellipsis: true,
      //  width: 130,
    },
    {
      title: "Subject",
      dataIndex: ["categoryDetails", 'title'],
      ellipsis: true,
      //  width: 130,
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
      width: 220,
    },
    // {
    //   title: "Contact no.",
    //   dataIndex: "contact",
    // },
    // {
    //   title: "Course_label",
    // //   dataIndex: "Course_label",
    //   render: function (data: any) {
    //     return <>{data?.Course_label?.title}</>;
    //   },
    // },
    {
      title: "Action",
      // fixed: "right",
      width: 120,
      render: (record: any) => (
        <>
          <Space size="middle">
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item key="view">
                    <Link
                      href={`/${userInfo?.role}/course_label/details/${record._id}`}
                    >
                      View
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="edit">
                    <Link
                      href={`/${userInfo?.role}/course_label/edit/${record._id}`}
                    >
                      Edit
                    </Link>
                  </Menu.Item>

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
    //
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };


  return (
    <div>
      {/* <UMBreadCrumb
        items={[
          {
            label: `${userInfo?.role}`,
            link: `/${userInfo?.role}`,
          },
          {
            label: `Course_label`,
            link: `/${userInfo?.role}/Course_label`,
          },
        ]}
      /> */}
      <HeadingUI>Course label List</HeadingUI>
      <ActionBar>
        <Input
          size="large"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "20%",
          }}
        />
        <div className="space-x-2">
          <Link href={`/${userInfo?.role}/course_label/create`}>
            <Button size="middle" type="default">Create Course label</Button>
          </Link>
          <FilterCategorySelect
            filterValue={filterValue}
            setFilterValue={setFilterValue}
          />
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
        dataSource={Course_labelData}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />


    </div>
  );
};

export default Course_labelList