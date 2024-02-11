"use client";
import { useState } from "react";
import {
  Button,
  Input,
  Radio,
  Select,
  Space,
  Upload,
  message,
  Typography,
} from "antd";
import {
  PlusOutlined,
  MinusCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import HeadingUI from "../../ui/dashboardUI/HeadingUI";
import SubHeadingUI from "../../ui/dashboardUI/SubHeadingUI";
import uploadImgBB from "@/hooks/UploadSIngleImgBB";
import uploadImgCloudinary from "@/hooks/UploadSIngleCloudinary";
import { Image } from "antd";
import { useGetAllCourseQuery } from "@/redux/api/adminApi/courseApi";
import { ENUM_STATUS, ENUM_YN } from "@/constants/globalEnums";
import LabelUi from "@/components/ui/dashboardUI/LabelUi";

interface Answer {
  title: string;
  short_description: string;
  img: string;
  course?: string;
  buttonLink: string;
}

interface ClassFieldProps {
  ClassData: Answer[];
  setClassData: React.Dispatch<React.SetStateAction<Answer[]>>;
}

const CLassField: React.FC<ClassFieldProps> = ({ ClassData, setClassData }) => {
  const [loading, setLoading] = useState(false);
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
      { title: "", img: "", short_description: "", buttonLink: "" },
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
      <SubHeadingUI>Add Class </SubHeadingUI>
      {ClassData?.map((answer, index) => (
        <div
          key={index}
          style={{
            // display: "flex",
            // alignItems: "start",
            // justifyContent: "space-between",
            margin: "10px 0",
            border: "1px solid gray",
            padding: "10px 8px",
            borderRadius: "4px",
            width: "100%",
            // background: 'blue',

          }}
          className="shadow-1 "
        >
          <div
            className="w-full mx-auto"
            // style={{ display: "flex", marginBottom: 8 }}

            style={{
              display: "flex",
              flexDirection: "column",
              gap: "18px",
              // minWidth: "100%",
              // alignItems: "start",
              // background: "red",
              width: "100%",
              position: "relative",
              // boxSizing: "border-box",
              // width: 100 %;
            }}
          // align="start"
          >
            <MinusCircleOutlined
              style={{ fontSize: "1.5rem", position: "absolute", right: 0, top: 0 }}
              onClick={() => handleRemove(index)}
            />
            {/*//! 1. class title */}
            <p>
              Title <span className="text-red-600">*</span>
            </p>
            <Input
              placeholder="Option Title"
              size="large"
              style={{
                width: "90%",
              }}
              value={answer.title}
              onChange={(e) =>
                handleChange(index, { ...answer, title: e.target.value })
              }
            // defaultValue={index + 1}
            />
            <p className="-mb-3">Select Course </p>
            <Select
              // onChange={handleChange}
              // onBlur={() => handleChange(restField.value, name)}
              loading={categoryLoading}
              style={{ width: "80%" }}
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
            <p className="-mb-3">Button link </p>
            <Input
              placeholder="Button Link"
              style={{
                width: "100%",
              }}
              // width={500}
              value={answer.buttonLink}
              onChange={(e) =>
                handleChange(index, { ...answer, buttonLink: e.target.value })
              }
            // defaultValue={index + 1}
            />
            <p className="-mb-3">
              Short description <span className="text-red-600">*</span>
            </p>
            <Input.TextArea
              showCount
              maxLength={3000}
              rows={5}
              size="large"
              style={{
                width: "100%",
              }}
              value={answer.short_description}
              onChange={(e) =>
                handleChange(index, {
                  ...answer,
                  short_description: e.target.value,
                })
              }
              placeholder="Please enter details"
            />

            {/* Quiz radio select */}

            {/* quiz uploader */}
            <div className="flex flex-wrap justify-start items-center gap-2">
              <Upload
                listType="picture"
                style={{ textAlign: "start" }}
                showUploadList={true}
                multiple={false}
                // multiple
                beforeUpload={async (file) => {
                  // console.log(
                  //   "🚀 ~ file: DynamicFormFiled.tsx:110 ~ beforeUpload={ ~ file:",
                  //   file
                  // );
                  // You can add custom logic before uploading, e.g., checking file type or size

                  setLoading(true); // Set loading to true when upload starts
                  try {
                    const imgUrl = await uploadImgCloudinary(file);
                    handleChange(index, {
                      ...answer,
                      img: imgUrl,
                    });
                  } catch (error) {
                    console.error("Error uploading image:", error);
                  } finally {
                    setLoading(false); // Set loading to false when upload completes (whether success or failure)
                  }
                  return false; // Prevent default upload behavior
                }}
              >
                <Button loading={loading} style={{ textAlign: "start" }}>Class Image +</Button>
              </Upload>
              <div className="flex justify-between items-center">
                {answer?.img && (
                  <Image
                    className="w-16 h-16 rounded mt-2"
                    src={answer?.img}
                    width={50}
                    height={40}
                    alt=""
                  />
                )}
              </div>
            </div>

            {/* select status */}
          </div>

        </div>
      ))
      }
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
    </div >
  );
};

export default CLassField;
