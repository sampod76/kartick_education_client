"use client";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormMultiSelectField from "@/components/Forms/FormMultiSelectField";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import FormTimePicker from "@/components/Forms/FormTimePicker";
import UploadImage from "@/components/ui/UploadImage";
import { NO_IMAGE } from "@/constants/filePatch";
import { removeNullUndefinedAndFalsey } from "@/hooks/removeNullUndefinedAndFalsey";
import {
  useAddBlogMutation,
  useGetAllBlogQuery,
  useGetSingleBlogQuery,
  useUpdateBlogMutation,
} from "@/redux/api/blogApi";

import { Error_model_hook, Success_model } from "@/utils/modalHook";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row, Select, message } from "antd";
import Image from "next/image";
import React, { useState } from "react";

const EditBlog = ({params}:{params:any}) => {
  const [isReset, setIsReset] = useState(false);
  const {data={},isLoading}=useGetSingleBlogQuery(params.id,{
    skip:!Boolean(params.id)
  })
  const [updateBlog, { isLoading: blogLoading }] = useUpdateBlogMutation();
  const onSubmit = async (values: any) => {
    removeNullUndefinedAndFalsey(values);

    try {
      const res = await updateBlog({id:params.id,body:values}).unwrap();
      if (res?.success == false) {
        Error_model_hook(res?.message);
      } else {
        Success_model("Successfully added Blog");
        setIsReset(true);
      }
      
    } catch (error: any) {
      Error_model_hook(error?.message);
      console.log(error);
    }
  };

  if (blogLoading || isLoading) {
    return message.loading("Loading...");
  }

  const defaultValues = {
    image:data?.image || NO_IMAGE,
    title:data?.title ||"",
    content:data?.content || "",

  };

  return (
    <div>
      <div>
        {/* resolver={yupResolver(adminSchema)} */}
        {/* resolver={yupResolver(IServiceSchema)} */}
        <Form  isReset={isReset}
            submitHandler={onSubmit} defaultValues={defaultValues}>
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
              Blog Information
            </p>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col
                className="gutter-row"
                xs={24}
                md={12}
                lg={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="title"
                  size="large"
                  label="Blog Title"
                  required={true}
                />
              </Col>

              <Col
                className="gutter-row"
                xs={24}
               
                style={{
                  marginBottom: "10px",
                }}
              >
                <UploadImage name="image" />
              </Col>
              <Col
                className="gutter-row"
                xs={24}
                md={12}
                lg={8}
                style={{
                  marginBottom: "10px",
                }}
              >

                <Image src={defaultValues?.image} width={300} height={300} alt="dd"/>
              </Col>
              <Col span={24} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="content"
                  label="Blog descricontentption"
                  rows={10}
                />
              </Col>

              {/* <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea name="address" label="Address" rows={4} />
              </Col> */}
            </Row>
          </div>

          <Button htmlType="submit"   type="default">
            Update
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default EditBlog;
