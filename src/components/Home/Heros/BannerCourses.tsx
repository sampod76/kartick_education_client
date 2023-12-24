import React from "react";
import "./banner.css";

const BannerCourses = () => {
  return (
    <div
      className="wrapper"
      style={{
        backgroundImage: `url('/banner/courses_banner.png')`,
        backgroundRepeat: "no-repeat",
        // backgroundSize: "cover",
        // minHeight: "50vh",
        // position: "relative",
      }}
    >
      <div className="wave">
        <h1>Mathematic</h1>
        <h1>Physics</h1>
      </div>
    </div>
  );
};

export default BannerCourses;
