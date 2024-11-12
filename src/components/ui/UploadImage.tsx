import { multipleFilesUploaderS3 } from '@/utils/handelFileUploderS3';
import { Error_model_hook } from '@/utils/modalHook';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Image as AntImage, Upload } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
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
  const isLt2M = file.size / 1024 / 1024 < 5;
  if (!isLt2M) {
    Error_model_hook('Image must smaller than 5MB!');
  }
  return isJpgOrPng && isLt2M;
};

type ImageUploadProps = {
  name: string;
  defaultImage?: string;
  customChange?: any;
  isReset?: boolean;
  setState?: any;
  valueTypes?: 'url' | 'object' | 'multiple';
  setImageLoading?: any;
};

const UploadImage = ({
  name,
  defaultImage,
  customChange,
  isReset = false,
  setImageLoading,
  setState,
  valueTypes = 'url',
}: ImageUploadProps) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const { setValue } = useFormContext();

  const handleChange: UploadProps['onChange'] = async (
    info: UploadChangeParam<UploadFile>,
  ) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      if (setImageLoading) {
        setImageLoading(true);
      }

      if (setState) {
        setState((c: any) => ({ ...c, imageLoading: true }));
      }
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.

      const upload = await multipleFilesUploaderS3([info.file.originFileObj]);

      let imgUrl;
      const value = name.split(',');
      if (value.length > 1) {
        setValue(value[0], upload.length ? upload[0].url : null);
        setValue(value[1], upload.length ? upload[0] : null);
      } else if (valueTypes === 'url') {
        imgUrl = upload.length ? upload[0].url : null;
        setValue(value[0], upload.length ? imgUrl : null);
      } else if (valueTypes === 'object') {
        imgUrl = upload;
        setValue(value[0], upload.length ? imgUrl : {});
      } else {
        setValue(value[0], upload.length ? upload[0].url : null);
        setValue(value[1], upload.length ? upload[0] : null);
      }

      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        if (setImageLoading) {
          setImageLoading(false);
        }
        if (setState) {
          setState((c: any) => ({ ...c, imageLoading: false }));
        }
        setImageUrl(url);
      });
    }
  };

  useEffect(() => {
    if (isReset) {
      setImageUrl('');
    }
  }, [isReset]);

  const uploadButton = (
    <div className="">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div className="flex items-center justify-start gap-2">
      {imageUrl || defaultImage ? (
        <AntImage
          src={imageUrl ? imageUrl : (defaultImage as string)}
          alt="avatar"
          style={{ width: '150px' }}
          width={200}

          // fill
        />
      ) : null}
      <Upload
        name={name}
        multiple={false}
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
