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

    ReloadOutlined,

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

import HeadingUI from "@/components/ui/dashboardUI/HeadingUI";
import FilterCourse from "@/components/dashboard/Filter/FilterCourse";
import { AllImage } from "@/assets/AllImge";
import { useGetAllCategoryChildrenQuery } from "@/redux/api/categoryChildrenApi";

import { IDecodedInfo, getUserInfo } from "@/services/auth.service";

import SelectCategoryChildren from "@/components/Forms/GeneralField/SelectCategoryChildren";
import { useGetAllPurchaseCourseQuery, useGetAllPurchasePackageQuery } from "@/redux/api/public/purchaseAPi";
// import { useGetPurchasePackageQuery } from "@/redux/api/public/paymentApi";
export default function PurchaseCourseList() {
    //
    const [openDrawer, setOpenDrawer] = useState(false);
    const [placement, setPlacement] = useState<DrawerProps["placement"]>("right");
    //
    //----------------------------------------------------------------
    const [category, setCategory] = useState<{ _id?: string; title?: string }>(
        {}
    );
    const [course, setCourse] = useState<{ _id?: string; title?: string }>({});

    const queryCategory: Record<string, any> = {};
    queryCategory["children"] = "course";
    //! for Category options selection
    const { data: Category, isLoading: categoryLoading } =
        useGetAllCategoryChildrenQuery({
            ...queryCategory,
        });
    const categoryData: any = Category?.data;
    //----------------------------------------------------------------

    const query: Record<string, any> = {};

    // const SUPER_ADMIN=USER_ROLE.ADMIN
    const userInfo = getUserInfo() as IDecodedInfo

    //   const [deletePurchasePackage] = useDeletePackageMutation();

    const [page, setPage] = useState<number>(1);
    const [size, setSize] = useState<number>(10);
    const [sortBy, setSortBy] = useState<string>("");
    const [sortOrder, setSortOrder] = useState<string>("");
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);
    const [purchaseId, setpurchaseId] = useState<string>("");
    const [filterValue, setFilterValue] = useState("");

    query["limit"] = size;
    query["page"] = page;
    query["sortBy"] = sortBy;
    query["sortOrder"] = sortOrder;
    query["status"] = "active";
    //
    query["category"] = category?._id;

    //
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
    const { data = [], isLoading } = useGetAllPurchaseCourseQuery({ ...query });
    // console.log("🚀 ~ file: page.tsx:68 ~ MileStoneList ~ data:", data);

    //@ts-ignore
    const packageData = data?.data || [];

    //@ts-ignore
    const meta = data?.meta;

    const handleDelete = (id: string) => {
        confirm_modal(`Are you sure you want to delete`).then(async (res) => {
            if (res.isConfirmed) {
                // try {
                //   console.log(id);

                //   const res = await deletePurchasePackage(id).unwrap();

                //   console.log(res, "response for delete Package");
                //   if (res?.success == false) {
                //     // message.success("Admin Successfully Deleted!");
                //     // setOpen(false);
                //     Error_model_hook(res?.message);
                //   } else {
                //     Success_model("Package Successfully Deleted");
                //   }
                // } catch (error: any) {
                //   message.error(error.message);
                // }
            }
        });
    };

    const columns = [
        {
            title: "Image",
            dataIndex: 'course',
            render: function (data: any) {
                return (
                    <>
                        {
                            <Image
                                src={
                                    data?.img?.length ? data?.img : AllImage.notFoundImage
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
            dataIndex: ['course', "title"],
            ellipsis: true,
            // width: 90,
        },
        {
            title: "Price Type",
            dataIndex: ['course', "price_type"],
            //   ellipsis: true,
            width: 130,
        },

        {
            title: "Payment",
            dataIndex: ['payment', 'platform'],
            ellipsis: true,
            width: 100,
        },
        {
            title: "Purchased",
            dataIndex: 'purchase',
            // ellipsis: true,
            width: 108,
            render: function (data: any) {
                return `${data?.label}`
            }

        }
        ,
        {
            title: "Price",
            dataIndex: ['course', "price"],
            // ellipsis: true,
            width: 100,
            render: function (data: any) {
                return `$ ${data?.price}`
            }

        }

        ,
        {
            title: "PaymentStatus",
            dataIndex: 'paymentStatus',
            // ellipsis: true,
            width: 100, render: function (data: 'approved' | 'pending' | 'reject') {
                return (
                    <>
                        {data === "approved" ? (
                            <button className="text-sm p-1 rounded-sm text-white bg-green-800">Approved</button>
                        ) : data === 'pending' ? (
                            <button className="text-sm p-1 rounded-sm text-white bg-red-800">Pending</button>
                        ) : (
                            <button className="text-sm p-1 rounded-sm text-white bg-red-800">Rejected</button>
                        )}
                    </>
                );
            }


        }
        ,

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
            fixed: "right",
            render: (record: any) => (
                // console.log(object);
                <>
                    <Space size="middle">
                        <Dropdown
                            overlay={
                                <Menu>
                                    <Menu.Item key="view">
                                        <Link href={`/${userInfo?.role}/purchase-course/details/${record._id}`}>
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
                            <a>Action</a>
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

    const deleteAdminHandler = async (id: string) => {
        // console.log(id);
        // try {
        //   const res = await deletePurchasePackage(id);
        //   if (res) {
        //     message.success("Package Successfully Deleted!");
        //     setOpen(false);
        //   }
        // } catch (error: any) {
        //   message.error(error.message);
        // }
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
            <UMBreadCrumb
                items={[
                    {
                        label: `${userInfo?.role}`,
                        link: `/${userInfo?.role}`,
                    },
                    {
                        label: `Purchase Course`,
                        link: `/${userInfo?.role}/purchase-course`,
                    },
                ]}
            />
            <HeadingUI>Purchased Package List</HeadingUI>
            <ActionBar>
                <div className="block lg:flex gap-5">
                    <Input
                        size="large"
                        placeholder="Search"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            width: "50%",
                        }}
                    />
                    <FilterCourse
                        filterValue={filterValue}
                        setFilterValue={setFilterValue}
                    />
                </div>
                <div className="block lg:flex gap-5">
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
                dataSource={packageData}
                pageSize={size}
                totalPages={meta?.total}
                showSizeChanger={true}
                onPaginationChange={onPaginationChange}
                onTableChange={onTableChange}
                showPagination={true}
            />
            <UMModal
                title="Remove Package"
                isOpen={open}
                closeModal={() => setOpen(false)}
                handleOk={() => deleteAdminHandler(purchaseId)}
            >
                <p className="my-5">Do you want to remove this package?</p>
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
            </Drawer>
            ;
        </div>
    );
}
