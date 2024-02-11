"use client";

import Form from "@/components/Forms/Form";

import FormInput from "@/components/Forms/FormInput";

import FormTextArea from "@/components/Forms/FormTextArea";
import { ENUM_STATUS } from "@/constants/globalEnums";
import { removeNullUndefinedAndFalsey } from "@/hooks/removeNullUndefinedAndFalsey";

import { useAddFaqMutation } from "@/redux/api/faqApi";

import { Error_model_hook, Success_model } from "@/utils/modalHook";

import { Button, Col, Row, Select, message } from "antd";
import React, { useState } from "react";

const CreateFaq = () => {
  const [addFaq, { isLoading: blogLoading }] = useAddFaqMutation();
  const [isReset, setIsReset] = useState(false);
  const onSubmit = async (values: any) => {
    removeNullUndefinedAndFalsey(values);

    try {
      const res = await addFaq(values).unwrap();
      if (res?.success == false) {
        Error_model_hook(res?.message);
      } else {
        Success_model("Successfully added Blog");
        setIsReset(true);
      }
      console.log(res);
    } catch (error: any) {
      Error_model_hook(error?.message);
      console.log(error);
    }
  };

  if (blogLoading) {
    return message.loading("Loading...");
  }

  return (
    <div>
      <div>
        {/* resolver={yupResolver(adminSchema)} */}
        {/* resolver={yupResolver(IServiceSchema)} */}
        <Form
          submitHandler={onSubmit}
          isReset={isReset}
          // defaultValues={{ status: ENUM_STATUS.ACTIVE }}
        >
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
              Faq Information
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

              <Col span={24} style={{ margin: "10px 0" }}>
                <FormTextArea name="content" label="Faq content" rows={10} />
              </Col>

              {/* <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea name="address" label="Address" rows={4} />
              </Col> */}
            </Row>
          </div>

          <Button htmlType="submit" type="default">
            Create
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CreateFaq;
