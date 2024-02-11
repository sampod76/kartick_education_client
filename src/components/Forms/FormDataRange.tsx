import { DatePicker, TimePicker } from "antd";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import dayjs from "dayjs";
import SubHeadingUI from "../ui/dashboardUI/SubHeadingUI";
import LabelUi from "../ui/dashboardUI/LabelUi";

type FormDataRangeProps = {
  name: string;
  label?: string;
  index?: number;
};
export default function FormDataRange({ name, label }: FormDataRangeProps) {
  const { control, setValue, } = useFormContext();

  return (
    <>
      {/* {label ? label : null} */}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="flex flex-col items-start">
            <h1 className="text-base font-normal">{label ? <LabelUi>{label}</LabelUi> : null}</h1>
            <DatePicker.RangePicker
              size="large"
              onChange={(el, value) => {
                setValue(name, value);
              }}
    
              style={{ width: "100%" }}
            />
            {/* <TimePicker
              
              defaultValue={dayjs(field.value ? field.value : "00:00", "HH:mm")}
              format={"HH:mm"}
            
            /> */}
          </div>
        )}
      />
    </>
  );
}
