"use client";
import React, { useState } from "react";
import { Form, Input, Button, Select, Progress } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

const { Option } = Select;

const Form1 = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <h2
        style={{
          fontSize: "30px",
          textAlign: "center",
          fontWeight: "bold",
          padding: "20px",
        }}
      >
        User Registration
      </h2>
      <div style={{ display: "flex" }}>
        <Form.Item style={{ marginRight: "5%" }}>
          <Input placeholder="First name" />
        </Form.Item>

        <Form.Item>
          <Input placeholder="Last name" />
        </Form.Item>
      </div>

      <Form.Item>
        <Input type="email" placeholder="Email address" />
        <p style={{ color: "gray" }}>We&apos;ll never share your email.</p>
      </Form.Item>

      <Form.Item>
        <Form.Item>
          <Input.Password
            placeholder="Enter password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
      </Form.Item>
    </>
  );
};

const Form2 = () => {
  return (
    <>
      <h2
        style={{
          fontSize: "30px",
          textAlign: "center",
          fontWeight: "bold",
          padding: "20px",
        }}
      >
        User Details
      </h2>
      <Form.Item>
        <Select placeholder="Select option">
          <Option value="United States">United States</Option>
          <Option value="Canada">Canada</Option>
          <Option value="Mexico">Mexico</Option>
        </Select>
      </Form.Item>

      <Form.Item style={{ marginTop: "2%" }}>
        <Input
          type="text"
          name="street_address"
          autoComplete="street-address"
          placeholder="Street address"
        />
      </Form.Item>

      <Form.Item style={{ marginTop: "2%" }}>
        <Input type="text" name="city" autoComplete="city" placeholder="City" />
      </Form.Item>

      <Form.Item style={{ marginTop: "2%" }}>
        <Input
          type="text"
          name="state"
          autoComplete="state"
          placeholder="State / Province"
        />
      </Form.Item>

      <Form.Item style={{ marginTop: "2%" }}>
        <Input
          type="text"
          name="postal_code"
          autoComplete="postal-code"
          placeholder="ZIP / Postal"
        />
      </Form.Item>
    </>
  );
};

const Form3 = () => {
  return (
    <>
      <h2
        style={{
          fontSize: "30px",
          textAlign: "center",
          fontWeight: "bold",
          padding: "20px",
        }}
      >
        Social Handles
      </h2>
      <Form.Item>
        <Form.Item>
          <Input style={{ width: "30%" }} placeholder="http://" />
          <Input
            style={{ width: "70%" }}
            type="tel"
            placeholder="www.example.com"
          />
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <Input.TextArea
          placeholder="Brief description for your profile. URLs are hyperlinked."
          rows={3}
        />
      </Form.Item>
    </>
  );
};

export default function CreateStudent() {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);

  const handleStepChange = (nextStep: any) => {
    setStep(nextStep);
    setProgress((nextStep - 1) * 33.33);
  };

  const handleFinalSubmit = () => {
    // Handle final submission logic here
  };

  return (
    <>
      <Form style={{ padding: "40px" }}>
        <Progress percent={progress} showInfo={false} />
        {step === 1 ? <Form1 /> : step === 2 ? <Form2 /> : <Form3 />}
        <div style={{ marginTop: "5%", width: "100%" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex" }}>
              <Button
                onClick={() => handleStepChange(step - 1)}
                disabled={step === 1}
                type="primary"
                ghost
                style={{ width: "7rem", marginRight: "5%" }}
              >
                Back
              </Button>
              <Button
                onClick={() => handleStepChange(step + 1)}
                disabled={step === 3}
                style={{ width: "7rem" }}
              >
                Next
              </Button>
            </div>
            {step === 3 && (
              <Button
                onClick={handleFinalSubmit}
                type="primary"
                style={{ width: "7rem", background: "red", border: "none" }}
              >
                Submit
              </Button>
            )}
          </div>
        </div>
      </Form>
    </>
  );
}
