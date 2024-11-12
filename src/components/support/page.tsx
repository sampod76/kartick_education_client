"use client";

import FormInput from "@/components/Forms/FormInput";

import UploadImage from "@/components/ui/UploadImage";
import { ENUM_STATUS } from "@/constants/globalEnums";
import { removeNullUndefinedAndFalsey } from "@/hooks/removeNullUndefinedAndFalsey";
import { useAddCategoryMutation } from "@/redux/api/adminApi/categoryApi";
import { Error_model_hook, Success_model } from "@/utils/modalHook";

import { Button, Col, Row, Select, message, Input, Form } from "antd";
import React, { useState } from "react";
import { useGlobalContext } from "../ContextApi/GlobalContextApi";
import { useAddSupportMutation } from "@/redux/api/adminApi/contactApi";

const { TextArea } = Input;

const SupportPage = () => {
  const { userInfo } = useGlobalContext();
  const [addSupport, { isLoading }] = useAddSupportMutation();
  const [form] = Form.useForm();
  const onFinish = async (values: any) => {
    // console.log("🚀 ~ onFinish ~ values:", values);
    try {
      const res = await addSupport({ ...values }).unwrap();
      // console.log(res);
      if (res?.success == false) {
        Error_model_hook(res?.message);
      } else {
        Success_model("Successfully submit query");
        form.resetFields();
      }
      // console.log(res);
    } catch (error: any) {
      Error_model_hook(error?.message);
      console.log(error);
    }
  };

  return (
    <div>
      <div className=" p-5 rounded-3xl border border-gray-200 shadow-lg  mt-4">
        <h1 className="text-center text-3xl">Support</h1>
        {/* resolver={yupResolver(adminSchema)} */}
        {/* resolver={yupResolver(IServiceSchema)} */}
        <Form onFinish={onFinish} form={form} layout="vertical">
          <Form.Item name="name" label="Your name">
            <Input
              size="large"
              placeholder="Please Your name"
              className="w-full lg:w-96"
            />
          </Form.Item>
          <Form.Item name="subject" label="Subject">
            <Input size="large" placeholder="Please enter Subject" />
          </Form.Item>
          <Form.Item label="Description" name={"message"}>
            <TextArea
              // rows={12}
              size="large"
              maxLength={5000}
              autoSize={{ minRows: 16, maxRows: 80 }}
              spellCheck
            />
          </Form.Item>
          <div className="flex justify-center items-center">
            <Button loading={isLoading} type="default" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SupportPage;
