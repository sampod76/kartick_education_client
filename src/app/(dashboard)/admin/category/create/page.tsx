"use client";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormMultiSelectField from "@/components/Forms/FormMultiSelectField";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import FormTimePicker from "@/components/Forms/FormTimePicker";
import UploadImage from "@/components/ui/UploadImage";
import HeadingUI from "@/components/ui/dashboardUI/HeadingUI";
import uploadImgBB from "@/hooks/imgbbUploads";

import {
  useAddCategoryMutation,
  useGetAllCategoryQuery,
} from "@/redux/api/adminApi/categoryApi";

import { IServiceSchema } from "@/schemas/service";
import { Error_model_hook, Success_model } from "@/utils/modalHook";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row, Select, message } from "antd";
import React, { useState } from "react";

const CreateCategory = () => {
  const [addCategory, { isLoading: serviceLoading }] = useAddCategoryMutation();

  const onSubmit = async (values: any) => {
    // console.log(values);
    const status = "active";
    const imgUrl = await uploadImgBB(values.img);

    const categoryData: { title: string; img: string; status: string } = {
      title: values.title,
      img: imgUrl,
      status: status,
    };
    // console.log(categoryData);

    try {
      const res = await addCategory(categoryData).unwrap();
      // console.log(res);
      if (res.success == false) {
        Error_model_hook(res?.message);
      } else {
        Success_model("Successfully added Category");
      }
      // console.log(res);
    } catch (error: any) {
      Error_model_hook(error?.message);
      console.log(error);
    }
  };

  if (serviceLoading) {
    return message.loading("Loading...");
  }

  return (
    <div>
      <div>
        {/* resolver={yupResolver(adminSchema)} */}
        {/* resolver={yupResolver(IServiceSchema)} */}
        <Form submitHandler={onSubmit}>
          <div
            // style={{
            //   border: "1px solid #d9d9d9",
            //   borderRadius: "5px",
            //   padding: "15px",
            //   marginBottom: "10px",
            // }}
            className="w-fit p-3 rounded-xl mx-auto shadow-2xl"
          >
            <h1 className="text-center text-lg font-semibold">Create category</h1>
            <hr className="border my-1"/>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col
                className="gutter-row"
                xs={24}
                md={24}
                lg={24}
                style={{
                  marginBottom: "20px",
                  maxWidth: "30vw",
                  margin: "0 auto",
                }}
              >
                <FormInput
                  type="text"
                  name="title"
                  size="large"
                  label="Category Title"
                  required={true}
                />
              </Col>
              <Col
                className="gutter-row"
                xs={24}
                md={24}
                lg={24}
                style={{
                  marginBottom: "10px",
                  marginTop: "10px",
                }}
              >
                <UploadImage name="img" />
              </Col>
            </Row>

            <Button htmlType="submit" type="default">
              Create Category
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreateCategory;
