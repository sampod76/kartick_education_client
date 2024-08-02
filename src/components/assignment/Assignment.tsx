import { useAddPdfMutation } from "@/redux/api/fileUpload";
import { ILessonData } from "@/types/lessonType";
import { Error_model_hook, Success_model } from "@/utils/modalHook";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Upload } from "antd";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../ContextApi/GlobalContextApi";
import LoadingSkeleton from "../ui/Loading/LoadingSkeleton";
import { useAddAssignmentMutation } from "@/redux/api/assernmentApi";

const AssignmentUpload = ({
  lessonData,
  open,
  setOpen,
}: {
  lessonData: ILessonData;
  open?: boolean;
  setOpen?: any;
}) => {
  const [addAssignment, { isLoading }] = useAddAssignmentMutation();
  const { userInfo, userInfoLoading } = useGlobalContext();
  
  const [form] = Form.useForm();
  const [uploadPdf, { isLoading: uploadLoading }] = useAddPdfMutation();
  const [pdfLink, setPdfLink] = useState<string | null>(null);
  
  const handleUpload = async (files: any) => {
    
    if (files.length > 4) {
      Error_model_hook("You can only upload 4 files.");
      return;
    }
    const formData = new FormData();
    files?.forEach((andFile: any) => {
      formData.append("pdfs", andFile?.originFileObj);
    });

    try {
      const result = await uploadPdf(formData).unwrap();
      
      return result;
    } catch (error) {
      
    }
  };

  const onFinish = async (values: any) => {
    console.log("Form Values:", values);
    try {
      const pdfResult = await handleUpload(values.pdfs);

      const document = {
        ...values,
        pdfs: pdfResult,
        lesson: lessonData._id,
        //@ts-ignore
        module: lessonData?.module?._id || (lessonData?.module as string),
        milestone: lessonData.milestone,
        course: lessonData.course,
        category: lessonData.category,
        author: userInfo?.id,
      };
      const assignment = await addAssignment(document).unwrap();
      if (assignment?._id) {
        Success_model("Successfully added assignment");
        form.resetFields();
      }
      console.log("🚀 ~ onFinish ~ assignment:", assignment);

      
    } catch (error) {
      console.log("🚀 ~ onFinish ~ error:", error);
    }
  };

  if (userInfoLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Upload Assignment
      </h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="title"
          label="Assignment Title"
          rules={[
            { required: true, message: "Please input the assignment title!" },
          ]}
        >
          <Input placeholder="Enter title" />
        </Form.Item>

        <div className="flex justify-start gap-4 items-center">
          <Form.Item
            name="totalMarks"
            label="Total Marks"
            rules={[
              { required: true, message: "Please input the Total Marks" },
            ]}
          >
            <InputNumber
              min={0}
              className="w-full"
              placeholder="Enter Total Marks"
            />
          </Form.Item>
          <Form.Item
            name="passMarks"
            label="Pass Marks"
            rules={[{ required: true, message: "Please input the Pass Marks" }]}
          >
            <InputNumber
              min={0}
              className="w-full"
              placeholder="Enter Pass Marks"
            />
          </Form.Item>
        </div>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please input the description!" }]}
        >
          <Input.TextArea rows={4} placeholder="Enter description" />
        </Form.Item>

        <Form.Item
          name="pdfs"
          label="Upload PDF"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          rules={[{ required: true, message: "Please upload the PDF!" }]}
        >
          <Upload multiple={true} maxCount={4} beforeUpload={() => false}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button
            loading={uploadLoading || isLoading}
            type="primary"
            htmlType="submit"
            className="w-full"
          >
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
