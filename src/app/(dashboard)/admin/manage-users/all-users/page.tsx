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
import StatusTag from "@/components/ui/CustomTag/StatusTag";
import Image from "next/image";
import ImageTag from "@/components/ui/CustomTag/ImageTag";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "@/redux/api/adminApi/usersApi";
import dynamic from "next/dynamic";
import { getUserInfo } from "@/services/auth.service";

const AdminPage = () => {
  // const userInfo?.role = USER_ROLE.ADMIN;
  const userInfo = getUserInfo() as any
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

  //  // console.log("🚀 ~ file: page.tsx:58 ~ AdminPage ~ data:", data);

  //@ts-ignore
  const UserData = data?.data;
  //  //  // console.log("🚀 ~ file: page.tsx:63 ~ AdminPage ~ UserData:", UserData);
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
        let fullName = "";
        if (data?.role === USER_ROLE.ADMIN) {
          fullName = data?.admin?.name?.firstName + " " + data?.admin?.name?.lastName;
        } else if (data?.role === USER_ROLE.TRAINER) {
          fullName =
            data?.trainer?.name?.firstName + " " + data?.trainer?.name?.lastName;
        } else if (data?.role === USER_ROLE.SELLER) {
          fullName =
            data?.seller?.name?.firstName + " " + data?.seller?.name?.lastName;
        } else if (data?.role === USER_ROLE.STUDENT) {
          fullName =
            data?.student?.name?.firstName + " " + data?.student?.name?.lastName;
        }
        return <p className="">{fullName}</p>;
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
        let Contact = "";
        if (data?.role === USER_ROLE.ADMIN) {
          Contact = data?.admin?.phoneNumber;
        } else if (data?.role === USER_ROLE.TRAINER) {
          Contact = data?.trainer?.phoneNumber;
        } else if (data?.role === USER_ROLE.SELLER) {
          Contact = data?.seller?.phoneNumber;
        } else if (data?.role === USER_ROLE.STUDENT) {
          Contact = data?.student?.phoneNumber;
        }
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
      // fixed: "right",
      width: 100,
      render: (record: any) => (
        <>
          <Space size="middle">
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item key="view">
                    <Link
                      href={`/${userInfo?.role}/manage-users/all-users/details/${data}`}
                    >
                      View
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="edit">
                    <Link href={`/${userInfo?.role}/manage-users/all-users/edit/${data}`}>
                      Edit
                    </Link>
                  </Menu.Item>

                  <Menu.Item
                    key="delete"
                    onClick={() => deleteUserHandler(record)}
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

  const deleteUserHandler = async (id: string) => {
    console.log(id);
    confirm_modal(`Are you sure you want to delete`).then(async (res) => {
      if (res.isConfirmed) {
        try {
          const res = await deleteUser(id).unwrap();
          if (res?.success == false) {
            // message.success("Admin Successfully Deleted!");
            // setOpen(false);
            Error_model_hook(res?.message);
          } else {
            Success_model("Customer Successfully Deleted");
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
          <Link href={`/${userInfo.role}/manage-users/all-users/create`}>
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

// export default AdminPage;

// export default AdminPage;

export default dynamic(() =>
  Promise.resolve(AdminPage), {
  ssr: false,
})