import React from "react";
import TopDashStatistics from "../admin/TopDashStatistics";
import StudentActiveCourse from "./StudentActiveCourse";

export default function StudentDashboardMain() {
  return (
    <div>
      <TopDashStatistics />
      <StudentActiveCourse />
    </div>
  );
}
