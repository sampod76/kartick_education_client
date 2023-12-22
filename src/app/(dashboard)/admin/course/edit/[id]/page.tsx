"use client";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import FormTimePicker from "@/components/Forms/FormTimePicker";
import SelectAuthorField from "@/components/Forms/SelectData/SelectAuthor";
import SelectCategoryField from "@/components/Forms/SelectData/SelectCategoryFIeld";
import SelectCourseField from "@/components/Forms/SelectData/SelectCourseField";
import LoadingForDataFetch from "@/components/Utlis/LoadingForDataFetch";
import ButtonSubmitUI from "@/components/ui/ButtonSubmitUI";
import UploadImage from "@/components/ui/UploadImage";
import DemoVideoUI from "@/components/ui/dashboardUI/DemoVideoUI";
import HeadingUI from "@/components/ui/dashboardUI/HeadingUI";
import SubHeadingUI from "@/components/ui/dashboardUI/SubHeadingUI";
import TagUI from "@/components/ui/dashboardUI/TagUI";

import { priceTypeOptions } from "@/constants/global";
import uploadImgBB from "@/hooks/imgbbUploads";

import { useGetAllCategoryQuery } from "@/redux/api/adminApi/categoryApi";
import {
  useGetSingleCourseQuery,
  useUpdateCourseMutation,
} from "@/redux/api/adminApi/courseApi";

import { Error_model_hook, Success_model } from "@/utils/modalHook";
import { Col, Row } from "antd";

import { useState } from "react";

const CourseDetails = ({ params }: any) => {
  const { data: CourseData, isLoading } = useGetSingleCourseQuery(params?.id, {
    skip: !Boolean(params?.id),
  });

  const [updateCourse, { isLoading: CourseLoading }] =
    useUpdateCourseMutation();
  //! for category options selection
  const { data } = useGetAllCategoryQuery({});

  const tagOptions = ["course", "tech", "update", "english"];
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  console.log(selectedTags, "selectedTags........1");

  // console.log(courseStatusOptions,"Category",CategoryOptions,);

  // ! for video insert
  const [videoType, setVideoType] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");

  const onSubmit = async (values: any) => {
    if (typeof values.img !== "string") {
      console.log(values);
      values.img = await uploadImgBB(values.img);
    }
    const updateData = {
      ...values,
    };

    console.log(updateData);

    try {
      //@ts-ignore
      const res = await updateCourse({
        id: params?.id,
        data: updateData,
      }).unwrap();
      if (res.success == false) {
        Error_model_hook(res?.message + "");
      } else {
        Success_model("Successfully update Course");
      }
    } catch (error) {
      console.log(error);
    }
  };
  //
  console.log(CourseData);

  const defaultValues = {
    // name:,
    title: CourseData?.title || "",
    CourseDate: CourseData?.CourseDate || "",
    img: CourseData?.img || "",
    details: CourseData?.details || "",
    author: CourseData?.author || "",
    category: CourseData?.category || "",
    price: CourseData?.price || "",

    duration: CourseData?.duration || "",
    level: CourseData?.level || "",
    price_type: CourseData?.price_type || "",
    status: CourseData?.status || "",
    showing_number: CourseData?.showing_number || "",
    tags: CourseData?.tags || "",
    address: CourseData?.address || "",
  };
  if (isLoading || CourseLoading) {
    return <LoadingForDataFetch />;
  }
  return (
    <>
      <div className="container mx-auto mt-10">
        <Form submitHandler={onSubmit} defaultValues={defaultValues}>
          <HeadingUI>Update Course</HeadingUI>
          <div className="block lg:flex gap-4">
            <div className="w-full lg:w-[50%] px-[2vw] py-[5rem]  my-3 border-2 border-[#d9d9d9] rounded-md">
              <SubHeadingUI>Basic Information</SubHeadingUI>
              <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
                <Col
                  className="gutter-row"
                  xs={24}
                  md={12}
                  lg={12}
                  style={{
                    marginBottom: "10px",
                  }}
                >
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
                  className="gutter-row"
                  xs={24}
                  md={12}
                  lg={12}
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  <FormInput
                    type="number"
                    name="price"
                    size="large"
                    label="price"
                    required={true}
                  />
                  {/* //! 7 */}
                </Col>

                <Col
                  className="gutter-row"
                  xs={24}
                  md={12}
                  lg={12}
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  <FormInput
                    type="text"
                    name="level"
                    size="large"
                    label="Level"
                    required={true}
                  />
                  {/*//! 5. */}
                </Col>
                <Col
                  className="gutter-row"
                  xs={24}
                  md={12}
                  lg={12}
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  <FormInput
                    type="number"
                    name="showing_number"
                    size="large"
                    label="showing_number"
                    required={true}
                  />
                  {/* //!6. showing_number */}
                </Col>
                <Col
                  className="gutter-row"
                  xs={24}
                  md={12}
                  lg={12}
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  {/*//! 3 */}
                  <FormTextArea label="Details" name="details" />
                </Col>

                <Col
                  className="gutter-row"
                  xs={24}
                  md={12}
                  lg={12}
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  <FormInput
                    type="string"
                    name="duration"
                    size="large"
                    label="Duration"
                    required={true}
                  />
                  {/* //!4  */}
                </Col>
              </Row>
            </div>

            {/* basic info */}
            <div className="w-full lg:w-[50%] px-[2vw] py-[5rem]  my-3 border-2 border-[#d9d9d9] rounded-md">
              <SubHeadingUI>Other Information</SubHeadingUI>
              <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
                {/* for video insert */}
                <DemoVideoUI
                  videoType={videoType as any}
                  setVideoType={setVideoType}
                  videoUrl={videoUrl}
                  setVideoUrl={setVideoUrl}
                  options={["youtube", "vimeo"]}
                />
                {/* tag selections */}
                <Col
                  className="gutter-row"
                  xs={24}
                  md={12}
                  lg={12}
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  <TagUI
                    selectedTags={selectedTags}
                    setSelectedTags={setSelectedTags}
                    tagOptions={tagOptions}
                  />
                  {/*//! 11 */}
                </Col>
                <Col
                  className="gutter-row"
                  xs={24}
                  md={12}
                  lg={12}
                  style={{
                    marginBottom: "10px",
                  }}
                >
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
                <Col
                  className="gutter-row"
                  xs={24}
                  md={12}
                  lg={12}
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  <SelectAuthorField />
                  {/* //! price type 8 */}
                </Col>
                <Col
                  className="gutter-row"
                  xs={24}
                  md={12}
                  lg={12}
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  <SelectCourseField />
                  {/* //! status 9 */}
                </Col>
                <Col
                  className="gutter-row"
                  xs={24}
                  md={12}
                  lg={12}
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  <SelectCategoryField />
                  {/* //! category 10 */}
                </Col>
                <Col
                  className="gutter-row"
                  xs={24}
                  md={12}
                  lg={12}
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  <UploadImage name="img" />
                  {/*//!  2 */}
                </Col>
              </Row>
            </div>
          </div>
          <ButtonSubmitUI>Update Course</ButtonSubmitUI>
        </Form>
      </div>
    </>
  );
};

export default CourseDetails;
