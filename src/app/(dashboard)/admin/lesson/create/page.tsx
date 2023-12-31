"use client";

import Form from "@/components/Forms/Form";

import FormInput from "@/components/Forms/FormInput";

import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import SelectAuthorField from "@/components/Forms/SelectData/SelectAuthor";
import SelectModuleField from "@/components/Forms/SelectData/SelectModuleField";
import ButtonSubmitUI from "@/components/ui/ButtonSubmitUI";

import UploadImage from "@/components/ui/UploadImage";
import SubHeadingUI from "@/components/ui/dashboardUI/SubHeadingUI";

import TagsSelectUI from "@/components/ui/dashboardUI/TagsSelectUI";
import { courseStatusOptions } from "@/constants/global";
import uploadImgBB from "@/hooks/imgbbUploads";

import {
  useAddLessonMutation,
  useGetAllLessonQuery,
} from "@/redux/api/adminApi/lessoneApi";



import { Error_model_hook, Success_model } from "@/utils/modalHook";

import { Col, Row, message } from "antd";
import React, { useState } from "react";

const CreateLesson = () => {
  const [textEditorValue, setTextEditorValue] = useState("");
  const [addLesson, { isLoading: serviceLoading }] = useAddLessonMutation();

  const { data: existLesson,isLoading } = useGetAllLessonQuery({});



  // !  tag selection


  const [selectedTags, setSelectedTags] = useState<string[]>(["tag1"]);


  const onSubmit = async (values: any) => {
    // console.log(values);
    const status = "active";
    const imgUrl = await uploadImgBB(values.img);

    values.img = imgUrl;

    const LessonData: {} = {
      ...values,
      tags: selectedTags,
    };
    console.log(LessonData);

    try {
      const res = await addLesson(LessonData).unwrap();
      console.log(res);
      if (res.success == false) {
        Error_model_hook(res?.message);
      } else {
        Success_model("Successfully added Lesson");
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
  const roundedNumber = Number(existLesson?.data[0].lesson_number).toFixed(1);

  // Add 0.1 to the rounded number and use toFixed again when logging
  const prelesson_number = (parseFloat(roundedNumber) + 0.1).toFixed(1);

  // console.log(prelesson_number);

  return (
    <div>
      <div>
        {/* resolver={yupResolver(adminSchema)} */}
        {/* resolver={yupResolver(IServiceSchema)} */}
        <SubHeadingUI>Create Lesson</SubHeadingUI>
        <Form
          submitHandler={onSubmit}
          defaultValues={{ lesson_number: Number(prelesson_number) }}
        >
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
            Create Lesson
          </ButtonSubmitUI>
        </Form>
      </div>
    </div>
  );
};

export default CreateLesson;
