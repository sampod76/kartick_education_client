"use client";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormMultiSelectField from "@/components/Forms/FormMultiSelectField";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import FormTimePicker from "@/components/Forms/FormTimePicker";
import UploadImage from "@/components/ui/UploadImage";

import { useAddCategoryMutation, useGetAllCategoryQuery } from "@/redux/api/categoryApi";

import { IServiceSchema } from "@/schemas/service";
import { Error_model_hook, Success_model } from "@/utils/modalHook";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row, Select, message } from "antd";
import React, { useState } from "react";

const CreateCategory = () => {
  const [addCategory, { isLoading: serviceLoading }] =
    useAddCategoryMutation();
  const onSubmit = async (values: any) => {
    console.log(values);
   
    try {
      const res = await addCategory(values).unwrap();
      if(res.success == false) {
        Error_model_hook(res?.message)
      }else{
        Success_model("Successfully added Category")
      }
      console.log(res);
    } catch (error: any) {
      Error_model_hook(error?.message);
      console.log(error);
    }
  };

  if(serviceLoading){
    return message.loading("Loading...")
  }

  return (
    <div>
      <div>
        {/* resolver={yupResolver(adminSchema)} */}
        {/* resolver={yupResolver(IServiceSchema)} */}
        <Form submitHandler={onSubmit} >
          <div
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
              padding: "15px",
              marginBottom: "10px",
            }}
          >
            <p
              style={{
                fontSize: "18px",
                marginBottom: "10px",
              }}
            >
              Create category
            </p>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col
                className="gutter-row"
                 xs={24} md={12} lg={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="title"
                  size="large"
                  label="Category Name"
                  required={true}
                />
              </Col>
              <Col
                className="gutter-row"
                 xs={24} md={12} lg={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <UploadImage name="image" />
              </Col>
            
            </Row>
          </div>

          <Button htmlType="submit" type="primary">
            Create
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CreateCategory;
