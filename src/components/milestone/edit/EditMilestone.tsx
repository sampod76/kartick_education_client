'use client';

import Form from '@/components/Forms/Form';

import FormInput from '@/components/Forms/FormInput';

import ButtonSubmitUI from '@/components/ui/ButtonSubmitUI';

import TagsSelectUI from '@/components/ui/dashboardUI/TagsSelectUI';

import {
  useAddMilestoneMutation,
  useGetSingleMilestoneQuery,
  useUpdateMilestoneMutation,
} from '@/redux/api/adminApi/milestoneApi';

import { Error_model_hook, Success_model } from '@/utils/modalHook';

import { Col, FloatButton, Row, Spin } from 'antd';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';

import UploadMultipalImage from '@/components/ui/UploadMultipalImage';
import FormTextArea from '@/components/Forms/FormTextArea';
import { useGetAllCategoryChildrenQuery } from '@/redux/api/categoryChildrenApi';
import SelectCategoryChildren from '@/components/Forms/GeneralField/SelectCategoryChildren';
import LoadingSkeleton from '@/components/ui/Loading/LoadingSkeleton';
import { removeNullUndefinedAndFalsey } from '@/hooks/removeNullUndefinedAndFalsey';
//
const TextEditor = dynamic(
  () => import('@/components/shared/TextEditor/TextEditor'),
  {
    ssr: false,
  },
);

export default function EditMilestone({
  milestoneId,
}: {
  milestoneId: string;
}) {
  const [category, setCategory] = useState({});
  const [courses, setCourses] = useState<{ _id?: string }>({});

  const query: Record<string, any> = {};
  query['children'] = 'course';
  //! for Category options selection
  const { data: Categorys, isLoading } = useGetAllCategoryChildrenQuery({
    ...query,
  });
  const categoryData: any = Categorys?.data;
  //
  const { data = {}, isLoading: gerMilestoneLoading } =
    useGetSingleMilestoneQuery(milestoneId);

  //
  // const [textEditorValue, setTextEditorValue] = useState("");

  const [updateMilestone, { isLoading: milestonLoading }] =
    useUpdateMilestoneMutation();

  const onSubmit = async (values: any) => {
    removeNullUndefinedAndFalsey(values);
    if (courses._id) {
      values['course'] = courses._id;
    }
    const MilestoneData: {} = {
      ...values,
      // details: textEditorValue,
    };
    // console.log(MilestoneData);
    removeNullUndefinedAndFalsey(MilestoneData);
    try {
      const res = await updateMilestone({
        id: milestoneId,
        data: MilestoneData,
      }).unwrap();
    
      if (res?.success == false) {
        Error_model_hook(res?.message);
      } else {
        Success_model('Successfully Update Milestone');
        // setTextEditorValue("");
      }
      // console.log(res);
    } catch (error: any) {
      Error_model_hook(error?.message);
      console.log(error);
    }
  };
  if (gerMilestoneLoading) {
    return <LoadingSkeleton number={10} />;
  }
  return (
    <>
      <div className="my-3 rounded-lg border-2 border-blue-300 bg-white p-5 shadow-lg">
        <h1 className="my-2 text-xl font-bold">Update Milestone</h1>
        <div className="my-2 mb-2 text-start text-xl font-bold">
          <span className="bg-blue rounded-lg border p-3 hover:bg-blue-600 hover:text-white">
            {' '}
            Category:➡{data?.course?.category?.title}
          </span>{' '}
          <span className="bg-blue rounded-xl border p-3 hover:bg-blue-600 hover:text-white">
            Course:➡ {data?.course?.title}
          </span>
        </div>
      </div>
      <div
        style={{
          boxShadow:
            '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          borderRadius: '1rem',
          backgroundColor: 'white',
          padding: '1rem',
        }}
      >
        {data._id ? (
          <div>
            {/* resolver={yupResolver(adminSchema)} */}
            {/* resolver={yupResolver(IServiceSchema)} */}
            <Row gutter={[16, 16]} style={{ marginBottom: '1rem' }}>
              <Col xs={24} md={6}>
                <SelectCategoryChildren
                  lableText="Change category"
                  setState={setCategory}
                  isLoading={isLoading}
                  categoryData={categoryData}
                />
              </Col>
              <Col xs={24} md={12}>
                <SelectCategoryChildren
                  lableText="Change courses"
                  setState={setCourses}
                  categoryData={
                    //@ts-ignore
                    category?.courses || []
                  }
                />
              </Col>
            </Row>

            <Form
              submitHandler={onSubmit}
              defaultValues={
                data?._id ? { ...data, course: data?.course?._id } : {}
              }
            >
              <div
                style={{
                  border: '1px solid #d9d9d9',
                  borderRadius: '5px',
                  padding: '15px',
                }}
              >
                <Row gutter={[12, 12]}>
                  <hr className="my-2 border-2" />
                  <Col className="gutter-row" xs={24} style={{}}>
                    <FormInput
                      type="text"
                      name="title"
                      size="large"
                      label="Milestone Title"
                      placeholder="Please enter a milestone title"
                    />
                  </Col>
                  <Col className="gutter-row" xs={4} style={{}}>
                    <FormInput
                      type="number"
                      name="milestone_number"
                      size="large"
                      label="Milestone No"
                      placeholder="Please enter a milestone No"
                    />
                  </Col>

                  {/* <Col className="gutter-row" xs={24} md={12} lg={8} style={{}}>
                  <SelectAuthorField />
                </Col> */}

                  <Col className="gutter-row" xs={24} style={{}}>
                    <TagsSelectUI defaultTags={data?.tags} />
                  </Col>
                  <Col className="gutter-row" xs={24} style={{}}>
                    <UploadMultipalImage
                      defaultImage={data?.imgs || []}
                      name="img"
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
                    <div
                      style={{
                        borderTopWidth: '2px',
                      }} /* className=" border-t-2" */
                    >
                      <p className="my-3 text-center text-xl font-bold">
                        Description
                      </p>
                      <TextEditor
                        // textEditorValue={textEditorValue}
                        // setTextEditorValue={setTextEditorValue}
                        defaultTextEditorValue={data?.details || ''}
                      />
                    </div>
                  </Col>
                </Row>
              </div>
              <div>
                {milestonLoading ? (
                  <Spin />
                ) : (
                  <div className="text-center">
                    <ButtonSubmitUI>Update Milestone</ButtonSubmitUI>
                  </div>
                )}
              </div>
              {/* <FloatButton
        shape="square"
          type="default"
        style={{ right: "40%" ,width:"9rem",fontSize:"2rem"}}
        description="Create Milestone"
      
      /> */}
            </Form>
          </div>
        ) : (
          <div className="flex min-h-64 w-full animate-pulse items-center justify-center">
            <h1 className="text-center text-2xl font-semibold text-red-600">
              No found milestone{' '}
            </h1>
          </div>
        )}
      </div>
    </>
  );
}
