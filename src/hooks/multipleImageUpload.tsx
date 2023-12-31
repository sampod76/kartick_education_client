import { Button, message, Upload } from "antd";
import { UploadOutlined } from '@ant-design/icons';
const UploadMultpalImage = () => {
  // upload profile image
  const beforeUpload = (file:any) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
    }

    const isJpgOrJpeg =
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png";
    if (!isJpgOrJpeg) {
      message.error("You can only upload JPEG image files!");
    }

    return isImage && isJpgOrJpeg;
  };
  ///
  const props = {
    name: "image",
    action: `https://api.imgbb.com/1/upload?key=a50f3571eea0f08e932e0a8e13295351`,
    headers: {
      // authorization: 'authorization-text',
    },
    multiple: true,
    beforeUpload,
    onChange(info:any) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        console.log(info);
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    progress: {
      strokeColor: {
        "0%": "#108ee9",
        "100%": "#87d068",
      },
      strokeWidth: 3,
      format: (percent:any) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
  };

  return (
    <div className="max-w-xs">
      <Upload showUploadList={true} {...props} maxCount={10} multiple={true}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </div>
  );
};

export default UploadMultpalImage;
