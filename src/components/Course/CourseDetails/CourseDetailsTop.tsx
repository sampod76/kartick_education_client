import { Rate } from "antd";
import React from "react";
import { MessageOutlined, EuroCircleOutlined } from "@ant-design/icons";
import parse from "html-react-parser";
import formatMongoCreatedAtDate from "@/hooks/formateMongoTimeToLocal";
import { CutText } from "@/utils/CutText";
import VimeoPlayer from "@/utils/vimoPlayer";
import { ENUM_VIDEO_PLATFORM } from "@/constants/globalEnums";
const CourseDetailsTop = ({ courseData }: { courseData: any }) => {
  // console.log(
  //   "🚀 ~ file: CourseDetailsTop.tsx:6 ~ CourseDetailsTop ~ courseData:",
  //   courseData
  // );

  return (
    <div className="bg-[#333333] block lg:flex gap-3">
      <div className="w-full lg:w-[40%]">
        <iframe
          style={{
            height: "25rem",
            width: "100%",
          }}
          src="https://www.youtube.com/embed/zmxBHKa8AVk"
          title="TypeScript, MongoDB and Prisma Crash Courses included - Reactive Accelerator React-Next.js Course"
          //   frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          //   allowfullscreen
        ></iframe>
        {/* demo_video: { video: 'https://vimeo.com/892901931', platform: 'vimeo' }, */}
        {/* {courseData?.demo_video?.platform === ENUM_VIDEO_PLATFORM.VIMEO && (
          <VimeoPlayer link={courseData?.demo_video.vido} />
        )} */}
        {/* {lesson?.videos?.length && lesson?.videos[0]?.platform === ENUM_VIDEO_PLATFORM.VIMEO && (
                <VimeoPlayer link={lesson?.videos[0]?.link} />
              )} */}
      </div>
      <aside
        className="w-full lg:w-[60%]"
        style={{
          padding: "18px 10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "start",
          gap: "18px",
          color: "#FFFFFF",
        }}
      >
        <h1
          className="text-[2rem] font-[550] text-white"
          style={{
            fontSize: "24px",
            fontWeight: "600",
            color: "white",
          }}
        >
          {courseData?.title}
        </h1>
        <p
          //   className="text-[#d8d5d5]"
          style={{
            color: "#d8d5d5",
            fontSize: "14px",
            fontWeight: "400",
          }}
        >
  
          {courseData?.details && CutText(courseData?.short_description, 90)}
        </p>

        <p
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <div
            style={{
              //   color: "black",
              background: "#8a8a20",
              borderRadius: "5px",
              padding: "1px 8px",
              fontWeight: "550",
              color: "#FFFFFF",
            }}
          >
            <Rate
              count={1}
              value={1}
              disabled
              style={{
                color: "white",
              }}
            />
            <span>2.5</span>
          </div>

          <span>(81,665 ratings)</span>
        </p>
        <p>
          <span>114,521 student enrolled</span>
        </p>
        <div
          className=""
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <button
            style={{ display: "flex ", alignItems: "center", gap: "5px" }}
          >
            <MessageOutlined />
            <span>English</span>
          </button>
          <button
            style={{ display: "flex ", alignItems: "center", gap: "5px" }}
          >
            <EuroCircleOutlined />
            <span>English,Duch </span>
            <span>12 more...</span>
          </button>
        </div>
        <p>Last updated {formatMongoCreatedAtDate(courseData?.updatedAt)}</p>

        <div style={{ display: "flex ", gap: "1em" }}>
          <button
            className="bg-primary"
            style={{
              padding: "10px",
              color: "white",
              fontWeight: "bold",
              borderRadius: "4px",
            }}
          >
            Add to cart
          </button>
          <button
            style={{
              padding: "10px",
              color: "white",
              fontWeight: "bold",
              borderRadius: "4px",
              border: "2px solid gray",
            }}
          >
            Buy Now
          </button>
        </div>
        <p>30-Day Money-Back-Guarantee</p>
      </aside>
    </div>
  );
};

export default CourseDetailsTop;
