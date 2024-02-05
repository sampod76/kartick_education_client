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


export default function CreateAdvanceClass() {
  const [form] = Form.useForm();

  const [textEditorValue, setTextEditorValue] = useState("");

  const [shortDescription, setShortDescription] = useState("");


  ////! for filtering
  const [category, setCategory] = useState<{ _id?: string; title?: string }>(
    {}
  );
  const [course, setCourse] = useState<{ _id?: string; title?: string }>({});
  const queryCategory: Record<string, any> = {};
  queryCategory["children"] = "course";
  //! for Category options selection
  const { data: Category, isLoading: categoryLoading } =
    useGetAllCategoryChildrenQuery({
      ...queryCategory,
    });
  const categoryData: any = Category?.data;

  const [addPackage, { isLoading: AddPackageLoading }] =
    useAddPackageMutation();
  // console.log("🚀 ~ CreateSkillsPlan ~ AddPackageLoading:", AddPackageLoading)

  console.log(course, 'course')
  const onFinish = async (values: any) => {
    console.log("🚀 ~ file: CreateAdvanceClass.tsx:55 ~ onFinish ~ values:", values)



    return
    const advancePlanData = {
      title: values.title,
      buttonLink: values.buttonLink,
      page: values.page,
      classes: values?.classes,

    };
    console.log("🚀 ~ onFinish ~ advancePlanData:", advancePlanData)
    // return

    try {
      const res = await addPackage(advancePlanData).unwrap();
      // console.log(res);
      if (res?.success == false) {
        Error_model_hook(res?.message);
      } else {
        Success_model("Successfully added Package");
        form.resetFields();
        setTextEditorValue("")
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
        <Form.Item>
          {/* //! 1. title */}
          <Form.Item name="title" label="Title">
            <Input size="large" placeholder="Please enter Skills and Plan title" />
          </Form.Item>
          {/* //! 2. buttonLink */}
          <Form.Item name="buttonLink" label="Button Link">
            <Input size="large" type="url" placeholder="Please enter Skills and Plan buttonLink" />
          </Form.Item>
        </Form.Item>
        {/* //! 3.page  */}
        <Form.Item name="page" label="Page">
          <Input size="large" placeholder="Please enter Advance Class" />
        </Form.Item>
        {/* //! 3. add classes */}
        <div className="border-2 rounded-lg p-3">
          <LabelUi>Add Classes</LabelUi>
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
                        margin: "8px auto",
                        width: "100%",
                        gridTemplateColumns: 'repeat(1 ,1fr)',
                        // background:"#BECBD6"
                      }}
                      align="center"
                    >
                      <Form.Item
                        {...restField}
                        name={[name, "title"]}
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
                        name={[name, "imgs"]}
                        style={{
                          width: "100%",
                          marginBottom: "8px",
                          // maxWidth: "200px",
                          display: "flex",
                          // backgroundColor:"violet"

                        }}
                        rules={[
                          { required: true, message: "Missing Class Label" },
                        ]}
                      >
                        <Upload
                          listType="picture-card"
                          beforeUpload={async (file) => {
                            // console.log(file)
                            // const imgUrl = await uploadImgCloudinary(file);
                            form.setFieldsValue({ imgExtra: "" }); // Set imgUrl in Form values
                            return false; // Prevent default upload behavior

                          }}

                        >
                          Upload
                        </Upload>
                      </Form.Item>
                      <div >

                        <SelectCategoryChildren
                          lableText="Select category"
                          setState={setCategory}
                          isLoading={categoryLoading}
                          categoryData={categoryData}
                        />

                        <SelectCategoryChildren
                          lableText="Select courses"
                          setState={setCourse}
                          categoryData={
                            //@ts-ignore
                            category?.courses || []
                          }

                        />
                      </div>

                      <Form.Item    {...restField}
                        name={[name, "buttonLink"]} label="Button Link" rules={[
                          { required: true, message: "Missing Class Class Button Link" },
                        ]}>
                        <Input size="large" type="url" placeholder="Please enter Skills and Plan Button Link" />
                      </Form.Item>


                      <Form.Item
                        {...restField}
                        name={[name, "short_description"]}
                        style={{
                          width: "100%",
                          marginBottom: "8px",
                          // maxWidth: "200px",
                        }}
                        rules={[
                          { required: true, message: "Missing Class Descriptions" },
                        ]}
                      >
                        <Input.TextArea showCount
                          maxLength={3000}
                          rows={3} size="large" placeholder="label" />
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
            {AddPackageLoading ? (
              <ButtonLoading />
            ) : (
              <Button
                loading={AddPackageLoading}
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
