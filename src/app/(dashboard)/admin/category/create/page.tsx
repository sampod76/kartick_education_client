"use client";

import Form from "@/components/Forms/Form";

import FormInput from "@/components/Forms/FormInput";

import UploadImage from "@/components/ui/UploadImage";

import uploadImgCloudinary from "@/hooks/UploadSIngleCloudinary";

import { useAddCategoryMutation } from "@/redux/api/adminApi/categoryApi";
import { Error_model_hook, Success_model } from "@/utils/modalHook";

import { Button, Col, Row, Select, message } from "antd";
import React, { useState } from "react";

const CreateCategory = () => {
  const [addCategory, { isLoading: serviceLoading }] = useAddCategoryMutation();

  const onSubmit = async (values: any) => {
    // console.log(values);
    const status = "active";
    // const imgUrl = await uploadImgCloudinary(values.img);
    // console.log("🚀 ~ file: page.tsx:33 ~ onSubmit ~ imgUrl:", imgUrl)

    const categoryData: {
      title: string;
      img?: string | null;
      status: string;
    } = {
      title: values.title,
      img: values.img,
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
            style={{
              padding: "0.75rem",
              borderRadius: "0.75rem",
              width: "fit-content",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            }}
            // className="w-fit p-3 rounded-xl mx-auto shadow-2xl"
          >
            <h1
              style={{
                fontSize: "1.125rem",
                lineHeight: "1.75rem",
                fontWeight: 600,
                textAlign: "center",
              }}
              className="text-center text-lg font-semibold"
            >
              Create category
            </h1>
            <hr
              style={{
                marginTop: "0.25rem",
                marginBottom: "0.25rem",
                borderWidth: "1px",
              }} /* className="border my-1" */
            />
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
