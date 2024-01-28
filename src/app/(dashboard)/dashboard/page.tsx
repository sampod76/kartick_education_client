"use client";
import AdminDashboardMain from "@/components/dashboard/admin/AdminDashboardMain";
import SellerDashboardMain from "@/components/dashboard/seller/SellerDashboardMain";

import StudentDashboardMain from "@/components/dashboard/student/StudentDashboardMain";
import { IDecodedInfo, getUserInfo } from "@/services/auth.service";
import dynamic from "next/dynamic";
import React from "react";

const DashboardPage = () => {
  const userInfo = getUserInfo() as IDecodedInfo;
  // console.log(userInfo);

  if (userInfo?.role == "admin") {
    return <AdminDashboardMain />;
  } else if (userInfo?.role == "seller") {
    return <SellerDashboardMain />;
  } else {
    return <StudentDashboardMain />;
  }
};

// export default DashboardPage;

export default dynamic(() => Promise.resolve(DashboardPage), {
  ssr: false,
});
