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
import { useGetAllCourseQuery } from "@/redux/api/adminApi/courseApi";
import { ENUM_STATUS, ENUM_YN } from "@/constants/globalEnums";

interface Answer {
    title: string;
    short_description: string;
    img: string;
    course?: string
    buttonLink: string;
}

interface ClassFieldProps {
    ClassData: Answer[];
    setClassData: React.Dispatch<React.SetStateAction<Answer[]>>;
}

const CLassField: React.FC<ClassFieldProps> = ({
    ClassData,
    setClassData,
}) => {

    const queryCategory: Record<string, any> = {};
    queryCategory["isDelete"] = ENUM_YN.NO;
    queryCategory["title"] = ENUM_STATUS.ACTIVE;
    //! for Category options selection
    const { data: Category, isLoading: categoryLoading } = useGetAllCourseQuery({
        ...queryCategory,
    });

    const categoryData: any = Category?.data;
    // console.log("🚀 ~ ClassData:", ClassData)

    const handleAdd = () => {
        setClassData([
            ...ClassData,
            { title: "", img: '', short_description: "", buttonLink: "" },
        ]);
    };

    const handleRemove = (index: number) => {
        const updatedClassData = [...ClassData];
        updatedClassData.splice(index, 1);
        setClassData(updatedClassData);
    };

    const handleChange = (index: number, updatedAnswer: Answer) => {
        let updatedClassData = [...ClassData];
        updatedClassData[index] = updatedAnswer;
        setClassData(updatedClassData);
    };


    return (
        <div className="">
            <SubHeadingUI>Add Answer </SubHeadingUI>
            {ClassData?.map((answer, index) => (
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
                        {/*//! 1. class title */}
                        <Input
                            placeholder="Option Title"
                            style={{
                                width: "70%",
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
                            placeholder="Button Link"
                            style={{
                                width: "100%",
                                height: "2.7rem"
                            }}
                            // width={500}
                            value={answer.buttonLink}
                            onChange={(e) =>
                                handleChange(index, { ...answer, buttonLink: e.target.value })
                            }
                        // defaultValue={index + 1}
                        />
                        <Input.TextArea
                            showCount
                            maxLength={3000}
                            rows={5}
                            size="large"
                            value={answer.short_description}
                            onChange={(e) =>
                                handleChange(index, { ...answer, short_description: e.target.value })
                            }
                            placeholder="Please enter details"
                        />
                        <Select
                            // onChange={handleChange}
                            // onBlur={() => handleChange(restField.value, name)}
                            loading={categoryLoading}
                            // style={{ width: "" }}
                            onChange={(value) =>
                                handleChange(index, { ...answer, course: value })
                            }
                            defaultValue={answer?.course}
                            placeholder="Select subject"
                            size="large"
                            options={categoryData?.map((data: any) => ({
                                label: data.title,
                                value: data._id,
                            }))}
                            showSearch
                            listHeight={200}
                            popupMatchSelectWidth
                            dropdownStyle={{ minWidth: "250px" }}
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

                                    const imgUrl = await uploadImgCloudinary(file);

                                    // console.log(images,imgUrl, answer);

                                    handleChange(index, {
                                        ...answer,
                                        // img: [...answer.img,imgUrl],
                                        img: imgUrl,
                                    });
                                    return false; // Prevent default upload behavior
                                }}
                            >
                                <Button style={{ textAlign: "start" }}>Class Image +</Button>
                            </Upload>
                            {
                                answer?.img && <Image
                                    className="w-10 h-10 rounded"
                                    src={answer?.img}
                                    width={50}
                                    height={40}
                                    alt=""
                                />
                            }
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
                // disabled={ClassData?.length > 6 ? true : false}
                onClick={handleAdd}
                // block
                icon={<PlusOutlined />}
            >
                {/* {ClassData?.length < 7 ? "Add Answer" : "Already added 6"} */}
                Add Class
            </Button>
        </div>
    );
};

export default CLassField;
