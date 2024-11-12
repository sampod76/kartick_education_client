"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import UploadImage from "@/components/ui/UploadImage";
import LoadingForDataFetch from "@/components/Utlis/LoadingForDataFetch";
import { genderOptions } from "@/constants/global";
import { removeNullUndefinedAndFalsey } from "@/hooks/removeNullUndefinedAndFalsey";
import {
  useGetSingleStudentQuery,
  useUpdateStudentMutation,
} from "@/redux/api/adminApi/studentApi";
import dayjs from "dayjs";

// import {}

import { Error_model_hook, Success_model } from "@/utils/modalHook";

import {
  Button,
  Col,
  DatePicker,
  DatePickerProps,
  Row,
  Typography,
} from "antd";
import { useState } from "react";

const EditStudentComponent = ({ id }: { id: string }) => {
  const [otherData, setOtherData] = useState<any>({
    imageLoading: false,
    dateOfBirth: "",
  });
  const { data: singleStudent, isLoading } = useGetSingleStudentQuery(id, {
    skip: !Boolean(id),
  });
  const studentData = singleStudent;
  console.log("🚀 ~ EditStudentComponent ~ studentData:", studentData);

  // console.log(studentData, id);

  const [updateStudent, { isLoading: updateLoading, error }] =
    useUpdateStudentMutation();

  const onSubmit = async (values: any) => {
    removeNullUndefinedAndFalsey(values);
    const UpdateValues = {
      ...values,
    };
    if (otherData.dateOfBirth) {
      UpdateValues.dateOfBirth = dayjs(otherData.dateOfBirth).format(
        "YYYY-MM-DD"
      );
    }
    // console.log(UpdateValues);
    try {
      const res = await updateStudent({
        id: id,
        data: UpdateValues,
      }).unwrap();
      // console.log(res);
      if (res?.success == false) {
        Error_model_hook(res?.message);
      } else {
        Success_model("successfully updated data");
      }
    } catch (err: any) {
      console.error(err);
      Error_model_hook(err?.message || err?.data);
    }
  };
  if (isLoading || updateLoading) {
    return <LoadingForDataFetch />;
  }
  if (error) {
    // console.log(error);
  }

  // console.log(studentData);

  const defaultValues = {
    name: {
      firstName: studentData?.name.firstName || "",
      lastName: studentData?.name.lastName || "",
    },
    gender: studentData?.gender || "",
    // dateOfBirth: studentData?.dateOfBirth || "",
    email: studentData?.email || "",
    phoneNumber: studentData?.phoneNumber || "",
    bloodGroup: studentData?.bloodGroup || "", // Optional blood group
    address: studentData?.address || "",
    img: studentData?.img || "",
  };
  const selectDate: DatePickerProps["onChange"] = (date, dateString) => {
    // console.log(date, dateString);
    setOtherData((c: any) => ({ ...c, dateOfBirth: dateString }));
  };
  // Function to disable future dates
  const disableFutureDates = (current: any) => {
    // Disable dates after today
    return current && current > dayjs().endOf("day");
  };
  return (
    <div>
      <div>
        {/* resolver={yupResolver(adminSchema)} */}
        {/* resolver={yupResolver(IServiceSchema)} */}
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
            >
              Student Information
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
                />

                <FormInput
                  type="text"
                  name="name.lastName"
                  size="large"
                  label="Last Name"
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
                  readOnly={true}
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
                />
              </Col>

              {/* <Col
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
                />
              </Col> */}
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
                {/* <FormDatePicker
                  name="dateOfBirth"
                  label="Date of birth"
                  size="large"
                  disablePrevious={false}
                /> */}
                <Typography.Text style={{ fontSize: "16px" }}>
                  Select date of birth
                </Typography.Text>
                <DatePicker
                  disabledDate={disableFutureDates}
                  allowClear
                  onChange={selectDate}
                  size="large"
                  defaultValue={
                    dayjs(studentData?.dateOfBirth) || dayjs(new Date())
                  }
                  placeholder="Select date of birth"
                  format="YYYY-MM-DD"
                  style={{ marginBottom: "10px", width: "100%" }}
                />
              </Col>

              <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea name="address" label="Address" rows={4} />
              </Col>
            </Row>
          </div>
          <div className="flex justify-center items-center">
            <Button htmlType="submit" type="default">
              Update
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EditStudentComponent;

{
  /* <FormSelectField
  name="category"
  label="Select Category"
  
  options={
    //@ts-ignore
    categoryData?.data?.map((e) => ({
      value: e._id,
      label: e.title,
    }))
  }
/> */
}
