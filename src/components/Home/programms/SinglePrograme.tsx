import React from "react";
import {
  FieldTimeOutlined,
  UsergroupDeleteOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Rate } from "antd";
import Image from "next/image";

const { Meta, Grid } = Card;

const SIngleProgramme = ({ programme }: { programme: any }) => {
  // console.log(programme);
  // const { title, details, img, demo_video, tags} = programme;
  return (
    <div className="w-[23rem] mx-auto  shadow-md py-2  text-start">
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
      <button className="p-1 my-3 border-2 border-secondary rounded  font-semibold gap-3">
        Join Now
      </button>
    </div>
  );
};

export default SIngleProgramme;
