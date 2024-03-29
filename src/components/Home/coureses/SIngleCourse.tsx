"use client";
import React, { ReactNode, useEffect } from "react";
import { ShoppingCartOutlined, SnippetsOutlined } from "@ant-design/icons";
import { CgPlayButtonO } from "react-icons/cg";
import { CiClock2 } from "react-icons/ci";
import { Avatar, Button, Card, Rate, TooltipProps } from "antd";
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
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/components/ContextApi/GlobalContextApi";
const { Text } = Typography;

const SIngleCourse = ({ course }: { course: ICourseData }) => {
  const { userInfo, userInfoLoading } = useGlobalContext();
  console.log("🚀 ~ SIngleCourse ~ userInfo:", userInfo);
  const router = useRouter();
  // console.log(course);
  // const { title, details, img, demo_video, tags} = course;

  const screens = useBreakpoint();

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
      <div className="w-[363px] md:w-full h-full rounded-xl shadow-xl bg-white mx-auto flex flex-col justify-between ">
        <div className="flex justify-center items-center h-1/2 mt-7">
          <VimeoPlayer
            width={
              !screens.xl ? 365 : !screens.lg ? 450 : !screens.sm ? 340 : 340
            }
            height={347}
            autoplay={false}
            // link={result.data as string}
            link={
              urlChecker(course?.demo_video?.video).platform ===
              ENUM_VIDEO_PLATFORM.VIMEO
                ? course.demo_video.video
                : "https://vimeo.com/547716679"
            }
          />
        </div>
        <div className="flex flex-col justify-between h-1/2  ">
          <Link
            href={`/course/milestone/${course?._id}?categoryName=${
              course?.category?.title
            }&courseName=${course?.title}&category=${
              course?.category?._id || course?.category
            }`}
            className=""
          >
            <div className="px-2 py-2 ">
              <div>
                <h3 className="text-black text-center">
                  <EllipsisMiddle suffixCount={3} maxLength={90}>
                    {course?.title}
                  </EllipsisMiddle>
                </h3>
              </div>
            </div>
          </Link>
          <div className="">
            <div className="bg-gray-100 flex flex-row justify-between items-center text-xs sm:text-sm text-gray-900  px-6 py-1">
              <span className="py-1  font-regular whitespace-nowrap text-gray-900 flex flex-row items-center">
                <CgPlayButtonO className="mr-1" /> {course?.totalVideoSize}{" "}
                video
              </span>

              <span className="flex whitespace-nowrap justify-center items-center gap-1">
                <SnippetsOutlined className="text-gray-900" />
                {course?.totalEnrollStudentSize + " " + "quiz"}
              </span>
              <span className="flex whitespace-nowrap justify-center items-center gap-1">
                <SVGstudentIcom className="text-gray-900" />{" "}
                {course?.totalEnrollStudentSize + " " + "students"}
              </span>
            </div>
            <Button
              // href= {`/payment/checkout/${course?._id}?categoryId=${course?.category}`}
              onClick={() => {
                console.log("first")
                router.push(
                  `/payment/checkout/${course?._id}?categoryId=${course?.category}`
                );
              }}
              type="default"
              style={{color:"white",borderBottomRightRadius:"0.5rem",borderBottomLeftRadius:"0.5rem"}}
              className="bg-secondary cursor-pointer   text-center flex justify-center items-center font-bold w-full text-white text-xl   "
            >
              Enroll Now 
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SIngleCourse;
