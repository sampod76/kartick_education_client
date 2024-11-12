"use client";

import Form from "@/components/Forms/Form";

import FormInput from "@/components/Forms/FormInput";

import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";

import ButtonSubmitUI from "@/components/ui/ButtonSubmitUI";

import DemoVideoUI from "@/components/ui/dashboardUI/DemoVideoUI";

import TagsSelectUI from "@/components/ui/dashboardUI/TagsSelectUI";
import { courseStatusOptions } from "@/constants/global";

import { useAddQuizMutation } from "@/redux/api/adminApi/quizApi";

import { Error_model_hook, Success_model } from "@/utils/modalHook";

import { Button, Col, Row, message } from "antd";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useGetAllCategoryChildrenQuery } from "@/redux/api/categoryChildrenApi";
import SelectCategoryChildren from "@/components/Forms/GeneralField/SelectCategoryChildren";
import UploadMultipalImage from "@/components/ui/UploadMultipalImage";
import { removeNullUndefinedAndFalsey } from "@/hooks/removeNullUndefinedAndFalsey";
import { useAddHome_VideoMutation } from "@/redux/api/adminApi/homeVideoApi";
const TextEditor = dynamic(
    () => import("@/components/shared/TextEditor/TextEditor"),
    {
        ssr: false,
    }
);
const HomeVideoUpload = () => {
    const [category, setCategory] = useState<{ title?: string }>(
        {}
    );

    const [videofile, setVideoFile] = useState<any>()
    const [title, setTitle] = useState<any>()
    const [grade, setGrade] = useState<any>()
    const [videoURL, setVideoURL] = useState<any>()
    const [description, setDescripton] = useState<any>()
    const [isReset, setIsReset] = useState(false);

    function objectToFormData(obj: any) {
        const formData = new FormData();
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                formData.append(key, obj[key]);
            }
        }
        return formData;
    }



    //
    const [addQuiz, { isLoading: quizLoading }] = useAddHome_VideoMutation();

    const onSubmit = async (values: any) => {

        const videoData = {
            "videoURL": videoURL,
            "video": videofile,
            "title": title,
            "videoFileName": videofile?.name,
            "description": description,
            "grade": grade,
            "createdAt": new Date()
        }

        removeNullUndefinedAndFalsey(videoData)



        // return

        try {
            const res = await addQuiz(objectToFormData(videoData)).unwrap();
    
            if (res?.success == false) {
                Error_model_hook(res?.message);
            } else {
                Success_model("Successfully added Quiz");
                setIsReset(true);
                setVideoFile("")
                setTitle("")
                setGrade("")
                setVideoURL("")
                setDescripton("")
            }
       
        } catch (error: any) {
            Error_model_hook(error?.message);
      
        }
    };


    // if (serviceLoading) {
    //   message.loading("Loading...");
    // }

    return (
        <>
            {/* <div
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
                    <h1 className="text-xl font-bold border-b-2 border-spacing-4 mb-2  ">
                        At fast Filter
                    </h1>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={6}>
                            <SelectCategoryChildren
                                lableText="Select Grade"
                                setState={setCategory}
                                
                                categoryData={categoryData}
                            />
                        </Col>
                        {/* <Col xs={24} md={6}>
                            <SelectCategoryChildren
                                lableText="Select courses"
                                setState={setCourse}
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
                                    course?.milestones || []
                                }
                            />
                        </Col>
                        <Col xs={24} lg={12}>
                            <SelectCategoryChildren
                                lableText="Select module"
                                setState={setmodule}
                                categoryData={
                                    //@ts-ignore
                                    milestone?.modules || []
                                }
                            />
                        </Col>
                        <Col xs={24} lg={12}>
                            <SelectCategoryChildren
                                lableText="Select lesson"
                                setState={setlesson}
                                categoryData={
                                    //@ts-ignore
                                    module?.lessons || []
                                }
                            />
                        </Col> */}
            {/* </Row> */}
            {/* </div> */}
            {/* </div> */}

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
                    <Form submitHandler={onSubmit} isReset={isReset}>
                        <div
                            style={{
                                border: "1px solid #d9d9d9",
                                borderRadius: "5px",
                                padding: "15px",
                            }}
                        >
                            <h1 className="text-center text-lg font-bold">Home Video Upload</h1>
                            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                <Col
                                    className="gutter-row"
                                    xs={24}

                                    style={{ marginBlock: "10px" }}
                                >
                                    <label htmlFor="" className="text-lg">Title</label> <br />
                                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="border-2 p-2 rounded-md w-full" placeholder="Please enter.." name="title" id="" />
                                    {/*//! 1-- */}
                                </Col>
                                <Col className="gutter-row" xs={24} md={12} lg={8} style={{}}>

                                    <label htmlFor="" className="text-base">Select Grade</label> <br />

                                    <select name="" id="" className="border-2 p-2 w-full rounded-lg" value={grade} onChange={(e) => setGrade(e.target.value)}>

                                        <option value="">Select</option>
                                        <option value="grade 1">Grade 1</option>
                                        <option value="grade 2">Grade 2</option>
                                        <option value="grade 3">Grade 3</option>
                                        <option value="grade 4">Grade 4</option>
                                        <option value="grade 5">Grade 5</option>
                                        <option value="grade 6">Grade 6</option>
                                        <option value="grade 7">Grade 7</option>
                                        <option value="grade 8">Grade 8</option>
                                        <option value="grade 9">Grade 9</option>
                                        <option value="grade 10">Grade 10</option>


                                    </select>

                                </Col>

                                <Col className="gutter-row" xs={24} md={12} lg={8} style={{}}>
                                    <label htmlFor="" className="text-base">Upload Video</label>
                                    <div className="flex w-full p-2 items-center">
                                        <input type="file" name="homeVideo" onChange={(e: any) => setVideoFile(e?.target?.files[0])} id="" />

                                    </div>

                                </Col>
                                <Col className="gutter-row" xs={24} style={{}}>
                                    <label htmlFor="" className="text-base">Video Url {"(Optional)"}</label> <br />
                                    <input type="text" value={videoURL} onChange={(e) => setVideoURL(e.target.value)} className="border-2 p-2 rounded-md w-full" placeholder="Please enter.." name="title" id="" />
                                    {/*//! 1-- */}
                                </Col>
                                <Col
                                    className="gutter-row"
                                    xs={24}
                                    style={{
                                        marginTop: "10px",
                                    }}
                                >
                                    <label htmlFor="" className="text-base">
                                        Descripton
                                    </label>
                                    <div>
                                        <textarea name="" value={description} onChange={(e: any) => setDescripton(e.target.value)} className="border-2 p-2 rounded-lg w-full" id=""></textarea>
                                    </div>
                                </Col>

                            </Row>
                        </div>

                        <div className="w-fit mx-auto">
                            <Button
                                loading={quizLoading}
                                // disabled={imageUploadLoading}
                                type="default"
                                style={{
                                    marginTop: "1rem",
                                    background: "blue",
                                    color: "white",
                                }}
                                htmlType="submit"
                            >
                                Create Quiz
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
            {/* ) : ( */}
            {/* <div className="w-full  flex justify-center items-center min-h-64 animate-pulse">
          <h1 className="text-center text-red-600 font-semibold text-2xl">
            First select your Lesson by filtering{" "}
          </h1>
        </div> */}
            {/* )} */}
        </>
    );
};

export default HomeVideoUpload;
