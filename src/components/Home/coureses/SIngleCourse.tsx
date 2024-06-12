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
import HomeCourseImage from "../../../assets/svg/HomeCourse1.svg";
import HomeCourseImage2 from "../../../assets/svg/HomeCourse2.svg";
import HomeCourseImage3 from "../../../assets/svg/HomeCourse3.svg";
import HomeCourseImage4 from "../../../assets/svg/HomeCourse4.jpg";
import HomeCourseImage5 from "../../../assets/svg/HomeCourse5.jpg";
import HomeCourseImage6 from "../../../assets/svg/HomeCourse6.jpg";
import InerPlayButton from "../../../assets/svg/PlayinerButton.svg";
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
import { array } from "yup";
import { url } from "inspector";
const { Text } = Typography;

const SIngleCourse = ({ course }: { course: ICourseData }) => {
  const { userInfo, userInfoLoading } = useGlobalContext();
  // console.log("🚀 ~ SIngleCourse ~ userInfo:", userInfo);
  const router = useRouter();
  // console.log(course);
  // const { title, details, img, demo_video, tags} = course;

  const screens = useBreakpoint();

  const [addCart] = useAddCartMutation();
  const arr = [" ",HomeCourseImage, HomeCourseImage2,HomeCourseImage3,HomeCourseImage4, HomeCourseImage5,HomeCourseImage6]

  let indexArray = Math.floor(Math.random() * 6 + 1)

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

  let imagechoser = course?.img || arr[indexArray]

  return (
    <>
      <div className="w-[363px] md:w-full h-full p-2 bg-white  rounded-xl shadow-xl  mx-auto flex flex-col justify-between ">
        <div className="flex justify-center items-center h-1/2 mt-3">
          {/* <VimeoPlayer
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
          /> */}
          <Image alt="" width={100} height={100} className="w-full h-[220px] rounded-md " src={(course?.img || arr[indexArray])} />
          

           {/* <div className=" w-full h-[220px] bg-cover" style={{backgroundImage : `url(${HomeCourseImage})`}}> */}

           {/* </div> */}
          
        </div>
        <div className="flex flex-col justify-between h-1/2  mt-3">
          <div className="px-2 py-2 ">
            <div className="flex items-center gap-5">
              <a href={course?.demo_video?.video} target="_blank">
                <div className="bg-[#FB8500] p-4 w-12 hover:bg-[#de7f13] rounded-full flex items-center justify-center">
                  <Image alt="" width={18} height={10} src={InerPlayButton} />
                </div>
              </a>
              <Link
                href={`/course/milestone/${course?._id}?categoryName=${
                  course?.category?.title
                }&courseName=${course?.title}&category=${
                  course?.category?._id || course?.category
                }`}
                className=""
              >
                <h3 className="text-black text-center text-[16px]">
                  <EllipsisMiddle suffixCount={3} maxLength={90}>
                    {course?.title}
                  </EllipsisMiddle>
                </h3>
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="bg-gray-100 flex flex-row justify-between items-center text-xs sm:text-sm text-gray-900  px-6 py-1">
              <span className="py-1  font-regular whitespace-nowrap text-gray-900 flex flex-row items-center">
                <CgPlayButtonO className="mr-1 text-[#255debd9] font-extrabold text-lg" />{" "}
                {course?.totalVideoSize} video
              </span>

              <span className="flex whitespace-nowrap justify-center items-center gap-1">
                <SnippetsOutlined
                  style={{ color: "#255debd9", font: "bold" }}
                />
                {course?.totalEnrollStudentSize + " " + "quiz"}
              </span>
              <span className="flex whitespace-nowrap justify-center items-center gap-1">
                <SVGstudentIcom className="text-white" />{" "}
                {course?.totalEnrollStudentSize + " " + "students"}
              </span>
            </div>
            <Button
              // href= {`/payment/checkout/${course?._id}?categoryId=${course?.category}`}
              onClick={() => {
                console.log("first");
                router.push(
                  `/payment/checkout/${course?._id}?categoryId=${course?.category}`
                );
              }}
              type="default"
              style={{
    
                borderBottomRightRadius: "0.5rem",
                borderBottomLeftRadius: "0.5rem",
                paddingTop: "14px",
                paddingBottom: "14px",
              }}
              className="bg-blue-600 cursor-pointer hover:text-blue-600  text-center flex justify-center items-center font-semibold w-full text-white text-lg   "
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
