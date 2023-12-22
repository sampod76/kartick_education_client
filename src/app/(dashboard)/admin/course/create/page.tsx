"use client";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import SelectAuthorField from "@/components/Forms/SelectData/SelectAuthor";
import SelectCategoryField from "@/components/Forms/SelectData/SelectCategoryFIeld";
import SelectCourseField from "@/components/Forms/SelectData/SelectCourseField";
import ButtonSubmitUI from "@/components/ui/ButtonSubmitUI";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UploadImage from "@/components/ui/UploadImage";
import DemoVideoUI from "@/components/ui/dashboardUI/DemoVideoUI";
import HeadingUI from "@/components/ui/dashboardUI/HeadingUI";
import LabelUi from "@/components/ui/dashboardUI/LabelUi";
import SubHeadingUI from "@/components/ui/dashboardUI/SubHeadingUI";
import TagUI from "@/components/ui/dashboardUI/TagUI";
import {
  bloodGroupOptions,
  courseStatusOptions,
  genderOptions,
  priceTypeOptions,
} from "@/constants/global";
import uploadImgBB from "@/hooks/imgbbUploads";
import { useGetAllCategoryQuery } from "@/redux/api/adminApi/categoryApi";
import { useAddCourseMutation } from "@/redux/api/adminApi/courseApi";
import { useGetAllUsersQuery } from "@/redux/api/adminApi/usersApi";

import { Error_model_hook, Success_model } from "@/utils/modalHook";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button, Col, Input, Row, Select, Upload, message } from "antd";
import { useState } from "react";

const { Option } = Select;

const CreateCoursePage = () => {
  const [addCourse, { isLoading }] = useAddCourseMutation();

  // !  tag selection

  const tagOptions = ["course", "tech", "update", "english"];
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  console.log(selectedTags, "selectedTags........1");

  // console.log(courseStatusOptions,"Category",CategoryOptions,);

  // ! for video insert
  const [videoType, setVideoType] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");

  const demo_video = {
    video: videoType,
    platform: videoUrl,
  };

  // console.log(demo_video);
  const onSubmit = async (values: any) => {
    // console.log(values.img, "values of Course");
    let { img, ...others } = values;

    const imageUrl = await uploadImgBB(values.img);

    // console.log(imageUrl, "image url");

    img = imageUrl;

    const CourseData = {
      img,
      tags: selectedTags,
      demo_video,
      ...others,
    };

    console.log(CourseData, "Course");

    // Success_model("Customer created successfully");

    try {
      const res = await addCourse({ ...CourseData }).unwrap();
      console.log(res, "response");
      if (res?.success == false) {
        Error_model_hook(res?.message);
      } else {
        Success_model("Course created successfully");
      }
      // message.success("Admin created successfully!");
    } catch (err: any) {
      console.error(err.message);
    }
  };
  if (isLoading) {
    return message.loading("Loading...");
  }

  // const defaultValues = {
  //   blood,
  // };

  return (
    <div>
      <HeadingUI>Create Course</HeadingUI>
      {/* resolver={yupResolver(adminSchema)} */}
      <div className="">
        <Form
          submitHandler={onSubmit}
          // resolver={yupResolver(createCourseSchema)}
          // defaultValues={{
          //   bloodGroup: bloodGroupOptions[0].value,
          //   gender: genderOptions[0].value,
          // }}
        >
          <section className="border-2 p-2 rounded-2">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 ">
              <div className="border-r-2 pr-2">
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
                  <Col
                    xs={24}
                    md={12}
                    lg={12}
                    style={{
                      //
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

                  <Col xs={24} md={12} lg={12} style={{}}>
                    <FormInput
                      type="text"
                      name="level"
                      size="large"
                      label="Level"
                      required={true}
                    />
                    {/*//! 5. */}
                  </Col>
                  <Col xs={24} md={12} lg={12} style={{}}>
                    <FormInput
                      type="number"
                      name="showing_number"
                      size="large"
                      label="Showing Number"
                      required={true}
                    />
                    {/* //!6. Showing Number */}
                  </Col>

                  <Col xs={24} md={12} lg={12} style={{}}>
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
              <div className="    ">
                <SubHeadingUI>Other Information</SubHeadingUI>
                <Row>
                  {/* for video insert */}

                  <Col xs={24} md={24} lg={24} style={{}}>
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
                  <Col xs={24} md={24} lg={24} style={{}}>
                    <TagUI
                      selectedTags={selectedTags}
                      setSelectedTags={setSelectedTags}
                      tagOptions={tagOptions}
                    />
                    {/*//! 11 */}
                  </Col>
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

                  <Col
                    xs={24}
                    md={24}
                    lg={24}
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
            <section className=" border-t-2">
              {/*//! 3 */}
              <FormTextArea
                placeholder="Write details of course"
                label="Details"
                name="details"
              />
            </section>
            <ButtonSubmitUI>Create Course</ButtonSubmitUI>
          </section>
        </Form>
      </div>
    </div>
  );
};

export default CreateCoursePage;
