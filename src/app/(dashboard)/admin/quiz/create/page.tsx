"use client";

import Form from "@/components/Forms/Form";

import FormInput from "@/components/Forms/FormInput";

import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import SelectAuthorField from "@/components/Forms/SelectData/SelectAuthor";
import SelectLessonField from "@/components/Forms/SelectData/SelectLessonField";
import SelectModuleField from "@/components/Forms/SelectData/SelectModuleField";
import ButtonSubmitUI from "@/components/ui/ButtonSubmitUI";

import UploadImage from "@/components/ui/UploadImage";
import DemoVideoUI from "@/components/ui/dashboardUI/DemoVideoUI";
import HeadingUI from "@/components/ui/dashboardUI/HeadingUI";

import TagsSelectUI from "@/components/ui/dashboardUI/TagsSelectUI";
import { courseStatusOptions } from "@/constants/global";
import uploadImgBB from "@/hooks/imgbbUploads";


import { useAddQuizMutation } from "@/redux/api/adminApi/quizApi";


import { Error_model_hook, Success_model } from "@/utils/modalHook";

import {  Col, Row, message } from "antd";
import React, { useState } from "react";

const CreateQuiz = () => {
  const [addQuiz, { isLoading: serviceLoading }] = useAddQuizMutation();

  const [selectedTags, setSelectedTags] = useState<string[]>(["tag1","tag2"]);


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
    <div style={{
      boxShadow:
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      borderRadius: "1rem",
      backgroundColor: "white",
      padding: "1rem",
    }}>
      <div>
        {/* resolver={yupResolver(adminSchema)} */}
        {/* resolver={yupResolver(IServiceSchema)} */}
        <Form submitHandler={onSubmit}>
          <div
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
              padding: "15px",
              
            }}
          >
            <HeadingUI
           
            >
              Create Quiz
            </HeadingUI>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col
                className="gutter-row"
                xs={24}
                md={12}
                lg={8}
                style={{
                  
                }}
              >
                <FormInput
                  type="text"
                  name="title"
                  size="large"
                  label="Lesson Name"
                  required={true}
                />
                {/*//! 1-- */}
              </Col>
              <Col
                className="gutter-row"
                xs={24}
                md={12}
                lg={8}
                style={{
                  
                }}
              >
                <FormInput
                  type="number"
                  name="passingGrade"
                  size="large"
                  label="passingGrade "
                  required={true}
                />
                {/*//! 4 --- */}
              </Col>
              
              <Col
                className="gutter-row"
                xs={24}
                md={12}
                lg={8}
                style={{
                  
                }}
              >
              <SelectAuthorField/>
                {/* //! Author 5 --*/}
              </Col>
              <Col
                className="gutter-row"
                xs={24}
                md={12}
                lg={8}
                style={{
                  
                }}
              >
              <SelectModuleField/>
                {/* //! module 6 ----*/}
              </Col>
              <Col
                className="gutter-row"
                xs={24}
                md={12}
                lg={8}
                style={{
                  
                }}
              >
             <SelectLessonField/>
                {/* //! Lesson 7 ----*/}
              </Col>
              <Col
                className="gutter-row"
                xs={24}
                md={12}
                lg={8}
                style={{
                  
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
                {/* //! price type 8 ---*/}
              </Col>
              <Col
                className="gutter-row"
                xs={24}
                md={12}
                lg={8}
                style={{
                  
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
                md={12}
                lg={8}
                style={{
                  marginTop:"10px"
                }}
              >
               <TagsSelectUI
                      selected={selectedTags}
                      setSelected={setSelectedTags}

                    />
                {/*//! 10--- */}
              </Col>
              <Col
                className="gutter-row"
                xs={24}
                md={12}
                lg={8}
                style={{
                  
                }}
              >
                <UploadImage name="img" />
                {/* //! 2 -- */}
              </Col>
              <Col
                className="gutter-row"
                xs={24}
              
                style={{
                  
                }}
              >
                <FormTextArea rows={15} label="Description" name="details" />
               
              </Col>
            </Row>
          </div>

          <ButtonSubmitUI>
            Create
          </ButtonSubmitUI>
        </Form>
      </div>
    </div>
  );
};

export default CreateQuiz;
