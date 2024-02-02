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

const SIngleProgramme = ({ programme }: { programme: any }) => {
  // console.log(programme);
  // const { title, details, img, demo_video, tags} = programme;
  return (
    <div className="max-w-sm min-w-full mx-auto h-full flex flex-col justify-between  shadow-md p-2  text-start ">

      <div className="">
        <Image
          src={programme?.img}
          className="h-[15rem] w-full"
          height={200}
          width={220}
          alt="programme"
        />
        <div className="text-start p-3">
          <h1 className="text-2xl font-bold uppercase mb-2">
            {programme?.title}
          </h1>
          <p className="h-[11rem] py-3">
            {programme?.details} {programme?.details} {programme?.details}

          </p>
        </div>
      </div>
      <Link href={`/course/milestone/${programme?._id}?categoryName=${programme?.category?.title
        }&programmeName=${programme?.title}&category=${programme?.category?._id || programme?.category
        }`} className="p-2 h-[2.5rem] text-nowrap  my-2 w-[6.5rem] border-2 border-secondary rounded  font-semibold gap-3 hover:bg-secondary hover:text-white">
        Enroll Now
      </Link>
    </div>
  );
};

export default SIngleProgramme;
