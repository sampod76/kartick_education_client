'use client';
import { Button, Result } from 'antd';
import Link from 'next/link';
import React from 'react';

export default function Sudjdkj() {
  return (
    <div className="mt-5 flex items-center justify-center">
      <div className="max-w-lg rounded-2xl shadow-2xl shadow-purple-500">
        <Result
          status="success"
          title="Payment Successfully"
          subTitle={`Thank you so much`}
          extra={[
            <Link
              href={'/'}
              key={'dd'}
              className="rounded bg-green-600 px-3 py-[5px] text-white hover:!text-white"
            >
              Go Home
            </Link>,
            // <Button key="buy">Buy Again</Button>,
          ]}
        />
      </div>
    </div>
  );
}
