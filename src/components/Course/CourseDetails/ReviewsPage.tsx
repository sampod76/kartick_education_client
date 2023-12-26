import { IFeedback, feedbackData } from "@/db/reviews";
import { Progress, Rate } from "antd";
import React from "react";

const ReviewsPage = () => {
  return (
    <div style={{ maxWidth: "35vw" ,marginInline:"auto"}}>
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

        <div>
          {feedbackData?.map((item: IFeedback, index: number) => {
            return (
              <div
                key={index}
                style={{ display: "flex", alignItems: "center" }}
              >
                <Progress percent={50} size={[300, 20]} />
                <Rate defaultValue={5.5} value={5.5} allowHalf disabled />
                <h3>{item?.percent}%</h3>
              </div>
            );
          })}
        </div>
      </aside>
    </div>
  );
};

export default ReviewsPage;
