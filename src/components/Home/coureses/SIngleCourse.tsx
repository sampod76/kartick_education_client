import React from "react";
import {
  FieldTimeOutlined,
  UsergroupDeleteOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Rate } from "antd";
import Image from "next/image";
import Link from "next/link";

const { Meta, Grid } = Card;

const SIngleCourse = ({ course }: { course: any }) => {
  // console.log(course);
  // const { title, details, img, demo_video, tags} = course;
  return (
    <Link
      href={`/course/details/${course?._id}`}
      className="w-[23rem] mx-auto  shadow-md "
    >
      <Card
        // className="w-96 bg-red-500"
        bodyStyle={{ borderRadius: "10px, 10px, 0px, 0px" }}
        cover={
          <Image
            className="h-[18rem]"
            height={173}
            width={292}
            alt="example"
            src={course?.img}
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
        <Grid
          className="bg-primary height-[30px] text-[16px] width-[36px] rounded-2xl text-white font-semibold py-2"
          style={{
            position: "absolute",
            right: 16,
            bottom: 164,
            padding: 0,
            borderRadius: "10px",
          }}
        >
          <h2>
            <Rate className="h-[12px]" count={1} value={1} /> 5.0
          </h2>
        </Grid>

        <Meta
          // avatar={
          //   <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
          // }
          style={{
            fontSize: "16px",
            fontWeight: "500",
            textAlign: "start",
            margin: "24px 0",
            padding: "0 10px",
          }}
          title={<h2 className="text-black">{course?.title}</h2>}
          description={
            <p className="text-[#282938] ">
              {course?.details?.length < 64
                ? course?.details
                : course?.details?.slice(0, 64) + "....."}
            </p>
          }
        />
      </Card>
    </Link>
  );
};

export default SIngleCourse;
