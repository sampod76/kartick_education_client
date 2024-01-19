import React from "react";
import {
  FieldTimeOutlined,
  UsergroupDeleteOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Rate } from "antd";
import Image from "next/image";

const { Meta, Grid } = Card;

const SIngleCommonCourse = ({ course }: { course: any }) => {
  // console.log(course);
  // const { title, details, img, demo_video, tags} = course;
  return (
    <div className="w-[23rem] mx-auto  shadow-md text-center">
      <Image
        src={course?.img}
        className="h-[15rem] w-full rounded-tl-2xl "
        height={200}
        width={220}
        alt="course"
      />
      <div className="text-center p-3">
        <h1 className="text-xl font-bold uppercase mb-2">{course?.title}</h1>
        <p className=" py-3">{course?.details}</p>
      </div>
      <button className="p-1 px-2 my-3 border-2 border-secondary rounded  font-semibold gap-3">
        Join Now
      </button>
    </div>
  );
};

export default SIngleCommonCourse;
