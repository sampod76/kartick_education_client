"use client";
import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import {
  Button,
  Drawer,
  DrawerProps,
  Dropdown,
  Input,
  Menu,
  Space,
  message,
} from "antd";
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

import HeadingUI from "@/components/ui/dashboardUI/HeadingUI";
import FilterCourse from "@/components/dashboard/Filter/FilterCourse";
import { AllImage } from "@/assets/AllImge";
import { useGetAllCategoryChildrenQuery } from "@/redux/api/categoryChildrenApi";

import { IDecodedInfo, getUserInfo } from "@/services/auth.service";

import SelectCategoryChildren from "@/components/Forms/GeneralField/SelectCategoryChildren";
import { useGetAllPurchaseAcceptedPackageQuery, useGetAllPurchasePendingAndAcceptedPackageQuery } from "@/redux/api/public/purchaseAPi";

export default function PurchasePackageList() {
  const query: Record<string, any> = {};

  // const SUPER_ADMIN=USER_ROLE.ADMIN
  const userInfo = getUserInfo() as IDecodedInfo;

  //   const [deletePurchasePackage] = useDeletePackageMutation();

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [filterValue, setFilterValue] = useState("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  query["status"] = "active";
  //

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }
  const { data = [], isLoading } = useGetAllPurchasePendingAndAcceptedPackageQuery({
    ...query,
  });
  console.log("🚀 ~ file: page.tsx:68 ~  ~ data:", data);

  //@ts-ignore
  const packageData = data?.data || [];

  //@ts-ignore
  const meta = data?.meta;

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
      // width: 90,
    },
    {
      title: "Type",
      dataIndex: "type",
      //   ellipsis: true,
      width: 130,
    },
    {
      title: "MemberShip",
      dataIndex: ["membership", "title"],
      ellipsis: true,
    },
    {
      title: "Payment",
      dataIndex: ["payment", "platform"],
      ellipsis: true,
      width: 100,
    },
    {
      title: "Purchased",
      dataIndex: "purchase",
      // ellipsis: true,
      width: 108,
      render: function (data: any) {
        return `${data?.label}`;
      },
    },
    {
      title: "Price",
      dataIndex: "purchase",
      // ellipsis: true,
      width: 100,
      render: function (data: any) {
        return `$ ${data?.price}`;
      },
    },
    {
      title: "Expiry Date",
      dataIndex: "expiry_date",
      // ellipsis: true,
      width: 150,
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
    },
    {
      title: "PaymentStatus",
      dataIndex: "paymentStatus",
      // ellipsis: true,
      width: 100,
      render: function (data: string) {
        return (
          <>
            {data === "approved" ? (
              <button className="text-sm p-1 rounded-sm text-slate-700 bg-green-400">
                Approved
              </button>
            ) : (
              <button className="text-sm p-1 rounded-sm text-slate-700 bg-red-400">
                Pending
              </button>
            )}
          </>
        );
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
      // width: 130,
      render: (record: any) => (
        // console.log(object);
        <>
          <Space size="middle">
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item key="view">
                    <Link
                      href={`/${userInfo?.role}/purchase-package/details/${record._id}`}
                    >
                      View
                    </Link>
                  </Menu.Item>
                  {/* <Menu.Item key="edit">
                    <Link href={`/${userInfo?.role}/package/edit/${record._id}`}>
                      Edit
                    </Link>
                  </Menu.Item> */}
                </Menu>
              }
            >
              <button className="text-blue-700">Action</button>
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
      {/* <UMBreadCrumb
                items={[
                    {
                        label: `${userInfo?.role}`,
                        link: `/${userInfo?.role}`,
                    },
                    {
                        label: `Purchase Package`,
                        link: `/${userInfo?.role}/purchase-package`,
                    },
                ]}
            /> */}
      <HeadingUI>Purchased Package List</HeadingUI>
      <ActionBar>
        <div className="block lg:flex gap-5">
          <Input
            size="large"
            placeholder="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "15rem",
            }}
          />
          {/* <FilterCourse
            filterValue={filterValue}
            setFilterValue={setFilterValue}
          /> */}
        </div>
        <div className="block lg:flex gap-5">
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
        dataSource={packageData}
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
