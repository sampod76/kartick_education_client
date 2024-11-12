"use client";
import React, { useState } from "react";
import {
  ContactsFilled,
  MessageFilled,
  WhatsAppOutlined,
  EnvironmentOutlined,
  FacebookFilled,
  TwitterCircleFilled,
  PlusOutlined,
  MinusOutlined,
  // LinkedInCircleFilled
  LinkedinFilled,
  LinkedinOutlined,
  YoutubeOutlined,
  TwitterOutlined
} from "@ant-design/icons";
import CreateStudentPage from "../stepper/CreateStudent";
import ContactForm from "./ContactForm";
import { getUserInfo } from "@/services/auth.service";
import { useAddContactMutation } from "@/redux/api/adminApi/contactApi";
import { Error_model_hook, Success_model } from "@/utils/modalHook";

export default function ContactPage() {

  const userInfo = getUserInfo() as any;
  const [isReset, setIsReset] = useState(false);

  const [addContact, { isLoading }] = useAddContactMutation()

  const onSubmit = async (values: any) => {
    // console.log(values);

    // message.success("sent message");

    if (userInfo?.email) {
      values['user'] = userInfo?.id
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
        setIsReset(true)
      }
      // console.log(res);
    } catch (error: any) {
      Error_model_hook(error?.message);
      console.log(error);
    }
  };

  return (
    <div>
      <div className="container my-24 mx-auto md:px- block lg:flex items-center gap-5 bg-slate-0">
        <div className="w-full lg:w-[45%]">
          <div className="flex flex-wrap">
            <div className="mb-10 w-full shrink-0 grow-0 basis-auto md:mb-0 md:w-6/12 md:px-3 lg:px-">
              <h2 className="mb-6 text-3xl lg:text-5xl font-bold">
                Contact Info
              </h2>
              <p className="mb-6 text-slate-700">
                Welcome to our Website . We are glad to have you around
              </p>
            </div>

            <div className="w-full flex gap-5  border-slate-100 pr-5 rounded-md border-y-[1px] bg-white">
              <div className="flex align-top py-9  pr-5 pl-2  gap-[2rem] text-start ">
                <ContactsFilled
                  style={{
                    fontSize: "3rem",
                    color: "#FB8500",
                  }}
                />
                <div className="flex text-2xl flex-col gap-3">
                  <h2 className="text-2xl font-bold">Phone</h2>
                  <h4 className="text-slate-600  text-xl ">1 (888)  2010390</h4>
                </div>
              </div>
              <div className="flex align-top py-9  pr-5 pl-2  gap-[2rem] text-start ">
                <MessageFilled
                  style={{
                    fontSize: "3rem",
                    color: "#FB8500",
                  }}
                />
                <div className="flex text-2xl flex-col gap-3">
                  <h2 className="text-2xl font-bold">Message</h2>
                  <h4 className="text-slate-600  text-xl ">1 (888)  2010390</h4>
                </div>
              </div>
            </div>
            <div className="w-full border-slate-100 pr-5 rounded-md border-y-[1px] bg-white">
              <div className="flex align-top py-7 shadow-sm pr-5 gap-[2rem] text-start ">
                <EnvironmentOutlined
                  style={{
                    fontSize: "3rem",
                    color: "#FB8500",
                  }}
                />
                <div className="flex text-2xl flex-col gap-3">
                  <h2 className="text-2xl font-bold">Address</h2>
                  <h4 className="text-slate-600  text-xl ">
                    375 Rockbridge Rd, Newyork , United States of America
                  </h4>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-5 text-2xl mt-7">
            <FacebookFilled
              style={{
                fontSize: "48px",
                borderRadius: "10px",
                backgroundColor: "#5F8122",
                color: "white",
                border: "2px solid #5F8122"
              }}
            />
            <TwitterOutlined
              style={{
                fontSize: "48px",
                borderRadius: "8px",
                backgroundColor: "#5F8122",
                color: "white",
                border: "2px solid #5F8122"
              }}
            />
            <LinkedinFilled
              style={{
                fontSize: "48px",
                borderRadius: "8px",
                backgroundColor: "#5F8122",
                color: "white",
                border: "2px solid #5F8122"
              }}
            />
            {/* <LinkedinOutlined /> */}
            <YoutubeOutlined
              style={{
                fontSize: "48px",
                borderRadius: "10px",
                backgroundColor: "#5F8122",
                color: "white",
                border: "2px solid #5F8122"
              }}
            />
          </div>
        </div>

        <div className="w-full lg:w-[55%] px-2 lg:px-5">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
