"use client";

import Form from "@/components/Forms/Form";

import FormInput from "@/components/Forms/FormInput";

import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";

import UploadImage from "@/components/ui/UploadImage";
import DemoVideoUI from "@/components/ui/dashboardUI/DemoVideoUI";
import HeadingUI from "@/components/ui/dashboardUI/HeadingUI";

import { courseStatusOptions } from "@/constants/global";
import uploadImgBB from "@/hooks/imgbbUploads";


import { useAddSingleQuizMutation } from "@/redux/api/adminApi/singleQuiz";

import { Error_model_hook, Success_model } from "@/utils/modalHook";

import { Button, Col, Row} from "antd";
import React, { useState } from "react";

import SelectQUizField from "@/components/Forms/SelectData/SelectQUizField";
import FormTimePicker from "@/components/Forms/FormTimePicker";
import AnswerInputList from "@/components/Forms/DynamicFormFiled";
import TagsSelectUI from "@/components/ui/dashboardUI/TagsSelectUI";
import ButtonLoading from "@/components/Utlis/ButtonLoading";
import timeDurationToMilliseconds from "@/hooks/stringToMiliSecend";

const CreateSingleQuiz = () => {
  const [addSingleQuiz, { isLoading: serviceLoading }] =
    useAddSingleQuizMutation();

  // !  tag selection
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

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
    {
      title: "Option B",
      correct: false,
      img: "",
      serialNumber: 2,
      status: "active",
    },
  ]);

  const onSubmit = async (values: any) => {
    // console.log(values);
    const status = "active";
    // const imgUrl = await uploadImgBB(values.img);

    // values.imgs = [imgUrl];
    values["status"] = status;
    if (values?.time_duration) {
      values.time_duration = timeDurationToMilliseconds(values.time_duration);
    }

    const singleQuizDat: {} = {
      ...values,
      tags: selectedTags,
      demo_video,
      answers,
    };
    // console.log(singleQuizDat);

    try {
      const res = await addSingleQuiz(singleQuizDat).unwrap();
      // console.log(res);
      if (res.success == false) {
        Error_model_hook(res?.message);
      } else {
        Success_model("Successfully added the Quiz");
        setVideoUrl("")
        setVideoType(null)
        setSelectedTags([])
        setAnswers([])
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
                <UploadImage name="img" />
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
                <AnswerInputList
                  answers={answers}
                  setAnswers={setAnswers as any}
                />
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
