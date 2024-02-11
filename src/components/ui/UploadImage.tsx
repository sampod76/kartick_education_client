import uploadImgCloudinary from "@/hooks/UploadSIngleCloudinary";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Image as AntImage } from 'antd';
import { Error_model_hook } from "@/utils/modalHook";
const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg";
  if (!isJpgOrPng) {
    Error_model_hook("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 5;
  if (!isLt2M) {
    Error_model_hook("Image must smaller than 5MB!");
  }
  return isJpgOrPng && isLt2M;
};

type ImageUploadProps = {
  name: string;
  defaultImage?: string;
  customChange?: any;
  isReset?: boolean;
};

const UploadImage = ({
  name,
  defaultImage,
  customChange,
  isReset = false,
}: ImageUploadProps) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const { setValue } = useFormContext();

  const handleChange: UploadProps["onChange"] = async (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      console.log(info.file.originFileObj)
      const imgUrl = await uploadImgCloudinary(info.file.originFileObj);
      // console.log("🚀 ~ file: UploadImage.tsx:53 ~ imgUrl:", imgUrl);

      setValue(name, imgUrl);
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  useEffect(() => {
    if (isReset) {
      setImageUrl("");
    }
  }, [isReset]);

  const uploadButton = (
    <div className="">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div className="flex justify-start items-center gap-2">
      {imageUrl || defaultImage ? (
        <AntImage
          src={imageUrl ? imageUrl : (defaultImage as string)}
          alt="avatar"
          style={{ width: "150px" }}
          width={200}

        // fill
        />
      ) : null}
      <Upload
        name={name}
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="/api/file"
        beforeUpload={customChange ? customChange : beforeUpload}
        onChange={handleChange}
      >

        {uploadButton}
      </Upload>
    </div>
  );
};

export default UploadImage;
