"use client";

import Form from "@/components/Forms/Form";

import FormInput from "@/components/Forms/FormInput";

import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import SelectCategoryChildren from "@/components/Forms/GeneralField/SelectCategoryChildren";
import ButtonSubmitUI from "@/components/ui/ButtonSubmitUI";

import UploadMultipalImage from "@/components/ui/UploadMultipalImage";

import SubHeadingUI from "@/components/ui/dashboardUI/SubHeadingUI";

import TagsSelectUI from "@/components/ui/dashboardUI/TagsSelectUI";
import { courseStatusOptions } from "@/constants/global";


import {

  useGetSingleLessonQuery,
  useUpdateLessonMutation,
} from "@/redux/api/adminApi/lessoneApi";
import { useGetAllCategoryChildrenQuery } from "@/redux/api/categoryChildrenApi";

import { Error_model_hook, Success_model } from "@/utils/modalHook";

import { Col, Row } from "antd";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import VideoSelect from "@/components/Forms/VideoSelect";
import ButtonLoading from "@/components/ui/Loading/ButtonLoading";
import LoadingSkeleton from "@/components/ui/Loading/LoadingSkeleton";
import { removeNullUndefinedAndFalsey } from "@/hooks/removeNullUndefinedAndFalsey";

const TextEditor = dynamic(
  () => import("@/components/shared/TextEditor/TextEditor"),
  {
    ssr: false,
  }
);

export default function EditLesson({ lessonId }: { lessonId: string }) {
  const [category, setCategory] = useState({});
  const [courses, setCourses] = useState({});
  const [milestone, setmilestone] = useState({});
  const [isReset, setIsReset] = useState(false);
  const [module, setmodule] = useState<{ _id?: string; title?: string }>({});
  //! for Category options selection
  const query: Record<string, any> = {};
  query["children"] = "course-milestone-module";
  const { data: Category, isLoading } = useGetAllCategoryChildrenQuery({
    ...query,
  });
  const categoryData: any = Category?.data;
  //----------------------------------------------------------------
  const { data, isLoading: getLessonLoading } = useGetSingleLessonQuery(
    lessonId,
    {
      skip: !Boolean(lessonId),
    }
  );
  console.log(data);
  const [updateLesson, { isLoading: UpdateLesson }] = useUpdateLessonMutation();


  const onSubmit = async (values: any) => {
    removeNullUndefinedAndFalsey(values);
    if (module?._id) {
      values["module"] = module?._id;
    }
    const LessonData: {} = {
      ...values,
    };
    removeNullUndefinedAndFalsey(LessonData);

    try {
      const res = await updateLesson({
        id: lessonId,
        data: LessonData,
      }).unwrap();
      // console.log(res);
      if (res?.success == false) {
        Error_model_hook(res?.message);
        setIsReset(true)
      } else {
        Success_model("Successfully Update Lesson");
      }
      // console.log(res);
    } catch (error: any) {
      Error_model_hook(error.message || error?.data);
      console.log(error);
    }
  };

  if (getLessonLoading) {
    return <LoadingSkeleton number={20} />;
  }

  return (
    <div>
      <div>
        <div className="border-2 rounded-lg my-3 p-5 border-blue-500 bg-white shadow-md">
          <SubHeadingUI>Update Lesson</SubHeadingUI>

          <div className="text-xl font-bold space-x-2 mb-2 text-start my-2">
            <span className=" p-3  text-base md:text-lg border rounded-lg hover:bg-blue-600 hover:text-white">
              {" "}
              Category:➡{data?.module?.milestone?.course?.category?.title}
            </span>{" "}
            <span className=" p-3 text-base md:text-lg border rounded-xl hover:bg-blue-600 hover:text-white">
              Course:➡ {data?.module?.milestone?.course?.title}
            </span>
            <h1 className=" mt-3 p-1 rounded-lg w-fit text-base md:text-lg hover:bg-blue-600 hover:text-white">
              Milestone:➡{data?.module?.milestone?.milestone_number}
              {" : "}
              {data?.module?.milestone?.title}
            </h1>
            <h1 className=" mt-3 p-1 rounded-lg w-fit text-base md:text-lg hover:bg-blue-600 hover:text-white">
              Module:➡{data?.module?.module_number}
              {" : "}
              {data?.module?.title}
            </h1>
            {/* <h1 className=" mt-3 p-1 rounded-lg w-fit text-base md:text-lg hover:bg-blue-600 hover:text-white">
                Milestone:➡{data?.module?.milestone?.milestone_number}
                {" : "}
                {data?.module?.milestone?.title}
              </h1> */}
          </div>
        </div>
      </div>

      {data?._id ? (
        <div className="shadow-xl rounded-lg bg-white p-3">
          {/* resolver={yupResolver(adminSchema)} */}
          {/* resolver={yupResolver(IServiceSchema)} */}
          <Row gutter={[16, 16]} style={{ marginBottom: "1rem" }}>
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
          </Row>
          <Form submitHandler={onSubmit} defaultValues={{ ...data, module: data.module?._id }} isReset={isReset}>
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
                  />
                  {/*//! 2 */}
                </Col>
                <Col xs={24}>
                  {/* <DemoVideoUI
                      label="Video"
                      videoType={videoType as any}
                      setVideoType={setVideoType}
                      videoUrl={videoUrl}
                      setVideoUrl={setVideoUrl}
                      options={["youtube", "vimeo"]}
                      required
                    /> */}
                  {/*//! 12*/}

                  <VideoSelect
                    defaultValue={data?.videos || []}
                  // videos={SelectVideo}
                  // setVideos={setSelectVideo as any}
                  />
                </Col>
                {/* //! commented for refresh */}
                <Col
                  className="gutter-row"
                  xs={24}
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  <TagsSelectUI defaultTags={data?.tags} />
                </Col>
                <Col
                  className="gutter-row"
                  xs={24}
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  <UploadMultipalImage
                    defaultImage={data?.imgs || []}
                    name="imgs"
                  // isReset={isReset}
                  />
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
                <Col
                  className="gutter-row"
                  xs={24}
                  style={{
                    borderTopWidth: "2px",
                  }}
                >
                  <p className="text-center my-3 font-bold text-xl ">
                    Description
                  </p>
                  <TextEditor defaultTextEditorValue={data?.details || ""} />
                </Col>
              </Row>
            </div>
            <div className=" text-center">
              {UpdateLesson ? (
                <ButtonLoading />
              ) : (
                <div className=" text-center">
                  <ButtonSubmitUI>Update Lesson</ButtonSubmitUI>
                </div>
              )}
            </div>
          </Form>
        </div>
      ) : (
        <div className="w-full  flex justify-center items-center min-h-64 animate-pulse">
          <h1 className="text-center text-red-600 font-semibold text-2xl">
            Can not found Lesson{" "}
          </h1>
        </div>
      )}
    </div>
  );
}
