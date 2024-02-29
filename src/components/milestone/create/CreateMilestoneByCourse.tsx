"use client";

import Form from "@/components/Forms/Form";

import FormInput from "@/components/Forms/FormInput";

import ButtonSubmitUI from "@/components/ui/ButtonSubmitUI";

import TagsSelectUI from "@/components/ui/dashboardUI/TagsSelectUI";

import { useAddMilestoneMutation } from "@/redux/api/adminApi/milestoneApi";

import { Error_model_hook, Success_model } from "@/utils/modalHook";

import { Col, FloatButton, Row, Spin } from "antd";
import React, { useState } from "react";
import dynamic from "next/dynamic";

import UploadMultipalImage from "@/components/ui/UploadMultipalImage";
import FormTextArea from "@/components/Forms/FormTextArea";
import { useGetAllCategoryChildrenQuery } from "@/redux/api/categoryChildrenApi";
import SelectCategoryChildren from "@/components/Forms/GeneralField/SelectCategoryChildren";
import { removeNullUndefinedAndFalsey } from "@/hooks/removeNullUndefinedAndFalsey";
//
const TextEditor = dynamic(
  () => import("@/components/shared/TextEditor/TextEditor"),
  {
    ssr: false,
  }
);

export default function CreateMilestoneByCourse() {
  //

  const [category, setCategory] = useState<{ _id?: string }>({});
  const [courses, setCourses] = useState<{ _id?: string }>({});
  const [isReset, setIsReset] = useState(false);

  const query: Record<string, any> = {};
  query["children"] = "course";
  //! for Category options selection
  const { data: Categorys, isLoading } = useGetAllCategoryChildrenQuery({
    ...query,
  });
  const categoryData: any = Categorys?.data;
  //
  //

  const [addMilestone, { isLoading: serviceLoading }] =
    useAddMilestoneMutation();

  const onSubmit = async (values: any) => {
    // console.log(values);
    // const imgUrl = await uploadImgBB(values.img);
    removeNullUndefinedAndFalsey(values);
    // values.img = imgUrl;
    if (!courses._id) {
      Error_model_hook("Course must be select");
      return;
    }

    const MilestoneData: {} = {
      ...values,

      course: courses._id,
    };
    // console.log(MilestoneData);
    removeNullUndefinedAndFalsey(MilestoneData);
    try {
      const res = await addMilestone(MilestoneData).unwrap();
      console.log(res);
      if (res?.success == false) {
        Error_model_hook(res?.message);
      } else {
        Success_model("Successfully added Milestone");

        setIsReset(true);
      }
      // console.log(res);
    } catch (error: any) {
      Error_model_hook(error?.message);
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-white shadow-lg border-2 rounded-lg my-3 p-5 border-blue-300">
        <h1 className="text-xl font-bold border-b-2 border-spacing-4 mb-2  ">
          At fast Filter
        </h1>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={6}>
            <SelectCategoryChildren
              lableText="Select category"
              setState={setCategory}
              isLoading={isLoading}
              categoryData={categoryData}
            />
          </Col>
          <Col xs={24} md={12}>
            <SelectCategoryChildren
              lableText="Select courses"
              setState={setCourses}
              categoryData={
                //@ts-ignore
                category?.courses || []
              }
            />
          </Col>
        </Row>
      </div>
      <div
        style={{
          boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          borderRadius: "1rem",
          backgroundColor: "white",
          padding: "1rem",
        }}
      >
        {category?._id && courses?._id ? (
          <div>
            {/* resolver={yupResolver(adminSchema)} */}
            {/* resolver={yupResolver(IServiceSchema)} */}
            <h1 className="text-xl font-bold my-2">Create Milestone</h1>

            <Form submitHandler={onSubmit} isReset={isReset}>
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
                  <Col className="gutter-row" xs={4} style={{}}>
                    <FormInput
                      type="number"
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
                    <TagsSelectUI />
                  </Col>
                  <Col className="gutter-row" xs={24} style={{}}>
                    <UploadMultipalImage isReset={isReset} name="imgs" />
                  </Col>
                  <Col className="gutter-row" xs={24} style={{}}>
                    <div>
                      <FormTextArea
                        name="short_description"
                        label="Short description"
                        rows={5}
                        placeholder="Please enter short description"
                      />
                    </div>
                  </Col>
                  <Col
                    className="gutter-row"
                    xs={24}
                    // md={12}
                    // lg={8}
                    style={{}}
                  >
                    <div
                      style={{
                        borderTopWidth: "2px",
                      }} /* className=" border-t-2" */
                    >
                      <p className="text-center my-3 font-bold text-xl">
                        Description
                      </p>
                      <TextEditor isReset={isReset} />
                    </div>
                  </Col>
                </Row>
              </div>
              <div>
                {serviceLoading ? (
                  <Spin />
                ) : (
                  <div className=" text-center">
                    <ButtonSubmitUI>Create Milestone</ButtonSubmitUI>
                  </div>
                )}
              </div>
              {/* <FloatButton
    shape="square"
      type="default"
    style={{ right: "40%" ,width:"9rem",fontSize:"2rem"}}
    description="Create Milestone"
  
  /> */}
            </Form>
          </div>
        ) : (
          <div className="w-full  flex justify-center items-center min-h-64 animate-pulse">
            <h1 className="text-center text-red-600 font-semibold text-2xl">
              First select your Course by filtering{" "}
            </h1>
          </div>
        )}
      </div>
    </>
  );
}
