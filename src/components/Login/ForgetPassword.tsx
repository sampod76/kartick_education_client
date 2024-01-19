"use client";
import { useForgetPasswordMutation } from "@/redux/api/auth/authApi";
import { Error_model_hook, Success_model } from "@/utils/modalHook";
import { Button, Form, Input, Modal } from "antd";
import { useRouter } from "next/navigation";

import React, { useState } from "react";

export default function ForgetPassword() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [modalOpen, setModalOpen] = useState(false);
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();

  const onFinish = async (values: any) => {
    console.log("Received values of form:", values);
    const passwordData = {
      email: values.email,
    };
    // console.log("🚀 ~ onFinish ~ passwordData:", packageData)

    try {
      const res = await forgetPassword(passwordData).unwrap();
      // console.log(res);
      if (res?.success == false) {
        Error_model_hook(res?.message);
      } else {
        Success_model("Please check your email address");
        form.resetFields();
        // router.push('/')
        setModalOpen(false)

      }
      // console.log(res);
    } catch (error: any) {
      Error_model_hook(error?.message);
      console.log(error);
    }
  };
  return (
    <div>
      {" "}
      <div className="flex items-center justify-between gap-2 mt-6">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label className="ml-3 block text-sm">Remember me</label>
        </div>
        <div>
          <button
            onClick={() => setModalOpen(true)}
            className="text-blue-600 text-sm hover:underline"
          >
            Forgot Password?
          </button>
        </div>
      </div>
      <Modal
        title="Forget Password"
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
      >
        <div className=" flex items-center justify-center">
          <div className="bg-white rounded px-8 pt-6 pb-8 mb-4 max-w-md w-full">
            <h1 className="text-center text-2xl font-bold mb-6">
              Forgot Password
            </h1>
            <Form onFinish={onFinish} form={form}>
              <div className="mb-4">
                <h2 className="block text-gray-700 font-bold mb-2">
                  Email Address
                </h2>
                <Form.Item name="email" >

                  <Input
                    name="email"
                    type="email"
                    className=""
                    id="email"
                    placeholder="Enter your email address"
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
            </Form>
          </div>
        </div>
      </Modal>
    </div>
  );
}
