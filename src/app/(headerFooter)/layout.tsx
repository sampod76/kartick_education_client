import Footer from "@/components/Home/Footer";
import HomeHeader from "@/components/Home/HomeHeader";

import { Layout, Row, Space, Spin } from "antd";


const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout >
      <Space direction="vertical">
        <HomeHeader/>
        <main className="min-h-screen">{children}</main>
        <Footer />
      </Space>
    </Layout>
  );
};

export default DashboardLayout;
