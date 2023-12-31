import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import Image from "next/image";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

type ImageUploadProps = {
  name: string;
  defaultImage?: string;
  customChange?: any;
};

const UploadImage = ({
  name,
  defaultImage,
  customChange,
}: ImageUploadProps) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [error, setError] = useState(false);
  const { setValue } = useFormContext();

  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      setError(false);
      setLoading(true);
      // return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      setValue(name, info.file.originFileObj);
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
    if (info.file.status === "error") {
      // Get this url from response in real world.
      setError(true);
      setLoading(false);
    }
  };

  const uploadButton = (
    <div className="">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      {error ? (
        <div className="text-red-600 text-center" style={{ marginTop: 8 }}>
          Error:Please try
        </div>
      ) : (
        <div style={{ marginTop: 8 }}>Upload</div>
      )}
    </div>
  );

  return (
    <>
      <Upload
        name={name}
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action={`${process.env.NEXT_PUBLIC_API_BASE_URL}/upload/upload-single-image`}
        beforeUpload={customChange ? customChange : beforeUpload}
        onChange={handleChange}
      >
        {imageUrl || defaultImage ? (
          <Image
            src={imageUrl ? imageUrl : (defaultImage as string)}
            alt="avatar"
            style={{ width: "100%" }}
            width={60}
            height={60}
            // fill
          />
        ) : (
          uploadButton
        )}
      </Upload>
    </>
  );
};

export default UploadImage;
