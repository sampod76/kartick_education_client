"use client";
import React, { useEffect, useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space, InputNumber, Upload } from "antd";
import { useGetAllCategoryQuery } from "@/redux/api/adminApi/categoryApi";
import { ENUM_STATUS, ENUM_YN } from "@/constants/globalEnums";
import { Select } from "antd";
import type { SelectProps } from "antd";

const { Option } = Select;
import LabelUi from "@/components/ui/dashboardUI/LabelUi";

import { Error_model_hook, Success_model } from "@/utils/modalHook";



import TextEditorNotSetValue from "@/components/shared/TextEditor/TextEditorNotSetForm";
import ButtonLoading from "@/components/ui/Loading/ButtonLoading";
import uploadImgCloudinary from "@/hooks/UploadSIngleCloudinary";
import { useGetSingleShowAdvanceClassesQuery, useUpdateShowAdvanceClassesMutation } from "@/redux/api/adminApi/features/showAdvanceClassApi";
import CLassField from "@/components/Forms/answer/ClassField";
import { IShow_advance_classes } from "@/types/features/showAdvanceClassType";
import LoadingSkeleton from "@/components/ui/Loading/LoadingSkeleton";

export default function EditAdvanceClass({ classId }: { classId: string }) {
    // console.log("🚀 ~ file: EditPackage.tsx:24 ~ UpdatePackage ~ classId:", classId)
    const { data = {}, isLoading: defaultLoading } =
        useGetSingleShowAdvanceClassesQuery(classId, {
            skip: !Boolean(classId),
        });
    const defaultAdvanceClassData: IShow_advance_classes = data



    // console.log(defaultAdvanceClassData, 'defaultAdvanceClassDatadefaultAdvanceClassData')

    const [UpdateShowAdvanceClasses, { isLoading: UpdatePackageLoading }] =
        useUpdateShowAdvanceClassesMutation();
    const [textEditorValue, setTextEditorValue] = useState("");

    const [ClassData, setClassData] = useState<any>([])
    const [form] = Form.useForm();


    useEffect(() => {
        if (!UpdatePackageLoading) {
            setClassData(defaultAdvanceClassData?.classes)
            // setTextEditorValue(defaultAdvanceClassData?.details)
        }
    }, [UpdatePackageLoading, defaultAdvanceClassData?.classes, defaultAdvanceClassData?.details])

    if (defaultLoading) {
        return <LoadingSkeleton></LoadingSkeleton>;
    }
    // const [addPackage, { isLoading: UpdatePackageLoading }] =
    //     useAddPackageMutation();
    const onFinish = async (values: any) => {

        const skillsPlanData: Partial<IShow_advance_classes> = {

            title: values.title || defaultAdvanceClassData?.title,

            page: values.page || defaultAdvanceClassData?.page || 'home',

            buttonLink: values.buttonLink || defaultAdvanceClassData?.buttonLink,
            classes: ClassData || defaultAdvanceClassData?.classes,
            details: textEditorValue

        };
        // console.log("Received values of form:", values);
        // console.log("🚀 ~ onFinish ~ skillsPlanData:", skillsPlanData);
        // return
        try {
            const res = await UpdateShowAdvanceClasses({
                id: classId,
                data: skillsPlanData,
            }).unwrap();
            // console.log(res);
            if (res?.success == false) {
                Error_model_hook(res?.message);
            } else {
                Success_model("Successfully Updated AdvanceClass");
                // form.resetFields();
            }
            // console.log(res);
        } catch (error: any) {
            Error_model_hook(error?.message);
            console.log(error);
        }
    };




    const initialAdvanceClassFormData = {
        title: defaultAdvanceClassData?.title,
        // imgs: defaultAdvanceClassData?.imgs[0],
        page: defaultAdvanceClassData?.page,
        // details: defaultAdvanceClassData?.details,
        buttonLink: defaultAdvanceClassData?.buttonLink,
    };

    console.log(ClassData, 'classData')
    // console.log(initialAdvanceClassFormData, 'initialAdvanceClassFormData..........')
    // console.log('defaultCategory7', defaultCategory[1].value)
    return (
        <div className="bg-white shadow-lg p-5 rounded-xl">
            <h1 className="text-xl text-center font-bold border-b-2 border-spacing-4 mb-2  ">
                Update Advance Class
            </h1>
            <Form
                name="AdvanceClass_Update"
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
                initialValues={initialAdvanceClassFormData}
                layout="vertical"
            >
                {/* //! 1. title */}
                <Form.Item
                    name="title"
                    rules={[{ required: true, message: "Title is required" }]}
                    label="Title"
                >
                    <Input
                        size="large"
                        placeholder="Please enter Skills and Plan title"
                    />
                </Form.Item>
                {/* //! 2. buttonLink */}
                <Form.Item name="buttonLink" label="Button Link">
                    <Input
                        size="large"
                        type="url"
                        placeholder="Please enter Skills and Plan buttonLink"
                    />
                </Form.Item>

                {/* //! 3.page  */}
                {/* <Form.Item name="page"  label="Enter page (optional)">
                    <Input size="large" defaultValue={'home'} placeholder="Please enter page" />
                </Form.Item> */}
                {/* //! 3. add classes */}
                <div className="border-2 rounded-lg p-3 ">


                    <CLassField ClassData={ClassData} setClassData={setClassData} />
                </div>
                <Form.Item>
                    <p className="text-center my-3 font-bold text-xl">Description</p>
                    <TextEditorNotSetValue
                        textEditorValue={textEditorValue}
                        setTextEditorValue={setTextEditorValue}
                    />
                </Form.Item>
                <Form.Item>
                    <div className="flex justify-center items-center mt-3">
                        {UpdatePackageLoading ? (
                            <ButtonLoading />
                        ) : (
                            <Button
                                loading={UpdatePackageLoading}
                                type="default"
                                htmlType="submit"
                            >
                                Update
                            </Button>
                        )}
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
}
