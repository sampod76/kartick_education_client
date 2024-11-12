'use client';

import FormInput from '@/components/Forms/FormInput';
// import TextEditor from "@/components/shared/TextEditor/TextEditor";
import { useGlobalContext } from '@/components/ContextApi/GlobalContextApi';
import SelectCategoryChildren from '@/components/Forms/GeneralField/SelectCategoryChildren';
import ButtonSubmitUI from '@/components/ui/ButtonSubmitUI';
import TagsSelectUI from '@/components/ui/dashboardUI/TagsSelectUI';
import LoadingSkeleton from '@/components/ui/Loading/LoadingSkeleton';
import { ENUM_STATUS, ENUM_YN } from '@/constants/globalEnums';
import { removeNullUndefinedAndFalsey } from '@/hooks/removeNullUndefinedAndFalsey';
import {
  useAddModuleMutation,
  useGetAllModuleQuery,
} from '@/redux/api/adminApi/moduleApi';
import { useGetAllCategoryChildrenQuery } from '@/redux/api/categoryChildrenApi';
import { Error_model_hook, Success_model } from '@/utils/modalHook';
import { Button, Col, Form, Input, Row, Select, Spin } from 'antd';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { courseStatusOptions } from '@/constants/global';
const TextEditorNotSetForm = dynamic(
  () => import('@/components/shared/TextEditor/TextEditorNotSetForm'),
  {
    ssr: false,
  },
);
export default function CreateModule() {
  const { userInfo } = useGlobalContext();
  //
  const [textEditorValue, setTextEditorValue] = useState('');
  const [category, setCategory] = useState<{ _id?: string; title?: string }>(
    {},
  );
  const [course, setCourse] = useState<{ _id?: string; title?: string }>({});
  const [milestone, setMilestone] = useState<{ _id?: string; title?: string }>(
    {},
  );
  const [isReset, setIsReset] = useState(false);

  const query: Record<string, any> = {};
  query['children'] = 'course-milestone';
  if (userInfo?.role !== 'admin') {
    query['author'] = userInfo?.id;
  }
  //! for Category options selection
  const { data: Category, isLoading } = useGetAllCategoryChildrenQuery({
    ...query,
  });
  const categoryData: any = Category?.data;
  //
  // const [textEditorValue, setTextEditorValue] = useState("");
  const [addModule, { isLoading: serviceLoading }] = useAddModuleMutation();
  const { data: existModule, isLoading: ModuleNumLoadingg } =
    useGetAllModuleQuery({
      status: ENUM_STATUS.ACTIVE,
      isDelete: ENUM_YN.NO,
      sortOrder: 'desc',
      limit: 1,
      course: course?._id,
      // details: textEditorValue,
      milestone: milestone?._id,
    });

  const onSubmit = async (values: any) => {
    if (!milestone?._id && !course?._id) {
      Error_model_hook('Please ensure your are selected milestone,course');
      return;
    }
    removeNullUndefinedAndFalsey(values);
    const ModuleData: {} = {
      ...values,
      category: category?._id,
      course: course?._id,
      details: textEditorValue,
      milestone: milestone?._id,
    };
    removeNullUndefinedAndFalsey(ModuleData);
    try {
      const res = await addModule(ModuleData).unwrap();
      console.log(res);
      if (res?.success == false) {
        Error_model_hook(res?.message);
      } else {
        Success_model('Successfully added Module');
        setIsReset(true);
      }
      // console.log(res);
    } catch (error: any) {
      Error_model_hook(error?.data);
      console.log(error);
    }
  };

  if (ModuleNumLoadingg) {
    return <LoadingSkeleton />;
  }
  const roundedModuleNumber = Number(existModule?.data[0]?.module_number || 0);
  // Add 0.1 to the rounded number and use toFixed again when logging
  const preModule_number = Math.floor(roundedModuleNumber) + 1;

  return (
    <>
      <div
        style={{
          boxShadow:
            '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          borderRadius: '1rem',
          backgroundColor: 'white',
          padding: '1rem',
          marginBottom: '1rem',
        }}
      >
        <div className="my-3 rounded-lg border-2 border-blue-500 p-5">
          <h1 className="mb-2 border-spacing-4 border-b-2 text-xl font-bold">
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
                setState={setMilestone}
                categoryData={
                  //@ts-ignore
                  course?.milestones || []
                }
              />
            </Col>
          </Row>
        </div>
      </div>
      {category?._id && course?._id && milestone?._id ? (
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
            <Form
              onFinish={onSubmit}
              initialValues={{ module_number: Number(preModule_number) }}
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
                Create Module
              </p>
              <hr className="border-1.5 mb-2" />
              <Row gutter={[16, 16]}>
                <Col xs={24} md={20}>
                  <Form.Item
                    name="title"
                    label="Module Title"
                    rules={[
                      { required: true, message: 'Please input module title!' },
                    ]}
                  >
                    <Input size="large" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={4}>
                  <Form.Item
                    name="module_number"
                    label={`Module No`}
                    rules={[
                      {
                        required: true,
                        message: 'Please enter a milestone number',
                      },
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
                      setTextEditorValue={setTextEditorValue}
                    />
                  </div>
                </Col>
              </Row>
              <div className="flex items-center justify-center">
                {serviceLoading ? (
                  <Spin />
                ) : (
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Create Module
                    </Button>
                  </Form.Item>
                )}
              </div>
            </Form>
          </div>
        </div>
      ) : (
        <div className="flex min-h-64 w-full animate-pulse items-center justify-center">
          <h1 className="text-center text-2xl font-semibold text-red-600">
            First select your Milestone by filtering{' '}
          </h1>
        </div>
      )}
    </>
  );
}

`<div style="display: flex; justify-content: center; align-items: center; "> <iframe width="273px" height="249px" src="https://player.vimeo.com/video/889428749#t=120s" frameborder="0" allowfullscreen> </iframe> </div>`;
