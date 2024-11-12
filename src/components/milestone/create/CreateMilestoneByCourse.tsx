'use client';

import {
  useAddMilestoneMutation,
  useGetAllMilestoneQuery,
} from '@/redux/api/adminApi/milestoneApi';

import { Error_model_hook, Success_model } from '@/utils/modalHook';
import { useState } from 'react';

import { useGlobalContext } from '@/components/ContextApi/GlobalContextApi';
import SelectCategoryChildren from '@/components/Forms/GeneralField/SelectCategoryChildren';
import { removeNullUndefinedAndFalsey } from '@/hooks/removeNullUndefinedAndFalsey';
import { useGetAllCategoryChildrenQuery } from '@/redux/api/categoryChildrenApi';
import { Button, Col, Form, Input, Row, Spin } from 'antd';

export default function CreateMilestoneByCourse() {
  const [form] = Form.useForm();
  const { userInfo } = useGlobalContext();
  //

  const [category, setCategory] = useState<{ _id?: string }>({});
  const [courses, setCourses] = useState<{ _id?: string }>({});
  const [isReset, setIsReset] = useState(false);

  const query: Record<string, any> = {};
  query['children'] = 'course';
  if (userInfo?.role !== 'admin') {
    query['author'] = userInfo?.id;
  }
  //! for Category options selection
  const { data: Categorys, isLoading } = useGetAllCategoryChildrenQuery({
    ...query,
  });
  const categoryData: any = Categorys?.data;
  //
  //

  const { data: lastMilestion, isLoading: MLoading } = useGetAllMilestoneQuery(
    { course: courses._id },
    { skip: !Boolean(courses?._id) },
  );


  const [addMilestone, { isLoading: serviceLoading }] =
    useAddMilestoneMutation();

  const onSubmit = async (values: any) => {
    // console.log(values);
    // const imgUrl = await uploadImgBB(values.img);
    removeNullUndefinedAndFalsey(values);
    // values.img = imgUrl;
    if (!courses._id) {
      Error_model_hook('Course must be select');
      return;
    }

    const MilestoneData: {} = {
      ...values,

      course: courses._id,
    };
    // console.log(MilestoneData);

    try {
      const res = await addMilestone(MilestoneData).unwrap();
  
      if (res?.success == false) {
        Error_model_hook(res?.message);
      } else {
        Success_model('Successfully added Milestone');

        setIsReset(true);
      }
      // console.log(res);
    } catch (error: any) {
      Error_model_hook(error?.message);
      console.log(error);
    }
  };

  return (
    <>
      <div className="my-3 rounded-lg border-2 border-blue-300 bg-white p-5 shadow-lg">
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
          <Col xs={24} md={12}>
            <SelectCategoryChildren
              lableText="Select courses"
              setState={setCourses}
              categoryData={
                //@ts-ignore
                category?.courses || []
              }
            />
          </Col>
        </Row>
      </div>

      {lastMilestion?.data?.length ? (
        <h1>All ready exist milestone</h1>
      ) : (
        <div
          style={{
            boxShadow:
              '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            borderRadius: '1rem',
            backgroundColor: 'white',
            padding: '1rem',
          }}
        >
          {category?._id && courses?._id ? (
            <div>
              {/* resolver={yupResolver(adminSchema)} */}
              {/* resolver={yupResolver(IServiceSchema)} */}
              <h1 className="my-2 text-xl font-bold">Create Milestone</h1>

              <Form form={form} layout="vertical" onFinish={onSubmit}>
                <div
                  style={{
                    border: '1px solid #d9d9d9',
                    borderRadius: '5px',
                    padding: '15px',
                  }}
                >
                  <Row gutter={[12, 12]}>
                    <Col xs={24}>
                      <Form.Item
                        name="title"
                        label="Milestone Title"
                        rules={[
                          {
                            required: true,
                            message: 'Please enter a milestone title',
                          },
                        ]}
                      >
                        <Input
                          size="large"
                          placeholder="Please enter a milestone title"
                        />
                      </Form.Item>
                    </Col>

                    <Col xs={4}>
                      <Form.Item
                        name="milestone_number"
                        label="Milestone No"
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
                        <Input
                          size="large"
                          type="number"
                          placeholder="Please enter a milestone No"
                          min={1}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </div>

                <div className="text-center" style={{ marginTop: '1rem' }}>
                  {serviceLoading ? (
                    <Spin />
                  ) : (
                    <Button type="primary" htmlType="submit">
                      Create Milestone
                    </Button>
                  )}
                </div>
              </Form>
            </div>
          ) : (
            <div className="flex min-h-64 w-full animate-pulse items-center justify-center">
              <h1 className="text-center text-2xl font-semibold text-red-600">
                First select your Course by filtering{' '}
              </h1>
            </div>
          )}
        </div>
      )}
    </>
  );
}
