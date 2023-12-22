"use client";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField, {
  SelectOptions,
} from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import LoadingForDataFetch from "@/components/Utlis/LoadingForDataFetch";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UploadImage from "@/components/ui/UploadImage";
import {
  bloodGroupOptions,
  courseStatusOptions,
  genderOptions,
} from "@/constants/global";
import uploadImgBB from "@/hooks/imgbbUploads";
import {
  useGetSingleCategoryQuery,
  useUpdateCategoryMutation,
} from "@/redux/api/adminApi/categoryApi";
import { useGetAllCourseQuery } from "@/redux/api/adminApi/courseApi";
import {
  useGetSingleLessonQuery,
  useUpdateLessonMutation,
} from "@/redux/api/adminApi/lessoneApi";
import { useGetAllMilestoneQuery } from "@/redux/api/adminApi/milestoneApi";

import {
  useGetAllModuleQuery,
  useGetSingleModuleQuery,
  useUpdateModuleMutation,
} from "@/redux/api/adminApi/moduleApi";
import { useGetAllUsersQuery } from "@/redux/api/adminApi/usersApi";

import { ICategory } from "@/types";
import { Error_model_hook, Success_model } from "@/utils/modalHook";

import { Button, Col, Row, Select, message } from "antd";
import Image from "next/image";
import { useState } from "react";

const EditModulePage = ({ params }: any) => {
  const { data: LessonData, isLoading } = useGetSingleLessonQuery(params?.id, {
    skip: !Boolean(params?.id),
  });
  console.log(LessonData);
  // const { data: LessonData = [] } = useGetAllCategoryQuery({});
  const [updateLesson, { isLoading: updateLoading, error }] =
    useUpdateLessonMutation();

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

  //! for Lesson options selection
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

  // !  tag selection

  const OPTIONS = ["Lesson", "online", "course", "english"];
  const [selectedTags, setSelectedTags] = useState<string[]>(
    LessonData?.tags || []
  );
  const filteredOptions = OPTIONS.filter((o) => !selectedTags?.includes(o));
  console.log(selectedTags, "selectedTags........1");

  const onSubmit = async (values: any) => {
    if (typeof values.img !== "string") {
      console.log(values);
      values.img = await uploadImgBB(values.img);
    }
    const UpdateValues = {
      tags: selectedTags,
      ...values,
    };

    console.log(UpdateValues);
    try {
      const res = await updateLesson({
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

  console.log(LessonData);
  const defaultValues = {
    title: LessonData?.title || "",

    img: LessonData?.img || "",

    status: LessonData?.status || "",
    details: LessonData?.details || "",
    lesson_number: LessonData?.lesson_number || "",

    // managementDepartment: LessonData?.managementDepartment?.id || "",
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
                  name="lesson_number"
                  size="large"
                  label="Lesson No"
                  required={true}
                />
                {/*//! 2 */}
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
                {/*//! 3*/}
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
                {/* //! Author  4*/}
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
                {/* //! price type 5*/}
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
                {/* //! price type 8*/}
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
                {/*//! 6 */}
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
                {/* //!7*/}
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

export default EditModulePage;
