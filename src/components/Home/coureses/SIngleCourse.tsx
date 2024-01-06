import React from "react";
import {
  FieldTimeOutlined,
  UsergroupDeleteOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Rate } from "antd";
import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";
import { AllImage } from "@/assets/AllImge";
const { Meta, Grid } = Card;

const SIngleCourse = ({ course }: { course: Record<string, any> }) => {
  // console.log(course);
  // const { title, details, img, demo_video, tags} = course;
  return (
    <Link
      href={`/course/milestone/${course?._id}`}
      className="max-w-xs mx-auto  shadow-md "
    >
      <Card
        // className="w-96 bg-red-500"
        bodyStyle={{ borderRadius: "10px, 10px, 0px, 0px" }}
        cover={
          <Image
            className="h-44 w-full object-cover"
            height={300}
            width={300}
            // layout="responsive"
            alt="example"
            src={course?.img || AllImage.noimage}
          />
        }
        hoverable
        headStyle={{
          // color:"red"
          position: "relative",
        }}
        actions={[
          <button key="demo_video">
            <VideoCameraOutlined />{" "}
            <span>{course?.demo_video?.length} Video</span>
          </button>,
          <button key="time">
            <FieldTimeOutlined /> <span>{course?.tags?.length} Jam</span>
          </button>,
          <button key="users">
            <UsergroupDeleteOutlined />
            <span> 34 students</span>
          </button>,
        ]}
      >
        {/* <Grid
          // className="bg-primary height-[30px] text-[16px] width-[36px] rounded-2xl text-white font-semibold py-2"
          style={{
            position: "absolute",
            right: 16,
            bottom: 164,
            padding: 0,
            // borderRadius: "10px",
            paddingTop: "0.5rem",
            paddingBottom: "0.5rem",
            borderRadius: "1rem",
            fontWeight: 600,
            color: "ffffff",
          }}
        >
          <h2>
            <Rate className="h-[12px]" count={1} value={1} /> 5.0
          </h2>
        </Grid> */}

        <Meta
          style={{
            fontSize: "16px",
            fontWeight: "500",
            textAlign: "start",
            // margin: "24px 0",
            // padding: "0 10px",
          }}
          title={
            <h2 className="text-sm md:text-base" style={{ color: "black" }}>
              {course?.title}
            </h2>
          }
          description={
            <p className="text-xs md:text-sm" style={{ color: "#282938" }}>
              {course?.short_description &&
              course?.short_description?.length < 80
                ? parse(course?.short_description)
                : parse(course?.short_description?.slice(0, 80)) + "....."}
            </p>
          }
        />
      </Card>
    </Link>
  );
};

export default SIngleCourse;
