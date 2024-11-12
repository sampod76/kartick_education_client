import { useAddPdfMutation } from "@/redux/api/fileUpload";
import { ILessonData } from "@/types/lessonType";
import { Error_model_hook, Success_model } from "@/utils/modalHook";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, message, Upload } from "antd";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../ContextApi/GlobalContextApi";
import LoadingSkeleton from "../ui/Loading/LoadingSkeleton";
import { FilePdfOutlined } from "@ant-design/icons";
import {
  useAddAssignmentMutation,
  useUpdateAssignmentMutation,
} from "@/redux/api/assernmentApi";

const AssignmentUpload = ({
  lessonData,
  open,
  setOpen,
  defaultData,
  readonly = false,
}: {
  lessonData?: ILessonData;
  open?: boolean;
  setOpen?: any;
  defaultData?: any;
  readonly?: boolean;
}) => {
  console.log(defaultData);
  const [addAssignment, { isLoading }] = useAddAssignmentMutation();
  const [updateAssignment, { isLoading: AssignmentLoading }] =
    useUpdateAssignmentMutation();
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
    } catch (error) {}
  };

  const onFinish = async (values: any) => {
    console.log("🚀 ~ onFinish ~ values:", values);
    try {
      if (values.pdfs) {
        const pdfResult = await handleUpload(values.pdfs);
        console.log("🚀 ~ onFinish ~ pdfResult:", pdfResult);
        values.pdfs = pdfResult;
      }
      let document;
      if (lessonData) {
        document = {
          ...values,

          lesson: lessonData._id,
          //@ts-ignore
          module: lessonData?.module?._id || (lessonData?.module as string),
          milestone: lessonData.milestone,
          course: lessonData.course,
          category: lessonData.category,
          author: userInfo?.id,
        };
      } else {
        document = {
          ...values,
        };
      }

      let assignment;
      if (lessonData) {
        assignment = await addAssignment(document).unwrap();
      } else {
        console.log(document);
        assignment = await updateAssignment({
          id: defaultData?._id,
          data: document,
        }).unwrap();
      }
      if (assignment?._id) {
        message.success(
          lessonData
            ? "Successfully added assignment"
            : "Successfully update assignment"
        );
        form.resetFields();
      }
      console.log(assignment);
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
      <Form
        form={form}
        initialValues={defaultData ? defaultData : {}}
        layout="vertical"
        onFinish={onFinish}
        disabled={readonly}
      >
        <Form.Item
          name="title"
          label="Assignment Title"
          rules={[
            {
              required: !defaultData,
              message: "Please input the assignment title!",
            },
          ]}
        >
          <Input placeholder="Enter title" />
        </Form.Item>

        <div className="flex justify-start gap-4 items-center">
          <Form.Item
            name="totalMarks"
            label="Total Marks"
            rules={[
              {
                required: !defaultData,
                message: "Please input the Total Marks",
              },
            ]}
          >
            <InputNumber
              min={0}
              // defaultValue={100}
              className="w-full"
              placeholder="Enter Total Marks"
            />
          </Form.Item>
          <Form.Item
            name="passMarks"
            label="Pass Marks"
            rules={[
              {
                required: !defaultData,
                message: "Please input the Pass Marks",
              },
            ]}
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
          rules={[
            {
              required: !defaultData,
              message: "Please input the description!",
            },
          ]}
        >
          <Input.TextArea rows={4} placeholder="Enter description" />
        </Form.Item>

        <Form.Item
          name="pdfs"
          label="Upload PDF"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          rules={[
            { required: !defaultData, message: "Please upload the PDF!" },
          ]}
        >
          <Upload multiple={true} maxCount={4} beforeUpload={() => false}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
        {defaultData?.pdfs && (
          <>
            <h3 className="font-semibold text-lg mb-2">PDF Files</h3>
            <ul>
              {defaultData?.pdfs.map((pdf: any) => (
                <li key={pdf.server_url} className="flex items-center mb-2">
                  <FilePdfOutlined className="text-red-500 mr-2" />
                  <div>
                    <a
                      href={
                        process.env.NEXT_PUBLIC_API_ONLY_BASE_URL +
                        "/" +
                        pdf?.server_url
                      }
                      className="text-blue-500"
                    >
                      {pdf?.original_filename}
                    </a>
                    {/* <p className="text-gray-600 text-sm">{`Last Modified: ${pdf.lastModifiedDate.toDateString()}`}</p> */}
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}

        <div className="flex justify-start gap-2">
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
          <Form.Item>
            <Button
              loading={uploadLoading || isLoading}
              type="primary"
              htmlType="reset"
              className="w-25"
            >
              Reset
            </Button>
          </Form.Item>
        </div>
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
