import { useAddPdfMutation } from "@/redux/api/fileUpload";
import { ILessonData } from "@/types/lessonType";
import { Error_model_hook, Success_model } from "@/utils/modalHook";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload } from "antd";
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
  console.log("🚀 ~ userInfo:", userInfo);
  const [form] = Form.useForm();
  const [uploadPdf, { isLoading: uploadLoading }] = useAddPdfMutation();
  const [pdfLink, setPdfLink] = useState<string | null>(null);
  console.log(lessonData);
  const handleUpload = async (files: any) => {
    console.log("🚀 ~ handleUpload ~ files:", files);
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
      console.log("🚀 ~ handleUpload ~ result:", result);
      return result;
    } catch (error) {
      console.log("🚀 ~ handleUpload ~ error:", error);
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
      console.log("🚀 ~ onFinish ~ assignment:", assignment);
      Success_model("Successfully added assignment");
      form.resetFields();
      console.log("🚀 ~ onFinish ~ pdfResult:", document);
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
