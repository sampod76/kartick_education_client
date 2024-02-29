"use client";

import Form from "@/components/Forms/Form";

import FormInput from "@/components/Forms/FormInput";

import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import DemoVideoUI from "@/components/ui/dashboardUI/DemoVideoUI";


import { courseStatusOptions, singleQuizTypes } from "@/constants/global";

import { useAddSingleQuizMutation } from "@/redux/api/adminApi/singleQuizApi";
import { Error_model_hook, Success_model } from "@/utils/modalHook";

import { Button, Col, Input, Row, Select } from "antd";
import React, { useState } from "react";

import FormTimePicker from "@/components/Forms/FormTimePicker";
import AnswerSInlge from "@/components/Forms/answer/AnswerSingle";
import TagsSelectUI from "@/components/ui/dashboardUI/TagsSelectUI";
import ButtonLoading from "@/components/ui/Loading/ButtonLoading";
import timeDurationToMilliseconds from "@/hooks/stringToMiliSecend";
import AnswerMultiple from "@/components/Forms/answer/AnswerMultiple";
import UploadMultipalImage from "@/components/ui/UploadMultipalImage";
import { useGetAllCategoryQuery } from "@/redux/api/adminApi/categoryApi";
import SelectCategoryField from "@/components/Forms/SelectData/SelectCategoryFIeld";
import SelectCategoryChildren from "@/components/Forms/GeneralField/SelectCategoryChildren";
import { useGetAllCategoryChildrenQuery } from "@/redux/api/categoryChildrenApi";
import LabelUi from "@/components/ui/dashboardUI/LabelUi";
import dynamic from "next/dynamic";
import { ENUM_STATUS } from "@/constants/globalEnums";
import { removeNullUndefinedAndFalsey } from "@/hooks/removeNullUndefinedAndFalsey";
import { IQuizType } from "@/types/quiz/singleQuizType";
import AnswerFind from "@/components/Forms/answer/AnswerFind";
import UploadAudioFile from "@/components/ui/UploadAudio";
const TextEditor = dynamic(
  () => import("@/components/shared/TextEditor/TextEditor"),
  {
    ssr: false,
  }
);

const CreateSingleQuiz = () => {
  //

  const [quizType, setQuizTypes] = useState<
    IQuizType
  >("select"); // !  tag selection

  const [isReset, setIsReset] = useState(false);
  const [imageUploadLoading, isImageloading] = useState(false);


  // ! For quiz Answer// 


  const [answers, setAnswers] = useState([]); ///! select and multiple select

  const [singleAnswer, setSingleAnswerInput] = useState<string>(""); ///! for input
  //
  const [category, setCategory] = useState<{ _id?: string; title?: string }>(
    {}
  );
  const [course, setCourse] = useState<{ _id?: string; title?: string }>({});
  const [milestone, setmilestone] = useState<{ _id?: string; title?: string }>(
    {}
  );
  const [module, setmodule] = useState<{ _id?: string; title?: string }>({});
  const [lesson, setlesson] = useState<{ _id?: string; title?: string }>({});
  const [quiz, setquiz] = useState<{ _id?: string; title?: string }>({});

  const query: Record<string, any> = {};
  query["children"] = "course-milestone-module-lessons-quiz";
  //! for Category options selection
  const { data: Category, isLoading } = useGetAllCategoryChildrenQuery({
    ...query,
  });
  const categoryData: any = Category?.data;
  //

  const [addSingleQuiz, { isLoading: serviceLoading }] =
    useAddSingleQuizMutation();

  const onSubmit = async (values: any) => {

    console.log("🚀 ~ onSubmit ~ values:", values)
    // console.log("🚀 ~ onSubmit ~ values:", values);
    if (!quiz?._id) {
      Error_model_hook("Please ensure your are selected quiz");
      return;
    }
    if (answers.length) {
      values["answers"] = answers;
    } else if (singleAnswer) {
      values["single_answer"] = singleAnswer;
    } else {
      Error_model_hook("Please select an answer");
      return;
    }

    if (!quizType) {
      Error_model_hook("Please select an quiz type");
      return;
    }

    if (values?.time_duration) {
      values.time_duration = timeDurationToMilliseconds(values.time_duration);
    }
    const singleQuizDat: {} = {
      ...values,
      category: category?._id,
      course: course?._id,
      milestone: milestone?._id,
      module: module?._id,
      lesson: lesson?._id,
      quiz: quiz?._id,
      type: quizType,
      
    };
    removeNullUndefinedAndFalsey(singleQuizDat)
   

// return


    try {
      const res = await addSingleQuiz(singleQuizDat).unwrap();

      if (res?.success == false) {
        Error_model_hook(res?.message);
      } else {
        Success_model("Successfully added the Quiz");
        setIsReset(true);
        setAnswers([]);
      }
      // console.log(res);
    } catch (error: any) {
      Error_model_hook(error?.message);
      console.log(error);
    }
  };

  return (
    <div>
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
            <Col xs={24} md={12}>
              <SelectCategoryChildren
                lableText="Select category"
                setState={setCategory}
                isLoading={isLoading}
                categoryData={categoryData}
              />
            </Col>
            <Col xs={24} md={12}>
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
            <Col xs={24} lg={12}>
              <SelectCategoryChildren
                lableText="Select quiz"
                setState={setquiz}
                categoryData={
                  //@ts-ignore
                  lesson?.quizzes || []
                }
              />
            </Col>
          </Row>
        </div>
      </div>
      {quiz?._id ? (
        <div
          style={{
            boxShadow:
              "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            borderRadius: "1rem",
            backgroundColor: "white",
            padding: "1rem",
          }}
        >
          <Form
            submitHandler={onSubmit}
            isReset={isReset}
          // defaultValues={{ status: ENUM_STATUS.ACTIVE }}
          >
            <h1 className="text-xl font-bold text-center border-b-2 border-spacing-4 mb-2 ">
              Create A Single Quiz
            </h1>
            <div
              style={{
                border: "1px solid #d9d9d9",
                borderRadius: "5px",
                padding: "15px",
                marginBottom: "10px",
              }}
            >
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col
                  className="gutter-row"
                  xs={12}
                  md={8}
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  <LabelUi>
                    Please select quiz type{" "}
                    <span className="text-red-500">*</span>
                  </LabelUi>

                  {/* /// ! Quiz Types */}
                  <Select
                    placeholder="Select Quiz Types"
                    style={{ width: "100%" }}
                    onChange={(value: any) => setQuizTypes(value)}
                    size="large"
                    defaultValue={'select'}
                  >
                    {singleQuizTypes.map((item: any, i: number) => {
                      return (
                        <Select.Option value={item} key={i}>
                          {item}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Col>
                <Col
                  className="gutter-row"
                  xs={24}
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  <FormInput
                    type="text"
                    name="title"
                    size="large"
                    label="Quiz Title"
                    required={true}
                  />
                </Col>

                <Col
                  className="gutter-row"
                  xs={12}
                  md={8}
                  style={{
                    marginTop: "8px",

                  }}
                >
                  <FormInput
                    type="number"
                    name="serialNumber"
                    size="large"
                    label="Serial number"
                  // required={true}
                  />
                </Col>

                <Col
                  className="gutter-row"
                  xs={12}
                  md={8}
                  style={{
                    marginBottom: "10px",
                    marginTop: "8px",
                  }}
                >
                  <FormTimePicker name="time_duration" label="Time Duration" />
                </Col>


                <Col
                  className="gutter-row"
                  xs={12}
                  md={8}
                  style={{
                    marginBottom: "10px",
                    marginTop: "8px",
                  }}
                >
                  <FormSelectField
                    size="large"
                    name="status"
                    options={courseStatusOptions as any}
                    // defaultValue={priceTypeOptions[0]}
                    label="status"
                    // placeholder="Select"
                    required={true}
                  />
                </Col>
                <Col
                  className="gutter-row"
                  hidden={quizType === "audio" ? true : false}
                  xs={24}
                  style={{
                    marginBottom: "10px",
                  }}
                >
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
                  hidden={quizType === "audio" ? true : false}
                  className="gutter-row"
                  xs={24}
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  <TagsSelectUI />
                </Col>

                <Col
                  hidden={quizType === "audio" ? true : false}
                  className="gutter-row"
                  xs={24}
                  style={{
                    margin: "20px 0",
                  }}
                >

                  <LabelUi>Select Quiz Question images (optional)</LabelUi>
                  <UploadMultipalImage isImageloading={isImageloading} isReset={isReset} name="imgs" />
                </Col>
                <Col
                  hidden={quizType !== "audio" ? true : false}
                  className="gutter-row"
                  xs={24}
                  style={{
                    margin: "20px 0",
                  }}
                >

                  <LabelUi>Add Your Audio Quiz</LabelUi>
                  <UploadAudioFile isReset={isReset} fileType="audio" name="quizData.link" />
                </Col>
              </Row>
              <Col
                className="gutter-row"
                xs={24}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormTextArea label="Short Description" name="short_description" />
              </Col>
              <Col
                className="gutter-row"
                xs={24}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormTextArea
                  name="hints"
                  label="hints"
                  placeholder="Give hints for Answer"
                />
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

              <Row
                gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                style={{
                  marginBlock: "2em",
                }}
              >
                <Col
                  className="gutter-row"
                  xs={24}
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  {quizType === "select" && (
                    <AnswerSInlge
                      answers={answers}
                      setAnswers={setAnswers as any}
                    />
                  )}
                  {quizType === "multiple_select" && (
                    <AnswerMultiple
                      answersMultiple={answers}
                      setAnswersMultiple={setAnswers as any}
                    />
                  )}
                  {quizType === "find" && (
                    <AnswerFind
                      answersFind={answers}
                      setAnswersFind={setAnswers as any}
                    />
                  )}
                  {/* //! should update cause it is statics */}
                  {quizType === "drag" && (
                    <AnswerMultiple
                      answersMultiple={answers}
                      setAnswersMultiple={setAnswers as any}
                    />
                  )}
                  {quizType === "audio" && (
                    <AnswerMultiple
                      answersMultiple={answers}
                      setAnswersMultiple={setAnswers as any}
                    />
                  )}
                  {quizType === "input" && (
                    <>
                      <LabelUi>
                        Answer <span className="text-red-700">*</span>
                      </LabelUi>
                      <Input
                        placeholder="Type the answer"
                        style={{
                          width: "70%"
                        }}
                        onBlur={(value: any) =>
                          setSingleAnswerInput(value.target.value)
                        }
                      />
                    </>
                  )}
                </Col>
              </Row>
            </div>
            <div className="flex justify-center items-center">
              {serviceLoading ? (
                <ButtonLoading />
              ) : (
                <Button  htmlType="submit" size="large" style={{ width: "10rem" }} type="default"> Create
                </Button>
              )}
            </div>
          </Form>
        </div>
      ) : (
        <div className="w-full h-full flex justify-center items-center min-h-64">
          <h1 className="text-center text-red-500 font-semibold text-2xl">
            First select your quiz by filtering{" "}
          </h1>
        </div>
      )}
    </div>
  );
};

export default CreateSingleQuiz;
