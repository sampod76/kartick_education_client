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
import { useEffect, useState } from "react";
import { useDebounced } from "@/redux/hooks";
import UMTable from "@/components/ui/UMTable";

import dayjs from "dayjs";
import UMModal from "@/components/ui/UMModal";
import { useDeleteServiceMutation } from "@/redux/api/serviceApi";
import Image from "next/image";
import {
  Error_model_hook,
  Success_model,
  confirm_modal,
} from "@/utils/modalHook";
import {
  useGetAllBookingQuery,
  useUpdateBookingMutation,
} from "@/redux/api/bookingApi";
import { USER_ROLE } from "@/constants/role";
import { ENUM_BOOKING_STATUS } from "../../../../constants/globalEnums";
import { IDecodedInfo, getUserInfo } from "@/services/auth.service";
import LoadingForDataFetch from "@/components/Utlis/LoadingForDataFetch";

const GeneralUserBooking = () => {
  //
  // const ROLE = USER_ROLE.STUDENT;
  const userInfo = getUserInfo() as IDecodedInfo
  //
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [user, setUserData] = useState<any>({});
  const [userLoading, setUserLoading] = useState<boolean>(true);

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  useEffect(() => {
    setUserData(getUserInfo() as any);
    setUserLoading(false);
    return () => { };
  }, []);

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }

  const { data = [], isLoading } = useGetAllBookingQuery(
    { ...query },
    {
      skip: !Boolean(user?._id),
    }
  );
  const [updateBooking, { isLoading: bookingUpdateLoading }] =
    useUpdateBookingMutation();

  //@ts-ignore
  const allBookingData = data?.data;
  console.log(
    "🚀 ~ file: page.tsx:51 ~ ServiceList ~ adminData:",
    allBookingData
  );
  //@ts-ignore
  const meta = data?.meta;

  const handleReject = (id: string) => {
    confirm_modal(`Are you sure you want to Reject`, "Yes reject it").then(
      async (res) => {
        if (res.isConfirmed) {
          try {
            const res = await updateBooking({
              id,
              body: { status: ENUM_BOOKING_STATUS.REJECT },
            }).unwrap();
            if (res?.success == false) {
              // message.success("Admin Successfully Deleted!");
              // setOpen(false);
              Error_model_hook(res?.message);
            } else {
              Success_model("Service Successfully Rejected!");
            }
          } catch (error: any) {
            Error_model_hook(error.message);
          }
        }
      }
    );
  };

  const columns = [
    {
      title: "",
      render: function (data: any) {
        return (
          <>
            {
              <Image
                src={data?.service?.image}
                width={80}
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
      // dataIndex: "service.title",
      render: function (data: any) {
        return <>{<p>{`${data?.service?.title} `}</p>}</>;
      },
      ellipsis: true,
    },

    {
      title: "Total Price",
      render: function (data: any) {
        return (
          <>
            {
              <p>
                {`(${data?.service?.price} x ${data?.bookingTickets}) =`}
                {Number(data?.service?.price) * Number(data?.bookingTickets)}
              </p>
            }
          </>
        );
      },
    },

    {
      title: "Booking Date",
      dataIndex: "bookingDate",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      // sorter: true,
    },
    {
      title: "Create At",
      dataIndex: "createdAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      // sorter: true,
    },
    {
      title: "Contact no.",
      dataIndex: "phoneNumber",
    },
    {
      title: "Category",
      //   dataIndex: "category",
      render: function (data: any) {
        return <>{data?.service?.category?.title}</>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Payment",
      dataIndex: "payment",
      render: function (data: any) {
        return <>{data ? <h1 className="text-base font-normal">Done</h1> : <h1 className="text-base font-normal">Not payment</h1>}</>;
      },
    },
    {
      title: "Action",
      dataIndex: "_id",

      render: (_id: any) => (
        <Space size="middle">
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item
                  key="view"
                  onClick={() => {
                    // Handle view logic here
                  }}
                >
                  <Link href={`/${userInfo?.role}/booking/details/${_id}`}>View</Link>
                </Menu.Item>
                <Menu.Item
                  key="edit"
                  onClick={() => {
                    // Handle edit logic here
                  }}
                >
                  <Link href={`/${userInfo?.role}/booking/edit/${_id}`}>Edit</Link>
                </Menu.Item>

                <Menu.Item
                  key="reject"
                  onClick={() => {
                    handleReject(_id);
                  }}
                >
                  Cancel
                </Menu.Item>
              </Menu>
            }
          >
            <button className="text-blue-700">Action</button>
          </Dropdown>
        </Space>
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

  if (isLoading || userLoading) {
    return <LoadingForDataFetch />;
  }

  return (
    <div>
      {/* <UMBreadCrumb
        items={[
          {
            label: "${userInfo?.role}",
            link: "/${userInfo?.role}",
          },
        ]}
      /> */}
      <ActionBar title="Booking List">
        <Input
          size="large"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "20%",
          }}
        />
        <div>
          {/* <Link href={`/${userInfo?.role}/service/create`}>
            <Button type="primary">Create service</Button>
          </Link> */}
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
        dataSource={allBookingData}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />

      {/* <UMModal
        title="Remove admin"
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => deleteAdminHandler(adminId)}
      >
        <p className="my-5">Do you want to remove this admin?</p>
      </UMModal> */}
    </div>
  );
};

export default GeneralUserBooking;
