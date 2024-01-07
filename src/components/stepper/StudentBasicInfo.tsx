import { Col, Row } from "antd";
import FormInput from "../Forms/FormInput";
import FormDatePicker from "../Forms/FormDatePicker";
import FormSelectField from "../Forms/FormSelectField";
import FormTextArea from "../Forms/FormTextArea";
import { bloodGroupOptions } from "@/constants/global";
import React from "react";
import UploadImage from "../ui/UploadImage";

export default function StudentBasicInfo() {
  return (
    <div
      style={{
        border: "1px solid #d9d9d9",
        borderRadius: "5px",
        padding: "15px",
        marginBottom: "10px",
        marginTop: "10px",
      }}
    >
      <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
        <Col span={12} style={{ margin: "10px 0" }}>
          <FormInput
            type="text"
            name="name.firstName"
            label="First Name "
            size="large"
            required={true}
          />
        </Col>
        <Col span={12} style={{ margin: "10px 0" }}>
          <FormInput
            type="text"
            name="name.middleName"
            label="Middle Name "
            size="large"
          />
        </Col>
        <Col span={12} style={{ margin: "10px 0" }}>
          <FormInput
            type="text"
            name="name.lastName"
            label="Last Name "
            size="large"
          />
        </Col>
        <Col span={24} style={{ margin: "10px auto" }}>
          <UploadImage name="img"  />
        </Col>
        <Col span={24} style={{ margin: "10px 0" }}>
          <FormInput type="email" name="email" label="Email" size="large" />
        </Col>
        <Col span={24} style={{ margin: "10px 0" }}>
          <FormInput
            type="password"
            name="password"
            label="Password"
            size="large"
            required={true}
          />
        </Col>
      </Row>
    </div>
  );
}
