import { TimePicker } from "antd";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import dayjs from "dayjs";
import SubHeadingUI from "../ui/dashboardUI/SubHeadingUI";
import LabelUi from "../ui/dashboardUI/LabelUi";
import { convertTimeDurationMillisecondsToTime } from "@/hooks/stringToMiliSecend";
import locale from "antd/es/date-picker/locale/en_US";

type FormTimePickerProps = {
  name: string;
  label?: string;
  index?: number;
};
export default function FormTimePicker({ name, label }: FormTimePickerProps) {
  const { control, setValue } = useFormContext();


  const customLocale = {
    ...locale,
    lang: {
      ...locale.lang,
      ok: <button className="bg-primary text-white px-2  rounded">{"Ok"}</button>, // Change "Ok" text to "Save"
      cancel: "Close", // Change "Cancel" text to "Close"
    },
  };
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
                locale={customLocale as any}
                size="large"
                defaultValue={dayjs(
                  field.value ? defaultTime : "00:00:00",
                  "HH:mm:ss"
                )}
                format={"HH:mm:ss"}
                onChange={(el, value) => {
                  setValue(name, value);
                }}
                popupStyle={{ backgroundColor: 'black' }}
                style={{ width: "100%" }}
              // renderExtraFooter={() => (
              //   <>

              //     <h2>
              //       Ok
              //     </h2>
              //   </>
              // )}

              />
            </div>
          );
        }}
      />
    </>
  );
}


