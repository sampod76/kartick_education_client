import { Error_model_hook } from '@/utils/modalHook';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Image as AntImage, Upload } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { useEffect, useState } from 'react';

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng =
    file.type === 'image/jpeg' ||
    file.type === 'image/png' ||
    file.type === 'image/jpg';
  if (!isJpgOrPng) {
    Error_model_hook('You can only upload JPG/PNG file!');
  }
  const isLt10M = file.size / 1024 / 1024 < 10;
  if (!isLt10M) {
    Error_model_hook('Image must be smaller than 10MB!');
  }
  return isJpgOrPng && isLt10M;
};

type ImageUploadProps = {
  name?: string;
  defaultImage?: string;
  customChange?: any;
  multiple?: boolean;
  isReset?: boolean;
  setImages?: any;
  valueTypes?: 'url' | 'object' | 'multiple';
  setImageLoading: (loading: boolean) => void;
};

const UploadImageNotForm = ({
  name,
  defaultImage,
  customChange,
  multiple = false,
  isReset = false,
  setImageLoading,
  setImages,
  valueTypes = 'url',
}: ImageUploadProps) => {
  const [loading, setLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const handleChange: UploadProps['onChange'] = async (
    info: UploadChangeParam<UploadFile>,
  ) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      setImageLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Filter out undefined files
      const files = info.fileList
        .map((file) => file.originFileObj)
        .filter((file): file is RcFile => file !== undefined);

      if (setImages) {
        setImages(files);
      }

      // Update image URLs for preview
      const newImageUrls = await Promise.all(
        files.map(
          (file) =>
            new Promise<string>((resolve) => {
              getBase64(file, (url) => resolve(url));
            }),
        ),
      );

      setLoading(false);
      setImageLoading(false);
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
      setImageUrls([]);
    }
  }, [isReset]);

  return (
    <div className="flex items-center justify-start gap-2">
      {/* Render all uploaded images */}
      {defaultImage && (
        <AntImage
          src={defaultImage}
          alt="default_image"
          style={{ width: '150px' }}
          width={200}
        />
      )}
      <Upload
        name={name}
        multiple={multiple}
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={true}
        action="/api/file"
        beforeUpload={customChange || beforeUpload}
        onChange={handleChange}
      >
        {uploadButton}
      </Upload>
    </div>
  );
};

export default UploadImageNotForm;
