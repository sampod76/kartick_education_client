import AdminDashboard from "@/components/dashboard/admin/AdminDashboard";
import SellerCourse from "@/components/dashboard/seller/SellerCourse";
import StudentActiveCourse from "@/components/dashboard/student/StudentActiveCourse";
import dynamic from "next/dynamic";
import React from "react";

const DashboardPage = () => {
  return (
    <>
      <AdminDashboard/>
      <SellerCourse/>

      <StudentActiveCourse/>
      
    </>
  );
};

// export default DashboardPage;


export default dynamic(() =>
        Promise.resolve(DashboardPage), {
  ssr: false,
})