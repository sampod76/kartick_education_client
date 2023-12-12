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
import {
  useDeleteAdminMutation,
  useGetMultipleAdminsQuery,
} from "@/redux/api/adminApi";

import dayjs from "dayjs";
import UMModal from "@/components/ui/UMModal";
import {
  Error_model_hook,
  Success_model,
  confirm_modal,
} from "@/utils/modalHook";
import Image from "next/image";
import { NO_IMAGE } from "@/constants/filePatch";
import LoadingForDataFetch from "@/components/Utlis/LoadingForDataFetch";

const AdminPage = () => {
  const query: Record<string, any> = {};
  const [deleteAdmin] = useDeleteAdminMutation();

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
  const { data = [], isLoading } = useGetMultipleAdminsQuery({ ...query });

  //@ts-ignore
  const adminData = data?.data;
  console.log(adminData);
  //@ts-ignore
  const meta = data?.meta;

  const columns = [
    {
      title: "",
      render: function (data: any) {
     
        return (
          <>
            <Image
              src={data?.profileImage || NO_IMAGE}
              width={300}
              height={300}
              className="w-14"
              alt=""
            />
          </>
        );
      },
    },
    {
      title: "Name",
      render: function (data: any) {
        const fullName = `${data?.name} `;
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
      key: "_id",
    },
    {
      title: "Role update",

      render: function (data: any) {
        return (
          <Button onClick={() => handleUpdataRole(data._id)}>
            Admin to Normal user
          </Button>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "_id",
      render: function (data: any) {
        return (
          <>
            <Link href={`/super_admin/admin/details/${data}`}>
              <Button onClick={() => console.log(data)} type="primary">
                <EyeOutlined />
              </Button>
            </Link>
            <Link href={`/super_admin/admin/edit/${data}`}>
              <Button
                style={{
                  margin: "0px 5px",
                }}
                onClick={() => console.log(data)}
                type="primary"
              >
                <EditOutlined />
              </Button>
            </Link>
            <Button
              onClick={() => deleteAdminHandler(data)}
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

  const deleteAdminHandler = async (id: string) => {
    console.log(id);
    confirm_modal(`Are you sure you want to delete`).then(async (res) => {
      if (res.isConfirmed) {
        try {
          const res = await deleteAdmin(id).unwrap();
          if (res.success == false) {
            // message.success("Admin Successfully Deleted!");
            // setOpen(false);
            Error_model_hook(res?.message);
          } else {
            Success_model("Admin Successfully Deleted");
          }
        } catch (error: any) {
          message.error(error.message);
        }
      }
    });
  };
  const handleUpdataRole = async (id: string) => {
    confirm_modal(`Are you sure you want to Downgrade customer`, "Yes").then(
      async (res) => {
        if (res.isConfirmed) {
          try {
            const res = await deleteAdmin(id).unwrap();
            if (res.success == false) {
              // message.success("Admin Successfully Deleted!");
              // setOpen(false);
              Error_model_hook(res?.message);
            } else {
              Success_model("Admin Successfully Deleted");
            }
          } catch (error: any) {
            message.error(error.message);
          }
        }
      }
    );
  };
  if (isLoading) {
    return <LoadingForDataFetch/>;
  }
  console.log(data);
  return (
    <div>
      <ActionBar title="Admin List">
        <Input
          size="large"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "20%",
          }}
        />
        <div>
          <Link href="/super_admin/admin/create">
            <Button type="primary">Create Admin</Button>
          </Link>
          {(!!sortBy || !!sortOrder || !!searchTerm) && (
            <Button
              style={{ margin: "0px 5px" }}
              type="primary"
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
        dataSource={adminData}
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

export default AdminPage;
