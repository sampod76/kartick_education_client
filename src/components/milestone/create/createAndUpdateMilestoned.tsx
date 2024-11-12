'use client';

import Form from '@/components/Forms/Form';

import FormInput from '@/components/Forms/FormInput';

import ButtonSubmitUI from '@/components/ui/ButtonSubmitUI';

import { useAddMilestoneMutation } from '@/redux/api/adminApi/milestoneApi';

import { Error_model_hook, Success_model } from '@/utils/modalHook';

import { Col, Row, Spin } from 'antd';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import { useGlobalContext } from '@/components/ContextApi/GlobalContextApi';
import SelectCategoryChildren from '@/components/Forms/GeneralField/SelectCategoryChildren';
import { ENUM_STATUS } from '@/constants/globalEnums';
import { removeNullUndefinedAndFalsey } from '@/hooks/removeNullUndefinedAndFalsey';
import { useGetAllCategoryChildrenQuery } from '@/redux/api/categoryChildrenApi';
//
const TextEditor = dynamic(
  () => import('@/components/shared/TextEditor/TextEditor'),
  {
    ssr: false,
  },
);
// courseId -->For update
const CreateMilestone = ({ setOpen, courseId, title }: any) => {
  const { userInfo, userInfoLoading } = useGlobalContext();
  // console.log('🚀 ~ CreateMilestone ~ userInfo:', userInfo);

  //
  const [isReset, setIsReset] = useState(false);
  const [category, setCategory] = useState<{ _id?: string }>({});
  const [courses, setCourses] = useState<{ _id?: string }>({});

  const query: Record<string, any> = {};
  query['children'] = 'course';
  query['status'] = ENUM_STATUS.ACTIVE;
  if (userInfo?.role !== 'admin') {
    query['author'] = userInfo?.id;
  }

  //! for Category options selection for filtering
  const { data: Category, isLoading } = useGetAllCategoryChildrenQuery(
    {
      ...query,
    },
    { skip: Boolean(courseId) },
  );
  const categoryData: any = Category?.data;

  const [addMilestone, { isLoading: serviceLoading }] =
    useAddMilestoneMutation();

  const onSubmit = async (values: any) => {
    if (!courses._id && !courseId) {
      Error_model_hook('Course must be select');
      return;
    }
    removeNullUndefinedAndFalsey(values);
    const MilestoneData: {} = {
      ...values,
      category: category?._id,
      course: courses._id || courseId,
    };
    // console.log(MilestoneData);
    removeNullUndefinedAndFalsey(MilestoneData);
    try {
      const res = await addMilestone(MilestoneData).unwrap();

      if (res?.success == false) {
        Error_model_hook(res?.message);
      } else {
        Success_model('Successfully added Milestone');
        // setTextEditorValue("");
        setOpen(false);
        setIsReset(true);
      }
      // console.log(res);
    } catch (error: any) {
      Error_model_hook(error?.message);
    }
  };

  return (
    <>
      {!courseId ? (
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
      ) : (
        <h1 className="text-base font-normal">Course: {title}</h1>
      )}
      <div
        style={{
          boxShadow:
            '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          borderRadius: '1rem',
          backgroundColor: 'white',
          padding: '1rem',
        }}
      >
        {courses?._id ? (
          <div>
            {/* resolver={yupResolver(adminSchema)} */}
            {/* resolver={yupResolver(IServiceSchema)} */}
            <h1 className="my-2 text-xl font-bold">
              Create Milestone <br />
              <span className="text-base text-red-500">
                (There will now be only one milestone for each Course and that
                will be Any title)
              </span>
            </h1>

            <Form
              submitHandler={onSubmit}
              isReset={isReset}
              // defaultValues={{ status: ENUM_STATUS.ACTIVE }}
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
                      required={true}
                    />
                  </Col>
                  <Col className="gutter-row" xs={4} style={{}}>
                    <FormInput
                      type="number"
                      name="milestone_number"
                      size="large"
                      label="Milestone No"
                      placeholder="Please enter a milestone No"
                      // required={true}
                      defaultValue={1}
                    />
                  </Col>

                  {/* <Col className="gutter-row" xs={24} md={12} lg={8} style={{}}>
                <SelectAuthorField />
              </Col> */}

                  {/* <Col className="gutter-row" xs={24} style={{}}>
                    <TagsSelectUI />
                  </Col>
                  <Col className="gutter-row" xs={24} style={{}}>
                    <UploadMultipalImage isReset={isReset} name="imgs" />
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
                  <Col className="gutter-row" xs={24} style={{}}>
                    <div
                      style={{
                        borderTopWidth: '2px',
                      }}
                    >
                      <p className="my-3 text-center text-xl font-bold">
                        Description
                      </p>
                      <TextEditor isReset={isReset} />
                    </div>
                  </Col> */}
                </Row>
              </div>
              <div className="mx-auto w-fit">
                {serviceLoading ? (
                  <Spin />
                ) : (
                  <div className="text-center">
                    <ButtonSubmitUI>Create Milestone</ButtonSubmitUI>
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
              First select your Course by filtering{' '}
            </h1>
          </div>
        )}
      </div>
    </>
  );
};

export default CreateMilestone;
