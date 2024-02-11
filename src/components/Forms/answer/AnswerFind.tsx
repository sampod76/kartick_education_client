import { useState } from "react";
import { Button, Input, Radio, Select, Space, Upload, message } from "antd";
import {
    PlusOutlined,
    MinusCircleOutlined,
    UploadOutlined,
} from "@ant-design/icons";
import HeadingUI from "../../ui/dashboardUI/HeadingUI";
import SubHeadingUI from "../../ui/dashboardUI/SubHeadingUI";
import uploadImgBB from "@/hooks/UploadSIngleImgBB";
import uploadImgCloudinary from "@/hooks/UploadSIngleCloudinary";
import { Image } from 'antd';

interface Answer {
    title: string;
    correct: boolean;
    imgs: string[];
    serialNumber: number;
    status: string;
}

interface AnswerInputListProps {
    answersFind: Answer[];
    setAnswersFind: React.Dispatch<React.SetStateAction<Answer[]>>;
}

const AnswerFind: React.FC<AnswerInputListProps> = ({
    answersFind,
    setAnswersFind,
}) => {
    // console.log("🚀 ~ answersFind:", answersFind)
    const [isLoading, setIsLoading] = useState<{
        loading: boolean;
        index: number;
      }>({
        loading: false,
        index: 50000,
      });

    const handleAdd = () => {
        setAnswersFind([
            ...answersFind,
            { title: "", correct: false, imgs: [], serialNumber: 0, status: "active" },
        ]);
    };

    const handleRemove = (index: number) => {
        const updatedAnswersFind = [...answersFind];
        updatedAnswersFind.splice(index, 1);
        setAnswersFind(updatedAnswersFind);
    };

    const handleChange = (index: number, updatedAnswer: Answer) => {
        let updatedAnswersFind = [...answersFind];
        updatedAnswersFind[index] = updatedAnswer;
        setAnswersFind(updatedAnswersFind);
    };

    return (
        <div className="">
            <SubHeadingUI>Add Answer </SubHeadingUI>
            {answersFind?.map((answer, index) => (
                <div
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
                    <div
                        // style={{ display: "flex", marginBottom: 8 }}

                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "18px",
                            width: "100%",
                            alignItems: "start",
                            // background:"red",
                            position: "relative",
                        }}
                        // align="start"
                    >
                        <MinusCircleOutlined
                            style={{ fontSize: "1.5rem", position: "absolute", right: 0, top: 0 }}
                            onClick={() => handleRemove(index)}
                        />
                        {/* quiz option */}
                        <Input
                            placeholder="Option Title"
                            style={{
                                width: "100%",
                                height: "2.7rem"
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
                        <div className="flex flex-wrap justify-start items-center gap-2">
                            <Upload
                                listType="picture"
                                style={{ textAlign: "start" }}
                                showUploadList={true}
                                multiple={false}
                                // multiple
                                beforeUpload={async (file) => {
                                    setIsLoading({ loading: true, index: index });
                                    // console.log(
                                    //   "🚀 ~ file: DynamicFormFiled.tsx:110 ~ beforeUpload={ ~ file:",
                                    //   file
                                    // );
                                    // You can add custom logic before uploading, e.g., checking file type or size
                                    const images = answer?.imgs
                                    const imgUrl = await uploadImgCloudinary(file);
                                    setIsLoading({ loading: false, index: index });
                                    console.log('imgUrl', imgUrl)
                                    if (imgUrl) {
                                        images.push(imgUrl);
                                    }
                                    console.log(file, images, imgUrl, answer, 'ffffffffffffffffffffffffffffff');

                                    handleChange(index, {
                                        ...answer,
                                        // imgs: [...answer.imgs,imgUrl],
                                        imgs: images,
                                    });
                                    return false; // Prevent default upload behavior
                                }}
                            >
                                <Button  loading={isLoading.index === index && isLoading.loading} style={{ textAlign: "start" }}>Answer Image +</Button>
                            </Upload>
                            {answer.imgs.map((img, key) => (<Image
                                key={key}
                                className="w-10 h-10 rounded"
                                src={img}
                                width={50}
                                height={40}
                                alt=""
                            />))}
                        </div>

                        {/*//! serial number */}
                        <div className="text-start">
                            <p>Serial number</p>
                            <Input
                                placeholder="Serial Number"
                                type="number"
                                value={answer?.serialNumber ? answer?.serialNumber : index + 1}
                                defaultValue={index + 1}
                                onChange={(e) =>
                                    handleChange(index, {
                                        ...answer,
                                        serialNumber: +e.target.value,
                                    })
                                }
                                style={{
                                    width: '8rem'
                                }}
                                onWheel={(e) => e.preventDefault()}
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
                    </div>

                </div>
            ))}
            <Button
                type="dashed"
                // disabled={answersFind?.length > 6 ? true : false}
                onClick={handleAdd}
                // block
                icon={<PlusOutlined />}
            >
                Add Answer
                {/* {answersFind?.length < 7 ? "Add Answer" : "Already added 6"} */}
            </Button>
        </div>
    );
};

export default AnswerFind;
