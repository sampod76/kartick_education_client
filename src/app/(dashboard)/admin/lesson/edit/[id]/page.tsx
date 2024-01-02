"use client";

import Form from "@/components/Forms/Form";

import FormInput from "@/components/Forms/FormInput";
import FormSelectField, {

} from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import SelectAuthorField from "@/components/Forms/SelectData/SelectAuthor";
import SelectModuleField from "@/components/Forms/SelectData/SelectModuleField";
import LoadingForDataFetch from "@/components/Utlis/LoadingForDataFetch";
import ButtonSubmitUI from "@/components/ui/ButtonSubmitUI";

import UploadImage from "@/components/ui/UploadImage";
import HeadingUI from "@/components/ui/dashboardUI/HeadingUI";
import TagsSelectUI from "@/components/ui/dashboardUI/TagsSelectUI";
import {  courseStatusOptions,

} from "@/constants/global";
import uploadImgBB from "@/hooks/imgbbUploads";

import {
  useGetSingleLessonQuery,
  useUpdateLessonMutation,
} from "@/redux/api/adminApi/lessoneApi";
import { Error_model_hook, Success_model } from "@/utils/modalHook";

import {Col, Row } from "antd";

import { useState } from "react";

const EditModulePage = ({ params }: any) => {
  const { data: LessonData, isLoading } = useGetSingleLessonQuery(params?.id, {
    skip: !Boolean(params?.id),
  });
  // console.log(LessonData);
  // const { data: LessonData = [] } = useGetAllCategoryQuery({});
  const [updateLesson, { isLoading: updateLoading, error }] =
    useUpdateLessonMutation();




  const [selectedTags, setSelectedTags] = useState<string[]>(
    LessonData?.tags || []
  );

  const onSubmit = async (values: any) => {
    // if (typeof values.img !== "string") {
    //   console.log(values);
    //   values.img = await uploadImgBB(values.img);
    // }
    const UpdateValues = {
      tags: selectedTags,
      ...values,
    };

    // console.log(UpdateValues);
    try {
      const res = await updateLesson({
        id: params?.id,
        data: UpdateValues,
      }).unwrap();

      // console.log(res);
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
        <HeadingUI>Update Lesson</HeadingUI>
        <Form submitHandler={onSubmit} defaultValues={defaultValues}>
        <div
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
              padding: "15px",
              marginBottom: "10px",
            }}
          >
          
            <hr className="border-1 my-1" />
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col
                className="gutter-row"
                xs={24}
               
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="title"
                  size="large"
                  label="Lesson Title"
                  required={true}
                />
                {/*//! 1 */}
              </Col>
              <Col
                className="gutter-row"
                xs={2}
              
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
                lg={7}
                style={{
                  marginBottom: "10px",
                }}
              >
               <SelectAuthorField/>
                {/* //! Author  4*/}
              </Col>
              <Col
                className="gutter-row"
                xs={24}
                md={12}
                lg={7}
                style={{
                  marginBottom: "10px",
                }}
              >
                <SelectModuleField/>
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
               <TagsSelectUI
                      selected={selectedTags}
                      setSelected={setSelectedTags}

                    />
                {/*//! 6 */}
              </Col>
              <Col
                className="gutter-row"
                xs={24}
               
                style={{
                  marginBottom: "10px",
                }}
              >
                <UploadImage name="img" />
                {/* //!7*/}
              </Col>
              <Col
                className="gutter-row"
                xs={24}
                // md={12}
                // lg={8}
                style={{}}
              >
                {/*//! 3 */}
                <FormTextArea label="Description" rows={15} name="details" />
              </Col>
            </Row>
          </div>

          <ButtonSubmitUI>
            Update Lesson
          </ButtonSubmitUI>
        </Form>
      </div>
    </div>
  );
};

export default EditModulePage;
