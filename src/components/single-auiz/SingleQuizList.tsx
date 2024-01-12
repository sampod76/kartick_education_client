"use client";
import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { Button, Dropdown, Input, Menu, Space, message } from "antd";
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

import {
  useDeleteSingleQuizMutation,
  useGetAllSingleQuizQuery,
} from "@/redux/api/adminApi/singleQuiz";
import { AllImage } from "@/assets/AllImge";
import { USER_ROLE } from "@/constants/role";

const SingleQuizList = () => {

  const query: Record<string, any> = {};

  const ADMIN=USER_ROLE.ADMIN


  const [deleteSingleQuiz,{isLoading:deleteSingleLoading}] = useDeleteSingleQuizMutation();


  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [adminId, setAdminId] = useState<string>("");

  const query: Record<string, any> = {};
  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  query["status"] = ENUM_STATUS.ACTIVE;
  //
  query["category"] = category?._id;
  query["course"] = course?._id;
  query["milestone"] = milestone?._id;
  query["module"] = module?._id;
  query["lesson"] = lesson?._id;
  query["quiz"] = quiz?._id;
  //
  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }
  const { data = [], isLoading } = useGetAllSingleQuizQuery({ ...query });

  console.log("🚀 ~ file: page.tsx:65 ~ SingleQuizStoneList ~ data:", data)


  //@ts-ignore
  const singleQuizData = data?.data;
  //@ts-ignore
  const meta = data?.meta;
  const handleDelete = (id: string) => {
    console.log("🚀 ~ file: page.tsx:79 ~ handleDelete ~ id:", id);

    confirm_modal(`Are you sure you want to delete`).then(async (res) => {
      if (res.isConfirmed) {
        try {
          // console.log(id);

          const res = await deleteSingleQuiz(id).unwrap();

          console.log(res, "response for delete SIngle QUiz");
          if (res.success == false) {
            // message.success("Admin Successfully Deleted!");
            // setOpen(false);
            Error_model_hook(res?.message);
          } else {
            Success_model("SIngle QUiz Successfully Deleted");
          }
        } catch (error: any) {
          message.error(error.message);
        }
      }
    });
  };
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
    },
    {

      title: "Description",
      dataIndex: "short_description",

      ellipsis: true,
      width: 100,
    },
    {
      title: "single_answer",
      dataIndex: "single_answer",
      ellipsis: true,
    },
    {
      title: "quiz",
      // dataIndex: "showing_number",

      ellipsis: true,
      render: function (data: any) {
        return <>{data?.quiz?.title}</>;
      },
    },
    // {
    //   title: "course",
    //   dataIndex: ["course", "title"],
    //   ellipsis: true,
    // },
   
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
      render: (record: any) => (
        <>
          <Space size="middle">
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item key="view">

                    <Link href={`/${ADMIN}/single-quiz/details/${record._id}`}>

                      View
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="edit">

                    <Link href={`/${ADMIN}/single-quiz/edit/${record._id}`}>Edit</Link>

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
  const deleteSIngleQuizHandler = async (id: string) => {
    console.log("🚀 ~ file: page.tsx:194 ~ deleteSIngleQuizHandler ~ id:", id);

    // console.log(id);
    try {
      const res = await deleteSingleQuiz(id);
      if (res) {
        message.success("Milstone Successfully Deleted!");
        setOpen(false);
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  //---------------------------------
  const showDrawer = () => {
    setOpenDrawer(true);
  };
  const onClose = () => {
    setOpenDrawer(false);
  };

  //--------------------------------
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
            label: "admin",
            link: "/admin",
          },
          {
            label: "Single Quiz",
            link: "/admin/single-quiz",
          },
        ]}
      /> */}
      <HeadingUI>SIngle Quiz List</HeadingUI>
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
          <Link href={`/admin/single-quiz/create`}>
            <Button type="default">Create Single Quiz</Button>
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
        dataSource={singleQuizData}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />

      <UMModal
        title="Remove singleQuized"
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => deleteSIngleQuizHandler(singleQuizData?._id)}
      >
        <p className="my-5">Do you want to remove this single Quize?</p>
      </UMModal>
      <Drawer
        title={<div className="flex justify-between items-center "><p>Filter</p> <button onClick={onClose} className="text-lg text-red-500 rounded hover:text-white px-5  hover:bg-red-600">X</button></div>}
        placement={placement}
        closable={false}
        onClose={onClose}
        open={openDrawer}
        key={placement}
        size="large"
        
      >
        <SelectCategoryChildren
          lableText="Select category"
          setState={setCategory}
          isLoading={isLoading}
          categoryData={categoryData}
        />

        <SelectCategoryChildren
          lableText="Select courses"
          setState={setCourse}
          categoryData={
            //@ts-ignore
            category?.courses || []
          }
        />

        <SelectCategoryChildren
          lableText="Select milestones"
          setState={setmilestone}
          categoryData={
            //@ts-ignore
            course?.milestones || []
          }
        />

        <SelectCategoryChildren
          lableText="Select module"
          setState={setmodule}
          categoryData={
            //@ts-ignore
            milestone?.modules || []
          }
        />

        <SelectCategoryChildren
          lableText="Select lesson"
          setState={setlesson}
          categoryData={
            //@ts-ignore
            module?.lessons || []
          }
        />

        <SelectCategoryChildren
          lableText="Select quiz"
          setState={setquiz}
          categoryData={
            //@ts-ignore
            lesson?.quizzes || []
          }
        />
      </Drawer>
    </div>
  );
};

export default SingleQuizList;
