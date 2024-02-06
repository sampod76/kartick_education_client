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
    short_description: string;
    imgs: string[];
    course?: string
    buttonLink: string;
}

interface AnswerInputListProps {
    answersMultiple: Answer[];
    setAnswersMultiple: React.Dispatch<React.SetStateAction<Answer[]>>;
}

const CLassField: React.FC<AnswerInputListProps> = ({
    answersMultiple,
    setAnswersMultiple,
}) => {
    // console.log("🚀 ~ answersMultiple:", answersMultiple)


    const handleAdd = () => {
        setAnswersMultiple([
            ...answersMultiple,
            { title: "", imgs: [], short_description: "", buttonLink: "" },
        ]);
    };

    const handleRemove = (index: number) => {
        const updatedAnswersMultiple = [...answersMultiple];
        updatedAnswersMultiple.splice(index, 1);
        setAnswersMultiple(updatedAnswersMultiple);
    };

    const handleChange = (index: number, updatedAnswer: Answer) => {
        let updatedAnswersMultiple = [...answersMultiple];
        updatedAnswersMultiple[index] = updatedAnswer;
        setAnswersMultiple(updatedAnswersMultiple);
    };

    return (
        <div className="">
            <SubHeadingUI>Add Answer </SubHeadingUI>
            {answersMultiple?.map((answer, index) => (
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
                                width: "70vw",
                                height: "2.7rem"
                            }}
                            // width={500}
                            value={answer.title}
                            onChange={(e) =>
                                handleChange(index, { ...answer, title: e.target.value })
                            }
                        // defaultValue={index + 1}
                        />
                        <Input
                            placeholder="Option Title"
                            style={{
                                width: "70vw",
                                height: "2.7rem"
                            }}
                            // width={500}
                            value={answer.title}
                            onChange={(e) =>
                                handleChange(index, { ...answer, title: e.target.value })
                            }
                        // defaultValue={index + 1}
                        />
                        <Input.TextArea
                            showCount
                            maxLength={3000}
                            rows={3}
                            size="large"
                            placeholder="Please enter details"
                        />
                        {/* Quiz radio select */}

                        {/* quiz uploader */}
                        <div className="flex flex-wrap justify-start items-center gap-2">
                            <Upload
                                listType="picture"
                                style={{ textAlign: "start" }}
                                showUploadList={true}
                                multiple={true}
                                // multiple
                                beforeUpload={async (file) => {
                                    // console.log(
                                    //   "🚀 ~ file: DynamicFormFiled.tsx:110 ~ beforeUpload={ ~ file:",
                                    //   file
                                    // );
                                    // You can add custom logic before uploading, e.g., checking file type or size
                                    const images = answer?.imgs
                                    const imgUrl = await uploadImgCloudinary(file);

                                    if (imgUrl) {
                                        images.push(imgUrl);
                                    }
                                    // console.log(images,imgUrl, answer);

                                    handleChange(index, {
                                        ...answer,
                                        // imgs: [...answer.imgs,imgUrl],
                                        imgs: images,
                                    });
                                    return false; // Prevent default upload behavior
                                }}
                            >
                                <Button style={{ textAlign: "start" }}>Class Image +</Button>
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

                        {/* serial number */}
                        <div className="text-start ">
                            <label>Serial number</label>
                            <Input
                                placeholder="Serial Number"
                                type="text"
                                value={answer.buttonLink}
                                defaultValue={index + 1}
                                onChange={(e) =>
                                    handleChange(index, {
                                        ...answer,
                                        buttonLink: e.target.value,
                                    })
                                }
                            />
                        </div>

                        {/* select status */}

                    </Space>
                    <MinusCircleOutlined
                        style={{ fontSize: "1.5rem" }}
                        onClick={() => handleRemove(index)}
                    />
                </Space>
            ))}
            <Button
                type="dashed"
                // disabled={answersMultiple?.length > 6 ? true : false}
                onClick={handleAdd}
                // block
                icon={<PlusOutlined />}
            >
                {/* {answersMultiple?.length < 7 ? "Add Answer" : "Already added 6"} */}
                Add Class
            </Button>
        </div>
    );
};

export default CLassField;
