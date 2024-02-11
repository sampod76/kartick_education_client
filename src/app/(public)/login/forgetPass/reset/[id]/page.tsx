import { Error_model_hook, Success_model } from '@/utils/modalHook';
import { Button, Form, Input } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'

export default function ResetPasswordPage({ params }: { params: { id: string } }) {


    // ! user id
    const id = params?.id;

    const searchParams = useSearchParams()
    // ! user token
    const token = searchParams?.get("token")

    const router = useRouter();
    const [form] = Form.useForm();



    const onFinish = async (values: any) => {
        console.log("Received values of form:", values);
        const passwordData = {
            oldPassword: values.oldPassword,
            newPassword: values.newPassword,
        };
        // console.log("🚀 ~ onFinish ~ passwordData:", packageData)

        try {
            // const res = await resetPassword(passwordData).unwrap();
            // // console.log(res);
            // if (res?.success == false) {
            //     Error_model_hook(res?.message);
            // } else {
            //     Success_model("Updated your password");
            //     form.resetFields();
            //     router.push('/dashboard')
            // }
            // console.log(res);
        } catch (error: any) {
            Error_model_hook(error?.message);
            console.log(error);
        }
    };

    return (
        <div>
            <h1 className="text-center text-2xl font-bold mb-6">
                Reset Password
            </h1>
            <Form onFinish={onFinish} form={form}>
                <div className="mb-4">
                    <h2 className="block text-gray-700 font-bold mb-2">
                        Email Address
                    </h2>
                    <Form.Item name="oldPassword" >

                        <Input.Password
                            name="oldPassword"
                            type="password"
                            className=""
                            id="oldPassword"
                            placeholder="Enter your Old Password address"
                            style={{
                                paddingTop: "0.5rem",
                                paddingBottom: "0.5rem",
                                paddingLeft: "0.75rem",
                                paddingRight: "0.75rem",
                                borderRadius: "0.25rem",
                                borderWidth: "1px",
                                width: "100%",
                                lineHeight: 1.25,
                                color: "#374151",
                                appearance: "none",
                            }}
                        />
                    </Form.Item>
                    <Form.Item name="newPassword" >

                        <Input.Password
                            name="newPassword"
                            type="password"
                            className=""
                            id="newPassword"
                            placeholder="Enter your new Password address"
                            style={{
                                paddingTop: "0.5rem",
                                paddingBottom: "0.5rem",
                                paddingLeft: "0.75rem",
                                paddingRight: "0.75rem",
                                borderRadius: "0.25rem",
                                borderWidth: "1px",
                                width: "100%",
                                lineHeight: 1.25,
                                color: "#374151",
                                appearance: "none",
                            }}
                        />
                    </Form.Item>

                </div>
                <Button
                    style={{ "padding": "", "borderRadius": "9999px", "width": "100%", "fontSize": "0.875rem", "lineHeight": "1.25rem", "fontWeight": 600, "color": "#ffffff", "backgroundColor": "#2563EB", height: "2.5rem" }}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                    htmlType="submit"
                >
                    Reset Password
                </Button>
            </Form></div>
    )
}
