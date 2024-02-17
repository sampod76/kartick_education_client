import { Row, Space, Spin } from "antd";
import React from "react";


export default function GlobalLoading() {
  return (
    <Row
    justify="center"
    align="middle"
    style={{
      height: "100vh",
    }}
  >
    <Space>
      <Spin  size="large"></Spin>
    </Space>
  </Row>
  );
}
