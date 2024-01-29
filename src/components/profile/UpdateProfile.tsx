"use client";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";

import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UploadImage from "@/components/ui/UploadImage";
import { bloodGroupOptions, genderOptions } from "@/constants/global";
import { USER_ROLE } from "@/constants/role";
import { useUpdateAdminMutation } from "@/redux/api/adminApi";
import {
  useGetProfileQuery,
  useUserLoginMutation,
} from "@/redux/api/auth/authApi";
import {
  useAddGeneralUserWithFormDataMutation,
  useUpdateGeneralUserMutation,
} from "@/redux/api/adminApi/userManageApi";


import { IDecodedInfo, getUserInfo, storeUserInfo } from "@/services/auth.service";

import { Error_model_hook, Success_model } from "@/utils/modalHook";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button, Col, Image, Row, Space, Spin, message } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingForDataFetch from "../Utlis/LoadingForDataFetch";
import { NO_IMAGE } from "@/constants/filePatch";
import { useUpdateSuperAdminMutation } from "@/redux/api/superAdminApi";
import { removeNullUndefinedAndFalsey } from "@/hooks/removeNullUndefinedAndFalsey";

const UpdateProfile = () => {
  const [user, setUserData] = useState<any>({});
  const [userLoading, setUserLoading] = useState<boolean>(true);
  const userInfo =getUserInfo() as IDecodedInfo
  useEffect(() => {
    setUserData(getUserInfo() as any);
    setUserLoading(false);
    return () => {};
  }, []);
  const { data = {}, isLoading: profileLoading } = useGetProfileQuery("");
  console.log(data);
  const userData = data?.generalUser || data?.admin || data?.superAdmin;
  const [updateGeneralUser, { isLoading }] = useUpdateGeneralUserMutation();
  const [updateAdmin, { isLoading: updateAdminLoader }] =
    useUpdateAdminMutation();
  const [updateSuperAdmin, { isLoading: updateSuperAdminLoader }] =
    useUpdateSuperAdminMutation();

  const onSubmit = async (values: any) => {
    console.log(user);
    removeNullUndefinedAndFalsey(values);
    try {
      let res;
      if (user?.role === USER_ROLE.STUDENT) {
        res = await updateGeneralUser({
          id: userData?._id,
          body: values,
        }).unwrap();
      } else if (user?.role === USER_ROLE.ADMIN) {
        res = await updateAdmin({
          id: userData?._id,
          body: values,
        }).unwrap();
      } else if (user?.role === USER_ROLE.SUPER_ADMIN) {
        console.log(user);
        res = await updateSuperAdmin({
          id: userData?._id,
          body: values,
        }).unwrap();
      }
      if (res?.success == false) {
        Error_model_hook(res?.message);
      } else {
        Success_model("Profile update  successfully");
      }
      // message.success("Admin created successfully!");
    } catch (err: any) {
      console.error(err);
      Error_model_hook(err?.message || err?.data)
    }
  };
  if (
    isLoading ||
    userLoading ||
    updateAdminLoader ||
    profileLoading ||
    updateSuperAdminLoader
  ) {
    return <LoadingForDataFetch />;
  }
  const defaultValues = {
    name: userData?.name || "",
    email: userData?.email || "",
    phoneNumber: userData?.phoneNumber || "",
    profileImage: userData?.profileImage || "",
    gender: userData?.gender || "",
    dateOfBirth: userData?.dateOfBirth || "",
    address: userData?.address || "",
    description: userData?.description || "",
  };

  return (
    <div>
      {/* resolver={yupResolver(adminSchema)} */}
      <div className="container mx-auto p-5">
        <Form submitHandler={onSubmit} defaultValues={defaultValues}>
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
                  disabled={true}
                  //   readOnly={true}
                />
              </Col>

              <Col
                className="gutter-row"
                xs={24}
                
                style={{
                  marginBottom: "10px",
                }}
              >
                <div className="flex justify-start items-start gap-4">
                  <UploadImage name="profileImage" />
                  <Image
                    src={defaultValues?.profileImage || NO_IMAGE}
                    width={300}
                    height={300}
                    style={{ width: "80px", height: "80px" }}
                    alt=""
                  />
                </div>
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
            {isLoading ? (
              <Spin></Spin>
            ) : (
              <Button size="large" htmlType="submit"   type="default">
                Update
              </Button>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
};

export default UpdateProfile;
