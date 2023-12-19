"use client";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormMultiSelectField from "@/components/Forms/FormMultiSelectField";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import FormTimePicker from "@/components/Forms/FormTimePicker";
import UploadImage from "@/components/ui/UploadImage";
import uploadImgBB from "@/hooks/imgbbUploads";
import { useGetAllCourseQuery } from "@/redux/api/adminApi/courseApi";
import { useAddMilestoneMutation } from "@/redux/api/adminApi/milestoneApi";

import { useGetAllUsersQuery } from "@/redux/api/adminApi/usersApi";

import { IServiceSchema } from "@/schemas/service";
import { Error_model_hook, Success_model } from "@/utils/modalHook";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row, Select, message } from "antd";
import React, { useState } from "react";

const CreateMilestone = () => {
  const [addMilestone, { isLoading: serviceLoading }] =
    useAddMilestoneMutation();

  // ! for get all users
  const { data: usersData } = useGetAllUsersQuery({});
  console.log(usersData);

  const AuthorOptions = usersData?.data?.data?.map((item: any) => {
    return {
      label: item?.email,
      value: item?._id,
    };
  });

  console.log(AuthorOptions);

  //! for Milestone options selection
  const { data } = useGetAllCourseQuery({});
  const CourseData = data?.data;
  // console.log(CourseData)
  const CourseOptions = CourseData?.map((item: any) => {
    return {
      label: item?.title,
      value: item?._id,
    };
  });
  console.log(CourseOptions);

  // !  tag selection

  const OPTIONS = ["milestone", "online", "course", "english"];
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const filteredOptions = OPTIONS.filter((o) => !selectedTags.includes(o));
  console.log(selectedTags, "selectedTags........1");

  const onSubmit = async (values: any) => {
    // console.log(values);
    const status = "active";
    const imgUrl = await uploadImgBB(values.img);

    values.img = imgUrl;

    const MilestoneData: {} = {
      ...values,
      tags: selectedTags,
    };
    // console.log(MilestoneData);

    try {
      const res = await addMilestone(MilestoneData).unwrap();
      // console.log(res);
      if (res.success == false) {
        Error_model_hook(res?.message);
      } else {
        Success_model("Successfully added Milestone");
      }
      // console.log(res);
    } catch (error: any) {
      Error_model_hook(error?.message);
      console.log(error);
    }
  };

  if (serviceLoading) {
    return message.loading("Loading...");
  }

  return (
    <div>
      <div>
        {/* resolver={yupResolver(adminSchema)} */}
        {/* resolver={yupResolver(IServiceSchema)} */}
        <Form submitHandler={onSubmit}>
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
              Create Milestone
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
                  label="Milestone Name"
                  required={true}
                />
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
                  name="course"
                  options={CourseOptions as any}
                  // defaultValue={priceTypeOptions[0]}
                  label="Course"
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
                <UploadImage name="img" />
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

export default CreateMilestone;
