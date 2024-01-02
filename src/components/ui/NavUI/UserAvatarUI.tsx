"use client";
import { AlertOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const UserAvatarUI = () => {
  const router = useRouter();

  return (
    <section
      style={{ display: "flex", alignItems: "center", gap: "1.5em" }}
      className="mb-5"
    >
      <>
        <Avatar size="large" icon={<UserOutlined />} />
      </>
    </section>
  );
};

export default UserAvatarUI;
