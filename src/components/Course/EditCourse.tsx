'use client';

import {
  useGetSingleCourseQuery,
  useUpdateCourseMutation,
} from '@/redux/api/adminApi/courseApi';
import { Error_model_hook, Success_model } from '@/utils/modalHook';

import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Select,
  Spin,
  Tooltip,
  Typography,
  Upload,
} from 'antd';
import { useEffect, useState } from 'react';

import { courseStatusOptions } from '@/constants/global';
import { ENUM_MIMETYPE, ENUM_STATUS } from '@/constants/globalEnums';
import { USER_ROLE } from '@/constants/role';
import { uploadS3AnyFile } from '@/hooks/UploadSIngleCloudinary';
import { useGetAllCategoryQuery } from '@/redux/api/adminApi/categoryApi';
import { useGetAllCourse_labelQuery } from '@/redux/api/adminApi/courseLevelApi';
import { useGetSingleSellerQuery } from '@/redux/api/adminApi/sellerApi';
import { useGetAllUsersQuery } from '@/redux/api/adminApi/usersApi';
import { IFileAfterUpload } from '@/types/globalType';
import { MinusCircleOutlined } from '@ant-design/icons';
import dynamic from 'next/dynamic';
import { FaBook } from 'react-icons/fa';
import { useGlobalContext } from '../ContextApi/GlobalContextApi';
import ModalComponent from '../Modal/ModalComponents';
import ModalInComponent from '../Modal/ModalInComponent';
import AnyFileViewer from '../ui/AnyFileViewer';
import CustomImageTag from '../ui/CustomTag/CustomImageTag';
import LoadingSkeleton from '../ui/Loading/LoadingSkeleton';
const TextEditorNotSetForm = dynamic(
  () => import('@/components/shared/TextEditor/TextEditorNotSetForm'),
  {
    ssr: false,
  },
);
const UpdateCourse = ({ courseId }: { courseId: string }) => {
  const [allSyllabus, setSyllabusFiles] = useState<IFileAfterUpload[]>([]);
  console.log('🚀 ~ EditLesson ~ allSyllabus:', allSyllabus);
  const { userInfo, userInfoLoading } = useGlobalContext();
  const id = userInfo?.roleBaseUserId;
  let disable = true;
  if (userInfo?.role === USER_ROLE.SELLER) {
    disable = false;
  }
  const [updateCourse, { isLoading: courseUpdateLoading }] =
    useUpdateCourseMutation();
  const { data: getCourse = {}, isLoading: singleCourseLoading } =
    useGetSingleCourseQuery(courseId, {
      skip: !Boolean(courseId),
    });
  const { data: findSeller, isLoading: sellerLoading } =
    useGetSingleSellerQuery(id, { skip: disable });
  // console.log(findSeller, 'findSeller');
  const [category, setCategory] = useState('');
  const [textEditorValue, setTextEditorValue] = useState('');
  const [loadingDefault, setLoading] = useState(false);

  // const [shortDescription, setShortDescription] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [url, setUrl] = useState('');

  const validateUrl = (_: any, value: string) => {
    // Basic URL validation using a regular expression
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!value || urlRegex.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error('Please enter a valid URL'));
  };

  const labelQuery: Record<string, any> = {};
  labelQuery['limit'] = 99999999;
  labelQuery['sortBy'] = 'serial_number';
  labelQuery['sortOrder'] = 'asc';
  labelQuery['status'] = 'active';
  labelQuery['category'] = category;
  const { data: LabelData, isLoading: getLabelLoading } =
    useGetAllCourse_labelQuery(labelQuery, { skip: !Boolean(category) });
  // const LabelDataOptions = LabelData?.data?.map((item: any) => {
  //   return {
  //     label: item?.title,
  //     value: item?._id,
  //   };
  // });
  const [form] = Form.useForm();
  const onFinish = async (values: any) => {
    console.log('🚀 ~ onFinish ~ values:', values);
    setLoading(true);
    // Define a unique key for the loading message
    const key = 'loadingMessage';
    // Start loading message when the function is clicked
    message.loading({ content: 'Creating...', key });
    try {
      const [corseBanner, syllabus] = await Promise.all([
        values?.images?.length
          ? uploadS3AnyFile(
              values.images.map((re: any) => re.originFileObj),
              'images',
            )
          : Promise.resolve(null), // If no images, return null to prevent blocking

        values?.syllabus?.length
          ? uploadS3AnyFile(
              values.syllabus.map((re: any) => re.originFileObj),
              'images',
            )
          : Promise.resolve(null), // If no syllabus, return null to prevent blocking
      ]);
      const courseData = {
        tags: selectedTags,
        details: textEditorValue,
        ...values,
      };
      // if (courseData?.details && courseData.short_description) {
      //   courseData.short_description = '';
      // }
      if (corseBanner?.length) {
        courseData.img = corseBanner[0]?.url;
        courseData.image = corseBanner[0];
      }
      if (syllabus?.length) {
        courseData.syllabus = syllabus;
      }
      if (allSyllabus) {
        if (courseData?.syllabus?.length > 0) {
          courseData['syllabus'] = [...courseData?.syllabus, ...allSyllabus];
        } else {
          courseData['syllabus'] = [...allSyllabus];
        }
      }

      const res = await updateCourse({
        id: courseId,
        data: {
          ...courseData,
        },
      }).unwrap();
      console.log(res);
      if (res?.success == false) {
        Error_model_hook(res?.message);
      } else {
        Success_model('Update successfully');
      }
    } catch (err: any) {
      console.error(err);
      Error_model_hook(err?.data);
    } finally {
      setLoading(false);
    }
  };

  const categoryQuery: Record<string, any> = {};
  categoryQuery['status'] = ENUM_STATUS.ACTIVE;
  categoryQuery['limit'] = 99999;
  categoryQuery['sortBy'] = 'title';
  categoryQuery['sortOrder'] = 'asc';

  const { data: Category, isLoading: categoryLoading } = useGetAllCategoryQuery(
    { ...categoryQuery },
    { skip: !disable },
  );
  const CategoryData = Category?.data;
  // console.log(CategoryData)
  const CategoryOptions = CategoryData?.map((item: any) => {
    return {
      label: item?.title,
      value: item?._id,
    };
  });
  const SellerCategory = findSeller?.accessCategories?.map((item: any) => {
    return {
      label: item?.category?.title,
      value: item?.category._id,
    };
  });

  const query: Record<string, any> = {};
  query['status'] = ENUM_STATUS.ACTIVE;
  query['limit'] = 99999;
  query['multipleRole'] = 'admin,trainer';
  query['sortBy'] = 'title';
  query['sortOrder'] = 'asc';
  const { data: usersData, isLoading: AuthorLoading } = useGetAllUsersQuery(
    {
      ...query,
    },
    { skip: !disable },
  );

  const AuthorOptions = usersData?.data?.map((item: any) => {
    let label = '';
    if (item.role === USER_ROLE.ADMIN) {
      label = item?.admin?.name?.firstName + ' ' + item?.admin?.name?.lastName;
    } else if (item.role === USER_ROLE.TRAINER) {
      label =
        item?.trainer?.name?.firstName + ' ' + item?.trainer?.name?.lastName;
    } else if (item?.role === USER_ROLE.TEACHER) {
      label =
        item?.teacher?.name?.firstName + ' ' + item?.teacher?.name?.lastName;
    }
    return {
      label: label,
      value: item?._id,
    };
  });

  useEffect(() => {
    if (getCourse?.category?._id) {
      setCategory(getCourse?.category?._id);
    }
    if (getCourse?.details) {
      setTextEditorValue(getCourse?.details);
    }
    if (getCourse?.syllabus?.length) {
      setSyllabusFiles(getCourse?.syllabus);
    }
  }, [getCourse?.label_id, getCourse?._id]);

  if (userInfoLoading || singleCourseLoading || !getCourse?._id) {
    return <LoadingSkeleton />;
  }
  const fileData = { ...getCourse };
  delete fileData?.syllabus;
  return (
    <div className="rounded-lg bg-white p-2 shadow-lg md:p-5">
      <Form
        layout="vertical"
        onFinish={onFinish}
        form={form}
        style={{ padding: '0.5rem' }}
        initialValues={
          fileData?._id
            ? {
                ...fileData,
                category: fileData?.category?._id,
                author: fileData?.author?._id,
              }
            : {}
        }
      >
        <Typography.Title
          style={{
            textDecoration: 'underline',
            fontSize: '2rem',
            textAlign: 'center',
          }}
          level={5}
        >
          Edit Course
        </Typography.Title>

        <div
          style={{
            padding: '0.5rem',
          }} /* className="border-2 p-2 rounded-2" */
        >
          <div className="grid grid-cols-1 gap-2">
            <div
              style={{
                paddingRight: '0.5rem',
                borderRightWidth: '2px',
              }} /* className="border-r-2 pr-2" */
            >
              <Row gutter={[8, 8]}>
                <Col xs={24} md={24} lg={19} style={{}}>
                  <Form.Item
                    label="Course title"
                    name="title"
                    rules={[
                      // {
                      //   pattern: /^[\u0980-\u09FF\s]*$/,
                      //   message: "বাংলায় শুধুমাত্র অক্ষর ব্যবহার করুন",
                      // },
                      { required: true, message: 'Title is required' },
                    ]}
                  >
                    <Input size="large" placeholder="Course title" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={3} style={{}}>
                  <Form.Item
                    label="Course Id"
                    name="courseId"
                    className="col-span-2"
                  >
                    <Input
                      className="w-full"
                      placeholder="Course Id"
                      type="string"
                      size="large"
                    />
                  </Form.Item>
                </Col>

                {/* <Col xs={24} md={12} lg={12}>
                  <Form.Item label="Price type" name="price_type">
                    <Select size="large" style={{ width: '100%' }}>
                      {priceTypeOptions?.map((type: any, index: any) => (
                        <Select.Option value={type.value} key={index}>
                          {type.label}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col> */}

                {/*  <Col xs={24} md={12} lg={12} style={{}}>
                  <Form.Item label="Showing Number" name="showing_number">
                    <InputNumber
                      type="number"
                      size="large"
                      style={{ width: '100%' }}
                      placeholder="Please type price"
                    />
                  </Form.Item>
                </Col> */}

                {/* <Col xs={24} md={12} lg={12} style={{}}>
                  <Form.Item label="Duration" name="duration">
                    <DatePicker.RangePicker size="large" />
                  </Form.Item>
             
                </Col> */}
              </Row>
            </div>

            {/* basic info */}

            <Row gutter={[12, 12]}>
              <Col xs={24} md={12} lg={12} style={{}}>
                <Form.Item
                  label="Select course category"
                  name="category"
                  rules={[{ required: true, message: 'Category is required' }]}
                >
                  <Select
                    disabled
                    size="large"
                    title="Disabled because course is many dependence"
                    loading={categoryLoading}
                    placeholder="Select your category"
                    onChange={(value) => setCategory(value)}
                    options={
                      CategoryOptions?.length ? CategoryOptions : SellerCategory
                    }
                  />
                  {/* {CategoryOptions?.length
                        ? CategoryOptions?.map((data: any) => (
                            <Select.Option
                              allowClear
                              value={data.value}
                              key={data.value}
                            >
                              {data.label}
                            </Select.Option>
                          ))
                        : SellerCategory?.map((data: any) => (
                            <Select.Option
                              allowClear
                              value={data.value}
                              key={data.value}
                            >
                              {data.label}
                            </Select.Option>
                          ))}
                    </Select> */}
                </Form.Item>
                {/* //! category 10 */}
              </Col>
              <Col xs={24} md={12} lg={12} style={{}}>
                {/* <Form.Item label="Course level" name="level">
                    <Input size="large" placeholder="Course level" />
                  </Form.Item> */}
                <Form.Item label="Course label" name="label_id">
                  <Select
                    size="large"
                    allowClear
                    loading={getLabelLoading}
                    placeholder="select course label"
                    style={{ width: '100%' }}
                  >
                    {LabelData?.data?.length &&
                      LabelData?.data?.map((Label: any, index: any) => (
                        <Select.Option value={Label._id} key={Label._id}>
                          {Label?.title}
                        </Select.Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>
              {userInfo?.role === 'admin' && (
                <Col xs={24} md={12} lg={8} style={{}}>
                  {/* <SelectAuthorField /> */}
                  <Form.Item
                    label="Author/trainer"
                    name="author"
                    rules={[
                      {
                        required: true,
                        message: 'Author/trainer is required',
                      },
                    ]}
                  >
                    <Select
                      size="large"
                      loading={AuthorLoading}
                      placeholder="Select course trainer"
                      allowClear
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
              )}
              {userInfo?.role === 'admin' && (
                <Col
                  xs={24}
                  md={8}
                  lg={4}
                  style={
                    {
                      // background:"red"
                    }
                  }
                >
                  <Form.Item
                    style={{ width: '100%' }}
                    label={'Price'}
                    name="price"
                    rules={[
                      {
                        required: userInfo?.role === 'admin' ? true : false,
                        message: 'Price is required',
                      },
                    ]}
                  >
                    <InputNumber
                      type="number"
                      style={{ width: '100%' }}
                      size="large"
                      placeholder="Please type price"
                    />
                  </Form.Item>
                </Col>
              )}

              <Col xs={24} md={8} lg={4}>
                <Form.Item
                  label="Select Course status"
                  name="status"
                  style={{ width: '100%' }}
                >
                  <Select
                    size="large"
                    style={{ width: '100%' }}
                    placeholder="Select Course status"
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
              {/* <Col xs={24} md={12} lg={12}>
                <Form.Item
                  label="Feature status"
                  name="favorite"
                  style={{ width: '100%' }}
                >
                  <Select
                    size="large"
                    style={{ width: '100%' }}
                    placeholder="Select Featcher status"
                  >
                    {[
                      { label: 'Yes', value: ENUM_YN.YES },
                      { label: 'No', value: ENUM_YN.NO },
                    ]?.map((data: any) => (
                      <Select.Option
                        style={{ width: '100%' }}
                        value={data.value}
                        key={data.value}
                      >
                        {data.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col> */}

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

              {/* <Col xs={24} md={24} lg={24} style={{}}>
                <TagsSelectNotSetFormUI setSelectedTags={setSelectedTags} />
              </Col> */}

              <Col
                xs={24}
                style={{
                  margin: '10px 0',
                  textAlign: 'start',
                }}
                className="!flex !flex-col !items-center !justify-center"
              >
                <h4>Select course cover image (*)</h4>
                {/* <UploadMultipalDragAndDropImge
                  multiple={false}
                  images={images}
                  setImages={setImages}
                  setImageLoading={setImageLoading}
                  formSubmitted={formSubmitted}
                  setFormSubmitted={setFormSubmitted}
                /> */}
                {/* <UploadImageNotForm
                  setImageLoading={setImageLoading}
                  setImages={setImages}
                  multiple={false}
                  isReset={isReset}
                /> */}
                <div className="mt-4 flex items-start justify-center">
                  {getCourse?.images ||
                    (getCourse?.img && (
                      <CustomImageTag
                        src={getCourse?.images || getCourse?.img}
                        width={500}
                        height={500}
                        className="mx-3 h-24 w-28"
                        preview={true}
                      />
                    ))}
                  <Form.Item
                    // label="Image"
                    name="images"
                    valuePropName="fileList"
                    getValueFromEvent={(e) =>
                      Array.isArray(e) ? e : e && e.fileList
                    }
                  >
                    <Upload
                      // action="/upload"
                      multiple={false}
                      listType="picture-card"
                      maxCount={1}
                      showUploadList={true}
                      accept="image/*"
                    >
                      <Button className="!font-sm !overflow-hidden">
                        Upload Image
                      </Button>
                    </Upload>
                  </Form.Item>
                </div>
                {/* syllabus */}
                <div className="flex flex-col items-center justify-start">
                  <h4 className="border-b-2">Select course syllabus</h4>

                  {getCourse?.syllabus?.length && (
                    <div className="my-4">
                      <ModalInComponent
                        button={
                          <div className="flex items-center justify-center">
                            <p className="flex cursor-pointer items-center gap-2 rounded-lg bg-blue-500 px-2 py-1 text-white">
                              <FaBook /> Click To Open Syllabus
                            </p>
                          </div>
                        }
                      >
                        <AnyFileViewer files={[...getCourse?.syllabus]} />
                      </ModalInComponent>
                    </div>
                  )}
                  <Form.Item
                    name="syllabus"
                    valuePropName="syllabusFileList" //any unique value
                    getValueFromEvent={(e) => {
                      return e && e.fileList
                        ? Array.isArray(e.fileList)
                          ? e.fileList
                          : [e.fileList]
                        : [];
                    }}
                  >
                    <Upload
                      multiple={true}
                      listType="text"
                      maxCount={20}
                      showUploadList={true}
                      accept={Object.values(ENUM_MIMETYPE).join(',')}
                    >
                      <Button className="!font-sm !overflow-hidden">
                        Upload File
                      </Button>
                    </Upload>
                  </Form.Item>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    {allSyllabus?.length
                      ? allSyllabus.map((file: IFileAfterUpload) => {
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
                                <AnyFileViewer files={[file]} />
                              </ModalComponent>
                              <Tooltip title="Remove">
                                <MinusCircleOutlined
                                  onClick={() => {
                                    setSyllabusFiles((currentFiles) =>
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
                </div>
              </Col>
            </Row>
          </div>
          {getCourse?.short_description && (
            <div>
              <Form.Item
                style={{ width: '100%' }}
                label="Short description"
                // rules={[
                //   { required: true, message: "short description is required" },
                // ]}
                name="short_description"
              >
                <Input.TextArea
                  showCount
                  maxLength={3000}
                  rows={5}
                  // onBlur={(e) => setShortDescription(e.target.value)}
                />
              </Form.Item>
            </div>
          )}
          <div style={{ borderTopWidth: '2px' }} /* className=" border-t-2" */>
            <p className="my-3 text-center text-xl font-bold">
              Description (optional)
            </p>
            <TextEditorNotSetForm
              textEditorValue={textEditorValue}
              defaultTextEditorValue={textEditorValue}
              setTextEditorValue={setTextEditorValue}
            />
          </div>
          {/* <div>
              <UploadMultpalImage />
            </div> */}
          <div className="mx-auto w-fit">
            {getLabelLoading || loadingDefault || getLabelLoading ? (
              <Spin />
            ) : (
              <Button
                // disabled={getLabelLoading || loadingDefault}
                loading={courseUpdateLoading}
                type="primary"
                style={{ marginTop: '1rem' }}
                htmlType="submit"
              >
                Update Course
              </Button>
            )}
          </div>
        </div>
      </Form>
    </div>
  );
};

export default UpdateCourse;
// export default dynamic(() => Promise.resolve(CreateCoursePage), {
//   ssr: false,
// });
