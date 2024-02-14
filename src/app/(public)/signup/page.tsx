"use client";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import ButtonLoading from "@/components/ui/Loading/ButtonLoading";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UploadImage from "@/components/ui/UploadImage";
import { genderOptions, roleOptions } from "@/constants/global";
import { USER_ROLE } from "@/constants/role";
import { useAddAdminWithFormDataMutation } from "@/redux/api/adminApi";
import { useAddSellerWithFormDataMutation } from "@/redux/api/adminApi/sellerApi";
import { useAddStudentWithFormDataMutation } from "@/redux/api/adminApi/studentApi";
import { getUserInfo, storeUserInfo } from "@/services/auth.service";

import { Error_model_hook, Success_model } from "@/utils/modalHook";

import { Button, Col, Row, message } from "antd";

import { useEffect, useState } from "react";
import { IDecodedInfo } from "../../../services/auth.service";
import { useRouter } from "next/navigation";
import LoadingForDataFetch from "@/components/Utlis/LoadingForDataFetch";
import { removeNullUndefinedAndFalsey } from "@/hooks/removeNullUndefinedAndFalsey";
import { useUserLoginMutation } from "@/redux/api/auth/authApi";
import BannerSignUp from '@/components/Home/Banner&hero/BannerSignup'
const SignUpTeacherAndStudent = ({ setOpen }: any) => {
  console.log("🚀 ~ SignUpTeacherAndStudent ~ setOpen:", setOpen)
  const router = useRouter();
  const [isReset, setIsReset] = useState(false);
  const [userLogin, { error, isLoading: LoginLoading }] =
    useUserLoginMutation();
  const [addStudentUserWithFormData, { isLoading: StudentLoading }] =
    useAddStudentWithFormDataMutation();
  const [addSellerUserWithFormData, { isLoading: SellerLoading }] =
    useAddSellerWithFormDataMutation();
  const [loading, setLoading] = useState(true);
  const userInfo = getUserInfo() as IDecodedInfo;
  useEffect(() => {
    if (userInfo.id) {
      router.back();
    }
    setLoading(false);
    return () => { };
  }, [router, userInfo]);

  if (loading) {
    return <LoadingForDataFetch />;
  }

  const onSubmit = async (values: any) => {
    console.log("🚀 ~ onSubmit ~ values:", values);
    removeNullUndefinedAndFalsey(values);

    try {
      let res;
      if (values?.role === USER_ROLE.STUDENT) {
        const { password, ...allValue } = values;
        const modifyValue = {
          password: password,
          [USER_ROLE.STUDENT]: { ...allValue },
        };
        res = await addStudentUserWithFormData({ ...modifyValue }).unwrap();
      } else if (values?.role === USER_ROLE.SELLER) {
        const { password, ...allValue } = values;
        const modifyValue = {
          password: password,
          [USER_ROLE.SELLER]: { ...allValue },
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
        try {
          const res = await userLogin({
            email: values?.email,
            password: values?.password,
          }).unwrap();
          if (res?.accessToken) {
            // router.push("/profile");
            message.success("User logged in successfully!");
            storeUserInfo({ accessToken: res?.accessToken });

            // setOpen(false)
          } else {
            Error_model_hook(res?.message);
          }
        } catch (err: any) {
          Error_model_hook(err?.data || err?.message);
          console.log(err);
        }
        router.push("/login");
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
    <div className="">
      <div className="-mt-[2rem] mb-4 lg:mb-6 ">
        <div className="w-full min-h-[3.3rem] bg-[#BEDDF9]"></div>
        <BannerSignUp />
      </div>
      {/* resolver={yupResolver(adminSchema)} */}
      <div className="container mx-auto p-5 bg-white rounded-lg shadow-2xl">
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
              Registration
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
                  // defaultValue={role}
                  // disabled={!!role.value}
                  options={[
                    { label: "Teacher", value: "seller" },
                    { label: "Student", value: "student" },
                  ]}
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
                  marginBottom: "px",
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
                  disablePrevious={false}
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
          <div className="flex justify-center items-center">
            {StudentLoading || SellerLoading ? (
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

export default SignUpTeacherAndStudent;
