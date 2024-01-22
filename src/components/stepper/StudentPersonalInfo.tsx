import { Col, Row } from "antd";
import FormInput from "../Forms/FormInput";
import FormDatePicker from "../Forms/FormDatePicker";
import FormSelectField from "../Forms/FormSelectField";
import FormTextArea from "../Forms/FormTextArea";
import { bloodGroupOptions, genderOptions } from "@/constants/global";
import React from "react";

export default function StudentPersonalInfo() {
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
        <Col span={24} style={{ margin: "10px 0" }}>
          <FormInput
            type="text"
            name="address"
            size="large"
            label="Address"
            required={true}
          />
        </Col>
        <Col span={12} style={{ margin: "10px 0" }}>
          <FormSelectField
            size="large"
            name="gender"
            options={genderOptions}
            label="Gender"
            placeholder="Select"
            required={true}
          />
        </Col>
        <Col span={12} style={{ margin: "10px 0" }}>
          <FormSelectField
            size="large"
            name="bloodGroup"
            options={bloodGroupOptions}
            label="bloodGroup"
            // placeholder="Select"
            required={true}
          />
        </Col>

        <Col span={24} style={{ margin: "10px 0" }}>
          <FormDatePicker
            name="dateOfBirth"
            label="Date of birth"
            size="large"
            required={true}
          />
        </Col>

        <Col span={24} style={{ margin: "10px 0" }}>
          <FormInput
            type="number"
            name="phoneNumber"
            size="large"
            label="Phone Number"
            required={true}
          />
        </Col>
      </Row>
    </div>
  );
}
