import React from "react";
import { InboxOutlined } from "@ant-design/icons";
import { Image, message, type UploadProps } from "antd";
import Dragger from "antd/es/upload/Dragger";
import { getCloudinaryEnv } from "@/helpers/config/envConfig";
export default function UploadMultipalDragAndDropImge({
  images = [],
  setImages,
  multiple = false,
}: {
  images?: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  multiple?: boolean;
}) {
  const envcloudinary = getCloudinaryEnv(); // Replace YOUR_CLOUD_NAME with your Cloudinary cloud name

  const props: UploadProps = {
    name: "file",
    multiple: multiple,
    action: `https://api.cloudinary.com/v1_1/${envcloudinary.cloud_name}/image/upload`,
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    },
    data: {
      upload_preset: envcloudinary.upload_preset, // Replace YOUR_UPLOAD_PRESET with your Cloudinary upload preset
    },
    beforeUpload(file, fileList) {
      if (fileList.length > 10) {
        message.error("You can only upload up to 10 images.");
        return false; // Cancel the upload
      }
      const maxSize = 5; // Max size in MB
      if (file.size / 1024 / 1024 > maxSize) {
        message.error(
          `${file.name} exceeds the maximum allowed size of ${maxSize} MB.`
        );
        return false; // Cancel the upload
      }
      return true; // Continue with the upload
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);

        setImages((c) => [...c, info?.file?.response?.url]);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <div>
      {" "}
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <div className="space-x-2">
          {images?.length &&
            images?.map((image: string) => (
              // eslint-disable-next-line react/jsx-key
              <Image
                src={image}
                width={100}
                height={100}
                className="w-[40px] h-[30px] md:w-[70px] md:h-[50px]"
                alt=""
              />
            ))}
        </div>
      </Dragger>
    </div>
  );
}
