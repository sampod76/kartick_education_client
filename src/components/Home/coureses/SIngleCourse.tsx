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
import { CutText } from "@/utils/CutText";
const { Meta, Grid } = Card;
// import { AllImage } from "@/assets/AllImge";

import dayjs from "dayjs";

const SIngleCourse = ({ course }: { course: Record<string, any> }) => {
  // console.log(course);
  // const { title, details, img, demo_video, tags} = course;
  // console.log(course);
  return (
    <Link
      href={`/course/milestone/${course?._id}`}
      className="max-w-sm min-w-full mx-auto h-full  shadow-md "
    >

<div className="rounded overflow-hidden shadow-lg">
  <div >
    
    <div className="relative">
    <Image height={350} width={350} className="w-full h-[230px]" src={course?.img|| AllImage?.notFoundImage} alt="Sunset in the mountains"/>
<div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
    <div ><div className="absolute bottom-0 left-0 bg-primary px-4 py-2 text-white text-sm hover:bg-white hover:text-primary transition duration-500 ease-in-out">
    {course?.price}
    </div></div>
    <div ><h2 className="text-sm absolute top-0 right-0 bg-slate-200 px-4 text-black rounded-full h-12 w-12 flex flex-col items-center justify-center mt-3 mr-3 hover:bg-primary hover:text-white transition duration-500 ease-in-out capitalized">
      {/* <span className="font-bold">27</span> */}
      <small>$ {course?.price_type}</small>
      </h2></div>
    </div></div>
  <div className="px-6 py-4 h-full">
    <div  className="font-semibold text-lg inline-block hover:text-primary transition duration-500 ease-in-out text-start">
    {CutText(course?.title,30)}
    </div>
    <p className="text-start text-gray-500 text-sm">
   {CutText(course?.short_description,120)}
    </p>
  </div>
  <div className="px-6 py-4 flex flex-row items-center">
    <span  className="py-1 text-sm font-regular text-gray-900 mr-1 flex flex-row items-center">    
      <span className="ml-1">
       { course?.duration?.length && dayjs(course?.duration[1]).format("MMM D, YYYY hh:mm A")}
  </span></span>
  </div>
</div>
    </Link>
  );
};

export default SIngleCourse;
