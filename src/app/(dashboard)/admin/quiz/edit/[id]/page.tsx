"use client";

import Form from "@/components/Forms/Form";

import FormInput from "@/components/Forms/FormInput";
import FormSelectField, {

} from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import LoadingForDataFetch from "@/components/Utlis/LoadingForDataFetch";

import UploadImage from "@/components/ui/UploadImage";
import DemoVideoUI from "@/components/ui/dashboardUI/DemoVideoUI";
import TagUI from "@/components/ui/dashboardUI/TagUI";
import { courseStatusOptions } from "@/constants/global";
import { removeUndefinedValues } from "@/constants/removeUndefined";
import uploadImgBB from "@/hooks/imgbbUploads";

import { useGetAllLessonQuery } from "@/redux/api/adminApi/lessoneApi";

import { useGetAllModuleQuery } from "@/redux/api/adminApi/moduleApi";
import {
  useGetSingleQuizQuery,
  useUpdateQuizMutation,
} from "@/redux/api/adminApi/quizApi";
import { useGetAllUsersQuery } from "@/redux/api/adminApi/usersApi";

import { Error_model_hook, Success_model } from "@/utils/modalHook";

import { Button, Col, Row, Select, message } from "antd";
import Image from "next/image";
import { useState } from "react";

const EditQuizPage = ({ params }: any) => {
  const { data: QuizData, isLoading } = useGetSingleQuizQuery(params?.id, {
    skip: !Boolean(params?.id),
  });
  console.log(QuizData);
  // const { data: MilestoneData = [] } = useGetAllCategoryQuery({});
  const [updateQuiz, { isLoading: updateLoading, error }] =
    useUpdateQuizMutation();
  const { data: usersData } = useGetAllUsersQuery({});
  console.log(usersData);

  const AuthorOptions = usersData?.data?.data?.map((item: any) => {
    return {
      label: item?.email,
      value: item?._id,
    };
  });

  console.log(AuthorOptions);

  //! for Module options selection
  const { data } = useGetAllModuleQuery({});
  const moduleData = data?.data;
  // console.log(moduleData)
  const ModuleOptions = moduleData?.map((item: any) => {
    return {
      label: item?.title,
      value: item?._id,
    };
  });
  console.log(ModuleOptions);

  //! for Lesson options selection
  const { data: lessons } = useGetAllLessonQuery({});
  const LessonData = lessons?.data;
  // console.log(LessonData)
  const LessonOptions = LessonData?.map((item: any) => {
    return {
      label: item?.title,
      value: item?._id,
    };
  });
  console.log(LessonOptions);

  // !  tag selection

  const tagOptions = ["course", "tech", "update", "english"];
  const [selectedTags, setSelectedTags] = useState<string[]>(
    QuizData?.tags || []
  );
  console.log(selectedTags, "selectedTags........1", QuizData?.tags);

  // ! for video insert
  const [videoType, setVideoType] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");

  const demo_video = {
    video: videoType,
    platform: videoUrl,
  };

  const onSubmit = async (values: any) => {
    if (typeof values.img !== "string") {
      console.log(values);
      values.img = await uploadImgBB(values.img);
    }
    const UpdateValues = removeUndefinedValues({
      tags: selectedTags,
      ...values,
    });

    console.log(UpdateValues);

    try {
      const res = await updateQuiz({
        id: params?.id,
        data: UpdateValues,
      }).unwrap();

      console.log(res);
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
    <div>
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
            <p
              style={{
                fontSize: "18px",
                marginBottom: "10px",
              }}
            >
              Create Lesson
            </p>
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
                <FormSelectField
                  size="large"
                  name="author"
                  options={AuthorOptions}
                  label="Author"
                  // placeholder="Select"
                  required={true}
                />
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
                <FormSelectField
                  size="large"
                  name="module"
                  options={ModuleOptions as any}
                  // defaultValue={priceTypeOptions[0]}
                  label="module"
                  // placeholder="Select"
                  required={true}
                />
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
                <FormSelectField
                  size="large"
                  name="lesson"
                  options={LessonOptions as any}
                  // defaultValue={priceTypeOptions[0]}
                  label="Lesson"
                  // placeholder="Select"
                  required={true}
                />
                <Select
                  labelInValue
                  defaultValue={{ value: "lucy", label: "Lucy (101)" }}
                  style={{ width: 120 }}
                  // onChange={handleChange}
                  options={[
                    {
                      value: "jack",
                      label: "Jack (100)",
                    },
                    {
                      value: "lucy",
                      label: "Lucy (101)",
                    },
                  ]}
                />
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
                {/*//! 10--- */}
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
                {/* //! 2 -- */}
              </Col>
            </Row>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button htmlType="submit" type="default">
              Update
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EditQuizPage;
