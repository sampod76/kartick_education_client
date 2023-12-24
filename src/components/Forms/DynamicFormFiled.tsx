import { useState } from "react";
import { Button, Input, Radio, Select, Space, Upload, message } from "antd";
import {
  PlusOutlined,
  MinusCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import HeadingUI from "../ui/dashboardUI/HeadingUI";
import SubHeadingUI from "../ui/dashboardUI/SubHeadingUI";

interface Answer {
  title: string;
  correct: boolean;
  img: string;
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
    <div className="w-[80vw] ">
      <SubHeadingUI>Add Answer </SubHeadingUI>
      <hr className="border my-2"/>
      {answers.map((answer, index) => (
        <Space
          key={index}
          // style={{ display: "flex", marginBottom: 8 }}
          style={{
            display: "flex",
            // flexDirection: "column",
            marginBottom: 8,
            width: "100%",
            alignItems: "center",
          }}
          align="baseline"
        >
          <Input
            placeholder="Option Title"
          width={200}
            value={answer.title}
            onChange={(e) =>
              handleChange(index, { ...answer, title: e.target.value })
            }
          />
          <Radio.Group
            onChange={(e) =>
              handleChange(index, { ...answer, correct: e.target.value })
            }
            value={answer.correct}
          >
            <Radio value={true}>Correct</Radio>
            <Radio value={false}>Incorrect</Radio>
          </Radio.Group>
          <Upload
            listType="picture"
            showUploadList={true}
            beforeUpload={(file) => {
              // You can add custom logic before uploading, e.g., checking file type or size
              handleChange(index, {
                ...answer,
                img: URL.createObjectURL(file),
              });
              return false; // Prevent default upload behavior
            }}
          >
            <Button>+Image</Button>
          </Upload>
          <Input
            placeholder="Serial Number"
            type="number"
            value={answer.serialNumber}
            onChange={(e) =>
              handleChange(index, { ...answer, serialNumber: +e.target.value })
            }
          />
          {/* <Input
            placeholder="Status"
            value={answer.status}
            onChange={(e) =>
              handleChange(index, { ...answer, status: e.target.value })
            }
          /> */}
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
          <MinusCircleOutlined onClick={() => handleRemove(index)} />
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
