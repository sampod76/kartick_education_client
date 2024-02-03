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

const TrainerListPage = () => {
  const SUPER_ADMIN = USER_ROLE.ADMIN;
  const userInfo = getUserInfo() as any;
  const query: Record<string, any> = {};
  const [deleteStudent] = useDeleteStudentMutation();

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
  console.log(query, "query");
  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }
  const { data = [], isLoading } = useGetAllStudentsQuery({
    ...query,
  });

  //@ts-ignore
  const StudentData = data?.data;

  console.log(StudentData, "student data");

  //@ts-ignore
  const meta = data?.meta;

  const columns = [
    {
      title: "Name",
      render: function (data: any) {
        // console.log(data);
        const fullName = `${data?.name?.firstName} ${data?.name?.lastName}  `;
        return <>{fullName}</>;
      },
    },
    {
      title: "Email",
      dataIndex: "email",
    },

    {
      title: "Created at",
      dataIndex: "createdAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },
    {
      title: "Contact no.",
      dataIndex: "phoneNumber",
    },
    {
      title: "Date Of Birth",
      dataIndex: "dateOfBirth",
    },
    {
      title: "Gender",
      dataIndex: "gender",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "_id",
      width: 130,
      render: function (data: any) {
        return (
          <>
            <Link
              href={`/${userInfo?.role}/manage-users/students/details/${data}`}
            >
              <Button onClick={() => console.log(data)} type="default">
                <EyeOutlined />
              </Button>
            </Link>
            <Link
              href={`/${userInfo?.role}/manage-users/students/edit/${data}`}
            >
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
            <Button
              onClick={() => deleteStudentHandler(data)}
              type="default"
              danger
            >
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

  const deleteStudentHandler = async (id: string) => {
    console.log(id);
    confirm_modal(`Are you sure you want to delete`).then(async (res) => {
      if (res.isConfirmed) {
        try {
          const res = await deleteStudent(id).unwrap();
          if (res?.success == false) {
            // message.success("Admin Successfully Deleted!");
            // setOpen(false);
            Error_model_hook(res?.message);
          } else {
            Success_model("Student Successfully Deleted");
          }
        } catch (error: any) {
          Error_model_hook(error.message);
        }
      }
    });
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
          <Link href={`/${userInfo?.role}/manage-users/students/create`}>
            <Button type="default">Create Student</Button>
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
        dataSource={StudentData}
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
        handleOk={() => deleteStudentHandler(adminId)}
      >
        <p className="my-5">Do you want to remove this admin?</p>
      </UMModal>
    </div>
  );
};

export default TrainerListPage;
