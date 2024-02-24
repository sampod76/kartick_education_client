"use client";
import React, { useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Space,
  InputNumber,
  Upload,
  DatePicker,
} from "antd";
import { useGetAllCategoryQuery } from "@/redux/api/adminApi/categoryApi";
import { ENUM_STATUS, ENUM_YN } from "@/constants/globalEnums";
import { Select } from "antd";
import type { SelectProps } from "antd";

const { Option } = Select;
import LabelUi from "@/components/ui/dashboardUI/LabelUi";
import { useAddPackageMutation } from "@/redux/api/userApi/packageAPi";
import { Error_model_hook, Success_model } from "@/utils/modalHook";
import uploadImgCloudinary from "@/hooks/UploadSIngleCloudinary";
import dayjs from "dayjs";
import ButtonLoading from "@/components/ui/Loading/ButtonLoading";
const { RangePicker } = DatePicker;
// ! for uuid
const generateUUID = () => {
  return "xxxxxxxx-xxxx-4xxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
export default function CreatePackage() {
  const [form] = Form.useForm();

  const uuid = generateUUID();
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

  const [addPackage, { isLoading: AddPackageLoading }] =
  useAddPackageMutation();
  console.log("🚀 ~ CreatePackage ~ AddPackageLoading:", AddPackageLoading)

  // const [imgUrl, setImgUrl] = useState(null);
  // const handleChange = async (info) => {
  //   if (info.file.status === 'done') {
  //     // Set the imgUrl to the Form values
  //     setImgUrl(info.file.response);
  //     form.setFieldsValue({ img: info.file.response });
  //   }
  // };

  const onFinish = async (values: any) => {

    // console.log("Received values", values);
    if (values?.img) {
      const imgUrl = await uploadImgCloudinary(values?.img?.file);
      // console.log(imgUrl, 'imgUrl')
      values.img = imgUrl;
    }
    // console.log("Received values", values);
    const formattedDateRange = values?.date_range?.map((date: any) =>
      dayjs(date).format("YYYY-MM-DD")
    );
    values.date_range = formattedDateRange;

    const packageData = {
      membership: {
        title: values.membership?.title,
        uid: uuid,
      },
      img: values?.img,
      date_range: values.date_range,
      title: values.title,
      type: values.type,
      monthly: values.monthly,
      biannual: values.biannual,
      yearly: values.yearly,
      categories: values.categories,
    };
    // console.log("🚀 ~ onFinish ~ packageData:", packageData)
    // return

    try {
      const res = await addPackage(packageData).unwrap();
      // console.log(res);
      if (res?.success == false) {
        Error_model_hook(res?.message);
      } else {
        Success_model("Successfully added Package");
        form.resetFields();
      }
   
      // console.log(res);
    } catch (error: any) {
      Error_model_hook(error?.message);
      console.log(error);
    }
  };
  const [dynamicOption, setDynamicOption] = useState(options);
  return (
    <div className="bg-white shadow-lg p-5 rounded-xl">
      <h1 className="text-xl font-bold border-b-2 border-spacing-4 mb-2  ">
        Create Package
      </h1>
      <Form
        name="package_create"
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
          <Form.Item name="title" label="Title">
            <Input size="large" placeholder="Please enter package title" />
          </Form.Item>
          <Space>
            <Form.Item name="type" label="Select Types">
              {/* <LabelUi>Select Types </LabelUi> */}
              <Select
                style={{ maxWidth: "100%" }}
                placeholder="Select Types"
                size="large"
              >
                <Option value="bundle">Bundle</Option>
                <Option value="select">Select</Option>
                <Option value="multiple_select">Multiple Select</Option>
              </Select>
            </Form.Item>
            <Form.Item name={["membership", "title"]} label="Select Membership">
              {/* <LabelUi>Select Membership </LabelUi> */}
              <Select
                style={{ width: "100%" }}
                placeholder="Select Membership"
                size="large"
              >
                <Option value="family & personal">Family & Personal</Option>
                <Option value="school & teacher">School & Teacher</Option>
              </Select>
            </Form.Item>
          </Space>
          <div className="">
            {/*//!  monthly */}
            <Space.Compact>
              <Form.Item
                name={["monthly", "price"]}
                // noStyle

                label="Monthly Price"
                rules={[{ required: true, message: "Province is required" }]}
              >
                <InputNumber
                  name="price"
                  type="number"
                  placeholder="Monthly Price"
                  // style={{ width: "70%" }}
                />
              </Form.Item>

              <Form.Item
                name={["monthly", "each_student_increment"]}
                // noStyle
                label="Each Student price"
                rules={[
                  {
                    required: true,
                    message: "Each Student Price is required",
                  },
                ]}
              >
                <InputNumber
                  style={{ width: "70%" }}
                  type="number"
                  placeholder="Input Each Student Price"
                />
              </Form.Item>
            </Space.Compact>
            <Space.Compact>
              {/*//!  biannual */}
              <Form.Item
                name={["biannual", "price"]}
                // noStyle
                label="Biannual Price"
                rules={[{ required: true, message: "Province is required" }]}
              >
                <InputNumber
                  name="price"
                  type="number"
                  placeholder="Biannual Price"
                  // style={{ width: "70%" }}
                />
              </Form.Item>

              <Form.Item
                name={["biannual", "each_student_increment"]}
                // noStyle
                label="Each Student price"
                rules={[
                  {
                    required: true,
                    message: "Each Student Price is required",
                  },
                ]}
              >
                <InputNumber
                  style={{ width: "70%" }}
                  type="number"
                  placeholder="Input Each Student Price"
                />
              </Form.Item>
            </Space.Compact>
            <Space.Compact>
              {/*//!  yearly */}
              <Form.Item
                name={["yearly", "price"]}
                // noStyle
                label="Yearly Price"
                rules={[{ required: true, message: "Province is required" }]}
              >
                <InputNumber
                  name="price"
                  type="number"
                  placeholder="yearly Price"
                  // style={{ width: "70%" }}
                />
              </Form.Item>

              <Form.Item
                name={["yearly", "each_student_increment"]}
                // noStyle
                label="Each Student price"
                rules={[
                  {
                    required: true,
                    message: "Each Student Price is required",
                  },
                ]}
              >
                <InputNumber
                  style={{ width: "70%" }}
                  type="number"
                  placeholder="Input Each Student Price"
                />
              </Form.Item>
            </Space.Compact>
          </div>
          <Space.Compact></Space.Compact>
          <Space.Compact style={{}}>
            <Form.Item name="img" required>
              <Upload
                listType="picture-circle"
                beforeUpload={async (file) => {
                  // console.log(file)
                  const imgUrl = await uploadImgCloudinary(file);
                  form.setFieldsValue({ img:imgUrl ?imgUrl : "" }); // Set imgUrl in Form values
                  return false; // Prevent default upload behavior
                  // return true
                }}
              >
                Upload
              </Upload>
            </Form.Item>

            {/* <Form.Item name="date_range" label="Package duration" required>
              <RangePicker format="YYYY-MM-DD" />
            </Form.Item> */}
          </Space.Compact>
        </Form.Item>
        <div className="border-2 rounded-lg p-3">
          <LabelUi>Add Category</LabelUi>
          <Form.List name="categories">
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
                        style={{ width: "", marginBottom: "8px" }}
                        name={[name, "category"]}
                        rules={[
                          { required: true, message: "Missing Category" },
                        ]}
                      >
                        <Select
                          // onChange={handleChange}
                          // onBlur={() => handleChange(restField.value, name)}
                          loading={isLoading}
                          style={{ width: "" }}
                          placeholder="Select category"
                          size="large"
                          options={options}
                          listHeight={200}
                          popupMatchSelectWidth
                          dropdownStyle={{ minWidth: "250px" }}
                        />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "label"]}
                        style={{
                          width: "",
                          marginBottom: "8px",
                          maxWidth: "200px",
                        }}
                        rules={[
                          { required: true, message: "Missing Category Label" },
                        ]}
                      >
                        <Input size="large" placeholder="label" />
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
                      Add Subject/category
                    </Button>
                  </Form.Item>
                </>
              );
            }}
          </Form.List>
        </div>
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
