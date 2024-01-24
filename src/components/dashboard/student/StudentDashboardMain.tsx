import React from "react";
import TopDashStatistics from "../admin/TopDashStatistics";
import StudentActivePackageToCourse from "./StudentActivePackageToCourse";

export default function StudentDashboardMain() {
  return (
    <div>
      <StudentActivePackageToCourse />
      {/* <TopDashStatistics /> */}
    </div>
  );
}
