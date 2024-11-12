"use client";
import ActionBar from "@/components/ui/ActionBar";
import HeadingUI from "@/components/ui/dashboardUI/HeadingUI";
import UMTable from "@/components/ui/UMTable";
import { USER_ROLE } from "@/constants/role";
import { useGetAllSubmitAssignmentQuery } from "@/redux/api/assernmentSubmitApi";
import { useDebounced } from "@/redux/hooks";
import { ReloadOutlined } from "@ant-design/icons";
import { Button, Input, Tag } from "antd";
import { useState } from "react";
import { useGlobalContext } from "../ContextApi/GlobalContextApi";

export default function AssignmentSubmissionStudent() {
  const { userInfo, userInfoLoading } = useGlobalContext();

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

  //@ts-ignore
  const QuizData = data?.data;

  //@ts-ignore
  const meta = data?.meta;

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
      render: (record: any) => <></>,
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
    </div>
  );
}
