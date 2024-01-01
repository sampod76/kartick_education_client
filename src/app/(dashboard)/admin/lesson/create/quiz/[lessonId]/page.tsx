"use client";
import Form from "@/components/Forms/Form";

import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import TextEditor from "@/components/shared/TextEditor/TextEditor";
import ButtonSubmitUI from "@/components/ui/ButtonSubmitUI";
import UploadImage from "@/components/ui/UploadImage";
import DemoVideoUI from "@/components/ui/dashboardUI/DemoVideoUI";
import HeadingUI from "@/components/ui/dashboardUI/HeadingUI";
import TagsSelectUI from "@/components/ui/dashboardUI/TagsSelectUI";
import { courseStatusOptions } from "@/constants/global";
import uploadImgBB from "@/hooks/imgbbUploads";
import {useGetSingleLessonQuery} from "@/redux/api/adminApi/lessoneApi";

import { useAddQuizMutation } from "@/redux/api/adminApi/quizApi";
import { Error_model_hook, Success_model } from "@/utils/modalHook";
import { Col, Row,  message } from "antd";

import React, { useState } from "react";

export default function CreateCourseFromCourse({
  params,
}: {
  params: { lessonId: string };
}) {
  console.log(params);

  // const searchParams = useSearchParams();

  // const lessonName = searchParams.get("lessonName");
  // console.log("🚀 ~ file: page.tsx:49 ~ lessonName:", lessonName);

  const { data: lessonData } = useGetSingleLessonQuery(params.lessonId);
  console.log(lessonData);

  const [addQuiz, { isLoading: serviceLoading }] = useAddQuizMutation();

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [textEditorValue, setTextEditorValue] = useState("");

  // ! for video insert
  const [videoType, setVideoType] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");

  const demo_video = {
    video: videoType,
    platform: videoUrl,
  };

  const onSubmit = async (values: any) => {
    const imgUrl = await uploadImgBB(values.img);

    values.img = imgUrl;

    const LessonData: {} = {
      ...values,
      tags: selectedTags,
      demo_video,
      module: lessonData?.module,
      lesson: params.lessonId,
      details: textEditorValue,
    };
    console.log(LessonData);

    try {
      const res = await addQuiz(LessonData).unwrap();
      console.log(res);
      if (res.success == false) {
        Error_model_hook(res?.message);
      } else {
        Success_model("Successfully added Lesson");
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
        {/* resolver={yupResolver(adminSchema)} */}
        {/* resolver={yupResolver(IServiceSchema)} */}
        <HeadingUI>Create Quiz</HeadingUI>
        <Form submitHandler={onSubmit}>
          <h2 className="text-start font-bold tex-3xl">
            Lesson :{lessonData?.title}
          </h2>
          <div
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
              padding: "15px",
            }}
          >
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
                  required={true}
                />
                {/*//! 4 --- */}
              </Col>

              {/* 
              <Col className="gutter-row" xs={24} md={12} lg={8} style={{}}>
                <SelectAuthorField />
            
              </Col> */}

              <Col className="gutter-row" xs={24} md={12} lg={8} style={{}}>
                <FormSelectField
                  size="large"
                  name="status"
                  options={courseStatusOptions as any}
                  // defaultValue={priceTypeOptions[0]}
                  label="status"
                  // placeholder="Select"
                  required={true}
                />
                {/* //! price type 8 ---*/}
              </Col>
              <Col className="gutter-row" xs={24} md={12} lg={8} style={{}}>
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
                md={12}
                lg={8}
                style={{
                  marginTop: "10px",
                }}
              >
                <TagsSelectUI
                  selected={selectedTags}
                  setSelected={setSelectedTags}
                />
                {/*//! 10--- */}
              </Col>
              <Col className="gutter-row" xs={24} style={{}}>
                <UploadImage name="img" />
                {/* //! 2 -- */}
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
                <section
                  style={{
                    borderTopWidth: "2px",
                  }} /* className=" border-t-2" */
                >
                  <p className="text-center my-3 font-bold text-xl">
                    Description
                  </p>
                  <TextEditor
                    textEditorValue={textEditorValue}
                    setTextEditorValue={setTextEditorValue}
                  />
                </section>
              </Col>
            </Row>
          </div>

          <ButtonSubmitUI>Create Quiz</ButtonSubmitUI>
        </Form>
      </div>
    </div>
  );
}