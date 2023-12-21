"use client";

import DynamicFormFiled from "@/components/Forms/DynamicFormFiled";
import Form from "@/components/Forms/Form";

import FormInput from "@/components/Forms/FormInput";

import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";

import UploadImage from "@/components/ui/UploadImage";
import DemoVideoUI from "@/components/ui/dashboardUI/DemoVideoUI";
import HeadingUI from "@/components/ui/dashboardUI/HeadingUI";
import TagUI from "@/components/ui/dashboardUI/TagUI";
import { courseStatusOptions } from "@/constants/global";
import uploadImgBB from "@/hooks/imgbbUploads";
import dayjs from "dayjs";

import { useAddSingleQuizMutation } from "@/redux/api/adminApi/singleQuiz";

import { Error_model_hook, Success_model } from "@/utils/modalHook";

import { Button, Col, Row, TimePicker, message } from "antd";
import React, { useState } from "react";
import SelectAuthorField from "@/components/Forms/SelectData/SelectAuthor";
import SelectModuleField from "@/components/Forms/SelectData/SelectModuleField";
import SelectLessonField from "@/components/Forms/SelectData/SelectLessonField";
import SelectQUizField from "@/components/Forms/SelectData/SelectQUizField";
import FormTimePicker from "@/components/Forms/FormTimePicker";
import AnswerInputList from "@/components/Forms/DynamicFormFiled";

const CreateSingleQuiz = () => {
  const [addSingleQuiz, { isLoading: serviceLoading }] =
    useAddSingleQuizMutation();

  // !  tag selection

  const tagOptions = ["course", "tech", "update", "english"];
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  console.log(selectedTags, "selectedTags........1");

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
      img: "https://...",
      serialNumber: 1,
      status: "active",
    },
    {
      title: "Option B",
      correct: false,
      img: "https://...",
      serialNumber: 2,
      status: "active",
    },
  ]);

  console.log(answers, "answer");
  const onSubmit = async (values: any) => {
    // console.log(values);
    const status = "active";
    const imgUrl = await uploadImgBB(values.img);

    values.img = imgUrl;
    values["status"] = status;
    values.time_duration= Number(values.time_duration)

    const LessonData: {} = {
      ...values,
      tags: selectedTags,
      demo_video,
      answers,
    };
    console.log(LessonData);

    try {
      const res = await addSingleQuiz(LessonData).unwrap();
      console.log(res);
      if (res.success == false) {
        Error_model_hook(res?.message);
      } else {
        Success_model("Successfully added the Quiz");
      }
      // console.log(res);
    } catch (error: any) {
      Error_model_hook(error?.message);
      console.log(error);
    }
  };

  return (
    <div>
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
                md={12}
                lg={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="title"
                  size="large"
                  label="Quiz Name"
                  required={true}
                />
                {/*//! 1  */}
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
                {/*//! 4  */}
              </Col>
              <Col
                className="gutter-row"
                xs={24}
                md={12}
                lg={8}
                style={{
                  marginBottom: "10p",
                  // background:"r ed"
                }}
              >
                {/* <FormInput
                  type="time"
                  name="time_duration"
                  size="large"
                  label="time_duration "
                  required={true}
                /> */}

                {/* <TimePicker
                  // onChange={onChange}
                  className="w-full my-3 lg:my-1 lg:mt-12"
                  defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
                /> */}
                <FormTimePicker name="time_duration" label="Time Duration" />
                {/*//! 5  */}
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
                <FormTextArea name="details" />
                {/*//! 3 */}
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
                <FormTextArea
                  name="hints"
                  placeholder="Give hints for Answer"
                />
                {/*//! 6 */}
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
                <SelectAuthorField />
                {/* //! Author 9 */}
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
                <SelectModuleField />
                {/* //! module 10 */}
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
                {/* //! Lesson 11 */}
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
                <SelectQUizField />
                {/* //! quiz 12  */}
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
                <FormSelectField
                  size="large"
                  name="status"
                  options={courseStatusOptions as any}
                  // defaultValue={priceTypeOptions[0]}
                  label="status"
                  // placeholder="Select"
                  required={true}
                />
                {/* //! price type 13 ---*/}
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
                <DemoVideoUI
                  videoType={videoType as any}
                  setVideoType={setVideoType}
                  videoUrl={videoUrl}
                  setVideoUrl={setVideoUrl}
                  options={["youtube", "vimeo"]}
                />
                {/* //! Demo Video 14 */}
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
                <TagUI
                  selectedTags={selectedTags}
                  setSelectedTags={setSelectedTags}
                  tagOptions={tagOptions}
                />
                {/*//! 15  */}
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
                <UploadImage name="img" />
                {/* //! 2  */}
              </Col>
            </Row>
            <Row
              gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
              style={{
                marginBlock: "2em",
              }}
            >
              <Col
                className="gutter-row"
                xs={24}
                md={12}
                lg={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                {/* <DynamicFormFiled  /> */}
                <AnswerInputList answers={answers} setAnswers={setAnswers} />
                {/*//! 4 --- */}
              </Col>
            </Row>
          </div>

          <Button htmlType="submit" type="default">
            Create
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CreateSingleQuiz;
