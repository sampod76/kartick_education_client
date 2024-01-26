"use client";

import { useGetSinglePurchasePackageQuery } from '@/redux/api/public/purchaseAPi';
import { IPackageCategory } from '@/types/packageType';
import { Checkbox, Radio, Spin } from 'antd';
import React from 'react'
export default function DetailsPurchasePackage({ purchaseId }: { purchaseId: string }) {

    const { data: packages, isLoading } = useGetSinglePurchasePackageQuery(purchaseId)



    if (isLoading) {
        return <div className='text-center min-h-screen'>
            <Spin tip="loading package" size='large' />
        </div>

    }

    console.log(packages, 'packages')
    return (
        <div>
            <div
                className="shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] rounded-md overflow-hidden transition-all duration-500 hover:scale-105 relative bg-blue-200 min-h-full  lg:min-h-[30rem] max-w-2xl mx-auto"
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
                        $ {packages?.purchase?.price}
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
                                                    Category  {option?.category?.title}
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
                                // disabled

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
                                                    {option?.category?.title}asd
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
                <div className="text-center flex justify-between px-3">
                    <h2 className="text-center">Purchase  </h2>
                    <div className="flex text-lg text-center gap-3 justify-center">
                        <h4>{packages?.purchase?.label}/ {packages?.purchase?.price}</h4>
                        <span className='text-gray-600 text-sm'>Increment {packages?.purchase?.each_student_increment}</span>
                    </div>
                </div>
                <div className="">

                    <h2 className="text-center">Payment History </h2>

                    <div className="flex justify-between max-w-[80%] mx-auto text-gray-600 py-3">
                        <h2>Platform : <span className='text-sm text-black'>{packages?.payment?.platform}</span></h2>
                        <h2 className='text-sm text-start '>Payment Status {packages?.paymentStatus === "approved" ? <button className="text-sm p-1 rounded-sm text-black bg-green-400">Approved</button> : <button className="text-sm p-1 rounded-sm text-black bg-red-400">Pending</button>}</h2>

                    </div>
                    <h5 className='text-center '> TransactionId: {packages?.payment?.transactionId}</h5>


                </div>

            </div>


        </div>
    )
}
