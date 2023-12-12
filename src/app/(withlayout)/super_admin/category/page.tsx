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
import { Error_model_hook, Success_model, confirm_modal } from "@/utils/modalHook";
import { useDeleteCategoryMutation, useGetAllCategoryQuery } from "@/redux/api/categoryApi";
import { USER_ROLE } from "@/constants/role";

const ServiceList = () => {
  const query: Record<string, any> = {};

  const SUPER_ADMIN=USER_ROLE.SUPER_ADMIN

  const [deleteCategory] = useDeleteCategoryMutation();

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
  const { data = [], isLoading } = useGetAllCategoryQuery({ ...query });

  //@ts-ignore
  const categoryData = data?.data;
  console.log("🚀 ~ file: page.tsx:51 ~ ServiceList ~ adminData:", categoryData)
  //@ts-ignore
  const meta = data?.meta;

  const handleDelete=(id:string)=>{
    confirm_modal(`Are you sure you want to delete`).then(async(res) => {
      if (res.isConfirmed) {
        try {
          const res = await deleteCategory(id).unwrap();
          if (res.success ==false) {
            // message.success("Admin Successfully Deleted!");
            // setOpen(false);
            Error_model_hook(res?.message)
          }else{
            Success_model("Category Successfully Deleted")
          }
        } catch (error: any) {
          message.error(error.message);
        }
      }
    });
  }

  const columns = [
    {
      title: "",
      render: function (data:any) {
        return <>{<Image src={data?.image} width={80} height={50} alt="dd"/>}</>;
      },
      width:100
    },
    {
      title: "Name",
      dataIndex: "title",
      ellipsis: true,
    },
  
    // {
    //   title: "Price",
    //   dataIndex: "price",
    // },
   
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
    //   title: "Category",
    // //   dataIndex: "category",
    //   render: function (data: any) {
    //     return <>{data?.category?.title}</>;
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
            <Link href={`/${SUPER_ADMIN}/category/details/${data}`}>
              <Button onClick={() => console.log(data)} type="primary">
                <EyeOutlined />
              </Button>
            </Link>
            <Link href={`/${SUPER_ADMIN}/category/edit/${data}`}>
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
            <Button onClick={() => handleDelete(data)} type="primary" danger>
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
      const res = await deleteCategory(id);
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
            label: "${SUPER_ADMIN}",
            link: "/${SUPER_ADMIN}",
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
          <Link href={`/${SUPER_ADMIN}/category/create`}>
            <Button type="primary">Create Category</Button>
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
        dataSource={categoryData}
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

export default ServiceList;
