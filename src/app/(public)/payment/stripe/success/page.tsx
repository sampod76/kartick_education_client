'use client'
import { Button, Result } from 'antd'
import React from 'react'

export default function Sudjdkj() {
  return (
    <div><Result
    status="success"
    title="Successfully Purchased "
    subTitle="Order number: 2017182818828182881 configuration takes 1-5 minutes, please wait."
    extra={[
      <Button type="primary" key="console">
        Go Home
      </Button>,
      <Button key="buy">Buy Again</Button>,
    ]}
  /></div>
  )
}
