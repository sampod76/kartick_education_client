'use client';

import { useAddCourseMutation } from '@/redux/api/adminApi/courseApi';
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
  Typography,
  Upload,
} from 'antd';
import { useState } from 'react';

import { courseStatusOptions } from '@/constants/global';
import { ENUM_MIMETYPE, ENUM_STATUS } from '@/constants/globalEnums';
import { USER_ROLE } from '@/constants/role';
import { uploadS3AnyFile } from '@/hooks/UploadSIngleCloudinary';
import { useGetAllCategoryQuery } from '@/redux/api/adminApi/categoryApi';
import { useGetAllCourse_labelQuery } from '@/redux/api/adminApi/courseLevelApi';
import { useGetSingleSellerQuery } from '@/redux/api/adminApi/sellerApi';
import { useGetAllUsersQuery } from '@/redux/api/adminApi/usersApi';
import dynamic from 'next/dynamic';
import { useGlobalContext } from '../ContextApi/GlobalContextApi';
import LoadingSkeleton from '../ui/Loading/LoadingSkeleton';
const TextEditorNotSetForm = dynamic(
  () => import('@/components/shared/TextEditor/TextEditorNotSetForm'),
  {
    ssr: false,
  },
);

const CreateCourse = ({ setOpen }: any) => {
  const { userInfo, userInfoLoading } = useGlobalContext();
  const id = userInfo?.roleBaseUserId;
  let disable = true;
  if (userInfo?.role === USER_ROLE.SELLER) {
    disable = false;
  }
  const { data: findSeller, isLoading: sellerLoading } =
    useGetSingleSellerQuery(id, { skip: disable });
  // console.log(findSeller, 'findSeller');
  const [category, setCategory] = useState('');
  const [textEditorValue, setTextEditorValue] = useState('');
  const [loadingDefault, setLoading] = useState(false);
  const [imageUploadLoading, setImageLoading] = useState(false);
  const [shortDescription, setShortDescription] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [url, setUrl] = useState('');
  const [addCourse, { isLoading, error }] = useAddCourseMutation();
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
    if (!values?.images?.length) {
      Error_model_hook('Please upload atleast one image');
      return;
    }
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
      delete values?.syllabus;
      const courseData = {
        tags: selectedTags,
        short_description: shortDescription,
        details: textEditorValue,
        ...values,
      };

      if (corseBanner?.length) {
        courseData.img = corseBanner[0]?.url;
        courseData.image = corseBanner[0];
        delete courseData.images;
      }
      if (syllabus?.length) {
        courseData.syllabus = syllabus;
      }

      const res = await addCourse({
        ...courseData,
      }).unwrap();

      if (res?.success == false) {
        Error_model_hook(res?.message);
      } else {
        Success_model('Course created successfully');
        // setVideoType(null);
        // setVideoUrl("");
        setShortDescription('');
        setTextEditorValue('');
        setSelectedTags([]);
        setUrl('');
        form.resetFields();
        setOpen(false);
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
  if (userInfoLoading) {
    return <LoadingSkeleton />;
  }
  return (
    <div className="rounded-lg bg-white p-2 shadow-lg md:p-5">
      <Form
        layout="vertical"
        onFinish={onFinish}
        form={form}
        style={{ padding: '0.5rem' }}
        initialValues={{ status: ENUM_STATUS.ACTIVE }}
      >
        <Typography.Title
          style={{
            textDecoration: 'underline',
            fontSize: '2rem',
            textAlign: 'center',
          }}
          level={5}
        >
          Create a new course
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
                    // initialValue={1} // Set as a number instead of a string
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: 'Please enter the courseId',
                    //   },
                    //   {
                    //     validator: (_, value) => {
                    //       if (!value) {
                    //         return Promise.reject(
                    //           new Error('Please enter the lesson number'),
                    //         );
                    //       }
                    //       if (!Number.isInteger(value) || value <= 0) {
                    //         return Promise.reject(
                    //           new Error('Please enter a positive integer'),
                    //         );
                    //       }
                    //       return Promise.resolve();
                    //     },
                    //   },
                    // ]}
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
                    size="large"
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
                    multiple={true}
                    listType="picture-card"
                    maxCount={20}
                    showUploadList={true}
                    accept="image/*"
                  >
                    <Button className="!font-sm !overflow-hidden">
                      Upload Image
                    </Button>
                  </Upload>
                </Form.Item>
              </Col>
              {/* syllabus */}
              <div className="flex w-full items-center justify-center">
                <div className="flex flex-col items-center justify-center">
                  <h4>Select course syllabus</h4>

                  <Form.Item
                    name="syllabus"
                    valuePropName="syllabusFileList" //any unique value
                    getValueFromEvent={(e) => {
                      // console.log('Upload event:', e); // Debugging
                      // Ensure only a clean transformation without state modification
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
                </div>
              </div>
            </Row>
          </div>
          {/* <div>
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
                rows={12}
                onBlur={(e) => setShortDescription(e.target.value)}
              />
            </Form.Item>
          </div> */}
          <div style={{ borderTopWidth: '2px' }} /* className=" border-t-2" */>
            <p className="my-3 text-center text-xl font-bold">
              Description (optional)
            </p>
            <TextEditorNotSetForm
              textEditorValue={textEditorValue}
              setTextEditorValue={setTextEditorValue}
            />
          </div>
          {/* <div>
              <UploadMultpalImage />
            </div> */}
          <div className="mx-auto w-fit">
            {isLoading || getLabelLoading ? (
              <Spin />
            ) : (
              <Button
                disabled={
                  imageUploadLoading || getLabelLoading || loadingDefault
                }
                type="primary"
                style={{ marginTop: '1rem' }}
                htmlType="submit"
              >
                Create Course
              </Button>
            )}
          </div>
        </div>
      </Form>
    </div>
  );
};

export default CreateCourse;
// export default dynamic(() => Promise.resolve(CreateCoursePage), {
//   ssr: false,
// });
