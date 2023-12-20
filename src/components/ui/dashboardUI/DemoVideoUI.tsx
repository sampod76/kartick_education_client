import { Input, Select } from "antd";
import React, { useState } from "react";
const { Option } = Select;

const DemoVideoUI = ({
  videoType,
  setVideoType,
  videoUrl,
  setVideoUrl,
  options,
}: {
  videoType: string | null;
  setVideoType: React.Dispatch<React.SetStateAction<any>>;
  videoUrl: any;
  setVideoUrl: React.Dispatch<React.SetStateAction<any>>;
  options: string[];
}) => {
  //   const [videoType, setVideoType] = useState(null);
  //   const [videoUrl, setVideoUrl] = useState("");
  const handleVideoTypeChange = (value: any) => {
    setVideoType(value);
  };

  const handleVideoUrlChange = (e: any) => {
    setVideoUrl(e.target.value);
  };
  return (
    <div className="mx-auto my-5">
      <Input
        className="w-full "
        addonBefore={
          <Select
            className=" b"
            placeholder="Select Video Platform"
            onChange={handleVideoTypeChange}
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
        defaultValue="mysite"
        placeholder={`Enter ${videoType} Video URL`}
        value={videoUrl}
        onChange={handleVideoUrlChange}
      />
    </div>
  );
};

export default DemoVideoUI;
