"use client";
import React from "react";
import Form from "../Forms/Form";
import { Button, Col, Row, message } from "antd";
import FormInput from "../Forms/FormInput";
import FormTextArea from "../Forms/FormTextArea";

export default function ContactForm() {
  const onSubmit = async (values: any) => {
    console.log(values);
    message.success("sent message");
    // try {
    //   const res = await addCategory(values).unwrap();
    //   if (res.success == false) {
    //     Error_model_hook(res?.message);
    //   } else {
    //     Success_model("Successfully added Category");
    //   }
    //   console.log(res);
    // } catch (error: any) {
    //   Error_model_hook(error?.message);
    //   console.log(error);
    // }
  };
  return (
    <div>
      <div className="mb-10 w-full shrink-0 grow-0 basis-auto md:mb-0 md:w-6/12 md:px-3 lg:px-">
        <h2 className="mb-6 text-3xl lg:text-5xl font-bold">Send A Message</h2>
        <p className="mb-6 text-slate-700">We will not public your message.It will store with private</p>
      </div>
      <Form submitHandler={onSubmit}>
        <Row
          //   style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        >
          <Col span={12} style={{ margin: "18px 0" }}>
            <FormInput type="text" name="name" label="Name " size="large" />
          </Col>
          <Col span={12} style={{ margin: "18px 0" }}>
            <FormInput type="email" name="email" label="Email" size="large" />
          </Col>
          <Col span={24} style={{ margin: "18px 0" }}>
            <FormInput
              type="text"
              name="subject"
              label="Subject "
              size="large"
            />
          </Col>

          <Col span={24} style={{ margin: "18px 0" }}>
            <FormTextArea name="message" label="Message" />
          </Col>
          <Button
            htmlType="submit"
            style={{ marginLeft: "20px" }}
            type="default"
            size="large"
          >
            Send
          </Button>
        </Row>
      </Form>
    </div>
  );
}
