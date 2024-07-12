// src/components/AssignmentUpload.tsx
import { ILessonData } from "@/types/lessonType";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload } from "antd";
import { useState } from "react";

const AssignmentUpload = ({ lessonData }: { lessonData: ILessonData }) => {
  console.log("🚀 ~ lessonId:", lessonData);
  const [pdfLink, setPdfLink] = useState<string | null>(null);

  const handleUpload = (file: any) => {
    console.log("🚀 ~ handleUpload ~ file:", file);
    // Mock upload function, replace with actual upload logic
    setPdfLink(URL.createObjectURL(file));
  };

  const onFinish = (values: any) => {
    console.log("Form Values:", values);
    console.log("PDF Link:", pdfLink);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Upload Assignment
      </h2>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="title"
          label="Assignment Title"
          rules={[
            { required: true, message: "Please input the assignment title!" },
          ]}
        >
          <Input placeholder="Enter title" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please input the description!" }]}
        >
          <Input.TextArea rows={4} placeholder="Enter description" />
        </Form.Item>

        <Form.Item
          name="pdf"
          label="Upload PDF"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e && [e.file])}
          rules={[{ required: true, message: "Please upload the PDF!" }]}
        >
          <Upload beforeUpload={() => false} customRequest={handleUpload}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Submit
          </Button>
        </Form.Item>
      </Form>

      {pdfLink && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Uploaded PDF:</h3>
          <a
            href={pdfLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            View PDF
          </a>
        </div>
      )}
    </div>
  );
};

export default AssignmentUpload;
