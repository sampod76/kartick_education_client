'use client';

import {
  useGetSingleLessonQuery,
  useUpdateLessonMutation,
} from '@/redux/api/adminApi/lessoneApi';

import { Error_model_hook, Success_model } from '@/utils/modalHook';

import LoadingSkeleton from '@/components/ui/Loading/LoadingSkeleton';
import { ENUM_MIMETYPE } from '@/constants/globalEnums';
import { removeNullUndefinedAndFalsey } from '@/hooks/removeNullUndefinedAndFalsey';
import { uploadS3AnyFile } from '@/hooks/UploadSIngleCloudinary';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Divider,
  Form,
  Input,
  InputNumber,
  Select,
  Tooltip,
  Upload,
} from 'antd';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { IFileAfterUpload } from '../../types/globalType';
import { useGlobalContext } from '../ContextApi/GlobalContextApi';
import ModalComponent from '../Modal/ModalComponents';
import LessonContainShow from './LessonContainShow';
const { Option } = Select;
const TextEditor = dynamic(
  () => import('@/components/shared/TextEditor/TextEditor'),
  {
    ssr: false,
  },
);

export default function EditLesson({ lessonId }: { lessonId: string }) {
  const [videos, setVideos] = useState<any[]>([
    { platform: 'vimeo', link: '' },
  ]);
  const [loading, setLoading] = useState(false);
  const [allFIles, setFiles] = useState<IFileAfterUpload[]>([]);
  console.log('🚀 ~ EditLesson ~ allFIles:', allFIles);
  const [form] = Form.useForm();
  const { userInfo, userInfoLoading } = useGlobalContext();

  const [isReset, setIsReset] = useState(false);
  const [module, setmodule] = useState<{ _id?: string; title?: string }>({});

  //----------------------------------------------------------------
  const { data, isLoading: getLessonLoading } = useGetSingleLessonQuery(
    lessonId,
    {
      skip: !Boolean(lessonId),
    },
  );
  // console.log(data);
  const [updateLesson, { isLoading: UpdateLesson }] = useUpdateLessonMutation();

  const onSubmit = async (values: any) => {
    console.log('🚀 ~ onSubmit ~ values:', values);

    removeNullUndefinedAndFalsey(values);
    if (module?._id) {
      values['module'] = module?._id;
    }
    setLoading(true);

    if (values?.files?.length) {
      let files: any[] = [];
      // const res = await multipleFilesUploaderS3(values?.files);
      const defaultValuesFiles: IFileAfterUpload[] = [];

      values?.files.forEach((element: IFileAfterUpload) => {
        if (element.path) {
          defaultValuesFiles.push(element);
        } else {
          files.push(element);
        }
      });
      files = await uploadS3AnyFile(
        files?.map((re: any) => re.originFileObj),
        'files',
      );
      delete values?.files; // !after all error req to large
      values['files'] = [...files, ...defaultValuesFiles];
    }
    if (allFIles) {
      if (values?.files?.length > 0) {
        values['files'] = [...values.files, ...allFIles];
      } else {
        values['files'] = [...allFIles];
      }
    }
    const LessonData: any = {
      ...values,
      videos,
    };

    removeNullUndefinedAndFalsey(LessonData);

    try {
      const res = await updateLesson({
        id: lessonId,
        data: LessonData,
      }).unwrap();
      //// console.log(res);
      if (res?.success == false) {
        Error_model_hook(res?.message);
        setIsReset(true);
      } else {
        Success_model('Successfully Update Lesson');
      }
      //// console.log(res);
    } catch (error: any) {
      Error_model_hook(error.message || error?.data);
      // console.log(error);
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

  const handleVideoChange = (index: number, key: any, value: string) => {
    const newVideos = [...videos];
    newVideos[index][key] = value as any;
    setVideos(newVideos);
  };

  useEffect(() => {
    if (data?._id) {
      if (data?.videos) {
        setVideos(data?.videos);
      }
      if (data?.files?.length) {
        setFiles(data?.files);
      }
    }
  }, [data?._id]);

  if (getLessonLoading) {
    return <LoadingSkeleton number={20} />;
  }

  const fileData = { ...data };
  delete fileData?.files;

  return (
    <div>
      <div>
        <div className="my-3 rounded-lg border-2 border-blue-500 bg-white p-5 shadow-md">
          <h1 className="my-5 text-center">Update Lesson</h1>

          <div className="my-2 mb-2 space-x-2 text-start text-xl font-bold">
            <span className="rounded-lg border p-3 text-base hover:bg-blue-600 hover:text-white md:text-lg">
              {' '}
              Category:➡{fileData?.module?.milestone?.course?.category?.title}
            </span>{' '}
            <span className="rounded-xl border p-3 text-base hover:bg-blue-600 hover:text-white md:text-lg">
              Course:➡ {fileData?.module?.milestone?.course?.title}
            </span>
            <h1 className="mt-3 w-fit rounded-lg p-1 text-base hover:bg-blue-600 hover:text-white md:text-lg">
              Milestone:➡{fileData?.module?.milestone?.milestone_number}
              {' : '}
              {fileData?.module?.milestone?.title}
            </h1>
            <h1 className="mt-3 w-fit rounded-lg p-1 text-base hover:bg-blue-600 hover:text-white md:text-lg">
              Module:➡{fileData?.module?.module_number}
              {' : '}
              {fileData?.module?.title}
            </h1>
            {/* <h1 className=" mt-3 p-1 rounded-lg w-fit text-base md:text-lg hover:bg-blue-600 hover:text-white">
                Milestone:➡{fileData?.module?.milestone?.milestone_number}
                {" : "}
                {fileData?.module?.milestone?.title}
              </h1> */}
          </div>
        </div>
      </div>

      {fileData?._id ? (
        <div className="rounded-lg bg-white p-3 shadow-xl">
          <Form
            initialValues={{ ...fileData }}
            className="p-5"
            layout="vertical"
            onFinish={onSubmit}
            form={form}
          >
            <h2 className="text-center">Update Lesson</h2>
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-12">
              <Form.Item
                label="Lesson Title"
                name="title"
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
                  // { required: true, message: 'Please enter the lesson number' },
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
            <div className="my-4">
              {/* <ModalInComponent
                button={
                  <div className="flex items-center justify-center">
                    <p className="cursor-pointer rounded-lg bg-blue-500 px-2 py-1 text-white">
                      Click To Open Content
                    </p>
                  </div>
                }
              >
                <LessonContainShow lesson={data} />
              </ModalInComponent> */}
              <ModalComponent
                button={
                  <div className="flex items-center justify-center">
                    <Button type="primary">Click To Open</Button>
                  </div>
                }
                width={1200}
                maskClosable={false}
              >
                <LessonContainShow lesson={data} />
              </ModalComponent>
            </div>

            <Divider> Add Video </Divider>

            {videos?.map((video, index) => (
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
                <PlusOutlined /> Add More Video
              </Button>
            </div>
            <Divider> Update File (pdf/ppt/doc) </Divider>

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

            <div className="flex flex-wrap items-center justify-center gap-3">
              {allFIles?.length
                ? allFIles.map((file: IFileAfterUpload) => {
                    return (
                      <div
                        key={file.path}
                        className="flex w-fit items-center justify-start gap-3 rounded-md border"
                      >
                        <ModalComponent
                          button={
                            <Tooltip title="Click and view">
                              <div className="flex items-center justify-center">
                                <p className="max-w-56 cursor-pointer truncate rounded-lg p-1 shadow-lg">
                                  {file.filename}
                                </p>
                              </div>
                            </Tooltip>
                          }
                          width={1200}
                          maskClosable={false}
                        >
                          <LessonContainShow lesson={data} />
                        </ModalComponent>
                        <Tooltip title="Remove">
                          <MinusCircleOutlined
                            onClick={() => {
                              setFiles((currentFiles) =>
                                currentFiles.filter(
                                  (current) => current.path !== file.path,
                                ),
                              );
                            }}
                            style={{ fontSize: '20px', color: 'red' }}
                          />
                        </Tooltip>
                      </div>
                    );
                  })
                : null}
            </div>

            <Form.Item label="Short Description" name="shortDescription">
              <Input.TextArea placeholder="Please enter short description" />
            </Form.Item>
            <div className="flex items-center justify-center">
              <Button
                type="primary"
                style={{ marginTop: '1rem' }}
                htmlType="submit"
                loading={UpdateLesson || loading}
              >
                Update Lesson
              </Button>
            </div>
          </Form>
        </div>
      ) : (
        <div className="flex min-h-64 w-full animate-pulse items-center justify-center">
          <h1 className="text-center text-2xl font-semibold text-red-600">
            Can not found Lesson{' '}
          </h1>
        </div>
      )}
    </div>
  );
}
