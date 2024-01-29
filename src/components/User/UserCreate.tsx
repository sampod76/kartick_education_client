"use client";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UploadImage from "@/components/ui/UploadImage";
import { genderOptions, roleOptions } from "@/constants/global";
import { USER_ROLE } from "@/constants/role";
import { useAddAdminWithFormDataMutation } from "@/redux/api/adminApi";
import { useAddSellerWithFormDataMutation } from "@/redux/api/adminApi/sellerApi";
import { useAddStudentWithFormDataMutation } from "@/redux/api/adminApi/studentApi";

import { Error_model_hook, Success_model } from "@/utils/modalHook";

import { Button, Col, Row, message } from "antd";
import ButtonLoading from "../ui/Loading/ButtonLoading";
import { useState } from "react";
import { removeNullUndefinedAndFalsey } from "@/hooks/removeNullUndefinedAndFalsey";

const UserCreateComponent = ({
  role = { label: "Please select role", value: "" },
}: {
  role?: {
    label: string;
    value: string;
  };
}) => {
  const [isReset, setIsReset] = useState(false);
  const [addAdminUserWithFormData, { isLoading: AdminLoading }] =
    useAddAdminWithFormDataMutation();
  const [addStudentUserWithFormData, { isLoading: StudentLoading }] =
    useAddStudentWithFormDataMutation();
  const [addSellerUserWithFormData, { isLoading: SellerLoading }] =
    useAddSellerWithFormDataMutation();

  const onSubmit = async (values: any) => {
    removeNullUndefinedAndFalsey(values);
    try {
      let res;
      if (role.value === USER_ROLE.ADMIN) {
        const { password, ...allValue } = values;
        const modifyValue = {
          password: password,
          [USER_ROLE.ADMIN]: { ...allValue },
        };

        res = await addAdminUserWithFormData({ ...modifyValue }).unwrap();
      } else if (role.value === USER_ROLE.STUDENT) {
        const { password, ...allValue } = values;
        const modifyValue = {
          password: password,
          [USER_ROLE.STUDENT]: { ...allValue },
        };
        res = await addStudentUserWithFormData({ ...modifyValue }).unwrap();
      } else if (role.value === USER_ROLE.SELLER) {
        const { password, ...allValue } = values;
        const modifyValue = {
          password: password,
          [USER_ROLE.SELLER]: { ...allValue },
        };
        res = await addSellerUserWithFormData({ ...modifyValue }).unwrap();
      } else if (role.value === USER_ROLE.TRAINER) {
        const { password, ...allValue } = values;
        const modifyValue = {
          password: password,
          [USER_ROLE.TRAINER]: { ...allValue },
        };
        res = await addSellerUserWithFormData({ ...modifyValue }).unwrap();
      } else {
        res = {
          success: false,
          message: "not found",
        };
      }

      if (res?.success == false) {
        Error_model_hook(res?.message);
      } else {
        Success_model("User created successfully");
        setIsReset(true);
      }
      // message.success("Admin created successfully!");
    } catch (err: any) {
      console.error(err);
      Error_model_hook(err?.message || err?.data);
    }
  };
  // if (AdminLoading || StudentLoading || SellerLoading) {
  //   message.loading("Loading...");
  //   return
  // }

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
        <Form submitHandler={onSubmit} isReset={isReset}>
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
              Create User ({role.value})
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
                  name="name.firstName"
                  size="large"
                  label="First Name"
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
                  type="text"
                  name="name.lastName"
                  size="large"
                  label="Last Name"
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
                  type="number"
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
          <div>
            {AdminLoading || StudentLoading || SellerLoading ? (
              <ButtonLoading />
            ) : (
              <Button htmlType="submit" type="default">
                Create
              </Button>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
};

export default UserCreateComponent;
