"use client";
import React from "react";
import { Form, Button, Input, Select, message, Space } from "antd";
import { UserOutlined, FormOutlined, HomeOutlined } from "@ant-design/icons";

const { Option } = Select;
// import formBg from "@/assets/BG/fomrBg.png";
import { useGetAllCategoryQuery } from "@/redux/api/adminApi/categoryApi";
import { Error_model_hook } from "@/utils/modalHook";

export default function SUbscriptionForm() {
  //! for Category options selection
  const { data: Category, isLoading } = useGetAllCategoryQuery({
    status: "active",
  });
  const CategoryData = Category?.data;
  // console.log(CategoryData)
  const CategoryOptions = CategoryData?.map((item: any) => {
    return {
      label: item?.title,
      value: item?._id,
      img: item?.img,
    };
  });

  const onFinish = (value: any) => {
    console.log(
      "🚀 ~ file: SUbscriptionForm.tsx:10 ~ onFinish ~ value:",
      value
    );
    message.success("Joined SuccessFully");
    return {};
  };

  return (
    <div
      className="w-full mx-auto py-5"
      style={{
        backgroundImage: `url('/banner/fomrBg.png')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      <h2 className="text-2xl font-bold text-center  ">Join Now</h2>
      <div className="w-full  lg:max-w-4xl   mx-auto">
        <Form
          name="form"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 12 }}
          onFinish={onFinish}
          onFinishFailed={() => Error_model_hook("Please fill in the detail")}
          initialValues={{ remember: true }}
          layout="horizontal"
          style={{
            marginBlock: "10px",
            background: "white",
            padding: "18px",
            borderRadius: "8px",
            // maxWidth: "1020px",
            // marginInline: "auto",
          }}
        >
          <div className="flex items-center gap-3 mt-5 mb-2">
            <UserOutlined style={{ fontSize: "1rem" }} />
            <h3 className="text-md text-slate-600  whitespace-nowrap">
              Your Contact Information
            </h3>
            {/* <Divider /> */}
          </div>
          <Form.Item
            style={{}}
            label="Name"
            name="username"
            rules={[{ required: true, message: "Please enter username" }]}
          >
            {/* <label className="text-xl font-[500]">Your Name</label> */}
            <Input />
          </Form.Item>
          <Form.Item
            style={{}}
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter email" }]}
          >
            {/* <label className="text-xl font-[500] ">Your Email</label> */}
            <Input type="email" />
          </Form.Item>
          <Form.Item
            style={{}}
            label="Phone Number"
            name="phoneNumber"
            rules={[{ required: true, message: "Please enter phoneNumber" }]}
          >
            {/* <label className="text-xl font-[500] ">Your phoneNumber</label> */}
            <Input type="number" />
          </Form.Item>
          <Form.Item
            style={{}}
            label={<span>please select Position</span>}
            name="position"
            rules={[{ required: true, message: "Please select your Position" }]}
          >
            {/* <label className="text-xl font-[500] ">Select position</label> */}
            <Select>
              <Option value="User">User</Option>
              <Option value="Seller">Seller</Option>
              <Option value="Moderator">Moderator</Option>
              <Option value="Admin">Admin</Option>
            </Select>
          </Form.Item>

          <div className="flex items-center gap-3 mt-5 mb-2">
            <HomeOutlined style={{ fontSize: "1rem" }} />
            <h3 className="text-md text-slate-600  whitespace-nowrap">
              Your Country Information
            </h3>
            {/* <Divider /> */}
          </div>

          <Form.Item
            style={{}}
            label={<span>Please select Country</span>}
            name="country"
            rules={[{ required: true, message: "Please select your gender" }]}
          >
            {/* <label className="text-xl font-[500] ">Select Country</label> */}
            <Select>
              <Option value="Female">Bangladesh</Option>
              <Option value="Male">India</Option>
              <Option value="Male">USA</Option>
            </Select>
          </Form.Item>

          <Form.Item
            style={{}}
            label="Enter zip"
            name="zip"
            rules={[{ required: true, message: "Please enter zip" }]}
          >
            {/* <label className="text-xl font-[500] ">Zip Code</label> */}
            <Input type="number" />
          </Form.Item>

          <Form.Item
            style={{}}
            label="Enter district"
            name="district"
            rules={[{ required: true, message: "Please enter district" }]}
          >
            {/* <label className="text-xl font-[500] ">Zip Code</label> */}
            <Input />
          </Form.Item>

          {/* //! Implementation Secion */}
          <div className="flex items-center gap-3 mt-5 mb-2">
            <FormOutlined style={{ fontSize: "1rem" }} />
            <h3 className="text-md text-slate-600  whitespace-nowrap">
              Your Implementation
            </h3>
            {/* <Divider /> */}
          </div>

          <Form.Item
            style={{}}
            label={<span>Please select License</span>}
            name="license"
            rules={[{ required: true, message: "Please select your license" }]}
          >
            {/* <label className="text-xl font-[500] ">Select position</label> */}
            <Select>
              <Option value="User">User</Option>
              <Option value="Seller">Seller</Option>
              <Option value="Moderator">Moderator</Option>
              <Option value="Admin">Admin</Option>
            </Select>
          </Form.Item>

          <Form.Item
            style={{}}
            label="category"
            name="category"
            rules={[{ required: true, message: "Please enter category" }]}
          >
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="select one category"
              //   defaultValue={["china"]}
              //   onChange={handleChange}
              loading={isLoading}
              optionLabelProp="label"
              options={CategoryOptions}
              optionRender={(option) => (
                <Space>
                  <span role="img" aria-label={option.data.label}>
                    {option?.label}
                  </span>
                </Space>
              )}
            />
          </Form.Item>

          <Form.Item
            style={{}}
            label="Enter Levels"
            name="levels"
            rules={[{ required: true, message: "Please enter levels" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            style={{}}
            label="Number of Students"
            name="students"
            rules={[{ required: true, message: "Please enter Students" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            style={{}}
            label="Number of Teacher"
            name="teacher"
            rules={[{ required: true, message: "Please enter Teacher" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            style={{}}
            label="Share your Plan Please (optional)"
            name="plan"
          // rules={[{ required: false, message: "Please enter Teacher" }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item style={{}}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
