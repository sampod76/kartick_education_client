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

import {
  useDeleteQuizMutation,
  useGetAllQuizQuery,
} from "@/redux/api/adminApi/quizApi";
import HeadingUI from "@/components/ui/dashboardUI/HeadingUI";
import FilterLesson from "@/components/dashboard/Filter/FilterLesson";
import { AllImage } from "@/assets/AllImge";
import { useGetAllCategoryChildrenQuery } from "@/redux/api/categoryChildrenApi";
import SelectCategoryChildren from "../Forms/GeneralField/SelectCategoryChildren";
import { IDecodedInfo, getUserInfo } from "@/services/auth.service";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";


const QuizDashList = () => {
  const screens = useBreakpoint();
  //----------------------------------------------------------------
  const [openDrawer, setOpenDrawer] = useState(false);
  const [placement, setPlacement] = useState<DrawerProps["placement"]>("right");
  //----------------------------------------------------------------
  const [category, setCategory] = useState<{ _id?: string; title?: string }>(
    {}
  );
  const [course, setCourse] = useState<{ _id?: string; title?: string }>({});
  const [milestone, setmilestone] = useState<{ _id?: string; title?: string }>(
    {}
  );
  const [module, setmodule] = useState<{ _id?: string; title?: string }>({});
  const [lesson, setlesson] = useState<{ _id?: string; title?: string }>({});
  const [isReset, setIsReset] = useState(false);

  const categoryQuery: Record<string, any> = {};
  categoryQuery["children"] = "course-milestone-module-lessons";
  //! for Category options selection
  const { data: Category, isLoading: categoryLoading } =
    useGetAllCategoryChildrenQuery({
      ...categoryQuery,
    });

  const categoryData: any = Category?.data;
  //---------------------------------------------------------

  // const SUPER_ADMIN=USER_ROLE.ADMIN
  const userInfo = getUserInfo() as IDecodedInfo;

  const [deleteQuiz] = useDeleteQuizMutation();

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [adminId, setAdminId] = useState<string>("");
  const [filterValue, setFilterValue] = useState<string>("");

  const query: Record<string, any> = {};
  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  query["status"] = "active";
  query["category"] = category?._id;
  query["course"] = course?._id;
  query["milestone"] = milestone?._id;
  query["module"] = module?._id;
  query["lesson"] = lesson?._id;

  if (filterValue) {
    query["lesson"] = filterValue;
  }

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }
  const { data = [], isLoading } = useGetAllQuizQuery({ ...query });
  console.log(data);

  //@ts-ignore
  const QuizData = data?.data;

  //@ts-ignore
  const meta = data?.meta;

  const handleDelete = (id: string) => {
    confirm_modal(`Are you sure you want to delete`).then(async (res) => {
      if (res.isConfirmed) {
        try {
          console.log(id);

          const res = await deleteQuiz(id).unwrap();

          console.log(res, "response for delete Quiz");
          if (res?.success == false) {
            // message.success("Admin Successfully Deleted!");
            // setOpen(false);
            Error_model_hook(res?.message);
          } else {
            Success_model("Quiz Successfully Deleted");
          }
        } catch (error: any) {
          Error_model_hook(error.message);
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
                width={100}
                height={100}
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
    // {
    //   title: "Description",
    //   dataIndex: "short_description",
    //   ellipsis: true,
    // },
    {
      title: "Passing Grade",
      dataIndex: "passingGrade",
      width: 120,
    },
    {
      title: "module",
      dataIndex: ["module", "title"],
      ellipsis: true,
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
                      href={`/${userInfo?.role}/quiz/details/${record._id}`}
                    >
                      View
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="edit">
                    <Link href={`/${userInfo?.role}/quiz/edit/${record._id}`}>
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

  const deleteAdminHandler = async (id: string) => {
    // console.log(id);
    try {
      const res = await deleteQuiz(id);
      if (res) {
        message.success("Quiz Successfully Deleted!");
        setOpen(false);
      }
    } catch (error: any) {
      Error_model_hook(error.message);
    }
  };
  //----------------------------------------------------------------
  const showDrawer = () => {
    setOpenDrawer(true);
  };
  const onClose = () => {
    setOpenDrawer(false);
  };
  //----------------------------------------------------------------
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
      <UMBreadCrumb
        items={[
          {
            label: `${userInfo?.role}`,
            link: `/${userInfo?.role}`,
          },
          {
            label: `Quiz`,
            link: `/${userInfo?.role}/quiz`,
          },
        ]}
      />
      <HeadingUI>Quiz List</HeadingUI>
      <ActionBar>
        <div className="flex gap-2">
          <Input
            size="large"
            placeholder="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: screens.sm ? "30%" : "100%"
            }}
          />
          {/* <FilterLesson
            filterValue={filterValue}
            setFilterValue={setFilterValue}
          /> */}
        </div>
        <div>
          <Button
            type="default"
            style={{ marginRight: "5px" }}
            onClick={showDrawer}
          >
            Filter
          </Button>

          <Link href={`/${userInfo?.role}/quiz/create`}>
            <Button>Create Quiz</Button>
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
        dataSource={QuizData}
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
      <Drawer
        title={
          <div className="flex justify-between items-center ">
            <p>Filter</p>{" "}
            <button
              onClick={onClose}
              className="text-lg text-red-500 rounded hover:text-white px-5  hover:bg-red-600"
            >
              X
            </button>
          </div>
        }
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
          isLoading={categoryLoading}
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
      </Drawer>
    </div>
  );
};

export default QuizDashList;
