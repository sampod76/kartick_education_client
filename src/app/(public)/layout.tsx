import Footer from "@/components/Home/Footer";
import BannerCourses from "@/components/Home/Heros/BannerCourses";
import NavbarPublic from "@/components/shared/Headers/Navbar/NavbarPublic";
import TopBar from "@/components/shared/Headers/TopBar";

import { Layout, Row, Space, Spin } from "antd";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="">
      <TopBar />
      <NavbarPublic />
      <BannerCourses/>
      {children}
    </div>
  );
};

export default DashboardLayout;
