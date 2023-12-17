"use client";
import { AlertOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const UserAvatarUI = () => {
  const router = useRouter();

  const logoutHandler = () => {
    message.error("Logout Successfully");
    router.push("/");
  };

  return (
    <section style={{ display: "flex", alignItems: "center", gap: "1.5em" }}>
      <Link href={`/profile`}>
        <Avatar size="large" icon={<UserOutlined />} />
      </Link>
    </section>
  );
};

export default UserAvatarUI;
