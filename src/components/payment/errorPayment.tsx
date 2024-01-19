"use client";
import React from "react";
import { Button, Result } from "antd";
import Link from "next/link";

const PaymentFail = ({ message="" }: { message?: string }) => (
  <Result
    status="warning"
    title={`There are some problems with your operation.${message}`}
    extra={
      <Button type="default" key="console">
        <Link href={"/"}> Go to Home </Link>
      </Button>
    }
  />
);

export default PaymentFail;
