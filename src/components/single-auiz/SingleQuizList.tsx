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
  RadioChangeEvent,
  Space,
  message,
} from "antd";
import Link from "next/link";
import {
  DeleteOutlined,
  EditOutlined,
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
  useDeleteMilestoneMutation,
  useGetAllMilestoneQuery,
} from "@/redux/api/adminApi/milestoneApi";
import HeadingUI from "@/components/ui/dashboardUI/HeadingUI";

import {
  useDeleteSingleQuizMutation,
  useGetAllSingleQuizQuery,
} from "@/redux/api/adminApi/singleQuizApi";
import { AllImage } from "@/assets/AllImge";
import { USER_ROLE } from "@/constants/role";
import SelectCategoryChildren from "../Forms/GeneralField/SelectCategoryChildren";
import { useGetAllCategoryChildrenQuery } from "@/redux/api/categoryChildrenApi";
import { ENUM_STATUS } from "@/constants/globalEnums";
import { IDecodedInfo, getUserInfo } from "@/services/auth.service";
import { removeNullUndefinedAndFalsey } from "@/hooks/removeNullUndefinedAndFalsey";
import timeDurationToMilliseconds from "@/hooks/stringToMiliSecend";
import { useAddSingleQuizMutation } from "@/redux/api/adminApi/singleQuizApi";
const SingleQuizList = () => {
  const userInfo = getUserInfo() as IDecodedInfo;
  //
  const [openDrawer, setOpenDrawer] = useState(false);
  const [placement, setPlacement] = useState<DrawerProps["placement"]>("right");
  //
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
  const [quiz, setquiz] = useState<{ _id?: string; title?: string }>({});

  const queryCategory: Record<string, any> = {};
  queryCategory["children"] = "course-milestone-module-lessons-quiz";
  //! for Category options selection
  const { data: Category, isLoading: categoryLoading } =
    useGetAllCategoryChildrenQuery({
      ...queryCategory,
    });
  const categoryData: any = Category?.data;
  //----------------------------------------------------------------
  const [deleteSingleQuiz, { isLoading: deleteSingleLoading }] =
    useDeleteSingleQuizMutation();
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

  //@ts-ignore
  const singleQuizData = data?.data;
  //@ts-ignore
  const meta = data?.meta;


  const [addSingleQuiz, { isLoading: serviceLoading }] =
    useAddSingleQuizMutation();

  const handleDuplicate = async (dudata:any)=>{

    // console.log(dudata.milestone);
    
    // return

    const {answers} = dudata

    const values = {

      title : dudata?.title,
      demo_video : dudata?.demo_video,
      hints : dudata?.hints || "",
      quizData :dudata?.quizData,
      serialNumber : dudata?.serialNumber ,
      imgs : [],
      short_description : dudata?.short_description || "",
      status : dudata?.status,
      time_duration :dudata?.time_duration || "",
      answers : answers


    }



    console.log("🚀 ~ onSubmit ~ values:", data)
    // return
    // console.log("🚀 ~ onSubmit ~ values:", values);
    if (!dudata?.quiz?._id) {
      Error_model_hook("Please ensure your are selected quiz");
      return;
    }

    if (!dudata?.type) {
      Error_model_hook("Please select an quiz type");
      return;
    }


    const singleQuizDat: {} = {
      ...values,
      category: dudata?.category,
      course: dudata?.course,
      milestone: dudata?.milestone,
      module: dudata?.module?._id,
      lesson: dudata?.lesson,
      quiz: dudata?.quiz?._id,
      type: dudata?.type,
      
    };



    // console.log(singleQuizDat,"hhhhh");
    
    // return
    removeNullUndefinedAndFalsey(singleQuizDat)
   

// return


    try {
      const res = await addSingleQuiz(singleQuizDat).unwrap();

      if (res?.success == false) {
        Error_model_hook(res?.message);
      } else {
        Success_model("Successfully added the Quiz");
      }
      // console.log(res);
    } catch (error: any) {
      Error_model_hook(error?.message);
      console.log(error);
    }
  };




  const handleDelete = (id: string) => {
    console.log("🚀 ~ file: page.tsx:79 ~ handleDelete ~ id:", id);

    confirm_modal(`Are you sure you want to delete`).then(async (res) => {
      if (res.isConfirmed) {
        try {
          // console.log(id);

          const res = await deleteSingleQuiz(id).unwrap();

          console.log(res, "response for delete SIngle QUiz");
          if (res?.success == false) {
            // message.success("Admin Successfully Deleted!");
            // setOpen(false);
            Error_model_hook(res?.message);
          } else {
            Success_model("SIngle QUiz Successfully Deleted");
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
      title: "Serial",
      dataIndex: "serialNumber",
      // ellipsis: true,
      width: 100
    },
    {
      title: "Type",
      dataIndex: "type",
      // ellipsis: true,
      width: 120
    },
    {
      title: "Time",
      dataIndex: "time_duration",
      render: function (data: any) {
        return <>{Math.floor(data / 1000 / 60)} minutes</>;
      },
      // ellipsis: true,
      width: 120,

    },

    {
      title: "Quiz Name",
      dataIndex: ['quiz', 'title'],
      ellipsis: true,
      // width: 120
    },
    {
      title: "Hints",
      dataIndex: "hints",
      ellipsis: true,
      // width: 120
    },
    {
      title: "Module",
      dataIndex: ['module', 'title'],
      ellipsis: true,
      sorter: true,
      // width: 120
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
      width: 100,
      render: (record: any) => (
        <>
          <Space size="middle">
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item key="view">
                    <Link
                      href={`/${userInfo?.role}/single-quiz/details/${record._id}`}
                    >
                      View
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="edit">
                    <Link
                      href={`/${userInfo?.role}/single-quiz/edit/${record._id}`}
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
                  <Menu.Item
                    key="duplicate"
                    onClick={() => {
                      handleDuplicate(record);
                    }}
                  >
                    duplicate
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
      Error_model_hook(error.message);
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
      <HeadingUI>Single Quiz List</HeadingUI>
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
          <Button
            type="default"
            style={{ marginRight: "5px" }}
            onClick={showDrawer}
          >
            Filter
          </Button>
          <Link href={`/${userInfo?.role}/single-quiz/create`}>
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
