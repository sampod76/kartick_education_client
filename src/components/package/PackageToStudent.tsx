"use client";
import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { Button, Dropdown, Input, Menu, Space, message } from "antd";
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
import {
  Error_model_hook,
  Success_model,
  confirm_modal,
} from "@/utils/modalHook";

import { USER_ROLE } from "@/constants/role";
import LoadingForDataFetch from "@/components/Utlis/LoadingForDataFetch";
import {
  useDeleteStudentMutation,
  useGetAllStudentsQuery,
} from "@/redux/api/adminApi/studentApi";
import { getUserInfo } from "@/services/auth.service";
import ModalComponent from "@/components/Modal/ModalComponents";
import CreateStudentComponent from "@/components/student/addStudentByAuthor/addStudentComponent";
import { ENUM_STATUS, ENUM_YN } from "@/constants/globalEnums";
import Image from "next/image";
import { AllImage } from "@/assets/AllImge";

import { useGetAllUsersQuery } from "@/redux/api/adminApi/usersApi";
import {
  useDeletePackageAndCourseMutation,
  useGetAllPackageAndCourseQuery,
  useUpdatePackageAndCourseMutation,
} from "@/redux/api/sellerApi/addPackageAndCourse";

const PackageToStudent = ({ packageId }: { packageId: string }) => {
  console.log("🚀 ~ packageId:", packageId);
  // const SUPER_ADMIN = USER_ROLE.ADMIN;
  const userInfo = getUserInfo() as any;
  const query: Record<string, any> = {};
  const [updatePackageToStudent] = useUpdatePackageAndCourseMutation();

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  // query["status"] = ENUM_STATUS.ACTIVE;
  query["isDelete"] = ENUM_YN.NO;

  const { data, isLoading, error } = useGetAllPackageAndCourseQuery(
    { author: userInfo?.id, sellerPackage: packageId, ...query },
    { skip: !Boolean(userInfo.id) }
  );
  console.log("🚀 ~ data:", data);
  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }

  //@ts-ignore
  const StudentData = data?.data;

  //@ts-ignore
  const meta = data?.meta;

  const columns = [
    {
      title: "Email",
      dataIndex: ["userDetails", "email"],
    },
    {
      title: "UserId",
      dataIndex: ["userDetails", "userId"],
    },

    {
      title: "Status",
      dataIndex: "status",
      width: 100,
    },
    {
      title: "Action",
      dataIndex: "_id",
      width: 100,
      render: function (_id: string, data: any) {
        console.log(data);
        return (
          <>
            <Space size="middle">
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item key="details">
                      <Link
                        href={`/${userInfo?.role}/students/details/${data._id}`}
                      >
                        View
                      </Link>
                    </Menu.Item>

                    <Menu.Item
                      key="delete"
                      onClick={() => {
                        handleDelete(data);
                      }}
                    >
                      {data.status === "active" ? "Deactivate" : "Active"}
                    </Menu.Item>
                    {/* <ModalComponent buttonText="Add package">
                      <SellerAddPackageStudent userId={data} />
                    </ModalComponent> */}
                  </Menu>
                }
              >
                <button className="text-blue-700">Action</button>
              </Dropdown>
            </Space>
          </>
        );
      },
    },
  ];
  const onPaginationChange = (page: number, pageSize: number) => {
    //  // console.log("Page:", page, "PageSize:", pageSize);
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
  const handleDelete = (data: Record<string, any>) => {
    confirm_modal(`Are you sure you want to change status`).then(
      async (res) => {
        if (res.isConfirmed) {
          try {
            const res = await updatePackageToStudent({
              id: data._id,
              data: {
                status: data.status === "active" ? "deactivate" : "active",
              },
            }).unwrap();

            console.log(res, "response for delete Lesson");
            if (res?.success == false) {
              // message.success("Admin Successfully Deleted!");
              // setOpen(false);
              Error_model_hook(res?.message);
            } else {
              Success_model("Successfully change status!");
            }
          } catch (error: any) {
            Error_model_hook(error.message);
          }
        }
      }
    );
  };

  // if (isLoading) {
  //   return <LoadingForDataFetch />;
  // }
  return (
    <div
      style={{
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        borderRadius: "1rem",
        backgroundColor: "white",
        padding: "1rem",
      }}
    >
      <ActionBar title="Student List">
        <Input
          size="large"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "20%",
          }}
        />
        <div>
          {/* <Link href={`/${userInfo?.role}/manage-users/students/create`}>
            <Button type="default">Create Student</Button>
          </Link> */}

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
        dataSource={StudentData}
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

export default PackageToStudent;
