'use client';
import DonateNowButton from '@/app/(dashboard)/admin/donation/DonateNowButton';
import { useGlobalContext } from '@/components/ContextApi/GlobalContextApi';
import { useAddDonationMutation } from '@/redux/api/public/donactionApi';
import { useAddDonateStripePaymentMutation } from '@/redux/api/public/paymentApi';
import { Error_model_hook } from '@/utils/modalHook';
import { Button, Form, Input, InputNumber } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
interface DonationFormValues {
  userName: string;
  email: string;
  phoneNumber: string;
  description: string;
  currency: string;
  amount: number;
}

const DonationForm: React.FC = () => {
  const { userInfo } = useGlobalContext();
  const [addDonation, { isLoading }] = useAddDonationMutation();
  const [requestPaymentLink, { isLoading: requestLoading }] =
    useAddDonateStripePaymentMutation();
  const [form] = Form.useForm();
  const router = useRouter();
  const onFinish = async (values: DonationFormValues) => {
    console.log('Form Data:', values);
    try {
      const donating = await addDonation({
        ...values,
        paymentPlatform: 'stripe',
        author: userInfo?.id,
        role: userInfo?.role,
      }).unwrap();
      console.log(donating, 'donating');
      if (donating?._id) {
        const res = await requestPaymentLink({
          donationId: donating?._id,
          userId: userInfo?.id,
          role: userInfo?.role,
        }).unwrap();

        if (res?.url) {
          router.push(res.url as string);
        } else {
          Error_model_hook('Failed to generate payment link');
          return;
        }
      } else {
        Error_model_hook('Failed to make donation');
        return;
      }
    } catch (error: any) {
      Error_model_hook(error?.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-2xl rounded-lg bg-white p-8 shadow-2xl shadow-purple-500">
        <h2 className="mb-6 text-center text-2xl font-bold">Make a Donation</h2>
        <Form
          layout="vertical"
          onFinish={onFinish}
          form={form}
          style={{ padding: '0.5rem' }}
        >
          <Form.Item
            name="userName"
            label="Full Name"
            rules={[{ required: true, message: 'Please enter your name!' }]}
          >
            <Input
              className="focus:ring focus:ring-blue-300"
              placeholder="John Doe"
            />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[{ type: 'email', message: 'Please enter a valid email!' }]}
          >
            <Input
              className="focus:ring focus:ring-blue-300"
              placeholder="johndoe@example.com"
            />
          </Form.Item>

          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            // rules={[{ required: true, message: 'Please enter your phone number!' }]}
          >
            <Input
              className="focus:ring focus:ring-blue-300"
              placeholder="123-456-7890"
            />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            // rules={[{ required: true, message: 'Please provide a description!' }]}
          >
            <Input.TextArea
              className="focus:ring focus:ring-blue-300"
              placeholder=""
            />
          </Form.Item>

          {/* <Form.Item
            name="currency"
            label="Currency"
            rules={[{ required: true, message: 'Please select a currency!' }]}
          >
            <Input className="focus:ring focus:ring-blue-300" placeholder="usd" />
          </Form.Item> */}

          <div className="flex items-center justify-between gap-3">
            <Form.Item
              name="amount"
              label="Amount"
              rules={[
                {
                  required: true,
                  message: 'Please enter the donation amount!',
                },
              ]}
            >
              <InputNumber
                className="!w-32 focus:ring focus:ring-blue-300"
                min={1}
                //   max={10000}
                //   defaultValue={150}
                formatter={(value) => `$ ${value}`}
                //@ts-ignore
                parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
            <div className="flex items-center gap-3 rounded-xl border px-2 py-2">
              <h1 className="animate-pulse">Payment by Card</h1>
              <Image
                src={
                  'https://iblossomlearn.s3.us-east-2.amazonaws.com/upload/images/png-transparent-split-payment-cr-removebg-preview.png'
                }
                alt="payment method"
                width={350}
                height={350}
                className="w-16"
              />
            </div>
            {/* <Form.Item
              name="paymentMethod"
              label="Payment Method"
              rules={[
                { required: true, message: 'Please select a payment method!' },
              ]}
            >
              <Radio.Group>
                <Radio value="Credit Card">
                  <CreditCardOutlined
                    style={{ fontSize: '18px', marginRight: '8px' }}
                  />
                  Credit Card
                </Radio>
                <Radio value="Paypal">
                  <PayCircleOutlined
                    style={{ fontSize: '18px', marginRight: '8px' }}
                  />
                  Paypal
                </Radio>
              </Radio.Group>
            </Form.Item> */}
          </div>

          <Form.Item>
            <Button
              loading={isLoading || requestLoading}
              type="default"
              htmlType="submit"
              className="mt-4 w-full !border-none bg-transparent shadow-none"
            >
              <DonateNowButton />
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default DonationForm;
