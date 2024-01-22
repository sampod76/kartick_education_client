import { IFeedback, feedbackData } from "@/db/reviews";
import { Progress, Rate } from "antd";
import React from "react";

const FeedbackSection = () => {
  return (
    <div className="">
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
            margin:"16px 0px",
            justifyContent:"space-between"
          }}
        >
          <h4 style={{ fontSize: "16px", color: "#333333" }}>4.6</h4>
          <Rate defaultValue={5.5} value={5.5} allowHalf disabled  style={{width:""}}/>
          <h4 style={{ fontWeight: "550" }}>Course Rating</h4>
        </div>
    
    <div className="grid grid-cols-1 gap-2">
      {feedbackData?.map((item: IFeedback, index: number) => {
        return (
          <div
            key={index}
            // style={{
            //   display: "flex",
            //   alignItems: "center",
            //   justifyContent: "space-between",
            //   width: "100%",
            // }}
            className="block lg:flex items-center justify-between w-full shadow-sm p-2"
          >
            <Progress
              strokeColor="#5371FF"
              percent={Number(item?.percent)}
              size={['20vw', 20]}
            />
            <Rate
              // defaultValue={item?.stars}
              value={item?.stars}
              count={item?.stars}
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
    </div>
  );
};

export default FeedbackSection;
