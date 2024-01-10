"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import SelectAuthorField from "@/components/Forms/SelectData/SelectAuthor";
import SelectMilestoneField from "@/components/Forms/SelectData/SelectMilestone";
// import TextEditor from "@/components/shared/TextEditor/TextEditor";
import ButtonSubmitUI from "@/components/ui/ButtonSubmitUI";
import UploadImage from "@/components/ui/UploadImage";
import TagsSelectUI from "@/components/ui/dashboardUI/TagsSelectUI";
import { courseStatusOptions } from "@/constants/global";
import uploadImgBB from "@/hooks/UploadSIngleImgBB";
import {
  useAddModuleMutation,
  useGetAllModuleQuery,
} from "@/redux/api/adminApi/moduleApi";
import { Error_model_hook, Success_model } from "@/utils/modalHook";
import { Button, Col, Row, Spin, message } from "antd";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useGetAllCategoryChildrenQuery } from "@/redux/api/categoryChildrenApi";
import SelectCategoryChildren from "@/components/Forms/GeneralField/SelectCategoryChildren";
import UploadMultipalImage from "@/components/ui/UploadMultipalImage";
const TextEditor = dynamic(
  () => import("@/components/shared/TextEditor/TextEditor"),
  {
    ssr: false,
  }
);
const CreateModule = () => {
  //

  const [category, setCategory] = useState({});
  const [courses, setCourses] = useState({});
  const [isReset, setIsReset] = useState(false);
  const [milestone, setmilestone] = useState<{ _id?: string; title?: string }>(
    {}
  );

  const query: Record<string, any> = {};
  query["children"] = "course-milestone";
  //! for Category options selection
  const { data: Category, isLoading } = useGetAllCategoryChildrenQuery({
    ...query,
  });
  const categoryData: any = Category?.data;
  //
  const [textEditorValue, setTextEditorValue] = useState("");
  const [addModule, { isLoading: serviceLoading }] = useAddModuleMutation();
  const { data: existModule } = useGetAllModuleQuery({});

  
  const onSubmit = async (values: any) => {
    if (!milestone._id) {
      Error_model_hook("Please ensure your are selected quiz");
      return;
    }
    const ModuleData: {} = {
      ...values,

      details: textEditorValue,
      milestone: milestone?._id,
    };

    try {
      const res = await addModule(ModuleData).unwrap();
      console.log(res);
      if (res.success == false) {
        Error_model_hook(res?.message);
      } else {
        Success_model("Successfully added Module");
        setIsReset(true)
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
  const roundedNumber = Number(existModule?.data[0]?.module_number || 1).toFixed(1);
  // Add 0.1 to the rounded number and use toFixed again when logging
  const preModule_number = (parseFloat(roundedNumber) + 0.1).toFixed(1);
  // console.log(preModule_number);

  return (
    <>
      <div
        style={{
          boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          borderRadius: "1rem",
          backgroundColor: "white",
          padding: "1rem",
          marginBottom: "1rem",
        }}
      >
        <div className="border-2 rounded-lg my-3 p-5 border-blue-500">
          <h1 className="text-xl font-bold border-b-2 border-spacing-4 mb-2 animate-bounce">
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
            <Col xs={24} md={6}>
              <SelectCategoryChildren
                lableText="Select courses"
                setState={setCourses}
                categoryData={
                  //@ts-ignore
                  category?.courses || []
                }
              />
            </Col>
            <Col xs={24} lg={12}>
              <SelectCategoryChildren
                lableText="Select milestones"
                setState={setmilestone}
                categoryData={
                  //@ts-ignore
                  courses?.milestones || []
                }
              />
            </Col>
          </Row>
        </div>
      </div>
      {milestone?._id ? (
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
            <Form
            isReset={isReset}
              submitHandler={onSubmit}
              defaultValues={{ module_number: Number(preModule_number) }}
            >
              <div
                style={{
                  border: "1px solid #d9d9d9",
                  borderRadius: "5px",
                  padding: "15px",
                }}
              >
                <p
                  style={{
                    fontSize: "18px",
                    marginBottom: "10px",
                  }}
                >
                  Create Module
                </p>
                <hr className="border-1.5 mb-2" />
                <Row gutter={[16, 16]}>
                  <Col
                    className="gutter-row"
                    xs={24}
                    md={20}
                    // lg={8}
                    style={{}}
                  >
                    <FormInput
                      type="text"
                      name="title"
                      size="large"
                      label="Module Title"
                      required={true}
                    />
                  </Col>
                  <Col className="gutter-row" xs={4} style={{}}>
                    <FormInput
                      type="number"
                      name="module_number"
                      size="large"
                      label="Module No"
                      required={true}
                    />
                  </Col>

                  {/* <Col className="gutter-row" xs={24} md={12} lg={8} style={{}}>
                <SelectAuthorField />
              </Col> */}

                  <Col className="gutter-row" xs={24} md={12} lg={8} style={{}}>
                    <FormSelectField
                      size="large"
                      name="status"
                      options={courseStatusOptions as any}
                      defaultValue={{ label: "Select", value: "" }}
                      label="status"
                      // placeholder="Select"
                      required={true}
                    />
                  </Col>
                  <Col className="gutter-row" xs={24} style={{}}>
                    <TagsSelectUI
                    
                    />
                  </Col>
                  <Col className="gutter-row" xs={24} style={{}}>
                    <UploadMultipalImage name="imgs" />
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
                <ButtonSubmitUI>Create Module</ButtonSubmitUI>
              )}
            </Form>
          </div>
        </div>
      ) : (
        <div className="w-full  flex justify-center items-center min-h-64 animate-pulse">
          <h1 className="text-center text-red-600 font-semibold text-2xl">
            First select your Milestone by filtering{" "}
          </h1>
        </div>
      )}
    </>
  );
};

export default CreateModule;
