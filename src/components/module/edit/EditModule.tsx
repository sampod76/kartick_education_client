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
  useGetSingleModuleQuery,
  useUpdateModuleMutation,
} from "@/redux/api/adminApi/moduleApi";
import { Error_model_hook, Success_model } from "@/utils/modalHook";
import { Button, Col, Row, Spin, message } from "antd";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useGetAllCategoryChildrenQuery } from "@/redux/api/categoryChildrenApi";
import SelectCategoryChildren from "@/components/Forms/GeneralField/SelectCategoryChildren";
import UploadMultipalImage from "@/components/ui/UploadMultipalImage";
import LoadingSkeleton from "@/components/ui/Loading/LoadingSkeleton";
import { removeNullUndefinedAndFalsey } from "@/hooks/removeNullUndefinedAndFalsey";
const TextEditor = dynamic(
  () => import("@/components/shared/TextEditor/TextEditor"),
  {
    ssr: false,
  }
);



export default function EditModule({ moduleId }: { moduleId: string }) {
  const [category, setCategory] = useState({});
  const [courses, setCourses] = useState({});
  const [milestone, setmilestone] = useState<{ _id?: string; title?: string }>(
    {}
  );

  console.log(
    milestone
  )
  const query: Record<string, any> = {};
  query["children"] = "course-milestone";
  //! for Category options selection
  const { data: Category, isLoading: GategoryLoading } =
    useGetAllCategoryChildrenQuery({
      ...query,
    });
  const categoryData: any = Category?.data;
  //
  // const [textEditorValue, setTextEditorValue] = useState("");
  const [updateModule, { isLoading: updateModuleLoading }] =
    useUpdateModuleMutation();
  const { data = {}, isLoading } = useGetSingleModuleQuery(moduleId, {
    skip: !Boolean(moduleId),
  });
  // console.log("🚀 ~ file: page.tsx:57 ~ EditModule ~ data:", data);

  const onSubmit = async (values: any) => {
    // console.log(values, 'values')
    if (values?.milestone?._id) {
      values["milestone"] = values?.milestone?._id
    }
    if (milestone?._id) {
      values["milestone"] = milestone?._id;
    }

    // console.log(values, 'values.................')
    removeNullUndefinedAndFalsey(values);
    const ModuleData: {} = {
      ...values,
      // details: textEditorValue,
    };
    removeNullUndefinedAndFalsey(ModuleData);

    // return
    try {
      const res = await updateModule({
        id: moduleId,
        data: ModuleData,
      }).unwrap();
      // console.log(res);
      if (res?.success == false) {
        Error_model_hook(res?.message);
      } else {
        Success_model("Successfully Update Module");
      }
      // console.log(res);
    } catch (error: any) {
      Error_model_hook(error?.message || error?.data);
      console.log(error);
    }
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }
  // console.log(data,'data')

  const { milestoneDefault, ...othersData } = data

  return (
    <>
      <div>
        <div className="bg-white shadow-lg border-2 rounded-lg my-3 p-5 border-blue-300">
          <h1 className="text-xl font-bold my-2 ">Update Module</h1>
          <div className="text-xl font-bold space-x-2 mb-2 text-start my-2">
            <span className=" p-3  text-base md:text-lg border rounded-lg hover:bg-blue-600 hover:text-white">
              {" "}
              Category:➡{data?.milestone?.course?.category?.title}
            </span>{" "}
            <span className=" p-3 text-base md:text-lg border rounded-xl hover:bg-blue-600 hover:text-white">
              Course:➡ {data?.milestone?.course?.title}
            </span>
            <h1 className=" mt-3 p-1 rounded-lg w-fit text-base md:text-lg hover:bg-blue-600 hover:text-white">
              Milestone:➡{data?.milestone?.milestone_number}
              {" : "}
              {data?.milestone?.title}
            </h1>
          </div>
        </div>
      </div>
      {data?._id ? (
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
            <Row gutter={[16, 16]} style={{ marginBottom: "1rem" }}>
              <Col xs={24} md={6}>
                <SelectCategoryChildren
                  lableText="For change category"
                  setState={setCategory}
                  isLoading={isLoading}
                  categoryData={categoryData}
                />
              </Col>
              <Col xs={24} md={6}>
                <SelectCategoryChildren
                  lableText="For change courses"
                  setState={setCourses}
                  categoryData={
                    //@ts-ignore
                    category?.courses || []
                  }
                />
              </Col>
              <Col xs={24} lg={12}>
                <SelectCategoryChildren
                  lableText="For change milestones"
                  setState={setmilestone}
                  categoryData={
                    //@ts-ignore
                    courses?.milestones || []
                  }
                />
              </Col>
            </Row>
            <Form submitHandler={onSubmit} defaultValues={{ milestone: milestoneDefault?._id, ...othersData }}>
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
                  Update Module
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
                    />
                  </Col>
                  <Col className="gutter-row" xs={4} style={{}}>
                    <FormInput
                      type="number"
                      name="module_number"
                      size="large"
                      label="Module No"
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
                    />
                  </Col>
                  <Col className="gutter-row" xs={24} style={{}}>
                    <TagsSelectUI defaultTags={data?.tags} />
                  </Col>
                  <Col className="gutter-row" xs={24} style={{}}>
                    <UploadMultipalImage
                      defaultImage={data?.imgs}
                      name="imgs"
                    // isReset={isReset}
                    />
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
                    <div
                      style={{
                        borderTopWidth: "2px",
                      }} /* className=" border-t-2" */
                    >
                      <p className="text-center my-3 font-bold text-xl">
                        Description
                      </p>
                      <TextEditor
                        // textEditorValue={textEditorValue}
                        // setTextEditorValue={setTextEditorValue}
                        defaultTextEditorValue={data?.details || ""}
                      />
                    </div>
                  </Col>
                </Row>
              </div>
              {updateModuleLoading ? (
                <Spin />
              ) : (
                  <div className=" text-center">
                <ButtonSubmitUI>Update Module</ButtonSubmitUI>
                </div>
              )}
            </Form>
          </div>
        </div>
      ) : (
        <div className="w-full  flex justify-center items-center min-h-64 animate-pulse">
          <h1 className="text-center text-red-600 font-semibold text-2xl">
            Can not find Module{" "}
          </h1>
        </div>
      )}
    </>
  );
}
