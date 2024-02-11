"use client";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import ButtonLoading from "@/components/ui/Loading/ButtonLoading";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UploadImage from "@/components/ui/UploadImage";
import { bloodGroupOptions, genderOptions } from "@/constants/global";
import uploadImgBB from "@/hooks/UploadSIngleImgBB";
import { removeNullUndefinedAndFalsey } from "@/hooks/removeNullUndefinedAndFalsey";
import { useAddStudentWithFormDataMutation } from "@/redux/api/adminApi/studentApi";
import { useAddTrainerWithFormDataMutation } from "@/redux/api/adminApi/trainerApi";
import { trainerSchema } from "@/schemas/trainer";
// import { useAddGeneralUserWithFormDataMutation } from "@/redux/api/adminApi/userManageApi";

import { ITrainerCreate } from "@/types/userTypes";

import { Error_model_hook, Success_model } from "@/utils/modalHook";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button, Col, Row, Upload, message } from "antd";

const CreateTrainer = ({ open, setOpen }: any) => {
  const [addTrainerWithFormData, { isLoading }] =
    useAddTrainerWithFormDataMutation();

  const onSubmit = async (values: any) => {
    // console.log(values.img, "values of student");
    removeNullUndefinedAndFalsey(values);
    const { password, ...value } = values;
    // Success_model("Customer created successfully");

    try {
      const res = await addTrainerWithFormData({
        password,
        trainer: { ...value },
      }).unwrap();

      if (res?.success == false) {
        Error_model_hook(res?.message);
      } else {
        Success_model("Trainer created successfully");
        setOpen(false);
      }
      // message.success("Admin created successfully!");
    } catch (err: any) {
      console.error(err);
      Error_model_hook(err?.message || err?.data);
    }
  };

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
      <h1 className="text-base font-normal">Create Trainer</h1>
      {/* resolver={yupResolver(adminSchema)} */}
      <div>
        <Form
          submitHandler={onSubmit}
          resolver={yupResolver(trainerSchema)}
          defaultValues={{
            gender: genderOptions[0].value,
          }}
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
              Trainer Information
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
                xs={12}
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
                  required={true}
                  options={[
                    //@ts-ignore
                    { value: "male" },
                    //@ts-ignore
                    { value: "female" },
                    //@ts-ignore
                    { value: "other" },
                  ]}
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
                  required={true}
                />
              </Col>

              <Col span={24} style={{ margin: "10px 0" }}>
                <FormTextArea name="user_bio" label="User bio" rows={4} />
              </Col>
            </Row>
          </div>
          {isLoading ? (
            <ButtonLoading />
          ) : (
            <Button htmlType="submit" type="default">
              Create
            </Button>
          )}
        </Form>
      </div>
    </div>
  );
};

export default CreateTrainer;
