"use client";
import Form from "@/components/Forms/Form";
import FormDataRange from "@/components/Forms/FormDataRange";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import SelectAuthorField from "@/components/Forms/SelectData/SelectAuthor";
import SelectCategoryField from "@/components/Forms/SelectData/SelectCategoryFIeld";
import ButtonSubmitUI from "@/components/ui/ButtonSubmitUI";
import UploadImage from "@/components/ui/UploadImage";
import DemoVideoUI from "@/components/ui/dashboardUI/DemoVideoUI";
import HeadingUI from "@/components/ui/dashboardUI/HeadingUI";
import SubHeadingUI from "@/components/ui/dashboardUI/SubHeadingUI";
import TagsSelectUI from "@/components/ui/dashboardUI/TagsSelectUI";
import { courseStatusOptions, priceTypeOptions } from "@/constants/global";
import uploadImgBB from "@/hooks/UploadSIngleImgBB";
import {
  useAddCourseMutation,
  useGetSingleCourseQuery,
  useUpdateCourseMutation,
} from "@/redux/api/adminApi/courseApi";
import { Error_model_hook, Success_model } from "@/utils/modalHook";
import {
  Button,
  Col,
  Input,
  Row,
  Select,
  Spin,
  Typography,
  Upload,
  message,
} from "antd";
import { useState } from "react";

import dynamic from "next/dynamic";
import LoadingSkeleton from "@/components/ui/Loading/LoadingSkeleton";
import formatMongoCreatedAtDate from "@/hooks/formateMongoTimeToLocal";
import { ENUM_YN } from "@/constants/globalEnums";
import { removeNullUndefinedAndFalsey } from "@/hooks/removeNullUndefinedAndFalsey";
import { useGetAllCourse_labelQuery } from "@/redux/api/adminApi/courseLevelApi";
import SelectLabelField from "../Forms/SelectData/SelectLabel";
const TextEditor = dynamic(
  () => import("@/components/shared/TextEditor/TextEditor"),
  {
    ssr: false,
  }
)

export default function EditCourse({ courseId }: { courseId: string }) {
  const [updateCourse, { isLoading: courseUpdateLoading }] =
    useUpdateCourseMutation();
  const [category, setCategory] = useState("");
  console.log("🚀 ~ CreateCourse ~ category:", category)
  const {
    data: getCourse = {},
    isLoading,
    error,
  } = useGetSingleCourseQuery(courseId, { skip: !Boolean(courseId) });
  // const [textEditorValue, setTextEditorValue] = useState("");
  // console.log(
  //   "🚀 ~ file: page.tsx:53 ~ UpdateCoursePage ~ textEditorValue:",
  //   textEditorValue
  // );

  console.log(getCourse);


  // console.log(demo_video);
  const onSubmit = async (values: any) => {
    removeNullUndefinedAndFalsey(values);
    const CourseData = {
      ...values,
    };

    try {
      const res = await updateCourse({
        id: courseId,
        data: { ...CourseData },
      }).unwrap();

      if (res?.success == false) {
        Error_model_hook(res?.message);
      } else {
        Success_model("Course update successfully");

        // setTextEditorValue("");
      }
      // message.success("Admin created successfully!");
    } catch (err: any) {
      console.error(err);
      Error_model_hook(err?.message || err?.data);
    }
  };

  if (isLoading) {
    return <LoadingSkeleton />;
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
      <HeadingUI>Update Course</HeadingUI>
      {/* resolver={yupResolver(adminSchema)} */}
      <div className="">
        <Form
          submitHandler={onSubmit}
          defaultValues={
            getCourse?._id
              ? {
                ...getCourse,
                category: getCourse?.category?._id,
                author: getCourse?.author?._id,
              }
              : {}
          }
        >
          <div
            style={{
              padding: "0.5rem",
              borderWidth: "2px",
            }} /* className="border-2 p-2 rounded-2" */
          >
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
                    />
                    {/* //! price type 8 */}
                  </Col>



                  <Col xs={24} md={12} lg={12} style={{}}>
                    <div className="flex flex-col justify-start ">
                      {getCourse?.duration[0] &&

                        <p className="ml:3">
                          {" "}
                          Start date:{" "}
                          {formatMongoCreatedAtDate(getCourse?.duration[0])} - End
                          : {formatMongoCreatedAtDate(getCourse?.duration[1])}
                        </p>
                      }

                      <FormDataRange name="duration" label="Duration" />
                    </div>
                    {/* //!4  */}
                  </Col>
                </Row>
              </div>

              {/* basic info */}
              <div className="    ">
                <SubHeadingUI>Other Information</SubHeadingUI>
                <Row gutter={[12, 12]}>
                  <Col xs={24} md={12} lg={12} style={{}}>
                    <SelectCategoryField setCategory={setCategory} />
                    {/* //! category 10 */}
                  </Col>
                  <Col xs={24} md={12} lg={12} style={{}}>
                    <SelectLabelField category={category || getCourse?.labelDetails?.category} />
                    {/* //! category 10 */}
                  </Col>
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
                    />
                  </Col>
                  <Col xs={24} md={12} lg={12} style={{}}>
                    <FormSelectField
                      size="large"
                      name="favorite"
                      options={[
                        { label: "Yes", value: ENUM_YN.YES },
                        { label: "No", value: ENUM_YN.NO },
                      ]}
                      // defaultValue={priceTypeOptions[0]}
                      label="Featcher"
                    // placeholder="Select"
                    />
                  </Col>

                  <Col xs={24} md={24} lg={24} style={{}}>
                    {/* <DemoVideoUI
                    label="Preview Video"
                    // videoType={videoType as any}
                    // setVideoType={setVideoType}
                    // videoUrl={videoUrl}
                    // setVideoUrl={setVideoUrl}
                    options={["youtube", "vimeo"]}
                    defaultValue={getCourse?.demo_video || {}}
                  /> */}
                    <FormInput
                      type="text"
                      name="demo_video.video"
                      size="large"
                      label="Preview Video"
                    // videoType={videoT"
                    //
                    />
                  </Col>

                  {/* tag selections */}
                  <Col xs={24} md={24} lg={24} style={{}}>
                    <TagsSelectUI defaultTags={getCourse?.tags} />

                    {/*//! 11 */}
                  </Col>

                  <Col
                    xs={24}
                    style={{
                      margin: "10px 0",
                      textAlign: "start",
                    }}
                  >
                    <UploadImage defaultImage={getCourse?.img} name="img" />
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
                required
              />
            </div>
            <div
              style={{ borderTopWidth: "2px" }} /* className=" border-t-2" */
            >
              <p className="text-center my-3 font-bold text-xl">Description</p>
              <TextEditor
                // textEditorValue={textEditorValue}
                // setTextEditorValue={setTextEditorValue}

                defaultTextEditorValue={getCourse?.details}
              />
            </div>
            {/* <div>
            <UploadMultpalImage />
          </div> */}
            {isLoading ? (
              <Spin />
            ) : (
              <div className=" text-center">
                <ButtonSubmitUI>Update Course</ButtonSubmitUI>
              </div>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
}
