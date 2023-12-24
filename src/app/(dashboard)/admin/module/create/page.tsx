"use client";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormMultiSelectField from "@/components/Forms/FormMultiSelectField";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import FormTimePicker from "@/components/Forms/FormTimePicker";
import UploadImage from "@/components/ui/UploadImage";
import TagUI from "@/components/ui/dashboardUI/TagUI";
import { courseStatusOptions } from "@/constants/global";
import uploadImgBB from "@/hooks/imgbbUploads";
import { useGetAllCourseQuery } from "@/redux/api/adminApi/courseApi";
import { useGetAllMilestoneQuery } from "@/redux/api/adminApi/milestoneApi";
import {
  useAddModuleMutation,
  useGetAllModuleQuery,
} from "@/redux/api/adminApi/moduleApi";

import { useGetAllUsersQuery } from "@/redux/api/adminApi/usersApi";

import { IServiceSchema } from "@/schemas/service";
import { Error_model_hook, Success_model } from "@/utils/modalHook";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row, Select, message } from "antd";
import React, { useState } from "react";

const CreateModule = () => {
  const [addModule, { isLoading: serviceLoading }] = useAddModuleMutation();

  const { data: existModule } = useGetAllModuleQuery({});

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

  //! for Module options selection
  const { data } = useGetAllMilestoneQuery({});
  const milestoneData = data?.data;
  // console.log(milestoneData)
  const MilestoneOptions = milestoneData?.map((item: any) => {
    return {
      label: item?.title,
      value: item?._id,
    };
  });
  console.log(MilestoneOptions);

  // !  tag selection

  const OPTIONS = ["module", "online", "course", "english"];
  const tagsOptions = ["milestone", "online", "course", "english"];
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const filteredOptions = OPTIONS.filter((o) => !selectedTags?.includes(o));
  console.log(selectedTags, "selectedTags........1");

  const onSubmit = async (values: any) => {
    // console.log(values);
    const status = "active";
    const imgUrl = await uploadImgBB(values.img);

    values.img = imgUrl;

    const ModuleData: {} = {
      ...values,
      tags: selectedTags,
    };
    console.log(ModuleData);

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

  if (serviceLoading) {
    return message.loading("Loading...");
  }
  const roundedNumber = Number(existModule?.data[0].module_number).toFixed(1);

  // Add 0.1 to the rounded number and use toFixed again when logging
  const preModule_number = (parseFloat(roundedNumber) + 0.1).toFixed(1);

  console.log(preModule_number);

  return (
    <div>
      <div>
        {/* resolver={yupResolver(adminSchema)} */}
        {/* resolver={yupResolver(IServiceSchema)} */}
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
            <hr className="border-1.5 mb-2"/>
            <Row gutter={[16, 16]}>
              <Col
                className="gutter-row"
                xs={24}
                md={20}
                // lg={8}
                style={{
                  
                }}
              >
                <FormInput
                  type="text"
                  name="title"
                  size="large"
                  label="Module Title"
                  required={true}
                />
                {/*//! 1 */}
              </Col>
              <Col
                className="gutter-row"
                xs={4}
                
                style={{
                  
                }}
              >
                <FormInput
                  type="number"
                  name="module_number"
                  size="large"
                  label="Module No"
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
                  
                }}
              >
                <FormSelectField
                  size="large"
                  name="milestone"
                  options={MilestoneOptions as any}
                  // defaultValue={priceTypeOptions[0]}
                  label="milestone"
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
                {/* //! price type 4*/}
              </Col>
              
              <Col
                className="gutter-row"
                xs={24}
                md={12}
                lg={8}
                style={{
                  
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
              <Col className="gutter-row" xs={24} md={12} lg={8} style={{}}>
                <TagUI
                  selectedTags={selectedTags}
                  setSelectedTags={setSelectedTags}
                  tagOptions={tagsOptions}
                />
                {/*//! 11 */}
              </Col>
              <Col
                className="gutter-row"
                xs={24}
                md={12}
                lg={8}
                style={{
                  
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

          <Button htmlType="submit" type="default">
            Create
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CreateModule;
