"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import UploadImage from "@/components/ui/UploadImage";
import { removeNullUndefinedAndFalsey } from "@/hooks/removeNullUndefinedAndFalsey";
import {
  useAddCourse_labelMutation,
  useGetAllCourse_labelQuery,
} from "@/redux/api/adminApi/courseLevelApi";
import { Error_model_hook, Success_model } from "@/utils/modalHook";
import { Button, Col, Row } from "antd";
import React, { useState } from "react";
import SelectStatusCategoryFIeld from "../Forms/GeneralField/SelectStatusCategoryFIeld";

const CreateCourse_label = () => {
  const [category, setCategoryValue] = useState();
  console.log("🚀 ~ category:", category)
  const query: Record<string, any> = {};
  query["limit"] = 1;

  query["sortBy"] = "serial_number";
  query["sortOrder"] = "desc";
  query["status"] = "active";
  query["category"] = category;

  const { data, isLoading: getLabelLoading } = useGetAllCourse_labelQuery(
    query,
    { skip: !Boolean(category) }
  );
  console.log("🚀 ~ data:", data);

  const [isReset, setIsReset] = useState(false);
  const [addCourse_label, { isLoading: serviceLoading }] =
    useAddCourse_labelMutation();

  const onSubmit = async (values: any) => {
    removeNullUndefinedAndFalsey(values);
    if (!category) {
      Error_model_hook("Category is required");
      return;
    }
    try {
      const res = await addCourse_label({ category, ...values }).unwrap();
      console.log(res);
      if (res?.success == false) {
        Error_model_hook(res?.message);
      } else {
        Success_model("Successfully added Course label");
        setIsReset(true);
      }
      // console.log(res);
    } catch (error: any) {
      Error_model_hook(error?.message);
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex justify-center ">
        {/* resolver={yupResolver(adminSchema)} */}
        {/* resolver={yupResolver(IServiceSchema)} */}
        <Form
          isReset={isReset}
          // defaultValues={{ serial_number:  data?.data?.length ? data?.data[0]?.serial_number + 1 :1 }}
          submitHandler={onSubmit}
        >
          <div
            style={{
              padding: "0.75rem",
              borderRadius: "0.75rem",
              width: "fit-content",
              backgroundColor: "white",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            }}
            className=" "
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
              Create Course label
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
                  // maxWidth: "30vw",
                  // margin: "0 auto",
                }}
              >
                <SelectStatusCategoryFIeld
                  required={true}
                  setCategoryValue={setCategoryValue}
                />
              </Col>
              <Col
                className="gutter-row"
                xs={24}
                md={24}
                lg={24}
                style={{
                  marginBottom: "20px",
                  // maxWidth: "30vw",
                  // margin: "0 auto",
                }}
              >
                <FormInput
                  type="text"
                  name="title"
                  size="large"
                  label="Course label Title"
                  required={true}
                />
              </Col>
              <Col
                className="gutter-row"
                xs={8}
                style={{
                  marginBottom: "20px",
                  // maxWidth: "30vw",
                  // margin: "0 auto",
                }}
              >
                <FormInput
                  type="number"
                  name="serial_number"
                  
                  size="large"
                  label={`Serial number-Last(${
                    data?.data?.length ? data?.data[0]?.serial_number :0
                  })`}
                />
              </Col>

              <Col
                className="gutter-row"
                xs={24}
                style={{
                  marginBottom: "10px",
                  marginTop: "10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div className="flex justify-center items-center">
                  <UploadImage name="img" />
                </div>
              </Col>
            </Row>

            <div className="flex justify-center items-center">
              <Button
                loading={serviceLoading || getLabelLoading}
                htmlType="submit"
                type="default"
              >
                Create label
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreateCourse_label;
