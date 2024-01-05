"use client";
import { authKey } from "@/constants/storageKey";
import { removeUserInfo } from "@/services/auth.service";
import {
  AlertOutlined,
  UserOutlined,
  ShoppingOutlined,
  MessageOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Button, Dropdown, MenuProps, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const UserAvatarUI = () => {
  const router = useRouter();
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <Link href={"/profile"}> Profile</Link>,
    },
    {
      key: "2",
      label: <Link href={"/dashboard"}>Dashboard</Link>,
    },
    {
      key: "3",
      label: (
        <Button
          onClick={() => {
            removeUserInfo(authKey);
            router.push("/login");
          }}
          type="dashed"
        >
          Log out
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Badge count={5} offset={[10, 10]}>
        {/* <Avatar shape="square" size="large" /> */}
        <ShoppingOutlined />
      </Badge>
      <Dropdown menu={{ items }}>
        <button style={{ opacity: "0px" }}>
          <UserAvatarUI />
        </button>
      </Dropdown>
    </div>
  );
};

export default UserAvatarUI;
