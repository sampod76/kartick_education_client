'use client';
import {
  useAddMemberMutation,
  useUpdateMemberMutation,
} from '@/redux/api/adminApi/memberApi';
import { Error_model_hook } from '@/utils/modalHook';
import { Button, Form, Input, message, Select, Upload } from 'antd';
import CustomImageTag from '../ui/CustomTag/CustomImageTag';
const MemberModal = ({
  initialValues,
  readOnly = false,
}: {
  initialValues?: any;
  readOnly?: boolean;
}) => {
  let iniValue = { ...initialValues };

  const [form] = Form.useForm();
  const [addMember, { isLoading }] = useAddMemberMutation();
  const [updateMember, { isLoading: uloading }] = useUpdateMemberMutation();

  const handleFinish = async (values: any) => {
    try {
      /*
       const [image, files] = await Promise.all([
        multipleFilesUploaderS3([values?.image?.[0]?.originFileObj]),
        multipleFilesUploaderS3(
          Array.isArray(values.files)
            ? values.files.map((file: UploadFile) => file.originFileObj)
            : [] // Provide an empty array if values.files is not an array
        ),
      ]); 
      */

      const formData = new FormData();
      if (values.image && values.image[0].originFileObj) {
        formData.append('image', values.image[0].originFileObj);
        // delete values.image;
      }
      delete values.image;
      formData.append('data', JSON.stringify(values));
      if (iniValue._id) {
        const res = await updateMember({
          id: iniValue._id,
          data: formData,
        }).unwrap();
        message.success('Successfully Updated');
      } else {
        const res = await addMember(formData).unwrap();
        message.success('Successfully added');
        form.resetFields();
      }
    } catch (error: any) {
      message.error(
        error?.data?.message || error?.message || 'Somthing is wrong',
      );
      Error_model_hook(error?.message);
    }
  };

  if (iniValue) {
    const { image, ...valueCopy } = iniValue;
    iniValue = valueCopy;
  }

  return (
    <Form
      form={form}
      disabled={readOnly}
      onFinish={handleFinish}
      initialValues={iniValue._id ? { ...iniValue } : {}}
      layout="vertical"
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[
          {
            required: iniValue._id ? false : true,
            message: 'Please input the title!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Subtitle1" name="sub1">
        <Input />
      </Form.Item>
      <Form.Item label="Subtitle2" name="sub2">
        <Input />
      </Form.Item>

      <div className="block items-center gap-2 lg:flex">
        <Form.Item
          label="Member type"
          name="memberType"
          className="w-40"
          rules={[
            {
              required: iniValue._id ? false : true,
              message: 'Please select the company!',
            },
          ]}
        >
          <Select placeholder="Select a member type" size="large">
            <Select.Option value="boardOfTrustees">
              Board Of Trustees
            </Select.Option>
            <Select.Option value="leadership">Leadership</Select.Option>
            <Select.Option value="ourStaff">Our Staff</Select.Option>
          </Select>
        </Form.Item>
        {initialValues?.image && (
          <Form.Item
            label="Status"
            name="status"
            className="w-40"
            rules={[
              {
                required: iniValue._id ? false : true,
                message: 'Please select status!',
              },
            ]}
          >
            <Select placeholder="Select a status" size="large">
              <Select.Option value="active">Active</Select.Option>
              <Select.Option value="deactivate">Deactivate</Select.Option>
            </Select>
          </Form.Item>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Form.Item
          label="Profile"
          name="image"
          valuePropName="fileList"
          rules={[
            {
              required: iniValue._id ? false : true,
              message: 'Please select the image!',
            },
          ]}
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
        >
          <Upload
            // action="/upload"
            multiple={false}
            listType="picture-card"
            showUploadList={true}
            maxCount={1}
            accept="image/*"
            // onError={(error) => {
            //   console.error('Upload error:', error);
            // }}
          >
            Upload Image +
          </Upload>
        </Form.Item>

        {initialValues?.image && (
          <CustomImageTag
            src={initialValues?.image}
            height={900}
            width={900}
            className="w-32 cursor-pointer rounded-lg border border-purple-400"
            preview={true}
          />
        )}
      </div>
      <div className="my-2 flex items-center justify-center gap-2 rounded-md border">
        <Form.Item>
          <Button
            loading={isLoading || uloading}
            type="primary"
            className="mt-4"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
        {!iniValue && (
          <Form.Item>
            <Button
              // loading={isLoading}
              type="dashed"
              className="mt-4"
              htmlType="reset"
            >
              Reset
            </Button>
          </Form.Item>
        )}
      </div>
    </Form>
  );
};

export default MemberModal;
