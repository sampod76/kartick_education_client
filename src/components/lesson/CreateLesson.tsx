"use client";

import Form from "@/components/Forms/Form";

import FormInput from "@/components/Forms/FormInput";

import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import SelectCategoryChildren from "@/components/Forms/GeneralField/SelectCategoryChildren";
import SelectAuthorField from "@/components/Forms/SelectData/SelectAuthor";
import SelectModuleField from "@/components/Forms/SelectData/SelectModuleField";
import ButtonSubmitUI from "@/components/ui/ButtonSubmitUI";

import UploadImage from "@/components/ui/UploadImage";
import UploadMultipalImage from "@/components/ui/UploadMultipalImage";
import DemoVideoUI from "@/components/ui/dashboardUI/DemoVideoUI";
import SubHeadingUI from "@/components/ui/dashboardUI/SubHeadingUI";

import TagsSelectUI from "@/components/ui/dashboardUI/TagsSelectUI";
import { courseStatusOptions } from "@/constants/global";
import uploadImgBB from "@/hooks/UploadSIngleImgBB";

import {
  useAddLessonMutation,
  useGetAllLessonQuery,
} from "@/redux/api/adminApi/lessoneApi";
import { useGetAllCategoryChildrenQuery } from "@/redux/api/categoryChildrenApi";

import { Error_model_hook, Success_model } from "@/utils/modalHook";

import { Col, Row, message } from "antd";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import VideoSelect from "@/components/Forms/VideoSelect";
import LoadingSkeleton from "@/components/ui/Loading/LoadingSkeleton";
import ButtonGroup from "antd/es/button/button-group";
import ButtonLoading from "@/components/ui/Loading/ButtonLoading";
import { FormProps, useForm } from "react-hook-form";
import { ENUM_STATUS, ENUM_YN } from "@/constants/globalEnums";
import { removeNullUndefinedAndFalsey } from "@/hooks/removeNullUndefinedAndFalsey";
const TextEditor = dynamic(
  () => import("@/components/shared/TextEditor/TextEditor"),
  {
    ssr: false,
  }
);
const CreateLesson = () => {
  //----------------------------------------------------------------
  const [isReset, setIsReset] = useState(false);
  const [category, setCategory] = useState<{ _id?: string; title?: string }>(
    {}
  );
  const [course, setCourse] = useState<{ _id?: string; title?: string }>({});
  const [milestone, setmilestone] = useState<{ _id?: string; title?: string }>(
    {}
  );
  const [module, setmodule] = useState<{ _id?: string; title?: string }>({});
  //! for Category options selection
  const query: Record<string, any> = {};
  query["children"] = "course-milestone-module";
  const { data: Category, isLoading } = useGetAllCategoryChildrenQuery({
    ...query,
  });
  const categoryData: any = Category?.data;
  //----------------------------------------------------------------

  const [addLesson, { isLoading: serviceLoading }] = useAddLessonMutation();

  const { data: existLesson, isLoading: GetLessionLoading } =
    useGetAllLessonQuery(
      { module: module?._id, isDelete: ENUM_YN.NO, status: ENUM_STATUS.ACTIVE },
      { skip: !Boolean(module?._id) }
    );
  const onSubmit = async (values: any) => {
    removeNullUndefinedAndFalsey(values);
    console.log("🚀 ~ file: page.tsx:77 ~ onSubmit ~ values:", values);
    if (!module?._id || !milestone?._id || !course?._id || !category?._id) {
      Error_model_hook(
        "Please ensure your are selected Lesson/milestone/course/category"
      );
      return;
    }
    const LessonData: {} = {
      ...values,
      category: category?._id,
      course: course?._id,
      milestone: milestone?._id,
      module: module?._id,
    };
    removeNullUndefinedAndFalsey(LessonData);
    // return;
    try {
      const res = await addLesson(LessonData).unwrap();
      if (res?.success == false) {
        Error_model_hook(res?.message);
      } else {
        Success_model("Successfully added Lesson");
        setIsReset(true);
      }
    } catch (error: any) {
      Error_model_hook(error?.message);
      console.log(error);
    }
  };

  // if (GetLessionLoading) {
  //   return <LoadingSkeleton></LoadingSkeleton>;
  // }
  const roundedNumber = Number(
    existLesson?.data[0]?.lesson_number || 1
  ).toFixed(1);
  // Add 0.1 to the rounded number and use toFixed again when logging
  const prelesson_number = (parseFloat(roundedNumber) + 0.1).toFixed(1);

  return (
    <div>
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
              <Col xs={24} lg={12}>
                <SelectCategoryChildren
                  lableText="Select category"
                  setState={setCategory}
                  isLoading={isLoading}
                  categoryData={categoryData}
                />
              </Col>
              <Col xs={24} lg={12}>
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
            </Row>
          </div>
        </div>
      </div>
      {module?._id ? (
        <div className="shadow-xl rounded-lg bg-white">
          {/* resolver={yupResolver(adminSchema)} */}
          {/* resolver={yupResolver(IServiceSchema)} */}
          <div className="flex justify-center items-center p-3">
            <SubHeadingUI>Create Lesson</SubHeadingUI>
          </div>
          <Form
            isReset={isReset}
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
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col
                  className="gutter-row"
                  xs={24}
                  style={{
                    // marginBottom: "10px",
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
                </Col>
                <Col
                  xs={24}
                  style={{ marginTop: "2rem", marginBottom: "2rem" }}
                >
                  {/* <DemoVideoUI
                    label="Video"
                    videoType={videoType as any}
                    setVideoType={setVideoType}
                    videoUrl={videoUrl}
                    setVideoUrl={setVideoUrl}
                    options={["youtube", "vimeo"]}
                    required
                  /> */}

                  <VideoSelect

                  // videos={SelectVideo}
                  // setVideos={setSelectVideo as any}
                  />
                </Col>

                <Col
                  className="gutter-row"
                  xs={24}
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  <TagsSelectUI />
                </Col>
                <Col
                  className="gutter-row"
                  xs={24}
                  style={{
                    marginBottom: "10px",
                  }}
                >
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
                {/* //! commented for refresh */}
                <Col className="gutter-row" xs={24} style={{}}>
                  <p className="text-center my-3 font-bold text-xl ">
                    Description
                  </p>
                  <TextEditor isReset={isReset} />
                </Col>
              </Row>
            </div>
            <div className="w-fit mx-auto">
              {serviceLoading ? (
                <ButtonLoading />
              ) : (
                <div className=" text-center">
                  <ButtonSubmitUI>Create Lesson</ButtonSubmitUI>
                </div>
              )}
            </div>
          </Form>
        </div>
      ) : (
        <div className="w-full  flex justify-center items-center min-h-64 animate-pulse">
          <h1 className="text-center text-red-600 font-semibold text-2xl">
            First select your Module by filtering{" "}
          </h1>
        </div>
      )}
    </div>
  );
};

export default CreateLesson;
