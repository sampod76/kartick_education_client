"use client";
import { AllImage } from "@/assets/AllImge";
import { authKey } from "@/constants/storageKey";
import { removeUserInfo } from "@/services/auth.service";
import {
  AlertOutlined,
  UserOutlined,
  ShopOutlined,
  MessageOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Button, Dropdown, MenuProps, message } from "antd";
import Image from "next/image";
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
      label: <Link href={"/Setting"}>Setting</Link>,
    },
    {
      key: "4",
      label: <Link href={"/Help"}>Help</Link>,
    },
    {
      key: "5",
      label: <Link href={"/SendFeedback"}>Send Feedback</Link>,
    },
    {
      key: "6",
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
    <section
      style={{
        display: "flex",
        alignItems: "center",
        gap: "28px",
        marginLeft: "24px",
      }}
    >
      <Dropdown
        menu={{ items }}
        overlayStyle={{
          minWidth: "100px",
          background: "black",
        }}
      >
        <button style={{ opacity: "0px" }}>
          {/* <Avatar
            style={{
              fontSize: "",
              color: "black",
            }}
            size={50}
            icon={}
          /> */}
          <Image
            src={AllImage.profileAvater || ""}
            width={300}
            height={300}
            className="w-12  h-12 rounded-full"
            alt=""
          />
        </button>
      </Dropdown>
    </section>
  );
};

export default UserAvatarUI;
