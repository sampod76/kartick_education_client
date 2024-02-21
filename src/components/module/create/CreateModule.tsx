"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import SelectAuthorField from "@/components/Forms/SelectData/SelectAuthor";
import SelectMilestoneField from "@/components/Forms/SelectData/SelectMilestone";
// import TextEditor from "@/components/shared/TextEditor/TextEditor";
import ButtonSubmitUI from "@/components/ui/ButtonSubmitUI";
import UploadImage from "@/components/ui/UploadImage";
import TagsSelectUI from "@/components/ui/dashboardUI/TagsSelectUI";
import { courseStatusOptions } from "@/constants/global";
import uploadImgBB from "@/hooks/UploadSIngleImgBB";
import {
  useAddModuleMutation,
  useGetAllModuleQuery,
} from "@/redux/api/adminApi/moduleApi";
import { Error_model_hook, Success_model } from "@/utils/modalHook";
import { Button, Col, Row, Space, Spin, message } from "antd";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useGetAllCategoryChildrenQuery } from "@/redux/api/categoryChildrenApi";
import SelectCategoryChildren from "@/components/Forms/GeneralField/SelectCategoryChildren";
import UploadMultipalImage from "@/components/ui/UploadMultipalImage";
import { removeNullUndefinedAndFalsey } from "@/hooks/removeNullUndefinedAndFalsey";
import { ENUM_STATUS, ENUM_YN } from "@/constants/globalEnums";
const TextEditor = dynamic(
  () => import("@/components/shared/TextEditor/TextEditor"),
  {
    ssr: false,
  }
);

export default function CreateModule() {
  //

  const [category, setCategory] = useState<{ _id?: string; title?: string }>(
    {}
  );
  const [course, setCourse] = useState<{ _id?: string; title?: string }>({});
  const [milestone, setMilestone] = useState<{ _id?: string; title?: string }>(
    {}
  );
  const [isReset, setIsReset] = useState(false);

  const query: Record<string, any> = {};
  query["children"] = "course-milestone";
  //! for Category options selection
  const { data: Category, isLoading } = useGetAllCategoryChildrenQuery({
    ...query,
  });
  const categoryData: any = Category?.data;
  //
  // const [textEditorValue, setTextEditorValue] = useState("");
  const [addModule, { isLoading: serviceLoading }] = useAddModuleMutation();
  const { data: existModule, isLoading: ModuleNumLoadingg } = useGetAllModuleQuery({ status: ENUM_STATUS.ACTIVE, isDelete: ENUM_YN.NO, sortOrder: "desc" });

  const onSubmit = async (values: any) => {
    if (!milestone?._id && !course?._id) {
      Error_model_hook("Please ensure your are selected milestone,course");
      return;
    }
    removeNullUndefinedAndFalsey(values);
    const ModuleData: {} = {
      ...values,
      course: course?._id,
      // details: textEditorValue,
      milestone: milestone?._id,
    };
    removeNullUndefinedAndFalsey(ModuleData);
    try {
      const res = await addModule(ModuleData).unwrap();
      console.log(res);
      if (res?.success == false) {
        Error_model_hook(res?.message);
      } else {
        Success_model("Successfully added Module");
        setIsReset(true);
      }
      // console.log(res);
    } catch (error: any) {
      Error_model_hook(error?.data);
      console.log(error);
    }
  };

  if (ModuleNumLoadingg) {
    return <div>

      <Spin />
    </div>
  }
  const roundedModuleNumber = Number(
    existModule?.data[0]?.module_number || 1
  ).toFixed(2);
  // Add 0.1 to the rounded number and use toFixed again when logging
  // const preModule_number = (parseFloat(roundedModuleNumber) + 0.1).toFixed(1);
  // console.log(preModule_number);

  return (
    <>
      <div
        style={{
          boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          borderRadius: "1rem",
          backgroundColor: "white",
          padding: "1rem",
          marginBottom: "1rem",
        }}
      >
        <div className="border-2 rounded-lg my-3 p-5 border-blue-500">
          <h1 className="text-xl font-bold border-b-2 border-spacing-4 mb-2  ">
            At fast Filter
          </h1>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={6}>
              <SelectCategoryChildren
                lableText="Select category"
                setState={setCategory}
                isLoading={isLoading}
                categoryData={categoryData}
              />
            </Col>
            <Col xs={24} md={6}>
              <SelectCategoryChildren
                lableText="Select courses"
                setState={setCourse}
                categoryData={
                  //@ts-ignore
                  category?.courses || []
                }
              />
            </Col>
            <Col xs={24} lg={12}>
              <SelectCategoryChildren
                lableText="Select milestones"
                setState={setMilestone}
                categoryData={
                  //@ts-ignore
                  course?.milestones || []
                }
              />
            </Col>
          </Row>
        </div>
      </div>
      {category?._id && course?._id && milestone?._id ? (
        <div
          style={{
            boxShadow:
              "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            borderRadius: "1rem",
            backgroundColor: "white",
            padding: "1rem",
          }}
        >
          <div>
            <Form
              isReset={isReset}
              submitHandler={onSubmit}
            // defaultValues={{ module_number: Number(preModule_number) }}
            >
              <div
                style={{
                  border: "1px solid #d9d9d9",
                  borderRadius: "5px",
                  padding: "15px",
                }}
              >
                <p
                  style={{
                    fontSize: "18px",
                    marginBottom: "10px",
                  }}
                >
                  Create Module
                </p>
                <hr className="border-1.5 mb-2" />
                <Row gutter={[16, 16]}>
                  <Col
                    className="gutter-row"
                    xs={24}
                    md={20}
                    // lg={8}
                    style={{}}
                  >
                    <FormInput
                      type="text"
                      name="title"
                      size="large"
                      label="Module Title"
                      required={true}
                    />
                  </Col>
                  <Col className="gutter-row" xs={4} style={{
                    // backgroundColor: 'red',
                    // display: "flex",

                  }} >
                    {/* <Space.Compact>
                      
                    </Space.Compact> */}
                    <FormInput
                      type="number"
                      name="module_number"
                      size="large"
                      label={`Module No ${roundedModuleNumber}`}
                      required={true}
                    />
                    {/* <span>
                      {roundedModuleNumber}
                    </span> */}

                  </Col>

                  {/* <Col className="gutter-row" xs={24} md={12} lg={8} style={{}}>
                 <SelectAuthorField />
               </Col> */}

                  <Col className="gutter-row" xs={24} md={12} lg={8} style={{}}>
                    <FormSelectField
                      size="large"
                      name="status"
                      options={courseStatusOptions as any}
                      defaultValue={{ label: "Select", value: "" }}
                      label="status"
                      // placeholder="Select"
                      required={true}
                    />
                  </Col>
                  <Col className="gutter-row" xs={24} style={{}}>
                    <TagsSelectUI />
                  </Col>
                  <Col className="gutter-row" xs={24} style={{}}>
                    <UploadMultipalImage isReset={isReset} name="imgs" />
                  </Col>
                  <Col className="gutter-row" xs={24} style={{}}>
                    <div>
                      <FormTextArea
                        name="short_description"
                        label="Short description"
                        rows={5}
                        placeholder="Please enter short description"
                      />
                    </div>
                  </Col>
                  <Col
                    className="gutter-row"
                    xs={24}
                    // md={12}
                    // lg={8}
                    style={{}}
                  >
                    {/*//! 3 */}
                    <div
                      style={{
                        borderTopWidth: "2px",
                      }} /* className=" border-t-2" */
                    >
                      <p className="text-center my-3 font-bold text-xl">
                        Description
                      </p>
                      <TextEditor
                        isReset={isReset}
                      // textEditorValue={textEditorValue}
                      // setTextEditorValue={setTextEditorValue}
                      />
                    </div>
                  </Col>
                </Row>
              </div>
              <div className="flex justify-center items-center">
                {serviceLoading ? (
                  <Spin />
                ) : (
                  <div className=" text-center">
                    <ButtonSubmitUI>Create Module</ButtonSubmitUI>
                  </div>
                )}
              </div>
            </Form>
          </div>
        </div>
      ) : (
        <div className="w-full  flex justify-center items-center min-h-64 animate-pulse">
          <h1 className="text-center text-red-600 font-semibold text-2xl">
            First select your Milestone by filtering{" "}
          </h1>
        </div>
      )}
    </>
  );
}
