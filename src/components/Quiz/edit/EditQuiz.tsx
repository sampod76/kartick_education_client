"use client";

import Form from "@/components/Forms/Form";

import FormInput from "@/components/Forms/FormInput";

import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";

import SelectLessonField from "@/components/Forms/SelectData/SelectLessonField";
import SelectModuleField from "@/components/Forms/SelectData/SelectModuleField";

import ButtonSubmitUI from "@/components/ui/ButtonSubmitUI";

import UploadImage from "@/components/ui/UploadImage";
import DemoVideoUI from "@/components/ui/dashboardUI/DemoVideoUI";
import HeadingUI from "@/components/ui/dashboardUI/HeadingUI";

import TagsSelectUI from "@/components/ui/dashboardUI/TagsSelectUI";
import { courseStatusOptions } from "@/constants/global";
import uploadImgBB from "@/hooks/UploadSIngleImgBB";

import {
  useAddQuizMutation,
  useGetSingleQuizQuery,
  useUpdateQuizMutation,
} from "@/redux/api/adminApi/quizApi";

import { Error_model_hook, Success_model } from "@/utils/modalHook";

import { Col, Row, Spin, message } from "antd";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useGetAllCategoryChildrenQuery } from "@/redux/api/categoryChildrenApi";
import SelectCategoryChildren from "@/components/Forms/GeneralField/SelectCategoryChildren";
import UploadMultipalImage from "@/components/ui/UploadMultipalImage";
import LoadingSkeleton from "@/components/ui/Loading/LoadingSkeleton";
import SubHeadingUI from "@/components/ui/dashboardUI/SubHeadingUI";
import { removeNullUndefinedAndFalsey } from "@/hooks/removeNullUndefinedAndFalsey";
const TextEditor = dynamic(
  () => import("@/components/shared/TextEditor/TextEditor"),
  {
    ssr: false,
  }
);

export default function EditQuiz({ quizId }: { quizId: string }) {
  const [category, setCategory] = useState({});
  const [courses, setCourses] = useState({});
  const [milestone, setmilestone] = useState({});
  const [module, setmodule] = useState({});
  const [lesson, setlesson] = useState<{ _id?: string; title?: string }>({});

  const query: Record<string, any> = {};
  query["children"] = "course-milestone-module-lessons";
  //! for Category options selection
  const { data: Category, isLoading: getCategoryLoading } =
    useGetAllCategoryChildrenQuery({
      ...query,
    });

  const categoryData: any = Category?.data;
  //
  const [updateQuiz, { isLoading: quizUpdateLoading }] =
    useUpdateQuizMutation();
  const { data = {}, isLoading } = useGetSingleQuizQuery(quizId, {
    skip: !Boolean(quizId),
  });
  console.log("🚀 ~ file: page.tsx:65 ~ EditQuiz ~ data:", data);

  // ! for video insert
  const [videoType, setVideoType] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  // const [textEditorValue, setTextEditorValue] = useState("");

  const demo_video = {
    video: videoType,
    platform: videoUrl,
  };

  const onSubmit = async (values: any) => {
    removeNullUndefinedAndFalsey(values);
    if (lesson?._id) {
      values["lesson"] = lesson?._id;
    }
    const QuizData: {} = {
      ...values,

      demo_video,

      //@ts-ignore
    };

    try {
      const res = await updateQuiz({ id: quizId, data: QuizData }).unwrap();

      if (res?.success == false) {
        Error_model_hook(res?.message);
      } else {
        Success_model("Successfully Update quiz");
      }
      // console.log(res);
    } catch (error: any) {
      Error_model_hook(error?.message);
      console.log(error);
    }
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }
  return (
    <>
      <div>
        <div className="border-2 rounded-lg my-3 p-5 border-blue-500 bg-white shadow-md">
          <SubHeadingUI>Update Quiz</SubHeadingUI>

          <div className="text-xl font-bold space-x-2 mb-2 text-start my-2">
            <span className=" p-3  text-base md:text-lg border rounded-lg hover:bg-blue-600 hover:text-white">
              {" "}
              Category:➡
              {data?.lesson?.module?.milestone?.course?.category?.title}
            </span>{" "}
            <span className=" p-3 text-base md:text-lg border rounded-xl hover:bg-blue-600 hover:text-white">
              Course:➡ {data?.lesson?.module?.milestone?.course?.title}
            </span>
            <h1 className=" mt-3 p-1 rounded-lg w-fit text-base md:text-lg hover:bg-blue-600 hover:text-white">
              Milestone:➡{data?.lesson?.module?.milestone?.milestone_number}
              {" : "}
              {data?.lesson?.module?.milestone?.title}
            </h1>
            <h1 className=" mt-3 p-1 rounded-lg w-fit text-base md:text-lg hover:bg-blue-600 hover:text-white">
              Module:➡{data?.lesson?.module?.module_number}
              {" : "}
              {data?.lesson?.module?.title}
            </h1>
            <h1 className=" mt-3 p-1 rounded-lg w-fit text-base md:text-lg hover:bg-blue-600 hover:text-white">
              Module:➡{data?.lesson?.module_number}
              {" : "}
              {data?.lesson?.title}
            </h1>
            {/* <h1 className=" mt-3 p-1 rounded-lg w-fit text-base md:text-lg hover:bg-blue-600 hover:text-white">
                 Milestone:➡{data?.module?.milestone?.milestone_number}
                 {" : "}
                 {data?.module?.milestone?.title}
               </h1> */}
          </div>
        </div>
      </div>
      <div></div>
      {data._id ? (
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
            <Row gutter={[16, 16]} style={{ marginBottom: "1rem" }}>
              <Col xs={24} md={6}>
                <SelectCategoryChildren
                  lableText="For change Select category"
                  setState={setCategory}
                  isLoading={isLoading}
                  categoryData={categoryData}
                />
              </Col>
              <Col xs={24} md={6}>
                <SelectCategoryChildren
                  lableText="For change Select courses"
                  setState={setCourses}
                  categoryData={
                    //@ts-ignore
                    category?.courses || []
                  }
                />
              </Col>
              <Col xs={24} lg={12}>
                <SelectCategoryChildren
                  lableText="For change Select milestones"
                  setState={setmilestone}
                  categoryData={
                    //@ts-ignore
                    courses?.milestones || []
                  }
                />
              </Col>
              <Col xs={24} lg={12}>
                <SelectCategoryChildren
                  lableText="For change Select module"
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
            </Row>
            {/* resolver={yupResolver(adminSchema)} */}
            {/* resolver={yupResolver(IServiceSchema)} */}
            <Form submitHandler={onSubmit} defaultValues={{ ...data, lesson: data?.lesson?._id }}>
              <div
                style={{
                  border: "1px solid #d9d9d9",
                  borderRadius: "5px",
                  padding: "15px",
                }}
              >
                <h1 className="text-center text-lg font-bold">Create Quiz</h1>
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
                    />
                    {/*//! 1-- */}
                  </Col>
                  <Col className="gutter-row" xs={24} md={12} lg={8} style={{}}>
                    <FormInput
                      type="number"
                      name="passingGrade"
                      size="large"
                      label="passingGrade "
                    //
                    />
                    {/*//! 4 --- */}
                  </Col>

                  <Col className="gutter-row" xs={24} md={12} lg={8} style={{}}>
                    <FormSelectField
                      size="large"
                      name="status"
                      options={courseStatusOptions as any}
                      // defaultValue={priceTypeOptions[2]}
                      label="status"
                    // placeholder="Select"
                    />
                  </Col>
                  <Col className="gutter-row" xs={24} style={{}}>
                    <DemoVideoUI
                      options={["youtube", "vimeo"]}
                      label="Preview Video"
                      defaultValue={data?.demo_video}
                    />
                  </Col>
                  <Col
                    className="gutter-row"
                    xs={24}
                    style={{
                      marginTop: "10px",
                    }}
                  >
                    <TagsSelectUI defaultTags={data.tags || []} />
                  </Col>
                  <Col className="gutter-row" xs={24} style={{}}>
                    <UploadMultipalImage
                      defaultImage={data.imgs || []}
                      name="imgs"
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
                        // textEditorValue={textEditorValue}
                        // setTextEditorValue={setTextEditorValue}
                        defaultTextEditorValue={data.details || ""}
                      />
                    </div>
                  </Col>
                </Row>
              </div>
              {quizUpdateLoading ? (
                <Spin />
              ) : (
                <div className=" text-center">
                  <ButtonSubmitUI>Update quiz</ButtonSubmitUI>
                </div>
              )}

            </Form>
          </div>
        </div>
      ) : (
        <div className="w-full  flex justify-center items-center min-h-64 animate-pulse">
          <h1 className="text-center text-red-600 font-semibold text-2xl">
            Not found Quiz{" "}
          </h1>
        </div>
      )}
    </>
  );
}
