import React, { ReactNode } from "react";
import {
  FieldTimeOutlined,
  UsergroupDeleteOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Rate, TooltipProps } from "antd";
import Image from "next/image";
import Link from "next/link";
import parse from "html-react-parser";
import { AllImage } from "@/assets/AllImge";
import { CutText } from "@/utils/CutText";
const { Meta, Grid } = Card;
// import { AllImage } from "@/assets/AllImge";

import { Space, Typography } from "antd";
import { EllipsisMiddle } from "@/utils/CutTextElliples";
import dayjs from "dayjs";
import LoaderNextImage from "@/components/ui/Loading/LoaderNextImage";
import { ICourseData } from "@/types/courseType";

const { Text } = Typography;

const SIngleCourse = ({ course }: { course: ICourseData }) => {
  // console.log(course);
  // const { title, details, img, demo_video, tags} = course;
  // console.log(course);
  return (
    <Link
      href={`/course/milestone/${course?._id}`}
      className="w-[90%]  md:w-full mx-auto h-full rounded-md shadow-md bg-white transition ease-in-out delay-150 0 hover:-translate-y-0.5 hover:scale-100 duration-300"
    >
      <div className="overflow-hidden">
        <div className="relative">
          <div>
            <Image
              height={350}
              width={350}
              // loader={LoaderNextImage}
              className="w-full h-[230px] object-cover rounded-md" // Add the rounded-md class here
              src={course?.img || AllImage?.notFoundImage}
              // onLoadingComplete={(img) => console.log(img.naturalWidth)}
              alt="Sunset in the mountains"
              // placeholder={`data:image/https://media.giphy.com/media/9MImS9neQuoRa3D19h/giphy.gif` }

              // blurDataURL="https://media.giphy.com/media/9MImS9neQuoRa3D19h/giphy.gif"
            />
          </div>
          <div className="hover:bg-transparent transition  rounded-md duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
          <div>
            <div className="absolute bottom-0 left-0 bg-primary px-4 py-2 text-white text-sm hover:bg-white hover:text-primary transition duration-500 ease-in-out">
              {course?.price} $
            </div>
          </div>
          <div>
            <h2 className="text-sm absolute top-0 right-0 bg-slate-200 px-4 text-black rounded-full h-12 w-12 flex flex-col items-center justify-center mt-3 mr-3 hover:bg-primary hover:text-white transition duration-500 ease-in-out capitalized">
              {/* <span className="font-bold">27</span> */}
              <small>$ {course?.price_type}</small>
            </h2>
          </div>
        </div>
      </div>
      <div className="px-6 py-4 h-full">
        <Typography.Title level={4}>
          <EllipsisMiddle suffixCount={3} maxLength={90}>
            {course?.title}
          </EllipsisMiddle>
        </Typography.Title>
        {/* <div  className="font-semibold text-lg inline-block hover:text-primary transition duration-500 ease-in-out text-start">
    {CutText(course?.title,30)}
    T</div> */}
        {/* <p className="text-start text-gray-500 text-sm">
   {CutText(course?.short_description,120)}
    </p> */}
        <p className="text-black">
          <EllipsisMiddle suffixCount={3} maxLength={230}>
            {course?.short_description}
          </EllipsisMiddle>
        </p>
      </div>
      <div className="px-6 py-2 flex flex-row items-center ">
        <span className="py-1 text-sm font-regular text-gray-900 mr-1 flex flex-row items-center">
          {/* <span className="ml-1">
              {course?.duration?.length &&
                dayjs(course?.duration[1]).format("MMM D, YYYY")}
            </span> */}
        </span>
      </div>
    </Link>
  );
};

export default SIngleCourse;
