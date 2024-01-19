"use client";
import { Rate } from "antd";
import React from "react";
import FeedbackSection from "./FeedbackSection";
// import ReviewUserSection from "./ReviewUserSection";
import dynamic from "next/dynamic";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";

const ReviewUserSection = dynamic(() => import("./ReviewUserSection"), {
  ssr: false,
});

const ReviewsPage = () => {
  const { xs, sm, md, lg, xl } = useBreakpoint();
  return (
    <div
      className="block-flex"
      style={{
        width: "100%",
        marginInline: "auto",
        gap: "2rem",
        background: "#F7F7F7",
        padding: "0 10px",
        // display: "flex",
        // alignItems: "center",
        // maxWidth:"100rem"
      }}
    >
      <div
        style={{
          padding: "10px 24px",
          background: "white",
          width: `${sm ? "40%" : "100%"}`,
        }}
      >
        <h2 style={{ color: "#333333", fontSize: "20px", fontWeight: "600" }}>
          Student Feedback
        </h2>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            background: "#F7F7F7",
            padding: "8px 14px",
            margin:"16px 0px"
          }}
        >
          <h4 style={{ fontSize: "16px", color: "#333333" }}>4.6</h4>
          <Rate defaultValue={5.5} value={5.5} allowHalf disabled />
          <h4 style={{ fontWeight: "550" }}>Course Rating</h4>
        </div>

        {/* feedback  */}
        <FeedbackSection></FeedbackSection>
      </div>

      {/* user reviews section */}
      <div style={{ width: `${sm ? "60%" : "100%"}` }}>
        <ReviewUserSection />
      </div>
    </div>
  );
};

export default ReviewsPage;
