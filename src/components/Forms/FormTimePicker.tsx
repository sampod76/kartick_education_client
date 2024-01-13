import { TimePicker } from "antd";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import dayjs from "dayjs";
import SubHeadingUI from "../ui/dashboardUI/SubHeadingUI";
import LabelUi from "../ui/dashboardUI/LabelUi";
import { convertTimeDurationMillisecondsToTime } from "@/hooks/stringToMiliSecend";

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
        render={({ field }) => {
          // console.log(field, "tttttttttttttt");

          let defaultTime = field?.value;
          if (typeof defaultTime === "number") {
            defaultTime = convertTimeDurationMillisecondsToTime(defaultTime);
          }
          // console.log(defaultTime);

          return (
            <div className="flex flex-col items-start capitalize">
              <h1 className="text-base font-normal">
                {label ? <LabelUi>{label}</LabelUi> : null}
              </h1>
              <TimePicker
                size="large"
                defaultValue={dayjs(
                  field.value ? defaultTime : "00:00:00",
                  "HH:mm:ss"
                )}
                format={"HH:mm:ss"}
                onChange={(el, value) => {
                  setValue(name, value);
                }}
                style={{ width: "100%" }}
              />
            </div>
          );
        }}
      />
    </>
  );
}
