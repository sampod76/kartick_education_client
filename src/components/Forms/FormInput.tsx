"use client";

import { getErrorMessageByPropertyName } from "@/utils/schema-validator";
import { Input, InputNumber } from "antd";
import { spawn } from "child_process";
import { useFormContext, Controller } from "react-hook-form";
interface IInput {
  name: string;
  type?: string;
  size?: "large" | "small";
  value?: string | string[] | undefined;
  id?: string;
  placeholder?: string;
  validation?: object;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
}

const FormInput = ({
  name,
  type,
  size = "large",
  value,
  id,
  placeholder,
  validation,
  label,
  required,
  disabled = false,
  readOnly=false,
}: IInput) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = getErrorMessageByPropertyName(errors, name);

  return (
    <>
      {required && type !== "number" ? (
        <span
          style={{
            color: "red",
          }}
        >
          *
        </span>
      ) : null}
      {label && type !== "number" ? label : null}
      <Controller
        control={control}
        name={name}
        render={({ field }) =>
          type === "password" ? (
            <Input.Password
              disabled={disabled}
              type={type}
              size={size}
              readOnly={readOnly}
              placeholder={placeholder}
              {...field}
              value={value ? value : field.value}
            />
          ) : type === "number" ? (
            <div className="flex flex-col" >
              <h1>
                {required ? (
                  <span
                    style={{
                      color: "red",
                    }}
                  >
                    *
                  </span>
                ) : null}
                {label}
              </h1>
              <InputNumber
                // type={type}
                style={{width: "100%", marginRight:"2px"}}
                readOnly={readOnly}
                disabled={disabled}
                min={0}
                size={size}
                placeholder={placeholder}
                {...field}
                value={value ? value : field.value}
              />
            </div>
          ) : (
            <Input
              required={required}
              disabled={disabled}
              type={type}
              size={size}
              readOnly={readOnly}
              placeholder={placeholder}
              {...field}
              value={value ? value : field.value}
            />
          )
        }
      />
      <small style={{ color: "red" }}>{errorMessage}</small>
    </>
  );
};

export default FormInput;
