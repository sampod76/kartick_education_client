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
const TextEditor = dynamic(
  () => import("@/components/shared/TextEditor/TextEditor"),
  {
    ssr: false,
  }
);
const UpdateCoursePage = ({ params }: { params: { id: string } }) => {
  const [updateCourse, { isLoading: courseUpdateLoading }] =
    useUpdateCourseMutation();
  const {
    data: getCourse = {},
    isLoading,
    error,
  } = useGetSingleCourseQuery(params.id, { skip: !Boolean(params.id) });
  const [textEditorValue, setTextEditorValue] = useState("");

  console.log(getCourse);

  // console.log(demo_video);
  const onSubmit = async (values: any) => {
    const CourseData = {
      // tags: selectedTags,

      details: textEditorValue,
      ...values,
    };

    console.log(CourseData, "Course");

    try {
      const res = await updateCourse({
        id: params.id,
        data: { ...CourseData },
      }).unwrap();
      console.log(res, "response");
      if (res?.success == false) {
        Error_model_hook(res?.message);
      } else {
        Success_model("Course update successfully");
        // setVideoType(null);
        // setVideoUrl("");
        setTextEditorValue("");
      }
      // message.success("Admin created successfully!");
    } catch (err: any) {
      console.error(err.message);
      Error_model_hook(err?.message);
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
      <HeadingUI>Create Course</HeadingUI>
      {/* resolver={yupResolver(adminSchema)} */}
      <div className="">
        <Form
          submitHandler={onSubmit}
          defaultValues={getCourse?._id ? getCourse : {}}
        >
          <section
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
                    <SelectCategoryField />
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
                      required={true}
                    />
                    {/* //! status 9 */}
                  </Col>

                  <Col xs={24} md={24} lg={24} style={{}}>
                    <DemoVideoUI
                      label="Demo Video"
                      // videoType={videoType as any}
                      // setVideoType={setVideoType}
                      // videoUrl={videoUrl}
                      // setVideoUrl={setVideoUrl}
                      options={["youtube", "vimeo"]}
                      defaultValue={getCourse?.demo_video || {}}
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
            <section
              style={{ borderTopWidth: "2px" }} /* className=" border-t-2" */
            >
              <p className="text-center my-3 font-bold text-xl">Description</p>
              <TextEditor
                textEditorValue={textEditorValue}
                setTextEditorValue={setTextEditorValue}
                defultTextEditorValue={getCourse?.details || ""}
              />
            </section>
            {/* <div>
              <UploadMultpalImage />
            </div> */}
            {isLoading ? (
              <Spin />
            ) : (
              <ButtonSubmitUI>Update Course</ButtonSubmitUI>
            )}
          </section>
        </Form>
      </div>
    </div>
  );
};

// export default CreateCoursePage;
export default dynamic(() => Promise.resolve(UpdateCoursePage), {
  ssr: false,
});
