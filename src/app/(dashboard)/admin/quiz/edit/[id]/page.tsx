"use client";

import Form from "@/components/Forms/Form";

import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import SelectAuthorField from "@/components/Forms/SelectData/SelectAuthor";
import SelectLessonField from "@/components/Forms/SelectData/SelectLessonField";
import SelectModuleField from "@/components/Forms/SelectData/SelectModuleField";
import LoadingForDataFetch from "@/components/Utlis/LoadingForDataFetch";
import ButtonSubmitUI from "@/components/ui/ButtonSubmitUI";

import UploadImage from "@/components/ui/UploadImage";
import DemoVideoUI from "@/components/ui/dashboardUI/DemoVideoUI";
import HeadingUI from "@/components/ui/dashboardUI/HeadingUI";

import TagsSelectUI from "@/components/ui/dashboardUI/TagsSelectUI";
import { courseStatusOptions } from "@/constants/global";
import { removeUndefinedValues } from "@/constants/removeUndefined";
import uploadImgBB from "@/hooks/UploadSIngleImgBB";
import {
  useGetSingleQuizQuery,
  useUpdateQuizMutation,
} from "@/redux/api/adminApi/quizApi";

import { Error_model_hook, Success_model } from "@/utils/modalHook";

import { Col, Row } from "antd";

import { useState } from "react";

const EditQuizPage = ({ params }: any) => {
  const { data: QuizData, isLoading } = useGetSingleQuizQuery(params?.id, {
    skip: !Boolean(params?.id),
  });
  // console.log(QuizData);
  // const { data: MilestoneData = [] } = useGetAllCategoryQuery({});
  const [updateQuiz, { isLoading: updateLoading, error }] =
    useUpdateQuizMutation();

  // !  tag selection

  const [selectedTags, setSelectedTags] = useState<string[]>(
    QuizData?.tags || []
  );

  // ! for video insert
  const [videoType, setVideoType] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");

  const demo_video = {
    video: videoType,
    platform: videoUrl,
  };

  const onSubmit = async (values: any) => {
    // if (typeof values.img !== "string") {
    //   console.log(values);
    //   values.img = await uploadImgBB(values.img);
    // }
    const UpdateValues = removeUndefinedValues({
      tags: selectedTags,
      ...values,
      demo_video,
    });

    // console.log(UpdateValues);

    try {
      const res = await updateQuiz({
        id: params?.id,
        data: UpdateValues,
      }).unwrap();

      // console.log(res);
      if (res?.success == false) {
        Error_model_hook(res?.message);
      } else {
        Success_model("successfully updated data");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };
  if (isLoading || updateLoading) {
    return <LoadingForDataFetch />;
  }
  if (error) {
    console.log(error);
  }

  console.log(QuizData);
  const defaultValues = {
    title: QuizData?.title || "",
    img: QuizData?.img || "",
    status: QuizData?.status || "",
    details: QuizData?.details || "",
    passingGrade: QuizData?.passingGrade || "",

    // managementDepartment: MilestoneData?.managementDepartment?.id || "",
  };
  console.log(defaultValues);

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
        {/* resolver={yupResolver(ICategorySchema)} */}
        <Form submitHandler={onSubmit} defaultValues={defaultValues}>
          <div
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
              padding: "15px",
              marginBottom: "10px",
            }}
          >
            <HeadingUI>Update Quiz</HeadingUI>
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
                  marginBottom: "10px",
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
                  marginBottom: "10px",
                }}
              >
                <FormTextArea name="details" />
                {/*//! 3 ---*/}
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
                {/* //! Author 5 --*/}
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
                {/* //! module 6 ----*/}
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
                {/* //! Lesson 7 ----*/}
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
                {/* //! price type 8 ---*/}
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
                {/* //! quiz type 8 ---*/}
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
                {/*//! 10--- */}
              </Col>
              <Col
                className="gutter-row"
                xs={24}
                style={{
                  marginBottom: "10px",
                }}
              >
                <UploadImage name="img" />
                {/* //! 2 -- */}
              </Col>
            </Row>
          </div>

          <ButtonSubmitUI>Update Quiz</ButtonSubmitUI>
        </Form>
      </div>
    </div>
  );
};

export default EditQuizPage;
