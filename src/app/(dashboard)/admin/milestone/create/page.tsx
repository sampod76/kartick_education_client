"use client";

import Form from "@/components/Forms/Form";

import FormInput from "@/components/Forms/FormInput";

import SelectCourseField from "@/components/Forms/SelectData/SelectCourseField";
// import TextEditor from "@/components/shared/TextEditor/TextEditor";
import ButtonSubmitUI from "@/components/ui/ButtonSubmitUI";
import UploadImage from "@/components/ui/UploadImage";
import HeadingUI from "@/components/ui/dashboardUI/HeadingUI";

import TagsSelectUI from "@/components/ui/dashboardUI/TagsSelectUI";
import uploadImgBB from "@/hooks/UploadSIngleImgBB";

import { useAddMilestoneMutation } from "@/redux/api/adminApi/milestoneApi";

import { Error_model_hook, Success_model } from "@/utils/modalHook";

import { Col, FloatButton, Row, Spin } from "antd";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useGetAllCategoryQuery } from "@/redux/api/adminApi/categoryApi";

//!
import SelectStatusCategoryFIeld from "@/components/Forms/GeneralField/SelectStatusCategoryFIeld";
import SelectStatusCoursesFIeld from "@/components/Forms/GeneralField/SelectStatusCoursesFIeld";
//
const TextEditor = dynamic(
  () => import("@/components/shared/TextEditor/TextEditor"),
  {
    ssr: false,
  }
);
const CreateMilestone = () => {
  const [textEditorValue, setTextEditorValue] = useState("");
  //!
  const [category, setCategoryValue] = useState(null);
  const [course, setCourseValue] = useState(null);
  //
  const [selectedTags, setSelectedTags] = useState<string[]>([""]);
  const [addMilestone, { isLoading: serviceLoading }] =
    useAddMilestoneMutation();

  const onSubmit = async (values: any) => {
    // console.log(values);
    // const imgUrl = await uploadImgBB(values.img);

    // values.img = imgUrl;
    if (!course) {
      Error_model_hook("Course must be select");
      return;
    }
    values.course = course;
    const MilestoneData: {} = {
      ...values,
      tags: selectedTags,
      details: textEditorValue,
    };
    // console.log(MilestoneData);

    try {
      const res = await addMilestone(MilestoneData).unwrap();
      // console.log(res);
      if (res?.success == false) {
        Error_model_hook(res?.message);
      } else {
        Success_model("Successfully added Milestone");
        setCategoryValue(null);
        setCourseValue(null);
        setTextEditorValue("");
        setSelectedTags([]);
      }
      // console.log(res);
    } catch (error: any) {
      Error_model_hook(error?.message);
      console.log(error);
    }
  };

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
        <HeadingUI>Create Milestone</HeadingUI>
        <Row gutter={[12, 12]} style={{ marginBottom: "1rem" }}>
          <Col className="gutter-row" xs={24}>
            <div className="flex justify-start items-center gap-4 ">
              <div className="w-5/12">
                <SelectStatusCategoryFIeld
                  setCategoryValue={setCategoryValue}
                />
              </div>
              <div className="w-7/12">
                <SelectStatusCoursesFIeld
                  categoryId={category}
                  setCourseValue={setCourseValue}
                />
              </div>
            </div>
            {/* <Col xs={24} md={12} lg={8} >
                R</Col>
                <Col xs={24} md={12} lg={8}>
                </Col> */}
          </Col>
        </Row>
        <Form submitHandler={onSubmit}>
          <div
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
              padding: "15px",
            }}
          >
            <Row gutter={[12, 12]}>
              <hr className="border-2 my-2" />
              <Col className="gutter-row" xs={24} style={{}}>
                <FormInput
                  type="text"
                  name="title"
                  size="large"
                  label="Milestone Title"
                  placeholder="Please enter a milestone title"
                  required={true}
                />
              </Col>
              <Col className="gutter-row" xs={24} style={{}}>
                <FormInput
                  type="text"
                  name="milestone_number"
                  size="large"
                  label="Milestone No"
                  placeholder="Please enter a milestone No"
                  required={true}
                />
              </Col>

              {/* <Col className="gutter-row" xs={24} md={12} lg={8} style={{}}>
                <SelectAuthorField />
              </Col> */}

              <Col className="gutter-row" xs={24} style={{}}>
                <TagsSelectUI
                  selected={selectedTags}
                  setSelected={setSelectedTags}
                />
              </Col>
              <Col className="gutter-row" xs={24} style={{}}>
                <UploadImage name="img" />
              </Col>
              <Col
                className="gutter-row"
                xs={24}
                // md={12}
                // lg={8}
                style={{}}
              >
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
          <div>
            {serviceLoading ? (
              <Spin />
            ) : (
              <ButtonSubmitUI>Create Milestone</ButtonSubmitUI>
            )}
          </div>
          {/* <FloatButton
      shape="square"
      type="primary"
      style={{ right: "40%" ,width:"9rem",fontSize:"2rem"}}
      description="Create Milestone"
    
    /> */}
        </Form>
      </div>
    </div>
  );
};

export default CreateMilestone;
