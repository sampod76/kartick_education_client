import uploadImgCloudinary from "@/hooks/UploadSIngleCloudinary";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { useEffect, useState } from "react";
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

const UploadMultipalImage = ({
  name,
  defaultImage,
  customChange,
}: ImageUploadProps) => {
  const [loading, setLoading] = useState(false);

  const [imagesUrl, setImagesUrl] = useState<string[]>([]);
  const { setValue } = useFormContext();
  useEffect(() => {
    setValue(name, imagesUrl);
  }, [imagesUrl, name, setValue]);

  const handleChange: UploadProps["onChange"] = async (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      const imgUrl = await uploadImgCloudinary(info.file.originFileObj);

      // setValue(name, imgUrl);
      setImagesUrl((c) => [...c, imgUrl]);
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        // setImagesUrl(imgUrl);
      });
    }
  };

  const uploadButton = (
    <div className="">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <Upload
        name={name}
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={true}
        multiple={true}
        maxCount={5}
        action="/api/file"
        beforeUpload={customChange ? customChange : beforeUpload}
        onChange={handleChange}
      >
        {uploadButton}
      </Upload>
      {/* {imagesUrl.map((image, i) => (
          <Image
            key={i}
            src={image}
            alt="avatar"
            style={{ width: "100%" }}
            width={60}
            height={60}
            // fill
          />
        ))} */}
    </>
  );
};

export default UploadMultipalImage;
