"use client";
import Image from "next/image";
import Link from "next/link";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, MenuProps, Space } from "antd";
import { getUserInfo, removeUserInfo } from "@/services/auth.service";
import { useEffect, useState } from "react";
import { authKey } from "@/constants/storageKey";

const HomeHeader = () => {
  const [userData, setUserData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setUserData(getUserInfo() as any);
    setIsLoading(false);
    return () => {};
  }, []);

  if (isLoading) {
    return;
  }
  const items: MenuProps["items"] = [
    {
      key: "0",
      label: (
        <Link href={`/profile`}>
          <Button>Profile</Button>
        </Link>
      ),
    },
    {
      key: "1",
      label: (
        <Button
          onClick={() => {
            setUserData({});
            removeUserInfo(authKey);
          }}
          // type="text"
          danger
        >
          Logout
        </Button>
      ),
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        // maxWidth: "2500px",
        padding: "20px",
        margin: "10px auto",
      }}
      className="border-2 shadow-lg rounded-xl container"
    >
      <Link
        href={"/"}
        style={{
          fontSize: "30px",
          color: "#ff5100",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Travel Agency
      </Link>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <Link
          href={"/"}
          style={{
            background: "blue",
            padding: "6px 30px",
            color: "white",
            fontSize: "14px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          Home
        </Link>

        {/* <Link href={`/general_user/cart`}>
          <Button
            style={{
              background: "blue",
              padding: "6px 30px",
              color: "white",
              fontSize: "14px",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            Cart
          </Button>
        </Link> */}
        {userData?.role ? (
          <>
            <Link
              style={{
                background: "blue",
                padding: "6px 30px",
                color: "white",
                fontSize: "14px",
                borderRadius: "10px",
                cursor: "pointer",
              }}
              href={`/general_user/booking`}
            >
              <>Booking</>
            </Link>
            <Link
              style={{
                background: "blue",
                padding: "6px 30px",
                color: "white",
                fontSize: "14px",
                borderRadius: "10px",
                cursor: "pointer",
              }}
              href={`/profile`}
            >
              Dashboard
            </Link>
            <Dropdown menu={{ items }}>
              <a>
                <Space wrap size={16}>
                  <Avatar size="large" icon={<UserOutlined />} />
                </Space>
              </a>
            </Dropdown>
            {/* <button
              style={{
                background: "red",
                padding: "6px 30px",
                color: "white",
                fontSize: "14px",
                borderRadius: "10px",
                cursor: "pointer",
              }}
              onClick={() => {
                setUserData({});
                removeUserInfo(authKey);
              }}
            >
              Log out
            </button> */}
          </>
        ) : (
          <>
            <Link href={`/login`}>
              <Button
                style={{
                  background: "blue",
                  padding: "6px 30px",
                  color: "white",
                  fontSize: "14px",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              >
                Login
              </Button>
            </Link>
            <Link href={`/registration`}>
              <Button
                style={{
                  background: "blue",
                  padding: "6px 30px",
                  color: "white",
                  fontSize: "14px",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              >
                Register
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default HomeHeader;
