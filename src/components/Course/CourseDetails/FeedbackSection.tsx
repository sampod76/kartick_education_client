import { IFeedback, feedbackData } from "@/db/reviews";
import { Progress, Rate } from "antd";
import React from "react";

const FeedbackSection = () => {
  return (
    <div>
      {feedbackData?.map((item: IFeedback, index: number) => {
        return (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Progress strokeColor="red" percent={50} size={[300, 20]} />
            <Rate
              defaultValue={item?.stars}
              value={item?.stars}
              allowHalf
              disabled
              style={{
                width: "100%",
              }}
            />
            <h3
              style={{
                color: "#333333",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              {item?.percent}%
            </h3>
          </div>
        );
      })}
    </div>
  );
};

export default FeedbackSection;
