"use client";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UploadImage from "@/components/ui/UploadImage";
import {
  bloodGroupOptions,
  genderOptions,
  roleOptions,
} from "@/constants/global";
import { useAddGeneralUserWithFormDataMutation } from "@/redux/api/adminApi/userManageApi";

import { adminSchema } from "@/schemas/student";

import { Error_model_hook, Success_model } from "@/utils/modalHook";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button, Col, Row, message } from "antd";

const UserCreateComponent = ({
  role = { label: "Please select role", value: "" },
}: {
  role?: {
    label: string;
    value: string;
  };
}) => {
  const [addGeneralUserWithFormData, { isLoading }] =
    useAddGeneralUserWithFormDataMutation();
console.log(role);
  const onSubmit = async (values: any) => {
    console.log(values);
    try {
      const res = await addGeneralUserWithFormData({ ...values }).unwrap();
      if (res?.success == false) {
        Error_model_hook(res?.message);
      } else {
        Success_model("Customar created successfully");
      }
      // message.success("Admin created successfully!");
    } catch (err: any) {
      console.error(err.message);
    }
  };
  if (isLoading) {
    return message.loading("Loading...");
  }

  return (
    <div
      style={{
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        borderRadius: "1rem",
        backgroundColor: "white",
        padding: "1rem",
      }}
    >
      {/* resolver={yupResolver(adminSchema)} */}
      <div>
        <Form submitHandler={onSubmit}>
          <div
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
              padding: "15px",
              marginBottom: "10px",
            }}
          >
            <p
              style={{
                marginBottom: "10px",
              }}
              className="font-semibold text-2xl text-center"
            >
              Create User
            </p>
            <hr className="border my-2" />
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col
                className="gutter-row"
                xs={24}
                md={12}
                lg={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="name"
                  size="large"
                  label="Full Name"
                  placeholder="Please enter a full name"
                  required={true}
                />
              </Col>
              <Col
                className="gutter-row"
                xs={24}
                md={12}
                lg={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="email"
                  name="email"
                  size="large"
                  label="Email address"
                  placeholder="please enter your email address"
                  required={true}
                />
              </Col>
              <Col
                className="gutter-row"
                xs={24}
                md={12}
                lg={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="password"
                  name="password"
                  placeholder="Please enter your password"
                  size="large"
                  label="Password"
                  required={true}
                />
              </Col>
              <Col
                className="gutter-row"
                xs={24}
                md={12}
                lg={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormSelectField
                  size="large"
                  name="role"
                  defaultValue={role}
                  disabled={!!role.value}
                  options={roleOptions}
                  label="role"
                  placeholder="Select"
                  required={true}
                />
              </Col>

              <Col
                className="gutter-row"
                xs={24}
                style={{
                  marginBottom: "10px",
                }}
              >
                <UploadImage name="image" />
              </Col>
            </Row>
          </div>

          {/* basic info */}
          <div
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
              padding: "15px",
              marginBottom: "10px",
            }}
          >
            <p
              style={{
                fontSize: "18px",
                marginBottom: "10px",
              }}
            >
              Basic Information
            </p>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col
                className="gutter-row"
                xs={24}
                md={12}
                lg={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormSelectField
                  size="large"
                  name="gender"
                  options={genderOptions}
                  defaultValue={{ label: "Please select gender", value: "" }}
                  label="Gender"
                  placeholder="Select"
                  required={true}
                />
              </Col>

              <Col
                className="gutter-row"
                xs={24}
                md={12}
                lg={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="phoneNumber"
                  size="large"
                  label="Phone Number"
                  placeholder="Please enter a phone number"
                  required={true}
                />
              </Col>
              <Col
                className="gutter-row"
                xs={24}
                md={12}
                lg={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormDatePicker
                  name="dateOfBirth"
                  label="Date of birth"
                  size="large"
                />
              </Col>

              <Col xs={24} md={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  placeholder="Please enter your address"
                  name="address"
                  label="Address"
                  rows={4}
                />
              </Col>
              <Col xs={24} md={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  placeholder="Please enter your description"
                  name="description"
                  label="Description"
                  rows={4}
                />
              </Col>
            </Row>
          </div>
          <Button htmlType="submit" type="default">
            Create
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default UserCreateComponent;
