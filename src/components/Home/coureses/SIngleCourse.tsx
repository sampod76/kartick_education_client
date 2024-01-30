"use client"
import React, { ReactNode } from "react";
import {

  ShoppingCartOutlined
} from "@ant-design/icons";
import { CgPlayButtonO } from "react-icons/cg";
import { CiClock2 } from "react-icons/ci";
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
import CoverSvg from "@/assets/svg/CoverBackground";
import { SVGstudentIcom } from "@/assets/svg/Icon";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/features/cartSlice";
import { useAddCartMutation } from "@/redux/api/userApi/cartAPi";
import { IDecodedInfo, getUserInfo } from "@/services/auth.service";
import { Error_model_hook, Success_model } from "@/utils/modalHook";

const { Text } = Typography;

const SIngleCourse = ({ course }: { course: ICourseData }) => {
  // console.log(course);
  // const { title, details, img, demo_video, tags} = course;
  // console.log(course);
  const screens = useBreakpoint();

  // const dispatch = useAppDispatch()
  const userInfo = getUserInfo() as IDecodedInfo

  const [addCart] = useAddCartMutation()

  const addToCartHandler = async (CartCourse: ICourseData) => {
    // dispatch(addToCart(CartCourse))

    const cartData = {
      course: CartCourse?._id,
      user: userInfo?.id

    }

    try {
      const res = await addCart(cartData).unwrap();
      // console.log(res);
      if (res?.success == false) {
        Error_model_hook(res?.message);
      } else {
        Success_model(`${CartCourse?.title} added to Cart`);
      }
      // console.log(res);
    } catch (error: any) {
      Error_model_hook(error?.message);
      console.log(error);
    }
    // console.log(cartData, 'cartData')
  }
  return (
    <div

      className="w-[350px] md:w-full mx-auto  rounded-md shadow-md bg-white relative"
    >

      <Link href={`/course/milestone/${course?._id}?categoryName=${course?.category?.title
        }&courseName=${course?.title}&category=${course?.category?._id || course?.category
        }`}>
        <div className="overflow-hidden ">
          <div className="relative">
            <div>
              <Image
                height={350}
                width={350}
                // loader={LoaderNextImage}
                className="w-full h-[200px] xl:h-[220px] object-cover rounded-md" // Add the rounded-md class here
                src={course?.img || AllImage?.notFoundImage}
                // onLoadingComplete={(img) => console.log(img.naturalWidth)}
                alt="Sunset in the mountains"
              // placeholder={`data:image/https://media.giphy.com/media/9MImS9neQuoRa3D19h/giphy.gif` }

              // blurDataURL="https://media.giphy.com/media/9MImS9neQuoRa3D19h/giphy.gif"
              />
            </div>
            <div className="hover:bg-transparent   rounded-md duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
            <div>
              <div className="absolute bottom-0 left-0 bg-primary px-4 py-2 text-white text-sm hover:bg-white hover:text-primary transition duration-500 ease-in-out">
                {course?.price} $
              </div>
            </div>
            <div>
              <h2 className="text-sm absolute top-0 right-0 bg-slate-200 px-4 text-black rounded-full h-12 w-12 flex flex-col items-center justify-center mt-3 mr-3 hover:bg-primary hover:text-white transition duration-500 ease-in-out capitalized">
                {/* <span className="font-bold">27</span> */}
                <small className="capitalize">{course?.price_type}</small>
              </h2>
            </div>
          </div>

        </div>
        <div className="px-6 py-4 flex flex-col justify-between h-[11rem] ">
          <div>
            <Typography.Title level={4}>
              <EllipsisMiddle suffixCount={3} maxLength={90}>
                {course?.title}
              </EllipsisMiddle>
            </Typography.Title>

            <p className="text-black text-sm md:text-base">
              <EllipsisMiddle suffixCount={3} maxLength={screens.xl ? 120 : 200}>
                {course?.short_description}
              </EllipsisMiddle>
            </p>
          </div>

        </div>
      </Link>
      <div className="bg-gray-100 py-2 flex flex-row justify-between items-center text-xs sm:text-sm text-gray-900  px-6 ">
        <span className="py-1  font-regular whitespace-nowrap text-gray-900 flex flex-row items-center">
          {/* <span className="ml-1">
              {course?.duration?.length &&
                dayjs(course?.duration[1]).format("MMM D, YYYY")}
            </span> */}
          <CgPlayButtonO className="mr-1" /> {course?.totalVideoSize} video
        </span>
        {/* <span onClick={() => addToCartHandler(course)} className="flex whitespace-nowrap justify-center items-center gap-1 cursor-pointer">
          <ShoppingCartOutlined style={{}} /> Add to cart
        </span> */}
        <span className="flex whitespace-nowrap justify-center items-center gap-1">
          <SVGstudentIcom className="text-gray-900" />{" "}
          {course?.totalEnrollStudentSize + " " + "students"}
        </span>
      </div>
    </div>
  );
};

export default SIngleCourse;
