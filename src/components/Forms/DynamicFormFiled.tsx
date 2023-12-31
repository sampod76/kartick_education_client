import { useState } from "react";
import { Button, Input, Radio, Select, Space, Upload, message } from "antd";
import {
  PlusOutlined,
  MinusCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import HeadingUI from "../ui/dashboardUI/HeadingUI";
import SubHeadingUI from "../ui/dashboardUI/SubHeadingUI";
import uploadImgBB from "@/hooks/imgbbUploads";

interface Answer {
  title: string;
  correct: boolean;
  img: string | [];
  serialNumber: number;
  status: string;
}

interface AnswerInputListProps {
  answers: Answer[];
  setAnswers: React.Dispatch<React.SetStateAction<Answer[]>>;
}

const AnswerInputList: React.FC<AnswerInputListProps> = ({
  answers,
  setAnswers,
}) => {
  console.log("🚀 ~ file: DynamicFormFiled.tsx:28 ~ answers:", answers);

  const handleAdd = () => {
    setAnswers([
      ...answers,
      { title: "", correct: false, img: "", serialNumber: 0, status: "active" },
    ]);
  };

  const handleRemove = (index: number) => {
    const updatedAnswers = [...answers];
    updatedAnswers.splice(index, 1);
    setAnswers(updatedAnswers);
  };

  const handleChange = (index: number, updatedAnswer: Answer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = updatedAnswer;
    setAnswers(updatedAnswers);
  };

  return (
    <div className="">
      <SubHeadingUI>Add Answer </SubHeadingUI>
      {answers?.map((answer, index) => (
        <Space
          key={index}
          style={{
            display: "flex",
            alignItems: "start",
            justifyContent: "space-between",
            margin: "10px 0",
            border: "1px solid gray",
            padding: "10px 8px",
            borderRadius: "4px",
            width: "100%",
          }}
          className="shadow-1 "
        >
          <Space
            // style={{ display: "flex", marginBottom: 8 }}

            style={{
              display: "flex",
              flexDirection: "column",
              gap: "18px",
              width: "100%",
              alignItems: "start",
              // background:"red"
            }}
            align="start"
          >
            {/* quiz option */}
            <Input
              placeholder="Option Title"
              style={{
                width: "20rem",
              }}
              // width={500}
              value={answer.title}
              onChange={(e) =>
                handleChange(index, { ...answer, title: e.target.value })
              }
              // defaultValue={index + 1}
            />
            {/* Quiz radio select */}

            <Radio.Group
              onChange={(e) =>
                handleChange(index, { ...answer, correct: e.target.value })
              }
              value={answer.correct}
            >
              <Radio value={true}>Correct</Radio>
              <Radio value={false}>Incorrect</Radio>
            </Radio.Group>
            {/* quiz uploader */}
            <Upload
              listType="picture"
              style={{ textAlign: "start" }}
              showUploadList={true}
              multiple={true}
              // multiple
              beforeUpload={async (file) => {
                console.log(
                  "🚀 ~ file: DynamicFormFiled.tsx:110 ~ beforeUpload={ ~ file:",
                  file
                );
                // You can add custom logic before uploading, e.g., checking file type or size
                const imgUrl = await uploadImgBB(file);
                console.log(imgUrl);

                // if (answer?.img) {
                //   // handleChange(index, {
                //   //   ...answer,
                //   //   img:
                //   // });
                // }
                handleChange(index, {
                  ...answer,
                  img: imgUrl as string,
                });
                return false; // Prevent default upload behavior
              }}
            >
              <Button style={{ textAlign: "start" }}>Answer Image +</Button>
            </Upload>
            {/* serial number */}
            <div className="text-start ">
              <label>Serial number</label>
              <Input
                placeholder="Serial Number"
                type="number"
                value={answer.serialNumber}
                defaultValue={index + 1}
                onChange={(e) =>
                  handleChange(index, {
                    ...answer,
                    serialNumber: +e.target.value,
                  })
                }
              />
            </div>

            {/* select status */}
            <Select
              style={{ width: 120 }}
              onChange={(value) =>
                handleChange(index, { ...answer, status: value })
              }
              defaultValue={answer.status}
            >
              <Select.Option value="active">Active</Select.Option>
              <Select.Option value="deactivate">Deactivate</Select.Option>
            </Select>
          </Space>
          <MinusCircleOutlined
            style={{ fontSize: "1.5rem" }}
            onClick={() => handleRemove(index)}
          />
        </Space>
      ))}
      <Button
        type="dashed"
        disabled={answers?.length > 6 ? true : false}
        onClick={handleAdd}
        // block
        icon={<PlusOutlined />}
      >
        {answers?.length < 7 ? "Add Answer" : "Already added 6"}
      </Button>
    </div>
  );
};

export default AnswerInputList;
