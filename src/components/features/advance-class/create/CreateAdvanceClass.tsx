"use client";
import React, { useState } from "react";
import {
  MinusCircleOutlined,
  PlusOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Select, Space, Upload } from "antd";
import { useGetAllCategoryQuery } from "@/redux/api/adminApi/categoryApi";
import { ENUM_STATUS, ENUM_YN } from "@/constants/globalEnums";

import type { SelectProps } from "antd";
import LabelUi from "@/components/ui/dashboardUI/LabelUi";
import { useAddPackageMutation } from "@/redux/api/userApi/packageAPi";
import { Error_model_hook, Success_model } from "@/utils/modalHook";
import uploadImgCloudinary from "@/hooks/UploadSIngleCloudinary";
import dayjs from "dayjs";
import ButtonLoading from "@/components/ui/Loading/ButtonLoading";
import TextEditorNotSetValue from "@/components/shared/TextEditor/TextEditorNotSetForm";
import SelectCategoryChildren from "@/components/Forms/GeneralField/SelectCategoryChildren";
import { useGetAllCategoryChildrenQuery } from "@/redux/api/categoryChildrenApi";
import { useGetAllCourseQuery } from "@/redux/api/adminApi/courseApi";
import { useAddShowAdvanceClassesMutation } from "@/redux/api/adminApi/features/showAdvanceClassApi";
import CLassField from "@/components/Forms/answer/ClassField";
import { removeNullUndefinedAndFalsey } from "@/hooks/removeNullUndefinedAndFalsey";

export default function CreateAdvanceClass() {
  const [form] = Form.useForm();

  const [textEditorValue, setTextEditorValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [isReset, setIsReset] = useState(false);

  const queryCategory: Record<string, any> = {};
  queryCategory["isDelete"] = ENUM_YN.NO;
  queryCategory["title"] = ENUM_STATUS.ACTIVE;

  const [ClassData, setClassData] = useState<any>([]);

  console.log(ClassData, "ClassData");
  const [addShowAdvance, { isLoading: ShowAdvanceLoading }] =
    useAddShowAdvanceClassesMutation();

  // console.log("🚀 ~ CreateSkillsPlan ~ AddPackageLoading:", AddPackageLoading)

  // console.log(course, "course");
  const onFinish = async (values: any) => {
    console.log(
      "🚀 ~ file: CreateAdvanceClass.tsx:55 ~ onFinish ~ values:",
      values
    );

    const advancePlanData = {
      ...values,
      classes: ClassData,
      details: textEditorValue,
    };
    removeNullUndefinedAndFalsey(advancePlanData);

    // return
    try {
      const res = await addShowAdvance(advancePlanData).unwrap();
      // console.log(res);
      if (res?.success == false) {
        Error_model_hook(res?.message);
      } else {
        Success_model("Successfully Create Advance class");
        form.resetFields();
        setClassData([]);
        setTextEditorValue("");
        setIsReset(true);
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
        Create Advance Class
      </h1>
      <Form
        name="Skills_Advance_Class"
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
        <Form.Item
          name="title"
          rules={[{ required: true, message: "Title is required" }]}
          label="Title"
        >
          <Input
            size="large"
            placeholder="Please enter Skills and Plan title"
          />
        </Form.Item>
        {/* //! 2. buttonLink */}
        <Form.Item name="buttonLink" label="Button Link">
          <Input
            size="large"
            type="text"
            placeholder="Please enter Skills and Plan buttonLink"
          />
        </Form.Item>

        {/* //! 3.page  */}
        {/* <Form.Item name="page"   label="Enter page (optional)">
          <Input size="large" value={'home'} defaultValue={"home"} placeholder="Please enter page" />
        </Form.Item> */}
        {/* //! 3. add classes */}
        <div className="border-2 rounded-lg p-3 ">
          {/* <h3 className="text-center ">Add Classes</h3>
          <Form.List name="classes">
            {(fields, { add, remove }) => {
              // console.log(fields,'fieldsfieldsfieldsfields') ;

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
                        display: "grid",
                        // flexDirection: "column", // Stack items vertically on smaller screens
                        margin: "21px auto",
                        width: "100%",
                        gridTemplateColumns: "repeat(1 ,1fr)",
                        boxShadow:
                          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.19)",
                        padding: "1rem",
                      }}
                      align="center"
                    >
                      <Form.Item
                        {...restField}
                        name={[name, "title"]}
                        label="title"
                        style={{
                          width: "100%",
                          marginBottom: "8px",
                          // maxWidth: "200px",
                        }}
                        rules={[
                          { required: true, message: "Missing Class Title" },
                        ]}
                      >
                        <Input size="large" placeholder="label" />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        name={[name, "img"]}
                        style={{
                          width: "100%",
                          marginBottom: "8px",
                          display: "flex",
                        }}
                        rules={[
                          { required: true, message: "Missing Class Image" },
                        ]}
                      >
                        <Upload
                          listType="picture-card"
                          beforeUpload={async (file) => {
                            try {
                              setLoading(true);
                              // Upload image to Cloudinary
                              const imgUrl = await uploadImgCloudinary(file);


                              // Set the new value of imgs by appending the imgUrl
                              form.setFieldsValue({
                                [name]: {
                                  ...form.getFieldValue(name),
                                  img: imgUrl,
                                },
                              });
                              

                              // Prevent default upload behavior
                              setLoading(false);
                              return false;
                            } catch (error) {
                              console.error("Error uploading image:", error);
                              setLoading(false);
                              return false; // Prevent default upload behavior on error
                            }
                          }}
                        >
                          {loading ? (
                            <LoadingOutlined />
                          ) : (
                            <>
                              <div style={{ marginTop: 8 }}>+ Upload</div>
                            </>
                          )}
                        </Upload>
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        style={{ width: "350px", marginBottom: "8px" }}
                        name={[name, "course"]}
                        label="Select course"
                        rules={[
                          { required: true, message: "Missing Category" },
                        ]}
                      >
                        <Select
                          // onChange={handleChange}
                          // onBlur={() => handleChange(restField.value, name)}
                          loading={categoryLoading}
                          // style={{ width: "" }}

                          placeholder="Select subject"
                          size="large"
                          options={categoryData.map((data: any) => ({
                            label: data.title,
                            value: data._id,
                          }))}
                          showSearch
                          listHeight={200}
                          popupMatchSelectWidth
                          dropdownStyle={{ minWidth: "250px" }}
                        />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        name={[name, "buttonLink"]}
                        label="Button Link"
                      //  rules={[
                      //   { required: true, message: "Missing Class Class Button Link" },
                      // ]}
                      >
                        <Input
                          size="large"
                          type="url"
                          placeholder="Please enter Skills and Plan Button Link"
                        />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        name={[name, "short_description"]}
                        label="Short Description"
                        style={{
                          width: "100%",
                          marginBottom: "8px",
                          // maxWidth: "200px",
                        }}
                        rules={[
                          {
                            required: true,
                            message: "Missing Class Descriptions",
                          },
                        ]}
                      >
                        <Input.TextArea
                          showCount
                          maxLength={3000}
                          rows={3}
                          size="large"
                          placeholder="Please enter details"
                        />
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
                      Add Classes
                    </Button>
                  </Form.Item>
                </>
              );
            }}
          </Form.List> */}
          {/*//! Created Dynamic */}

          <CLassField ClassData={ClassData} setClassData={setClassData} />
        </div>
        <Form.Item>
          <p className="text-center my-3 font-bold text-xl">Description</p>
          <TextEditorNotSetValue
            textEditorValue={textEditorValue}
            setTextEditorValue={setTextEditorValue}
          />
        </Form.Item>

        <div className="flex justify-center items-center mt-3 ">
          {ShowAdvanceLoading ? (
            <ButtonLoading />
          ) : (
            <Button
              loading={ShowAdvanceLoading}
              type="default"
              htmlType="submit"
            >
              Create
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
}
