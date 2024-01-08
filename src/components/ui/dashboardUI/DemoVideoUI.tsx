import { Input, Select, Typography } from "antd";

const { Title } = Typography;
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
const { Option } = Select;

const DemoVideoUI = ({
  // videoType,
  // setVideoType,
  // videoUrl,
  // setVideoUrl,
  options,
  label,
  required,
  defaultValue = {}, // {video:"",platform:""}
}: {
  // videoType: string | null;
  // setVideoType: React.Dispatch<React.SetStateAction<any>>;
  // videoUrl: any;
  // setVideoUrl: React.Dispatch<React.SetStateAction<any>>;
  options: string[];
  label?: string;
  required?: boolean;
  defaultValue?: Record<string, any>;
}) => {
  // console.log(videoType,videoUrl);
  //   const [videoType, setVideoType] = useState(null);
  //   const [videoUrl, setVideoUrl] = useState("");

  const { setValue } = useFormContext();
  

  const [videoType, setVideoType] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");

  // const demo_video = {
  //   video: videoUrl,
  //   platform: videoType,
  // };

  if (videoUrl && videoUrl) {
    setValue("demo_video", {
      video: videoUrl,
      platform: videoType,
    })
  }
  const handleVideoTypeChange = (value: any) => {
    setVideoType(value);
  };

  const handleVideoUrlChange = (e: any) => {
    setVideoUrl(e.target.value);
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
        placeholder={`Enter ${videoType} Video URL`}
        // value={videoUrl}
        onChange={handleVideoUrlChange}
      />
    </div>
  );
};

export default DemoVideoUI;
