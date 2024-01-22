import { Input, Select, Typography } from "antd";
const { Title } = Typography;
import React, { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
const { Option } = Select;

const DemoVideoUI = ({
  options,
  label,
  required,
  defaultValue = { video: "", platform: "" },
}: {
  options: string[];
  label?: string;
  required?: boolean;
  defaultValue?: Record<string, any>;
}) => {
  const { setValue, register } = useFormContext();
  const [videoData, setVideoData] = useState({
    video: defaultValue?.video || "",
    platform: defaultValue?.platform || "vimeo",
  });



  useEffect(() => {
    register("demo_video", { required: required });
  }, [register, required]); // Register the field with react-hook-form only once

  useEffect(() => {
    setValue("demo_video", videoData);
  }, [setValue, videoData]); // Update the value in react-hook-form when videoData changes

  const handleVideoTypeChange = (value: string) => {
    setVideoData((prevData) => ({ ...prevData, platform: value }));
  };

  const handleVideoUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setVideoData((prevData) => ({ ...prevData, video: value }));
  };

  return (
    <div className="">
      <Title level={5} style={{ textAlign: "start" }}>
        {label} {required ? <span className="text-red-500">*</span> : null}
      </Title>

      <Input
        className="w-full "
        addonBefore={
          <Select
            className=""
            placeholder="Select Video Platform"
            onChange={handleVideoTypeChange}
            defaultValue={defaultValue?.platform || "vimeo"}
          >
            {options?.map((option: string) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        }
        type="URL"
        suffix=".com"
        defaultValue={defaultValue?.video}
        placeholder={`Enter ${videoData.platform} Video URL`}
        onChange={handleVideoUrlChange}
      />
    </div>
  );
};

export default DemoVideoUI;
