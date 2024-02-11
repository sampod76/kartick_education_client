import { useState } from "react";
import { Button, Input, Radio, Select, Space, Upload, message } from "antd";
import {
  PlusOutlined,
  MinusCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";

import SubHeadingUI from "../ui/dashboardUI/SubHeadingUI";
import { useFormContext } from "react-hook-form";

interface Video {
  platform: string;
  link: string;
}

// interface VideoInputListProps {
//   videos: Video[];
//   setVideos: React.Dispatch<React.SetStateAction<Video[] | []>>;
// }

const VideoSelect = ({ defaultValue = [] }: { defaultValue?: Array<Video> }) => {
  const { setValue } = useFormContext();
  const [videos, setVideos] = useState<Video[] | []>(defaultValue);
  //   console.log("🚀 ~ file: VideoSelect.tsx:24 ~ videos:", videos, setVideos);

  if (videos?.length) {
    setValue("videos", videos);
  }

  const handleAdd = () => {
    setVideos([
      ...videos,
      {
        platform: "",
        link: "",
      },
    ]);
  };

  ///! for input
  const [videoType, setVideoType] = useState(null);


  const handleVideoUrlChange = (index: number, link: any) => {

    let updatedVideos = [...videos];
    updatedVideos[index] = {
      ...updatedVideos[index],
      link: link.link,
    };
    setVideos(updatedVideos);

    // setVideoUrl(link);
  };

  //! For handle add or remove
  const handleRemove = (index: number) => {
    const updatedVideos = [...videos];
    updatedVideos.splice(index, 1);
    setVideos(updatedVideos);
  };

  const handleChange = (index: number, updatedVideo: Video) => {
    let updatedVideos = [...videos];
    updatedVideos[index] = updatedVideo;
    setVideos(updatedVideos);
  };

  return (

    <div className="text-start  p-2 my-10">
      <SubHeadingUI>Add Video {/* <span className="text-red-500">*</span> */}</SubHeadingUI>

      {videos?.map((video, index) => (
        <Space
          key={index}
          style={{
            display: "flex",
            alignItems: "start",
            justifyContent: "space-between",
            margin: "10px 0",
            border: "1px solid gray",
            padding: "10px 8px",
            borderRadius: "4px",
            width: "100%",
          }}
          className="shadow-1 "
        >
          <Space
            // style={{ display: "flex", marginBottom: 8 }}

            style={{
              display: "flex",
              flexDirection: "column",
              gap: "18px",
              width: "100%",
              alignItems: "start",
              // background:"red"
            }}
            align="start"
          >
            {/* quiz option */}
            {/* <Input
              placeholder="Option Title"
              style={{
                width: "20rem",
              }}
              // width={500}
              value={answer.title}
              onChange={(e) =>
                handleChange(index, { ...answer, title: e.target.value })
              }
              // defaultValue={index + 1}
            /> */}
            select Video
            {/* <Select
              style={{ width: 120 }}
              onChange={(value) =>
                handleChange(index, { ...answer, status: value })
              }
              defaultValue={answer.status}
            >
              <Select.Option value="youtube">youtube</Select.Option>
              <Select.Option value="vimeo">vimeo</Select.Option>
            </Select> */}
            <Input
              className="w-full "

              addonBefore={
                <Select
                  className=""
                  placeholder="Select Video Platform"
                  defaultValue={video.platform || "vimeo"}
                  size="large"
                  // style={{
                  // }}

                  //   onChange={handleVideoTypeChange}
                  onChange={(value) =>
                    handleChange(index, { ...video, platform: value })
                  }
                >
                  <Select.Option value="youtube">youtube</Select.Option>
                  <Select.Option value="vimeo">vimeo</Select.Option>
                </Select>
              }
              type="URL"
              suffix=".com"
              // defaultValue="mysite"
              defaultValue={video.link}
              placeholder={`Enter ${videoType} Video URL`}
              //   value={videoUrl}
              style={{ minWidth: "40vw",  }}
              onChange={(e) =>
                handleVideoUrlChange(index, { link: e.target.value })
              }
            />
          </Space>
          <MinusCircleOutlined
            style={{ fontSize: "1.5rem" }}
            onClick={() => handleRemove(index)}
          />
        </Space>
      ))}
      <Button
        type="dashed"
        disabled={videos?.length > 6 ? true : false}
        onClick={handleAdd}
        // block
        icon={<PlusOutlined />}
      >
        {videos?.length < 7 ? "Add Video" : "Already added 6"}
      </Button>
    </div>
  );
};

export default VideoSelect;
