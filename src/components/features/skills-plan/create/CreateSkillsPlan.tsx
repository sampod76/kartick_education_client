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
import { useAddSkills_planMutation } from "@/redux/api/adminApi/features/skillsPlanApi";

export default function CreateSkillsPlan() {
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

  const [addSkills_plan, { isLoading: AddPackageLoading }] =
    useAddSkills_planMutation();
  // console.log("🚀 ~ CreateSkillsPlan ~ AddPackageLoading:", AddPackageLoading)



  const onFinish = async (values: any) => {
    // console.log("Received values", values);
    if (values?.imgs) {
      const imgUrl = await uploadImgCloudinary(values?.imgs?.file);
      console.log(imgUrl, 'imgUrl')
      values.imgs = imgUrl;
    }


    const skillsPlanData = {
      title: values.title,
      imgs: [values?.imgs],
      imgTitle: values.imgTitle,
      page: values.page || 'home',
      points: values?.points,
      details: textEditorValue
    };
    // console.count("🚀 ~ onFinish ~ skillsPlanData:", skillsPlanData)
    // return

    try {
      const res = await addSkills_plan(skillsPlanData).unwrap();
      console.log(res);
      if (res?.success == false) {
        Error_model_hook(res?.message);
      } else {
        Success_model("Successfully Create skill plan");
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
        Create Skills and Plan
      </h1>
      <Form
        name="Skills_Plan_create"
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
          {/* //! 2. imgs */}
          {/* <Space style={{}}> */}
          <Form.Item name="imgTitle" label="Image Title" >
            <Input size="large" placeholder="Please enter Skills and Plan imgTitle title" width={"100%"} />
          </Form.Item>
          <Form.Item name="imgs" required>
            <Upload
              listType="picture-card"
              beforeUpload={async (file) => {
                // console.table(file)
                // const imgUrl = await uploadImgCloudinary(file);
                form.setFieldsValue({ imgExtra: "" }); // Set imgUrl in Form values
                return false; // Prevent default upload behavior
                // return true
              }}
            >
              <div className="flex flex-col">
                {/* <h1>+</h1> */}
                <h4>Upload</h4>

              </div>
            </Upload>
          </Form.Item>

          {/* </Space> */}

        </Form.Item>
        {/* //! 3.page  */}
        {/* <Form.Item name="page" label="Page">
          <Input size="large" placeholder="Please enter Skills and Plan page" />
        </Form.Item> */}
        {/* //! 2. add points */}
        <div className="border-2 rounded-lg p-3">
          <LabelUi>Add Points</LabelUi>
          <Form.List name="points">
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
                    <div
                      key={key}
                      style={{
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "flex-start",
                        // flexDirection: "column", // Stack items vertically on smaller screens

                        margin: "8px auto",
                        // background: "blue",
                        // width: "100%",
                        // position: "relative",

                      }}
                    // align="center"
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
                          { required: true, message: "Missing Points Label" },
                        ]}
                      >
                        <Input size="large" placeholder="label" />
                      </Form.Item>
                      <MinusCircleOutlined
                        onClick={() => handleRemove(name)}
                      // style={{ fontSize: "1.5rem", position: "absolute", right: 0, top: 0 }}
                      />
                    </div>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add points
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
