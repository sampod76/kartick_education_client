import React from "react";
import {
  FieldTimeOutlined,
  UsergroupDeleteOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Rate } from "antd";
import Image from "next/image";
import Link from "next/link";
import { EllipsisMiddle } from "@/utils/CutTextElliples";

const { Meta, Grid } = Card;

const SIngleProgramme = ({ programme }: { programme: any }) => {
  // console.log(programme);
  // const { title, details, img, demo_video, tags} = programme;
  return (
    <div className="max-w-sm min-w-full mx-auto h-full flex flex-col justify-between  shadow-md p-2  text-start bg-white">
      <div className="">
        <Image
          src={programme?.img}
          className="h-[13rem] lg:h-[15rem] w-full rounded-md object-cover"
          height={200}
          width={220}
          alt="programme"
        />
        <div className="text-start p-3">
          <h1 className="text-xl lg:text-2xl font-bold uppercase mb-2">
            {programme?.title}
          </h1>
          <p className="text-sm lg:text-base py-3">
            <EllipsisMiddle maxLength={250} suffixCount={3}>
       
                
                {programme?.details + programme?.details +programme?.details} 
           
            </EllipsisMiddle>
          </p>
        </div>
      </div>
      <Link
        href={`/course/milestone/${programme?._id}?categoryName=${
          programme?.category?.title
        }&programmeName=${programme?.title}&category=${
          programme?.category?._id || programme?.category
        }`}
        className="p-2  text-nowrap  my-2 w-[6.5rem] border-2 border-primary rounded  font-semibold gap-3 hover:bg-primary hover:text-white"
      >
        Enroll Now
      </Link>
    </div>
  );
};

export default SIngleProgramme;
