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

const { Content } = Layout;

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const userLoggedIn = isLoggedIn();
  // const userLoggedIn = USER_ROLE.ADMIN;

  const userInfo:any = getUserInfo();
  console.log(userInfo);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [collapsed, setCollapsed] = useState(false);

  const screens = useBreakpoint();

  useEffect(() => {
    setIsLoading(true);
    if (userInfo?.role !==USER_ROLE.ADMIN) {
      router.push("/login");
    }
    setIsLoading(false);
  }, [router, isLoading, userLoggedIn, userInfo?.role]);

  if (isLoading || !userLoggedIn) {
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

  return (
    <Layout
      hasSider
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      {!screens.sm ? (
        <Drawer
          title={`${userLoggedIn} Dash`}
          placement="left"
          onClose={() => setCollapsed(false)}
          open={collapsed}
        >
          <Menu
            // className="bg-white"
            style={{ backgroundColor: "#ffffff" }}
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={dashboardItems(userInfo?.role,setCollapsed)}
          />
        </Drawer>
      ) : (
        <section>
          <DashboardSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        </section>
      )}

      <Layout style={{ overflow: "hidden" }}>
        <DashboardNavBar collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content
          style={{
            padding: "1em",
            minHeight: "100vh",
            overflowY: "initial",
            textAlign: "center",
          }}
        >
          {children}
        </Content>
        {/* <Footer></Footer> */}
      </Layout>
    </Layout>
  );
};

// export default DashboardLayout;

export default dynamic(() => Promise.resolve(DashboardLayout), {
   ssr: false,
 });
