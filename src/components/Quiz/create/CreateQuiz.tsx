"use client";

import Form from "@/components/Forms/Form";

import FormInput from "@/components/Forms/FormInput";

import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";

import ButtonSubmitUI from "@/components/ui/ButtonSubmitUI";

import DemoVideoUI from "@/components/ui/dashboardUI/DemoVideoUI";

import TagsSelectUI from "@/components/ui/dashboardUI/TagsSelectUI";
import { courseStatusOptions } from "@/constants/global";

import { useAddQuizMutation } from "@/redux/api/adminApi/quizApi";

import { Error_model_hook, Success_model } from "@/utils/modalHook";

import { Button, Col, Row, message } from "antd";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useGetAllCategoryChildrenQuery } from "@/redux/api/categoryChildrenApi";
import SelectCategoryChildren from "@/components/Forms/GeneralField/SelectCategoryChildren";
import UploadMultipalImage from "@/components/ui/UploadMultipalImage";
import { removeNullUndefinedAndFalsey } from "@/hooks/removeNullUndefinedAndFalsey";
const TextEditor = dynamic(
  () => import("@/components/shared/TextEditor/TextEditor"),
  {
    ssr: false,
  }
);
const CreateQuiz = () => {
  const [category, setCategory] = useState<{ _id?: string; title?: string }>(
    {}
  );
  const [course, setCourse] = useState<{ _id?: string; title?: string }>({});
  const [milestone, setmilestone] = useState<{ _id?: string; title?: string }>(
    {}
  );
  const [module, setmodule] = useState<{ _id?: string; title?: string }>({});
  const [lesson, setlesson] = useState<{ _id?: string; title?: string }>({});
  const [isReset, setIsReset] = useState(false);

  const query: Record<string, any> = {};
  query["children"] = "course-milestone-module-lessons";
  //! for Category options selection
  const { data: Category, isLoading } = useGetAllCategoryChildrenQuery({
    ...query,
  });

  const categoryData: any = Category?.data;
  //
  const [addQuiz, { isLoading: quizLoading }] = useAddQuizMutation();

  const onSubmit = async (values: any) => {
    removeNullUndefinedAndFalsey(values);
    const createQuizeData: {} = {
      ...values,
      category: category?._id,
      course: course?._id,
      milestone: milestone?._id,
      module: module?._id,
      lesson: lesson?._id,
    };
    // console.log(LessonData);
    try {
      const res = await addQuiz(createQuizeData).unwrap();
      console.log(res);
      if (res?.success == false) {
        Error_model_hook(res?.message);
      } else {
        Success_model("Successfully added Quiz");
        setIsReset(true);
      }
      // console.log(res);
    } catch (error: any) {
      Error_model_hook(error?.message);
      console.log(error);
    }
  };

  // if (serviceLoading) {
  //   message.loading("Loading...");
  // }

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
                setState={setmilestone}
                categoryData={
                  //@ts-ignore
                  course?.milestones || []
                }
              />
            </Col>
            <Col xs={24} lg={12}>
              <SelectCategoryChildren
                lableText="Select module"
                setState={setmodule}
                categoryData={
                  //@ts-ignore
                  milestone?.modules || []
                }
              />
            </Col>
            <Col xs={24} lg={12}>
              <SelectCategoryChildren
                lableText="Select lesson"
                setState={setlesson}
                categoryData={
                  //@ts-ignore
                  module?.lessons || []
                }
              />
            </Col>
          </Row>
        </div>
      </div>
      {lesson?._id ? (
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
            {/* resolver={yupResolver(adminSchema)} */}
            {/* resolver={yupResolver(IServiceSchema)} */}
            <Form submitHandler={onSubmit} isReset={isReset}>
              <div
                style={{
                  border: "1px solid #d9d9d9",
                  borderRadius: "5px",
                  padding: "15px",
                }}
              >
                <h1 className="text-center text-lg font-bold">Create Quiz</h1>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                  <Col
                    className="gutter-row"
                    xs={24}
                    md={24}
                    lg={24}
                    style={{ marginBlock: "10px" }}
                  >
                    <FormInput
                      type="text"
                      name="title"
                      size="large"
                      label="Quiz Title"
                      required={true}
                    />
                    {/*//! 1-- */}
                  </Col>
                  <Col className="gutter-row" xs={24} md={12} lg={8} style={{}}>
                    <FormInput
                      type="number"
                      name="passingGrade"
                      size="large"
                      label="passingGrade "
                      // required={true}
                    />
                    {/*//! 4 --- */}
                  </Col>

                  <Col className="gutter-row" xs={24} md={12} lg={8} style={{}}>
                    <FormSelectField
                      size="large"
                      name="status"
                      options={courseStatusOptions as any}
                      // defaultValue={priceTypeOptions[2]}
                      label="status"
                      // placeholder="Select"
                      required={true}
                    />
                  </Col>
                  <Col className="gutter-row" xs={24} style={{}}>
                    <DemoVideoUI
                      // videoType={videoType as any}
                      // setVideoType={setVideoType}
                      // videoUrl={videoUrl}
                      // setVideoUrl={setVideoUrl}
                      options={["youtube", "vimeo"]}
                      label="Preview Video"
                    />
                  </Col>
                  <Col
                    className="gutter-row"
                    xs={24}
                    style={{
                      marginTop: "10px",
                    }}
                  >
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

              <div className="w-fit mx-auto">
                <Button
                  loading={quizLoading}
                  // disabled={imageUploadLoading}
                  type="default"
                  style={{
                    marginTop: "1rem",
                    background: "blue",
                    color: "white",
                  }}
                  htmlType="submit"
                >
                  Create Quiz
                </Button>
              </div>
            </Form>
          </div>
        </div>
      ) : (
        <div className="w-full  flex justify-center items-center min-h-64 animate-pulse">
          <h1 className="text-center text-red-600 font-semibold text-2xl">
            First select your Lesson by filtering{" "}
          </h1>
        </div>
      )}
    </>
  );
};

export default CreateQuiz;
