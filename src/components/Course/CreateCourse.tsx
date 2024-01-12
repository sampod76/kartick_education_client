"use client";

import SubHeadingUI from "@/components/ui/dashboardUI/SubHeadingUI";
import TagsSelectUI from "@/components/ui/dashboardUI/TagsSelectUI";
import { courseStatusOptions, priceTypeOptions } from "@/constants/global";

import { useAddCourseMutation } from "@/redux/api/adminApi/courseApi";
import { Error_model_hook, Success_model } from "@/utils/modalHook";


import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Spin,
  Typography,
  Upload,
  message,
} from "antd";
import { useState } from "react";

import dynamic from "next/dynamic";
import { FormProps, useForm, useFormContext } from "react-hook-form";
import { useGetAllCategoryQuery } from "@/redux/api/adminApi/categoryApi";
import { ENUM_STATUS, ENUM_YN } from "@/constants/globalEnums";
import { useGetAllUsersQuery } from "@/redux/api/adminApi/usersApi";
import TagsSelectNotSetFormUI from "@/components/ui/dashboardUI/TagsSelectNotSetForm";
import Dragger from "antd/es/upload/Dragger";
import { getCloudinaryEnv } from "@/helpers/config/envConfig";
import UploadMultipalDragAndDropImge from "@/components/ui/UploadMultipalDragAndDropImge";
const TextEditor = dynamic(
  () => import("@/components/shared/TextEditor/TextEditorNotSetForm"),
  {
    ssr: false,
  }
);

const CreateCourse = ({setOpen}:any) => {
  const [textEditorValue, setTextEditorValue] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [url, setUrl] = useState("");
  const [addCourse, { isLoading, error }] = useAddCourseMutation();

  const validateUrl = (_: any, value: string) => {
    // Basic URL validation using a regular expression
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!value || urlRegex.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("Please enter a valid URL"));
  };

  const [form] = Form.useForm();
  const onFinish = async (values: any) => {
    const courseData = {
      tags: selectedTags,
      short_description: shortDescription,
      // details: textEditorValue,
      ...values,
      img: images.length ? images[0] : "",
    };

    
    function removeNullUndefinedAndFalsey(obj: { [x: string]: any; }) {
      for (let key in obj) {
  if(!Boolean(obj[key])){
        if (obj[key] === null || obj[key] === undefined) {
          delete obj[key];
        } else if (typeof obj[key] === "object") {
          // Recursively remove null, undefined, and falsey values from nested objects
          removeNullUndefinedAndFalsey(obj[key]);
          // After recursion, check if the current object is empty
          if (Object.keys(obj[key]).length === 0) {
            delete obj[key];
          }
        } else if (Array.isArray(obj[key])) {
          // Remove null, undefined, and falsey values from arrays
          obj[key] = obj[key].filter(
            (item: boolean | null | undefined) => item !== null && item !== undefined && item !== false
          );
  
          // After filtering, check if the array is empty
          if (obj[key].length === 0) {
            delete obj[key];
          }
        }
      }
    }}


    try {
      const res = await addCourse({
        ...courseData,
        details: textEditorValue,
       
      }).unwrap();

      if (res?.success == false) {
        Error_model_hook(res?.message);
      } else {
        Success_model("Course created successfully");
        // setVideoType(null);
        // setVideoUrl("");
        setShortDescription("");
        setTextEditorValue("");
        setSelectedTags([]);
        setUrl("");
        setImages([]);
        form.resetFields();
        setOpen(false);
      }
    } catch (err: any) {
      console.error(err);
      Error_model_hook(err?.data);
    }
  };
  const categoryQuery: Record<string, any> = {};
  categoryQuery["status"] = ENUM_STATUS.ACTIVE;
  categoryQuery["limit"] = 99999;
  categoryQuery["sortBy"] = "title";
  categoryQuery["sortOrder"] = "asc";

  const { data: Category, isLoading: categoryLoading } = useGetAllCategoryQuery(
    { ...categoryQuery }
  );
  const CategoryData = Category?.data;
  // console.log(CategoryData)
  const CategoryOptions = CategoryData?.map((item: any) => {
    return {
      label: item?.title,
      value: item?._id,
    };
  });

  const query: Record<string, any> = {};
  query["status"] = ENUM_STATUS.ACTIVE;
  query["limit"] = 99999;
  query["multipleRole"] = "admin,trainer";
  query["sortBy"] = "title";
  query["sortOrder"] = "asc";
  const { data: usersData, isLoading: AuthorLoading } = useGetAllUsersQuery({
    ...query,
  });

  const AuthorOptions = usersData?.data?.map((item: any) => {
    return {
      label: item?.email,
      value: item?._id,
    };
  });

  return (
    <div className="shadow-lg rounded-lg p-2 md:p-5 bg-white">
      <Form
        layout="vertical"
        onFinish={onFinish}
        form={form}
        style={{ padding: "0.5rem" }}
      >
        <Typography.Title style={{ textDecoration: "underline" }} level={5}>
          Basic Information
        </Typography.Title>

        <section
          style={{
            padding: "0.5rem",
            borderWidth: "2px",
          }} /* className="border-2 p-2 rounded-2" */
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 ">
            <div
              style={{
                paddingRight: "0.5rem",
                borderRightWidth: "2px",
              }} /* className="border-r-2 pr-2" */
            >
              <SubHeadingUI>Basic Information</SubHeadingUI>
              <Row gutter={[8, 8]}>
                <Col xs={24} md={24} lg={24} style={{}}>
                  <Form.Item
                    label="Course title"
                    name="title"
                    rules={[
                      // {
                      //   pattern: /^[\u0980-\u09FF\s]*$/,
                      //   message: "বাংলায় শুধুমাত্র অক্ষর ব্যবহার করুন",
                      // },
                      { required: true, message: "Title is required" },
                    ]}
                  >
                    <Input size="large" placeholder="Course title" />
                  </Form.Item>
                </Col>
                <Col
                  xs={24}
                  md={12}
                  lg={12}
                  style={
                    {
                      // background:"red"
                    }
                  }
                >
                  <Form.Item
                    style={{ width: "100%" }}
                    label={"Price"}
                    name="price"
                    rules={[
                      // {
                      //   pattern: /^[\u0980-\u09FF\s]*$/,
                      //   message: "বাংলায় শুধুমাত্র অক্ষর ব্যবহার করুন",
                      // },
                      { required: true, message: "Price is required" },
                    ]}
                  >
                    <InputNumber
                      type="number"
                      style={{ width: "100%" }}
                      size="large"
                      placeholder="Please type price"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12} lg={12}>
                  <Form.Item label="Price type" name="price_type">
                    <Select size="large" style={{ width: "100%" }}>
                      {priceTypeOptions?.map((type: any, index: any) => (
                        <Select.Option value={type.value} key={index}>
                          {type.label}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} md={12} lg={12} style={{}}>
                  <Form.Item label="Course level" name="level">
                    <Input size="large" placeholder="Course level" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12} lg={12} style={{}}>
                  <Form.Item label="Showing Number" name="showing_number">
                    <InputNumber
                      type="number"
                      size="large"
                      style={{ width: "100%" }}
                      placeholder="Please type price"
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12} lg={12} style={{}}>
                  <Form.Item label="Duration" name="duration">
                    <DatePicker.RangePicker />
                  </Form.Item>
                  {/* <FormDataRange name="duration" label="Duration" /> */}
                </Col>
              </Row>
            </div>

            {/* basic info */}
            <div className="    ">
              <SubHeadingUI>Other Information</SubHeadingUI>
              <Row gutter={[12, 12]}>
                <Col xs={24} md={12} lg={12} style={{}}>
                  <Form.Item
                    label="Select course category"
                    name="category"
                    rules={[
                      { required: true, message: "Category is required" },
                    ]}
                  >
                    <Select
                      size="large"
                      loading={categoryLoading}
                      placeholder="Select your category"
                    >
                      {CategoryOptions?.map((data: any) => (
                        <Select.Option value={data.value} key={data.value}>
                          {data.label}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  {/* //! category 10 */}
                </Col>
                <Col xs={24} md={12} lg={12} style={{}}>
                  {/* <SelectAuthorField /> */}
                  <Form.Item
                    label="Author/trainer"
                    name="author"
                    rules={[
                      { required: true, message: "Author/trainer is required" },
                    ]}
                  >
                    <Select
                      size="large"
                      loading={AuthorLoading}
                      placeholder="Select course trainer"
                    >
                      {/* <Select.Option value="" key={0}>
                        Select author
                      </Select.Option> */}
                      {AuthorOptions?.map((data: any) => (
                        <Select.Option value={data.value} key={data.value}>
                          {data.label}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} md={12} lg={12}>
                  <Form.Item
                    label="Select coruse status"
                    name="type"
                    style={{ width: "100%" }}
                  >
                    <Select
                      size="large"
                      style={{ width: "100%" }}
                      placeholder="Select coruse status"
                    >
                      {courseStatusOptions?.map((data: any) => (
                        <Select.Option
                          style={{ width: "100%" }}
                          value={data.value}
                          key={data.value}
                        >
                          {data.label}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} md={12} lg={12}>
                  <Form.Item
                    label="Feature status"
                    name="favorite"
                    style={{ width: "100%" }}
                  >
                    <Select
                      size="large"
                      style={{ width: "100%" }}
                      placeholder="Select Featcher status"
                    >
                      {[
                        { label: "Yes", value: ENUM_YN.YES },
                        { label: "No", value: ENUM_YN.NO },
                      ]?.map((data: any) => (
                        <Select.Option
                          style={{ width: "100%" }}
                          value={data.value}
                          key={data.value}
                        >
                          {data.label}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} md={24} lg={24} style={{}}>
                  <Form.Item
                    name="demo_video.video"
                    label="Preview Video url from vimeo"
                    rules={[
                     
                      {
                        validator: validateUrl,
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter URL"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} md={24} lg={24} style={{}}>
                  <TagsSelectNotSetFormUI setSelectedTags={setSelectedTags} />
                </Col>

                <Col
                  xs={24}
                  style={{
                    margin: "10px 0",
                    textAlign: "start",
                  }}
                >
                  <UploadMultipalDragAndDropImge
                    multiple={false}
                    images={images}
                    setImages={setImages}
                  />
                </Col>
              </Row>
            </div>
          </div>
          <div>
            <Form.Item
              style={{ width: "100%" }}
              label="Short description"
              // rules={[
              //   { required: true, message: "short description is required" },
              // ]}
              name="short_description"
            >
              <Input.TextArea
                showCount
                maxLength={3000}
                rows={12}
                onBlur={(e) => setShortDescription(e.target.value)}
              />
            </Form.Item>
          </div>
          <section
            style={{ borderTopWidth: "2px" }} /* className=" border-t-2" */
          >
            <p className="text-center my-3 font-bold text-xl">Description</p>
            <TextEditor
              textEditorValue={textEditorValue}
              setTextEditorValue={setTextEditorValue}
            />
          </section>
          {/* <div>
              <UploadMultpalImage />
            </div> */}
             <div className="w-fit mx-auto">
          {isLoading ? (
            <Spin />
          ) : (
           
                <Button type="default" style={{marginTop:"1rem"}} htmlType="submit">
              Create Course
            </Button>
          )}
          </div>
        </section>
      </Form>
    </div>
  );
};

export default CreateCourse;
// export default dynamic(() => Promise.resolve(CreateCoursePage), {
//   ssr: false,
// });
