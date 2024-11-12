'use client';

import { useResetPasswordMutation } from '@/redux/api/auth/authApi';
import { Error_model_hook, Success_model } from '@/utils/modalHook';
import { Button, Form, Input } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';

// import { useSearchParams } from 'react-router-dom'; // Assuming you're using React Router

export default function ResetPasswordPage({
  params,
}: {
  params: { id: string };
}) {
  const router: any = useRouter();

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const id = params?.id;
  const searchParams = useSearchParams();
  const token = searchParams?.get('token');
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    const passwordData: any = {
      id,
      token,
      ...values,
    };
    try {
      const res = await resetPassword(passwordData).unwrap();
      // console.log(res);
      if (res?.success == false) {
        Error_model_hook(res?.message);
      } else {
        Success_model('Password Updated');
        form.resetFields();
        router.replace('/');
      }
      // console.log(res);
    } catch (error: any) {
      Error_model_hook(error?.message);
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="mx-auto mb-6 max-w-sm rounded-lg text-center text-2xl font-bold shadow-xl">
        Reset Password
      </h1>
      <Form onFinish={onFinish} form={form}>
        <div className="mb-4">
          <h2 className="mb-2 block font-bold text-gray-700">Please enter </h2>
          <Form.Item name="oldPassword">
            <Input.Password
              name="oldPassword"
              type="password"
              className=""
              id="oldPassword"
              placeholder="Enter your Old Password address"
              style={{
                paddingTop: '0.5rem',
                paddingBottom: '0.5rem',
                paddingLeft: '0.75rem',
                paddingRight: '0.75rem',
                borderRadius: '0.25rem',
                borderWidth: '1px',
                width: '100%',
                lineHeight: 1.25,
                color: '#374151',
                appearance: 'none',
              }}
            />
          </Form.Item>
          <Form.Item name="newPassword">
            <Input.Password
              name="newPassword"
              type="password"
              className=""
              id="newPassword"
              placeholder="Enter your new Password address"
              style={{
                paddingTop: '0.5rem',
                paddingBottom: '0.5rem',
                paddingLeft: '0.75rem',
                paddingRight: '0.75rem',
                borderRadius: '0.25rem',
                borderWidth: '1px',
                width: '100%',
                lineHeight: 1.25,
                color: '#374151',
                appearance: 'none',
              }}
            />
          </Form.Item>
        </div>
        <Button
          style={{
            padding: '',
            borderRadius: '9999px',
            width: '100%',
            fontSize: '0.875rem',
            lineHeight: '1.25rem',
            fontWeight: 600,
            color: '#ffffff',
            backgroundColor: '#2563EB',
            height: '2.5rem',
          }}
          loading={isLoading}
          className="focus:shadow-outline w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
          htmlType="submit"
        >
          Reset Password
        </Button>
      </Form>
    </div>
  );
}
