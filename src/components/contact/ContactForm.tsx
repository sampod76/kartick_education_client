"use client";
import React, { useState } from "react";
import Form from "../Forms/Form";
import { Button, Col, Row, message } from "antd";
import FormInput from "../Forms/FormInput";
import FormTextArea from "../Forms/FormTextArea";
import { useAddContactMutation } from "@/redux/api/adminApi/contactApi";
import { Error_model_hook, Success_model } from "@/utils/modalHook";
import { getUserInfo } from "@/services/auth.service";

export default function ContactForm() {
  const userInfo = getUserInfo() as any;
  const [isReset, setIsReset] = useState(false);

  const [addContact, { isLoading }] = useAddContactMutation();

  const onSubmit = async (values: any) => {
    // console.log(values);

    // message.success("sent message");

    if (userInfo?.email) {
      values["user"] = userInfo?.id;
    }

    // const contactData={
    //   ...values,

    // }

    try {
      const res = await addContact(values).unwrap();
      // console.log(res);
      if (res?.success == false) {
        Error_model_hook(res?.message);
      } else {
        Success_model("Successfully sent your Message");
        setIsReset(true);
      }
      // console.log(res);
    } catch (error: any) {
      Error_model_hook(error?.message);
      console.log(error);
    }

    // try {
    //   const res = await addCategory(values).unwrap();
    //   if (res?.success == false) {
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
    <div className="w-[80%] h-[620px] mx-auto mt- m-5 p-5 bg-[white] rounded-[16px]">
      <p className="text-[#1E1E1E] text-[24px] font-bold">
        {`Let's Get In Touch.`}
      </p>
      <p className="text-[16px] text-[#1E1E1E] mt-3">
        {`Fill the form and get in contact with us`}
      </p>
      <Form submitHandler={onSubmit} isReset={isReset}>
        <Row
          //   style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        >
          <div className="flex w-[95%] mx-auto gap-[28px] mt-10">
            <div className="w-[48%]">
              <p className="text-[#1E1E1E] text-[16px]">{`First name`}</p>
              <input
                className="border-b-2 pb-2 border-[#E3DBDB] w-[100%] mt-2"
                type="text"
                placeholder="e.g. James"
              />
            </div>
            <div className="w-[48%]">
              <p className="text-[#1E1E1E] text-[16px]">{`Last name`}</p>
              <input
                className="border-b-2 pb-2 border-[#E3DBDB] w-[100%] mt-2"
                type="text"
                placeholder="e.g. Bond"
              />
            </div>
          </div>
          <div className="mt-6  w-[95%] mx-auto">
            <p className="text-[#1E1E1E] text-[16px]">{`Your E-mail`}</p>
            <input
              className="border-b-2 pb-2 border-[#E3DBDB] w-[100%] mt-2"
              type="text"
              placeholder="e.g. j.bondinlossom@gmail.com"
            />
          </div>
          <div className="mt-6 w-[95%] mx-auto">
            <p className="text-[#1E1E1E] text-[16px]">{`Your Subject`}</p>
            <input
              className="border-b-2 pb-2 border-[#E3DBDB] w-[100%] mt-2"
              type="text"
            />
          </div>
          <div className="mt-6  w-[95%] mx-auto">
            <p className="text-[#1E1E1E] text-[16px]">{`How can we help you?`}</p>
            <input
              className="border-b-2 pb-2 border-[#E3DBDB] w-[100%] mt-2"
              type="text"
            />
          </div>
          <p className="mt-6  w-[95%] mx-auto">
            {`By submitting this form, I confirm that I have read and accept the Privacy Policy.`}
          </p>
          <Button
            htmlType="submit"
            style={{
              marginLeft: "16px",
              color: "white",
              backgroundColor: "#5371FF",
              marginTop: '32px'
            }}
            type="primary"
            size="large"
            loading={isLoading}
          >
            Send
          </Button>
        </Row>
      </Form>
    </div>
  );
}
