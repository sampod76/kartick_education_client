"use client";

import Form from "@/components/Forms/Form";

import FormInput from "@/components/Forms/FormInput";

import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import SelectAuthorField from "@/components/Forms/SelectData/SelectAuthor";
import SelectModuleField from "@/components/Forms/SelectData/SelectModuleField";
import ButtonSubmitUI from "@/components/ui/ButtonSubmitUI";

import UploadImage from "@/components/ui/UploadImage";
import DemoVideoUI from "@/components/ui/dashboardUI/DemoVideoUI";
import SubHeadingUI from "@/components/ui/dashboardUI/SubHeadingUI";

import TagsSelectUI from "@/components/ui/dashboardUI/TagsSelectUI";
import { courseStatusOptions } from "@/constants/global";
import uploadImgBB from "@/hooks/UploadSIngleImgBB";

import {
  useAddLessonMutation,
  useGetAllLessonQuery,
} from "@/redux/api/adminApi/lessoneApi";

import { Error_model_hook, Success_model } from "@/utils/modalHook";

import { Col, Row, message } from "antd";
import React, { useState } from "react";

const CreateLesson = () => {
  const [textEditorValue, setTextEditorValue] = useState("");
  // ! for video insert
  const [videoType, setVideoType] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const video = {
    video: videoUrl,
    platform: videoType,
  };

  const [addLesson, { isLoading: serviceLoading }] = useAddLessonMutation();
  const { data: existLesson, isLoading } = useGetAllLessonQuery({});

  // !  tag selection

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const onSubmit = async (values: any) => {
    // console.log(values);

    // const imgUrl = await uploadImgBB(values.img);

    // values.img = imgUrl;
    values.vedios = [video];
    const LessonData: {} = {
      ...values,
      tags: selectedTags,
    };
    // console.log(LessonData);
    // return;
    try {
      const res = await addLesson(LessonData).unwrap();
      // console.log(res);
      if (res.success == false) {
        Error_model_hook(res?.message);
      } else {
        Success_model("Successfully added Lesson");
        setVideoType(null);
        setVideoUrl("");
        setSelectedTags([]);
      }
      // console.log(res);
    } catch (error: any) {
      Error_model_hook(error?.message);
      console.log(error);
    }
  };

  if (serviceLoading) {
    return message.loading("Loading...");
  }
  const roundedNumber = Number(existLesson?.data[0].lesson_number).toFixed(1);

  // Add 0.1 to the rounded number and use toFixed again when logging
  const prelesson_number = (parseFloat(roundedNumber) + 0.1).toFixed(1);

  // console.log(prelesson_number);

  return (
    <div>
      <div className="shadow-xl rounded-lg bg-white">
        {/* resolver={yupResolver(adminSchema)} */}
        {/* resolver={yupResolver(IServiceSchema)} */}
        <SubHeadingUI>Create Lesson</SubHeadingUI>
        <Form
          submitHandler={onSubmit}
          defaultValues={{ lesson_number: Number(prelesson_number) }}
        >
          <div
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
              padding: "15px",
              marginBottom: "10px",
            }}
          >
            <hr className="border-1 my-1" />
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
                  label="Lesson Title"
                  required={true}
                />
                {/*//! 1 */}
              </Col>

              {/* <Col
                className="gutter-row"
                xs={24}
                md={12}
                lg={7}
                style={{
                  marginBottom: "10px",
                }}
              >
                <SelectAuthorField />
              </Col> */}
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
                  name="lesson_number"
                  size="large"
                  label="Lesson No"
                  required={true}
                />
                {/*//! 2 */}
              </Col>
              <Col xs={24}>
                <DemoVideoUI
                  label="Video"
                  videoType={videoType as any}
                  setVideoType={setVideoType}
                  videoUrl={videoUrl}
                  setVideoUrl={setVideoUrl}
                  options={["youtube", "vimeo"]}
                />
                {/*//! 12*/}
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
                {/*//! 6 */}
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
                <FormTextArea label="Description" rows={15} name="details" />
              </Col>
            </Row>
          </div>

          <ButtonSubmitUI>Create Lesson</ButtonSubmitUI>
        </Form>
      </div>
    </div>
  );
};

export default CreateLesson;
