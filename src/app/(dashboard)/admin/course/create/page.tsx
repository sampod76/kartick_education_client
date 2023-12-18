"use client";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UploadImage from "@/components/ui/UploadImage";
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

import { Button, Col, Row, Select, Upload, message } from "antd";
import { useState } from "react";

const CreateCoursePage = () => {
  const [addCourse, { isLoading }] = useAddCourseMutation();

  //! for category options selection
  const { data } = useGetAllCategoryQuery({});
  const CategoryData = data?.data;
  // console.log(CategoryData)
  const CategoryOptions = CategoryData?.map((item: any) => {
    return {
      label: item?.title,
      value: item?._id,
    };
  });
// ! for get all users
  const { data:usersData} = useGetAllUsersQuery({})
  console.log(usersData);

  const AuthorOptions = usersData?.data?.data?.map((item: any) => {
    return {
      label: item?.email,
      value: item?._id,
    };
  });

  console.log(AuthorOptions);
 
  
  // !  tag selection

  const OPTIONS = ["course", "tech", "update", "english"];
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const filteredOptions = OPTIONS.filter((o) => !selectedTags.includes(o));
  console.log(selectedTags, "selectedTags........1");

  // console.log(courseStatusOptions,"Category",CategoryOptions,);

  const onSubmit = async (values: any) => {
    // console.log(values.img, "values of Course");
    let { img, ...others } = values;

    const imageUrl = await uploadImgBB(values.img);

    // console.log(imageUrl, "image url");

    img = imageUrl;

    const CourseData = {
      img,
      tags: selectedTags,
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
      <h1>Create Course </h1>
      {/* resolver={yupResolver(adminSchema)} */}
      <div>
        <Form
          submitHandler={onSubmit}
          // resolver={yupResolver(createCourseSchema)}
          // defaultValues={{
          //   bloodGroup: bloodGroupOptions[0].value,
          //   gender: genderOptions[0].value,
          // }}
        >
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
              Course Information
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
                  label="Title"
                  required={true}
                />
                {/*//! 1 */}
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
                lg={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                {/*//! 3 */}
                <FormTextArea name="details" />
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
                  type="string"
                  name="duration"
                  size="large"
                  label="Duration"
                  required={true}
                />
                {/* //!4  */}
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
                lg={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormSelectField
                  size="large"
                  name="author"
                  options={AuthorOptions}
                  // defaultValue={priceTypeOptions[0]}
                  label="Author"
                  // placeholder="Select"
                  required={true}
                />
                {/* //! price type 8 */}
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
                  options={courseStatusOptions}
                  // defaultValue={priceTypeOptions[0]}
                  label="Status"
                  // placeholder="Select"
                  required={true}
                />
                {/* //! status 9 */}
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
                  name="category"
                  options={CategoryOptions as any}
                  // defaultValue={priceTypeOptions[0]}
                  label="category"
                  // placeholder="Select"
                  required={true}
                />
                {/* //! category 10 */}
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
                {/*//!  2 */}
              </Col>
            </Row>
          </div>

          {/* basic info */}
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
              Other Information
            </p>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              {/* tag selections */}
              <Col
                className="gutter-row"
                xs={24}
                md={12}
                lg={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <Select
                  mode="multiple"
                  placeholder="Inserted are removed"
                  value={selectedTags}
                  onChange={setSelectedTags}
                  style={{ width: "100%" }}
                  options={filteredOptions.map((item) => ({
                    value: item,
                    label: item,
                  }))}
                />
                {/*//! 11 */}
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
                lg={8}
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

          
            </Row>
          </div>
          <Button htmlType="submit" type="default">
            Create
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CreateCoursePage;
