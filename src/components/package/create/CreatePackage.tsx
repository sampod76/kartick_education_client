"use client";
import React from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space } from "antd";
import { useGetAllCategoryQuery } from "@/redux/api/adminApi/categoryApi";
import { ENUM_STATUS, ENUM_YN } from "@/constants/globalEnums";
import { Select } from "antd";
import type { SelectProps } from "antd";
const { Option } = Select;
import LabelUi from "@/components/ui/dashboardUI/LabelUi";
export default function CreatePackage() {
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
  const onFinish = (values: any) => {
    console.log("Received values of form:", values);
  };
  return (
    <div className="bg-white shadow-lg p-5 rounded-xl">
      <Form
        name="dynamic_form_nest_item"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item>
          <Form.Item name={"title"} label="Title">
            <Input size="large" placeholder="Please enter package title" />
          </Form.Item>
          <LabelUi>Select Membership </LabelUi>
          <Select
            style={{ width: "100%" }}
            placeholder="Select Membership"
            // onChange={handleChange}
            size="large"
            options={[
              {
                label: "Family & Personal",
                value: "family-personal",
              },
              {
                label: "School & Teacher",
                value: "school-teacher",
              },
            ]}
          />
          <div>
            <Form.Item label="Monthly">
              <Space.Compact>
                <Form.Item
                  name={["monthly", "price"]}
                  noStyle
                  rules={[{ required: true, message: "Province is required" }]}
                >
                  <Select placeholder="Select province">
                    <Select.Option value="Zhejiang">Zhejiang</Select.Option>
                    <Select.Option value="Jiangsu">Jiangsu</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name={["monthly", "street"]}
                  noStyle
                  rules={[{ required: true, message: "Street is required" }]}
                >
                  <Input style={{ width: "50%" }} placeholder="Input street" />
                </Form.Item>
              </Space.Compact>
            </Form.Item>
          </div>
        </Form.Item>
        <div className="border-2 rounded-lg p-3">
          <Form.List name="categories">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "category"]}
                      rules={[
                        { required: true, message: "Missing first name" },
                      ]}
                    >
                      <Select
                        // mode="tags"
                        style={{ width: "270px" }}
                        placeholder="Select category"
                        // onChange={handleChange}
                        size="large"
                        options={options}
                      />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "label"]}
                      rules={[{ required: true, message: "Missing last name" }]}
                    >
                      <Input
                        style={{ width: "300px" }}
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
            )}
          </Form.List>
        </div>
        <Form.Item>
          <div className="flex justify-center items-center mt-3">
            <Button type="default" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}
