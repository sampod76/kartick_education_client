import { Button, Form, Input, Radio, Space } from "antd";
import React, { useState } from "react";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import type { RadioChangeEvent } from "antd";
import FormSelectField from "./FormSelectField";
import { courseStatusOptions } from "@/constants/global";
const DynamicFormFiled = () => {
  const onFinish = (values: any) => {
    console.log("Received values of form:", values);
  };
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  return (
    <Form
      name="dynamic_form_nest_item"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
      autoComplete="off"
    >
      <Form.List name="users">
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
                  name={[name, "title"]}
                  rules={[{ required: true, message: "Missing title" }]}
                >
                  <Input placeholder="title" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "img"]}
                  rules={[{ required: true, message: "Missing img img" }]}
                >
                  <Input type="URL" placeholder="img Url" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "correct"]}
                  rules={[{ required: true, message: "Missing correct img" }]}
                >
                  <Radio.Group onChange={onChange} value={value}>
                    <Radio value={true}>True</Radio>
                    <Radio value={false}>False</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "status"]}
                  rules={[{ required: true, message: "Missing status name" }]}
                >
                  <FormSelectField
                    size="large"
                    name="status"
                    options={courseStatusOptions as any}
                    // defaultValue={priceTypeOptions[0]}
                    label="status"
                    // placeholder="Select"
                    required={true}
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
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form>
  );
};

export default DynamicFormFiled;
