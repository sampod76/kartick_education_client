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
import StatusTag from "@/components/ui/CustomTag/StatusTag";
import Image from "next/image";
import ImageTag from "@/components/ui/CustomTag/ImageTag";
import { useDeleteUserMutation, useGetAllUsersQuery } from "@/redux/api/adminApi/usersApi";

const AdminPage = () => {
  const SUPER_ADMIN = USER_ROLE.ADMIN;
  const query: Record<string, any> = {};
  const [deleteUser] = useDeleteUserMutation();

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

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }
  const { data = [], isLoading } = useGetAllUsersQuery({
    ...query,
  });

  //@ts-ignore
  const UserData = data?.data?.data;
  console.log(
    "🚀 ~ file: page.tsx:63 ~ AdminPage ~ UserData:",
    UserData
  );
  //@ts-ignore
  const meta = data?.data?.meta;

  const columns = [
    {
      title: "Profile",
      width: 100,
      render: function (data: any) {
        const img = data[data.role]["img"];
        return (
          <>
            {
              <ImageTag
                url={img}
                width={100}
                height={100}
                style="w-[5rem] h-[2.8rem] rounded"
                alt="dd"
              />
            }
          </>
        );
      },
    },
    {
      title: "Name",
      ellipsis: true,
      render: function (data: any) {
        const fullName = data[data.role]['name']['firstName'] + " " + data[data.role]['name']['lastName'] 
        return <p className="capitalize">{fullName}</p>;
      },
    },
    {
      title: "Email",
      ellipsis: true,
      dataIndex: "email",
    },
    {
      title: "Role",
      width: 100,
      render: function (data: any) {
        const role = data?.role;
        return <>{role}</>;
      },
    },
    {
      title: "Status",
      width: 100,
      render: function (data: any) {
        const status = data?.status;
        return <StatusTag status={status} />;
      },
    },

    {
      title: "Contact no.",
      render: function (data: any) {
        const Contact = data[data.role]["phoneNumber"];
        return <>{Contact}</>;
      },
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
      title: "Action",
      dataIndex: "_id",
      render: function (data: any) {
        console.log(data);
        return (
          <>
            <Link href={`/${SUPER_ADMIN}/manage-users/all-users/details/${data}`}>
              <Button onClick={() => console.log(data)} type="primary">
                <EyeOutlined />
              </Button>
            </Link>
            <Link href={`/${SUPER_ADMIN}/manage-users/all-users/edit/${data}`}>
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
              onClick={() => deleteUserHandler(data)}
              type="primary"
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

  const deleteUserHandler = async (id: string) => {
    console.log(id);
    confirm_modal(`Are you sure you want to delete`).then(async (res) => {
      if (res.isConfirmed) {
        try {
          const res = await deleteUser(id).unwrap();
          if (res.success == false) {
            // message.success("Admin Successfully Deleted!");
            // setOpen(false);
            Error_model_hook(res?.message);
          } else {
            Success_model("Customer Successfully Deleted");
          }
        } catch (error: any) {
          message.error(error.message);
        }
      }
    });
  };
  // if (isLoading) {
  //   return <LoadingForDataFetch />;
  // }
  return (
    <div style={{
      boxShadow:
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      borderRadius: "1rem",
      backgroundColor: "white",
      padding: "1rem",
    }}>
      <h1 className="text-center font-bold text-2xl">All User List</h1>
      <hr />
      <ActionBar>
        <Input
          size="large"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "20%",
          }}
        />
        <div>
          <Link href={`/${SUPER_ADMIN}/manage-users/all-users/create`}>
            <Button type="primary">Create Customer</Button>
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
        dataSource={UserData}
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
        handleOk={() => deleteUserHandler(adminId)}
      >
        <p className="my-5">Do you want to remove this admin?</p>
      </UMModal>
    </div>
  );
};

export default AdminPage;
