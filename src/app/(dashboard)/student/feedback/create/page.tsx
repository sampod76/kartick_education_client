"use client";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormMultiSelectField from "@/components/Forms/FormMultiSelectField";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import FormTimePicker from "@/components/Forms/FormTimePicker";
import UploadImage from "@/components/ui/UploadImage";
import { removeNullUndefinedAndFalsey } from "@/hooks/removeNullUndefinedAndFalsey";

import { useGetAllCategoryQuery } from "@/redux/api/adminApi/categoryApi";
import { useAddServiceWithFormDataMutation } from "@/redux/api/serviceApi";
import { IServiceSchema } from "@/schemas/service";
import { Error_model_hook, Success_model } from "@/utils/modalHook";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row, Select, message } from "antd";
import React, { useState } from "react";

const CreateStudentFeedback = () => {
  const [addService, { isLoading: serviceLoading }] =
    useAddServiceWithFormDataMutation();
    const [isReset, setIsReset] = useState(false);
  const { data = [], isLoading } = useGetAllCategoryQuery({});
  const onSubmit = async (values: any) => {
    console.log(values);
    removeNullUndefinedAndFalsey(values);
    try {
      const res = await addService(values).unwrap();
      if (res?.success == false) {
        Error_model_hook(res?.message);
      } else {
        Success_model("Successfully added feedback");
        setIsReset(true)
      }
      console.log(res);
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
        <Form submitHandler={onSubmit} isReset={isReset}>
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
              Service Information
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
                  label="Service Name"
                  required={true}
                />
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
                <FormInput
                  type="number"
                  name="price"
                  size="large"
                  label="Per Ticket Price"
                  required={true}
                />
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
                <FormInput
                  type="text"
                  name="contact"
                  size="large"
                  label="Bus Driver Number"
                  required={true}
                />
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
                <Row gutter={[16, 16]}>
                  <Col
                    className="gutter-row"
                    span={12}
                    style={{
                      marginBottom: "10px",
                    }}
                  >
                    <FormDatePicker name="serviceDate" label="Date" />
                  </Col>
                  <Col
                    className="gutter-row"
                    span={12}
                    style={{
                      marginBottom: "10px",
                    }}
                  >
                    <FormInput
                      type="number"
                      name="availableTickets"
                      size="large"
                      label="Available Tickets"
                      required={true}
                    />
                  </Col>
                </Row>
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
                <Row gutter={[16, 16]}>
                  <Col
                    className="gutter-row"
                    xs={24}
                    md={12}
                    style={{
                      marginBottom: "10px",
                    }}
                  >
                    <FormSelectField
                      name="category"
                      label="Select Category"
                      required={true}
                      options={
                        //@ts-ignore
                        data?.data?.map((e) => ({
                          value: e._id,
                          label: e.title,
                        }))
                      }
                    />
                  </Col>
                  <Col
                    className="gutter-row"
                    xs={24}
                    md={12}
                    style={{
                      marginBottom: "10px",
                    }}
                  >
                    <FormSelectField
                      name="status"
                      label="Select status"
                      required={true}
                      options={[
                        {
                          value: "available",
                          label: "Available",
                        },
                        {
                          value: "upcoming",
                          label: "Upcoming",
                        },
                        {
                          value: "unavailable",
                          label: "Unavailable",
                        },
                      ]}
                    />
                  </Col>
                </Row>
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
              <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="description"
                  label="Service description"
                  rows={4}
                />
              </Col>

              {/* <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea name="address" label="Address" rows={4} />
              </Col> */}
            </Row>
          </div>

          <Button htmlType="submit"   type="default">
            Create
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CreateStudentFeedback;
