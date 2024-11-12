/* eslint-disable react/jsx-no-undef */
'use client';

import SelectCategoryChildren from '@/components/Forms/GeneralField/SelectCategoryChildren';

import {
  useAddLessonMutation,
  useGetAllLessonQuery,
} from '@/redux/api/adminApi/lessoneApi';
import { useGetAllCategoryChildrenQuery } from '@/redux/api/categoryChildrenApi';

import { Error_model_hook, Success_model } from '@/utils/modalHook';

import { ENUM_MIMETYPE, ENUM_STATUS, ENUM_YN } from '@/constants/globalEnums';
import { USER_ROLE } from '@/constants/role';
import { removeNullUndefinedAndFalsey } from '@/hooks/removeNullUndefinedAndFalsey';
import { uploadS3AnyFile } from '@/hooks/UploadSIngleCloudinary';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Upload,
} from 'antd';
import { useState } from 'react';
import { useGlobalContext } from '../ContextApi/GlobalContextApi';
// const TextEditor = dynamic(
//   () => import('@/components/shared/TextEditor/TextEditor'),
//   {
//     ssr: false,
//   },
// );
interface Video {
  platform: 'youtube' | 'vimeo';
  link: string;
}
const { Option } = Select;
const CreateLesson = () => {
  const [form] = Form.useForm();
  const { userInfo, userInfoLoading } = useGlobalContext();
  const [videos, setVideos] = useState<Video[]>([
    { platform: 'vimeo', link: '' },
  ]);
  //----------------------------------------------------------------
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<{ _id?: string; title?: string }>(
    {},
  );
  const [course, setCourse] = useState<{ _id?: string; title?: string }>({});
  const [milestone, setmilestone] = useState<{ _id?: string; title?: string }>(
    {},
  );
  const [module, setmodule] = useState<{ _id?: string; title?: string }>({});
  //! for Category options selection
  const query: Record<string, any> = {};
  query['children'] = 'course-milestone-module';
  if (userInfo?.role !== USER_ROLE.ADMIN) {
    query['author'] = userInfo?.id;
  }
  const { data: Category, isLoading } = useGetAllCategoryChildrenQuery({
    ...query,
  });
  const categoryData: any = Category?.data;
  //----------------------------------------------------------------

  const [addLesson, { isLoading: addLoading }] = useAddLessonMutation();

  const { data: existLesson, isLoading: GetLessionLoading } =
    useGetAllLessonQuery(
      { module: module?._id, isDelete: ENUM_YN.NO, status: ENUM_STATUS.ACTIVE },
      { skip: !Boolean(module?._id) },
    );
  const onSubmit = async (values: any) => {
    // console.log('🚀 ~ onSubmit ~ values:', values);
    if (!module?._id || !milestone?._id || !course?._id || !category?._id) {
      Error_model_hook(
        'Please ensure your are selected Lesson/milestone/course/category',
      );
      return;
    }
    setLoading(true);
    let files = [];
    if (values?.files?.length) {
      // const res = await multipleFilesUploaderS3(images);
      files = await uploadS3AnyFile(
        values?.files?.map((re: any) => re.originFileObj),
        'files',
      );
      delete values?.files; // !after all error req to large
    }

    values.lesson_number =
      values?.lesson_number && Number(values?.lesson_number);
    const LessonData: {} = {
      ...values,
      category: category?._id,
      course: course?._id,
      milestone: milestone?._id,
      module: module?._id,
      files: files,
      videos: videos.length ? videos.filter((v) => v.link) : [],
    };
    removeNullUndefinedAndFalsey(LessonData);

    try {
      const res = await addLesson(LessonData).unwrap();

      Success_model('Successfully added Lesson');
      form.resetFields();
      setVideos([]);
    } catch (error: any) {
      Error_model_hook(error?.message);
      // console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const addVideo = () => {
    setVideos([...videos, { platform: 'vimeo', link: '' }]);
  };

  const removeVideo = (index: number) => {
    const newVideos = videos.filter((_, i) => i !== index);
    setVideos(newVideos);
  };

  const handleVideoChange = (
    index: number,
    key: keyof Video,
    value: string,
  ) => {
    const newVideos = [...videos];
    newVideos[index][key] = value as any;
    setVideos(newVideos);
  };

  // if (GetLessionLoading) {
  //   return <LoadingSkeleton></LoadingSkeleton>;
  // }
  const roundedNumber = Number(existLesson?.data[0]?.lesson_number || 0);
  // Add 0.1 to the rounded number and use toFixed again when logging
  const prelesson_number = roundedNumber + 1;

  return (
    <div>
      <div>
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
              <Col xs={24} lg={12}>
                <SelectCategoryChildren
                  lableText="Select category"
                  setState={setCategory}
                  isLoading={isLoading}
                  categoryData={categoryData}
                />
              </Col>
              <Col xs={24} lg={12}>
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
            </Row>
          </div>
        </div>
      </div>
      {module?._id ? (
        <div className="rounded-lg bg-white p-5 shadow-xl">
          {/* resolver={yupResolver(adminSchema)} */}
          {/* resolver={yupResolver(IServiceSchema)} */}

          <Form
            initialValues={{ lesson_number: prelesson_number }}
            className="p-5"
            layout="vertical"
            onFinish={onSubmit}
            form={form}
          >
            <h2 className="text-center">Create Lesson</h2>
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-12">
              <Form.Item
                label="Lesson Title"
                name="title"
                rules={[
                  { required: true, message: 'Please enter the lesson title' },
                ]}
                className="col-span-10"
              >
                <Input placeholder="Please enter.." />
              </Form.Item>
              <Form.Item
                label="Lesson No"
                name="lesson_number"
                className="col-span-2"
                // initialValue={1} // Set as a number instead of a string
                rules={[
                  { required: true, message: 'Please enter the lesson number' },
                  {
                    validator: (_, value) => {
                      if (!value) {
                        return Promise.reject(
                          new Error('Please enter the lesson number'),
                        );
                      }
                      if (!Number.isInteger(value) || value <= 0) {
                        return Promise.reject(
                          new Error('Please enter a positive integer'),
                        );
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <InputNumber
                  className="w-28"
                  placeholder="1"
                  type="number"
                  min={1}
                />
              </Form.Item>
            </div>

            <Divider> Add Video </Divider>

            {videos.map((video, index) => (
              <div
                key={index}
                style={{ display: 'flex', marginBottom: '10px' }}
              >
                <Select
                  value={video.platform}
                  onChange={(value) =>
                    handleVideoChange(index, 'platform', value)
                  }
                  style={{ width: '20%', marginRight: '10px' }}
                >
                  <Option value="vimeo">Vimeo</Option>
                  <Option value="youtube">Youtube</Option>
                </Select>
                <Input
                  placeholder="Enter Video URL"
                  value={video.link}
                  onChange={(e) =>
                    handleVideoChange(index, 'link', e.target.value)
                  }
                  style={{ width: '70%', marginRight: '10px' }}
                />
                <MinusCircleOutlined
                  onClick={() => removeVideo(index)}
                  style={{ fontSize: '20px', color: 'red' }}
                />
              </div>
            ))}

            <div className="flex items-center justify-center">
              <Button type="dashed" onClick={addVideo} className="">
                <PlusOutlined /> Add Video
              </Button>
            </div>
            <Divider> Add File (pdf/ppt/doc) </Divider>
            <Form.Item
              // label="Image"
              name="files"
              valuePropName="fileList"
              getValueFromEvent={(e) =>
                Array.isArray(e) ? e : e && e.fileList
              }
              className="flex items-center justify-center"
            >
              <Upload
                // action="/upload"
                multiple={true}
                // listType=""
                maxCount={20}
                showUploadList={true}
                accept={Object.values(ENUM_MIMETYPE).join(',')}
              >
                <Button className="!font-sm !overflow-hidden">Add File</Button>
              </Upload>
            </Form.Item>

            <Form.Item label="Short Description" name="shortDescription">
              <Input.TextArea placeholder="Please enter short description" />
            </Form.Item>
            <Button
              disabled={GetLessionLoading || isLoading}
              type="primary"
              style={{ marginTop: '1rem' }}
              htmlType="submit"
              loading={addLoading || loading}
            >
              Create Lesson
            </Button>
          </Form>
        </div>
      ) : (
        <div className="flex min-h-64 w-full animate-pulse items-center justify-center">
          <h1 className="text-center text-2xl font-semibold text-red-600">
            First select your Module by filtering{' '}
          </h1>
        </div>
      )}
    </div>
  );
};

export default CreateLesson;
