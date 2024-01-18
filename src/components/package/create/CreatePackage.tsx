"use client";
import React from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space ,  InputNumber} from "antd";
import { useGetAllCategoryQuery } from "@/redux/api/adminApi/categoryApi";
import { ENUM_STATUS, ENUM_YN } from "@/constants/globalEnums";
import { Select } from "antd";
import type { SelectProps } from "antd";

const { Option } = Select;
import LabelUi from "@/components/ui/dashboardUI/LabelUi";
import { useAddPackageMutation } from "@/redux/api/userApi/packageAPi";
import { Error_model_hook, Success_model } from "@/utils/modalHook";

// ! for uuid
const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
export default function CreatePackage() {

  const uuid = generateUUID();
  // console.log(uuid,"uuiduuid")
  const { data, isLoading } = useGetAllCategoryQuery({
    status: ENUM_STATUS.ACTIVE,
    isDelete: ENUM_YN.NO,
    limit: 9999,
  });
  let options: SelectProps["options"] = [];
  options = data?.data?.map((select) => ({
    label: select.title,
    value: select._id,
  }));

  const [addPackage,{isSuccess}] = useAddPackageMutation();

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  // const selectMembershipsValue =(value)=>{

  // }
  const onFinish = async (values: any) => {
    console.log("Received values of form:", values);
    const packageData = {
      membership: {
        title:values.membership?.title,
        uid:uuid
      },
      title: values.title,
      type: values.type,
      monthly: values.monthly,
      biannual: values.biannual,
      yearly: values.yearly,
      categories: values.categories,
    };
    // console.log("🚀 ~ onFinish ~ packageData:", packageData)

    try {
      const res = await addPackage(packageData).unwrap();
      // console.log(res);
      if (res?.success == false) {
        Error_model_hook(res?.message);
      } else {
        Success_model("Successfully added Package");
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
       Create Package
        </h1>
      <Form
        name="package_create"
        onFinish={onFinish}
        style={{ maxWidth: 800 ,marginInline:"auto",border:"1px solid gray",padding:"8px",borderRadius:"5px"}}
        autoComplete="off"
        layout="vertical"
        
      >
        <Form.Item>
          <Form.Item name="title" label="Title">
            <Input size="large" placeholder="Please enter package title" />
          </Form.Item>
          <Space
             
            >
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
              <Option value="family-personal">Family & Personal</Option>
              <Option value="school-teacher">School & Teacher</Option>
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
        </Form.Item>
        <div className="border-2 rounded-lg p-3">
      <LabelUi>Add Category</LabelUi>
          <Form.List name="categories">
            {(fields, { add, remove }) => {
    // console.log(fields,'fieldsfieldsfieldsfields') ;

    const onchange=(value:any)=>{
      // console.log(value,'value') ;
        const updatedOptions = options?.filter((item) => item?.value !== value);
      // console.log(updatedOptions)
      options = updatedOptions;
      // console.log(options)
    }
              return (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{ display: "", marginBottom: 8}}
                      align="baseline"
                    >
                      <Form.Item
                        {...restField}
                        style={{ minWidth: "140px" }}
                        name={[name, "category"]}
                        rules={[
                          { required: true, message: "Missing Category" },
                        ]}
                      >
                        <Select
                        onChange={onchange}
                          // mode="tags"
                          loading={isLoading}
                          style={{ width: "120px" }}
                          placeholder="Select category"
                          // onChange={handleChange}
                          size="large"
                          options={options}
                        />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "label"]}
                        style={{ maxWidth: "200px" }}
                        rules={[{ required: true, message: "Missing Category Label" }]}
                      >
                        <Input
                          // style={{ width: "300p" }}
                          size="large"
                          placeholder="label"
                        />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
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
              )
            }}
          </Form.List>
        </div>
        <Form.Item>
          <div className="flex justify-center items-center mt-3">
            <Button loading={isSuccess} type="default" htmlType="submit">
              Create
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}
