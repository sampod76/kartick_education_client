"use client";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField, {
  SelectOptions,
} from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import LoadingForDataFetch from "@/components/Utlis/LoadingForDataFetch";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UploadImage from "@/components/ui/UploadImage";
import { bloodGroupOptions, genderOptions } from "@/constants/global";
import { removeNullUndefinedAndFalsey } from "@/hooks/removeNullUndefinedAndFalsey";
import { useUpdateAdminMutation } from "@/redux/api/adminApi";
import { useGetSingleAdminQuery } from "@/redux/api/adminApi/adminApi";

import { useGetAllCategoryQuery } from "@/redux/api/adminApi/categoryApi";

import { Error_model_hook, Success_model } from "@/utils/modalHook";

import { Button, Col, Row, message } from "antd";
import Image from "next/image";
import { useState } from "react";

const EditAdminPage = ({ params }: any) => {
  const { data: singleAdmin, isLoading } = useGetSingleAdminQuery(params?.id);
  const AdminData = singleAdmin;

  const { data: categoryData = [] } = useGetAllCategoryQuery({});
  const [isReset, setIsReset] = useState(false);
  // console.log(AdminData, "Admin data");

  const [updateAdmin, { isLoading: updateLoading, error }] =
    useUpdateAdminMutation();

  const onSubmit = async (values: any) => {
    removeNullUndefinedAndFalsey(values);
    const UpdateValues = {
      ...values,
    };
    // console.log(UpdateValues);
    try {
      const res = await updateAdmin({
        id: params?.id,
        data: UpdateValues,
      }).unwrap();
      console.log(res);
      if (res?.success == false) {
        Error_model_hook(res?.message);
      } else {
        Success_model("successfully updated data");
        setIsReset(true)
      }
    } catch (err: any) {
      console.error(err);
      Error_model_hook(err?.message || err?.data)
    }
  };
  if (isLoading || updateLoading) {
    return <LoadingForDataFetch />;
  }
  if (error) {
    console.log(error);
  }

  console.log(AdminData);

  const defaultValues = {
    name: {
      firstName: AdminData?.name.firstName || "",
      lastName: AdminData?.name.lastName || "",
      middleName: AdminData?.middleName || "",
    },
    gender: AdminData?.gender || "",
    // dateOfBirth: AdminData?.dateOfBirth || "",
    email: AdminData?.email || "",
    phoneNumber: AdminData?.phoneNumber || "",
    bloodGroup: AdminData?.bloodGroup || "", // Optional blood group
    address: AdminData?.address || "",
    img: AdminData?.img || "",
  };

  console.log(defaultValues);

  return (
    <div>
      <div>
        {/* resolver={yupResolver(adminSchema)} */}
        {/* resolver={yupResolver(IServiceSchema)} */}
        <Form submitHandler={onSubmit} defaultValues={defaultValues} isReset={isReset}>
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
              Admin Information
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
                  name="name.firstName"
                  size="large"
                  label="First Name"
                  required={true}
                />
                <FormInput
                  type="text"
                  name="name.middleName"
                  size="large"
                  label="Middle Name"
                  // required={true}
                />
                <FormInput
                  type="text"
                  name="name.lastName"
                  size="large"
                  label="Last Name"
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
                <FormSelectField
                  size="large"
                  name="bloodGroup"
                  defaultValue={defaultValues?.gender}
                  options={bloodGroupOptions}
                  label="bloodGroup"
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
                <UploadImage defaultImage={defaultValues?.img} name="img" />
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
                  type="text"
                  name="address"
                  size="large"
                  label="Address"
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
                />
              </Col>

              <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea name="address" label="Address" rows={4} />
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

export default EditAdminPage;

{
  /* <FormSelectField
  name="category"
  label="Select Category"
  required={true}
  options={
    //@ts-ignore
    categoryData?.data?.map((e) => ({
      value: e._id,
      label: e.title,
    }))
  }
/> */
}
