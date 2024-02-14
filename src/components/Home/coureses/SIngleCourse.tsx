"use client";
import React, { ReactNode, useEffect } from "react";
import { ShoppingCartOutlined, SnippetsOutlined } from "@ant-design/icons";
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

import { AnimatePresenceWrapper } from "@/components/framer_motion/AnimatePresence";
import VimeoPlayer from "@/utils/vimoPlayer";
import { urlChecker } from "@/utils/urlChecker";
import { ENUM_VIDEO_PLATFORM } from "@/constants/globalEnums";
const { Text } = Typography;

const SIngleCourse = ({ course }: { course: ICourseData }) => {
  // console.log(course);
  // const { title, details, img, demo_video, tags} = course;
  // console.log(course);
  const screens = useBreakpoint();

  // const dispatch = useAppDispatch()
  const userInfo = getUserInfo() as IDecodedInfo;

  const [addCart] = useAddCartMutation();

  const addToCartHandler = async (CartCourse: ICourseData) => {
    // dispatch(addToCart(CartCourse))

    const cartData = {
      course: CartCourse?._id,
      user: userInfo?.id,
    };

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
  };

  return (
    <>
      <div className="w-[350px] md:w-full h-full rounded-md shadow-md bg-white mx-auto flex flex-col justify-between ">
        <div className="flex justify-center items-center">

          <VimeoPlayer
            width={!screens.xl ? 360 : !screens.lg ? 385 : !screens.sm ? 340 : 340}
            height={347}
            autoplay={false}
            // link={result.data as string}
            link={urlChecker(course?.demo_video?.video).platform === ENUM_VIDEO_PLATFORM.VIMEO ? course.demo_video.video : "https://vimeo.com/547716679"}
          />
        </div>
        <div className="flex flex-col justify-between item-start">
          <Link
            href={`/course/milestone/${course?._id}?categoryName=${course?.category?.title
              }&courseName=${course?.title}&category=${course?.category?._id || course?.category
              }`}
          >

            <div className="px-2 py-2 flex flex-col justify-between  ">
              <div>
                <Typography.Title level={4}>
                  <EllipsisMiddle suffixCount={3} maxLength={90}>
                    {course?.title}
                  </EllipsisMiddle>
                </Typography.Title>

              </div>
            </div>
          </Link>
          <div>
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
                <SnippetsOutlined className="text-gray-900" />
                {course?.totalEnrollStudentSize + " " + "quiz"}
              </span>
              <span className="flex whitespace-nowrap justify-center items-center gap-1">
                <SVGstudentIcom className="text-gray-900" />{" "}
                {course?.totalEnrollStudentSize + " " + "students"}
              </span>
            </div>
            <button className=" bg-secondary text-center font-bold w-full text-white h-[rem] text-xl py-2">
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SIngleCourse;
