"use client";
import Form from "@/components/Forms/Form";
import FormDataRange from "@/components/Forms/FormDataRange";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import SelectAuthorField from "@/components/Forms/SelectData/SelectAuthor";
import SelectCategoryField from "@/components/Forms/SelectData/SelectCategoryFIeld";
import SelectCourseField from "@/components/Forms/SelectData/SelectCourseField";

import ButtonSubmitUI from "@/components/ui/ButtonSubmitUI";
import UploadImage from "@/components/ui/UploadImage";
import DemoVideoUI from "@/components/ui/dashboardUI/DemoVideoUI";
import HeadingUI from "@/components/ui/dashboardUI/HeadingUI";
import SubHeadingUI from "@/components/ui/dashboardUI/SubHeadingUI";
import TagsSelectUI from "@/components/ui/dashboardUI/TagsSelectUI";
import { courseStatusOptions, priceTypeOptions } from "@/constants/global";
import uploadImgBB from "@/hooks/UploadSIngleImgBB";
import UploadMultpalImage from "@/hooks/multipleImageUpload";
import { useAddCourseMutation } from "@/redux/api/adminApi/courseApi";
import { useAddMilestoneMutation } from "@/redux/api/adminApi/milestoneApi";
import { Error_model_hook, Success_model } from "@/utils/modalHook";
import { Col, Row, Spin } from "antd";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useState } from "react";
import dynamic from "next/dynamic";
const TextEditor = dynamic(
  () => import("@/components/shared/TextEditor/TextEditor"),
  {
    ssr: false,
  }
);
export default function CreateCourseFromCourse({
  params,
}: {
  params: { categoryId: string };
}) {
  // console.log(params);

  const searchParams = useSearchParams();

  const categoryName = searchParams.get("categoryName");

  //  //  // console.log("🚀 ~ file: page.tsx:28 ~ categoryName:", categoryName);

  const [textEditorValue, setTextEditorValue] = useState("");
  // console.log(
  //   "🚀 ~ file: page.tsx:43 ~ CreateCoursePage ~ textEditorValue:",
  //   textEditorValue
  // );
  const [addCourse, { isLoading }] = useAddCourseMutation();

  // !  tag selection

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // console.log(selectedTags, "selectedTags........1");

  // console.log(courseStatusOptions,"Category",CategoryOptions,);

  // ! for video insert
  const [videoType, setVideoType] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");

  const demo_video = {
    video: videoUrl,
    platform: videoType,
  };

  // console.log(demo_video);
  const onSubmit = async (values: any) => {
    // console.log(values.img, "values of Course");
    // let { img, ...others } = values;
    // const imageUrl = await uploadImgBB(values.img);
    // img = imageUrl;
    const CourseData = {
      tags: selectedTags,
      demo_video,
      details: textEditorValue,
      category: params.categoryId,
      ...values,
    };

    // Success_model("Customer created successfully");

    try {
      const res = await addCourse({ ...CourseData }).unwrap();

      if (res?.success == false) {
        Error_model_hook(res?.message);
      } else {
        Success_model("Course created successfully");
        setVideoType(null);
        setVideoUrl("");
        setSelectedTags([]);
        setTextEditorValue("");
      }
      // message.success("Admin created successfully!");
    } catch (err: any) {
      console.error(err.message);
    }
  };
  // if (isLoading) {
  //   return message.loading("Loading...");
  // }

  // const defaultValues = {
  //   blood,
  // };

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
      <HeadingUI>Create Course</HeadingUI>
      {/* resolver={yupResolver(adminSchema)} */}
      <div className="">
        <Form submitHandler={onSubmit}>
          <section
            style={{
              padding: "0.5rem",
              borderWidth: "2px",
            }} /* className="border-2 p-2 rounded-2" */
          >
            <h2 className="text-start font-bold tex-3xl">
              Category :{categoryName}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 ">
              <div
                style={{
                  paddingRight: "0.5rem",
                  borderRightWidth: "2px",
                }} /* className="border-r-2 pr-2" */
              >
                <SubHeadingUI>Basic Information</SubHeadingUI>
                <Row gutter={[8, 8]}>
                  <Col xs={24} md={24} lg={24} style={{}}>
                    <FormInput
                      type="text"
                      name="title"
                      size="large"
                      label="Title"
                      required={true}
                    />
                    {/*//! 1 */}
                  </Col>
                  <Col
                    xs={24}
                    md={12}
                    lg={12}
                    style={
                      {
                        // background:"red"
                      }
                    }
                  >
                    <FormInput
                      type="number"
                      name="price"
                      size="large"
                      label="Price"
                      required={true}
                    />
                    {/* //! 7 */}
                  </Col>
                  <Col xs={24} md={12} lg={12}>
                    <FormSelectField
                      size="large"
                      name="price_type"
                      options={priceTypeOptions}
                      // defaultValue={priceTypeOptions[0]}
                      label="Price Type"
                      // placeholder="Select"
                      required={true}
                    />
                    {/* //! price type 8 */}
                  </Col>

                  <Col xs={24} md={12} lg={12} style={{}}>
                    <FormInput
                      type="text"
                      name="level"
                      size="large"
                      label="Level"
                      // required={true}
                    />
                    {/*//! 5. */}
                  </Col>
                  <Col xs={24} md={12} lg={12} style={{}}>
                    <FormInput
                      type="number"
                      name="showing_number"
                      size="large"
                      label="Showing Number"
                      // required={true}
                    />
                    {/* //!6. Showing Number */}
                  </Col>

                  <Col xs={24} md={12} lg={12} style={{}}>
                    <FormDataRange name="duration" label="Duration" />
                    {/* //!4  */}
                  </Col>
                </Row>
              </div>

              {/* basic info */}
              <div className="    ">
                <SubHeadingUI>Other Information</SubHeadingUI>
                <Row gutter={[12, 12]}>
                  <Col xs={24} md={12} lg={12} style={{}}>
                    <SelectAuthorField />
                    {/* //! price type 8 */}
                  </Col>
                  <Col xs={24} md={12} lg={12} style={{}}>
                    <FormSelectField
                      size="large"
                      name="status"
                      options={courseStatusOptions as any}
                      // defaultValue={priceTypeOptions[0]}
                      label="status"
                      // placeholder="Select"
                      required={true}
                    />
                    {/* //! status 9 */}
                  </Col>

                  <Col xs={24} md={24} lg={24} style={{}}>
                    <DemoVideoUI
                      label="Demo Video"
                      videoType={videoType as any}
                      setVideoType={setVideoType}
                      videoUrl={videoUrl}
                      setVideoUrl={setVideoUrl}
                      options={["youtube", "vimeo"]}
                    />
                    {/*//! 12*/}
                  </Col>

                  {/* tag selections */}
                  <Col xs={24} md={24} lg={24} style={{}}>
                    {/* <TagUI
                      selectedTags={selectedTags}
                      setSelectedTags={setSelectedTags}
                      tagOptions={tagOptions}
                    /> */}
                    <TagsSelectUI
                      selected={selectedTags}
                      setSelected={setSelectedTags}
                    />

                    {/*//! 11 */}
                  </Col>

                  <Col
                    xs={24}
                    style={{
                      margin: "10px 0",
                      textAlign: "start",
                    }}
                  >
                    <UploadImage name="img" />
                    {/*//!  2 */}
                  </Col>
                </Row>
              </div>
            </div>
            <div>
              <FormTextArea
                name="short_description"
                label="Short description"
                rows={5}
                placeholder="Please enter short description"
              />
            </div>
            <section
              style={{ borderTopWidth: "2px" }} /* className=" border-t-2" */
            >
              <p className="text-center my-3 font-bold text-xl">Description</p>
              <TextEditor
                textEditorValue={textEditorValue}
                setTextEditorValue={setTextEditorValue}
              />
            </section>
            <div>
              <UploadMultpalImage />
            </div>
            {isLoading ? (
              <Spin />
            ) : (
              <ButtonSubmitUI>Create Course</ButtonSubmitUI>
            )}
          </section>
        </Form>
      </div>
    </div>
  );
}
