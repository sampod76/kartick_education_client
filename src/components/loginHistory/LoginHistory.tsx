"use client";
import React, { useEffect, useState } from "react";
import UMTable from "../ui/UMTable";
import { useDebounced } from "@/redux/hooks";
import { Button, Dropdown, Menu, Space, message } from "antd";
import Link from "next/link";

import {
  Error_model_hook,
  Success_model,
  confirm_modal,
} from "@/utils/modalHook";

import dayjs from "dayjs";
import { getUserInfo } from "@/services/auth.service";
import { useGetAllLoginHistoryQuery } from "@/redux/api/public/loginHistoryApi";
import { FaWindows } from "react-icons/fa6";
import { MdDevicesOther } from "react-icons/md";
import GetCookies from "../Utlis/GetCookies";
import { useUserLogOutMutation } from "@/redux/api/auth/authApi";
import { ENUM_YN } from "@/constants/globalEnums";

export default function LoginHistory() {
  const userInfo = getUserInfo() as any;
  const query: Record<string, any> = {};
  const [refreshToken, setRefreshToken] = useState<{
    loading: boolean;
    value: string;
  }>({ loading: true, value: "" });
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
  query["isDelete"] = ENUM_YN.NO;

  const { data = [], isLoading } = useGetAllLoginHistoryQuery({ ...query });
  const [logOutHistory, { isLoading: LogoutLoading }] = useUserLogOutMutation();

  useEffect(() => {
    GetCookies()
      .then((res: any) => {
        setRefreshToken({ loading: false, value: res?.value });
      })
      .catch(() => {
        setRefreshToken({ loading: false, value: "" });
      });
  }, [LogoutLoading]);

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
      // fixed: "right",
      width: 110,
      render: (record: any) => (
        // console.log(object);
        <div className={`${refreshToken.value === record?.token && "hidden"}`}>
          <Button
            loading={refreshToken.loading}
            hidden={refreshToken.value === record?.token}
            onClick={() => handleLogout(record?._id)}
            style={{ marginRight: "5px", background: "red", color: "white" }}
          >
            Log out
          </Button>
        </div>
      ),
      // width: 100,
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
  const handleLogout = (id: string) => {
    confirm_modal(`Are you sure you want to Logout`).then(async (res) => {
      if (res.isConfirmed) {
        try {
          const res = await logOutHistory({ id, data: {} });

          //@ts-ignore
          if (res?.success == false) {
            // message.success("Admin Successfully Deleted!");
            // setOpen(false);
            //@ts-ignore
            Error_model_hook(res?.message);
          } else {
            Success_model("Successfully Logout");
          }
        } catch (error: any) {
          Error_model_hook(error.message);
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
