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
import { useAppSelector, useDebounced } from "@/redux/hooks";
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
  useDeleteCourseMutation,
  useGetAllCourseQuery,
} from "@/redux/api/adminApi/courseApi";
import HeadingUI from "@/components/ui/dashboardUI/HeadingUI";
import FilterCategorySelect from "@/components/dashboard/Filter/FilterCategory";
import dynamic from "next/dynamic";
import ModalComponent from "@/components/Modal/ModalComponents";
import Test from "@/components/Utlis/Test";
import CreateCourse from "@/components/Course/CreateCourse";
import { IDecodedInfo, getUserInfo } from "@/services/auth.service";
import { useGlobalContext } from "../ContextApi/GlobalContextApi";

const CourseList = () => {
  const query: Record<string, any> = {};


  // const userInfo = getUserInfo() as IDecodedInfo;
  const {userInfo,userInfoLoading} =useGlobalContext()

  const { data: userStateData } = useAppSelector(state => state.userInfo)
  // console.log('userStateData', userStateData)

  const [deleteCourse, { isLoading: deleteLoading }] = useDeleteCourseMutation();

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [courseId, setCourseId] = useState<string>("");

  const [filterValue, setFilterValue] = useState("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  query["status"] = "active";
  if (filterValue) {
    query["category"] = filterValue;
  }

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }

  const { data, isLoading } = useGetAllCourseQuery({ ...query });

  //@ts-ignore
  const courseData = data?.data || [];
  // console.log("🚀 ~ CourseList ~ courseData:", courseData)
  //@ts-ignore
  const meta = data?.meta;

  // console.log('userInfo?.role',userInfo?.role)

  const handleDelete = (id: string) => {
    confirm_modal(`Are you sure you want to delete`).then(async (res) => {
      if (res.isConfirmed) {
        try {
          const res = await deleteCourse(id).unwrap();
          if (res?.success == false) {
            // message.success("Admin Successfully Deleted!");
            // setOpen(false);
            Error_model_hook(res?.message);
          } else {
            Success_model("Course Successfully Deleted");
          }
        } catch (error: any) {
          console.log("🚀 ~ confirm_modal ~ error:", error);
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
                src={data?.img}
                style={{ height: "50px", width: "80px" }}
                width={150}
                height={150}
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
      // fixed:"left",
      dataIndex: "title",
      // ellipsis: true,
      // responsive: ['md','sm']
    },
    {
      title: "price",
      dataIndex: "price",
      ellipsis: true,
      width: 100,
    },
    // {
    //   title: "duration",
    //   dataIndex: "duration",
    //   render: function (data: any) {
    //     // console.log(data)
    //     return data?.length && `${dayjs(data[0]).format("MMM D, YYYY hh:mm A")} - ${dayjs(data[2]).format("MMM D, YYYY hh:mm A")}`;
    //   },
    //   // ellipsis: true,
    // },
    {
      title: "label",
      dataIndex: ["labelDetails", "title"],
      ellipsis: true,
    },
    {
      title: "Price Type",
      dataIndex: "price_type",
      // ellipsis: true,
      width: 100,
    },
    {
      title: "author",
      dataIndex: "author",
      render: function (data: any) {
        // console.log(data);
        return data.email;
      },
      // ellipsis: true,
    },
    {
      title: "category",
      dataIndex: "category",
      render: function (data: any) {
        return data.title;
      },
      ellipsis: true,
      // width: 120,
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
      width: 80,
      // render:function(data:any){
      //   console.log(data);
      // }
    },
    {
      title: "Action",
      // fixed: "right",
      width: 110,
      render: (record: any) => (
        <>
          <Space size="middle">
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item key="details">
                    <Link
                      href={`/${userInfo?.role}/course/details/${record._id}`}
                    >
                      View
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="edit">
                    <Link href={`/${userInfo?.role}/course/edit/${record._id}`}>
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

                  {/* <Menu.Item key="add_milestone">
                    <Link
                      href={`/${userInfo?.role}/course/create/milestone/${record?._id}?courseName=${record?.title}`}
                    >
                      Add Milestone
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
    },
  ];
  const onPaginationChange = (page: number, pageSize: number) => {
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

  const deleteCourseHandler = async (id: string) => {
    try {
      const res: any = await deleteCourse(id);
      console.log("🚀 ~ deleteCourseHandler ~ res:", res);
      if (res._id) {
        message.success("Admin Successfully Deleted!");
        setOpen(false);
      }
    } catch (error: any) {
      console.log("🚀 ~ deleteCourseHandler ~ error:", error);
      Error_model_hook(error.message);
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
          {
            label: "Courses",
            link: "/admin/course",
          },
        ]}
      /> */}

      <HeadingUI>Course List</HeadingUI>

      <ActionBar>
        <div className="flex gap-2">
          <Input
            size="large"
            placeholder="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "20%",
            }}
          />
          <FilterCategorySelect
            filterValue={filterValue}
            setFilterValue={setFilterValue}
          />
        </div>

        <div>
          <ModalComponent buttonText="Create Course">
            <CreateCourse />
          </ModalComponent>
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
        dataSource={courseData}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />

      <UMModal
        title="Remove Course"
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => deleteCourseHandler(courseId)}
      >
        <p style={{ marginTop: "1.25rem", marginBottom: "1.25rem" }}>
          Do you want to remove this Course?
        </p>
      </UMModal>
    </div>
  );
};

// export default CourseList;

export default dynamic(() => Promise.resolve(CourseList), {
  ssr: false,
});
