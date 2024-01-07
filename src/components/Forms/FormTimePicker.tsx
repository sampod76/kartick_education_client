import { TimePicker } from "antd";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import dayjs from "dayjs";
import SubHeadingUI from "../ui/dashboardUI/SubHeadingUI";
import LabelUi from "../ui/dashboardUI/LabelUi";

type FormTimePickerProps = {
  name: string;
  label?: string;
  index?: number;
};
export default function FormTimePicker({ name, label }: FormTimePickerProps) {
  const { control, setValue } = useFormContext();
  return (
    <>
      {/* {label ? label : null} */}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="flex flex-col items-start capitalize">
            <h1>{label ? <LabelUi>{label}</LabelUi> : null}</h1>
            <TimePicker
              size="large"
            
              defaultValue={dayjs(field.value ? field.value : "00:00", "HH:mm")}
              format={"HH:mm"}
              onChange={(el, value) => {
                console.log(value)
                setValue(name, value);
              }}
              style={{ width: "100%" }}
            />
          </div>
        )}
      />
    </>
  );
}
