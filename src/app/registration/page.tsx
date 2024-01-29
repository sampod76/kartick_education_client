"use client";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
// import HomeHeader from "@/components/Home/HomeHeader";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UploadImage from "@/components/ui/UploadImage";
import { bloodGroupOptions, genderOptions } from "@/constants/global";
import { useUserLoginMutation } from "@/redux/api/auth/authApi";
import { useAddGeneralUserWithFormDataMutation } from "@/redux/api/adminApi/userManageApi";


import { storeUserInfo } from "@/services/auth.service";

import { Error_model_hook, Success_model } from "@/utils/modalHook";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button, Col, Row, Space, Spin, message } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { removeNullUndefinedAndFalsey } from "@/hooks/removeNullUndefinedAndFalsey";

const Registration = () => {
  const [addGeneralUserWithFormData, { isLoading }] =
    useAddGeneralUserWithFormDataMutation();
  const [userLogin, { isLoading: userLoginLoading }] = useUserLoginMutation();
  const router = useRouter();
  const [isReset, setIsReset] = useState(false);
  const onSubmit = async (values: any) => {
    console.log(values);
    removeNullUndefinedAndFalsey(values);
    try {
      const res = await addGeneralUserWithFormData({ ...values }).unwrap();
      if (res?.success == false) {
        Error_model_hook(res?.message);
      } else {
        Success_model("Registration  successfully");

        setIsReset(true)

        const res = await userLogin({
          email: values?.email,
          password: values?.password,
        }).unwrap();
        console.log(res);
        if (res?.accessToken) {
          router.push("/");
          message.success("User logged in successfully!");
          storeUserInfo({ accessToken: res?.accessToken });
        } else {
          Error_model_hook(res?.message);
        }
      }
      // message.success("Admin created successfully!");
    } catch (err: any) {
      console.error(err);
      Error_model_hook(err?.message || err?.data)
    }
  };
  // if (isLoading || userLoginLoading) {
  //   return message.loading("Loading...");
  // }

  return (
    <div>
      {/* <HomeHeader /> */}

      {/* resolver={yupResolver(adminSchema)} */}
      <div className="container mx-auto p-5">
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
                fontSize: "18px",
                marginBottom: "10px",
              }}
              className="text-lg text-center"
            >
              Account Registration
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
                <FormInput
                  type="text"
                  name="name"
                  size="large"
                  label="Full Name"
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
                  size="large"
                  label="Password"
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
                  disablePrevious={false}
                />
              </Col>

              <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea name="address" label="Address" rows={4} />
              </Col>
              <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea name="description" label="Description" rows={4} />
              </Col>
            </Row>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {isLoading || userLoginLoading ? (
              <Spin></Spin>
            ) : (
              <Button size="large" htmlType="submit"   type="default">
                Create
              </Button>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Registration;
