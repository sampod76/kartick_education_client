"use client";

import { USER_ROLE } from "@/constants/role";
import { getUserInfo, isLoggedIn } from "@/services/auth.service";
import { Drawer, Layout, Menu, Row, Space, Spin } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import dynamic from "next/dynamic";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const userLoggedIn = isLoggedIn();
  // const userLoggedIn = USER_ROLE.ADMIN;

  const userInfo: any = getUserInfo();
  // console.log("🚀 ~ DashboardLayout ~ userInfo:", userInfo)
  // console.log(userInfo);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!userInfo?.role) {
      router.push("/login");
    } else if (userInfo?.role !== USER_ROLE.STUDENT) {
      router.back();
    }
    setIsLoading(false);
  }, [router, isLoading, userLoggedIn, userInfo?.role]);

  if (isLoading) {
    return (
      <Row
        justify="center"
        align="middle"
        style={{
          height: "100vh",
        }}
      >
        <Space>
          <Spin size="large"></Spin>
        </Space>
      </Row>
    );
  }

  return <>{children}</>;
};

// export default DashboardLayout;

export default dynamic(() => Promise.resolve(AdminLayout), {
  ssr: false,
});
