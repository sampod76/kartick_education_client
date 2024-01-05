"use client";

import Form from "@/components/Forms/Form";

import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";

import SelectAuthorField from "@/components/Forms/SelectData/SelectAuthor";
import SelectCategoryField from "@/components/Forms/SelectData/SelectCategoryFIeld";

import LoadingForDataFetch from "@/components/Utlis/LoadingForDataFetch";
import ButtonSubmitUI from "@/components/ui/ButtonSubmitUI";
import UploadImage from "@/components/ui/UploadImage";
import DemoVideoUI from "@/components/ui/dashboardUI/DemoVideoUI";
import HeadingUI from "@/components/ui/dashboardUI/HeadingUI";
import SubHeadingUI from "@/components/ui/dashboardUI/SubHeadingUI";
import TagUI from "@/components/ui/dashboardUI/TagUI";

import { courseStatusOptions, priceTypeOptions } from "@/constants/global";
import uploadImgBB from "@/hooks/UploadSIngleImgBB";
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

  const tagOptions = ["course", "tech", "update", "english"];
  const [selectedTags, setSelectedTags] = useState<string[]>(CourseData?.tags);

  // ! for video insert
  const [videoType, setVideoType] = useState(
    CourseData?.demo_video?.video || null
  );
  const [videoUrl, setVideoUrl] = useState(
    CourseData?.demo_video?.platform || ""
  );

  const onSubmit = async (values: any) => {
    // if (typeof values.img !== "string") {
    //   console.log(values);
    //   values.img = await uploadImgBB(values.img);
    // }

    const updateData = {
      ...values,
      tags: selectedTags,
      demo_video: {
        video: videoType,
        platform: videoUrl,
      },
    };

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
    } catch (error) {}
  };
  //

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
      <div
        style={{ marginTop: "2.5rem", marginLeft: "auto", marginRight: "auto" }}
        className="container"
      >
        <HeadingUI>Update Course</HeadingUI>
        <Form submitHandler={onSubmit} defaultValues={defaultValues}>
          <div
            style={{
              display: "block",
              paddingLeft: "0.25rem",
              paddingRight: "0.25rem",
              alignItems: "center",
              //@ts-ignore
              "@media (min-width: 1024px)": { display: "flex" },
            }}
            /* className="block lg:flex items-center gap- px-1 lg:px-[4rem]" */
          >
            <div
              style={{
                marginTop: "0.25rem",
                marginBottom: "0.25rem",
                borderRadius: "0.375rem",
                width: "100%",
                borderColor: "#d9d9d9",
                //@ts-ignore
                "@media (min-width: 1024px)": { width: "50%" },
              }} /* className="w-full lg:w-[50%] px-[2vw] py-[2rem]  my-1 border-1 border-[#d9d9d9] rounded-md" */
            >
              <SubHeadingUI>Basic Information</SubHeadingUI>
              <Row gutter={[8, 8]}>
                <Col
                  className="gutter-row"
                  xs={24}
                  md={24}
                  lg={24}
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
                    label="Price"
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
                    // marginBottom: "10px",
                    // background:'red',
                    margin: "1.3em 0 0 0",
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
                    label="Showing Number"
                    required={true}
                  />
                  {/* //!6. Showing Number */}
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
            <div
              style={{
                marginTop: "0.75rem",
                marginBottom: "0.75rem",
                borderRadius: "0.375rem",
                width: "100%",
                paddingTop: "7rem",
                borderColor: "#d9d9d9",
                //@ts-ignore
                "@media (min-width: 1024px)": { width: "50%" },
              }}
              /* className="w-full lg:w-[50%] px-[2vw] pt-[7rem]  my-3 border-1 border-[#d9d9d9] rounded-md " */
            >
              <SubHeadingUI>Other Information</SubHeadingUI>
              <Row gutter={[8, 8]}>
                {/* for video insert */}

                <Col
                  className="gutter-row"
                  xs={24}
                  md={24}
                  lg={24}
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
                  {/*//! 12*/}
                </Col>

                {/* tag selections */}
                <Col
                  className="gutter-row"
                  xs={24}
                  md={24}
                  lg={24}
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

                <Col
                  className="gutter-row"
                  xs={24}
                  style={{
                    margin: "10px 0",
                  }}
                >
                  <UploadImage defaultImage={CourseData?.img} name="img" />
                  {/*//!  2 */}
                </Col>
              </Row>
            </div>
          </div>
          <section>
            {/*//! 3 */}
            <FormTextArea
              placeholder="Write details of course"
              label="Details"
              name="details"
            />
          </section>
          <ButtonSubmitUI>Update Course</ButtonSubmitUI>
        </Form>
      </div>
    </>
  );
};

export default CourseDetails;
