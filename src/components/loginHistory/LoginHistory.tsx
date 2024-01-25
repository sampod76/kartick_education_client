"use client";
import React, { useState } from "react";
import UMTable from "../ui/UMTable";
import { useDebounced } from "@/redux/hooks";
import { Dropdown, Menu, Space, message } from "antd";
import Link from "next/link";
import {
  Error_model_hook,
  Success_model,
  confirm_modal,
} from "@/utils/modalHook";

import dayjs from "dayjs";
import { getUserInfo } from "@/services/auth.service";
import { useGetAllLoginHistoryQuery } from "@/redux/api/public/loginHistory";
import { FaWindows } from "react-icons/fa6";
import { MdDevicesOther } from "react-icons/md";
export default function LoginHistory() {
  const userInfo = getUserInfo() as any;
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  query["status"] = "active";
  query["user"] = userInfo?.id;

  const { data = [], isLoading } = useGetAllLoginHistoryQuery({ ...query });
  console.log("🚀 ~ file: page.tsx:68 ~ MileStoneList ~ data:", data);

  //@ts-ignore
  const loginHistoryData = data?.data || [];

  //@ts-ignore
  const meta = data?.meta;

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }

  const columns = [
    {
      title: "Device Name",
      //   dataIndex: "device_info.os.name",
      render: function (data: any) {
        return (
          <p className="flex justify-start items-center gap-2">
            {data?.device_info?.os?.name === "Windows" ? (
              <FaWindows className="text-lg" />
            ) : (
              <MdDevicesOther className="text-lg" />
            )}
            {data?.device_info?.os?.name}
          </p>
        );
      },
    },
    {
      title: "Engine version",
      //   dataIndex: "device_info.os.name",
      render: function (data: any) {
        return (
          <p>
            {data?.device_info?.client?.name}-(
            {data?.device_info?.client?.engine_version})
          </p>
        );
      },
    },
    {
      title: "Device type",
      //   dataIndex: "device_info.os.name",
      render: function (data: any) {
        return <p>{data?.device_info?.device?.type}</p>;
      },
    },
    {
      title: "Ip",
      dataIndex: "ip",
      width: 100,
    },

    {
      title: "Login time",
      dataIndex: "createdAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },
    {
      title: "Action",
      fixed: "right",
      render: (record: any) => (
        // console.log(object);
        <>
          <Space size="middle">
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item key="view">
                    <Link
                      href={`/${userInfo?.role}/package/details/${record._id}`}
                    >
                      View
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="edit">
                    <Link
                      href={`/${userInfo?.role}/package/edit/${record._id}`}
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
              <a>Action</a>
            </Dropdown>
          </Space>
        </>
      ),
      width: 100,
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
  const handleDelete = (id: string) => {
    confirm_modal(`Are you sure you want to delete`).then(async (res) => {
      if (res.isConfirmed) {
        try {
          console.log(id);

          const res = { success: false, message: "" };

          console.log(res, "response for delete Package");
          if (res?.success == false) {
            // message.success("Admin Successfully Deleted!");
            // setOpen(false);
            Error_model_hook(res?.message);
          } else {
            Success_model("Package Successfully Deleted");
          }
        } catch (error: any) {
          message.error(error.message);
        }
      }
    });
  };
  return (
    <div>
      {" "}
      <UMTable
        loading={isLoading}
        columns={columns}
        dataSource={loginHistoryData}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />
    </div>
  );
}
