import { Image } from "antd";
import React from "react";
import {
  EyeOutlined,
  LikeOutlined,
  DislikeOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";

const AuthorCourseDetails = ({ authorData }: { authorData: any }) => {
  console.log(authorData);
  return (
    <div
      className="block lg:flex justify-between "
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "18px 16px",
      }}
    >
      <section
        style={{
          display: "flex",

          gap: "10px",
        }}
      >
        <Image
          src={authorData?.admin.img}
          alt="author"
          style={{
            height: "64px",
            width: "64px",
            borderRadius: "50%",
          }}
        />
        <div style={{}}>
          <h1 style={{ fontSize: "18px", fontWeight: "600" }}>
            Sampod Debnath Nath
          </h1>
          <button
            style={{
              background: "red",
              padding: "5px 8px",
              fontSize: "14px",
              fontWeight: "bold",
              borderRadius: "4px",
              color: "white",
              marginTop: "5px",
            }}
          >
            Subscribe
          </button>
        </div>
      </section>

      <section style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <button
          style={{
            background: "white",
            padding: "8px 15px",
            border: "1px solid gray",
            borderRadius: "4px",
          }}
        >
          <EyeOutlined />
          <h1>1453</h1>
        </button>
        <button
          style={{
            background: "white",
            padding: "8px 15px",
            border: "1px solid gray",
            borderRadius: "4px",
          }}
        >
          <LikeOutlined />
          <h1>1453</h1>
        </button>
        <button
          style={{
            background: "white",
            padding: "8px 15px",
            border: "1px solid gray",
            borderRadius: "4px",
          }}
        >
          <DislikeOutlined />
          <h1>1453</h1>
        </button>
        <button
          style={{
            background: "white",
            padding: "8px 15px",
            border: "1px solid gray",
            borderRadius: "4px",
          }}
        >
          <ShareAltOutlined />
          <h1>1453</h1>
        </button>
      </section>
    </div>
  );
};

export default AuthorCourseDetails;
