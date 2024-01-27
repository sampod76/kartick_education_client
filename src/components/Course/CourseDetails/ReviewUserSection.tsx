"use client";
import { IReview, reviewsData } from "@/db/reviews";
import { Image, Radio, RadioChangeEvent, Rate } from "antd";
import React, { useState } from "react";

export default function ReviewUserSection() {
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    //  // console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const reviews = reviewsData;
  // console.log(reviews);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "1em",
      }}
    >
      {reviews?.map((item: IReview, index: number) => {
        return (
          <div
            className="shadow1"
            style={{ padding: "2rem 10px", width: "100%", background: "white" }}
            key={index}
          >
            <div
              style={{
                display: "flex",
                gap: "10px",
                marginBottom: "5px",
              }}
            >
              <Image
                src={item?.user?.img}
                alt="author"
                style={{
                  height: "64px",
                  width: "64px",
                  borderRadius: "50%",
                }}
              />
              <div style={{}}>
                <h1 style={{ fontSize: "18px", fontWeight: "600" }}>
                  {item?.user?.name}
                </h1>
                <button
                  style={{
                    background: "red",
                    padding: "5px 8px",
                    fontSize: "14px",
                    fontWeight: "bold",
                    borderRadius: "4px",
                    color: "white",
                    marginBlock: "8px",
                  }}
                >
                  Subscribe
                </button>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1em",
                background: "white",
              }}
            >
              {/* <Rate value={4.5} count={4.5} disabled allowHalf /> */}
              <Rate allowHalf defaultValue={4.5} disabled />
              <p style={{ fontSize: "14px", color: "grey" }}>{item?.review}</p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "2em",
                  marginBlock: "2px 12px",
                }}
              >
                <p style={{ fontSize: "14px", color: "grey" }}>
                  Was this review helpful?
                </p>
                <Radio.Group onChange={onChange} value={value}>
                  <Radio value={1} key={index + 1}>
                    Yes
                  </Radio>
                  <Radio value={2} key={index + 2}>
                    No
                  </Radio>
                </Radio.Group>
                <h1 style={{ fontSize: "16px", color: "black" }}>Report</h1>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
