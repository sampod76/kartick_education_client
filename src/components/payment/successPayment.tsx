"use client";
import { Button, Result } from "antd";
import Link from "next/link";
import React from "react";

export default function PaymentSuccessComponent({
  orderNumber="",
}: {
  orderNumber: string;
}) {
  return (
    <div>
      <Result
        status="success"
        title="Successfully Purchased "
        subTitle={`Order number: ${orderNumber} configuration takes 1-5 minutes, please wait.`}
        extra={[
          <Link href={'/'} key={"dd"} className="bg-green-600 text-white px-3 py-[5px] rounded">
            Go Home
          </Link>,
          <Button key="buy">Buy Again</Button>,
        ]}
      />
    </div>
  );
}
