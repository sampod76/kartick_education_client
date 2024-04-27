import uploadImgCloudinary from "@/hooks/UploadSIngleCloudinary";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Flex, message, Upload } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { Image } from 'antd';
import { useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import Resizer from "react-image-file-resizer";
import { Error_model_hook } from "@/utils/modalHook";

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng =
    file.type === "image/jpeg" ||
    file.type === "image/png" ||
    file.type === "image/jpg";
  if (!isJpgOrPng) {
    Error_model_hook("You can only upload JPG/PNG file!");
  }
  // const isLt2M = file.size / 1024 / 1024 < 5;
  // if (!isLt2M) {
  //   Error_model_hook("Image must smaller than 2MB!");
  // }
  return isJpgOrPng;
};

type ImageUploadProps = {
  name: string;
  defaultImage?: string[];
  customChange?: any;
  isReset?: boolean;
  isImageloading?: any;
  multiple?: boolean;
};

const UploadMultipalImage = ({
  name,
  defaultImage = [],
  customChange,
  isReset = false,
  isImageloading = false,
  multiple = false,
}: ImageUploadProps) => {
  const [loading, setLoading] = useState(false);

  const [imagesUrl, setImagesUrl] = useState<string[]>(defaultImage);
  const { setValue } = useFormContext();
  useEffect(() => {
    setValue(name, imagesUrl);
  }, [imagesUrl, name, setValue]);
  const handleImageProcessing = useCallback(async (file: any) => {
    try {
      // Resize the image
      const resizedImage = await new Promise((resolve) => {
        Resizer.imageFileResizer(
          file,
          700, // width
          500, // height
          "JPEG", // format
          100, // quality
          0, // rotation
          (uri: unknown) => {
            resolve(uri);
          },
          "file" // output type (file, blob, base64)
        );
      });

      // Get the compressed image URL
      const imgUrl = await uploadImgCloudinary(resizedImage);
      console.log("🚀 ~ handleImageProcessing ~ imgUrl:", imgUrl)


      // setImagesUrl((prevImages) => [...prevImages, imgUrl]);
      setImagesUrl((prevImages) => [ imgUrl]);
      setLoading(false);
      if (isImageloading) {

        isImageloading(true)
      }
    } catch (error) {
      console.error("Error processing image:", error);
      setLoading(false);
      if (isImageloading) {

        isImageloading(true)
      }
    }
  }, [isImageloading]);

  const handleChange: UploadProps["onChange"] = async (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      if (isImageloading) {

        isImageloading(true)
      }
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      await handleImageProcessing(info.file.originFileObj);
    }
  };

  const uploadButton = (
    <div className="">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  useEffect(() => {
    if (isReset) {
      setImagesUrl([]);
    }
  }, [isReset]);

  return (
    <div className="flex justify-center items-center border p-5 rounded-lg my-2 gap-3">
      {defaultImage.length
        ? defaultImage?.map((image, i) => (
          <Image
            key={i}
            className=" rounded "
            src={image}
            width={300}
            height={120}
            alt=""
          />
        ))
        : null}
      <Upload
        name={name}

        listType="picture-card"
        className="avatar-uploader"
        showUploadList={true}
        multiple={multiple}
        maxCount={5}
        action="/api/file"
        beforeUpload={customChange ? customChange : beforeUpload}
        onChange={handleChange}
      >
        {uploadButton}
      </Upload>
    </div>
  );
};

export default UploadMultipalImage;
