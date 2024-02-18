'use client';
import React, { useEffect, useState } from 'react'
import UserAvatarUI from '../ui/NavUI/UserAvatarUI'
import { IDecodedInfo, getUserInfo } from '@/services/auth.service';
import { Row, Space, Spin } from 'antd';
import Image from 'next/image';
import { AllImage } from '@/assets/AllImge';

export default function Checkout() {
    const userInfo = getUserInfo() as IDecodedInfo;
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [collapsed, setCollapsed] = useState(false);


    useEffect(() => {
        // if (!userInfo?.role) {
        //     router.push(`/login`);
        // }
        setIsLoading(false);
    }, [isLoading, userInfo?.role]);

    if (isLoading) {
        return (
            <Row
                justify="center"
                align="middle"
                style={{
                    height: "100vh",
                }}
            >
                <Space>
                    <Spin size="large"></Spin>
                </Space>
            </Row>
        );
    }
    return (
        <div className='min-h-screen'>

            <div className="w-full lg:w-[86%] mx-auto my-9 flex items-center gap-3 text-lg">
                <UserAvatarUI />
                <h5>Logged in as {userInfo?.email} </h5>
            </div>
            <div className="container mx-auto">
                <h1 className='text-lg md:text-xl lg:text-2xl '>Your Order</h1>
                <div className=" mt-8">
                    <table className="w-full border">
                        <thead>
                            <tr className="bg-gray-200 ">
                                <th className="py-5 px-4 border flex items-center gap-5  ">
                                    <Image
                                        src={AllImage.notFoundImage}
                                        style={{ height: "64px", width: "80px" }}
                                        width={150}
                                        height={150}
                                        alt="course"
                                    />
                                    <h1 className='text-lg md:text-xl lg:text-2xl '>Math</h1>
                                </th>
                                <th className="py-5 px-4 border">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border">
                                <td className="py-5 px-4 border text-[#797979]">Sub Total</td>
                                <td className="py-5 px-4 border">$10.00</td>
                            </tr>
                            <tr className="bg-gray-100 border">
                                <td className="py-5 px-4 border text-[#797979]">Total</td>
                                <td className="py-5 px-4 border">$15.00</td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mt-5 container mx-auto">
                <h2 className='my-3'>Additional Note </h2>
                <textarea className='w-full min-h-[7rem] border border-gray-700' />

                <h2 className='text-xl font-bold uppercase my-3'>PAYMENT</h2>
            </div>
        </div>
    )
}
