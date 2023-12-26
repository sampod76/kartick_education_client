import { IFeedback, IReview, feedbackData, reviewsData } from "@/db/reviews";
import { Progress, Rate } from "antd";
import React from "react";
import FeedbackSection from "./FeedbackSection";

const ReviewsPage = () => {
  return (
    <div style={{ width: "100%", marginInline: "auto" }}>
      <aside
        style={{
          padding: "10px 16px",
          background: "white",
        }}
      >
        <h2 style={{ color: "#333333", fontSize: "20px", fontWeight: "600" }}>
          Student Feedback
        </h2>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "3px",
            background: "#F7F7F7",
            padding: "8px 14px",
          }}
        >
          <span style={{ fontSize: "16px", color: "#333333" }}>4.6</span>
          <Rate defaultValue={5.5} value={5.5} allowHalf disabled />
          <span style={{ fontWeight: "550" }}>Course Rating</span>
        </div>
        {/* feedback  */}
        <FeedbackSection></FeedbackSection>

        {/* user reviews section */}

        <div className="">
          {reviewsData?.map((item: IReview, index: number) => {
            return <div className="" key={index}>

              
            </div>;
          })}
        </div>
      </aside>
    </div>
  );
};

export default ReviewsPage;
