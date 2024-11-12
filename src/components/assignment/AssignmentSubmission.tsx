"use client";
import ActionBar from "@/components/ui/ActionBar";
import HeadingUI from "@/components/ui/dashboardUI/HeadingUI";
import UMTable from "@/components/ui/UMTable";
import { USER_ROLE } from "@/constants/role";
import {
  useGetAllSubmitAssignmentQuery,
  useUpdateSubmitAssignmentMutation,
} from "@/redux/api/assernmentSubmitApi";
import { useGetAllCategoryChildrenQuery } from "@/redux/api/categoryChildrenApi";
import { useDebounced } from "@/redux/hooks";
import {
  confirm_modal,
  Error_model_hook,
  Success_model,
} from "@/utils/modalHook";
import { ReloadOutlined } from "@ant-design/icons";
import {
  Button,
  Drawer,
  DrawerProps,
  Dropdown,
  Form,
  Input,
  InputNumber,
  Menu,
  message,
  Space,
  Tag,
} from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { useState } from "react";
import { useGlobalContext } from "../ContextApi/GlobalContextApi";
import SelectCategoryChildren from "../Forms/GeneralField/SelectCategoryChildren";
import ModalComponent from "../Modal/ModalComponents";

export default function AssignmentSubmission() {
  const { userInfo, userInfoLoading } = useGlobalContext();
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
  //
  const [updateSubmitAssignment, { isLoading: updateLoading }] =
    useUpdateSubmitAssignmentMutation();
  //
  const categoryQuery: Record<string, any> = {};
  categoryQuery["children"] = "course-milestone-module-lessons";
  if (userInfo?.role !== USER_ROLE.ADMIN) {
    categoryQuery["author"] = userInfo?.id;
  }
  //! for Category options selection
  const { data: Category, isLoading: categoryLoading } =
    useGetAllCategoryChildrenQuery({
      ...categoryQuery,
    });

  const categoryData: any = Category?.data;
  // console.log("🚀 ~ QuizDashList ~ categoryData:", categoryData);
  //---------------------------------------------------------

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
  if (userInfo?.role === USER_ROLE.SELLER) {
    query["accountCreateAuthor"] = userInfo?.id;
  } else if (userInfo?.role === USER_ROLE.STUDENT) {
    query["author"] = userInfo?.id;
  }

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }
  const { data, isLoading } = useGetAllSubmitAssignmentQuery({ ...query });

  // console.log(data);

  //@ts-ignore
  const QuizData = data?.data;

  //@ts-ignore
  const meta = data?.meta;

  const handleDelete = (id: string) => {
    confirm_modal(`Are you sure you want to delete`).then(async (res) => {
      if (res.isConfirmed) {
        try {
          // console.log(id);

          const res: any = null;

          // console.log(res, "response for delete Quiz");
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
  const onFinish = async (values: any, id: string) => {
    try {
      const res = await updateSubmitAssignment({
        id: id,
        body: values,
      }).unwrap();

      if (res?.marks) {
        message.success("Marks updated successfully");
      } else {
        message.error("Marks should be less than or equal to total marks");
      }
    } catch (error: any) {
      Error_model_hook(error?.message);
      console.log("🚀 ~ onFinish ~ error:", error);
    }
  };

  const columns = [
    {
      title: "Assignment title",
      dataIndex: ["assignment", "title"],
      ellipsis: true,
    },
    {
      title: "Total marks",
      dataIndex: ["assignment", "totalMarks"],
      width: 100,
    },
    {
      title: "Pass Marks",
      dataIndex: ["assignment", "passMarks"],
      width: 100,
    },
    {
      title: "Marks",
      // dataIndex: ["marks"],
      width: 100,
      render: function (data: any) {
        return (
          <div>
            {data?.marks ? data?.marks : <Tag color="green">Pending</Tag>}
          </div>
        );
      },
    },
    {
      title: "Assignment(pdf)",
      //   dataIndex: "passingGrade",
      render: function (data: any) {
        return (
          <>
            <ul className="list-decimal">
              {data?.assignment?.pdfs?.length ? (
                data?.assignment?.pdfs.map((pdf: any) => (
                  <li key={pdf.server_url} className="flex items-center mb-2">
                    <div>
                      <a
                        href={
                          process.env.NEXT_PUBLIC_API_ONLY_BASE_URL +
                          "/" +
                          pdf.server_url
                        }
                        className="text-blue-500"
                      >
                        {pdf.original_filename}
                      </a>
                    </div>
                  </li>
                ))
              ) : (
                <p>No PDFs available</p>
              )}
            </ul>
          </>
        );
      },
    },
    {
      title: "Student submitted",
      //   dataIndex: "passingGrade",
      render: function (data: any) {
        return (
          <>
            <ul className="list-decimal">
              {data?.pdfs?.length ? (
                data?.pdfs.map((pdf: any) => (
                  <li key={pdf.server_url} className="flex items-center mb-2">
                    <div>
                      <a
                        href={
                          process.env.NEXT_PUBLIC_API_ONLY_BASE_URL +
                          "/" +
                          pdf.server_url
                        }
                        className="text-blue-500"
                      >
                        {pdf.original_filename}
                      </a>
                    </div>
                  </li>
                ))
              ) : (
                <p>No PDFs available</p>
              )}
            </ul>
          </>
        );
      },
    },

    // {
    //   title: "Created at",
    //   dataIndex: "createdAt",
    //   render: function (data: any) {
    //     return data && dayjs(data).format("MMM D, YYYY hh:mm A");
    //   },
    //   sorter: true,
    // },
    {
      title: "Student email",
      dataIndex: ["author", "email"],
      ellipsis: true,
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
                  <Menu.Item key="Rec">
                    <ModalComponent buttonText="Add marks">
                      <div className="w-fit flex justify-center items-center p-2 rounded-xl border mx-auto">
                        <Form
                          layout="vertical"
                          onFinish={(value) => {
                            onFinish(value, record._id);
                          }}
                        >
                          <Form.Item name="marks" label="Marks">
                            <InputNumber
                              min={0}
                              max={100}
                              style={{ width: "10rem" }}
                              placeholder="Enter marks"
                            />
                          </Form.Item>
                          <div className="flex justify-center items-center gap-2 ">
                            <Form.Item>
                              <Button
                                loading={false}
                                type="primary"
                                htmlType="submit"
                                className="w-full"
                              >
                                Submit
                              </Button>
                            </Form.Item>
                            <Form.Item>
                              <Button
                                loading={false}
                                type="primary"
                                htmlType="reset"
                                className="w-25"
                              >
                                Reset
                              </Button>
                            </Form.Item>
                          </div>
                        </Form>
                      </div>
                    </ModalComponent>
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
    //  //// console.log("Page:", page, "PageSize:", pageSize);
    setPage(page);
    setSize(pageSize);
  };
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    //// console.log(order, field);
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
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
      <HeadingUI>Submitted Assignment List</HeadingUI>
      <ActionBar>
        <div className="flex gap-2">
          <Input
            size="large"
            placeholder="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: "250px" }}
          />
        </div>
        <div>
          <Button
            type="default"
            style={{ marginRight: "5px" }}
            onClick={showDrawer}
          >
            Filter
          </Button>

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
}
