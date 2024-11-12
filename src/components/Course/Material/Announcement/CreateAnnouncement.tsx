import { Button, DatePicker, Form, Input } from 'antd';
import React from 'react';

import { useGlobalContext } from '@/components/ContextApi/GlobalContextApi';
import { useAddAnnouncementMutation } from '@/redux/api/adminApi/announcementApi';
import { Error_model_hook, Success_model } from '@/utils/modalHook';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

interface AnnouncementFormProps {
  initialValues?: any;
  courseId?: string;
}

const AnnouncementForm: React.FC<AnnouncementFormProps> = ({
  initialValues,
  courseId,
}) => {
  const { userInfo, userInfoLoading } = useGlobalContext();
  const [form] = Form.useForm();
  const [addAnnounceMent, { isLoading }] = useAddAnnouncementMutation();

  const handleFinish = async (values: any) => {
    try {
      const formattedValues = {
        ...values,
        courseId,
        [`${userInfo?.role}UserId`]: userInfo?.id,
        [`${userInfo?.role}RoleBaseUserId`]: userInfo?.roleBaseUserId,
        startDate: values.dateRange
          ? values.dateRange[0].toISOString()
          : undefined,
        endDate: values.dateRange
          ? values.dateRange[1].toISOString()
          : undefined,
      };
      delete formattedValues.dateRange;
      await addAnnounceMent(formattedValues).unwrap();
      Success_model('Successfully Published Announcement');
    } catch (error) {
      console.log('🚀 ~ handleFinish ~ error:', error);
      Error_model_hook(error);
    }
  };

  // Disable past dates
  const disabledDate = (current: any) => {
    return current && current < dayjs().startOf('day');
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        ...initialValues,
        dateRange:
          initialValues?.startDate && initialValues?.endDate
            ? [dayjs(initialValues.startDate), dayjs(initialValues.endDate)]
            : undefined,
      }}
      onFinish={handleFinish}
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Please enter the title' }]}
      >
        <Input placeholder="Enter Title" />
      </Form.Item>

      <Form.Item label="Zoho Number" name={['zoho', 'number']}>
        <Input placeholder="Enter Zoho Number" />
      </Form.Item>

      <Form.Item label="Zoho Link" name={['zoho', 'link']}>
        <Input placeholder="Enter Zoho Link" />
      </Form.Item>

      <Form.Item label="Another Link" name="link">
        <Input placeholder="Enter Link" />
      </Form.Item>

      <Form.Item label="Description" name="description">
        <Input.TextArea placeholder="Enter Description" rows={4} />
      </Form.Item>

      <Form.Item label="Date Range" name="dateRange">
        <RangePicker showTime disabledDate={disabledDate} />
      </Form.Item>

      <Form.Item>
        <Button loading={isLoading} type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AnnouncementForm;
