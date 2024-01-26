import { useGetSinglePurchasePackageQuery } from '@/redux/api/public/paymentApi';
import { IPackageCategory } from '@/types/packageType';
import { Checkbox, Radio, Spin } from 'antd';
import React from 'react'

export default function PurchasePackageAdminDetails({ params }: { params: { id: string } }) {

    // const packages: any = {}

    const { data: packages, isLoading } = useGetSinglePurchasePackageQuery(params?.id)

    if (isLoading) {
        return <div>
            <Spin tip="loading package" />
        </div>

    }
    return (
        <div> <div

            className="shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] rounded-md overflow-hidden transition-all duration-500 hover:scale-105 relative bg-blue-200 min-h-full  lg:min-h-[30rem] "
        >
            <span
                className={`px-2 py-1 text-[16px] font-semibold  rounded-md ml-3 absolute -left-4 top-0
                  bg-white text-black
                  `}
            >
                {packages?.purchase?.label}
            </span>
            <div
                className={`h-28 bg-gray-700 text-center p-4`}
            >
                <h3 className="text-2xl text-white uppercase font-semibold mb-1">
                    {packages?.title}
                </h3>
                {/* <p className="text-xs text-white">{plan}</p> */}
            </div>
            <div
                className={`h-24 w-24 mx-auto -mt-8 shadow-xl rounded-full $bg-gray-700 text-white border-4 flex flex-col items-center justify-center border-white`}
            >
                <h3 className="text-2xl font-semibold">
                    {/* ${totalPackagePrice} */}
                    220000
                </h3>
            </div>
            <div className="px-6 py-4 mt-4 h-max ">
                <ul className="space-y-4">
                    {/* //! for bundle type */}
                    {packages?.type === "bundle" &&
                        packages?.categories?.map(
                            (categoryData: IPackageCategory) => {
                                const category = categoryData?.category;
                                // console.log(category);
                                return (
                                    <li
                                        className="flex items-center text-sm text-gray-500"
                                        key={category?._id}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="17"
                                            className="mr-4 bg-green-500 fill-white rounded-full p-[3px]"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                                                data-original="#000000"
                                            />
                                        </svg>
                                        <span className="text-[16px]">
                                            {" "}
                                            {category?.title}
                                        </span>
                                        {/* <span>{category?.title}</span> */}
                                        <span className="text-[12px] text-slate-600 ml-2">
                                            {categoryData?.label}
                                        </span>
                                    </li>
                                );
                            }
                        )}
                    {packages?.type === "select" && (
                        <div className="">
                            <Radio.Group
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "1rem",
                                }}
                            // onChange={(e) => {
                            //   setSingleSelect(e.target.value);
                            // }}
                            >
                                {packages?.categories?.map(
                                    (option?: IPackageCategory) => (
                                        <Radio
                                            key={option?.category?.title}
                                            value={option?.category?._id}

                                            style={{
                                                display: "flex",
                                                paddingTop: "0.5rem",
                                                paddingBottom: "0.5rem",
                                                paddingLeft: "1.25rem",
                                                paddingRight: "1.25rem",
                                                gap: "0.5rem",
                                                alignItems: "center",
                                            }}
                                        >
                                            <span className="text-[16px]">
                                                {" "}
                                                {option?.category?.title}
                                            </span>
                                            {/* <span>{category?.title}</span> */}
                                            <span className="text-[12px] text-slate-600 ml-2">
                                                {option?.label}
                                            </span>
                                        </Radio>
                                    )
                                )}
                            </Radio.Group>
                        </div>
                    )}

                    {/* for multiple select */}
                    {packages?.type === "multiple_select" && (
                        <div>
                            <Checkbox.Group
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "1rem",
                                }}
                            // onChange={(value: any) => setMultipleSelect(value)}
                            >
                                {packages?.categories?.map(
                                    (option?: IPackageCategory) => (
                                        <Checkbox
                                            key={option?.category?.title}
                                            value={option}
                                            style={{
                                                display: "flex",
                                                paddingTop: "0.5rem",
                                                paddingBottom: "0.5rem",
                                                paddingLeft: "1.25rem",
                                                paddingRight: "1.25rem",
                                                gap: "0.5rem",
                                                alignItems: "center",
                                            }}
                                        >
                                            <span className="text-[16px]">
                                                {" "}
                                                {option?.category?.title}
                                            </span>
                                            {/* <span>{category?.title}</span> */}
                                            <span className="text-[12px] text-slate-600 ml-2">
                                                {option?.label}
                                            </span>
                                        </Checkbox>
                                    )
                                )}
                            </Checkbox.Group>
                        </div>
                    )}
                </ul>

            </div>
        </div></div>
    )
}
