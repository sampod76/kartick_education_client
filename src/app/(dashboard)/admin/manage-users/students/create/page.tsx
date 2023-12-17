"use client";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UploadImage from "@/components/ui/UploadImage";
import { bloodGroupOptions, genderOptions } from "@/constants/global";
import uploadImgBB from "@/hooks/imgbbUploads";
import { useAddStudentWithFormDataMutation } from "@/redux/api/adminApi/studentApi";
// import { useAddGeneralUserWithFormDataMutation } from "@/redux/api/adminApi/userManageApi";
import { IStudentCreate } from "@/schemas/studentSchema";

import { adminSchema, createStudentSchema } from "@/schemas/student";

import { Error_model_hook, Success_model } from "@/utils/modalHook";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button, Col, Row, Upload, message } from "antd";

const CreateGeneralUserPage = () => {
  const [addStudentWithFormData, { isLoading }] =
    useAddStudentWithFormDataMutation();

  const onSubmit = async (values: IStudentCreate) => {
    // console.log(values.img, "values of student");
    let { img, ...others } = values;

    const imageUrl = await uploadImgBB(values.img);

    // console.log(imageUrl, "image url");

    img = imageUrl;

    const studentData = {
      password: "1234asdf",
      student: { img: imageUrl, ...others },
    };

    console.log(studentData, "student");

    // Success_model("Customer created successfully");

    try {
      const res = await addStudentWithFormData({ ... studentData }).unwrap();
      console.log(res, "response");
      if (res?.success == false) {
        Error_model_hook(res?.message);
      } else {
        Success_model("Customer created successfully");
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
    <div>
      <h1>Create Customer/normal user</h1>
      {/* resolver={yupResolver(adminSchema)} */}
      <div>
        <Form
          submitHandler={onSubmit}
          // resolver={yupResolver(createStudentSchema)}
        >
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
                  options={bloodGroupOptions}
                  label="bloodGroup"
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
                <UploadImage name="img" />
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

export default CreateGeneralUserPage;
