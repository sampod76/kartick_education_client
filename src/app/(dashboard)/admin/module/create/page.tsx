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
import uploadImgBB from "@/hooks/imgbbUploads";
import {
  useAddModuleMutation,
  useGetAllModuleQuery,
} from "@/redux/api/adminApi/moduleApi";
import { Error_model_hook, Success_model } from "@/utils/modalHook";
import { Button, Col, Row, Spin, message } from "antd";
import React, { useState } from "react";
import dynamic from "next/dynamic";
const TextEditor = dynamic(
  () => import("@/components/shared/TextEditor/TextEditor"),
  {
    ssr: false,
  }
);
const CreateModule = () => {
  const [textEditorValue, setTextEditorValue] = useState("");
  const [addModule, { isLoading: serviceLoading }] = useAddModuleMutation();
  const { data: existModule } = useGetAllModuleQuery({});
  // !  tag selection
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const onSubmit = async (values: any) => {
    // console.log(values);
    // const imgUrl = await uploadImgBB(values.img);
    // values.img = imgUrl;
    const ModuleData: {} = {
      ...values,
      tags: selectedTags,
      details: textEditorValue,
    };

    try {
      const res = await addModule(ModuleData).unwrap();
      console.log(res);
      if (res.success == false) {
        Error_model_hook(res?.message);
      } else {
        Success_model("Successfully added Module");
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
  const roundedNumber = Number(existModule?.data[0].module_number).toFixed(1);
  // Add 0.1 to the rounded number and use toFixed again when logging
  const preModule_number = (parseFloat(roundedNumber) + 0.1).toFixed(1);
  // console.log(preModule_number);

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
        <Form
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
              <Col className="gutter-row" xs={24} md={12} lg={8} style={{}}>
                <SelectMilestoneField />
              </Col>

              <Col className="gutter-row" xs={24} md={12} lg={8} style={{}}>
                <SelectAuthorField />
              </Col>

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
  );
};

export default CreateModule;
