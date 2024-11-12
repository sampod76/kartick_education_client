'use client';
import { useGlobalContext } from '@/components/ContextApi/GlobalContextApi';
import { useChangePasswordMutation } from '@/redux/api/auth/authApi';
import { Error_model_hook, Success_model } from '@/utils/modalHook';
import { LockOutlined } from '@ant-design/icons';

import { Alert, Button, Form, Input, Typography } from 'antd';
import { useState } from 'react';

export default function ChangePassword() {
  const { userInfo, userInfoLoading } = useGlobalContext();
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const [passwordMatched, setPasswordMatched] = useState(false);
  const onFinish = async (values: any) => {
    // console.log("🚀 ~ onFinish ~ values:", values);
    if (values.password !== values.confirmPassword) {
      setPasswordMatched(true);
      return false;
    }
    setPasswordMatched(false);

    try {
      const res = (await changePassword({
        oldPassword: values.currentPassword,
        newPassword: values.password,
      })) as any;
      // console.log("🚀 ~ onFinish ~ res:", res);

      if (res?.error || res?.success === false) {
        Error_model_hook(res?.error || res);
      } else {
        Success_model('Successfully changed password');
      }
    } catch (error: any) {
      Error_model_hook(error);
    }
  };

  return (
    <div className="container mx-auto px-8 py-5">
      <div className="flex justify-center rounded-2xl p-5 !shadow-xl !shadow-purple-500">
        <Form
          name="normal_login"
          className="login-form w-full lg:w-[30%]"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Typography.Title level={5}>{'Old password'}</Typography.Title>
          <Form.Item
            name={'currentPassword'}
            rules={[
              {
                required: true,
                message: 'Please input your Current Password',
              },
            ]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder={'Enter your current password'}
            />
          </Form.Item>
          <Typography.Title level={5}>{'New Password'}</Typography.Title>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please input your new Password!' },
            ]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder={'Enter your new password'}
            />
          </Form.Item>
          <Typography.Title level={5}>{'Confirm Password'}</Typography.Title>
          <Form.Item
            name="confirmPassword"
            rules={[
              { required: true, message: 'Please input your new Password!' },
            ]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder={'Re-enter new password'}
            />
          </Form.Item>

          {passwordMatched && (
            <Alert
              message={'Password not matched!'}
              type="error"
              showIcon
              className="my-4"
            />
          )}

          <Form.Item>
            <Button
              type="primary"
              loading={isLoading}
              htmlType="submit"
              className="login-form-button my-0 flex w-full items-center justify-center bg-[#82866b] text-white hover:bg-[#6c7057]"
            >
              {'Confirm'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
