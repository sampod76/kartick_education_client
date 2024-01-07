"use client";
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
      <Badge count={3}>
        {/* <Avatar
          style={{
            fontSize: "",
            color: "black",
          }}
          shape="circle"
          size={35}
          icon={}
        /> */}
        <ShopOutlined
          style={{
            fontSize: "1.7rem",
            background: "white",
            color: "black",
            borderRadius: "50%",
          }}
        />
      </Badge>
      <Badge count={3} style={{ opacity: "0px" }}>
        {/* <Avatar
          style={{
            fontSize: "",
            color:"black"
          }}
          shape="circle"
          size={35}
          icon={<MessageOutlined style={{ fontSize: "1.7rem" ,background:"white",color:"black",borderRadius:"50%"}} />}
        /> */}

        <MessageOutlined
          style={{
            fontSize: "1.7rem",
            background: "white",
            color: "black",
            borderRadius: "50%",
          }}
        />
      </Badge>
      <Badge count={5} style={{ opacity: "0px" }}>
        <NotificationOutlined
          style={{
            fontSize: "1.7rem",
            background: "white",
            color: "black",
            borderRadius: "50%",
          }}
        />
      </Badge>
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
          <UserOutlined
            style={{
              fontSize: "2.7rem",
              background: "white",
              color: "black",
              borderRadius: "50%",
            }}
          />
        </button>
      </Dropdown>
    </section>
  );
};

export default UserAvatarUI;
