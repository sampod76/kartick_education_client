"use client";
import React, { useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Space,
  Upload,
} from "antd";
import { useGetAllCategoryQuery } from "@/redux/api/adminApi/categoryApi";
import { ENUM_STATUS, ENUM_YN } from "@/constants/globalEnums";
import { Select } from "antd";
import type { SelectProps } from "antd";
import LabelUi from "@/components/ui/dashboardUI/LabelUi";
import { useAddPackageMutation } from "@/redux/api/userApi/packageAPi";
import { Error_model_hook, Success_model } from "@/utils/modalHook";
import uploadImgCloudinary from "@/hooks/UploadSIngleCloudinary";
import ButtonLoading from "@/components/ui/Loading/ButtonLoading";
import TextEditorNotSetValue from "@/components/shared/TextEditor/TextEditorNotSetForm";
import { useAddShortOverViewMutation } from "@/redux/api/adminApi/features/overview";


export default function CreateShortOverview() {
  const [form] = Form.useForm();


  const [textEditorValue, setTextEditorValue] = useState("");
  // console.log(uuid,"uuiduuid")
  const { data, isLoading, error } = useGetAllCategoryQuery({
    status: ENUM_STATUS.ACTIVE,
    isDelete: ENUM_YN.NO,
    limit: 9999,
  });
  let options: SelectProps["options"] = [];
  options = data?.data?.map((select: any) => ({
    label: select.title,
    value: select._id,
  }));

  const [addShortOverView, { isLoading: shortOverviewLoading }] =
    useAddShortOverViewMutation();
  // console.log("🚀 ~ CreateSkillsPlan ~ AddPackageLoading:", AddPackageLoading)



  const onFinish = async (values: any) => {
    // console.log("Received values", values);


    const shortOverView = {
      title: values.title,

      page: values.page || 'page',
      details: textEditorValue,

      cards: values?.cards,
    };
    console.log("🚀 ~ onFinish ~ shortOverView:", shortOverView)
    // return

    try {
      const res = await addShortOverView(shortOverView).unwrap();
      console.log(res);
      if (res?.success == false) {
        Error_model_hook(res?.message);
      } else {
        Success_model("Successfully added Short Overview");
        form.resetFields();
      }

      // console.log(res);
    } catch (error: any) {
      Error_model_hook(error?.message);
      console.log(error);
    }
  };

  return (
    <div className="bg-white shadow-lg p-5 rounded-xl">
      <h1 className="text-xl font-bold border-b-2 border-spacing-4 mb-2  ">
        Create Short Overview
      </h1>
      <Form
        name="ShortOverView_create"
        onFinish={onFinish}
        form={form}
        style={{
          maxWidth: 850,
          marginInline: "auto",
          border: "0.2px solid gray",
          padding: "8px",
          borderRadius: "5px",
        }}
        autoComplete="off"
        layout="vertical"
      >

        {/* //! 1. title */}
        <Form.Item name="title" label="Title">
          <Input size="large" placeholder="Please enter Short Overview title" />
        </Form.Item>



        {/* //! 3.page  */}
        {/* <Form.Item name="page" label="Page">
          <Input size="large" placeholder="Please enter Short Overview page" />
        </Form.Item> */}
        {/* //! 2. add cards */}
        <div className="border-2 rounded-lg p-3">
          <LabelUi>Add cards</LabelUi>
          <Form.List name="cards">
            {(fields, { add, remove }) => {
              // console.log(fields,'fieldsfieldsfieldsfields') ;

              // const handleChange = (value: any) => {
              //   console.log(value, 'value');
              //   const updatedOptions = options?.filter(
              //     (item) => item?.value !== value
              //   );
              //   // console.log(updatedOptions)
              //   options = updatedOptions;
              //   // console.log(options)
              // };

              const handleRemove = (value: any) => {
                console.log(value, "handleRemove");
                remove(value);
              };

              return (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{
                        display: "flex",
                        // flexDirection: "column", // Stack items vertically on smaller screens
                        margin: "8px auto",
                        // background: "blue",
                        // width: "100%",
                      }}
                      align="center"
                    >
                      <Form.Item
                        {...restField}
                        name={[name, "title"]}
                        style={{
                          width: "",
                          marginBottom: "8px",
                          maxWidth: "200px",
                        }}
                        rules={[
                          { required: true, message: "Missing cards Label" },
                        ]}
                      >
                        <Input size="large" placeholder="label" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "countNumber"]}
                        style={{
                          width: "",
                          marginBottom: "8px",
                          maxWidth: "200px",
                        }}
                        rules={[
                          { required: true, message: "Missing cards count Number" },
                        ]}
                      >
                        <Input size="large" placeholder="count Number" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "short_description"]}
                        style={{
                          width: "",
                          marginBottom: "8px",
                          maxWidth: "200px",
                        }}
                        rules={[
                          { required: true, message: "Missing cards short_description" },
                        ]}
                      >
                        <Input.TextArea size="large" placeholder="short_description" />
                      </Form.Item>
                      <MinusCircleOutlined
                        onClick={() => handleRemove(name)}
                        style={{ marginInline: "3px" }}
                      />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add cards
                    </Button>
                  </Form.Item>
                </>
              );
            }}
          </Form.List>
        </div>
        <Form.Item>
          <p className="text-center my-3 font-bold text-xl">Description</p>
          <TextEditorNotSetValue
            textEditorValue={textEditorValue}
            setTextEditorValue={setTextEditorValue}
          />
        </Form.Item>
        <Form.Item>
          <div className="flex justify-center items-center mt-3">
            {shortOverviewLoading ? (
              <ButtonLoading />
            ) : (
              <Button
                loading={shortOverviewLoading}
                type="default"
                htmlType="submit"
              >
                Create
              </Button>
            )}
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}
