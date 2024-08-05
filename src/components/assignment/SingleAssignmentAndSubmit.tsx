"use client";
import { useGetSingleAssignmentQuery } from "@/redux/api/assernmentApi";
import {
  useAddSubmitAssignmentMutation,
  useGetAllSubmitAssignmentQuery,
} from "@/redux/api/assernmentSubmitApi";
import { useAddPdfMutation } from "@/redux/api/fileUpload";
import { Error_model_hook } from "@/utils/modalHook";
import { FilePdfOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Form, message, Upload } from "antd";
import { useGlobalContext } from "../ContextApi/GlobalContextApi";
import LoadingSkeleton from "../ui/Loading/LoadingSkeleton";

export default function SingleAssignmentAndSubmit({ id }: { id: string }) {
  const { userInfo, userInfoLoading } = useGlobalContext();
  console.log("🚀 ~ SingleAssignmentAndSubmit ~ userInfo:", userInfo);
  const { data: getSingleAssignment, isLoading } =
    useGetSingleAssignmentQuery(id);

  const { data: getSubmitAssignment, isLoading: SubmitLoading } =
    useGetAllSubmitAssignmentQuery({
      assignment: id,
      author: userInfo?.id,
    });

  console.log(
    "🚀 ~ SingleAssignmentAndSubmit ~ getSingleAssignment:",
    getSubmitAssignment
  );

  const [submitAssignment, { isLoading: submitAssignmentLoading }] =
    useAddSubmitAssignmentMutation();

  const [form] = Form.useForm();
  const [uploadPdf, { isLoading: uploadLoading }] = useAddPdfMutation();

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
      console.error("Upload error:", error);
    }
  };

  const onFinish = async (values: any) => {
    console.log("🚀 ~ onFinish ~ values:", values);
    if (values.pdfs) {
      const pdfResult = await handleUpload(values.pdfs);
      console.log("🚀 ~ onFinish ~ pdfResult:", pdfResult);
      values.pdfs = pdfResult;
    } else {
      message.error("Please upload at least one file");
      return;
    }
    try {
      const submitData = {
        lesson: getSingleAssignment?.lesson?._id,
        module: getSingleAssignment?.module,
        milestone: getSingleAssignment?.milestone,
        course: getSingleAssignment?.course,
        category: getSingleAssignment?.category,
        assignmentCreator: getSingleAssignment?.author?._id,
        assignment: getSingleAssignment?._id,
        ...values,
      };
      const res = await submitAssignment(submitData).unwrap();
      if (res._id) {
        message.success("Successfully submitted assignment");
      }
      form.resetFields();
    } catch (error: any) {
      Error_model_hook(error?.message);
      console.log("🚀 ~ onFinish ~ o:", values);
    }
  };

  if (isLoading || SubmitLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div>
      <div className="max-w-lg mx-auto my-3 bg-white shadow-lg rounded-lg overflow-hidden relative">
        <div className="px-6 py-4">
          <h2 className="font-bold text-3xl text-center mb-2">
            {getSingleAssignment?.title}
          </h2>
          <p className="text-gray-700 text-base mb-4">
            {getSingleAssignment?.description || ""}
          </p>
          <div className="mb-4">
            <div className="flex justify-start gap-3 font-semibold text-gray-800">
              <span>Total Marks:</span>
              <span>{getSingleAssignment?.totalMarks || 0}</span>
            </div>
            <div className="flex justify-start gap-3 font-semibold text-gray-800">
              <span>Pass Marks:</span>
              <span>{getSingleAssignment?.passMarks || 0}</span>
            </div>
          </div>
          <h3 className="font-semibold text-lg mb-2">PDF Files</h3>
          <ul>
            {getSingleAssignment?.pdfs?.length ? (
              getSingleAssignment.pdfs.map((pdf: any) => (
                <li key={pdf.server_url} className="flex items-center mb-2">
                  <FilePdfOutlined className="text-red-500 mr-2" />
                  <div>
                    <a
                      href={
                        process.env.NEXT_PUBLIC_API_ONLY_BASE_URL +
                        "/" +
                        pdf.server_url
                      }
                      className="text-blue-500"
                    >
                      {pdf.original_filename}
                    </a>
                  </div>
                </li>
              ))
            ) : (
              <p>No PDFs available</p>
            )}
          </ul>
        </div>
        <div className="m-3 rounded-xl border p-2 w-fit mx-auto">
          {getSubmitAssignment?.data.length &&
          getSubmitAssignment?.data[0]?.mark ? (
            <div>
              <p className="bg-green-600 p-3 rounded-lg">
                Result :{" "}
                <span className="text-white">
                  {getSubmitAssignment?.data[0]?.mark}
                </span>
              </p>
            </div>
          ) : (
            <div>
              {getSubmitAssignment?.data.length &&
              !getSubmitAssignment?.data[0]?.mark ? (
                <p>Pending....</p>
              ) : (
                ""
              )}
            </div>
          )}
        </div>
      </div>
      <div className="w-fit mx-auto p-2 m-2 rounded-lg border">
        <Form
          form={form}
          layout="vertical"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="pdfs"
            label="Submit Assignment (PDF format)"
            valuePropName="fileList"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              marginLeft: "2.5rem",
            }}
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          >
            <Upload
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // width: "100%",
              }}
              multiple={true}
              maxCount={4}
              beforeUpload={() => false}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
          <div className="flex justify-start gap-2 -ml-6 -mt-2">
            <Form.Item>
              <Button
                loading={uploadLoading || submitAssignmentLoading}
                type="primary"
                htmlType="submit"
                className="w-full"
                disabled={getSubmitAssignment?.data.length ? true : false}
              >
                Submit
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                loading={uploadLoading || submitAssignmentLoading}
                type="primary"
                htmlType="reset"
                className="w-25"
              >
                Reset
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
}
