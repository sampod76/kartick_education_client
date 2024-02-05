"use client";

import { USER_ROLE } from "@/constants/role";
import { getUserInfo, isLoggedIn } from "@/services/auth.service";
import { Error_model_hook } from "@/utils/modalHook";
import { Drawer, Layout, Menu, Row, Space, Spin, message } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SubscriptionLayout = ({ children }: { children: React.ReactNode }) => {
  const userLoggedIn = isLoggedIn();
  const userInfo = getUserInfo() as any;

  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (userInfo?.role === USER_ROLE.STUDENT) {
      Error_model_hook("Student not available any packages or subscriptions");
      router.push("/");
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

export default SubscriptionLayout;

// export default dynamic(() => Promise.resolve(AdminLayout), {
//   ssr: false,
// });
