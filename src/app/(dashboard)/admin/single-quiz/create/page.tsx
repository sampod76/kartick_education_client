"use client";

import Form from "@/components/Forms/Form";

import FormInput from "@/components/Forms/FormInput";

import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";

import UploadImage from "@/components/ui/UploadImage";
import DemoVideoUI from "@/components/ui/dashboardUI/DemoVideoUI";
import HeadingUI from "@/components/ui/dashboardUI/HeadingUI";

import { courseStatusOptions, singleQuizTypes } from "@/constants/global";
import uploadImgBB from "@/hooks/UploadSIngleImgBB";

import { useAddSingleQuizMutation } from "@/redux/api/adminApi/singleQuiz";

import { Error_model_hook, Success_model } from "@/utils/modalHook";

import { Button, Col, Input, Row, Select } from "antd";
import React, { useState } from "react";

import SelectQUizField from "@/components/Forms/SelectData/SelectQUizField";
import FormTimePicker from "@/components/Forms/FormTimePicker";
import AnswerSInlge from "@/components/Forms/AnswerSingle";
import TagsSelectUI from "@/components/ui/dashboardUI/TagsSelectUI";
import ButtonLoading from "@/components/ui/Loading/ButtonLoading";
import timeDurationToMilliseconds from "@/hooks/stringToMiliSecend";
import AnswerMultiple from "@/components/Forms/AnswerMultiple";
import UploadMultipalImage from "@/components/ui/UploadMultipalImage";

const CreateSingleQuiz = () => {
  const [addSingleQuiz, { isLoading: serviceLoading }] =
    useAddSingleQuizMutation();

  //! for QUiz Types
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // !  tag selection
  const [quizType, setQuizTypes] = useState<
    "input" | "select" | "multiple_select"
  >("select");

  console.log(
    "🚀 ~ file: page.tsx:41 ~ CreateSingleQuiz ~ quizType:",
    quizType
  );
  // ! for video insert
  const [videoType, setVideoType] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");

  const demo_video = {
    video: videoType,
    platform: videoUrl,
  };

  // ! For quiz Answer
  const [answers, setAnswers] = useState([
    {
      title: "Option A",
      correct: true,
      img: "",
      serialNumber: 1,
      status: "active",
    },
  ]);

  const [answerInput, setAnswerInput] = useState<string>("");
  console.log(
    "🚀 ~ file: page.tsx:69 ~ CreateSingleQuiz ~ answerInput:",
    answerInput
  );

  // const [answersMultiple, setAnswersMultiple] = useState([
  //   {
  //     title: "Option A",
  //     correct: "true",
  //     img: "",
  //     serialNumber: 1,
  //     status: "active",
  //   },
  // ]);

  const onSubmit = async (values: any) => {
    // console.log(values);
    const status = "active";
    // const imgUrl = await uploadImgBB(values.img);

    // values.imgs = [imgUrl];
    if (answers) {
      values["answers"] = answers;
    } else if (answerInput) {
      values["single_answer"] = answerInput;
    } else {
      Error_model_hook("Please select an answer");
      return;
    }
    values["status"] = status;
    if (values?.time_duration) {
      values.time_duration = timeDurationToMilliseconds(values.time_duration);
    }
    const singleQuizDat: {} = {
      ...values,
      tags: selectedTags,
      demo_video,
    };

    // console.log(singleQuizDat);

    try {
      const res = await addSingleQuiz(singleQuizDat).unwrap();

      if (res.success == false) {
        Error_model_hook(res?.message);
      } else {
        Success_model("Successfully added the Quiz");
        setVideoUrl("");
        setVideoType(null);
        setSelectedTags([]);
        setAnswers([]);
      }
      // console.log(res);
    } catch (error: any) {
      Error_model_hook(error?.message);
      console.log(error);
    }
  };

  return (
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
        <Form submitHandler={onSubmit}>
          <div
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
              padding: "15px",
              marginBottom: "10px",
            }}
          >
            <HeadingUI>Create A Single Quiz</HeadingUI>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col
                className="gutter-row"
                xs={24}
                style={{
                  marginBottom: "10px",
                }}
              >
                <SelectQUizField />
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
                xs={24}
                md={12}
                lg={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="number"
                  name="serialNumber"
                  size="large"
                  label="serialNumber "
                  required={true}
                />
              </Col>
              <Col
                className="gutter-row"
                xs={24}
                md={12}
                lg={8}
                style={
                  {
                    // background:"r ed"
                  }
                }
              >
                <FormTimePicker name="time_duration" label="Time Duration" />
              </Col>

              {/*     <Col
                className="gutter-row"
                xs={24}
                md={12}
                lg={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <SelectModuleField />
                
              </Col>
              <Col
                className="gutter-row"
                xs={24}
                md={12}
                lg={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <SelectLessonField />
                
              </Col>  */}

              <Col
                className="gutter-row"
                xs={24}
                md={12}
                lg={8}
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
                  required={true}
                />
              </Col>
              <Col
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
                  label="Demo video"
                />
              </Col>
              <Col
                className="gutter-row"
                xs={24}
                style={{
                  marginBottom: "10px",
                }}
              >
                <TagsSelectUI
                  selected={selectedTags}
                  setSelected={setSelectedTags}
                />
              </Col>
              <Col
                className="gutter-row"
                xs={24}
                style={{
                  marginBottom: "10px",
                }}
              >
                <UploadMultipalImage name="img" />
              </Col>
            </Row>
            <Col
              className="gutter-row"
              xs={24}
              style={{
                marginBottom: "10px",
              }}
            >
              <FormTextArea label="Description" name="details" />
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

            {/* <Col
                className="gutter-row"
                xs={24}
              
                style={{
                  marginBottom: "10px",
                }}
              >
                <SelectAuthorField />
              
              </Col>  */}

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
                <Select
                  placeholder="Select Quiz Types"
                  style={{ width: "100%" }}
                  onChange={(value) => setQuizTypes(value)}
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
                {quizType === "input" && (
                  <Input
                    placeholder="Type the answer"
                    onBlur={(value: any) => setAnswerInput(value.target.value)}
                  />
                )}
              </Col>
            </Row>
          </div>
          {serviceLoading ? (
            <ButtonLoading />
          ) : (
            <Button htmlType="submit" type="default">
              Create
            </Button>
          )}
        </Form>
      </div>
    </div>
  );
};

export default CreateSingleQuiz;
