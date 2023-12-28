"use client";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormMultiSelectField from "@/components/Forms/FormMultiSelectField";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import FormTimePicker from "@/components/Forms/FormTimePicker";
import SelectAuthorField from "@/components/Forms/SelectData/SelectAuthor";
import SelectCourseField from "@/components/Forms/SelectData/SelectCourseField";
import TextEditor from "@/components/shared/TextEditor/TextEditor";
import ButtonSubmitUI from "@/components/ui/ButtonSubmitUI";
import UploadImage from "@/components/ui/UploadImage";
import HeadingUI from "@/components/ui/dashboardUI/HeadingUI";
import TagUI from "@/components/ui/dashboardUI/TagUI";
import TagsSelectUI from "@/components/ui/dashboardUI/TagsSelectUI";
import uploadImgBB from "@/hooks/imgbbUploads";
import { useGetAllCourseQuery } from "@/redux/api/adminApi/courseApi";
import { useAddMilestoneMutation } from "@/redux/api/adminApi/milestoneApi";

import { useGetAllUsersQuery } from "@/redux/api/adminApi/usersApi";

import { IServiceSchema } from "@/schemas/service";
import { Error_model_hook, Success_model } from "@/utils/modalHook";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row, Select, Spin, message } from "antd";
import React, { useState } from "react";

const CreateMilestone = () => {
  const [textEditorValue, setTextEditorValue] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>(["tech"]);
  const [addMilestone, { isLoading: serviceLoading }] =
    useAddMilestoneMutation();

  const onSubmit = async (values: any) => {
    // console.log(values);
    const imgUrl = await uploadImgBB(values.img);

    values.img = imgUrl;

    const MilestoneData: {} = {
      ...values,
      tags: selectedTags,
      details:textEditorValue
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

  // if (serviceLoading) {
  //   return message.loading("Loading...");
  // }

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
      <div>
        {/* resolver={yupResolver(adminSchema)} */}
        {/* resolver={yupResolver(IServiceSchema)} */}
        <Form submitHandler={onSubmit}>
          <div
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
              padding: "15px",
            }}
          >
            <HeadingUI>Create Milestone</HeadingUI>
            <Row gutter={[12, 12]}>
              <Col className="gutter-row" xs={24}>
                <Col xs={24} md={12} lg={8}>
                  <SelectCourseField />
                </Col>
              </Col>
              <hr className="border-2 my-2" />
              <Col className="gutter-row" xs={24}  style={{}}>
                <FormInput
                  type="text"
                  name="title"
                  size="large"
                  label="Milestone Title"
                  placeholder="Please enter a milestone title"
                  required={true}
                />
              </Col>

              {/* <Col className="gutter-row" xs={24} md={12} lg={8} style={{}}>
                <SelectAuthorField />
              </Col> */}

              <Col className="gutter-row" xs={24}  style={{}}>
                <TagsSelectUI
                  selected={selectedTags}
                  setSelected={setSelectedTags}
                />
                {/*//! 11 */}
              </Col>
              <Col className="gutter-row" xs={24}  style={{}}>
                <UploadImage name="img" />
              </Col>
              <Col
                className="gutter-row"
                xs={24}
                // md={12}
                // lg={8}
                style={{}}
              >
                {/*//! 3 */}
                <section
                  style={{
                    borderTopWidth: "2px",
                  }} /* className=" border-t-2" */
                >
                  <p className="text-center my-3 font-bold text-xl">
                    Description
                  </p>
                  <TextEditor
                    textEditorValue={textEditorValue}
                    setTextEditorValue={setTextEditorValue}
                  />
                </section>
              </Col>
            </Row>
          </div>
          {serviceLoading ? (
            <Spin />
          ) : (
            <ButtonSubmitUI>Create Milestone</ButtonSubmitUI>
          )}
        </Form>
      </div>
    </div>
  );
};

export default CreateMilestone;
