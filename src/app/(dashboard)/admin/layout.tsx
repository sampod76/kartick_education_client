"use client";
import Contents from "@/components/ui/Contents";
import SideBar from "@/components/ui/Sidebar";
import { USER_ROLE } from "@/constants/role";
import { getUserInfo, isLoggedIn } from "@/services/auth.service";
import { Drawer, Layout, Menu, Row, Space, Spin } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { dashboardItems } from "@/constants/dashBoardItems";
import DashboardSidebar from "@/components/shared/DashBoard/DashboardSidebar";
import DashboardNavBar from "@/components/shared/DashBoard/DashboardNavbar";
import dynamic from "next/dynamic";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const userLoggedIn = isLoggedIn();
  const userInfo = getUserInfo() as any;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!userInfo?.role) {
      router.push("/login");
    } else if (userInfo?.role !== USER_ROLE.ADMIN) {
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

export default AdminLayout;

// export default dynamic(() => Promise.resolve(AdminLayout), {
//   ssr: false,
// });
