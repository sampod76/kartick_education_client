"use client";

import Form from "@/components/Forms/Form";

import FormInput from "@/components/Forms/FormInput";

import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import { courseStatusOptions, singleQuizTypes } from "@/constants/global";

import {
  useGetSingleOneQuizQuery,
  useUpdateSingleQuizMutation,
} from "@/redux/api/adminApi/singleQuizApi";

import { Error_model_hook, Success_model } from "@/utils/modalHook";

import { Button, Col, Input, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import FormTimePicker from "@/components/Forms/FormTimePicker";
import AnswerSInlge from "@/components/Forms/answer/AnswerSingle";
import TagsSelectUI from "@/components/ui/dashboardUI/TagsSelectUI";
import ButtonLoading from "@/components/ui/Loading/ButtonLoading";

import AnswerMultiple from "@/components/Forms/answer/AnswerMultiple";
import UploadMultipalImage from "@/components/ui/UploadMultipalImage";

import SelectCategoryChildren from "@/components/Forms/GeneralField/SelectCategoryChildren";
import { useGetAllCategoryChildrenQuery } from "@/redux/api/categoryChildrenApi";
import LabelUi from "@/components/ui/dashboardUI/LabelUi";
import TextEditor from "@/components/shared/TextEditor/TextEditor";
import LoadingSkeleton from "@/components/ui/Loading/LoadingSkeleton";
import timeDurationToMilliseconds, {
  convertTimeDurationMillisecondsToTime,
} from "@/hooks/stringToMiliSecend";
import { removeNullUndefinedAndFalsey } from "@/hooks/removeNullUndefinedAndFalsey";
import AnswerFind from "@/components/Forms/answer/AnswerFind";
import { IQuizType } from "@/types/quiz/singleQuizType";
import UploadAudioFile from "@/components/ui/UploadAudio";

export default function EditSingleQuiz({
  singleQuizId,
}: {
  singleQuizId: string;
}) {
  const [quizType, setQuizTypes] = useState<
    IQuizType
  >("select"); // !  tag selection
  const [videoType, setVideoType] = useState(null); // ! for video insert
  const [videoUrl, setVideoUrl] = useState("");
  // ! For quiz Answer
  const [answers, setAnswers] = useState([]);

  const [singleAnswer, setSingleAnswerInput] = useState<string>("");
  // console.log(
  //   "🚀 ~ file: page.tsx:58 ~ CreateSingleQuiz ~ singleAnswer:",
  //   singleAnswer
  // );
  //
  const [isReset, setIsReset] = useState(false);
  //
  const [category, setCategory] = useState({});
  const [courses, setCourses] = useState({});
  const [milestone, setmilestone] = useState({});
  const [module, setmodule] = useState<{ _id?: string; title?: string }>({});
  const [lesson, setlesson] = useState<{ _id?: string; title?: string }>({});
  const [quiz, setquiz] = useState<{ _id?: string; title?: string }>({});

  //
  const [updateSingleQuiz, { isLoading: serviceLoading }] =
    useUpdateSingleQuizMutation();
  //
  const { data = {}, isLoading: singleOneLoading } = useGetSingleOneQuizQuery(
    singleQuizId,
    { skip: !Boolean(singleQuizId) }
  );

  console.log("🚀 ~ data:", data);
  useEffect(() => {
    setAnswers(data?.answers || []);
    setQuizTypes(data?.type);
  }, [data]);

  const query: Record<string, any> = {};
  query["children"] = "course-milestone-module-lessons-quiz";
  //! for Category options selection
  const { data: Category, isLoading } = useGetAllCategoryChildrenQuery({
    ...query,
  });
  const categoryData: any = Category?.data;
  //

  const demo_video = {
    video: videoType,
    platform: videoUrl,
  };

  const onSubmit = async (values: any) => {
    removeNullUndefinedAndFalsey(values);
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
    // console.log(values, "ttttttttttttttttttttttt");
    if (typeof values?.time_duration === "string") {
      values.time_duration = timeDurationToMilliseconds(values.time_duration);
    }
    if (quiz?._id) {
      values["quiz"] = quiz?._id;
    } else {
      values["quiz"] = data?.quiz?._id;
    }
    if (module?._id) {
      values["module"] = module?._id;
    } else {
      values["module"] = data?.module?._id;
    }
    const singleQuizDat: {} = {
      ...values,
      demo_video,
      type: quizType,
    };

    try {
      const res = await updateSingleQuiz({
        id: singleQuizId,
        data: { ...singleQuizDat },
      }).unwrap();

      if (res?.success == false) {
        Error_model_hook(res?.message);
      } else {
        Success_model("Successfully Update the Quiz");
        setVideoUrl("");
        setVideoType(null);
        setAnswers([]);
        setIsReset(true);
      }
      // console.log(res);
    } catch (error: any) {
      Error_model_hook(error?.message);
      console.log(error);
    }
  };

  if (singleOneLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div>
      <div>
        <h1 className="text-xl font-bold border-b-2 border-spacing-4 mb-2  ">
          Update single quiz
        </h1>
        {/* <div className="text-xl font-bold space-x-2 mb-2 text-start my-2 shadow-lg p-3 bg-white rounded-lg">
          <span className=" p-3  text-base md:text-lg border rounded-lg hover:bg-blue-600 hover:text-white">
            {" "}
            Category:
            {data?.lesson?.module?.milestone?.course?.category?.title}
          </span>{" "}
          <span className=" p-3 text-base md:text-lg border rounded-xl hover:bg-blue-600 hover:text-white">
            Course:{data?.lesson?.module?.milestone?.course?.title}
          </span>
          <h1 className=" mt-3 p-1 rounded-lg w-fit text-base md:text-lg hover:bg-blue-600 hover:text-white">
            Milestone:{data?.lesson?.module?.milestone?.milestone_number}
            {" : "}
            {data?.lesson?.module?.milestone?.title}
          </h1>
          <h1 className=" mt-3 p-1 rounded-lg w-fit text-base md:text-lg hover:bg-blue-600 hover:text-white">
            Module:{data?.lesson?.module?.module_number}
            {" : "}
            {data?.lesson?.module?.title}
          </h1>
          <h1 className=" mt-3 p-1 rounded-lg w-fit text-base md:text-lg hover:bg-blue-600 hover:text-white">
            Module:{data?.lesson?.module_number}
            {" : "}
            {data?.lesson?.title}
          </h1>
         
        </div> */}
      </div>

      {data?._id ? (
        <div
          style={{
            boxShadow:
              "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            borderRadius: "1rem",
            backgroundColor: "white",
            padding: "1rem",
          }}
        >
          <div className="border-2 rounded-lg my-3 p-5 ">
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
                  setState={setCourses}
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
                    courses?.milestones || []
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
          <Form isReset={isReset} submitHandler={onSubmit} defaultValues={data}>
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
                  />
                </Col>
                <Col
                  className="gutter-row"
                  xs={4}
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  <FormInput
                    type="number"
                    name="serialNumber"
                    size="large"
                    label="Serial number"
                  //
                  />
                </Col>
                <Col
                  className="gutter-row"
                  xs={4}
                  style={
                    {
                      // background:"r ed"
                    }
                  }
                >
                  <FormTimePicker name="time_duration" label="Time Duration" />
                </Col>
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
                  <Select
                    placeholder="Select Quiz Types"
                    style={{ width: "100%" }}
                    onChange={(value) => setQuizTypes(value)}
                    size="large"
                    defaultValue={data.type}
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
                  xs={12}
                  md={8}
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  <FormSelectField
                    size="large"
                    name="status"
                    options={courseStatusOptions as any}
                    // defaultValue={priceTypeOptions[0]}
                    label="status"
                    // placeholder="Select"
                    defaultValue={data.status}
                  />
                </Col>
                {/* <Col
                  className="gutter-row"
                  xs={24}
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  <DemoVideoUI
                    videoType={videoType as any}
                    setVideoType={setVideoType}
                    videoUrl={videoUrl}
                    setVideoUrl={setVideoUrl}
                    options={["youtube", "vimeo"]}
                    label="Preview Video"
                    defaultValue={data.demo_video}
                  />
                </Col> */}
                <Col
                  className="gutter-row"
                  xs={24}
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  <TagsSelectUI defaultTags={data.tags || []} />
                </Col>
                <Col
                  hidden={quizType === "audio" ? true : false}
                  className="gutter-row"
                  xs={24}
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  <UploadMultipalImage
                    defaultImage={data.imgs || []}
                    name="imgs"
                  />
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
                  <UploadAudioFile defaultFiles={data?.quizData?.link} isReset={isReset} fileType="audio" name="quizData.link" />
                </Col>
              </Row>
              <Col

                className="gutter-row"
                xs={24}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormTextArea label="Description" name="short_description" />
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
                  {quizType === "audio" && (
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
                    <AnswerFind
                      answersFind={answers}
                      setAnswersFind={setAnswers as any}
                    />
                  )}
                  {quizType === "input" && (
                    <>
                      <LabelUi>
                        Answer <span className="text-red-700">*</span>
                      </LabelUi>
                      <Input
                        placeholder="Type the answer"
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
                <Button htmlType="submit" type="default">
                  Update
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
}
