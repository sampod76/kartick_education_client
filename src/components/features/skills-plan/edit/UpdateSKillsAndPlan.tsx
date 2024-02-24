"use client";
import React, { useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space, InputNumber, Upload, Spin } from "antd";
import { useGetAllCategoryQuery } from "@/redux/api/adminApi/categoryApi";
import { ENUM_STATUS, ENUM_YN } from "@/constants/globalEnums";
import { Select } from "antd";
import type { SelectProps } from "antd";

const { Option } = Select;
import LabelUi from "@/components/ui/dashboardUI/LabelUi";

import { Error_model_hook, Success_model } from "@/utils/modalHook";

import { useGetSingleSkills_planQuery, useUpdateSkills_planMutation } from "@/redux/api/adminApi/features/skillsPlanApi";
import { ISkillsPlanData } from "@/types/features/SkillsAndPlanDataType";
import TextEditorNotSetValue from "@/components/shared/TextEditor/TextEditorNotSetForm";
import ButtonLoading from "@/components/ui/Loading/ButtonLoading";
import uploadImgCloudinary from "@/hooks/UploadSIngleCloudinary";


export default function EditSKillsAndPlan({ planId }: { planId: string }) {
    // console.log("🚀 ~ file: EditPackage.tsx:24 ~ UpdatePackage ~ planId:", planId)
    const { data = {}, isLoading: defaultLoading } =
        useGetSingleSkills_planQuery(planId, {
            skip: !Boolean(planId),
        });
    const defaultSkillPlanData: ISkillsPlanData = data

    // console.log(defaultSkillPlanData, 'defaultSkillPlanDatadefaultSkillPlanData')

    const [updateSkills_plan, { isLoading: UpdatePackageLoading }] =
        useUpdateSkills_planMutation();
    const [textEditorValue, setTextEditorValue] = useState(defaultSkillPlanData?.details || "");

    const [form] = Form.useForm();

    console.log(defaultSkillPlanData, 'defaultSkillPlanData')

    // const [addPackage, { isLoading: UpdatePackageLoading }] =
    //     useAddPackageMutation();
    const onFinish = async (values: any) => {
        console.log(values?.imgs?.file, 'filee')

        if (values?.imgs?.file) {
            const imgUrl = await uploadImgCloudinary(values?.imgs?.file);
            console.log(imgUrl, 'filee')
            values.imgs = imgUrl;
        }

        const skillsPlanData: Partial<ISkillsPlanData> = {

            title: values.title || defaultSkillPlanData?.title,
            imgTitle: values.imgTitle || defaultSkillPlanData?.imgTitle,
            imgs: [values?.imgs] || [...defaultSkillPlanData?.imgs],
            page: values.page || defaultSkillPlanData?.page || "home",
            details: textEditorValue || defaultSkillPlanData?.details,
            points: values.points || defaultSkillPlanData?.points,
        };
        // console.log("Received values of form:", values);
        console.log("🚀 ~ onFinish ~ skillsPlanData:", skillsPlanData);
        // return
        try {
            const res = await updateSkills_plan({
                id: planId,
                data: skillsPlanData,
            }).unwrap();
            // console.log(res);
            if (res?.success == false) {
                Error_model_hook(res?.message);
            } else {
                Success_model("Successfully Updated Skills Plan");
                // form.resetFields();
            }
            // console.log(res);
        } catch (error: any) {
            Error_model_hook(error?.message);
            console.log(error);
        }
    };

    if (defaultLoading) {
        return <div className="w-[50%] mx-auto"><Spin size="large" /></div>;
    }


    const initialSkillsANdPlanFormData = {
        title: defaultSkillPlanData?.title,
        imgTitle: defaultSkillPlanData?.imgTitle,
        imgs: defaultSkillPlanData?.imgs[0],
        page: defaultSkillPlanData?.page,
        // details: defaultSkillPlanData?.details,
        points: defaultSkillPlanData?.points,
    };

    // console.log(initialSkillsANdPlanFormData, 'initialSkillsANdPlanFormData..........')
    // console.log('defaultCategory7', defaultCategory[1].value)
    return (
        <div className="bg-white shadow-lg p-5 rounded-xl">
            <h1 className="text-xl text-center font-bold border-b-2 border-spacing-4 mb-2  ">
                Update SkillsANdPlan
            </h1>
            <Form
                name="SkillsANdPlan_Update"
                onFinish={onFinish}
                form={form}
                style={{
                    maxWidth: 850,
                    marginInline: "auto",
                    border: "0.2px solid gray",
                    padding: "8px",
                    borderRadius: "5px",
                }}
                // autoComplete="off"
                initialValues={initialSkillsANdPlanFormData}
                layout="vertical"
            >
                <Form.Item>
                    {/* //! 1. title */}
                    <Form.Item name="title" label="Title">
                        <Input size="large" placeholder="Please enter Skills and Plan title" />
                    </Form.Item>
                    {/* //! 2. imgs */}
                    <Form.Item name="imgTitle" label="Image Title" >
                        <Input size="large" placeholder="Please enter Skills and Plan imgTitle title" width={"100%"} />
                    </Form.Item>
                    <Form.Item name="imgs" required>
                        <Upload
                            listType="picture-card"
                            beforeUpload={async (file) => {
                                // console.table(file)
                                // const imgUrl = await uploadImgCloudinary(file);
                                form.setFieldsValue({ imgExtra: "" }); // Set imgUrl in Form values
                                return false; // Prevent default upload behavior
                                // return true
                            }}
                            defaultFileList={defaultSkillPlanData?.imgs?.map((img: string) => ({
                                uid: img, // Convert index to string for uid
                                name: img,
                                status: 'done',
                                url: img,
                            }))}


                        >
                            <div className="flex flex-col">
                                {/* <h1>+</h1> */}
                                <h4>Upload</h4>

                            </div>
                        </Upload>
                    </Form.Item>


                </Form.Item>
                {/* //! 3.page  */}
                {/* <Form.Item name="page" label="Page">
                    <Input size="large" placeholder="Please enter Skills and Plan page" />
                </Form.Item> */}
                {/* //! 2. add points */}
                <div className="border-2 rounded-lg p-3">
                    <LabelUi>Add Points</LabelUi>
                    <Form.List name="points">
                        {(fields, { add, remove }) => {
                            // console.log(fields,'fieldsfieldsfieldsfields') ;

                            // const handleChange = (value: any) => {
                            //   console.log(value, 'value');
                            //   const updatedOptions = options?.filter(
                            //     (item) => item?.value !== value
                            //   );
                            //   // console.log(updatedOptions)
                            //   options = updatedOptions;
                            //   // console.log(options)
                            // };

                            const handleRemove = (value: any) => {
                                console.log(value, "handleRemove");
                                remove(value);
                            };

                            return (
                                <>
                                    {fields.map(({ key, name, ...restField }) => (
                                        <div
                                            key={key}
                                            style={{
                                                display: "flex",
                                                justifyContent: "start",
                                                alignItems: "flex-start",
                                                // flexDirection: "column", // Stack items vertically on smaller screens

                                                margin: "8px auto",
                                                // background: "blue",
                                                // width: "100%",
                                                // position: "relative",

                                            }}
                                        // align="center"
                                        >

                                            <Form.Item
                                                {...restField}
                                                name={[name, "title"]}
                                                style={{
                                                    width: "100%",
                                                    marginBottom: "8px",
                                                    // maxWidth: "200px",
                                                }}
                                                rules={[
                                                    { required: true, message: "Missing Points Label" },
                                                ]}
                                            >
                                                <Input size="large" placeholder="label" />
                                            </Form.Item>
                                            <MinusCircleOutlined
                                                onClick={() => handleRemove(name)}
                                            // style={{ fontSize: "1.5rem", position: "absolute", right: 0, top: 0 }}
                                            />
                                        </div>
                                    ))}
                                    <Form.Item>
                                        <Button
                                            type="dashed"
                                            onClick={() => add()}
                                            block
                                            icon={<PlusOutlined />}
                                        >
                                            Add points
                                        </Button>
                                    </Form.Item>
                                </>
                            );
                        }}
                    </Form.List>
                </div>
                <Form.Item>
                    <p className="text-center my-3 font-bold text-xl">Description</p>
                    <TextEditorNotSetValue
                        textEditorValue={textEditorValue}
                        setTextEditorValue={setTextEditorValue}
                        defaultTextEditorValue={defaultSkillPlanData?.details}
                    />
                </Form.Item>
                <Form.Item>
                    <div className="flex justify-center items-center mt-3">
                        {defaultLoading ? (
                            <ButtonLoading />
                        ) : (
                            <Button
                                loading={defaultLoading}
                                type="default"
                                htmlType="submit"
                            >
                                Update
                            </Button>
                        )}
                    </div>
                </Form.Item>
            </Form>
        </div >
    );
}
