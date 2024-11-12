'use client';

import FormInput from '@/components/Forms/FormInput';
import FormSelectField from '@/components/Forms/FormSelectField';
import FormTextArea from '@/components/Forms/FormTextArea';
// import TextEditor from "@/components/shared/TextEditor/TextEditor";
import ButtonSubmitUI from '@/components/ui/ButtonSubmitUI';
import LoadingSkeleton from '@/components/ui/Loading/LoadingSkeleton';
import UploadMultipalImage from '@/components/ui/UploadMultipalImage';
import TagsSelectUI from '@/components/ui/dashboardUI/TagsSelectUI';
import { courseStatusOptions } from '@/constants/global';
import { removeNullUndefinedAndFalsey } from '@/hooks/removeNullUndefinedAndFalsey';
import {
  useGetSingleModuleQuery,
  useUpdateModuleMutation,
} from '@/redux/api/adminApi/moduleApi';
import { useGetAllCategoryChildrenQuery } from '@/redux/api/categoryChildrenApi';
import { Error_model_hook, Success_model } from '@/utils/modalHook';
import { Button, Col, Form, Input, Row, Select, Spin } from 'antd';
import dynamic from 'next/dynamic';
import { useState } from 'react';
const TextEditorNotSetForm = dynamic(
  () => import('@/components/shared/TextEditor/TextEditorNotSetForm'),
  {
    ssr: false,
  },
);

export default function EditModule({ moduleId }: { moduleId: string }) {
  const [textEditorValue, setTextEditorValue] = useState('');
  const [updateModule, { isLoading: updateModuleLoading }] =
    useUpdateModuleMutation();
  const { data = {}, isLoading } = useGetSingleModuleQuery(moduleId, {
    skip: !Boolean(moduleId),
  });

  const onSubmit = async (values: any) => {
    removeNullUndefinedAndFalsey(values);
    const ModuleData: any = {
      ...values,
    };
    if (textEditorValue) {
      ModuleData.details = textEditorValue;
    }
    if (ModuleData.module_number) {
      ModuleData.module_number = Number(ModuleData.module_number);
    }
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
        Success_model('Successfully Update Module');
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

  const { milestoneDefault, ...othersData } = data;

  return (
    <>
      <div>
        <div className="my-3 rounded-lg border-2 border-blue-300 bg-white p-5 shadow-lg">
          <div className="mb-2 flex flex-wrap items-center gap-2 text-start text-xl font-bold">
            <span className="flex items-center rounded-lg border border-blue-300 p-3 text-base transition-colors duration-300 hover:bg-blue-600 hover:text-white md:text-lg">
              <svg
                className="mr-2 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 15l7-7 7 7"
                ></path>
              </svg>
              Category: ➡ {data?.milestone?.course?.category?.title}
            </span>
            <span className="flex items-center rounded-xl border border-blue-300 p-3 text-base transition-colors duration-300 hover:bg-blue-600 hover:text-white md:text-lg">
              <svg
                className="mr-2 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 15l7-7 7 7"
                ></path>
              </svg>
              Course: ➡ {data?.milestone?.course?.title}
            </span>
          </div>
          <h1 className="mt-3 inline-flex items-center rounded-lg p-1 text-base transition-colors duration-300 hover:bg-blue-600 hover:text-white md:text-lg">
            <svg
              className="mr-2 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
            Milestone: ➡ {data?.milestone?.milestone_number} :{' '}
            {data?.milestone?.title}
          </h1>
        </div>
      </div>
      {data?._id ? (
        <div
          style={{
            boxShadow:
              '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            borderRadius: '1rem',
            backgroundColor: 'white',
            padding: '1rem',
          }}
        >
          <div>
            {/* <Row gutter={[16, 16]} style={{ marginBottom: "1rem" }}>
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
            </Row> */}
            <Form
              onFinish={onSubmit}
              initialValues={{ ...othersData }}
              layout="vertical"
              style={{
                border: '1px solid #d9d9d9',
                borderRadius: '5px',
                padding: '15px',
              }}
            >
              <p
                style={{ fontSize: '18px', marginBottom: '10px' }}
                className="text-center"
              >
                Update Module
              </p>
              <hr className="border-1.5 mb-2" />
              <Row gutter={[16, 16]}>
                <Col xs={24} md={20}>
                  <Form.Item name="title" label="Module Title">
                    <Input size="large" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={4}>
                  <Form.Item
                    name="module_number"
                    label={`Module No`}
                    rules={[
                      {
                        validator: (_, value) => {
                          if (
                            !value ||
                            value <= 0 ||
                            !Number.isInteger(Number(value))
                          ) {
                            return Promise.reject(
                              new Error('Please enter a positive integer'),
                            );
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <Input type="number" size="large" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8} lg={4}>
                  <Form.Item
                    label="Select  status"
                    name="status"
                    style={{ width: '100%' }}
                  >
                    <Select
                      size="large"
                      style={{ width: '100%' }}
                      placeholder="Select status"
                    >
                      {courseStatusOptions?.map((data: any) => (
                        <Select.Option
                          style={{ width: '100%' }}
                          value={data.value}
                          key={data.value}
                        >
                          <p className="capitalize"> {data.label}</p>
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                {/* <Col xs={24}>
                  <Form.Item label="Tags">
                    <TagsSelectUI />
                  </Form.Item>
                </Col> */}
                <Col xs={24}>
                  <div
                    style={{
                      borderTopWidth: '2px',
                    }} /* className=" border-t-2" */
                  >
                    <p className="my-3 text-center text-xl font-bold">
                      Description (optional)
                    </p>
                    <TextEditorNotSetForm
                      textEditorValue={textEditorValue}
                      defaultTextEditorValue={othersData?.details || ''}
                      setTextEditorValue={setTextEditorValue}
                    />
                  </div>
                </Col>
              </Row>
              <div className="flex items-center justify-center">
                <Form.Item>
                  <Button
                    loading={updateModuleLoading}
                    type="primary"
                    htmlType="submit"
                  >
                    Update Module
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </div>
        </div>
      ) : (
        <div className="flex min-h-64 w-full animate-pulse items-center justify-center">
          <h1 className="text-center text-2xl font-semibold text-red-600">
            Can not find Module{' '}
          </h1>
        </div>
      )}
    </>
  );
}
