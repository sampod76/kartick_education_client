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
import {
  Error_model_hook,
  Success_model,
  confirm_modal,
} from "@/utils/modalHook";

import { USER_ROLE } from "@/constants/role";
import { useDeleteLessonMutation, useGetAllLessonQuery } from "@/redux/api/adminApi/lessoneApi";



const LessonList = () => {
  const query: Record<string, any> = {};

  // const SUPER_ADMIN=USER_ROLE.ADMIN

  const [deleteLesson] = useDeleteLessonMutation();

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

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }
  const { data = [], isLoading } = useGetAllLessonQuery({ ...query });
  console.log(data);

  //@ts-ignore
  const LessonData = data?.data;

  //@ts-ignore
  const meta = data?.meta;

  const handleDelete = (id: string) => {
    confirm_modal(`Are you sure you want to delete`).then(async (res) => {
      if (res.isConfirmed) {
        try {
          console.log(id);

          const res = await deleteLesson(id).unwrap();

          console.log(res, "response for delete Lesson");
          if (res.success == false) {
            // message.success("Admin Successfully Deleted!");
            // setOpen(false);
            Error_model_hook(res?.message);
          } else {
            Success_model("Lesson Successfully Deleted");
          }
        } catch (error: any) {
          message.error(error.message);
        }
      }
    });
  };

  const columns = [
    {
      title: "",
      render: function (data: any) {
        return <>{<Image src={data?.img} width={80} height={50} alt="dd" />}</>;
      },
      width: 100,
    },
    {
      title: "Name",
      dataIndex: "title",
      ellipsis: true,
    },
    {
      title: "details",
      dataIndex: "details",
      ellipsis: true,
    },
    {
      title: "Lesson Number",
      dataIndex: "lesson_number",
      ellipsis: true,
    },
   
    {
      title: "Lesson",
      dataIndex: "lesson",
      ellipsis: true,
      render: function (data: any) {
        return <>{data?.title}</>;
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
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "_id",
      render: function (data: any) {
        return (
          <>
            <Link href={`/admin/lesson/details/${data}`}>
              <Button type="default">
                <EyeOutlined />
              </Button>
            </Link>
            <Link href={`/admin/lesson/edit/${data}`}>
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
            <Button onClick={() => handleDelete(data)} type="default" danger>
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

  const deleteLessonHandler = async (id: string) => {
    // console.log(id);
    try {
      const res = await deleteLesson(id);
      if (res) {
        message.success("Lesson Successfully Deleted!");
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
            label: "admin",
            link: "/admin",
          },
        ]}
      /> */}
      <ActionBar title="Lesson List">
        <Input
          size="large"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "20%",
          }}
        />
        <div>
          <Link href={`/admin/lesson/create`}>
            <Button type="default">Create Lesson</Button>
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
        dataSource={LessonData}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />

      <UMModal
        title="Remove Lesson"
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => deleteLessonHandler(adminId)}
      >
        <p className="my-5">Do you want to remove this admin?</p>
      </UMModal>
    </div>
  );
};

export default LessonList;
